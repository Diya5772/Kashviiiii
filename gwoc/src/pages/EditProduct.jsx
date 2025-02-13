import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    subCategory: "",
    sizes: "",
    bestseller: false,
    filters: {},
    image: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/product/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/product/product/${id}`, product);
      navigate("/productlist");
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Product Name" className="w-full p-2 border rounded" required />
        <textarea name="description" value={product.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" required />
        <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Price" className="w-full p-2 border rounded" required />
        <input type="text" name="category" value={product.category} onChange={handleChange} placeholder="Category" className="w-full p-2 border rounded" required />
        <input type="text" name="subCategory" value={product.subCategory} onChange={handleChange} placeholder="Subcategory" className="w-full p-2 border rounded" required />
        <input type="text" name="sizes" value={product.sizes} onChange={handleChange} placeholder="Sizes (comma-separated)" className="w-full p-2 border rounded" required />
        <input type="checkbox" name="bestseller" checked={product.bestseller} onChange={() => setProduct({ ...product, bestseller: !product.bestseller })} className="mr-2" /> Bestseller
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
