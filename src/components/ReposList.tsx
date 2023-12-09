import React, { useEffect, useRef } from 'react';
import { useRepos } from '../contexts/RepoContext';

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

      <ul>
        {data?.search.edges.map(({ node }, index) => (
          <li
            key={node.id}
            ref={
              index === data.search.edges.length - 1 ? lastRepoElementRef : null
            }
          >
            <a
              href={node.url}
              target="_blank"
            >
              {node.name}
            </a>
            {' - '}
            {node.stargazerCount} stars
            <p>{node.description}</p>
            <div>
              {node.repositoryTopics.nodes.map(({ topic }) => (
                <span key={topic.name}>{topic.name} </span>
              ))}
            </div>
            <div>
              {node.languages.nodes.map((language) => (
                <span key={language.name}>{language.name} </span>
              ))}
            </div>
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
