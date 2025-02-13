import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "../components/navbar";

const ShowProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/product/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="text-center text-xl font-semibold mt-10">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center text-xl font-semibold mt-10">Product not found</div>;
  }

  return (
    <div>    <Navbar />
    <div className="w-full mx-auto p-5 border bg-white flex flex-col md:flex-row">
  
      <div className="flex flex-col md:flex-row w-full">
        {/* Left Section - Product Images */}
        <div className="w-full md:w-1/2 p-4">
          <div className="flex flex-col space-y-4">
            <img
              src={product.image ? `http://localhost:5000${product.image}` : "https://via.placeholder.com/300"}
              alt={product.name}
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />
            <div className="flex space-x-2 overflow-x-auto">
              {product.images && product.images.length > 0 ? (
                product.images.map((img, index) => (
                  <img
                    key={index}
                    src={`http://localhost:5000${img}`}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-16 h-16 object-cover rounded-lg border cursor-pointer hover:opacity-80"
                  />
                ))
              ) : (
                <p>No additional images</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Section - Product Details */}
        <div className="w-full md:w-1/2 p-4">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-lg text-gray-600 mt-2">{product.description}</p>
          <p className="text-xl font-semibold text-gray-900 mt-4">Price: ₹{product.price}</p>
          <p className="text-gray-600 mt-2">Category: {product.category}</p>
          <p className="text-gray-600 mt-2">Subcategory: {product.subCategory}</p>
          
          <button className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg text-lg font-bold hover:bg-red-600">
            Add to Cart
          </button>
          <button className="mt-2 w-full border border-red-500 text-red-500 py-2 rounded-lg text-lg font-bold hover:bg-red-100">
            Add to Wishlist
          </button>
          
          <h2 className="text-xl font-bold mt-6 text-gray-800">Product Details</h2>
          <div className="mt-2 bg-gray-100 p-4 rounded-lg">
            {product.filters ? (
              <>
                <p>Border: {product.filters.Border || "N/A"}</p>
                <p>Border Type: {product.filters["Border Type"] || "N/A"}</p>
                <p>Fabric Purity: {product.filters["Fabric Purity"] || "N/A"}</p>
                <p>Material: {product.filters.Material || "N/A"}</p>
                <p>Occasion: {product.filters.Occasion || "N/A"}</p>
                <p>Ornamentation Type: {product.filters["Ornamentation Type"] || "N/A"}</p>
                <p>Pattern: {product.filters.Pattern || "N/A"}</p>
                <p>Color: {product.filters.Color || "N/A"}</p>
                <p>Technique: {product.filters.Technique || "N/A"}</p>
                <p>Zari Color: {product.filters["Zari Color"] || "N/A"}</p>
                <p>Zari Type: {product.filters["Zari Type"] || "N/A"}</p>
              </>
            ) : (
              <p>No filters available</p>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ShowProduct;
