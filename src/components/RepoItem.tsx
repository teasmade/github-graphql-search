import React from 'react';
import { Repo } from '../types';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Link,
  Chip,
  Grid,
  Box,
} from '@mui/material';

type RepoItemProps = {
  repo: Repo;
  children?: React.ReactNode;
};

const RepoItem: React.FC<RepoItemProps> = ({ repo, children }) => {
  return (
    <Card sx={{ margin: '2rem 1rem', maxWidth: '100%' }}>
      <CardContent>
        <Grid
          container
          spacing={4}
        >
          <Grid
            item
            xs={12}
            sm={8}
          >
            <Typography
              variant="h6"
              component="div"
            >
              <Link
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {repo.name}
              </Link>
              <Typography
                color="textSecondary"
                component="span"
                sx={{ marginLeft: 1 }}
              >
                ⭐ {repo.stargazerCount}
              </Typography>
            </Typography>
            <Typography
              variant="body1"
              sx={{ marginTop: 2 }}
            >
              {repo.description}
            </Typography>
            <Box sx={{ marginTop: 2, fontStyle: 'italic', fontSize: '0.9rem' }}>
              {repo.repositoryTopics.nodes.map(({ topic }, index) => (
                <React.Fragment key={topic.name}>
                  {index > 0 && ', '}
                  {topic.name}
                </React.Fragment>
              ))}
            </Box>
            <Box sx={{ marginTop: 2 }}>
              {repo.languages.nodes.map((language) => (
                <Chip
                  key={language.name}
                  label={language.name}
                  size="small"
                  variant="outlined"
                  sx={{ marginRight: 1, marginBottom: 1 }}
                />
              ))}
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ textAlign: 'right' }}
          >
            {children}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default RepoItem;
