import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      {/* Logo */}
      <h1 className="text-xl font-bold">Admin Panel</h1>

      {/* Navigation Links */}
      <div className="space-x-6">
        <Link to="/AdminPage" className="hover:text-blue-400">Dashboard</Link>
        <Link to="/product" className="hover:text-blue-400">Products</Link>
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
