import React from 'react';

const MealList = ({ meals, onSelectMeal }) => {
  if (meals.length === 0) {
    return <p>No meals found.</p>;
  }

  return (
    <div className="meal-list">
      {meals.map((meal) => (
        <div key={meal.idMeal} className="meal-card">
          <img src={meal.strMealThumb} alt={meal.strMeal} />
          <h3>{meal.strMeal}</h3>
          
          <button onClick={() => onSelectMeal(meal)}>Details</button>
        </div>
      ))}
    </div>
  );
};

export default MealList;