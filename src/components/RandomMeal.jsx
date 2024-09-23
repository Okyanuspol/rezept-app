import React from 'react';

const RandomMeal = ({ onRandomMeal }) => {
  return (
    <button className="random-button" onClick={onRandomMeal}>
      Random Meal
    </button>
  );
};

export default RandomMeal;