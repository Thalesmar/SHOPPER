import React from 'react'
import './Breadcrum.css/Breadcrum.css'
import arrow_icon from '../Assets/breadcrum_arrow.png'

const Breadcrum = (props) => {
    const {product} = props;

    // Error handling for missing product data
    if (!product) {
        return (
            <div className='breadcrum'>
                HOME <img src={arrow_icon} alt="" /> SHOP
            </div>
        );
    }

    return (
        <div className='breadcrum'>
            HOME <img src={arrow_icon} alt="" /> SHOP <img src={arrow_icon} alt="" /> {product.category?.toUpperCase() || 'CATEGORY'} <img src={arrow_icon} alt="" /> {product.name?.toUpperCase() || 'PRODUCT'}
        </div>
    )
}

export default Breadcrum
