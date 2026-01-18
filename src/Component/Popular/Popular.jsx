import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import data_product from '../Assets/data.js';
import Item from '../Item/Item';

gsap.registerPlugin(ScrollTrigger);

const Popular = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const itemsRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      }
    });

    tl.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 }
    )
      .fromTo(itemsRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
        "-=0.4"
      );
  }, []);

  return (
    <div ref={sectionRef} className='flex flex-col items-center gap-4 min-h-[90vh] py-16 bg-white'>
      <h1 ref={titleRef} className="text-[#171717] text-4xl md:text-5xl font-semibold uppercase text-center">Popular in Women</h1>
      <hr className="w-48 h-1.5 rounded-full bg-[#252525] mb-12" />
      <div ref={itemsRef} className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-4 px-4 md:px-0'>
        {data_product.map((item, i) => {
          return <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        })}
      </div>
    </div>
  )
}

export default Popular
