import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import FAQ from "../models/FAQ.js";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });


// Add a new FAQ
router.post("/add", async (req, res) => {
  try {
    const { question, answer, image } = req.body;
    if (!question || !answer) {
      return res.status(400).json({ message: "Question and answer are required" });
    }
    const newFAQ = new FAQ({ question, answer, image });
    await newFAQ.save();
    res.status(201).json(newFAQ);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get all FAQs
router.get("/all", async (req, res) => {
  try {
    const faqs = await FAQ.find();
    res.status(200).json(faqs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an FAQ
router.delete("/delete/:id", async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndDelete(req.params.id);
    if (!faq) {
      return res.status(404).json({ message: "FAQ not found" });
    }
    res.json({ message: "FAQ deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit an FAQ
router.put("/edit/:id", async (req, res) => {
  try {
    const { question, answer, image } = req.body;
    const updatedFAQ = await FAQ.findByIdAndUpdate(
      req.params.id,
      { question, answer, image },
      { new: true }
    );
    if (!updatedFAQ) {
      return res.status(404).json({ message: "FAQ not found" });
    }
    res.status(200).json(updatedFAQ);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
