import React from 'react';
import Search from '../components/Search';
import ReposList from '../components/ReposList';

const ReposPage: React.FC = () => {
  return (
    <div>
      <Search />
      <ReposList />
    </div>
  );
};

export default ReposPage;
