import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", form, { withCredentials: true });
      localStorage.setItem("token", data.token);
      login(data.role);
      alert("Login successful");
      
      if (data.role === "admin") {
        navigate("/AdminPage");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || "Unknown error");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" className="w-full p-2 border rounded mb-3" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" className="w-full p-2 border rounded mb-3" onChange={handleChange} required />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Sign In</button>
      </form>
      <p className="mt-4 text-center">
        Don't have an account? <a href="/Signup" className="text-blue-500">Sign Up</a>
      </p>
    </div>
  );
};

export default Login;