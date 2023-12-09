import React from 'react';
import { useRepos } from '../contexts/RepoContext';

const ReposList: React.FC = () => {
  const {
    data,
    loading,
    error,
    addFavorite,
    favorites,
    searchTerm,
    pagination,
    updatePagination,
    updatePerPage,
  } = useRepos();

  if (loading) return <p>Loading repositories...</p>;
  if (error) return <p>Error loading repositories: {JSON.stringify(error)}</p>;

  const isFavorite = (repoId: string) => {
    return favorites.some((fav) => fav.id === repoId);
  };

  const totalItems = data?.search.repositoryCount || 0;
  const totalPages = Math.ceil(totalItems / pagination.first);
  const currentPage = pagination.after
    ? Math.ceil((data?.search.edges.length || 0) / pagination.first)
    : 1;

  const handleNextPage = () => {
    const newAfter = data?.search.pageInfo.endCursor;
    updatePagination(newAfter);
  };

  const handlePreviousPage = () => {
    const newAfter = data?.search.pageInfo.startCursor;
    updatePagination(newAfter);
  };

  // const handlePreviousPage = () => {
  //   if (data?.search.pageInfo.hasPreviousPage) {
  //     updatePagination({ first: 30, after: data.search.pageInfo.startCursor });
  //   }
  // };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newFirst = parseInt(event.target.value, 10);
    updatePerPage(newFirst);
  };

  return (
    <div>
      <h2>
        {searchTerm ? 'Search Results' : 'Get Inspired by Repos ⭐ > 50000'}
      </h2>
      <ul>
        {data?.search.edges.map(({ node }) => (
          <li key={node.id}>
            <a
              href={node.url}
              target="_blank"
            >
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

      <p>Total Repositories: {data?.search.repositoryCount}</p>
      <p>
        Page {currentPage} of {totalPages}
      </p>
      <select
        onChange={handlePerPageChange}
        value={pagination.first}
      >
        {[10, 20, 30, 40, 50].map((count) => (
          <option
            key={count}
            value={count}
          >
            {count} per page
          </option>
        ))}
      </select>

      <button
        onClick={handlePreviousPage}
        disabled={!data?.search.pageInfo.hasPreviousPage}
      >
        Previous
      </button>
      <button
        onClick={handleNextPage}
        disabled={!data?.search.pageInfo.hasNextPage}
      >
        Next
      </button>
    </div>
  );
};

export default ReposList;
