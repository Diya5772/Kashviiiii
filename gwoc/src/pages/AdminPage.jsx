import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const userResponse = await fetch("http://localhost:5000/api/admin/total-users");
        const userData = await userResponse.json();
        setTotalUsers(userData.totalUsers);

        const productResponse = await fetch("http://localhost:5000/api/admin/total-products");
        const productData = await productResponse.json();
        setTotalProducts(productData.totalProducts);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div>
      <AdminNavbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

        <div className="grid grid-cols-2 gap-4">
          {/* Clickable Total Users Card */}
          <div 
            className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:bg-blue-100 transition" 
            onClick={() => navigate("/admin/users")}
          >
            <h2 className="text-xl font-semibold">Total Users</h2>
            <p className="text-3xl font-bold text-blue-600">{totalUsers}</p>
          </div>

          {/* Clickable Total Products Card */}
          <div 
            className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:bg-green-100 transition" 
            onClick={() => navigate("/admin/products")}
          >
            <h2 className="text-xl font-semibold">Total Products</h2>
            <p className="text-3xl font-bold text-green-600">{totalProducts}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
