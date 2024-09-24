import React, { useState, useEffect } from "react";

const Categories = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((response) => response.json())
      .then((data) => setCategories(data.categories));
  }, []);

  function handleCategoryChange(event) {
    onSelectCategory(event.target.value);
  }

  return (
    <div className={`categories-dropdown`}>
      <label htmlFor="category">Categories</label>
      <select name="category" id="category" onChange={handleCategoryChange}>
        <option value="all"></option>
        {categories.map(category => (
          <option key= {category.idCategory} value= {category.strCategory}>{category.strCategory} </option>
        ))}
      </select>
    </div>
  );
};

export default Categories;