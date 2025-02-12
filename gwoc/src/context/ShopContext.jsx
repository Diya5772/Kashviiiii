import React, { createContext, useState } from 'react';
import { products as initialProducts } from "../assets/assets/frontend_assets/assets";

export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts);
  const [likedItems, setLikedItems] = useState([]);
  const [cart, setCart] = useState([]);
  const currency = '$';
  const delivery_fee = 10;

  // Toggle Like Function
  const toggleLike = (productId) => {
    setLikedItems((prevLikedItems) => {
      return prevLikedItems.includes(productId)
        ? prevLikedItems.filter((id) => id !== productId) // Remove like
        : [...prevLikedItems, productId]; // Add like
    });
  };
  

  // Add to Cart Function
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const value = {
    products,
    setProducts,
    currency,
    delivery_fee,
    likedItems,
    toggleLike,
    cart,
    addToCart,
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};
