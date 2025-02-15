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
router.post("/getImages", async (req, res) => {
  try {
      const { productIds } = req.body;

      if (!productIds || !Array.isArray(productIds)) {
          return res.status(400).json({ message: "Invalid product IDs" });
      }

      const products = await Product.find({ _id: { $in: productIds } });

      const productMap = {};
      products.forEach(product => {
          productMap[product._id] = { image: product.image };
      });

      res.json(productMap);
  } catch (error) {
      console.error("Error fetching product images:", error);
      res.status(500).json({ message: "Server error" });
  }
});

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
router.post("/product", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to add product" });
  }
});
router.put("/product/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
});
router.delete("/product/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});
export default router;