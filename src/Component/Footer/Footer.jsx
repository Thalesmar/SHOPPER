import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Footer.css';
import footer_logo from '../Assets/logo_big.png';
import instagram_icon from '../Assets/instagram_icon.png';
import pintester_icon from '../Assets/pintester_icon.png';
import whatsapp_icon from '../Assets/whatsapp_icon.png';

const Footer = () => {
  const navigate = useNavigate();

  const handleSocialClick = (platform) => {
    const socialLinks = {
      instagram: 'https://www.instagram.com/shopper',
      pinterest: 'https://www.pinterest.com/shopper',
      whatsapp: 'https://wa.me/1234567890'
    };
    window.open(socialLinks[platform], '_blank');
  };

  const handleFooterLinkClick = (section) => {
    switch(section) {
      case 'company':
        navigate('/company');
        break;
      case 'products':
        navigate('/');
        setTimeout(() => {
          const popularSection = document.querySelector('.popular');
          if (popularSection) {
            popularSection.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
        break;
      case 'about':
        navigate('/about');
        break;
      case 'contact':
        navigate('/contact');
        break;
      default:
        break;
    }
  };

  const handleMenuItemClick = (item, section) => {
    switch(section) {
      case 'company':
        switch(item) {
          case 'About Us':
            navigate('/about');
            break;
          case 'Careers':
            window.open('mailto:careers@shopper.com?subject=Career Inquiry', '_blank');
            break;
          case 'Press':
            window.open('mailto:press@shopper.com?subject=Press Inquiry', '_blank');
            break;
          case 'Investors':
            window.open('mailto:investors@shopper.com?subject=Investment Inquiry', '_blank');
            break;
        }
        break;
      case 'products':
        switch(item) {
          case "Men's Fashion":
            navigate('/men');
            break;
          case "Women's Fashion":
            navigate('/women');
            break;
          case "Kids' Fashion":
            navigate('/kids');
            break;
          case 'New Arrivals':
            navigate('/');
            setTimeout(() => {
              const newCollectionsSection = document.querySelector('.new-collections');
              if (newCollectionsSection) {
                newCollectionsSection.scrollIntoView({ behavior: 'smooth' });
              }
            }, 100);
            break;
        }
        break;
      case 'about':
        switch(item) {
          case 'Our Story':
            navigate('/about');
            break;
          case 'Sustainability':
            window.open('mailto:sustainability@shopper.com?subject=Sustainability Inquiry', '_blank');
            break;
          case 'Quality Promise':
            navigate('/about');
            break;
          case 'Innovation':
            navigate('/about');
            break;
        }
        break;
      case 'contact':
        switch(item) {
          case 'Customer Support':
            navigate('/contact');
            break;
          case 'Help Center':
            navigate('/contact');
            break;
          case 'Wholesale':
            navigate('/contact');
            break;
          case 'Partnerships':
            navigate('/contact');
            break;
        }
        break;
    }
  };

  return (
    <div className='footer'>
        <div className="footer-logo" onClick={() => navigate('/')}>
            <img src={footer_logo} alt="" loading="lazy" />
            <p>Shopper</p>
        </div>
        <div className='footer-links'>
            <div className='footer-link-item' onClick={() => handleFooterLinkClick('company')}>
                <h4>Company</h4>
                <p className='footer-link-desc'>Learn about our mission, team and values.</p>
                <div className='footer-link-items'>
                    <span onClick={(e) => { e.stopPropagation(); handleMenuItemClick('About Us', 'company'); }}>About Us</span>
                    <span onClick={(e) => { e.stopPropagation(); handleMenuItemClick('Careers', 'company'); }}>Careers</span>
                    <span onClick={(e) => { e.stopPropagation(); handleMenuItemClick('Press', 'company'); }}>Press</span>
                    <span onClick={(e) => { e.stopPropagation(); handleMenuItemClick('Investors', 'company'); }}>Investors</span>
                </div>
            </div>
            <div className='footer-link-item' onClick={() => handleFooterLinkClick('products')}>
                <h4>Products</h4>
                <p className='footer-link-desc'>Browse our categories, new arrivals and best sellers.</p>
                <div className='footer-link-items'>
                    <span onClick={(e) => { e.stopPropagation(); handleMenuItemClick("Men's Fashion", 'products'); }}>Men's Fashion</span>
                    <span onClick={(e) => { e.stopPropagation(); handleMenuItemClick("Women's Fashion", 'products'); }}>Women's Fashion</span>
                    <span onClick={(e) => { e.stopPropagation(); handleMenuItemClick("Kids' Fashion", 'products'); }}>Kids' Fashion</span>
                    <span onClick={(e) => { e.stopPropagation(); handleMenuItemClick('New Arrivals', 'products'); }}>New Arrivals</span>
                </div>
            </div>
            <div className='footer-link-item' onClick={() => handleFooterLinkClick('about')}>
                <h4>About</h4>
                <p className='footer-link-desc'>Find out how Shopper started and where we're headed.</p>
                <div className='footer-link-items'>
                    <span onClick={(e) => { e.stopPropagation(); handleMenuItemClick('Our Story', 'about'); }}>Our Story</span>
                    <span onClick={(e) => { e.stopPropagation(); handleMenuItemClick('Sustainability', 'about'); }}>Sustainability</span>
                    <span onClick={(e) => { e.stopPropagation(); handleMenuItemClick('Quality Promise', 'about'); }}>Quality Promise</span>
                    <span onClick={(e) => { e.stopPropagation(); handleMenuItemClick('Innovation', 'about'); }}>Innovation</span>
                </div>
            </div>
            <div className='footer-link-item' onClick={() => handleFooterLinkClick('contact')}>
                <h4>Contact</h4>
                <p className='footer-link-desc'>Get in touch for support, wholesale or partnerships.</p>
                <div className='footer-link-items'>
                    <span onClick={(e) => { e.stopPropagation(); handleMenuItemClick('Customer Support', 'contact'); }}>Customer Support</span>
                    <span onClick={(e) => { e.stopPropagation(); handleMenuItemClick('Help Center', 'contact'); }}>Help Center</span>
                    <span onClick={(e) => { e.stopPropagation(); handleMenuItemClick('Wholesale', 'contact'); }}>Wholesale</span>
                    <span onClick={(e) => { e.stopPropagation(); handleMenuItemClick('Partnerships', 'contact'); }}>Partnerships</span>
                </div>
            </div>
        </div>
        <div className="footer-social-icons" aria-label="social links">
            <div className="footer-icons-container" onClick={() => handleSocialClick('instagram')}>
                <img src={instagram_icon} alt="Instagram" loading="lazy" />
            </div>
            <div className="footer-icons-container" onClick={() => handleSocialClick('pinterest')}>
                <img src={pintester_icon} alt="Pinterest" loading="lazy" />
            </div>
            <div className="footer-icons-container" onClick={() => handleSocialClick('whatsapp')}>
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
