import React from 'react'
import './Footer.css';
import footer_logo from '../Assets/logo_big.png';
import instagram_icon from '../Assets/instagram_icon.png';
import pintester_icon from '../Assets/pintester_icon.png';
import whatsapp_icon from '../Assets/whatsapp_icon.png';

const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-logo">
            <img src={footer_logo} alt="" loading="lazy" />
            <p>Shopper</p>
        </div>
        <div className='footer-links'>
            <div className='footer-link-item'>
                <h4>Company</h4>
                <p className='footer-link-desc'>Learn about our mission, team and values.</p>
            </div>
            <div className='footer-link-item'>
                <h4>Products</h4>
                <p className='footer-link-desc'>Browse our categories, new arrivals and best sellers.</p>
            </div>
            <div className='footer-link-item'>
                <h4>About</h4>
                <p className='footer-link-desc'>Find out how Shopper started and where we're headed.</p>
            </div>
            <div className='footer-link-item'>
                <h4>Contact</h4>
                <p className='footer-link-desc'>Get in touch for support, wholesale or partnerships.</p>
            </div>
        </div>
        <div className="footer-social-icons" aria-label="social links">
            <div className="footer-icons-container">
                <img src={instagram_icon} alt="Instagram" loading="lazy" />
            </div>
            <div className="footer-icons-container">
                <img src={pintester_icon} alt="Pinterest" loading="lazy" />
            </div>
            <div className="footer-icons-container">
                <img src={whatsapp_icon} alt="WhatsApp" loading="lazy" />
            </div>
        </div>
        <div className='footer-copyright'>
            <hr/>
            <p>© 2025 SHOPPER. All Rights Reserved.</p>
        </div>

    </div>
  )
}

export default Footer
