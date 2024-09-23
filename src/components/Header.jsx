import React from 'react';

const Header = ({ searchQuery, onSearch, toggleDarkMode, isDarkMode, onSelectCategory, onRandomMeal }) => {
  // Arama kutusunda her değişiklik olduğunda tetiklenir
  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    onSearch(query); // Arama sorgusunu yukarıdaki App bileşenine gönderiyoruz
  };

  return (
    <header className={`header ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="left">
        <nav>
          <a href="#">Home</a>
          <a href="#about-us">About Us</a>
          <div className="categories">
            <button className="dropdown-button" onClick={onSelectCategory}>
              Categories
            </button>
          </div>
        </nav>
      </div>

      <div className="center">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchInputChange} // Arama input'u her değiştiğinde çağrılır
          placeholder="Search for a meal..."
          className="search-input"
        />
      </div>

      <div className="right">
        <button className="random-button" onClick={onRandomMeal}>
          Random Meal
        </button>

        <label className="switch">
          <input type="checkbox" onChange={toggleDarkMode} checked={isDarkMode} />
          <span className="slider round">Dark Mode</span>
        </label>
      </div>
    </header>
  );
};

export default Header;

