import React from 'react'

export const NewsLetter = () => {
  return (
    <div className='w-[90%] md:w-[85%] min-h-[40vh] flex flex-col items-center justify-center m-auto px-4 md:px-36 mb-36 bg-gradient-to-b from-[#fde1ff] to-[#e3f2fd] gap-8 rounded-3xl shadow-lg py-12'>
      <h1 className="text-[#454545] text-3xl md:text-5xl font-semibold text-center">Get Exclusive Offers On Your Email</h1>
      <p className="text-[#454545] text-base md:text-xl text-center">Subscribe to our newsletter and stay updated</p>
      <div className="flex items-center justify-between bg-white w-full max-w-2xl h-16 rounded-full border border-[#e3e3e3] pl-6 pr-1 shadow-sm focus-within:ring-2 focus-within:ring-primary/20 transition-all">
        <input
          type="email"
          placeholder='Your email id'
          className="w-full bg-transparent border-none outline-none text-[#616161] font-sans text-base"
        />
        <button className="w-32 md:w-52 h-14 rounded-full bg-black text-white text-base cursor-pointer hover:bg-gray-800 active:scale-95 transition-all duration-300">Subscribe</button>
      </div>
    </div>
  )
}
