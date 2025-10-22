import React, { useContext } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContextInstance';
import dropdown_icon from '../Component/Assets/dropdown_icon.png'
import Item from '../Component/Item/Item';

export const ShopCategory = (props) => {
    const {all_product} = useContext(ShopContext);

    // Filter products by category
    const categoryProducts = all_product.filter((item) => item.category === props.category);

  return (
    <div className='shop-category'>
        <img className='shopcategory-banner' src={props.banner} alt="" />
        <div className="shopcategory-indexSort">
            <p>
                <span>Showing 1-{categoryProducts.length}</span> out of {categoryProducts.length} products
            </p>
            <div className="shopcategory-sort">
                Sort by <img src={dropdown_icon} alt="" />
            </div>
        </div>
        <div className="shopcategory-products">
            {categoryProducts.map((item, i) => {
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            })}
        </div>
        <div className="shopcategory-loadmore">
            Explore more
        </div>
    </div>
  )
}
