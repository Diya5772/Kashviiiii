import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import xMarkIcon from "../assets/assets/xmark-solid.svg";
import angleDownIcon from "../assets/assets/angle-down-solid.svg";
import { assets } from "../assets/assets/frontend_assets/assets";
import heartIcon from "../assets/assets/heart_icon.svg";
import heartIconSolid from "../assets/assets/heart-solid.svg";
import Navbar from "../components/navbar";
import search_icon from "../assets/magnifying-glass.svg";  // Updated path to match your actual file location
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
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, products, selectedFilters]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/product/all");
      setProducts(response.data);
      setDisplayedProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const filterProducts = () => {
    let filteredProducts = [...products];

    // Apply search term filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filteredProducts = filteredProducts.filter(product => {
        // Search in product name
        const nameMatch = product.name.toLowerCase().includes(searchLower);
        
        // Search in product categories and other attributes
        const categoryMatch = Object.entries(product).some(([key, value]) => {
          if (typeof value === 'string') {
            return value.toLowerCase().includes(searchLower);
          }
          return false;
        });

        // Search in selected filters
        const filterMatch = Object.values(selectedFilters).some(filter => 
          filter.toLowerCase().includes(searchLower)
        );

        return nameMatch || categoryMatch || filterMatch;
      });
    }

    // Apply selected filters
    if (Object.keys(selectedFilters).length > 0) {
      filteredProducts = filteredProducts.filter(product => {
        return Object.entries(selectedFilters).every(([key, value]) => {
          return product[key.toLowerCase()] === value || 
                 product.category === value || 
                 product.attributes?.[key.toLowerCase()] === value;
        });
      });
    }

    setDisplayedProducts(filteredProducts);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleProductClick = (id) => navigate(`/product/${id}`);

  const toggleFilter = (filterLabel) => {
    setOpenFilter(openFilter === filterLabel ? null : filterLabel);
  };

  const handleFilterClick = (filterLabel, option) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };
      if (newFilters[filterLabel] === option) {
        delete newFilters[filterLabel];
      } else {
        newFilters[filterLabel] = option;
      }
      return newFilters;
    });
  };

  const applyFilters = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/product/filter", selectedFilters);
      setProducts(response.data);
      filterProducts();
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };

  const resetFilters = () => {
    setSelectedFilters({});
    setSearchTerm("");
    fetchProducts();
  };

  return (
    <div className="font-poppins">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-4 mt-24">
        {/* Search and Filter Header */}
        <div className="flex flex-col gap-4 mb-6">
          {/* Search Bar */}
          <div className="relative w-full max-w-xl mx-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search products by name, category, or any attribute..."
              className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-[#B5865E] focus:ring-1 focus:ring-[#B5865E]"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <img src={search_icon} alt="Search" className="w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Filter Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl text-gray-700">
              {searchTerm ? `Search Results for "${searchTerm}"` : 
               Object.keys(selectedFilters).length ? "Filtered Products" : "All Products"}
              <span className="text-sm text-gray-500 ml-2">
                ({displayedProducts.length} items)
              </span>
            </h2>
            <button 
              onClick={resetFilters} 
              className="text-[#B5865E] hover:text-[#8e6446] flex items-center"
            >
              Clear All <img src={xMarkIcon} alt="Reset" className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex gap-8">
          {/* Filters Section */}
          <div className="w-64">
            {filtersList.map((filter) => (
              <div key={filter.label} className="mb-4 border-b border-gray-200">
                <button 
                  onClick={() => toggleFilter(filter.label)} 
                  className="w-full flex justify-between py-2 text-gray-700"
                >
                  {filter.label}
                  <img 
                    src={angleDownIcon} 
                    alt="Toggle" 
                    className={`w-4 h-4 ${openFilter === filter.label ? "rotate-180" : ""}`} 
                  />
                </button>
                {openFilter === filter.label && (
                  <div className="py-2">
                    {filter.options.map(option => (
                      <div key={option} className="flex items-center py-1">
                        <input
                          type="checkbox"
                          id={option}
                          onChange={() => handleFilterClick(filter.label, option)}
                          checked={selectedFilters[filter.label] === option}
                          className="mr-3 accent-[#B5865E]"
                        />
                        <label htmlFor={option} className="text-gray-600">{option}</label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button 
              onClick={applyFilters} 
              className="w-full bg-[#B5865E] text-white py-2 px-4 hover:bg-[#8e6446]"
            >
              Apply Filters
            </button>
          </div>

          {/* Products Grid */}
          <div className="flex-1 grid grid-cols-3 gap-8">
            {displayedProducts.map(product => (
              <div 
                key={product._id} 
                className="group cursor-pointer" 
                onClick={() => handleProductClick(product._id)}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-[500px] object-cover" 
                  />
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-all">
                    <button className="bg-white/70 p-2 rounded-full hover:bg-white/90">
                      <img src={assets.cart_icon} alt="Cart" className="w-6 h-6" />
                    </button>
                    <button 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        setWishlist(prev => ({ ...prev, [product._id]: !prev[product._id] })); 
                      }} 
                      className="bg-white/70 p-2 rounded-full hover:bg-white/90"
                    >
                      <img 
                        src={wishlist[product._id] ? heartIconSolid : heartIcon} 
                        alt="Wishlist" 
                        className="w-6 h-6" 
                      />
                    </button>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-gray-700 text-sm">{product.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;