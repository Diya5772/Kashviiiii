import express from "express";
import multer from "multer";
import Product from "../models/Product.js";

const router = express.Router();

// Multer Setup for Image Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// 1️⃣ Add Product (Admin Panel)
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const newProduct = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      subCategory: req.body.subCategory,
      sizes: req.body.sizes.split(","),
      bestseller: req.body.bestseller === "true",
      filters: JSON.parse(req.body.filters),
      image: req.file ? `/uploads/${req.file.filename}` : "",
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2️⃣ Get All Products
router.get("/all", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3️⃣ Get Products with Filters
router.post("/filter", async (req, res) => {
  try {
    let query = {};
    Object.keys(req.body).forEach((key) => {
      if (req.body[key]) {
        query[`filters.${key}`] = req.body[key];
      }
    });

    const products = await Product.find(query);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
