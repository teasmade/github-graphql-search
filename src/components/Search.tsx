import React, { useState } from 'react';
import { useRepos } from '../contexts/RepoContext';

const Search: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const { updateSearchTerm } = useRepos();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    updateSearchTerm(newValue);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search Repositories"
      />
    </div>
  );
};

export default Search;
