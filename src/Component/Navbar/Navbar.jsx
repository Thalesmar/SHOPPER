import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'

const NavBar = () => {
    const [menu, setMenu] = useState('shop');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className='navbar'>
        <div className='nav-logo'>
            <Link to="/" className="nav-logo-link" onClick={() => setMenu('shop')}>
                <img src={logo} alt="Shopper logo" />
                <p>Shopper</p>
            </Link>
        </div>

        {/* Mobile menu button */}
        <div className={`mobile-menu-btn ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
        </div>

        <ul className={`nav-menu ${mobileMenuOpen ? 'nav-menu-open' : ''}`}>
            <li onClick={()=>{setMenu('shop'); setMobileMenuOpen(false)}}><Link style={{ textDecoration: 'none'}} to='/'>Shop</Link> {menu === "shop" ? <hr></hr> : <></>}</li>
            <li onClick={()=>{setMenu('men'); setMobileMenuOpen(false)}}><Link style={{ textDecoration: 'none'}} to="/men">Men</Link> {menu === "men" ? <hr></hr> : <></>}</li>
            <li onClick={()=>{setMenu('women'); setMobileMenuOpen(false)}}><Link style={{ textDecoration: 'none'}} to="/women">Women</Link> {menu === "women" ? <hr></hr> : <></>}</li>
            <li onClick={()=>{setMenu('kids'); setMobileMenuOpen(false)}}><Link style={{ textDecoration: 'none'}} to="/kids">Kids</Link> {menu === "kids" ? <hr></hr> : <></>}</li>
        </ul>
        <div className='nav-login-cart'>
            <button><Link to="/login">Login</Link></button>
            <Link to="/cart"><img src={cart_icon} alt="" /></Link>
            <div className="nav-cart-count">0</div>
        </div>
    </div>
  )
}

export default NavBar
