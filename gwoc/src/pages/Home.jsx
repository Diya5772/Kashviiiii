import React from 'react';
import { ShoppingBag, Heart, Search, Menu, ChevronRight } from 'lucide-react';
import { Navbar } from '../components/navbar';

const HomePage = () => {
  const categories = [
    { name: 'Silk Sarees', count: '120+' },
    { name: 'Cotton Sarees', count: '85+' },
    { name: 'Designer Sarees', count: '95+' },
    { name: 'Bridal Sarees', count: '45+' }
  ];

  const featuredProducts = [
    { name: 'Banarasi Silk Saree', price: '$299', image: '/api/placeholder/300/400' },
    { name: 'Kanjivaram Silk', price: '$399', image: '/api/placeholder/300/400' },
    { name: 'Designer Cotton', price: '$199', image: '/api/placeholder/300/400' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
     <Navbar/>

      {/* Hero Section */}
      <div className="relative bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">Discover Traditional Elegance</h1>
              <p className="text-lg text-gray-600 mb-8">
                Explore our curated collection of handcrafted sarees from India's finest artisans.
              </p>
              <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800">
                Shop Collection
              </button>
            </div>
            <div className="relative h-96">
              <img
                src=""
                alt="Featured Saree"
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div key={category.name} className="group relative overflow-hidden rounded-lg">
                <img
                  src="/api/placeholder/400/500"
                  alt={category.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-6">
                  <div className="text-white">
                    <h3 className="text-xl font-semibold">{category.name}</h3>
                    <p>{category.count} Products</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <button className="flex items-center text-gray-600 hover:text-gray-900">
              View All <ChevronRight className="h-5 w-5 ml-2" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.name} className="group">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button className="absolute bottom-4 left-4 bg-white px-6 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Quick View
                  </button>
                </div>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-300 mb-8">Stay updated with our latest collections and exclusive offers.</p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full text-black"
            />
            <button className="bg-white text-black px-8 py-3 rounded-full hover:bg-gray-200">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
  );
};

export default HomePage;