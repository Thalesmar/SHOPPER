import React from 'react'
import Navbar from './Component/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Shop from './pages/Shop';
import { ShopCategory } from './pages/ShopCategory';
import { Product } from './pages/Product';
import { Cart } from './pages/Cart';
import { LoginSignup } from './pages/LoginSignup';
import { Orders } from './pages/Orders';
import Footer from './Component/Footer/Footer';
import men_banner from './Component/Assets/banner_mens.png' ;
import women_banner from './Component/Assets/banner_women.png' ;
import kid_banner from './Component/Assets/banner_kids.png' ;


const App = () => {
  return (
  <div>
    <Navbar/>
    <Routes>
            <Route path='/' element={<Shop/>}/>
            <Route path='/men' element={<ShopCategory banner={men_banner} category="men"/>}/>
            <Route path='/women' element={<ShopCategory banner={women_banner} category="women"/>}/>
            <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid"/>}/>
            <Route path='/product/:productId' element={<Product/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/login' element={<LoginSignup/>}/>
            <Route path='/orders' element={<Orders/>}/>
        </Routes>
        <Footer />
    </div>
  )
}

export default App
