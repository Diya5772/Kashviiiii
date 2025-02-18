import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import Collection from './pages/Colllection'; // Fixed typo
import AboutUs from './pages/AboutUs';
import PlaceOrder from './pages/PlaceOrder';
import Product from './pages/Product';
import Blogs from './pages/Blogs';
import Login from './pages/Login';
import Orders from './pages/Orders';
import Cart from './pages/Cart';
import Signup from "./pages/Signup";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import AdminPage from './pages/AdminPage';
import AdminBlog from './pages/AdminBlog';
import AdminFAQ from './pages/AdminFAQ';
import ShowProduct from './pages/ShowProduct';
import Productlist from './pages/product_list';
import EditProduct from './pages/EditProduct';
import Wishlist from './pages/Wishlist';
import Contact from './pages/Contact';
import AdminOrders from './pages/AdminOrders';
import UsersPage from "./pages/UsersPage";
import ProductsPage from "./pages/ProductsPage";

const App = () => {

  return (
    <AuthProvider>

        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/collection' element={<Collection />} />
          <Route path='/aboutus' element={<AboutUs />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/Wishlist' element={<Wishlist />} />
          <Route path='/Contact' element={<Contact />} />
          <Route path='/product' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/placeorder' element={<PlaceOrder />} />
          <Route path='/Orders' element={<Orders />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/AdminPage' element={<AdminPage />} />
          <Route path='/AdminBlog' element={<AdminBlog />} />
          <Route path='/AdminFAQ' element={<AdminFAQ />} />
          <Route path='/product/:id' element={<ShowProduct />} />
          <Route path='/Productlist' element={<Productlist />} />
          <Route path='/EditProduct/:id' element={<EditProduct />} />
          <Route path='/AdminOrders' element={<AdminOrders />} />
          <Route path="/admin/users" element={<UsersPage />} />
          <Route path="/admin/products" element={<ProductsPage />} />
         
          

        </Routes>
    </AuthProvider>
  );
};

export default App;
