import { useState } from 'react';

import {
  SearchbarHeader,
  SearchFormButtonInput,
  SearchFormButtonLabel,
  SearchFormButton,
  SearchForm,
} from './Searchbar.styled';

export function Searchbar({ onFormSubmit }) {
  const [name, setName] = useState('');

  const handleInputChange = event => {
    const inputValue = event.target.value;
    setName(inputValue);
  };
  const handleSubmit = event => {
    event.preventDefault();
    onFormSubmit(name);
    reset();
  };

  function reset() {
    setName('');
  }

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormButtonInput
          type="text"
          name="name"
          value={name}
          autocomplete="off"
          autoFocus
          onChange={handleInputChange}
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchbarHeader>
  );
}
