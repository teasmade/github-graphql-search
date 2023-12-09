import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { RepoContext } from './RepoContext';
import { Repo } from '../types';
import { useDebounce } from '../utils/useDebounce';

interface RepoProviderProps {
  children: React.ReactNode;
}

// default query with some example high-rated repos
const GET_REPOS = gql`
  query GetTopRepos($searchQuery: String!, $first: Int, $after: String) {
    search(
      query: $searchQuery
      type: REPOSITORY
      first: $first
      after: $after
    ) {
      repositoryCount
      edges {
        cursor
        node {
          ... on Repository {
            id
            name
            url
            description
            stargazerCount
            repositoryTopics(first: 10) {
              nodes {
                topic {
                  name
                }
              }
            }
            languages(first: 5) {
              nodes {
                name
              }
            }
          }
        }
      }
      pageInfo {
        # startCursor
        endCursor
        hasNextPage
        # hasPreviousPage
      }
    }
  }
`;

export const RepoProvider = ({ children }: RepoProviderProps) => {
  const [favorites, setFavorites] = useState<Repo[]>([]);

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 350);
  const searchQueryString = debouncedSearchTerm
    ? `is:public ${debouncedSearchTerm} sort:stars-desc`
    : 'is:public stars:>50000 sort:stars-desc';

  const { loading, error, data, fetchMore } = useQuery(GET_REPOS, {
    variables: { searchQuery: searchQueryString, first: 25, after: null },
  });

  const loadMoreRepos = () => {
    const currentEndCursor = data?.search.pageInfo.endCursor;
    if (data?.search.pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          after: currentEndCursor,
        },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prevResult;
          return {
            ...fetchMoreResult,
            search: {
              ...fetchMoreResult.search,
              edges: [
                ...prevResult.search.edges,
                ...fetchMoreResult.search.edges,
              ],
            },
          };
        },
      });
    }
  };

  const updateSearchTerm = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const addFavorite = (repo: Repo) => {
    setFavorites((favorites) => [...favorites, repo]);
  };
  const removeFavorite = (repoId: string) => {
    setFavorites((favorites) => favorites.filter((repo) => repo.id !== repoId));
  };

  const updateRating = (repoId: string, newRating: number) => {
    setFavorites((favorites) =>
      favorites.map((repo) =>
        repo.id === repoId
          ? {
              ...repo,
              rating: repo.rating === newRating ? undefined : newRating,
            }
          : repo
      )
    );
  };

  const value = {
    searchTerm,
    updateSearchTerm,
    favorites,
    addFavorite,
    removeFavorite,
    updateRating,
    loadMoreRepos,
    loading,
    error,
    data,
  };

  return <RepoContext.Provider value={value}>{children}</RepoContext.Provider>;
};
