import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage.jsx'
import BlogPage from './Pages/BlogPage.jsx'
import NotFoundPage from './Pages/NotFoundPage.jsx'
import CartPage from './Pages/CartPage.jsx'
import Layout from './pages/Layout.jsx'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout/>} />
      <Route path='/home' element={<HomePage/>} />
      <Route path='/cart' element={<CartPage/>} />
      <Route path='/blog' element={<BlogPage/>} />
      <Route path='*' element={<NotFoundPage/>} />
    </Routes>
  )
}

export default App