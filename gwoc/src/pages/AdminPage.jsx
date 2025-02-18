import React, { useEffect, useState } from 'react';
import AdminNavbar from "../components/AdminNavbar";
import { useNavigate } from "react-router-dom";

const StatsCard = ({ title, value, trend, trendValue, bgColor, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`${bgColor} p-6 rounded-lg shadow-md cursor-pointer transition-all hover:shadow-lg`}
    >
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
      </div>
      <p className="text-4xl font-bold text-[#E4E0E1] mb-3">{value}</p>
      <p className="text-white text-sm">
        {trend === 'increase' ? 'Increased' : 'Decreased'} by {trendValue}%
      </p>
    </div>
  );
};


const AdminPage = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
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

        const orderResponse = await fetch("http://localhost:5000/api/admin/total-orders");
        const orderData = await orderResponse.json();
        setTotalOrders(orderData.totalOrders);
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatsCard
            title="Total Users"
            value={totalUsers}
            trend="increase"
            trendValue={15}
            bgColor="bg-[#AB886D]"
            onClick={() => navigate("/admin/users")}
          />
          
          <StatsCard
            title="Total Products"
            value={totalProducts}
            trend="increase"
            trendValue={8}
            bgColor="bg-[#AB886D]"
            onClick={() => navigate("/admin/products")}
          />
          
          <StatsCard
            title="Total Orders"
            value={totalOrders}
            trend="increase"
            trendValue={12}
            bgColor="bg-[#AB886D]"
            onClick={() => navigate("/admin/orders")}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;