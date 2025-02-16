import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import home from '../assets/home.jpg';
import home1 from '../assets/Home1.jpg';
import home2 from '../assets/Home2.jpg';
import home3 from '../assets/Home3.jpg';
import Navbar from '../components/navbar';
import CircularGallery from '../components/CircularGallery';
import video from '../assets/video.mp4';
import galleryBg from '../assets/1.jpg'; 
import footer_bg from '../assets/FOOTER_IMAGE.avif'; 
import FAQ from '../components/FAQ';
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
    { name: 'Chiffon Saree', price: '$249', image: home },
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
      <Navbar />
      
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
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ color: '#F5F5F5', fontFamily: 'EB Garamond' }}>
                  KASHVI CREATION
                </h1>
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4" style={{ color: '#F5F5F5', fontFamily: 'EB Garamond' }}>
                  Since 2022
                </p>
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4" style={{ color: '#F5F5F5', fontFamily: 'EB Garamond' }}>
                  “प्रेम और विश्वास का अनोखा संगम”
                </p>
                <button 
  className="bg-[#3F4F44] text-black px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 lg:px-12 lg:py-6 rounded-none hover:bg-gray-200" 
  style={{ fontSize: '1.5rem' }}
  onClick={() => window.location.href = '/collection'}
>
  Shop Collection
</button>
              </div>
            </div>
          </div>
        </div>

        {/* Circular Gallery Section */}
        <div className="w-full py-8 bg-[#DCD7C9] relative">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 z-0"
            style={{ backgroundImage: `url(${galleryBg})` }} // Use the imported image
          ></div>

          <div className="w-full px-4 relative z-10 mb-8">
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
        </div>
<div>
  <FAQ/>
</div>
        {/* Featured Products Section */}
        <div className="w-full py-16 bg-[#DCD7C9]">
          <div className="w-full px-4">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-bold">Featured Products</h2>
              <button 
  className="flex items-center text-gray-600 hover:text-gray-900"
  onClick={() => (window.location.href = '/collection')}
>
  View All <ChevronRight className="h-5 w-5 ml-2" />
</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <div key={product.name} className="group bg-[#3F4F44] rounded-lg shadow-lg p-4">
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                
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
        <div className="w-full">
          <div className="relative w-full h-[600px] bg-gray-800">
            <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay  muted loop>
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* Categories Section */}
        <div className="w-full py-16 bg-[#DCD7C9]">
          <div className="w-full px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <div key={index} className="relative text-center">
                  <img
                    src={images[index % images.length]}
                    alt={category.name}
                    className="object-cover w-full h-[400px] rounded-lg"
                  />
                  <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white rounded-lg h-[400px]">
                    <h3 className="text-xl font-semibold">{category.name}</h3>
                    <p className="text-gray-200">{category.count} Products</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="w-full bg-white border-t relative">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 z-0"
            style={{ backgroundImage: `url(${footer_bg})` }} // Use the same or another image
          ></div>

          {/* Footer Content */}
          <div className="relative z-10 w-full px-4 py-12">
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