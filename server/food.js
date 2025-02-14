const express = require("express");
const FoodItem = require("./FoodItem");  // Import FoodItem Model
const router = express.Router();

// Add Food Item (Admin only)
router.post("/add", async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;

    const newFood = new FoodItem({
      name,
      description,
      price,
      image,
      category,
    });

    await newFood.save();
    res.status(201).json({ message: "Food item added successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get All Food Items
router.get("/", async (req, res) => {
  try {
    const foodItems = await FoodItem.find();
    res.json(foodItems);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get Single Food Item by ID
router.get("/:id", async (req, res) => {
  try {
    const foodItem = await FoodItem.findById(req.params.id);
    if (!foodItem) return res.status(404).json({ message: "Food item not found" });

    res.json(foodItem);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update Food Item (Admin only)
router.put("/:id", async (req, res) => {
  try {
    const updatedFood = await FoodItem.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedFood) return res.status(404).json({ message: "Food item not found" });

    res.json(updatedFood);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete Food Item (Admin only)
router.delete("/:id", async (req, res) => {
  try {
    const deletedFood = await FoodItem.findByIdAndDelete(req.params.id);
    if (!deletedFood) return res.status(404).json({ message: "Food item not found" });

    res.json({ message: "Food item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
