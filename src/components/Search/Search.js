import React, { useState } from "react";
import styles from "./search.module.css";

function Search({ handleSearchFilter, searchInput }) {
  // let inputHandler = (e) => {
  //   let lowerCase = e.target.value.toLowerCase();
  //   setSearchInput(lowerCase);
  // };

  return (
    <div>
      <div className={styles.searchbar_container}>
        <input
          type="search"
          placeholder="Search by name, email or role"
          className={styles.searchbar}
          onChange={handleSearchFilter}
          value={searchInput}
        />
      </div>
    </div>
  );
}

export default Search;
