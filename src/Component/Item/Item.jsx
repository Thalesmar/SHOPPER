import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContextInstance'
import './Item.css';

 const Item = (props) => {
  const { user, isLoggedIn } = useContext(ShopContext);
  const [isInWishlist, setIsInWishlist] = useState(false);

  // Check if product is in wishlist
  useEffect(() => {
    if (isLoggedIn && user) {
      const wishlist = JSON.parse(localStorage.getItem(`wishlist_${user.id}`) || '[]');
      setIsInWishlist(wishlist.includes(props.id));
    }
  }, [props.id, user, isLoggedIn]);

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isLoggedIn) {
      alert('Please log in to add items to your wishlist');
      return;
    }

    const wishlist = JSON.parse(localStorage.getItem(`wishlist_${user.id}`) || '[]');
    
    if (isInWishlist) {
      // Remove from wishlist
      const updatedWishlist = wishlist.filter(id => id !== props.id);
      localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(updatedWishlist));
      setIsInWishlist(false);
    } else {
      // Add to wishlist
      const updatedWishlist = [...wishlist, props.id];
      localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(updatedWishlist));
      setIsInWishlist(true);
    }
  };

  return (
    <div className='item'>
        <div className="item-image-container">
            <Link to={`/product/${props.id}`}>
                <img onClick={() => window.scrollTo(0,0)} src={props.image} alt="" loading="lazy" />
            </Link>
            <button 
                className={`wishlist-heart ${isInWishlist ? 'in-wishlist' : ''}`}
                onClick={toggleWishlist}
                title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
                {isInWishlist ? '♥' : '♡'}
            </button>
        </div>
        <p>{props.name}</p>
        <div className='item-prices'>
            <div className="item-price-new">
                ${props.new_price}
            </div>
            <div className="item-price-old">
                ${props.old_price}
            </div>
        </div>
    </div>
  )
}

export default Item
