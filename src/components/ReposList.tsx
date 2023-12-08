import React from 'react';
import { useRepos } from '../contexts/RepoContext';
const ReposList: React.FC = () => {
  const { data, loading, error, addFavorite, favorites, searchTerm } = useRepos();

  if (loading) return <p>Loading repositories...</p>;
  if (error) return <p>Error loading repositories: {JSON.stringify(error)}</p>;

  const isFavorite = (repoId: string) => {
    return favorites.some(fav => fav.id === repoId);
  };

  return (
    <div>
      <h2>{ searchTerm ? "Search" : "Top Repositories" }</h2>
      <ul>
        {data?.search.edges.map(({ node }) => (
          <li key={node.id}>
            <a href={node.url} target="_blank">
              {node.name}
            </a>
            {' - '}
            {node.stargazerCount} stars
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
