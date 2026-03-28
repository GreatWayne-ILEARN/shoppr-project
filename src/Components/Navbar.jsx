
// import React from 'react';
// // import { Link, NavLink } from 'react-router-dom';
// Link
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // adjust path
import { ShoppingCart } from 'lucide-react'; // if using lucide-react

const Navbar = () => {
  const { items } = useCart();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary-500">Shoppr</Link>
        <div className="flex gap-6 items-center">
          <NavLink to="/shop" className={({ isActive }) => isActive ? 'text-primary-500' : 'text-gray-700'}>
            Shop
          </NavLink>
          <NavLink to="/blog" className={({ isActive }) => isActive ? 'text-primary-500' : 'text-gray-700'}>
            Blog
          </NavLink>
          <NavLink to="/cart" className="relative">
            <ShoppingCart className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;