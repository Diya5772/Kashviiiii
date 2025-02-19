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
// Add this new endpoint to your existing wishlist routes
router.get("/top-products", verifyUser, async (req, res) => {
    try {
        console.log('Fetching top wishlisted products...');
        
        const trendingProducts = await Wishlist.aggregate([
            // Unwind the items array to get individual items
            { $unwind: "$items" },
            // Group by productId and count occurrences
            {
                $group: {
                    _id: "$items.productId",
                    productName: { $first: "$items.productName" },
                    productImage: { $first: "$items.productImage" },
                    price: { $first: "$items.price" },
                    wishlistCount: { $sum: 1 }
                }
            },
            // Sort by count in descending order
            { $sort: { wishlistCount: -1 } },
            // Get top 5 most wishlisted products
            { $limit: 5 }
        ]);

        console.log('Trending products found:', trendingProducts);

        res.status(200).json({
            success: true,
            wishlist: {
                items: trendingProducts
            }
        });
    } catch (error) {
        console.error("Get Trending Products Error:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching trending products"
        });
    }
});
router.get("/trending-products", async (req, res) => {
    try {
        const trendingProducts = await Wishlist.aggregate([
            // Unwind the items array
            { $unwind: "$items" },
            // Group by productId and count occurrences
            {
                $group: {
                    _id: "$items.productId",
                    productName: { $first: "$items.productName" },
                    productImage: { $first: "$items.productImage" },
                    price: { $first: "$items.price" },
                    wishlistCount: { $sum: 1 }
                }
            },
            // Sort by wishlistCount in descending order
            { $sort: { wishlistCount: -1 } },
            // Get top 5 products
            { $limit: 5 }
        ]);

        res.status(200).json({
            success: true,
            trendingProducts
        });
    } catch (error) {
        console.error("Get Trending Products Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
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
