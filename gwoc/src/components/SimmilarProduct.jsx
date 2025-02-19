import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SimilarProducts = ({ currentProduct }) => {
    const [similarProducts, setSimilarProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSimilarProducts = async () => {
            // Early return if no current product
            if (!currentProduct || !currentProduct._id) {
                console.log("No valid current product", currentProduct);
                setLoading(false);
                return;
            }

            try {
                console.log("Sending request with product:", {
                    id: currentProduct._id,
                    category: currentProduct.category,
                    filters: currentProduct.filters
                });

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
                console.log("Received similar products:", data);
                setSimilarProducts(data);
            } catch (error) {
                console.error("Error fetching similar products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSimilarProducts();
    }, [currentProduct]);

    // Debug logging
    console.log("Current product in component:", currentProduct);
    console.log("Similar products state:", similarProducts);

    if (!currentProduct) {
        return null;
    }

    return (
        <div className="mt-16 mb-8 bg-[#1C1A1A]">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <h2 className="text-3xl font-serif text-amber-500 mb-8">Similar Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {similarProducts.map((product) => (
                        <div 
                            key={product._id}
                            className="group cursor-pointer"
                            onClick={() => {
                                window.scrollTo(0, 0);
                                navigate(`/product/${product._id}`);
                            }}
                        >
                            <div className="relative overflow-hidden rounded-lg">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-[400px] object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/400x400?text=Product+Image';
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <div className="bg-black/75 p-4 rounded-lg">
                                        <h3 className="text-white font-serif text-lg">
                                            {product.name}
                                        </h3>
                                        <p className="text-amber-400 font-medium mt-1">
                                            Design No: {product.price?.toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SimilarProducts;