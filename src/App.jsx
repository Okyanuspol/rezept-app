import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MealList from './components/MealList';
import MealDetails from './components/MealDetails';
import './App.css';

function App() {
  const [meals, setMeals] = useState([]); // Arama sonuçlarını burada tutacağız
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMeal, setSelectedMeal] = useState(null); // Seçilen yemeği burada tutacağız
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Dark Mode toggle
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode', !isDarkMode);
  };

  // Harf veya kelime ile yemek arama
  const searchMeals = (query) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
      .then((response) => response.json())
      .then((data) => {
        setMeals(data.meals || []); // Eğer sonuç yoksa boş array döner
      });
  };

  // Header'dan gelen arama sorgusunu yönetme
  const handleSearch = (query) => {
    setSearchQuery(query);
    searchMeals(query); // API çağrısı yaparak sonuçları güncelliyoruz
  };

  // Belirli bir kategoriden yemek çekme
  const fetchCategoryMeals = (category) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then((response) => response.json())
      .then((data) => setMeals(data.meals || []));
  };

  // Rastgele bir yemek çekme
  const fetchRandomMeal = () => {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then((response) => response.json())
      .then((data) => setSelectedMeal(data.meals[0]));
  };

  // İlk başta "a" harfiyle başlayan yemekleri getirme
  useEffect(() => {
    searchMeals('a'); // İlk açılışta "a" harfiyle başlayan yemekler listelenir
  }, []);

  return (
    <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
      <Header
        searchQuery={searchQuery}
        onSearch={handleSearch} // Arama fonksiyonunu Header'a geçiriyoruz
        toggleDarkMode={toggleDarkMode}
        isDarkMode={isDarkMode}
        onSelectCategory={fetchCategoryMeals} // Kategori seçildiğinde çağrılır
        onRandomMeal={fetchRandomMeal} // Rastgele bir yemek seçildiğinde çağrılır
      />
      {/* Eğer bir yemek seçildiyse, detaylarını göster */}
      {selectedMeal ? (
        <MealDetails meal={selectedMeal} />
      ) : (
        <MealList meals={meals} onSelectMeal={setSelectedMeal} /> // Yemeği seçip meal detail'e gönder
      )}
    </div>
  );
}

export default App;
