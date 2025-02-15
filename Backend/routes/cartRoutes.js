import express from "express";
import { verifyUser } from "../middleware/authMiddleware.js"; 
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

const router = express.Router();

// **1. Add an Item to Cart**
router.post("/add", verifyUser, async (req, res) => {
    try {
        console.log(req.body);
        const { productId, quantity = 1 } = req.body;
        const userId = req.user.id; // Extracted from authMiddleware

        if (!productId) {
            return res.status(400).json({ success: false, message: "Product ID is required" });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({
                productId,
                productName: product.name,
                productImage: product.image,
                quantity,
                price: product.price
            });
        }

        cart.totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

        await cart.save();
        res.status(200).json({ success: true, message: "Item added to cart", cart });
    } catch (error) {
        console.error("Cart Add Error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// **2. Get User Cart**
router.get("/", verifyUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await Cart.findOne({ userId });

        if (!cart || cart.items.length === 0) {
            return res.status(200).json({ success: true, message: "Cart is empty", cart: { items: [], totalPrice: 0 } });
        }

        res.status(200).json({ success: true, cart });
    } catch (error) {
        console.error("Get Cart Error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// **3. Remove an Item from Cart**
router.delete("/remove/:productId", verifyUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

        cart.items = cart.items.filter(item => item.productId.toString() !== productId);

        cart.totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

        await cart.save();
        res.status(200).json({ success: true, message: "Item removed from cart", cart });
    } catch (error) {
        console.error("Remove Cart Item Error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// **4. Clear Entire Cart**
router.delete("/clear", verifyUser, async (req, res) => {
    try {
        const userId = req.user.id;

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

        cart.items = [];
        cart.totalPrice = 0;

        await cart.save();
        res.status(200).json({ success: true, message: "Cart cleared", cart });
    } catch (error) {
        console.error("Clear Cart Error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

export default router;
