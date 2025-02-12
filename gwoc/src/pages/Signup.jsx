import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/register", form, { withCredentials: true });
      alert("Signup successful!");
      navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error.response?.data?.message || "Unknown error");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="
text" name="name" placeholder="Name" className="w-full p-2 border rounded mb-3" onChange={handleChange} required /> <input type="email" name="email" placeholder="Email" className="w-full p-2 border rounded mb-3" onChange={handleChange} required /> <input type="password" name="password" placeholder="Password" className="w-full p-2 border rounded mb-3" onChange={handleChange} required />

    <select name="role" onChange={handleChange} className="w-full p-2 border rounded mb-3">
      <option value="user">User</option>
      <option value="admin">Admin</option>
    </select>

    <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Sign Up</button>
  </form>
  <p className="mt-4 text-center">
    Already have an account? <a href="/login" className="text-blue-500">Login</a>
  </p>
</div>
); };

export default Signup;


