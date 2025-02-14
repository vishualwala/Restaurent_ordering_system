const express = require("express");
const Cart = require("./Cart_model");
const FoodItem = require("./FoodItem"); // Ensure this path is correct
const router = express.Router();

router.get("/:userId", async (req, res) => {
  try {
    const cartItems = await Cart.find({ userId: req.params.userId }).populate("foodId");
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Add item to cart
router.post("/add", async (req, res) => {
  try {
    const { userId, foodId, quantity } = req.body;

    const foodItem = await FoodItem.findById(foodId);
    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }

    let cartItem = await Cart.findOne({ userId, foodId });
    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = new Cart({ userId, foodId, quantity });
      await cartItem.save();
    }

    res.json({ message: "Item added to cart", cartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
