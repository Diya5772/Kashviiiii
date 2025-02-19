import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

const TrendingProducts = ({ onNavigate = (productId) => console.log(`Navigate to product ${productId}`) }) => {
    const [trendingProducts, setTrendingProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchTrendingProducts = async () => {
            try {
                console.log("Fetching trending products with token:", token);

                const response = await fetch("http://localhost:5000/api/wishlist/top-products", {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Raw response data:", data);

                // Extract items from the correct path in the response
                const products = data.wishlist?.items || [];
                console.log("Extracted products:", products);

                if (products.length > 0) {
                    const formattedProducts = products.map(product => ({
                        _id: product._id,
                        productName: product.productName,
                        productImage: product.productImage,
                        price: product.price,
                        count: product.wishlistCount
                    }));

                    console.log("Formatted products:", formattedProducts);
                    setTrendingProducts(formattedProducts);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching trending products:", error);
                setLoading(false);
            }
        };

        if (token) {
            fetchTrendingProducts();
        } else {
            setLoading(false);
        }
    }, [token]);

    // Debug logging
    console.log("Current state - loading:", loading);
    console.log("Current state - trendingProducts:", trendingProducts);

    if (loading) {
        return (
            <div className="text-center py-16">
                <p className="text-2xl font-serif text-gray-700">Loading our finest collection...</p>
            </div>
        );
    }

    if (!trendingProducts || trendingProducts.length === 0) {
        return (
            <div className="text-center py-16">
                <p className="text-2xl font-serif text-gray-700">Collection coming soon...</p>
            </div>
        );
    }

    return (
        <div className="max-w-[1800px] mx-auto px-8 py-16">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-serif text-gray-900 mb-4">SINGHANIA'S CHRONICLES</h2>
                <p className="text-lg text-gray-600 font-serif max-w-3xl mx-auto">
                    Discover our curated collection of handwoven treasures, where each piece tells a story of tradition and craftsmanship.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {trendingProducts.map((item) => (
                    <div key={item._id} className="group">
                        <div className="relative cursor-pointer" onClick={() => onNavigate(item._id)}>
                            {/* Product Image with Hover Effect */}
                            <div className="relative overflow-hidden">
                                <img
                                    src={item.productImage?.startsWith('/uploads') 
                                        ? `http://localhost:5000${item.productImage}`
                                        : item.productImage}
                                    alt={item.productName}
                                    className="w-full aspect-[3/4] object-cover transform group-hover:scale-105 transition-transform duration-500"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/300x400?text=Product+Image';
                                    }}
                                />
                                {/* Inner border with gap */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute inset-5 border border-white"></div>
                                </div>
                                {/* Likes counter */}
                                <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/40 text-white px-2 py-1 rounded-full text-sm">
                                    <Heart size={14} />
                                    <span>{item.count || 0}</span>
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="mt-4 text-center">
                                <h3 className="font-serif text-lg text-gray-900 mb-2 group-hover:text-amber-800 transition-colors duration-300">
                                    {item.productName}
                                </h3>
                                <p className="font-serif text-xl text-gray-800">
                                    ₹{(item.price || 0).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrendingProducts;