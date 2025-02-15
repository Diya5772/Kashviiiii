import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/wishlist", {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        console.log("Fetched Wishlist:", data);
        setWishlist(data.wishlist);
      } catch (error) {
        console.error("Error fetching wishlist items:", error);
      }
    };

    fetchWishlist();
  }, []);

  const removeFromWishlist = async (productId) => {
    try {
      await fetch(`http://localhost:5000/api/wishlist/remove/${productId}`, {
        method: 'DELETE',
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setWishlist(prevWishlist => ({
        ...prevWishlist,
        items: prevWishlist.items.filter(item => item.productId !== productId)
      }));

      console.log(`Removed item ${productId} from wishlist.`);
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
    }
  };

  const addToCart = async (item) => {
    try {
      await fetch("http://localhost:5000/api/carts/add", {
        method: 'POST',
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productId: item.productId,
          name: item.productName,
          price: item.price,
          image: item.productImage,
          quantity: 1
        })
      });

      console.log(`Added item ${item.productId} to cart.`);
      removeFromWishlist(item.productId);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-amber-800 mb-8 font-serif">My Wishlist</h2>
      
      {wishlist && wishlist.items?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlist.items.map(item => (
            <div 
              key={item.productId}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 max-w-sm mx-auto"
            >
              <div 
                className="relative pb-[140%] cursor-pointer"
                onClick={() => navigate(`/Product/${item.productId}`)} // Redirect to ShowProduct
              >
                <img
                  src={`http://localhost:5000${item.productImage}`}
                  alt={item.productName}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 font-serif">
                  {item.productName}
                </h3>
                <p className="text-xl font-bold text-amber-700 mb-6 font-serif">
                  ₹{item.price.toLocaleString()}
                </p>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => addToCart(item)}
                    className="flex-1 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-3 rounded-md hover:from-amber-700 hover:to-amber-800 transition-all duration-200 font-serif text-lg shadow-md"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.productId)}
                    className="px-6 py-3 border border-amber-300 text-amber-700 rounded-md hover:bg-amber-50 transition-colors duration-200 font-serif"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-amber-800 font-serif">Your wishlist is empty</p>
          <p className="text-amber-600 mt-2 font-serif">Add items to your wishlist to save them for later</p>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
