import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { RepoContext } from './RepoContext';
import { Repo } from '../types';

interface RepoProviderProps {
  children: React.ReactNode;
}

const GET_REPOS = gql`
  query GetTopRepos {
  search(query: "is:public", type: REPOSITORY, first: 50) {
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
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<Repo[]>([]);

  // Apollo query with dynamic search query
  const { loading, error, data } = useQuery(GET_REPOS, {
    variables: { searchQuery },
  });

  // Functions to update state
  // const addFavorite = (repo) => { /* ... */ };
  const addFavorite = (repo: Repo) => {
    setFavorites((favorites) => [...favorites, repo]);
  }
  const removeFavorite = (repoId: string) => {
    setFavorites((favorites) => favorites.filter((repo) => repo.id !== repoId));
  }
    
  const updateSearchQuery = (query: string) => {
    setSearchQuery(query);
  }

  // Context value
  const value = {
    searchQuery,
    updateSearchQuery,
    favorites,
    addFavorite,
    removeFavorite,
    loading,
    error,
    data,
  };

  return <RepoContext.Provider value={value}>{children}</RepoContext.Provider>;
};