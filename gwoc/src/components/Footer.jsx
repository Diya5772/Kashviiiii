import React from 'react'
import footer_bg from '../assets/6.avif'
const Footer = () => {
  return (
    <div>       
         <footer className="w-ful border-t relative">
    {/* Background Image */}
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70 z-0"
      style={{ backgroundImage: `url(${footer_bg})` }} // Use the same or another image
    ></div>

    {/* Footer Content */}
    <div className="relative z-10 w-full px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <p className="text-gray-800">
            Discover the finest collection of traditional and modern sarees crafted by skilled artisans.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-800">
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
  </footer></div>
  )
}

export default Footer