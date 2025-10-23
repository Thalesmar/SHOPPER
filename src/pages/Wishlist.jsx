import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContextInstance';
import './CSS/Wishlist.css';

export const Wishlist = () => {
    const { user, isLoggedIn, all_product, addToCart } = useContext(ShopContext);
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            setLoading(false);
            return;
        }

        // Load wishlist from localStorage
        const savedWishlist = JSON.parse(localStorage.getItem(`wishlist_${user.id}`) || '[]');
        setWishlist(savedWishlist);
        setLoading(false);
    }, [isLoggedIn, user]);

    const removeFromWishlist = (productId) => {
        const updatedWishlist = wishlist.filter(id => id !== productId);
        setWishlist(updatedWishlist);
        localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(updatedWishlist));
    };

    const addToWishlist = (productId) => {
        if (!wishlist.includes(productId)) {
            const updatedWishlist = [...wishlist, productId];
            setWishlist(updatedWishlist);
            localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(updatedWishlist));
        }
    };

    const toggleWishlist = (productId) => {
        if (wishlist.includes(productId)) {
            removeFromWishlist(productId);
        } else {
            addToWishlist(productId);
        }
    };

    const getWishlistProducts = () => {
        return all_product.filter(product => wishlist.includes(product.id));
    };

    if (!isLoggedIn) {
        return (
            <div className="wishlist-container">
                <div className="wishlist-login-required">
                    <h2>Login Required</h2>
                    <p>Please log in to view your wishlist.</p>
                    <button onClick={() => navigate('/login')} className="login-btn">
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="wishlist-container">
                <div className="loading">Loading wishlist...</div>
            </div>
        );
    }

    const wishlistProducts = getWishlistProducts();

    return (
        <div className="wishlist-container">
            <div className="wishlist-header">
                <h1>My Wishlist</h1>
                <p>Save items you love for later</p>
            </div>

            {wishlistProducts.length === 0 ? (
                <div className="no-wishlist">
                    <h2>Your wishlist is empty</h2>
                    <p>Start adding items to your wishlist!</p>
                    <button onClick={() => navigate('/')} className="shop-now-btn">Start Shopping</button>
                </div>
            ) : (
                <div className="wishlist-grid">
                    {wishlistProducts.map((product) => (
                        <div key={product.id} className="wishlist-item">
                            <div className="product-image">
                                <img src={product.image} alt={product.name} />
                                <button 
                                    className="remove-wishlist-btn"
                                    onClick={() => removeFromWishlist(product.id)}
                                    title="Remove from wishlist"
                                >
                                    ♥
                                </button>
                            </div>
                            <div className="product-info">
                                <h3>{product.name}</h3>
                                <div className="product-prices">
                                    <span className="new-price">${product.new_price}</span>
                                    {product.old_price && (
                                        <span className="old-price">${product.old_price}</span>
                                    )}
                                </div>
                                <div className="product-actions">
                                    <button 
                                        className="add-to-cart-btn"
                                        onClick={() => addToCart(product.id)}
                                    >
                                        Add to Cart
                                    </button>
                                    <button 
                                        className="view-product-btn"
                                        onClick={() => navigate(`/product/${product.id}`)}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
