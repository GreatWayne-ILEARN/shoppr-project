import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage.jsx";
import BlogPage from "./Pages/BlogPage.jsx";
import NotFoundPage from "./Pages/NotFoundPage.jsx";
import CartPage from "./Pages/CartPage.jsx";
import Layout from "./Pages/Layout.jsx";
import ShopPage from "./Pages/ShopPage";
import ProductPage from "./Pages/ProductPage.jsx";
import PostPage from "./Pages/PostPage.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="shop/:id" element={<ProductPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:id" element={<PostPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
