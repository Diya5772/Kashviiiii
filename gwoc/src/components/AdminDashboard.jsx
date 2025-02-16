import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    fetchUserCount();
  }, []);

  const fetchUserCount = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/total-users");
      setTotalUsers(res.data.totalUsers);
    } catch (error) {
      console.error("Error fetching user count:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">Total Users</h2>
        <p className="text-3xl font-bold text-blue-500">{totalUsers}</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
