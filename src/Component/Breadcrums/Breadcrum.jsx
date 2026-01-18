import React from 'react'
import arrow_icon from '../Assets/breadcrum_arrow.png'

const Breadcrum = (props) => {
    const { product } = props;

    // Error handling for missing product data
    if (!product) {
        return (
            <div className='flex items-center gap-2 text-[#5e5e5e] text-sm md:text-base font-semibold my-14 mx-4 md:mx-40 capitalize'>
                HOME <img src={arrow_icon} alt="" className="h-3 md:h-4" /> SHOP
            </div>
        );
    }

    return (
        <div className='flex items-center gap-2 text-[#5e5e5e] text-sm md:text-base font-semibold my-14 mx-4 md:mx-40 capitalize flex-wrap'>
            HOME <img src={arrow_icon} alt="" className="h-3 md:h-4" /> SHOP <img src={arrow_icon} alt="" className="h-3 md:h-4" /> {product.category} <img src={arrow_icon} alt="" className="h-3 md:h-4" /> {product.name}
        </div>
    )
}

export default Breadcrum
