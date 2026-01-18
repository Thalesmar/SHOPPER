import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContextInstance';

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
            <div className="max-w-7xl mx-auto px-4 py-12 min-h-[60vh] flex justify-center items-center">
                <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Login Required</h2>
                    <p className="text-gray-600 mb-6">Please log in to view your wishlist.</p>
                    <button onClick={() => navigate('/login')} className="px-6 py-3 bg-[#ff4141] text-white rounded-md hover:bg-[#e63b3b] transition-colors font-medium">
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-12 min-h-[60vh] flex justify-center items-center">
                <div className="text-xl text-gray-600 font-medium">Loading wishlist...</div>
            </div>
        );
    }

    const wishlistProducts = getWishlistProducts();

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 min-h-[80vh]">
            <div className="mb-8 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">My Wishlist</h1>
                <p className="text-gray-600">Save items you love for later</p>
            </div>

            {wishlistProducts.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">Your wishlist is empty</h2>
                    <p className="text-gray-600 mb-8">Start adding items to your wishlist!</p>
                    <button onClick={() => navigate('/')} className="px-8 py-3 bg-[#ff4141] text-white rounded-md hover:bg-[#e63b3b] transition-colors font-medium">Start Shopping</button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {wishlistProducts.map((product) => (
                        <div key={product.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow group relative">
                            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                <button
                                    className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-[#ff4141] hover:bg-red-50 transition-colors z-10"
                                    onClick={() => removeFromWishlist(product.id)}
                                    title="Remove from wishlist"
                                >
                                    ♥
                                </button>
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-medium text-gray-900 mb-2 truncate">{product.name}</h3>
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-lg font-bold text-gray-900">${product.new_price}</span>
                                    {product.old_price && (
                                        <span className="text-sm text-gray-500 line-through">${product.old_price}</span>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <button
                                        className="w-full py-2 bg-black text-white text-sm font-medium rounded hover:bg-gray-800 transition-colors"
                                        onClick={() => addToCart(product.id)}
                                    >
                                        Add to Cart
                                    </button>
                                    <button
                                        className="w-full py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 transition-colors"
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
