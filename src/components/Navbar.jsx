import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

const Navbar = ({ onSubmit, onChange, searchTerm }) => {
  return (
    <header>
      <form onSubmit={onSubmit}>
        <input
          className="search-input"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={onChange}
        />
        <FontAwesomeIcon icon={faSearch} />
      </form>
    </header>
  );
};

export default Navbar;
