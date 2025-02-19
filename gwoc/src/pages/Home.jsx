import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import home from '../assets/home.jpg';
import home1 from '../assets/Home1.jpg';
import home2 from '../assets/Home2.jpg';
import home3 from '../assets/Home3.jpg';
import Navbar from '../components/navbar';
import CircularGallery from '../components/CircularGallery';
import video from '../assets/video.mp4';
import galleryBg from '../assets/background.jpg';
import footer_bg from '../assets/FOOTER_IMAGE.avif';
import FAQ from '../components/FAQ';
import TrendingProducts from '../components/TreandingProducts';
import img1 from '../assets/rg1.jpg';
import img2 from '../assets/pb2.jpg';
import img3 from '../assets/pb3.jpg';
import img4 from '../assets/pb4.jpg';
import Chatbot from '../components/Chatbot';

import Footer from '../components/Footer';
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

      <div className="min-w-full w-full min-h-screen  bg-[#F8F3D9]">
        {/* Hero Section */}
        <div className="relative w-full min-h-screen flex items-end justify-start bg-black">
  {/* Background Image */}
  <img
    src={images[currentImage]}
    alt="Hero"
    className="absolute top-0 left-0 w-full h-full object-cover opacity-80"
  />

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>

  {/* Content Container */}
  <div className="relative w-full text-left px-10 py-16">
    <div className="relative z-20 max-w-3xl">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-wide text-[#DCD7C9] opacity-90">
        KASHVI CREATION
      </h1>
      <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-[#DCD7C9] opacity-80 mt-2">
        Since 2022
      </p>
      <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-[#DCD7C9] opacity-75 mt-4 italic">
        “प्रेम और विश्वास का अनोखा संगम”
      </p>

      {/* Shop Collection Button */}
      <button
        className="mt-6 px-8 py-3 sm:px-10 sm:py-4 md:px-12 md:py-5 lg:px-14 lg:py-6 text-lg sm:text-xl font-light text-[#F5E1C8] border border-[#F5E1C8] backdrop-blur-md bg-transparent hover:bg-[#F5E1C8] hover:text-black transition-all duration-300"
        onClick={() => window.location.href = '/collection'}
      >
        Shop Collection
      </button>
    </div>
  </div>
</div>

<div className="max-w-full  mx-16 px-4 py-10 flex flex-col lg:flex-row items-center bg-[#F8F3D9] justify-between gap-12 mb-5">
      {/* Left Column - Title and Heading */}
      <div className="lg:w-1/2 space-y-6">
        <div className="space-y-4">
          <h2 className="text-sm uppercase tracking-wider text-gray-600">
            KASHVI'S CHRONICLES
          </h2>
          <h1 className="text-4xl lg:text-5xl font-serif text-gray-900 leading-tight">
            Discover Luxury: Premium & Authentic Sarees, a Treasure Trove of Handlooms in Vivid Weaves and Crafts, Crafted in Finest Silks.
          </h1>
        </div>
      </div>

      {/* Right Column - Description and Button */}
      <div className="lg:w-1/2 space-y-8">
        <div className="relative">
          {/* Decorative Elements */}
          <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 space-y-4">
            <div className="h-16 w-0.5 bg-gray-300"></div>
            <div className="h-16 w-0.5 bg-gray-300"></div>
          </div>
          
          {/* Content */}
          <div className="pl-8 m-20">
            <p className="text-lg text-gray-700 m-6 leading-relaxed mb-16">
              At Kashvi Creation's, you will that suit the modern woman who upholds the subtle art of weaving and keeps it at the highest pedestal. We cater to this woman who considers the humble six yards as a piece of Indian heritage.
              <button className="border-2 mt-8 border-gray-900 px-8 py-3 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors duration-300">
          Learn More
        </button>
            </p>

          </div>
        </div>
      
      </div>
    </div>
    {/* Decorative line */}
<div className="w-full flex justify-center items-center py-4 bg-[#F8F3D9]">
  <div className="w-1/2 h-[2px] bg-gradient-to-r from-transparent via-[#8B4513] to-transparent"></div>
</div>
    <div>
<TrendingProducts/>
  </div>
        {/* Circular Gallery Section */}
        <div className="w-full py-8 h-[900px] bg-[#F8F3D9] relative">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 z-0"
            style={{ backgroundImage: `url(${galleryBg})` }} // Use the imported image
          ></div>

<div className="w-full px-4 relative z-10 mb-8">
      <h2 className="text-5xl lg:text-5xl font-serif text-[#171612] leading-tight mb-12 text-center font-center">
        Explore Our Collection
      </h2>
      <CircularGallery
        items={[
          { image: img1, text: 'Silk Sarees' },
          { image: img2, text: 'Cotton Sarees' },
          { image: img3, text: 'Designer Sarees' },
          { image: img4, text: 'Bridal Sarees' },
        ]}
        bend={3}
        textColor="#ffffff"
        borderRadius={0.05}
        font="bold 30px DM Sans "
        imageClass="custom-image-height" // Add a class for custom image height
      />
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
        {/* Featured Products Section */}
  

        {/* Video Section */}
        <div className="relative w-full h-[600px] bg-gray-800">
        <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay muted loop>
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
      </div>


      <div>
          <FAQ />
          
        </div>
<Footer/>
      </div>
      <Chatbot/>
    </div>
  );
};

export default HomePage;