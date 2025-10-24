import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Hero.css';
import hand_icon from '../Assets/hand_icon.png';
import arrow_icon from '../Assets/arrow.png';
import hero_image from '../Assets/hero_image.png';

export const Hero = () => {
  const navigate = useNavigate();

  const handleLatestCollectionClick = () => {
    // Scroll to the new collections section on the same page
    const newCollectionsSection = document.querySelector('.new-collections');
    if (newCollectionsSection) {
      newCollectionsSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If not on home page, navigate to home and then scroll
      navigate('/');
      setTimeout(() => {
        const section = document.querySelector('.new-collections');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <div className='hero'>
        <div className='hero-content'>
            <div className='hero-left'>
                <h2>New Arrivals Only</h2>
                <div>
                    <div className="hero-hand-icon">
                        <p>new</p>
                        <img src={hand_icon} alt="" loading="lazy" />
                    </div>
                    <p>collections</p>
                    <p>for everyone</p>
                </div>
                <div className="hero-latest-btn" onClick={handleLatestCollectionClick}>
                    <div>Latest Collection</div>
                    <img src={arrow_icon} alt="" loading="lazy" />
                </div>
            </div>
            <div className='hero-right'>
                <img src={hero_image} alt="" loading="eager" />
            </div>
        </div>
    </div>
  )
}
