import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import img from '../assets/option_4.jpg'; // Import the image

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(''); // State to store the error message

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous error messages

    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', form, { withCredentials: true });
      localStorage.setItem('token', data.token);
      login(data.role);
      alert('Login successful');

      if (data.role === 'admin') {
        navigate('/AdminPage');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || 'Unknown error');
      
      // Display error message and reset form fields
      setError(error.response?.data?.message || 'Invalid email or password');
      setForm({ email: '', password: '' });
    }
  };

  return (
    <div 
      style={{ 
        position: 'relative', 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        overflow: 'hidden',
        padding: '20px', // Add padding for smaller screens
      }}
    >
      {/* Blurred Background */}
      <div 
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          backgroundImage: `url(${img})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          filter: 'blur(8px)', 
          zIndex: -1 
        }}
      />

      {/* Login Form Container */}
      <div 
        style={{ 
          maxWidth: '800px', 
          width: '100%', 
          border: '1px solid #ddd', 
          borderRadius: '10px', 
          overflow: 'hidden', 
          display: 'flex', 
          flexDirection: 'row', // Default layout: side by side
          backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white background
          backdropFilter: 'blur(4px)', // Additional blur for the form container
          zIndex: 1,
          '@media (max-width: 768px)': { // Media query for smaller screens
            flexDirection: 'column', // Stack vertically on smaller screens
          }
        }}
      >
        {/* Visible Image in Login Section */}
        <div 
          style={{ 
            flex: '1', 
            '@media (max-width: 768px)': { // Media query for smaller screens
              flex: 'none', // Reset flex for smaller screens
              height: '200px', // Fixed height for the image on smaller screens
            }
          }}
        >
          <img 
            src={img} 
            alt='login form' 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Form Content */}
        <div 
          style={{ 
            flex: '1', 
            padding: '20px', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center',
            '@media (max-width: 768px)': { // Media query for smaller screens
              padding: '15px', // Reduce padding for smaller screens
            }
          }}
        >
          {/* Centered "KASHVI" and "CREATION" Text */}
          <div 
            style={{ 
              textAlign: 'center', 
              marginBottom: '20px', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center' 
            }}
          >
            <span 
              style={{ 
                fontSize: '3rem', // Larger size for "KASHVI"
                fontWeight: '300', // Light font weight
                letterSpacing: '0.3em', // Spacing between letters
                color: 'black', 
                lineHeight: '1.2', // Adjust line height for better spacing
              }}
            >
              KASHVI
            </span>
            <span 
              style={{ 
                fontSize: '1.2rem', // Slightly smaller size for "CREATION"
                fontWeight: '300', // Light font weight
                letterSpacing: '0.2em', // Spacing between letters
                color: 'black', 
                marginTop: '10px', // Space between "KASHVI" and "CREATION"
              }}
            >
              CREATION
            </span>
          </div>

          <h5 style={{ marginBottom: '20px', letterSpacing: '1px', fontSize: '16px', '@media (max-width: 768px)': { fontSize: '14px' } }}>Sign into your account</h5>

          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>} {/* Display error message */}

          <form onSubmit={handleSubmit}>
            <input 
              type='email' 
              name='email' 
              value={form.email} 
              placeholder='Email address' 
              onChange={handleChange} 
              required 
              style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }} 
            />
            <input 
              type='password' 
              name='password' 
              value={form.password} 
              placeholder='Password' 
              onChange={handleChange} 
              required 
              style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }} 
            />
            <button 
              type='submit' 
              style={{ width: '100%', padding: '10px', backgroundColor: '#333', color: '#fff', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>
              Login
            </button>
          </form>

          <p style={{ fontSize: '14px', textAlign: 'center', marginTop: '20px', color: '#393f81', '@media (max-width: 768px)': { fontSize: '12px' } }}>
            Don't have an account? <span 
              style={{ color: '#393f81', cursor: 'pointer', textDecoration: 'underline' }} 
              onClick={() => navigate('/signup')}>
              Register here
            </span>
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', fontSize: '12px', color: '#888', '@media (max-width: 768px)': { fontSize: '10px' } }}>
            <a href='#!' style={{ marginRight: '10px' }}>Terms of use</a>
            <a href='#!'>Privacy policy</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
