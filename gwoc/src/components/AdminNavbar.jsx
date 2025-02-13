import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center relative">
      {/* Logo */}
      <h1 className="text-xl font-bold">Admin Panel</h1>

      {/* Navigation Links */}
      <div className="space-x-6 flex items-center">
        <Link to="/AdminPage" className="hover:text-blue-400">Dashboard</Link>

        {/* Products Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="hover:text-blue-400 focus:outline-none"
          >
            Products
          </button>
          {showDropdown && (
            <div className="absolute left-0 mt-2 bg-white text-black rounded shadow-lg w-40">
              <Link 
                to="/Productlist" 
                className="block px-4 py-2 hover:bg-gray-200"
                onClick={() => setShowDropdown(false)}
              >
                Product List
              </Link>
              <Link 
                to="/product" 
                className="block px-4 py-2 hover:bg-gray-200"
                onClick={() => setShowDropdown(false)}
              >
                Add Product
              </Link>
            </div>
          )}
        </div>

        <Link to="/AdminBlog" className="hover:text-blue-400">Blog</Link>
      </div>

      {/* Logout Button */}
      <button 
        onClick={handleLogout} 
        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md"
      >
        Logout
      </button>
    </nav>
  );
};

export default AdminNavbar;
