import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, message: "Access Denied: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("🔍 Decoded Token:", decoded); // ✅ Debugging log

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid Token: User not found" });
    }

    req.user = user;  
    req.userId = decoded.id; // ✅ Explicitly setting userId

    console.log("✅ Middleware User ID Set:", req.userId); // ✅ Debug log

    next();
  } catch (error) {
    console.error("❌ Auth Middleware Error:", error);
    return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
  }
};
// Default export (for general authentication middleware)
const authMiddleware = verifyUser;

export default authMiddleware;
