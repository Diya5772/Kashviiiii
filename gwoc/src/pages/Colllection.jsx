import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import xMarkIcon from "../assets/assets/xmark-solid.svg";
import angleDownIcon from "../assets/assets/angle-down-solid.svg";
import { assets } from "../assets/assets/frontend_assets/assets";
import heartIcon from "../assets/assets/heart_icon.svg";
import heartIconSolid from "../assets/assets/heart-solid.svg";
import Navbar from "../components/navbar";

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
  { label: 'Zari Type', options: ['Pure Zari', 'Tested Zari', 'Imitation Zari'] },
];

const Collection = () => {
  const [products, setProducts] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [openFilter, setOpenFilter] = useState(null);
  const [wishlist, setWishlist] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/product/all");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
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
      setIsFilterOpen(false);
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };

  const resetFilters = () => {
    setSelectedFilters({});
    fetchProducts();
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="font-poppins bg-[#FBF9F6]">
      <Navbar />
      {/* Hero Section */}
      <div className="relative w-full h-[60vh]">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=2574')",
            backgroundPosition: "center 30%"
          }}
        >
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>
        
        <div className="relative h-full flex flex-col justify-center items-center text-center px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4">
              Exquisite Collection of Sarees
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Discover our handpicked selection of traditional and contemporary sarees
            </p>
            <button 
              onClick={() => {
                const productsSection = document.getElementById('products-section');
                productsSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white text-gray-900 px-8 py-3 rounded-md hover:bg-gray-100 transition-colors"
            >
              Explore Collection
            </button>
          </motion.div>
        </div>
      </div>
      
      <div id="products-section" className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl text-gray-800">
              {Object.keys(selectedFilters).length ? "Filtered Collection" : "All Collection"}
            </h2>
            <p className="text-gray-500 mt-1">{filteredProducts.length} items</p>
          </div>
          
          <div className="flex gap-4">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for products..."
              className="px-4 py-2 border border-gray-300 rounded-md"
            />
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="md:hidden px-4 py-2 border border-[#3B82F6] text-[#3B82F6] rounded-md"
            >
              Filters
            </button>
            
            {Object.keys(selectedFilters).length > 0 && (
              <button 
                onClick={resetFilters} 
                className="text-[#3B82F6] hover:text-[#2563EB] flex items-center"
              >
                Clear All <img src={xMarkIcon} alt="Reset" className="w-4 h-4 ml-2" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Filter Modal */}
        {isFilterOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
            <div className="bg-white w-80 h-full overflow-y-auto p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium">Filters</h2>
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <img src={xMarkIcon} alt="Close" className="w-6 h-6" />
                </button>
              </div>
              {filtersList.map((filter) => (
                <div key={filter.label} className="mb-6 border-b border-gray-100 pb-4">
                  <button 
                    onClick={() => toggleFilter(filter.label)}
                    className={`w-full flex justify-between items-center py-2 transition-colors ${
                      selectedFilters[filter.label] 
                        ? 'text-[#3B82F6] font-medium' 
                        : 'text-gray-700 hover:text-[#3B82F6]'
                    }`}
                  >
                    <span className="font-medium">
                      {filter.label}
                      {selectedFilters[filter.label] && (
                        <span className="ml-2 text-sm">
                          ({selectedFilters[filter.label]})
                        </span>
                      )}
                    </span>
                    <img 
                      src={angleDownIcon} 
                      alt="Toggle" 
                      className={`w-4 h-4 transition-transform duration-300 ${
                        openFilter === filter.label ? "rotate-180" : ""
                      } ${selectedFilters[filter.label] ? "text-[#3B82F6]" : ""}`}
                    />
                  </button>
                  
                  {openFilter === filter.label && (
                    <div className="mt-2 space-y-1">
                      {filter.options.map(option => (
                        <div 
                          key={option} 
                          className={`rounded-md transition-all duration-300 ${
                            selectedFilters[filter.label] === option 
                              ? 'bg-blue-50 border-l-4 border-[#3B82F6]' 
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          <label className="flex items-center px-3 py-2 cursor-pointer">
                            <input
                              type="checkbox"
                              onChange={() => handleFilterClick(filter.label, option)}
                              checked={selectedFilters[filter.label] === option}
                              className="w-4 h-4 rounded border-gray-300 text-[#3B82F6] focus:ring-[#3B82F6]"
                            />
                            <span className={`ml-3 text-sm ${
                              selectedFilters[filter.label] === option 
                                ? 'text-[#3B82F6] font-medium' 
                                : 'text-gray-600'
                            }`}>
                              {option}
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <button 
                onClick={applyFilters}
                className={`w-full py-3 rounded-md transition-colors ${
                  Object.keys(selectedFilters).length > 0
                    ? 'bg-[#3B82F6] hover:bg-[#2563EB] text-white'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
                disabled={Object.keys(selectedFilters).length === 0}
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}

        <div className="flex gap-8">
          {/* Sticky Filters Sidebar */}
          <div className="hidden md:block w-64" style={{ position: 'sticky', top: '100px', height: 'calc(100vh - 100px)', overflowY: 'auto' }}>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              {filtersList.map((filter) => (
                <div key={filter.label} className="mb-6 border-b border-gray-100 pb-4">
                  <button 
                    onClick={() => toggleFilter(filter.label)}
                    className={`w-full flex justify-between items-center py-2 transition-colors ${
                      selectedFilters[filter.label] 
                        ? 'text-[#3B82F6] font-medium' 
                        : 'text-gray-700 hover:text-[#3B82F6]'
                    }`}
                  >
                    <span className="font-medium">
                      {filter.label}
                      {selectedFilters[filter.label] && (
                        <span className="ml-2 text-sm">
                          ({selectedFilters[filter.label]})
                        </span>
                      )}
                    </span>
                    <img 
                      src={angleDownIcon} 
                      alt="Toggle" 
                      className={`w-4 h-4 transition-transform duration-300 ${
                        openFilter === filter.label ? "rotate-180" : ""
                      } ${selectedFilters[filter.label] ? "text-[#3B82F6]" : ""}`}
                    />
                  </button>
                  
                  {openFilter === filter.label && (
                    <div className="mt-2 space-y-1">
                      {filter.options.map(option => (
                        <div 
                          key={option} 
                          className={`rounded-md transition-all duration-300 ${
                            selectedFilters[filter.label] === option 
                              ? 'bg-blue-50 border-l-4 border-[#3B82F6]' 
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          <label className="flex items-center px-3 py-2 cursor-pointer">
                            <input
                              type="checkbox"
                              onChange={() => handleFilterClick(filter.label, option)}
                              checked={selectedFilters[filter.label] === option}
                              className="w-4 h-4 rounded border-gray-300 text-[#3B82F6] focus:ring-[#3B82F6]"
                            />
                            <span className={`ml-3 text-sm ${
                              selectedFilters[filter.label] === option 
                                ? 'text-[#3B82F6] font-medium' 
                                : 'text-gray-600'
                            }`}>
                              {option}
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <button 
                onClick={applyFilters}
                className={`w-full py-3 rounded-md transition-colors ${
                  Object.keys(selectedFilters).length > 0
                    ? 'bg-[#3B82F6] hover:bg-[#2563EB] text-white'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
                disabled={Object.keys(selectedFilters).length === 0}
              >
                Apply Filters
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <div 
                key={product._id} 
                className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                onClick={() => handleProductClick(product._id)}
              >
                <div className="relative overflow-hidden aspect-[3/4]">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button 
                      className="bg-white/90 p-3 rounded-full hover:bg-white shadow-lg transform hover:scale-110 transition-transform"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add to cart functionality
                      }}
                    >
                      <img src={assets.cart_icon} alt="Cart" className="w-6 h-6" />
                    </button>
                    <button 
                      className="bg-white/90 p-3 rounded-full hover:bg-white shadow-lg transform hover:scale-110 transition-transform"
                      onClick={(e) => {
                        e.stopPropagation();
                        setWishlist(prev => ({ ...prev, [product._id]: !prev[product._id] }));
                      }}
                    >
                      <img 
                        src={wishlist[product._id] ? heartIconSolid : heartIcon}
                        alt="Wishlist"
                        className="w-6 h-6"
                      />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-gray-800 font-medium text-center">{product.name}</h3>
                  <p className="text-[#3B82F6] text-center mt-2">₹{product.price}</p>
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