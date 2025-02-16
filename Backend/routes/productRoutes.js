import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import Product from "../models/Product.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Fetch product images
router.post("/getImages", async (req, res) => {
  try {
    const { productIds } = req.body;
    if (!productIds || !Array.isArray(productIds)) {
      return res.status(400).json({ message: "Invalid product IDs" });
    }

    const products = await Product.find({ _id: { $in: productIds } });
    const productMap = {};
    products.forEach((product) => {
      productMap[product._id] = { image: product.image };
    });
    res.json(productMap);
  } catch (error) {
    console.error("Error fetching product images:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// 1️⃣ Add Product (Admin Panel) with Cloudinary Image Upload
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    console.log("Received Data:", req.body); // 🔥 Debugging
    console.log("Received Image File:", req.file); // 🔥 Debugging

    let imageUrl = req.body.image || "";  // 🔥 Ensure `imageUrl` gets a default value

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: "products" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }).end(req.file.buffer);
      });

      imageUrl = result.secure_url;
    }

    const newProduct = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      subCategory: req.body.subCategory,
      sizes: req.body.sizes.split(","),
      bestseller: req.body.bestseller === "true",
      filters: JSON.parse(req.body.filters),
      image: imageUrl, // ✅ Ensuring image URL is assigned
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
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

// 3️⃣ Get Single Product by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
});

// 4️⃣ Get Products with Filters
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

// 5️⃣ Add Product Manually (Without Image Upload)
router.post("/product", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to add product" });
  }
});

// 6️⃣ Update Product (Including Cloudinary Image Upload)
router.put("/product/:id", upload.single("image"), async (req, res) => {
  try {
    console.log("Update Request Data:", req.body); // 🔥 Debugging

    let imageUrl = req.body.image || "";

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: "products" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }).end(req.file.buffer);
      });

      imageUrl = result.secure_url;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body, image: imageUrl },
      { new: true }
    );

    console.log("Updated Product:", updatedProduct); // 🔥 Debugging
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
});

// 7️⃣ Delete Product
router.delete("/product/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

export default router;
