import React, { useEffect, useRef } from 'react';
import { useRepos } from '../contexts/RepoContext';
import RepoItem from './RepoItem';

const ReposList: React.FC = () => {
  const {
    data,
    loading,
    error,
    loadMoreRepos,
    addFavorite,
    favorites,
    searchTerm,
  } = useRepos();

  const observer = useRef<IntersectionObserver>();
  const lastRepoElementRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (loading || !data) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && data.search.pageInfo.hasNextPage) {
        loadMoreRepos();
      }
    });

    if (lastRepoElementRef.current) {
      observer.current.observe(lastRepoElementRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [loading, data, loadMoreRepos]);

  const isFavorite = (repoId: string) => {
    return favorites.some((fav) => fav.id === repoId);
  };

  if (loading) return <p>Loading repositories...</p>;
  if (error) return <p>Error loading repositories: {JSON.stringify(error)}</p>;

  return (
    <div>
      <h2>
        {searchTerm
          ? `Search Results - ${searchTerm}`
          : 'Get Inspired by Repos ⭐ > 50000'}
      </h2>
      <p>Total Repositories: {data?.search.repositoryCount}</p>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {data?.search.edges.map(({ node }, index) => (
          <li
            key={node.id}
            ref={
              index === data.search.edges.length - 1 ? lastRepoElementRef : null
            }
          >
            <RepoItem repo={node} />
            <button
              onClick={() => addFavorite(node)}
              disabled={isFavorite(node.id)}
            >
              {isFavorite(node.id) ? 'In Favorites' : 'Add to Favorites'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReposList;
