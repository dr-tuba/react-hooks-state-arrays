import React, { useState } from "react";
import { spicyFoods, getNewSpicyFood } from "../data";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);
  const [filterBy, setFilterBy] = useState('All')

  const foodsToRender = foods.filter(food => {
    if (filterBy === 'All') {
      return true;
    } else {
      return food.cuisine === filterBy;
    }
  })

  function handleAddFood() {
    const newFood = getNewSpicyFood();
    const newFoodArray = [...foods, newFood]
    setFoods(newFoodArray)
  }

  function handleClick(food) {
    // Remove the clicked food
    // const arrayWithoutClickedFood = [...foods].filter(eachFood => eachFood.id !== food.id)
    // setFoods(arrayWithoutClickedFood)
    
    // Increment the heatlevel of the food by 1 when clicked
    const foodToUpdate = foods.filter(eachFood => eachFood.id === food.id)
    for (let info of foodToUpdate) {
      info.heatLevel++
    }
    const updatedArray = [...foods]
    setFoods(updatedArray)
  }


  function renderSpicyFoods() {
      return foodsToRender.map(food => {return (
      <li key={food.id} onClick={() => handleClick(food)}>
        {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
      </li>
    )})
  }

  function filterFoods(e) {
    setFilterBy(e.target.value)
  }

  return (
    <div>
      <button onClick={handleAddFood}>Add New Food</button>
      <ul>{renderSpicyFoods()}</ul>
      <select name="filter" onChange={filterFoods}>
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select> 
    </div>
  );
}

export default SpicyFoodList;
