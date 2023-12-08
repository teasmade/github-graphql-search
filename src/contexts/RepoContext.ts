// RepoContext.js
import { createContext, useContext } from 'react';
import { Repo } from '../types';

type RepoContextType = {
  searchTerm: string;
  updateSearchTerm: (query: string) => void;
  favorites: Repo[];
  addFavorite: (repo: Repo) => void;
  removeFavorite: (repoId: string) => void;
  loading: boolean;
  error?: unknown;
  data?: {
    search: {
      edges: Array<{ node: Repo }>;
    };
  };
};

export const RepoContext = createContext<RepoContextType | undefined>(undefined);

export const useRepos = (): RepoContextType => {
  const context = useContext(RepoContext);
  if (context === undefined) {
    throw new Error('useRepos must be used within a RepoProvider');
  }
  return context;
};