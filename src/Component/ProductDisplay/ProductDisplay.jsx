import React, { useContext, useState, useEffect } from 'react'
import star_icon from '../Assets/star_icon.png';
import start_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContextInstance';

export const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart, user, isLoggedIn } = useContext(ShopContext);
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
        <div className='flex flex-col md:flex-row mx-4 md:mx-40 my-8 gap-10'>
            <div className="flex flex-col-reverse md:flex-row gap-4 flex-1">
                <div className='flex md:flex-col gap-4 overflow-x-auto md:overflow-visible'>
                    <img src={product.image} alt={product.name} className="h-24 md:h-40 object-cover cursor-pointer opacity-80 hover:opacity-100 transition-opacity" />
                    <img src={product.image} alt={product.name} className="h-24 md:h-40 object-cover cursor-pointer opacity-80 hover:opacity-100 transition-opacity" />
                    <img src={product.image} alt={product.name} className="h-24 md:h-40 object-cover cursor-pointer opacity-80 hover:opacity-100 transition-opacity" />
                    <img src={product.image} alt={product.name} className="h-24 md:h-40 object-cover cursor-pointer opacity-80 hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex-1">
                    <img className="w-full h-auto max-h-[600px] object-cover" src={product.image} alt={product.name} />
                </div>
            </div>
            <div className="flex-1 flex flex-col">
                <h1 className="text-[#3d3d3d] text-3xl md:text-4xl font-bold">{product.name}</h1>
                <div className='flex items-center gap-1 mt-3 text-[#1c1c1c] text-base'>
                    <img src={star_icon} alt="" className="h-4" />
                    <img src={star_icon} alt="" className="h-4" />
                    <img src={star_icon} alt="" className="h-4" />
                    <img src={star_icon} alt="" className="h-4" />
                    <img src={start_dull_icon} alt="" className="h-4" />
                    <p className="ml-2">(20 Reviews)</p>
                </div>
                <div className="flex gap-5 font-bold text-2xl my-6 md:my-10">
                    <div className="text-[#818181] line-through decoration-red-500">${(product.old_price)}</div>
                    <div className="text-[#ff4141]">${product.new_price}</div>
                </div>
                <div className="text-[#555] text-base font-normal leading-relaxed">
                    A lightweight, versatile sneaker that’s perfect for all-day wear. Featuring a breathable mesh upper and cushioned sole, the AirFlex 360 offers superior comfort and support. Whether you’re hitting the gym or running errands, these sneakers provide the perfect blend of style and functionality.
                </div>
                <div className="mt-8 md:mt-14">
                    <h1 className="text-[#656565] text-xl font-semibold mt-4">Select Size</h1>
                    <div className='flex gap-4 mt-4'>
                        {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                            <div key={size} className="w-10 h-10 md:w-12 md:h-12 bg-[#fbfbfb] border border-[#ebebeb] rounded-md flex justify-center items-center cursor-pointer hover:bg-gray-100 hover:border-gray-300 transition-all text-sm md:text-base font-medium text-[#555]">
                                {size}
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 mt-10 mb-10">
                        <button
                            onClick={() => { addToCart(product.id) }}
                            className="flex-1 py-4 px-8 bg-[#ff4141] text-white text-base font-semibold uppercase tracking-wider cursor-pointer border-none outline-none hover:bg-[#e63b3b] active:bg-[#cc3333] transition-colors"
                        >
                            ADD TO CART
                        </button>
                        <button
                            className={`flex-1 py-4 px-8 border border-[#ff4141] text-[#ff4141] text-base font-semibold uppercase tracking-wider cursor-pointer outline-none hover:bg-[#fff0f0] transition-colors flex justify-center items-center gap-2 ${isInWishlist ? 'bg-[#fff0f0]' : 'bg-white'}`}
                            onClick={toggleWishlist}
                            title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                        >
                            {isInWishlist ? '♥' : '♡'} {isInWishlist ? 'IN WISHLIST' : 'ADD TO WISHLIST'}
                        </button>
                    </div>
                </div>
                <p className='mt-2 text-[#555] text-sm font-medium'><span>Category: </span>Women, T-Shirt, Crop Top</p>
                <p className='mt-1 text-[#555] text-sm font-medium'><span>Tags: </span>Modern, Latest</p>
            </div>
        </div>
    )
}
