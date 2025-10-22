import React from 'react'
import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContextInstance'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'

const NavBar = () => {
    const { user, isLoggedIn, logout, getTotalCartAmount } = useContext(ShopContext);
    const [menu, setMenu] = useState('shop');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    const { totalItems } = getTotalCartAmount();

  return (
    <div className='navbar'>
        <div className='nav-logo'>
            <Link to="/" className="nav-logo-link" onClick={() => setMenu('shop')}>
                <img src={logo} alt="Shopper logo" loading="eager" />
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
            {isLoggedIn && (
                <li onClick={()=>{setMenu('orders'); setMobileMenuOpen(false)}}><Link style={{ textDecoration: 'none'}} to="/orders">Orders</Link> {menu === "orders" ? <hr></hr> : <></>}</li>
            )}
            {/* Mobile-only Login/User item */}
            <li className="nav-mobile-login" onClick={()=>{setMobileMenuOpen(false)}}>
                {isLoggedIn ? (
                    <div className="mobile-user-menu">
                        <span>Welcome, {user?.name}</span>
                        <button onClick={logout} className="mobile-logout-btn">Logout</button>
                    </div>
                ) : (
                    <Link className="mobile-login-btn" to="/login">Login</Link>
                )}
            </li>
        </ul>
        <div className='nav-login-cart'>
            {isLoggedIn ? (
                <div className="user-menu-container">
                    <button
                        className="user-menu-btn"
                        onClick={() => setShowUserMenu(!showUserMenu)}
                    >
                        Welcome, {user?.name}
                    </button>
                    {showUserMenu && (
                        <div className="user-dropdown">
                            <div className="user-info">
                                <p><strong>{user?.name}</strong></p>
                                <p>{user?.email}</p>
                            </div>
                            <button onClick={logout} className="logout-btn">Logout</button>
                        </div>
                    )}
                </div>
            ) : (
                <button className="desktop-login-btn">
                    <Link to="/login">Login</Link>
                </button>
            )}
            <Link to="/cart"><img src={cart_icon} alt="" loading="lazy" /></Link>
            <div className="nav-cart-count">{totalItems}</div>
        </div>
    </div>
  )
}

export default NavBar
