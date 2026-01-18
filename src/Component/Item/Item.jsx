import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContextInstance'

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
    <div className='w-full max-w-[350px] transform hover:scale-105 transition-all duration-500 cursor-pointer group'>
      <div className="relative overflow-hidden rounded-2xl shadow-lg bg-white">
        <Link to={`/product/${props.id}`}>
          <img
            onClick={() => window.scrollTo(0, 0)}
            src={props.image}
            alt={props.name}
            className="w-full h-auto object-cover group-hover:opacity-90 transition-opacity"
            loading="lazy"
          />
        </Link>
        <button
          className={`absolute top-3 right-3 w-10 h-10 rounded-full bg-white shadow-md flex justify-center items-center text-2xl transition-all duration-300 z-10 ${isInWishlist ? 'text-red-500' : 'text-gray-400 hover:text-red-400'}`}
          onClick={toggleWishlist}
          title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {isInWishlist ? '♥' : '♡'}
        </button>
      </div>
      <p className="mt-4 mb-2 text-[#374151] text-lg font-medium truncate px-1">{props.name}</p>
      <div className='flex gap-4 px-1'>
        <div className="text-[#374151] text-lg font-bold">
          ${props.new_price}
        </div>
        <div className="text-[#8c8c8c] text-lg font-medium line-through decoration-red-500">
          ${props.old_price}
        </div>
      </div>
    </div>
  )
}

export default Item
