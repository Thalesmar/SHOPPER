import React from 'react'
import { useNavigate } from 'react-router-dom'
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
    switch (section) {
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
    switch (section) {
      case 'company':
        switch (item) {
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
        switch (item) {
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
        switch (item) {
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
        switch (item) {
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
    <div className='flex flex-col justify-center items-center gap-12 p-10 bg-dark text-white mt-auto'>
      <div className="flex items-center gap-5 cursor-pointer transform hover:scale-105 transition-transform duration-300" onClick={() => navigate('/')}>
        <img src={footer_logo} alt="" className="w-16 h-auto" loading="lazy" />
        <p className="text-4xl font-bold tracking-wider text-white">Shopper</p>
      </div>
      <div className='flex flex-wrap justify-center gap-12 w-full max-w-6xl'>
        <div className='flex flex-col items-start gap-4 min-w-[200px] cursor-pointer group' onClick={() => handleFooterLinkClick('company')}>
          <h4 className="text-xl font-bold text-primary group-hover:text-white transition-colors">Company</h4>
          <p className='text-sm text-gray-400'>Learn about our mission, team and values.</p>
          <div className='flex flex-col gap-2 text-gray-300'>
            <span className="hover:text-primary hover:translate-x-1 transition-all duration-300" onClick={(e) => { e.stopPropagation(); handleMenuItemClick('About Us', 'company'); }}>About Us</span>
            <span className="hover:text-primary hover:translate-x-1 transition-all duration-300" onClick={(e) => { e.stopPropagation(); handleMenuItemClick('Careers', 'company'); }}>Careers</span>
            <span className="hover:text-primary hover:translate-x-1 transition-all duration-300" onClick={(e) => { e.stopPropagation(); handleMenuItemClick('Press', 'company'); }}>Press</span>
            <span className="hover:text-primary hover:translate-x-1 transition-all duration-300" onClick={(e) => { e.stopPropagation(); handleMenuItemClick('Investors', 'company'); }}>Investors</span>
          </div>
        </div>
        <div className='flex flex-col items-start gap-4 min-w-[200px] cursor-pointer group' onClick={() => handleFooterLinkClick('products')}>
          <h4 className="text-xl font-bold text-primary group-hover:text-white transition-colors">Products</h4>
          <p className='text-sm text-gray-400'>Browse our categories, new arrivals and best sellers.</p>
          <div className='flex flex-col gap-2 text-gray-300'>
            <span className="hover:text-primary hover:translate-x-1 transition-all duration-300" onClick={(e) => { e.stopPropagation(); handleMenuItemClick("Men's Fashion", 'products'); }}>Men's Fashion</span>
            <span className="hover:text-primary hover:translate-x-1 transition-all duration-300" onClick={(e) => { e.stopPropagation(); handleMenuItemClick("Women's Fashion", 'products'); }}>Women's Fashion</span>
            <span className="hover:text-primary hover:translate-x-1 transition-all duration-300" onClick={(e) => { e.stopPropagation(); handleMenuItemClick("Kids' Fashion", 'products'); }}>Kids' Fashion</span>
            <span className="hover:text-primary hover:translate-x-1 transition-all duration-300" onClick={(e) => { e.stopPropagation(); handleMenuItemClick('New Arrivals', 'products'); }}>New Arrivals</span>
          </div>
        </div>
        <div className='flex flex-col items-start gap-4 min-w-[200px] cursor-pointer group' onClick={() => handleFooterLinkClick('about')}>
          <h4 className="text-xl font-bold text-primary group-hover:text-white transition-colors">About</h4>
          <p className='text-sm text-gray-400'>Find out how Shopper started and where we're headed.</p>
          <div className='flex flex-col gap-2 text-gray-300'>
            <span className="hover:text-primary hover:translate-x-1 transition-all duration-300" onClick={(e) => { e.stopPropagation(); handleMenuItemClick('Our Story', 'about'); }}>Our Story</span>
            <span className="hover:text-primary hover:translate-x-1 transition-all duration-300" onClick={(e) => { e.stopPropagation(); handleMenuItemClick('Sustainability', 'about'); }}>Sustainability</span>
            <span className="hover:text-primary hover:translate-x-1 transition-all duration-300" onClick={(e) => { e.stopPropagation(); handleMenuItemClick('Quality Promise', 'about'); }}>Quality Promise</span>
            <span className="hover:text-primary hover:translate-x-1 transition-all duration-300" onClick={(e) => { e.stopPropagation(); handleMenuItemClick('Innovation', 'about'); }}>Innovation</span>
          </div>
        </div>
        <div className='flex flex-col items-start gap-4 min-w-[200px] cursor-pointer group' onClick={() => handleFooterLinkClick('contact')}>
          <h4 className="text-xl font-bold text-primary group-hover:text-white transition-colors">Contact</h4>
          <p className='text-sm text-gray-400'>Get in touch for support, wholesale or partnerships.</p>
          <div className='flex flex-col gap-2 text-gray-300'>
            <span className="hover:text-primary hover:translate-x-1 transition-all duration-300" onClick={(e) => { e.stopPropagation(); handleMenuItemClick('Customer Support', 'contact'); }}>Customer Support</span>
            <span className="hover:text-primary hover:translate-x-1 transition-all duration-300" onClick={(e) => { e.stopPropagation(); handleMenuItemClick('Help Center', 'contact'); }}>Help Center</span>
            <span className="hover:text-primary hover:translate-x-1 transition-all duration-300" onClick={(e) => { e.stopPropagation(); handleMenuItemClick('Wholesale', 'contact'); }}>Wholesale</span>
            <span className="hover:text-primary hover:translate-x-1 transition-all duration-300" onClick={(e) => { e.stopPropagation(); handleMenuItemClick('Partnerships', 'contact'); }}>Partnerships</span>
          </div>
        </div>
      </div>
      <div className="flex gap-5" aria-label="social links">
        <div className="p-3 bg-gray-800 rounded-full border border-gray-700 hover:bg-primary hover:border-primary transition-all duration-300 cursor-pointer" onClick={() => handleSocialClick('instagram')}>
          <img src={instagram_icon} alt="Instagram" className="w-6 h-6 filter invert" loading="lazy" />
        </div>
        <div className="p-3 bg-gray-800 rounded-full border border-gray-700 hover:bg-primary hover:border-primary transition-all duration-300 cursor-pointer" onClick={() => handleSocialClick('pinterest')}>
          <img src={pintester_icon} alt="Pinterest" className="w-6 h-6 filter invert" loading="lazy" />
        </div>
        <div className="p-3 bg-gray-800 rounded-full border border-gray-700 hover:bg-primary hover:border-primary transition-all duration-300 cursor-pointer" onClick={() => handleSocialClick('whatsapp')}>
          <img src={whatsapp_icon} alt="WhatsApp" className="w-6 h-6 filter invert" loading="lazy" />
        </div>
      </div>
      <div className='flex flex-col items-center gap-4 w-full mb-4 text-gray-500 text-sm'>
        <hr className="w-4/5 h-[1px] bg-gray-700 border-none rounded-full" />
        <p>© 2025 SHOPPER. All Rights Reserved.</p>
      </div>

    </div>
  )
}

export default Footer
