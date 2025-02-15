import axios from "axios";

const API_URL = "http://localhost:5000/api/wishlist"; // Update with your backend URL

// Get wishlist items
export const getWishlist = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    throw error;
  }
};

// Toggle wishlist (add/remove)
export const toggleWishlist = async (userId, product) => {
  try {
    const response = await axios.post(`${API_URL}/toggle`, { userId, ...product });
    return response.data;
  } catch (error) {
    console.error("Error updating wishlist:", error);
    throw error;
  }
};
