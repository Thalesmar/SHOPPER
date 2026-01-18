import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import exclusive_image from '../Assets/exclusive_image.png';

gsap.registerPlugin(ScrollTrigger);

export const Offers = () => {
  const navigate = useNavigate();
  const offersRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: offersRef.current,
        start: "top 70%",
      }
    });

    tl.fromTo(leftRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power2.out" }
    )
      .fromTo(rightRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power2.out" },
        "-=0.8"
      );
  }, []);

  const handleCheckNowClick = () => {
    navigate('/');
    setTimeout(() => {
      const popularSection = document.querySelector('.popular');
      if (popularSection) {
        popularSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div ref={offersRef} className='w-[90%] md:w-[85%] min-h-[60vh] flex flex-col md:flex-row m-auto px-6 md:px-32 mb-32 bg-gradient-to-b from-[#fde1ff] to-[#e3f2fd] rounded-3xl overflow-hidden shadow-xl'>
      <div ref={leftRef} className='flex-1 flex flex-col justify-center gap-5 py-10 md:py-0'>
        <h1 className="text-[#171717] text-4xl md:text-6xl font-semibold">EXCLUSIVE</h1>
        <h1 className="text-[#171717] text-4xl md:text-6xl font-semibold">OFFERS FOR YOU</h1>
        <p className="text-[#171717] text-lg md:text-xl font-semibold uppercase tracking-wide">ONLY ON BEST SELLER PRODUCTS</p>
        <button
          onClick={handleCheckNowClick}
          className="w-48 h-14 rounded-full bg-primary text-white text-lg font-medium mt-6 cursor-pointer hover:scale-105 transition-transform duration-300 shadow-lg"
        >
          Check Now
        </button>
      </div>
      <div ref={rightRef} className='flex-1 flex items-center justify-center md:justify-end pt-8 md:pt-12'>
        <img src={exclusive_image} alt="" className="w-[80%] md:w-full max-w-md object-contain" loading="lazy" />
      </div>
    </div>
  )
}
