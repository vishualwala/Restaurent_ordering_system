import React, { useContext } from "react";
import { useCart } from "./CartContext";
import "./FoodItem.css";

const FoodItem = ({ food }) => {
  const { addToCart } = useCart();

  return (
    <div className="food-card">
      <img src={food.image} alt={food.name} className="food-image" />
      <h3>{food.name}</h3>
      <p>₹{food.price}</p>
      <button onClick={() => addToCart(food)}>Add to Cart</button>
    </div>
  );
};

export default FoodItem;
