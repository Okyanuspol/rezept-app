import React, { useState, useEffect } from 'react';

const Categories = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then((response) => response.json())
      .then((data) => setCategories(data.categories));
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`categories-dropdown`}>
      <button className="dropdown-button" onClick={toggleMenu}>
        Categories
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {categories.map((category) => (
            <li key={category.idCategory} onClick={() => {
              onSelectCategory(category.strCategory);
              setIsOpen(false); 
            }}>
              {category.strCategory}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Categories;

