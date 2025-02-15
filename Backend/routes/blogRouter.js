import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import Blog from "../models/Blog.js";
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

// Add a new blog with image upload
router.post("/add", async (req, res) => {
  try {
    const { title, content, image } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    // Ensure the image URL is received
    console.log("Received image URL:", image);

    const newBlog = new Blog({ title, content, image });

    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    console.error("Error adding blog:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// Get all blogs
router.get("/all", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific blog
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a blog (including image upload)
router.put("/update/:id", upload.single("image"), async (req, res) => {
  try {
    let imageUrl = req.body.image;

    if (req.file) {
      const result = await cloudinary.uploader.upload_stream(
        { folder: "blogs" },
        (error, result) => {
          if (error) throw error;
          imageUrl = result.secure_url;
        }
      ).end(req.file.buffer);
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        content: req.body.content,
        author: req.body.author || "Admin",
        image: imageUrl,
      },
      { new: true }
    );

    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
const handleImageUpload = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "Kahviii"); // Replace with your upload preset
  formData.append("cloud_name", "dowlh9mli"); // Replace with your Cloudinary cloud name

  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dowlh9mli/image/upload",
      formData
    );
    return res.data.secure_url; // Get the uploaded image URL
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};

// Delete a blog
router.delete("/delete/:id", async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
