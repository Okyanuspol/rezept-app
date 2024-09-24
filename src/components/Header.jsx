import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = ({ searchQuery, onSearch, toggleDarkMode, isDarkMode, onHomeClick,  }) => {
  
  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    onSearch(query); 
  };

  const handleHomeClick = (event) => {
    event.preventDefault();
    onHomeClick();
  };

  return (
    <header className={`header ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="left">
        <nav>
        <NavLink to="/" >Home</NavLink> 
          <NavLink to="/about">About Us</NavLink>
        </nav>
      </div>

      <div className="center">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchInputChange} 
          placeholder="Search for a meal..."
          className="search-input"
        />
      </div>

      <div className="right">
        <label className="switch">
          <input type="checkbox" onChange={toggleDarkMode} checked={isDarkMode} />
          <span className="slider round">Dark Mode</span>
        </label>
      </div>
    </header>
  );
};

export default Header;

