import React from 'react';
import Search from '../components/Search';
import ReposList from '../components/ReposList';
import { useRepos } from '../contexts/RepoContext';
import { Paper, Typography, Grid, useTheme } from '@mui/material';

const ReposPage: React.FC = () => {
  const { searchTerm, data } = useRepos();
  const theme = useTheme();
  return (
    <>
      <Paper
        sx={{
          position: 'sticky',
          top: 64,
          [theme.breakpoints.down('sm')]: {
            top: 56,
          },
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
            <Search />
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
              {searchTerm ? `"${searchTerm}"` : 'Get Inspired, ⭐ > 50000'}
            </Typography>
            <Typography sx={{ textAlign: 'right' }}>
              Repos found: {data?.search.repositoryCount}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      <ReposList />
    </>
  );
};

export default ReposPage;
