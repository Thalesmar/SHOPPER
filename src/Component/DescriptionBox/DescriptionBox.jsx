import React from 'react'

export const DescriptionBox = () => {
  return (
    <div className='mx-4 md:mx-40 my-10 md:my-28'>
      <div className="flex">
        <div className="flex items-center justify-center text-sm md:text-base font-semibold w-32 md:w-44 h-14 md:h-16 border border-[#d0d0d0] cursor-pointer">Description</div>
        <div className="flex items-center justify-center text-sm md:text-base font-semibold w-32 md:w-44 h-14 md:h-16 border border-[#d0d0d0] bg-[#fbfbfb] text-[#555] cursor-pointer">Reviews (122)</div>
      </div>
      <div className="flex flex-col gap-6 border border-[#d0d0d0] p-6 md:p-12 pb-16">
        <p className="text-[#555] text-sm md:text-base font-normal leading-relaxed">An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer</p>

        <p className="text-[#555] text-sm md:text-base font-normal leading-relaxed">E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>

      </div>
    </div>
  )
}
