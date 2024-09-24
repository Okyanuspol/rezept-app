import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MealList from './components/MealList';
import MealDetails from './components/MealDetails';
import RandomMeal from './components/RandomMeal';
import Categories from './components/Categories';
import HomePage from './views/HomePage';
import AboutUs from './components/AboutUs';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const [meals, setMeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMeal, setSelectedMeal] = useState(null); 
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navigate = useNavigate();

  const resetStateAndNavigateHome = () => {
    setMeals([]);
    setSearchQuery('');
    setSelectedMeal(null);
    navigate('/');
  };

  
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
      .then((data) => setMeals(data.meals));
  };

  // const resetState = () => {
  //   setMeals([]);
  //   setSearchQuery('');
  //   setSelectedMeal(null);
  //   // Setzen Sie hier alle anderen Zustände zurück, die Sie haben
  // };

  
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
        onHomeClick={resetStateAndNavigateHome}
      />
      <div className="controls">
        <Categories onSelectCategory={fetchCategoryMeals} />
        <RandomMeal onRandomMeal={fetchRandomMeal} />
      </div>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route index element={!selectedMeal ? <MealList meals={meals} onSelectMeal={setSelectedMeal} /> : <MealDetails meal={selectedMeal} />} />
          <Route path="/category/:category" element={<MealList meals={meals} onSelectMeal={setSelectedMeal} />} />
          <Route path="/random" element={<MealDetails meal={selectedMeal} />} /> 
          <Route path="/about" element={<AboutUs />} />
        </Routes>
    </div>
  );
}

export default App;
