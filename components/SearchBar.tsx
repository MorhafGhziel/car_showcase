"use client";

import SearchManufacturer from "./SearchManufacturer";

const SearchBar = () => {
  const handleSearch = () => {};
  return (
    <form className="searchbar__item" onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchManufacturer />
      </div>

      <div className="searchbar__item"></div>
    </form>
  );
};

export default SearchBar;
