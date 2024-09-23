import React, { useState, useEffect } from 'react';
import Categories from '../components/Categories';
import RandomMeal from '../components/RandomMeal';
import MealList from '../components/MealList';
import MealDetails from '../components/MealDetails';

const HomePage = () => {
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=a')
      .then((response) => response.json())
      .then((data) => setMeals(data.meals));
  }, []);

  const fetchCategoryMeals = (category) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then((response) => response.json())
      .then((data) => setMeals(data.meals));
  };

  const fetchRandomMeal = () => {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then((response) => response.json())
      .then((data) => setSelectedMeal(data.meals[0]));
  };

  return (
    <div>
      <div className="controls">
        <Categories onSelectCategory={fetchCategoryMeals} />
        <RandomMeal onRandomMeal={fetchRandomMeal} />
      </div>

      {!selectedMeal && <MealList meals={meals} onSelectMeal={setSelectedMeal} />}
      {selectedMeal && <MealDetails meal={selectedMeal} />}
    </div>
  );
};

export default HomePage;
