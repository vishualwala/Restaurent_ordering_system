import React, { useState } from "react";
import { useCart } from "./CartContext";
import foodData from "./foodData";
import "./Home.css";

const Home = () => {
  const { addToCart } = useCart();
  
  // State to track favourites for each food item
  const [favourites, setFavourites] = useState([]);

  const handleFavourite = (food) => {
    setFavourites((prevFavourites) => {
      if (prevFavourites.includes(food.id)) {
        return prevFavourites.filter((id) => id !== food.id); // Remove from favourites
      } else {
        return [...prevFavourites, food.id]; // Add to favourites
      }
    });
  };

  const isFavourite = (food) => favourites.includes(food.id);

  return (
    <div className="home-container">
      <h2 className="home-title">Available Food Items</h2>
      <div className="food-list">
        {foodData.map((food) => (
          <div key={food.id} className="food-card">
            <img src={food.image} alt={food.name} className="food-image" />
            <h3 className="food-name">{food.name}</h3>
            <p className="food-price">₹{food.price}</p>
            <p className="food-description">{food.description}</p>
            
            {/* Add to Cart button */}
            <button className="add-to-cart-btn" onClick={() => addToCart(food)}>
              Add to Cart
            </button>

            {/* Heart symbol for Favourites */}
            <button 
              className={`favourite-btn ${isFavourite(food) ? "favourite" : ""}`} 
              onClick={() => handleFavourite(food)}
            >
              {isFavourite(food) ? "❤️" : "🤍"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
