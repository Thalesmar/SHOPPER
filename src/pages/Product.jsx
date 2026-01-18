import React, { useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContextInstance';
import Breadcrum from '../Component/Breadcrums/Breadcrum';
import { ProductDisplay } from '../Component/ProductDisplay/ProductDisplay';
import { DescriptionBox } from '../Component/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Component/RelatedProducts/RelatedProducts';

export const Product = () => {
    const { all_product } = useContext(ShopContext);
    const { productId } = useParams();
    const product = all_product.find((e) => e.id === Number(productId));

    // Error handling for missing product
    if (!product) {
        return (
            <div className="py-12 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
                <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
                <Link to="/" className="inline-block px-6 py-3 bg-[#ff4141] text-white rounded-md hover:bg-[#e63b3b] transition-colors">
                    Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div>
            <Breadcrum product={product} />
            <ProductDisplay product={product} />
            <DescriptionBox />
            <RelatedProducts />
            <div className="py-8 px-4 text-center">
                <Link to="/" className="inline-block px-6 py-3 bg-[#ff4141] text-white rounded-md mt-4 hover:bg-[#e63b3b] transition-colors">
                    Back to Home
                </Link>
            </div>
        </div>
    )
}
