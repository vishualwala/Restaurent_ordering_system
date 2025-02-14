const express = require("express");
const Order = require("./order"); // Import Order Model
const Cart = require("./Cart_model"); // Import Cart Model
const FoodItem = require("./FoodItem"); // Import Food Model
const router = express.Router();

// Place an order
router.post("/place", async (req, res) => {
  try {
    const { userId, items, totalAmount, paymentMethod } = req.body;

    // Create a new order
    const order = new Order({
      userId,
      items,
      totalAmount,
      paymentMethod,
      status: "Pending", // Default status
    });

    await order.save();

    // Clear the cart after placing order
    await Cart.deleteMany({ userId });

    res.json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get orders of a user
router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId }).populate("items.foodId");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Admin: Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().populate("userId").populate("items.foodId");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Admin: Update order status
router.put("/:orderId", async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.orderId, { status }, { new: true });

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
