import { useState, useContext, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/assets/logo.jpg';
import { assets } from '../assets/assets/frontend_assets/assets';
import heart_icon from '../assets/assets/heart_icon.svg';
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
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
            <img src={logo} alt="Logo" className="w-16" />
          </Link>
          <NavLink to="/" className="text-white hover:text-[#A27B5C] transition duration-300">Home</NavLink>
          <NavLink to="/Contact" className="text-white hover:text-[#A27B5C] transition duration-300">Contact</NavLink>
          <NavLink to="/Collection" className="text-white hover:text-[#A27B5C] transition duration-300">Collection</NavLink>
        </div>
        
        {/* Center - Brand Name (Responsive) */}
        <Link to="/" className="flex flex-col items-center justify-center leading-none absolute left-1/2 transform -translate-x-1/2">
          <span className="text-3xl font-light tracking-[0.3em] text-white lg:text-2xl md:text-xl sm:text-lg">KASHVI</span>
          <span className="text-sm font-light tracking-[0.2em] text-gray-300 lg:text-xs md:text-xs sm:text-xs">CREATION</span>
        </Link>
        
        {/* Right Navigation and Controls */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/Blogs" className="text-white hover:text-[#A27B5C] transition duration-300">Blogs</NavLink>
          <NavLink to="/AboutUs" className="text-white hover:text-[#A27B5C] transition duration-300">About Us</NavLink>
          <div className="flex items-center gap-4">
            <img src={assets.search_icon} className="w-6 cursor-pointer" alt="Search" />
            
            {/* Wishlist Icon */}
            <Link to="/wishlist" className="relative">
              <img src={heart_icon} className="w-5 invert" alt="Wishlist" />
            </Link>
            
            {/* User Profile Section */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                {/* Profile Circle with Initials */}
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold cursor-pointer border-2 border-[#A27B5C]"
                  style={{ backgroundColor: user.email.length % 2 === 0 ? "#A27B5C" : "#8B6B4F" }}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  {getInitials(user.email)}
                </div>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white shadow-lg rounded-lg p-4 text-gray-700 z-50">
                    {/* User Info */}
                    <div className="mb-2 border-b pb-2">
                      <p className="font-semibold">{user.name || user.email}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    
                    {/* Links */}
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
            <Link to="/cart" className="relative">
              <img src={assets.cart_icon} className="w-6 invert" alt="Cart" />
              <p className="absolute -right-2 -bottom-2 w-5 h-5 flex items-center justify-center bg-[#A27B5C] text-white text-xs rounded-full">10</p>
            </Link>
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <img onClick={() => setMenuOpen(true)} src={assets.menu_icon} className="w-6 cursor-pointer invert" alt="Menu" />
        </div>
      </div>
      
      {/* Mobile Sidebar Menu */}
      <div className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 md:hidden z-50`}>
        <div className="flex flex-col p-5 space-y-4">
          <button onClick={() => setMenuOpen(false)} className="flex items-center text-gray-600">
            <img src={assets.dropdown_icon} className="h-5 transform rotate-180 mr-2" alt="Back" /> Close
          </button>
          
          <div className="flex items-center gap-2 border p-2 rounded-lg">
            <img src={assets.search_icon} className="w-5" alt="Search" />
            <input type="text" placeholder="Search..." className="w-full focus:outline-none" />
          </div>
          
          {/* User Profile in Mobile Menu */}
          {user && (
            <div className="flex items-center space-x-3 border-b pb-4">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: user.email.length % 2 === 0 ? "#A27B5C" : "#8B6B4F" }}
              >
                {getInitials(user.email)}
              </div>
              <div>
                <p className="font-semibold">{user.name || user.email}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
          )}
          
          {/* Navigation Links */}
          <NavLink onClick={() => setMenuOpen(false)} to="/" className="block py-2 text-gray-700 border-b">Home</NavLink>
          <NavLink onClick={() => setMenuOpen(false)} to="/AboutUs" className="block py-2 text-gray-700 border-b">About Us</NavLink>
          <NavLink onClick={() => setMenuOpen(false)} to="/Contact" className="block py-2 text-gray-700 border-b">Contact</NavLink>
          <NavLink onClick={() => setMenuOpen(false)} to="/Collection" className="block py-2 text-gray-700 border-b">Collection</NavLink>
          <NavLink onClick={() => setMenuOpen(false)} to="/Blogs" className="block py-2 text-gray-700 border-b">Blogs</NavLink>
          
          {/* User Options */}
          {user ? (
            <div className="flex flex-col space-y-2 pt-2">
              <Link to="/profile" className="block py-2 text-gray-700 border-b">My Profile</Link>
              <Link to="/orders" className="block py-2 text-gray-700 border-b">Orders</Link>
              <Link to="/wishlist" className="block py-2 text-gray-700 border-b">Wishlist</Link>
              <Link to="/cart" className="block py-2 text-gray-700 border-b">Cart</Link>
              <button onClick={handleLogout} className="block text-left py-2 text-gray-700">Logout</button>
            </div>
          ) : (
            <div className="flex flex-col space-y-2 pt-4">
              <Link to="/login" className="block text-center bg-[#A27B5C] text-white py-2 rounded hover:bg-[#8B6B4F] transition duration-300">Login</Link>
              <Link to="/signup" className="block text-center bg-[#A27B5C] text-white py-2 rounded hover:bg-[#8B6B4F] transition duration-300">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
      
      {/* Background Overlay for Mobile Menu */}
      {menuOpen && (
        <div onClick={() => setMenuOpen(false)} className="fixed inset-0 bg-black bg-opacity-40 md:hidden z-40"></div>
      )}
    </nav>
  );
};

export default Navbar;