import React from 'react'
import all_product from '../Component/Assets/all_product';
import { ShopContext } from './ShopContextInstance';

const ShopContextProvider = (props) => {

    const contextValue = {all_product};

    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
