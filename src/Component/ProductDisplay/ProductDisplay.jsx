import React, { useContext, useState, useEffect } from 'react'
import './ProductDisplay.css';
import star_icon from '../Assets/star_icon.png';
import start_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContextInstance';

export const ProductDisplay = (props) => {
    const {product} = props;
    const {addToCart, user, isLoggedIn} = useContext(ShopContext);
    const [isInWishlist, setIsInWishlist] = useState(false);

    // Check if product is in wishlist
    useEffect(() => {
        if (isLoggedIn && user) {
            const wishlist = JSON.parse(localStorage.getItem(`wishlist_${user.id}`) || '[]');
            setIsInWishlist(wishlist.includes(product.id));
        }
    }, [product.id, user, isLoggedIn]);

    const toggleWishlist = () => {
        if (!isLoggedIn) {
            alert('Please log in to add items to your wishlist');
            return;
        }

        const wishlist = JSON.parse(localStorage.getItem(`wishlist_${user.id}`) || '[]');
        
        if (isInWishlist) {
            // Remove from wishlist
            const updatedWishlist = wishlist.filter(id => id !== product.id);
            localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(updatedWishlist));
            setIsInWishlist(false);
        } else {
            // Add to wishlist
            const updatedWishlist = [...wishlist, product.id];
            localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(updatedWishlist));
            setIsInWishlist(true);
        }
    };
  return (
    <div className='productDisplay'>
       <div className="productDisplay-left">
        <div className='productDisplay-img-list'>
            <img src={product.image} alt={product.name} />
            <img src={product.image} alt={product.name} />
            <img src={product.image} alt={product.name} />
            <img src={product.image} alt={product.name} />
        </div>
        <div className="productDisplay-Img">
            <img className="productDisplay-main-img" src={product.image} alt={product.name} />
        </div>
       </div>
       <div className="productDisplay-right">
        <h1>{product.name}</h1>
        <div className='productDisplay-right-stars'>
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={start_dull_icon} alt="" />
            <p>(20 Reviews)</p>
        </div>
        <div className="productDisplay-right-prices">
            <div className="productDisplay-right-price-old">${(product.old_price)}</div>
            <div className="productDisplay-right-price-new">${product.new_price}</div>
        </div>
        <div className="productDisplay-right-description">
            A lightweight, versatile sneaker that’s perfect for all-day wear. Featuring a breathable mesh upper and cushioned sole, the AirFlex 360 offers superior comfort and support. Whether you’re hitting the gym or running errands, these sneakers provide the perfect blend of style and functionality.
        </div>
        <div className="productDisplay-right-size">
            <h1>Select Size</h1>
            <div className='productDisplay-right-sizes'>
                <div>S</div>
                <div>M</div>
                <div>L</div>
                <div>XL</div>
                <div>XXL</div>
            </div>
            <div className="product-actions">
                <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
                <button 
                    className={`wishlist-btn ${isInWishlist ? 'in-wishlist' : ''}`}
                    onClick={toggleWishlist}
                    title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                    {isInWishlist ? '♥' : '♡'} {isInWishlist ? 'IN WISHLIST' : 'ADD TO WISHLIST'}
                </button>
            </div>
        </div>
        <p className='productDisplay-right-category'><span>Category: </span>Women, T-Shirt, Crop Top</p>
        <p className='productDisplay-left-category'><span>Tags: </span>Modern, Latest</p>
       </div>
    </div>
  )
}
