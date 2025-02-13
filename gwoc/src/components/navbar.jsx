import { useState, useContext, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import logo from "../assets/assets/logo.jpg"
import { assets } from '../assets/assets/frontend_assets/assets';

export const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  

  // Function to extract initials from user email
  const getInitials = (email) => (email ? email[0].toUpperCase() : "?");

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
    <nav className="flex items-center justify-between py-3 font-medium px-6 bg-white shadow-md relative">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img src={logo} alt="Logo" className="w-12" />
      </Link>

      {/* Navigation Links (Desktop) */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-600">
        {["Home", "Contact", "Blogs", "Collection", "AboutUs"].map((item) => (
          <NavLink 
            key={item} 
            to={`/${item}`} 
            className="hover:text-blue-500 transition duration-300"
          >
            {item.replace(/([A-Z])/g, ' $1').trim()}
          </NavLink>
        ))}
      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Search Icon */}
        <img src={assets.search_icon} className="w-5 cursor-pointer" alt="Search" />

        {/* Profile Dropdown */}
        {user ? (
          <div className="relative" ref={dropdownRef}>
            {/* Profile Circle */}
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold cursor-pointer"
              style={{ backgroundColor: user.email.length % 2 === 0 ? "#6366F1" : "#3B82F6" }}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {getInitials(user.email)}
            </div>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white shadow-lg rounded-lg p-4 text-gray-600 z-50">
                {/* User Info */}
                <div className="mb-2 border-b pb-2">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>

                {/* Links */}
                <Link to="/profile" className="block py-1 hover:text-black">My Profile</Link>
                <Link to="/orders" className="block py-1 hover:text-black">Orders</Link>
                <button onClick={handleLogout} className="block py-1 text-left hover:text-black">Logout</button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-x-4">
            <Link to="/login" className="bg-white border-2 border-yellow-500 px-3 py-1 text-gray-600 rounded hover:bg-yellow-600">Login</Link>
            <Link to="/signup" className=" px-3 py-1 text-yellow-500  border-2 border-gray-600  rounded hover:bg-green-600">Sign Up</Link>
          </div>
        )}

        {/* Cart Icon */}
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5" alt="Cart" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center bg-black text-white rounded-full text-xs">
            10
          </p>
        </Link>

        {/* Mobile Menu Icon */}
        <img 
          onClick={() => setVisible(true)} 
          src={assets.menu_icon} 
          className="w-5 cursor-pointer sm:hidden" 
          alt="Menu" 
        />
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 bg-white transform transition-transform ${visible ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col text-gray-600">
          <button onClick={() => setVisible(false)} className="p-4 flex items-center gap-4">
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="Back" />
            <p>Back</p>
          </button>
          {["AboutUs", "Contact", "Collection", "Blogs", "Home"].map((item) => (
            <NavLink 
              key={item} 
              to={`/${item}`} 
              onClick={() => setVisible(false)} 
              className="py-2 pl-6 border"
            >
              {item.replace(/([A-Z])/g, ' $1').trim()}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};
