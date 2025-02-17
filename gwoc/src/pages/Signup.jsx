import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import  Navbar  from "../components/navbar";
import img from "../assets/option_4.jpg";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://localhost:5000/api/auth/register", form, { withCredentials: true });
      alert("Signup successful!");
      navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error.response?.data?.message || "Unknown error");
      
      if (error.response?.data?.message === "Email already exists") {
        setError("Email already exists. Please use a different email.");
      } else {
        setError("Signup failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <Navbar />

      {/* Background with blur effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center blur-lg"
        style={{ backgroundImage: `url(${img})`, zIndex: -1 }}
      />

      {/* Main content */}
      <div className="w-full max-w-4xl bg-white/90 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden mx-auto">
        <div className="flex flex-col md:flex-row">
          {/* Image section */}
          <div className="md:w-1/2 h-48 md:h-auto">
            <img 
              src={img}
              alt="signup form"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Form section */}
          <div className="p-6 md:p-8 md:w-1/2">
            {/* Branding section */}
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-light tracking-widest mb-4">
                KASHVI
              </h1>
              <h2 className="text-lg md:text-xl font-light tracking-wider">
                CREATION
              </h2>
            </div>

            <h3 className="text-center text-lg tracking-wide mb-6">
              Create your account
            </h3>

            {/* Error message */}
            {error && (
              <div className="mb-4 p-3 text-red-600 text-center">
                {error}
              </div>
            )}

            {/* Signup form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
              />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
              />
              <button
                type="submit"
                className="w-full py-2 px-4 bg-gray-800 hover:bg-gray-900 text-white rounded-md transition duration-200"
              >
                Sign Up
              </button>
            </form>

            {/* Links section */}
            <div className="mt-6 text-center">
              <p className="text-gray-700">
                Already have an account?{" "}
                <span 
                  className="text-gray-700 cursor-pointer underline"
                  onClick={() => navigate("/login")}
                >
                  Login here
                </span>
              </p>
            </div>

            <div className="mt-4 flex justify-center space-x-4 text-sm text-gray-500">
              <a href="#!" className="hover:text-gray-700">Terms of use</a>
              <a href="#!" className="hover:text-gray-700">Privacy policy</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;