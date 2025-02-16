import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const verifyAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, message: "Access Denied: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("🔍 Decoded Token:", decoded);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid Token: User not found" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access Denied: Admins only" });
    }

    req.user = user;
    req.userId = decoded.id;

    console.log("✅ Admin Middleware User ID Set:", req.userId);
    
    next();
  } catch (error) {
    console.error("❌ Admin Middleware Error:", error);
    return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
  }
};

export default verifyAdmin;
