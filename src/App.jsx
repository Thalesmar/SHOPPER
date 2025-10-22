import React from 'react'
import Navbar from './Component/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Shop from './pages/Shop';
import { ShopCategory } from './pages/ShopCategory';
import { Product } from './pages/Product';
import { Cart } from './pages/Cart';
import { LoginSignup } from './pages/LoginSignup';
import Footer from './Component/Footer/Footer';


const App = () => {
  return (
  <div>
    <Navbar/>
    <Routes>
            <Route path='/' element={<Shop/>}/>
            <Route path='/men' element={<ShopCategory category="men"/>}/>
            <Route path='/women' element={<ShopCategory category="women"/>}/>
            <Route path='/kids' element={<ShopCategory category="kids"/>}/>
            <Route path='/product' element={<Product/>}>
                <Route path=':productId' element={<Product/>}/>
            </Route>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/login' element={<LoginSignup/>}/>
        </Routes>
        <Footer />
    </div>
  )
}

export default App
