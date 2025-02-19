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
router.post("/search", async (req, res) => {
  try {
      const { searchQuery, selectedFilters } = req.body;
      let query = {};

      // Search by product name
      if (searchQuery) {
          query.name = { $regex: searchQuery, $options: "i" };
      }

      // Apply filters dynamically
      if (selectedFilters) {
          Object.entries(selectedFilters).forEach(([key, value]) => {
              if (value) {
                  query[`filters.${key}`] = value;
              }
          });
      }

      const products = await Product.find(query);
      res.json(products);
  } catch (error) {
      console.error("Error searching products:", error);
      res.status(500).json({ message: "Server error" });
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
// Backend route
// Backend route - Add this to your routes file
router.post('/similar', async (req, res) => {
  try {
      const { excludeId, category, filters } = req.body;
      console.log("Received request data:", { excludeId, category, filters });

      // Validate input
      if (!excludeId || !category) {
          console.log("Missing required fields");
          return res.status(400).json({ message: 'Missing required fields' });
      }

      // Find products in the same category
      const query = {
          _id: { $ne: excludeId },
          category: category
      };

      console.log("Executing query:", query);

      const products = await Product.find(query);
      console.log(`Found ${products.length} products in category`);

      if (!products.length) {
          return res.json([]);
      }

      // Calculate similarity scores
      const similarProducts = products.map(product => {
          let matchCount = 0;
          let totalFilters = 0;

          // Compare filters if they exist
          if (filters && product.filters) {
              const filterKeys = [
                  'border',
                  'Border Type',
                  'Fabric Purity',
                  'Material',
                  'Occasion',
                  'Oranamentation Type',
                  'Pattern',
                  'Color',
                  'Technique',
                  'Zari Color',
                  'Zari Type'
              ];

              filterKeys.forEach(key => {
                  if (filters[key] && product.filters[key]) {
                      totalFilters++;
                      if (filters[key] === product.filters[key]) {
                          matchCount++;
                      }
                  }
              });
          }

          const similarity = totalFilters > 0 ? matchCount / totalFilters : 0;

          return {
              _id: product._id,
              name: product.name,
              image: product.image,
              price: product.price,
              similarity
          };
      });

      // Filter and sort by similarity
      const highSimilarityProducts = similarProducts
          .filter(product => product.similarity >= 0.6)
          .sort((a, b) => b.similarity - a.similarity)
          .slice(0, 4);

      console.log(`Sending ${highSimilarityProducts.length} similar products`);
      res.json(highSimilarityProducts);

  } catch (error) {
      console.error('Error in similar products route:', error);
      res.status(500).json({ message: 'Error finding similar products' });
  }
});
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
