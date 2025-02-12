import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ShopContextProvider } from './context/ShopContext';
import { AuthProvider } from './context/AuthContext.jsx';
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ShopContextProvider>
    <BrowserRouter>
      <AuthProvider>

        <App />
        </AuthProvider>
      </BrowserRouter>
     
    </ShopContextProvider>
  </React.StrictMode>,
);
