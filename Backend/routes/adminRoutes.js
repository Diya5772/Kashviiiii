import express from "express";
import User from "../models/User.js"; // Ensure correct path

const router = express.Router();

// Get total user count
router.get("/total-users", async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    res.json({ totalUsers: userCount });
  } catch (error) {
    res.status(500).json({ error: "Error fetching user count" });
  }
});

export default router;
