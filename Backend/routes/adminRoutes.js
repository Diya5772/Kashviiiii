import express from "express";
import User from "../models/User.js"; // Ensure the correct path
import Product from "../models/Product.js";
import Order from '../models/Order.js';

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

router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email phone")  // Populate user details (name, email, phone)
      .populate("items.productId", "name price description image")  // Populate product details
      .exec();

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching order details" });
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

router.get("/total-orders", async (req, res) => {
  try {
    const orderCount = await Order.countDocuments();
    res.json({ totalOrders: orderCount });
  } catch (error) {
    console.error("Error fetching order count:", error);
    res.status(500).json({ error: "Error fetching order count" });
  }
});

export default router;
