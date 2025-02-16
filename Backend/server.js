import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import blogRoutes from "./routes/blogRouter.js";
import cartRoutes from "./routes/cartRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js"
import reviewRoutes from "./routes/reviewRoutes.js"
import faqRoutes from "./routes/faqRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5174", credentials: true }));
app.use("/uploads", express.static("uploads"));
connectDB();
app.use("/api/auth", authRoutes);
app.use("/api/product",productRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/faq", faqRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/order", orderRoutes);
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
