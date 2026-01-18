import React from 'react'
import data_product from '../Assets/data';
import Item from '../Item/Item';

const RelatedProducts = () => {
  return (
    <div className='flex flex-col items-center gap-2.5 min-h-[90vh] md:min-h-[60vh] py-16 bg-white'>
      <h1 className="text-[#171717] text-3xl md:text-5xl font-semibold uppercase text-center">Related Products</h1>
      <hr className="w-32 md:w-48 h-1.5 rounded-full bg-[#252525] mb-12" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-4 px-4 md:px-0">
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

export default RelatedProducts
