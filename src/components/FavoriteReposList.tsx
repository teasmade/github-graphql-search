import React from 'react';
import { useRepos } from '../contexts/RepoContext';
import RepoItem from './RepoItem';
import { Rating, Button } from '@mui/material';

const FavoriteReposList: React.FC = () => {
  const { favorites, removeFavorite, updateRating } = useRepos();

  return (
    <div>
      {favorites.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {favorites.map((repo) => (
            <li key={repo.id}>
              <RepoItem repo={repo}>
                <div>
                  <Rating
                    name="rating"
                    value={repo.rating || 0}
                    onChange={(_event, newValue) => {
                      updateRating(repo.id, newValue || 0);
                    }}
                  />
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => removeFavorite(repo.id)}
                    style={{ marginLeft: '10px' }}
                  >
                    - Favorites
                  </Button>
                </div>
              </RepoItem>
            </li>
          ))}
        </ul>
      ) : (
        ''
      )}
    </div>
  );
};

export default FavoriteReposList;
