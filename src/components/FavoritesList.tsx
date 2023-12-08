import React from 'react';
import { useRepos } from '../contexts/RepoContext';

const FavoritesList: React.FC = () => {
  const { favorites, removeFavorite } = useRepos();

  return (
    <div>
      <h2>Favorites</h2>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map(repo => (
            <li key={repo.id}>
              <a href={repo.url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
              {' - '}
              {repo.stargazerCount} stars
              <button onClick={() => removeFavorite(repo.id)}>
                Remove from Favorites
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorites added yet.</p>
      )}
    </div>
  );
};

export default FavoritesList;
