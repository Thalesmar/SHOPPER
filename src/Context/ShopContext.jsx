import React from 'react';
import all_product from '../Component/Assets/all_product';
import { ShopContext } from './ShopContextInstance';
import { useState, useEffect } from 'react';

const ShopContextProvider = (props) => {
    const getDefaultCart = () => {
        let cart = {};
        for (let i = 0; i < all_product.length +1; i++) {
            cart[i] = 0;
        }
        return cart;
    }

    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Load user and cart data from localStorage on component mount
    useEffect(() => {
        const savedUser = localStorage.getItem('currentUser');
        const savedCart = localStorage.getItem('cartItems');

        if (savedUser) {
            setUser(JSON.parse(savedUser));
            setIsLoggedIn(true);
        }

        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    }, []);

    // Save cart to localStorage whenever cartItems changes
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (itemId) => {
        setCartItems((prev) => {
            const newCart = {...prev, [itemId]: prev[itemId] + 1};
            return newCart;
        });
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            const newCart = {...prev, [itemId]: Math.max(0, prev[itemId] - 1)};
            return newCart;
        });
    }

    const clearCart = () => {
        setCartItems(getDefaultCart());
    }

    const login = (userData) => {
        setUser(userData);
        setIsLoggedIn(true);
        localStorage.setItem('currentUser', JSON.stringify(userData));
    }

    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem('currentUser');
        clearCart();
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        let totalItems = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                if (itemInfo) {
                    totalAmount += itemInfo.new_price * cartItems[item];
                    totalItems += cartItems[item];
                }
            }
        }
        return { totalAmount, totalItems };
    };

   const contextValue = {
        all_product,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        clearCart,
        user,
        isLoggedIn,
        login,
        logout,
        getTotalCartAmount
    };

    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
