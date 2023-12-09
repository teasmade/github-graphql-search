import React from 'react';
import { Repo } from '../types';
import { Card, CardContent, Typography, Link, Chip } from '@mui/material';

type RepoItemProps = {
  repo: Repo;
};

const RepoItem: React.FC<RepoItemProps> = ({ repo }) => {
  return (
    <Card
      variant="outlined"
      sx={{ marginBottom: 2 }}
    >
      <CardContent>
        <Typography variant="h6">
          <Link
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {repo.name}
          </Link>
        </Typography>
        <Typography color="textSecondary">
          {repo.stargazerCount} stars
        </Typography>
        <Typography variant="body2">{repo.description}</Typography>
        <div>
          {repo.repositoryTopics.nodes.map(({ topic }) => (
            <Chip
              key={topic.name}
              label={topic.name}
              size="small"
              variant="outlined"
            />
          ))}
        </div>
        <div>
          {repo.languages.nodes.map((language) => (
            <Chip
              key={language.name}
              label={language.name}
              size="small"
              variant="outlined"
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RepoItem;
