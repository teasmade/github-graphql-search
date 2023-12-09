import React from 'react';
import FavoriteReposList from '../components/FavoriteReposList';
import { useRepos } from '../contexts/RepoContext';
import { Paper, Typography, Grid } from '@mui/material';

const FavoritesPage: React.FC = () => {
  const { favorites } = useRepos();
  return (
    <>
      <Paper
        sx={{
          position: 'sticky',
          top: 64,
          zIndex: 1,
          padding: 2,
          boxShadow: '0px 4px 2px -2px rgba(0,0,0,0.2)',
          width: '100%',
          marginBottom: 4,
          borderRadius: 0,
        }}
      >
        <Grid
          container
          spacing={2}
          alignItems="center"
        >
          <Grid
            item
            xs={12}
            sm={6}
          >
            {/* <Search /> */}
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
          >
            <Typography
              variant="h6"
              sx={{ textAlign: 'right' }}
            >
              My Favorites
            </Typography>
            <Typography sx={{ textAlign: 'right' }}>
              {favorites.length
                ? `${favorites.length} repos`
                : 'No favorites added yet'}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      <FavoriteReposList />
    </>
  );
};

export default FavoritesPage;
