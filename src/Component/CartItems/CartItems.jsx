import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContextInstance';
import remove_icon from '../Assets/cart_cross_icon.png';

export const CartItems = () => {
    const { all_product, cartItems, addToCart, removeFromCart, isLoggedIn } = useContext(ShopContext);
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
        <div className='my-24 mx-4 md:mx-40'>
            <div className="grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr_1fr] items-center gap-10 py-5 text-[#454545] text-lg font-semibold text-center md:text-left">
                <p>Product</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr className="h-[3px] bg-[#e2e2e2] border-0" />

            {cartProducts.length === 0 ? (
                <div className="text-center py-20">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
                    <p className="text-gray-600 mb-8">Add some items to get started!</p>
                </div>
            ) : (
                <>
                    {cartProducts.map((e) => (
                        <div key={e.id}>
                            <div className="grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr_1fr] items-center gap-10 py-5 text-[#454545] text-base font-medium border-b border-[#e2e2e2] text-center md:text-left">
                                <img src={e.image} className='h-16 object-contain mx-auto md:mx-0' alt={e.name} />
                                <p>{e.name}</p>
                                <p>${e.new_price}</p>
                                <div className="flex items-center justify-center md:justify-start gap-3">
                                    <button
                                        className="w-8 h-8 bg-[#f0f0f0] border border-[#ebebeb] cursor-pointer hover:bg-[#e0e0e0] flex items-center justify-center"
                                        onClick={() => removeFromCart(e.id)}
                                    >
                                        -
                                    </button>
                                    <span className='w-8 h-8 border border-[#ebebeb] bg-white flex items-center justify-center'>{cartItems[e.id]}</span>
                                    <button
                                        className="w-8 h-8 bg-[#f0f0f0] border border-[#ebebeb] cursor-pointer hover:bg-[#e0e0e0] flex items-center justify-center"
                                        onClick={() => addToCart(e.id)}
                                    >
                                        +
                                    </button>
                                </div>
                                <p>${e.new_price * cartItems[e.id]}</p>
                                <img
                                    src={remove_icon}
                                    onClick={() => { removeFromCart(e.id) }}
                                    alt="Remove"
                                    className="w-4 cursor-pointer mx-auto md:mx-0 hover:opacity-70"
                                />
                            </div>
                        </div>
                    ))}

                    {/* Promo Code Section */}
                    <div className="flex flex-col md:flex-row my-24 gap-20">
                        <div className="flex-1">
                            <h3 className="text-[#555] text-xl font-semibold mb-5">Promo Code</h3>
                            <div className="flex h-14 bg-[#eaeaea] pl-5">
                                <input
                                    type="text"
                                    placeholder="Enter promo code"
                                    value={promoCode}
                                    onChange={(e) => setPromoCode(e.target.value)}
                                    className="border-none outline-none bg-transparent text-base w-full h-full"
                                    disabled={appliedPromo}
                                />
                                {!appliedPromo ? (
                                    <button
                                        className="w-40 h-full text-base bg-black text-white cursor-pointer disabled:bg-gray-400"
                                        onClick={applyPromoCode}
                                        disabled={!promoCode.trim()}
                                    >
                                        Apply
                                    </button>
                                ) : (
                                    <button
                                        className="w-40 h-full text-base bg-red-500 text-white cursor-pointer"
                                        onClick={removePromoCode}
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                            {promoError && <p className="text-red-500 mt-2 text-sm">{promoError}</p>}
                            {appliedPromo && (
                                <div className="mt-2 text-green-600 text-sm font-medium">
                                    <p>✓ {appliedPromo.description}</p>
                                </div>
                            )}
                        </div>

                        <div className="flex-1 flex flex-col gap-10">
                            <h1 className="text-2xl font-bold">Cart Totals</h1>
                            <div>
                                <div className="flex justify-between py-4 border-b border-[#e2e2e2]">
                                    <span>Subtotal:</span>
                                    <span>${totalAmount.toFixed(2)}</span>
                                </div>
                                {appliedPromo && (
                                    <div className="flex justify-between py-4 border-b border-[#e2e2e2] text-green-600">
                                        <span>Discount ({appliedPromo.type === 'percentage' ? appliedPromo.value + '%' : '$' + appliedPromo.value}):</span>
                                        <span>-${discount.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between py-4 text-xl font-bold">
                                    <span>Total:</span>
                                    <span>${finalTotal.toFixed(2)}</span>
                                </div>
                            </div>
                            <p className="text-sm text-gray-500">Total Items: {totalItems}</p>
                            <button
                                className="w-full md:w-64 h-14 bg-[#ff4141] text-white text-base font-semibold cursor-pointer hover:bg-[#e63b3b] transition-colors outline-none border-none"
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
                    </div>
                </>
            )}
        </div>
    )
}
