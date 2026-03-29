
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-secondary-800 text-tertiary-200 py-8 mt-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 style={{color: "#000000"}}>Shoppr</h3>
          <p className="text-sm">Fashion, electronics and lifestyle — delivered to your door.</p>
        </div>
        <div>
          <h4 className="font-bold mb-2">Shop</h4>
          <ul className="text-sm space-y-1">
            <li>All Products</li>
            <li>Men</li>
            <li>Women</li>
            <li>Kids</li>
            <li>Electronics</li>
            <li>Footwear</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Company</h4>
          <ul className="text-sm space-y-1">
            <li>About</li>
            <li>Careers</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Help</h4>
          <ul className="text-sm space-y-1">
            <li>Returns</li>
            <li>Shipping info</li>
            <li>Size guide</li>
            <li>Contact us</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-secondary-700 mt-6 pt-6 text-center text-xs">
        © 2025 Shoppr. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer