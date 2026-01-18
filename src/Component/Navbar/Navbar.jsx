import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContextInstance'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'

const NavBar = () => {
    const { user, isLoggedIn, logout, getTotalCartAmount } = useContext(ShopContext);
    const [menu, setMenu] = useState('shop');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    const { totalItems } = getTotalCartAmount();

    return (
        <div className='flex justify-between items-center p-4 shadow-md bg-white fixed w-full top-0 z-50 h-[80px]'>
            <div className='flex items-center gap-2 ml-4 transform hover:scale-105 transition-transform duration-300'>
                <Link to="/" className="flex items-center gap-2 no-underline text-gray-800" onClick={() => setMenu('shop')}>
                    <img src={logo} alt="Shopper logo" className="h-10 w-auto" loading="eager" />
                    <p className="text-2xl font-bold tracking-wider uppercase">Shopper</p>
                </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex flex-col gap-1.5 cursor-pointer mr-4 z-50" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <span className={`w-8 h-0.5 bg-gray-800 transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`w-8 h-0.5 bg-gray-800 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-8 h-0.5 bg-gray-800 transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>

            {/* Desktop Menu */}
            <ul className="hidden md:flex items-center gap-12 text-gray-600 font-medium text-lg">
                <li onClick={() => { setMenu('shop') }} className="flex flex-col items-center gap-1 cursor-pointer hover:text-primary transition-colors">
                    <Link to='/'>Shop</Link>
                    {menu === "shop" && <hr className="w-4/5 h-[3px] bg-primary rounded-full border-none" />}
                </li>
                <li onClick={() => { setMenu('men') }} className="flex flex-col items-center gap-1 cursor-pointer hover:text-primary transition-colors">
                    <Link to="/men">Men</Link>
                    {menu === "men" && <hr className="w-4/5 h-[3px] bg-primary rounded-full border-none" />}
                </li>
                <li onClick={() => { setMenu('women') }} className="flex flex-col items-center gap-1 cursor-pointer hover:text-primary transition-colors">
                    <Link to="/women">Women</Link>
                    {menu === "women" && <hr className="w-4/5 h-[3px] bg-primary rounded-full border-none" />}
                </li>
                <li onClick={() => { setMenu('kids') }} className="flex flex-col items-center gap-1 cursor-pointer hover:text-primary transition-colors">
                    <Link to="/kids">Kids</Link>
                    {menu === "kids" && <hr className="w-4/5 h-[3px] bg-primary rounded-full border-none" />}
                </li>
                {isLoggedIn && (
                    <>
                        <li onClick={() => { setMenu('orders') }} className="flex flex-col items-center gap-1 cursor-pointer hover:text-primary transition-colors">
                            <Link to="/orders">Orders</Link>
                            {menu === "orders" && <hr className="w-4/5 h-[3px] bg-primary rounded-full border-none" />}
                        </li>
                        <li onClick={() => { setMenu('wishlist') }} className="flex flex-col items-center gap-1 cursor-pointer hover:text-primary transition-colors">
                            <Link to="/wishlist">Wishlist</Link>
                            {menu === "wishlist" && <hr className="w-4/5 h-[3px] bg-primary rounded-full border-none" />}
                        </li>
                    </>
                )}
            </ul>

            {/* Mobile Menu Overlay */}
            <div className={`fixed top-0 right-0 w-2/3 h-full bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-40 pt-24 px-8 md:hidden ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <ul className="flex flex-col gap-6 text-xl font-medium text-gray-800">
                    <li onClick={() => { setMenu('shop'); setMobileMenuOpen(false) }}><Link to='/'>Shop</Link></li>
                    <li onClick={() => { setMenu('men'); setMobileMenuOpen(false) }}><Link to="/men">Men</Link></li>
                    <li onClick={() => { setMenu('women'); setMobileMenuOpen(false) }}><Link to="/women">Women</Link></li>
                    <li onClick={() => { setMenu('kids'); setMobileMenuOpen(false) }}><Link to="/kids">Kids</Link></li>
                    {isLoggedIn && (
                        <>
                            <li onClick={() => { setMenu('orders'); setMobileMenuOpen(false) }}><Link to="/orders">Orders</Link></li>
                            <li onClick={() => { setMenu('wishlist'); setMobileMenuOpen(false) }}><Link to="/wishlist">Wishlist</Link></li>
                        </>
                    )}
                    <li className="mt-4">
                        {isLoggedIn ? (
                            <div className="flex flex-col gap-2">
                                <span className="text-sm text-gray-500">Welcome, {user?.name}</span>
                                <button onClick={logout} className="px-6 py-2 rounded-full bg-red-100 text-red-600 font-medium">Logout</button>
                            </div>
                        ) : (
                            <Link to="/login" onClick={() => { setMobileMenuOpen(false) }} className="block w-full text-center px-6 py-3 rounded-full bg-primary text-white font-medium shadow-md">Login</Link>
                        )}
                    </li>
                </ul>
            </div>

            <div className='flex items-center gap-6 mr-4'>
                {isLoggedIn ? (
                    <div className="relative hidden md:block">
                        <button
                            className="flex items-center gap-2 font-medium hover:text-primary transition-colors"
                            onClick={() => setShowUserMenu(!showUserMenu)}
                        >
                            Welcome, {user?.name}
                        </button>
                        {showUserMenu && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 border border-gray-100 animate-fade-in">
                                <div className="px-4 py-2 border-b border-gray-100">
                                    <p className="font-bold text-gray-800">{user?.name}</p>
                                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                                </div>
                                <button onClick={logout} className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 transition-colors">Logout</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link to="/login" className="hidden md:block">
                        <button className="px-8 py-2.5 rounded-full border border-gray-400 text-gray-600 font-medium hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 active:bg-red-700">
                            Login
                        </button>
                    </Link>
                )}
                <Link to="/cart" className="relative">
                    <img src={cart_icon} alt="" className="w-8 h-8" loading="lazy" />
                    <div className="absolute -top-2 -right-2 w-5 h-5 flex justify-center items-center rounded-full bg-primary text-white text-xs font-bold shadow-sm">{totalItems}</div>
                </Link>
            </div>
        </div>
    )
}

export default NavBar
