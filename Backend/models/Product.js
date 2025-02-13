import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  sizes: { type: [String], required: true },
  bestseller: { type: Boolean, default: false },
  filters: { type: Object, required: true },
  image: { type: String, required: false },
});

const Product = mongoose.model("Product", ProductSchema);
export default Product; // ✅ Default export