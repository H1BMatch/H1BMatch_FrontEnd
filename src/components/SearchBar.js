import React, { useState } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

const SearchBar = ({ onSearch }) => {
  const [jobTitle, setJobTitle] = useState('');

  const handleSearch = () => {
    onSearch(jobTitle);
  };

  return (
    <InputGroup className="mb-3">
      <FormControl
        placeholder="Enter job title"
        onChange={(e) => setJobTitle(e.target.value)}
      />
      <Button variant="outline-secondary" onClick={handleSearch}>
        Search
      </Button>
    </InputGroup>
  );
};

export default SearchBar;
