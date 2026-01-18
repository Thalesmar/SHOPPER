import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import hand_icon from '../Assets/hand_icon.png';
import arrow_icon from '../Assets/arrow.png';
import hero_image from '../Assets/hero_image.png';

export const Hero = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(leftRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )
      .fromTo(rightRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.8"
      );
  }, []);

  const handleLatestCollectionClick = () => {
    const newCollectionsSection = document.querySelector('.new-collections');
    if (newCollectionsSection) {
      newCollectionsSection.scrollIntoView({ behavior: 'smooth' });
    } else {
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
    <div ref={heroRef} className='h-screen flex flex-col md:flex-row bg-gradient-to-b from-[#fde1ff] to-white pt-20 overflow-hidden'>
      <div ref={leftRef} className='flex-1 flex flex-col justify-center gap-5 pl-10 md:pl-32 leading-tight z-10'>
        <h2 className="text-[#090909] text-2xl font-semibold uppercase">New Arrivals Only</h2>
        <div>
          <div className="flex items-center gap-5">
            <p className="text-[#171717] text-6xl md:text-8xl font-bold">new</p>
            <img src={hand_icon} alt="" className="w-16 md:w-24" loading="lazy" />
          </div>
          <p className="text-[#171717] text-6xl md:text-8xl font-bold">collections</p>
          <p className="text-[#171717] text-6xl md:text-8xl font-bold">for everyone</p>
        </div>
        <div
          className="flex justify-center items-center gap-4 w-64 h-16 rounded-full mt-8 bg-primary text-white text-xl font-medium cursor-pointer hover:scale-105 transition-transform duration-300 shadow-lg"
          onClick={handleLatestCollectionClick}
        >
          <div>Latest Collection</div>
          <img src={arrow_icon} alt="" loading="lazy" />
        </div>
      </div>
      <div ref={rightRef} className='flex-1 flex items-center justify-center relative'>
        <img src={hero_image} alt="" className="w-[80%] max-w-lg md:max-w-xl object-contain transform hover:scale-105 transition-transform duration-500" loading="eager" />
      </div>
    </div>
  )
}
