import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MealList from './components/MealList';
import MealDetails from './components/MealDetails';
import './App.css';

function App() {
  const [meals, setMeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMeal, setSelectedMeal] = useState(null); 
  const [isDarkMode, setIsDarkMode] = useState(false);

  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode', !isDarkMode);
  };

  const searchMeals = (query) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
      .then((response) => response.json())
      .then((data) => {
        setMeals(data.meals ); 
      });
  };

 
  const handleSearch = (query) => {
    setSearchQuery(query);
    searchMeals(query); 
  };

  
  const fetchCategoryMeals = (category) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then((response) => response.json())
      .then((data) => setMeals(data.meals || []));
  };

  
  const fetchRandomMeal = () => {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then((response) => response.json())
      .then((data) => setSelectedMeal(data.meals[0]));
  };

  
  useEffect(() => {
    searchMeals('a');
  }, []);

  return (
    <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
      <Header
        searchQuery={searchQuery}
        onSearch={handleSearch} 
        toggleDarkMode={toggleDarkMode}
        isDarkMode={isDarkMode}
        onSelectCategory={fetchCategoryMeals} 
        onRandomMeal={fetchRandomMeal} 
      />
      
      {selectedMeal ? (
        <MealDetails meal={selectedMeal} />
      ) : (
        <MealList meals={meals} onSelectMeal={setSelectedMeal} /> 
      )}
    </div>
  );
}

export default App;
