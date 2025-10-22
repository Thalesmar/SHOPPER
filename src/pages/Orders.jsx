import React, { useState, useEffect } from 'react';
import './CSS/Orders.css';

export const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load orders from localStorage
        const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        setOrders(savedOrders.reverse()); // Show newest first
        setLoading(false);
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

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
                    <a href="/" className="shop-now-btn">Start Shopping</a>
                </div>
            ) : (
                <div className="orders-list">
                    {orders.map((order) => (
                        <div key={order.orderId} className="order-card">
                            <div className="order-header">
                                <div className="order-info">
                                    <h3>Order #{order.orderId}</h3>
                                    <p className="order-date">{formatDate(order.timestamp)}</p>
                                </div>
                                <div className="order-total">
                                    <span className="total-label">Total:</span>
                                    <span className="total-amount">${order.total.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="order-items">
                                <h4>Items ({order.items.length})</h4>
                                {order.items.map((item, index) => (
                                    <div key={index} className="order-item">
                                        <div className="item-info">
                                            <span className="item-name">{item.name}</span>
                                            <span className="item-quantity">Qty: {item.quantity}</span>
                                        </div>
                                        <div className="item-price">
                                            ${item.total.toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="order-summary">
                                <div className="summary-line">
                                    <span>Subtotal:</span>
                                    <span>${order.subtotal.toFixed(2)}</span>
                                </div>
                                {order.discount > 0 && (
                                    <div className="summary-line discount">
                                        <span>Discount:</span>
                                        <span>-${order.discount.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="summary-line total">
                                    <span>Total:</span>
                                    <span>${order.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
