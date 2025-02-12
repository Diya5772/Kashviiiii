import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';

const filters = [
  { label: 'Category', options: ['Silk Sarees', 'Cotton Sarees', 'Designer Sarees', 'Traditional Sarees'] },
  { label: 'Border', options: ['Broad Border', 'Medium Border', 'Small Border'] },
  { label: 'Border Type', options: ['Zari Border', 'Thread Border', 'Temple Border', 'Embroidered Border'] },
  { label: 'Fabric Purity', options: ['Pure Silk', 'Blended Silk', 'Pure Cotton', 'Synthetic'] },
  { label: 'Material', options: ['Kanchipuram Silk', 'Banarasi Silk', 'Tussar Silk', 'Chiffon', 'Georgette', 'Organza', 'Cotton'] },
  { label: 'Occasion', options: ['Wedding', 'Party Wear', 'Casual Wear', 'Festive Wear'] },
  { label: 'Ornamentation Type', options: ['Handwoven', 'Embroidered', 'Printed', 'Stone Work'] },
  { label: 'Pattern', options: ['Plain', 'Stripes', 'Checks', 'Floral', 'Paisley', 'Traditional Motifs'] },
  { label: 'Color', options: ['Red', 'Blue', 'Green', 'Yellow', 'Black', 'White', 'Pink', 'Purple', 'Gold', 'Silver'] },
  { label: 'Technique', options: ['Handloom', 'Powerloom', 'Block Print', 'Digital Print'] },
  { label: 'Zari Color', options: ['Gold Zari', 'Silver Zari', 'Copper Zari', 'Antique Zari'] },
  { label: 'Zari Type', options: ['Pure Zari', 'Tested Zari', 'Imitation Zari'] }
];

const Product = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    subCategory: '',
    sizes: [],
    bestseller: false,
    filters: {},
    image: null
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Trying");
    try {
      const formDataToSend = new FormData();
      
      // Add basic fields
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('subCategory', formData.subCategory);
      formDataToSend.append('sizes', formData.sizes.join(','));
      formDataToSend.append('bestseller', formData.bestseller);
      
      // Add filters as JSON string
      formDataToSend.append('filters', JSON.stringify(formData.filters));
      
      // Add image file
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const response = await fetch('http://localhost:5000/api/product/add', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Success:', data);
      navigate('/products'); // Adjust this path as needed
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSizeChange = (e) => {
    const selectedSizes = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData((prev) => ({ ...prev, sizes: selectedSizes }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleFilterChange = (filter, value) => {
    setFormData((prev) => ({
      ...prev,
      filters: { ...prev.filters, [filter]: value }
    }));
  };

  return (
    <div>
      <AdminNavbar />
      <div className="container mx-auto p-6">
        <h1 className="text-xl font-semibold mb-4">Add New Product</h1>
        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          {/* Product Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="font-medium">Product Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="border p-2 rounded-md" required />
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label htmlFor="description" className="font-medium">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} className="border p-2 rounded-md" required />
          </div>

          {/* Price */}
          <div className="flex flex-col">
            <label htmlFor="price" className="font-medium">Price (Optional)</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} className="border p-2 rounded-md" />
          </div>

          {/* Image Upload */}
          <div className="flex flex-col">
            <label htmlFor="image" className="font-medium">Upload Image</label>
            <input type="file" name="image" onChange={handleImageChange} accept="image/*" className="border p-2 rounded-md" />
            {formData.image && (
              <div className="mt-2">
                <img src={URL.createObjectURL(formData.image)} alt="Preview" className="w-32 h-32 object-cover rounded-md" />
              </div>
            )}
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label htmlFor="category" className="font-medium">Category</label>
            <input type="text" name="category" value={formData.category} onChange={handleChange} className="border p-2 rounded-md" required />
          </div>

          {/* Subcategory */}
          <div className="flex flex-col">
            <label htmlFor="subCategory" className="font-medium">Subcategory</label>
            <select name="subCategory" value={formData.subCategory} onChange={handleChange} className="border p-2 rounded-md" required>
              <option value="">Select Subcategory</option>
              {filters[0].options.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* Filters */}
          {filters.slice(1).map((filter) => (
            <div className="flex flex-col" key={filter.label}>
              <label htmlFor={filter.label} className="font-medium">{filter.label}</label>
              <select name={filter.label} value={formData.filters[filter.label] || ''} onChange={(e) => handleFilterChange(filter.label, e.target.value)} className="border p-2 rounded-md">
                <option value="">Select {filter.label}</option>
                {filter.options.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          ))}

          {/* Sizes */}
          <div className="flex flex-col">
            <label htmlFor="sizes" className="font-medium">Available Sizes</label>
            <select name="sizes" multiple onChange={handleSizeChange} className="border p-2 rounded-md">
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>

          {/* Bestseller Checkbox */}
          <div className="flex items-center gap-2">
            <input type="checkbox" name="bestseller" checked={formData.bestseller} onChange={() => setFormData((prev) => ({ ...prev, bestseller: !prev.bestseller }))} className="mt-1" />
            <label htmlFor="bestseller" className="font-medium">Is this a bestseller?</label>
          </div>

          {/* Submit Button */}
          <div className="flex">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Add Product</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Product;
