import React, { useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContextInstance';
import Breadcrum from '../Component/Breadcrums/Breadcrum';
import { ProductDisplay } from '../Component/ProductDisplay/ProductDisplay';
import { DescriptionBox } from '../Component/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Component/RelatedProducts/RelatedProducts';

export const Product = () => {
    const {all_product} = useContext(ShopContext);
    const {productId} = useParams();
    const product = all_product.find((e)=> e.id === Number(productId));

    // Error handling for missing product
    if (!product) {
        return (
            <div style={{ padding: '50px', textAlign: 'center' }}>
                <h2>Product Not Found</h2>
                <p>The product you're looking for doesn't exist.</p>
                <Link to="/" style={{
                    display: 'inline-block',
                    padding: '10px 20px',
                    backgroundColor: '#ff4141',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '5px',
                    marginTop: '20px'
                }}>
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
        <div style={{ padding: '30px 20px', textAlign: 'center' }}>
            <Link to="/" style={{
                display: 'inline-block',
                padding: '10px 20px',
                backgroundColor: '#ff4141',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '5px',
                marginTop: '10px'
            }}>
                Back to Home
            </Link>
        </div>
    </div>
  )
}
