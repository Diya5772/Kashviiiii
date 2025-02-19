import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from "lucide-react";

const SimilarProducts = ({ currentProduct }) => {
    const [similarProducts, setSimilarProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSimilarProducts = async () => {
            if (!currentProduct || !currentProduct._id) {
                console.log("No valid current product", currentProduct);
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/api/product/similar', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        excludeId: currentProduct._id,
                        category: currentProduct.category,
                        filters: currentProduct.filters || {}
                    })
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch similar products');
                }

                const data = await response.json();
                setSimilarProducts(data);
            } catch (error) {
                console.error("Error fetching similar products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSimilarProducts();
    }, [currentProduct]);

    if (!currentProduct) return null;

    if (loading) {
        return (
            <div className="text-center py-16">
                <p className="text-2xl font-serif text-gray-700">
                    Discovering similar treasures...
                </p>
            </div>
        );
    }

    if (!similarProducts || similarProducts.length === 0) {
        return (
            <div className="text-center py-16">
                <p className="text-2xl font-serif text-gray-700">
                    More treasures coming soon...
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-full mx-auto px-8 py-16 bg-white">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-serif text-gray-900 mb-4">
                    EXPLORE SIMILAR DESIGNS
                </h2>
                <p className="text-lg text-gray-600 font-serif max-w-3xl mx-auto">
                    Discover more exquisite pieces from our collection that complement your style.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {similarProducts.map((product) => (
                    <div 
                        key={product._id}
                        className="group"
                    >
                        <div 
                            className="relative cursor-pointer" 
                            onClick={() => {
                                window.scrollTo(0, 0);
                                navigate(`/product/${product._id}`);
                            }}
                        >
                            {/* Product Image with Hover Effect */}
                            <div className="relative overflow-hidden">
                                <img
                                    src={product.image?.startsWith('/uploads') 
                                        ? `http://localhost:5000${product.image}`
                                        : product.image}
                                    alt={product.name}
                                    className="w-full aspect-[3/4] object-cover transform 
                                        group-hover:scale-105 transition-transform duration-500"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/300x400?text=Product+Image';
                                    }}
                                />
                                {/* Inner border with gap */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
                                    transition-opacity duration-300">
                                    <div className="absolute inset-5 border border-white"></div>
                                </div>
                                {/* Likes counter */}
                                <div className="absolute bottom-3 right-3 flex items-center gap-1 
                                    bg-black/40 text-white px-2 py-1 rounded-full text-sm">
                                    <Heart size={14} />
                                    <span>{product.wishlistCount || 0}</span>
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="mt-4 text-center">
                                <h3 className="font-serif text-lg text-gray-900 mb-2 
                                    group-hover:text-amber-800 transition-colors duration-300">
                                    {product.name}
                                </h3>
                                <p className="font-serif text-xl text-gray-800">
                                    Design No: {product.price?.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SimilarProducts;