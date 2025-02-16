import express from "express";
import User from "../models/User.js"; // Ensure the correct path
import Product from "../models/Product.js";

const router = express.Router();

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "name email role"); // Only fetch name, email, role
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Error fetching users" });
  }
});

// ✅ Fetch all products including image URL
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find({}, "name description price category image");
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Error fetching products" });
  }
});


// Get total user count
router.get("/total-users", async (req, res) => {
  try {
    const userCount = await User.countDocuments(); // Counts total users
    res.json({ totalUsers: userCount });
  } catch (error) {
    console.error("Error fetching user count:", error);
    res.status(500).json({ error: "Error fetching user count" });
  }
});

router.get("/total-products", async (req, res) => {
  try {
    const productCount = await Product.countDocuments();
    res.json({ totalProducts: productCount });
  } catch (error) {
    console.error("Error fetching product count:", error);
    res.status(500).json({ error: "Error fetching product count" });
  }
});

export default router;
