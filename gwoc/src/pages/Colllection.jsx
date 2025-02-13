import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../components/navbar";
import xMarkIcon from "../assets/assets/xmark-solid.svg";
import angleDownIcon from "../assets/assets/angle-down-solid.svg";
import { assets } from "../assets/assets/frontend_assets/assets";
import heartIcon from "../assets/assets/heart_icon.svg";
import heartIconSolid from "../assets/assets/heart-solid.svg";

const filtersList = [
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

const Collection = () => {
  const [products, setProducts] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [openFilter, setOpenFilter] = useState(null);
  const [wishlist, setWishlist] = useState({});
  const navigate = useNavigate(); // React Router navigation

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get("http://localhost:5000/api/product/all")
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error fetching products:", error));
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const toggleFilter = (filterLabel) => {
    setOpenFilter(openFilter === filterLabel ? null : filterLabel);
  };

  const handleFilterClick = (filterLabel, option) => {
    setSelectedFilters(prev => ({ ...prev, [filterLabel]: option }));
  };

  const applyFilters = () => {
    axios.post("http://localhost:5000/api/product/filter", selectedFilters)
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error applying filters:", error));
  };

  const removeFilter = (filterLabel) => {
    setSelectedFilters(prev => {
      const updatedFilters = { ...prev };
      delete updatedFilters[filterLabel];
      return updatedFilters;
    });
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev => ({ ...prev, [productId]: !prev[productId] }));
  };

  return (
    <div className="font-poppins">
      <Navbar />
      <div className="mx-auto px-4 py-4 flex">
        <div className="w-1/5 p-4 border-r ml-[25px]">
          <h2 className="text-2xl text-gray-800 mb-4 my-7">FILTERS</h2>
          <div className="mt-4">
            {Object.entries(selectedFilters).map(([key, value]) => (
              <div key={key} className="flex items-center bg-gray-200 px-1 py-1 rounded mb-2">
                {key}: {value}
                <button onClick={() => removeFilter(key)} className="ml-2 py-1 text-gray-500">
                  <img src={xMarkIcon} alt="Remove" className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          {filtersList.map((filter) => (
            <div key={filter.label} className="mb-4 border-b pb-2">
              <button
                onClick={() => toggleFilter(filter.label)}
                className="flex justify-between items-center text-gray-700 w-full text-center font-medium py-1"
              >
                {filter.label}
                <img
                  src={angleDownIcon}
                  alt="Toggle"
                  className={`w-4 h-4 transition-transform ${openFilter === filter.label ? "rotate-180" : ""}`}
                />
              </button>
              {openFilter === filter.label && (
                <div className="mt-2 pl-4">
                  {filter.options.map(option => (
                    <div key={option} className="flex items-center mb-1">
                      <input
                        type="checkbox"
                        id={option}
                        onChange={() => handleFilterClick(filter.label, option)}
                        checked={selectedFilters[filter.label] === option}
                        className="mr-2"
                      />
                      <label htmlFor={option}>{option}</label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button onClick={applyFilters} className="mt-4 w-full bg-gray-400 text-white py-2 px-4 hover:bg-gray-500 transition duration-300">Apply Filters</button>
        </div>
        <div className="w-4/5 p-4 mx-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <div
              key={product._id}
              className="border h-80 overflow-hidden shadow-md bg-white flex flex-col cursor-pointer"
              onClick={() => handleProductClick(product._id)}
            >
              <img src={`http://localhost:5000${product.image}`} alt={product.name} className="w-full h-[250px] object-cover" />
              <div className="p-4 flex justify-between items-center">
                <h3 className="text-lg font-medium text-left">{product.name}</h3>
                <div className="flex space-x-2">
                  <img src={assets.cart_icon} alt="Cart" className="w-6 h-6 cursor-pointer" />
                  <img
                    src={wishlist[product._id] ? heartIconSolid : heartIcon}
                    alt="Wishlist"
                    className="w-6 h-6 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the product click event
                      toggleWishlist(product._id);
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
