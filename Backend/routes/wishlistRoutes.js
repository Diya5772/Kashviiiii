import express from "express";
import { verifyUser } from "../middleware/authMiddleware.js";
import Wishlist from "../models/Wishlist.js";
import Product from "../models/Product.js";

const router = express.Router();

// **1. Add to Wishlist**
router.post("/add", verifyUser, async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user.id;

        if (!productId) {
            return res.status(400).json({ success: false, message: "Product ID is required" });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        let wishlist = await Wishlist.findOne({ userId });

        if (!wishlist) {
            wishlist = new Wishlist({ userId, items: [] });
        }

        const itemExists = wishlist.items.some((item) => item.productId.toString() === productId);

        if (itemExists) {
            return res.status(400).json({ success: false, message: "Item already exists in wishlist" });
        }

        wishlist.items.push({
            productId,
            productName: product.name,
            productImage: product.image,
            price: product.price,
        });

        await wishlist.save();
        res.status(200).json({ success: true, message: "Item added to wishlist", wishlist });
    } catch (error) {
        console.error("Wishlist Add Error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// **2. Get User Wishlist**
router.get("/", verifyUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const wishlist = await Wishlist.findOne({ userId });

        if (!wishlist || wishlist.items.length === 0) {
            return res.status(200).json({ success: true, message: "Wishlist is empty", wishlist: { items: [] } });
        }

        res.status(200).json({ success: true, wishlist });
    } catch (error) {
        console.error("Get Wishlist Error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// **3. Remove from Wishlist**
router.delete("/remove/:productId", verifyUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;

        let wishlist = await Wishlist.findOne({ userId });

        if (!wishlist) {
            return res.status(404).json({ success: false, message: "Wishlist not found" });
        }

        wishlist.items = wishlist.items.filter(item => item.productId.toString() !== productId);

        await wishlist.save();
        res.status(200).json({ success: true, message: "Item removed from wishlist", wishlist });
    } catch (error) {
        console.error("Remove Wishlist Item Error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

export default router;
