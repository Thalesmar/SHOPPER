import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContextInstance';
import { Notification } from '../Component/Notification/Notification';
import './CSS/Checkout.css';

export const Checkout = () => {
  const { user, isLoggedIn, cartItems, all_product, clearCart, getTotalCartAmount } = useContext(ShopContext);
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: 'info' });
  
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const [errors, setErrors] = useState({});

  const { totalAmount, totalItems } = getTotalCartAmount();

  // Get cart items that have quantity > 0
  const cartProducts = all_product.filter((product) => cartItems[product.id] > 0);

  const handleInputChange = (e, section) => {
    const { name, value } = e.target;
    if (section === 'shipping') {
      setShippingInfo(prev => ({ ...prev, [name]: value }));
    } else if (section === 'payment') {
      setPaymentInfo(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate shipping info
    if (!shippingInfo.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!shippingInfo.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!shippingInfo.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(shippingInfo.email)) newErrors.email = 'Email is invalid';
    if (!shippingInfo.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!shippingInfo.address.trim()) newErrors.address = 'Address is required';
    if (!shippingInfo.city.trim()) newErrors.city = 'City is required';
    if (!shippingInfo.state.trim()) newErrors.state = 'State is required';
    if (!shippingInfo.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';

    // Validate payment info
    if (!paymentInfo.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
    else if (paymentInfo.cardNumber.replace(/\s/g, '').length < 16) newErrors.cardNumber = 'Card number must be 16 digits';
    if (!paymentInfo.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
    if (!paymentInfo.cvv.trim()) newErrors.cvv = 'CVV is required';
    else if (paymentInfo.cvv.length < 3) newErrors.cvv = 'CVV must be at least 3 digits';
    if (!paymentInfo.cardName.trim()) newErrors.cardName = 'Cardholder name is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      setNotification({ message: 'Please log in to proceed with checkout', type: 'error' });
      return;
    }

    if (cartProducts.length === 0) {
      setNotification({ message: 'Your cart is empty', type: 'error' });
      return;
    }

    if (!validateForm()) {
      setNotification({ message: 'Please fill in all required fields', type: 'error' });
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create order
      const order = {
        id: Date.now(),
        userId: user.id,
        items: cartProducts.map(product => ({
          productId: product.id,
          name: product.name,
          price: product.new_price,
          quantity: cartItems[product.id],
          image: product.image
        })),
        shippingInfo,
        paymentInfo: {
          ...paymentInfo,
          cardNumber: '**** **** **** ' + paymentInfo.cardNumber.slice(-4)
        },
        totalAmount,
        totalItems,
        status: 'confirmed',
        orderDate: new Date().toISOString()
      };

      // Save order to localStorage
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push(order);
      localStorage.setItem('orders', JSON.stringify(orders));

      // Clear cart
      clearCart();

      setNotification({ message: 'Order placed successfully!', type: 'success' });
      setTimeout(() => navigate('/orders'), 2000);

    } catch (error) {
      setNotification({ message: 'Payment processing failed. Please try again.', type: 'error' });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="checkout-login-required">
        <h2>Login Required</h2>
        <p>Please log in to proceed with checkout.</p>
        <button onClick={() => navigate('/login')} className="login-btn">
          Go to Login
        </button>
      </div>
    );
  }

  if (cartProducts.length === 0) {
    return (
      <div className="checkout-empty-cart">
        <h2>Your cart is empty</h2>
        <p>Add some items to your cart before checkout.</p>
        <button onClick={() => navigate('/')} className="continue-shopping-btn">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="checkout">
      <div className="checkout-container">
        <h1>Checkout</h1>
        
        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="checkout-sections">
            {/* Shipping Information */}
            <div className="checkout-section">
              <h2>Shipping Information</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={shippingInfo.firstName}
                    onChange={(e) => handleInputChange(e, 'shipping')}
                    className={errors.firstName ? 'error' : ''}
                    required
                  />
                  {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                </div>
                <div className="form-group">
                  <label>Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={shippingInfo.lastName}
                    onChange={(e) => handleInputChange(e, 'shipping')}
                    className={errors.lastName ? 'error' : ''}
                    required
                  />
                  {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={shippingInfo.email}
                    onChange={(e) => handleInputChange(e, 'shipping')}
                    className={errors.email ? 'error' : ''}
                    required
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                <div className="form-group">
                  <label>Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={shippingInfo.phone}
                    onChange={(e) => handleInputChange(e, 'shipping')}
                    className={errors.phone ? 'error' : ''}
                    required
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>
              </div>

              <div className="form-group">
                <label>Address *</label>
                <input
                  type="text"
                  name="address"
                  value={shippingInfo.address}
                  onChange={(e) => handleInputChange(e, 'shipping')}
                  className={errors.address ? 'error' : ''}
                  required
                />
                {errors.address && <span className="error-message">{errors.address}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City *</label>
                  <input
                    type="text"
                    name="city"
                    value={shippingInfo.city}
                    onChange={(e) => handleInputChange(e, 'shipping')}
                    className={errors.city ? 'error' : ''}
                    required
                  />
                  {errors.city && <span className="error-message">{errors.city}</span>}
                </div>
                <div className="form-group">
                  <label>State *</label>
                  <input
                    type="text"
                    name="state"
                    value={shippingInfo.state}
                    onChange={(e) => handleInputChange(e, 'shipping')}
                    className={errors.state ? 'error' : ''}
                    required
                  />
                  {errors.state && <span className="error-message">{errors.state}</span>}
                </div>
                <div className="form-group">
                  <label>ZIP Code *</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={shippingInfo.zipCode}
                    onChange={(e) => handleInputChange(e, 'shipping')}
                    className={errors.zipCode ? 'error' : ''}
                    required
                  />
                  {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="checkout-section">
              <h2>Payment Information</h2>
              <div className="form-group">
                <label>Cardholder Name *</label>
                <input
                  type="text"
                  name="cardName"
                  value={paymentInfo.cardName}
                  onChange={(e) => handleInputChange(e, 'payment')}
                  className={errors.cardName ? 'error' : ''}
                  required
                />
                {errors.cardName && <span className="error-message">{errors.cardName}</span>}
              </div>

              <div className="form-group">
                <label>Card Number *</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={paymentInfo.cardNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 16);
                    setPaymentInfo(prev => ({ ...prev, cardNumber: value }));
                  }}
                  className={errors.cardNumber ? 'error' : ''}
                  placeholder="1234 5678 9012 3456"
                  required
                />
                {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Expiry Date *</label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={paymentInfo.expiryDate}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                      const formatted = value.length >= 2 ? `${value.slice(0, 2)}/${value.slice(2)}` : value;
                      setPaymentInfo(prev => ({ ...prev, expiryDate: formatted }));
                    }}
                    className={errors.expiryDate ? 'error' : ''}
                    placeholder="MM/YY"
                    required
                  />
                  {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
                </div>
                <div className="form-group">
                  <label>CVV *</label>
                  <input
                    type="text"
                    name="cvv"
                    value={paymentInfo.cvv}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                      setPaymentInfo(prev => ({ ...prev, cvv: value }));
                    }}
                    className={errors.cvv ? 'error' : ''}
                    placeholder="123"
                    required
                  />
                  {errors.cvv && <span className="error-message">{errors.cvv}</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="order-items">
              {cartProducts.map(product => (
                <div key={product.id} className="order-item">
                  <img src={product.image} alt={product.name} />
                  <div className="item-details">
                    <h4>{product.name}</h4>
                    <p>Quantity: {cartItems[product.id]}</p>
                    <p>Price: ${product.new_price}</p>
                  </div>
                  <div className="item-total">
                    ${(product.new_price * cartItems[product.id]).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="order-total">
              <div className="total-line">
                <span>Subtotal:</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <div className="total-line">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="total-line final-total">
                <span>Total:</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <button 
              type="submit" 
              className="place-order-btn"
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : `Place Order - $${totalAmount.toFixed(2)}`}
            </button>
          </div>
        </form>
      </div>

      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: 'info' })}
      />
    </div>
  );
};
