import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/product/all")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/product/product/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border rounded-lg p-4 shadow-md">
<img 
  src={product.image ? product.image : "https://via.placeholder.com/150"} 
  alt={product.name} 
  className="w-full h-40 object-cover rounded" 
/>            <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
            <p className="text-gray-600">Price: ₹{product.price}</p>
            <div className="flex justify-between mt-4">
              <Link to={`/EditProduct/${product._id}`} className="bg-blue-500 text-white px-4 py-2 rounded">Edit</Link>
              <button onClick={() => handleDelete(product._id)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
