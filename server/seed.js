const mongoose = require("mongoose");
const dotenv = require("dotenv");
const FoodItem = require("./FoodItem"); // Adjust path if needed
const foodData = require("../src/Fooddata"); // Adjust path if needed

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    console.log("✅ MongoDB Connected");

    // Clear existing data (optional)
    await FoodItem.deleteMany();
    console.log("⚠️ Old food data deleted");

    // Insert new data
    await FoodItem.insertMany(foodData);
    console.log("✅ Food items added successfully");

    mongoose.connection.close();
  })
  .catch(err => console.error("❌ Error connecting to MongoDB:", err));
