import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContextInstance';
import remove_icon from '../Assets/cart_cross_icon.png';

export const CartItems = () => {
    const {all_product,cartItems,addToCart,removeFromCart,isLoggedIn} = useContext(ShopContext);
    const [promoCode, setPromoCode] = useState('');
    const [appliedPromo, setAppliedPromo] = useState(null);
    const [promoError, setPromoError] = useState('');
    const navigate = useNavigate();

    // Sample promo codes
    const validPromoCodes = {
        'SAVE10': { type: 'percentage', value: 10, description: '10% off your order' },
        'WELCOME20': { type: 'percentage', value: 20, description: '20% off for new customers' },
        'FREESHIP': { type: 'fixed', value: 5, description: '$5 off shipping' },
        'FLAT50': { type: 'fixed', value: 50, description: '$50 off orders over $200' }
    };

    // Calculate total items and total price
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        let totalItems = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                totalAmount += itemInfo.new_price * cartItems[item];
                totalItems += cartItems[item];
            }
        }
        return { totalAmount, totalItems };
    };

    const { totalAmount, totalItems } = getTotalCartAmount();

    // Calculate discount
    const calculateDiscount = () => {
        if (!appliedPromo) return 0;

        if (appliedPromo.type === 'percentage') {
            return (totalAmount * appliedPromo.value) / 100;
        } else if (appliedPromo.type === 'fixed') {
            return Math.min(appliedPromo.value, totalAmount);
        }
        return 0;
    };

    const discount = calculateDiscount();
    const finalTotal = totalAmount - discount;

    // Apply promo code
    const applyPromoCode = () => {
        const code = promoCode.toUpperCase().trim();
        if (validPromoCodes[code]) {
            setAppliedPromo(validPromoCodes[code]);
            setPromoError('');
        } else {
            setPromoError('Invalid promo code');
            setAppliedPromo(null);
        }
    };

    // Remove promo code
    const removePromoCode = () => {
        setAppliedPromo(null);
        setPromoCode('');
        setPromoError('');
    };

    // Get cart items that have quantity > 0
    const cartProducts = all_product.filter((product) => cartItems[product.id] > 0);

    return (
        <div className='cartItems'>
            <div className="cartItems-format-main">
                <p>Product</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />

            {cartProducts.length === 0 ? (
                <div className="cart-empty">
                    <h2>Your cart is empty</h2>
                    <p>Add some items to get started!</p>
                </div>
            ) : (
                <>
                    {cartProducts.map((e) => (
                        <div key={e.id}>
                            <div className="cartItems-format">
                                <img src={e.image} className='cartIcon-product-icon' alt={e.name} />
                                <p>{e.name}</p>
                                <p>${e.new_price}</p>
                                <div className="quantity-controls">
                                    <button
                                        className="quantity-btn"
                                        onClick={() => removeFromCart(e.id)}
                                    >
                                        -
                                    </button>
                                    <span className='cardItems-quantity'>{cartItems[e.id]}</span>
                                    <button
                                        className="quantity-btn"
                                        onClick={() => addToCart(e.id)}
                                    >
                                        +
                                    </button>
                                </div>
                                <p>${e.new_price * cartItems[e.id]}</p>
                                <img
                                    src={remove_icon}
                                    onClick={() => {removeFromCart(e.id)}}
                                    alt="Remove"
                                    className="remove-icon"
                                />
                            </div>
                        </div>
                    ))}

                    {/* Promo Code Section */}
                    <div className="promo-code-section">
                        <h3>Promo Code</h3>
                        <div className="promo-input-container">
                            <input
                                type="text"
                                placeholder="Enter promo code"
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value)}
                                className="promo-input"
                                disabled={appliedPromo}
                            />
                            {!appliedPromo ? (
                                <button
                                    className="apply-promo-btn"
                                    onClick={applyPromoCode}
                                    disabled={!promoCode.trim()}
                                >
                                    Apply
                                </button>
                            ) : (
                                <button
                                    className="remove-promo-btn"
                                    onClick={removePromoCode}
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                        {promoError && <p className="promo-error">{promoError}</p>}
                        {appliedPromo && (
                            <div className="applied-promo">
                                <p className="promo-success">✓ {appliedPromo.description}</p>
                            </div>
                        )}
                    </div>

                    <div className="cart-total">
                        <div className="total-info">
                            <div className="total-breakdown">
                                <div className="total-line">
                                    <span>Subtotal:</span>
                                    <span>${totalAmount.toFixed(2)}</span>
                                </div>
                                {appliedPromo && (
                                    <div className="total-line discount-line">
                                        <span>Discount ({appliedPromo.type === 'percentage' ? appliedPromo.value + '%' : '$' + appliedPromo.value}):</span>
                                        <span>-${discount.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="total-line final-total">
                                    <span>Total:</span>
                                    <span>${finalTotal.toFixed(2)}</span>
                                </div>
                            </div>
                            <p>Total Items: {totalItems}</p>
                        </div>
                        <button 
                            className="checkout-btn"
                            onClick={() => {
                                if (!isLoggedIn) {
                                    navigate('/login');
                                } else {
                                    navigate('/checkout');
                                }
                            }}
                        >
                            {isLoggedIn ? 'Proceed to Checkout' : 'Login to Checkout'}
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}
