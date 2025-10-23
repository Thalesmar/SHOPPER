import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContextInstance';
import './CSS/Orders.css';

export const Orders = () => {
    const { user, isLoggedIn } = useContext(ShopContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            setLoading(false);
            return;
        }

        // Load orders from localStorage
        const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        // Filter orders for current user
        const userOrders = savedOrders.filter(order => order.userId === user.id);
        setOrders(userOrders.reverse()); // Show newest first
        setLoading(false);
    }, [isLoggedIn, user]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmed': return '#28a745';
            case 'shipped': return '#007bff';
            case 'delivered': return '#6c757d';
            case 'cancelled': return '#dc3545';
            default: return '#6c757d';
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="orders-container">
                <div className="orders-login-required">
                    <h2>Login Required</h2>
                    <p>Please log in to view your order history.</p>
                    <button onClick={() => navigate('/login')} className="login-btn">
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="orders-container">
                <div className="loading">Loading orders...</div>
            </div>
        );
    }

    return (
        <div className="orders-container">
            <div className="orders-header">
                <h1>Order History</h1>
                <p>Track your past orders and purchases</p>
            </div>

            {orders.length === 0 ? (
                <div className="no-orders">
                    <h2>No orders yet</h2>
                    <p>Start shopping to see your orders here!</p>
                    <button onClick={() => navigate('/')} className="shop-now-btn">Start Shopping</button>
                </div>
            ) : (
                <div className="orders-list">
                    {orders.map((order) => (
                        <div key={order.id} className="order-card">
                            <div className="order-header">
                                <div className="order-info">
                                    <h3>Order #{order.id}</h3>
                                    <p className="order-date">{formatDate(order.orderDate)}</p>
                                    <div className="order-status" style={{ color: getStatusColor(order.status) }}>
                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                    </div>
                                </div>
                                <div className="order-total">
                                    <span className="total-label">Total:</span>
                                    <span className="total-amount">${order.totalAmount.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="order-items">
                                <h4>Items ({order.items.length})</h4>
                                {order.items.map((item, index) => (
                                    <div key={index} className="order-item">
                                        <img src={item.image} alt={item.name} className="item-image" />
                                        <div className="item-info">
                                            <span className="item-name">{item.name}</span>
                                            <span className="item-quantity">Qty: {item.quantity}</span>
                                            <span className="item-price">${item.price.toFixed(2)} each</span>
                                        </div>
                                        <div className="item-total">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="order-shipping">
                                <h4>Shipping Address</h4>
                                <div className="shipping-info">
                                    <p>{order.shippingInfo.firstName} {order.shippingInfo.lastName}</p>
                                    <p>{order.shippingInfo.address}</p>
                                    <p>{order.shippingInfo.city}, {order.shippingInfo.state} {order.shippingInfo.zipCode}</p>
                                    <p>{order.shippingInfo.country}</p>
                                </div>
                            </div>

                            <div className="order-summary">
                                <div className="summary-line">
                                    <span>Subtotal:</span>
                                    <span>${order.totalAmount.toFixed(2)}</span>
                                </div>
                                <div className="summary-line">
                                    <span>Shipping:</span>
                                    <span>Free</span>
                                </div>
                                <div className="summary-line total">
                                    <span>Total:</span>
                                    <span>${order.totalAmount.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
