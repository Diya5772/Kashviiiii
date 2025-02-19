import { useState, useContext, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/assets/logo.jpg';
import { assets } from '../assets/assets/frontend_assets/assets';
import heart_icon from '../assets/assets/heart_icon.svg';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Function to extract initials from user email
  const getInitials = (email) => (email ? email[0].toUpperCase() : "?");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full bg-transparent shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-full mx-auto px-5 sm:px-10 flex items-center justify-between py-4">
        
        {/* Left Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-16 cursor-pointer" onClick={() => navigate("/")} />
          </Link>
          <NavLink to="/" className="text-[#A27B5C] transition duration-300">Home</NavLink>
          <NavLink to="/Contact" className="text-[#A27B5C] transition duration-300">Contact</NavLink>
          <NavLink to="/Collection" className="text-[#A27B5C] transition duration-300">Collection</NavLink>
        </div>
        
        {/* Center - Brand Name */}
        <Link to="/" className="flex flex-col items-center justify-center leading-none absolute left-1/2 transform -translate-x-1/2">
          <span className="text-3xl font-light tracking-[0.3em] text-[#A27B5C] lg:text-2xl md:text-xl sm:text-lg">KASHVI</span>
          <span className="text-sm font-light tracking-[0.2em] text-[#A27B5C] lg:text-xs md:text-xs sm:text-xs">CREATION</span>
        </Link>
        
        {/* Right Navigation and Controls */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/Blogs" className="text-[#A27B5C] transition duration-300">Blogs</NavLink>
          <NavLink to="/AboutUs" className="text-[#A27B5C] transition duration-300">About Us</NavLink>
          
          <div className="flex items-center gap-4">
            <img src={assets.search_icon} className="w-6 cursor-pointer" alt="Search" />
            
            {/* Wishlist Icon */}
            <div 
              onClick={() => {
                if (!user) {
                  setShowLoginPrompt(true);
                } else {
                  navigate("/wishlist");
                }
              }} 
              className="relative cursor-pointer"
            >
              <img src={heart_icon} className="w-5 invert" alt="Wishlist" />
            </div>
            
            {/* User Profile Section */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold cursor-pointer border-2 border-[#A27B5C]"
                  style={{ backgroundColor: user.email.length % 2 === 0 ? "#A27B5C" : "#8B6B4F" }}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  {getInitials(user.email)}
                </div>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white shadow-lg rounded-lg p-4 text-gray-700 z-50">
                    <p className="font-semibold">{user.name || user.email}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <Link to="/profile" className="block py-1 hover:text-[#A27B5C]">My Profile</Link>
                    <Link to="/orders" className="block py-1 hover:text-[#A27B5C]">Orders</Link>
                    <button onClick={handleLogout} className="block py-1 text-left hover:text-[#A27B5C] w-full">Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login" className="bg-[#A27B5C] text-white px-4 py-2 rounded hover:bg-[#8B6B4F] transition duration-300">Login</Link>
                <Link to="/signup" className="bg-[#A27B5C] text-white px-4 py-2 rounded hover:bg-[#8B6B4F] transition duration-300">Sign Up</Link>
              </div>
            )}

            {/* Cart Icon */}
            <div 
              onClick={() => {
                if (!user) {
                  setShowLoginPrompt(true);
                } else {
                  navigate("/cart");
                }
              }} 
              className="relative cursor-pointer"
            >
              <img src={assets.cart_icon} className="w-6 invert" alt="Cart" />
            </div>
          </div>
        </div>
      </div>

      {/* Login Prompt Popup */}
      {showLoginPrompt && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <p className="text-lg font-semibold text-gray-700 mb-4">You need to log in to continue</p>
            <div className="flex justify-center gap-4">
              <Link to="/login" className="bg-[#A27B5C] text-white px-4 py-2 rounded hover:bg-[#8B6B4F] transition duration-300">
                Login
              </Link>
              <Link to="/signup" className="bg-[#A27B5C] text-white px-4 py-2 rounded hover:bg-[#8B6B4F] transition duration-300">
                Sign Up
              </Link>
            </div>
            <button 
              onClick={() => setShowLoginPrompt(false)}
              className="mt-4 text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;