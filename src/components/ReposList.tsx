import React, { useEffect, useRef } from 'react';
import { useRepos } from '../contexts/RepoContext';
import RepoItem from './RepoItem';
import { Button, CircularProgress, Box } from '@mui/material';

const ReposList: React.FC = () => {
  const {
    data,
    loading,
    loadingMore,
    error,
    loadMoreRepos,
    addFavorite,
    favorites,
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

  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        my={2}
      >
        <CircularProgress />
      </Box>
    );
  if (error) return <p>Error loading repositories: {JSON.stringify(error)}</p>;

  return (
    <div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {data?.search.edges.map(({ node }, index) => (
          <li
            key={node.id}
            ref={
              index === data.search.edges.length - 1 ? lastRepoElementRef : null
            }
          >
            <RepoItem repo={node}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => addFavorite(node)}
                disabled={isFavorite(node.id)}
              >
                {isFavorite(node.id) ? '♥ Favorite' : '+ Favorites'}
              </Button>
            </RepoItem>
          </li>
        ))}
      </ul>
      <Box
        display="flex"
        justifyContent="center"
        height="100px"
      >
        {loadingMore && (
          <>
            <CircularProgress />
          </>
        )}
      </Box>
    </div>
  );
};

export default ReposList;
