import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import home from '../assets/Home.jpg';
import home1 from '../assets/Home1.jpg';
import home2 from '../assets/Home2.jpg';
import home3 from '../assets/Home3.jpg';
<<<<<<< HEAD
import Navbar from '../components/navbar';
=======
import { Navbar } from '../components/navbar';
import CircularGallery from '../components/CircularGallery'; 

>>>>>>> c7221b7640ab0f76a8cfee41b5556cf6ecb82754
const HomePage = () => {
  const categories = [
    { name: 'Silk Sarees', count: '120+' },
    { name: 'Cotton Sarees', count: '85+' },
    { name: 'Designer Sarees', count: '95+' },
    { name: 'Bridal Sarees', count: '45+' },
  ];

  const featuredProducts = [
    { name: 'Banarasi Silk Saree', price: '$299', image: home3 },
    { name: 'Kanjivaram Silk', price: '$399', image: home1 },
    { name: 'Designer Cotton', price: '$199', image: home2 },
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const images = [home1, home2, home3];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <Navbar/>
    <div className="min-w-full w-full min-h-screen pt-16 bg-[#DCD7C9]">

      {/* Hero Section */}
      
     <div className="relative w-full min-h-screen flex items-end justify-start bg-black">
        <img
          src={images[currentImage]}
          alt="Hero"
          className="absolute top-0 left-0 w-full h-full object-cover opacity-90"
        />
        <div className="relative w-full text-left bg-black bg-opacity-50">
          <div className="absolute bottom-0 left-0 w-full h-full flex items-end justify-start">
            <div className="absolute bottom-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>
            <div className="relative z-20 px-2 py-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ color: '#F5F5F5', fontFamily: 'EB Garamond' }}>KASHVI CREATION</h1>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4" style={{ color: '#F5F5F5', fontFamily: 'EB Garamond' }}>Since 2022</p>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4" style={{ color: '#F5F5F5', fontFamily: 'EB Garamond' }}>“प्रेम और विश्वास का अनोखा संगम”</p>
              <button className="bg-[#3F4F44] text-black px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 lg:px-12 lg:py-6 rounded-none hover:bg-gray-200" style={{ fontSize: '1.5rem' }}>
                Shop Collection
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Circular Gallery Section */}
      <div className="w-full py-8 bg-[#DCD7C9] relative">
        
        <div className="max-w-screen-lg mx-auto px-4 relative z-10 mb-8"> {/* Added margin-bottom (mb-8) */}
          <h2 className="text-3xl font-bold mb-12 text-center">Explore Our Collection</h2>
          <CircularGallery
            items={[
              { image: home3, text: 'Silk Sarees' },
              { image: home2, text: 'Cotton Sarees' },
              { image: home1, text: 'Designer Sarees' },
              { image: home, text: 'Bridal Sarees' },
            ]}
            bend={3}
            textColor="#ffffff"
            borderRadius={0.05}
            font="bold 30px DM Sans"
          />
        </div>

        {/* Box Below the Photos Section */}
  
      </div>
      {/* Featured Products */}
      <div className="w-full py-16 bg-[#DCD7C9]">
        <div className="max-w-screen-lg mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <button className="flex items-center text-gray-600 hover:text-gray-900">
              View All <ChevronRight className="h-5 w-5 ml-2" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.name} className="group bg-[#3F4F44] rounded-lg shadow-lg p-4">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button className="absolute bottom-4 left-4 bg-[#A27B5C] px-6 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Quick View 
                  </button>
                </div>
                <div className="p-4 bg-[#A27B5C] rounded-lg">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-600">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
 {/* Video Section */}
 <div className="w-full bg-black text-white py-16">
        <div className="max-w-screen-lg mx-auto">
          <h2 className="text-3xl font-bold mb-8">Our Story</h2>
          <div className="relative w-full h-64 bg-gray-800">
            <video className="w-full h-full object-cover" controls>
              <source src="C:\Usef" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
      {/* Categories Section */}
      <div className="w-full py-16 bg-[#DCD7C9]">
        <div className="max-w-screen-lg mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div key={category.name} className="text-center">
                <div className="bg-[#A27B5C] rounded-lg p-8 mb-4">
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                  <p className="text-gray-600">{category.count} Products</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    

      {/* Footer */}
      <footer className="w-full bg-white border-t">
        <div className="max-w-screen-lg mx-auto py-12 px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-gray-600">
                Discover the finest collection of traditional and modern sarees crafted by skilled artisans.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Shop</li>
                <li>Collections</li>
                <li>About Us</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Shipping Policy</li>
                <li>Returns & Exchanges</li>
                <li>FAQ</li>
                <li>Size Guide</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Email: info@saree.com</li>
                <li>Phone: +1 234 567 890</li>
                <li>Address: 123 Fashion St, NY</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 text-center text-gray-600">
            <p>&copy; 2025 SAREE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
    </div>
  );
};

export default HomePage;