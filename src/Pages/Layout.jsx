import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer.jsx';
import Navbar from '../Components/Navbar.jsx';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-secondary-900 text-white text-xs text-center py-2 tracking-wide font-medium">
        Free shipping on orders over $150 &nbsp;·&nbsp; Easy 30-day returns
      </div>
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;