import React, { useState } from 'react';
import { useRepos } from '../contexts/RepoContext';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const Search: React.FC = () => {
  const { searchTerm, updateSearchTerm } = useRepos();
  const [inputValue, setInputValue] = useState(searchTerm);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    updateSearchTerm(newValue);
  };

  const handleClearInput = () => {
    setInputValue('');
    updateSearchTerm('');
  };

  return (
    <TextField
      type="text"
      value={inputValue}
      onChange={handleInputChange}
      placeholder="Search Repos"
      label="Search Repos"
      variant="outlined"
      size="medium"
      InputProps={{
        endAdornment: inputValue && (
          <InputAdornment position="end">
            <IconButton
              onClick={handleClearInput}
              edge="end"
            >
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      style={{ backgroundColor: 'white', borderRadius: 4 }}
    />
  );
};

export default Search;
