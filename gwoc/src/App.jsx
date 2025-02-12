import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/Colllection'; // Fixed typo
import AboutUs from './pages/AboutUs';
import PlaceOrder from './pages/PlaceOrder';
import Product from './pages/Product';
import Blogs from './pages/Blogs';
import Login from './pages/Login';
import Orders from './pages/Orders';
import Cart from './pages/Cart';
import Signup from "./pages/Signup";
import { Navbar } from './components/navbar';
import { AuthProvider, AuthContext } from "./context/AuthContext";
import AdminPage from './pages/AdminPage';
import AdminBlog from './pages/AdminBlog';
const App = () => {

  return (
    <AuthProvider>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/collection' element={<Collection />} />
          <Route path='/aboutus' element={<AboutUs />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/product' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/placeorder' element={<PlaceOrder />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/AdminPage' element={<AdminPage />} />
          <Route path='/AdminBlog' element={<AdminBlog />} />

        </Routes>
    </AuthProvider>
  );
};

export default App;
