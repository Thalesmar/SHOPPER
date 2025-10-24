import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Offers.css';
import exclusive_image from '../Assets/exclusive_image.png';

export const Offers = () => {
  const navigate = useNavigate();

  const handleCheckNowClick = () => {
    // Navigate to popular products section or create a deals page
    // For now, let's navigate to the popular section on home page
    navigate('/');
    setTimeout(() => {
      const popularSection = document.querySelector('.popular');
      if (popularSection) {
        popularSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className='offers'>
        <div className="offers-left">
            <h1>EXCLUSIVE</h1>
            <h1>OFFERS FOR YOU</h1>
            <p>ONLY ON BEST SELLER PRODUCTS</p>
            <button onClick={handleCheckNowClick}>Check Now</button>
        </div>
        <div className="offers-right">
            <img src={exclusive_image} alt="" loading="lazy" />
        </div>
    </div>
  )
}
