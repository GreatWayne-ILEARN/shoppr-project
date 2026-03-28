
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-[#f8f8f8] border-t border-gray-200 px-[5%] pt-16 pb-6 text-sm">
      
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
        
        {/* Brand */}
        <div>
          <h3 className="font-semibold text-black mb-3">Shoppr</h3>
          <p className="text-gray-500 leading-relaxed">
            Fashion, electronics and lifestyle — delivered to your door.
          </p>
        </div>

        {/* Shop */}
        <div>
          <h4 className="font-medium text-black mb-4">Shop</h4>
          <ul className="flex flex-col gap-2 text-gray-500">
            <li><a href="#" className="hover:text-black">All Products</a></li>
            <li><a href="#" className="hover:text-black">Men</a></li>
            <li><a href="#" className="hover:text-black">Women</a></li>
            <li><a href="#" className="hover:text-black">Kids</a></li>
            <li><a href="#" className="hover:text-black">Electronics</a></li>
            <li><a href="#" className="hover:text-black">Footwear</a></li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h4 className="font-medium text-black mb-4">Help</h4>
          <ul className="flex flex-col gap-2 text-gray-500">
            <li><a href="#" className="hover:text-black">Returns</a></li>
            <li><a href="#" className="hover:text-black">Shipping info</a></li>
            <li><a href="#" className="hover:text-black">Size guide</a></li>
            <li><a href="#" className="hover:text-black">Contact us</a></li>
          </ul>
        </div>

        {/* Journal */}
        <div>
          <h4 className="font-medium text-black mb-4">Journal</h4>
          <ul className="flex flex-col gap-2 text-gray-500">
            <li><a href="#" className="hover:text-black">All Posts</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-medium text-black mb-4">Company</h4>
          <ul className="flex flex-col gap-2 text-gray-500">
            <li><a href="#" className="hover:text-black">About</a></li>
            <li><a href="#" className="hover:text-black">Careers</a></li>
            <li><a href="#" className="hover:text-black">Privacy Policy</a></li>
          </ul>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-200 pt-6 text-center text-gray-400 text-xs">
        © 2025 Shoppr. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer