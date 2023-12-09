import { createContext, useContext } from 'react';
import { Repo } from '../types';

type RepoContextType = {
  searchTerm: string;
  updateSearchTerm: (query: string) => void;
  loadMoreRepos: () => void;
  favorites: Repo[];
  addFavorite: (repo: Repo) => void;
  removeFavorite: (repoId: string) => void;
  updateRating: (repoId: string, newRating: number) => void;
  loading: boolean;
  error?: unknown;
  data?: {
    search: {
      repositoryCount: number;
      edges: Array<{ cursor: string; node: Repo }>;
      pageInfo: {
        // startCursor: string;
        endCursor: string;
        hasNextPage: boolean;
        // hasPreviousPage: boolean;
      };
    };
  };
};

export const RepoContext = createContext<RepoContextType | undefined>(
  undefined
);

export const useRepos = (): RepoContextType => {
  const context = useContext(RepoContext);
  if (context === undefined) {
    throw new Error('useRepos must be used within a RepoProvider');
  }
  return context;
};
