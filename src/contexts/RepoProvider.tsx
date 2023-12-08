import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { RepoContext } from './RepoContext';
import { Repo } from '../types';
import { useDebounce } from "../utils/useDebounce";

interface RepoProviderProps {
  children: React.ReactNode;
}

// init query with some example repos
const GET_REPOS = gql`
query GetTopRepos($searchQuery: String!) {
  search(query: $searchQuery, type: REPOSITORY, first: 50) {
    edges {
      node {
        ... on Repository {
          id
          name
          url
          stargazerCount
        }
      }
    }
  }
}

`;

export const RepoProvider = ({ children }: RepoProviderProps) => {  
  const [favorites, setFavorites] = useState<Repo[]>([]);

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const searchQueryString = debouncedSearchTerm
    ? `is:public ${debouncedSearchTerm} sort:stars-desc`
    : 'is:public stars:>50000 sort:stars-desc';

  const { loading, error, data } = useQuery(GET_REPOS, {
    variables: { searchQuery: searchQueryString },
  });

  const addFavorite = (repo: Repo) => {
    setFavorites((favorites) => [...favorites, repo]);
  }
  const removeFavorite = (repoId: string) => {
    setFavorites((favorites) => favorites.filter((repo) => repo.id !== repoId));
  }
    
  const updateSearchTerm = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  }

  const value = {
    searchTerm,
    updateSearchTerm,
    favorites,
    addFavorite,
    removeFavorite,
    loading,
    error,
    data,
  };

  return <RepoContext.Provider value={value}>{children}</RepoContext.Provider>;
};