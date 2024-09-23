import React from 'react';

const MealDetails = ({ meal }) => {
  if (!meal) return null;

  return (
    <div className="meal-details">
      <h2>{meal.strMeal}</h2>
      <img src={meal.strMealThumb} alt={meal.strMeal} />
      <p>{meal.strInstructions}</p>
      <h4>Ingredients:</h4>
      <ul>
        {Object.keys(meal).map((key) => {
          if (key.includes('strIngredient') && meal[key]) {
            return <li key={key}>{meal[key]}</li>;
          }
          return null;
        })}
      </ul>
    </div>
  );
};

export default MealDetails;
