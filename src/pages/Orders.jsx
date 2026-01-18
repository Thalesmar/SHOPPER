import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContextInstance';

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
            <div className="max-w-7xl mx-auto px-4 py-12 min-h-[60vh] flex justify-center items-center">
                <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Login Required</h2>
                    <p className="text-gray-600 mb-6">Please log in to view your order history.</p>
                    <button onClick={() => navigate('/login')} className="px-6 py-3 bg-[#ff4141] text-white rounded-md hover:bg-[#e63b3b] transition-colors font-medium">
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-12 min-h-[60vh] flex justify-center items-center">
                <div className="text-xl text-gray-600 font-medium">Loading orders...</div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 min-h-[80vh]">
            <div className="mb-8 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Order History</h1>
                <p className="text-gray-600">Track your past orders and purchases</p>
            </div>

            {orders.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">No orders yet</h2>
                    <p className="text-gray-600 mb-8">Start shopping to see your orders here!</p>
                    <button onClick={() => navigate('/')} className="px-8 py-3 bg-[#ff4141] text-white rounded-md hover:bg-[#e63b3b] transition-colors font-medium">Start Shopping</button>
                </div>
            ) : (
                <div className="flex flex-col gap-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                            <div className="bg-gray-50 p-4 md:p-6 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div className="flex flex-col md:flex-row md:gap-8 gap-2">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Order #</h3>
                                        <p className="font-semibold text-gray-900">{order.id}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Date Placed</h3>
                                        <p className="font-medium text-gray-900">{formatDate(order.orderDate)}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Status</h3>
                                        <div className="font-bold capitalize" style={{ color: getStatusColor(order.status) }}>
                                            {order.status}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Amount</span>
                                    <span className="text-xl font-bold text-gray-900">${order.totalAmount.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="p-4 md:p-6">
                                <h4 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">Items ({order.items.length})</h4>
                                <div className="flex flex-col gap-4">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="flex items-center gap-4 py-2">
                                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md border border-gray-200" />
                                            <div className="flex-1">
                                                <span className="block font-medium text-gray-900">{item.name}</span>
                                                <span className="text-sm text-gray-500">Qty: {item.quantity} × ${item.price.toFixed(2)}</span>
                                            </div>
                                            <div className="font-semibold text-gray-900">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 md:p-6 border-t border-gray-200 grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Shipping Address</h4>
                                    <div className="text-sm text-gray-600 leading-relaxed">
                                        <p className="font-medium text-gray-900">{order.shippingInfo.firstName} {order.shippingInfo.lastName}</p>
                                        <p>{order.shippingInfo.address}</p>
                                        <p>{order.shippingInfo.city}, {order.shippingInfo.state} {order.shippingInfo.zipCode}</p>
                                        <p>{order.shippingInfo.country}</p>
                                    </div>
                                </div>

                                <div className="md:text-right">
                                    <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Payment Summary</h4>
                                    <div className="flex flex-col gap-1 text-sm">
                                        <div className="flex justify-between md:justify-end md:gap-8">
                                            <span className="text-gray-600">Subtotal:</span>
                                            <span className="font-medium text-gray-900">${order.totalAmount.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between md:justify-end md:gap-8">
                                            <span className="text-gray-600">Shipping:</span>
                                            <span className="font-medium text-green-600">Free</span>
                                        </div>
                                        <div className="flex justify-between md:justify-end md:gap-8 mt-2 pt-2 border-t border-gray-200">
                                            <span className="font-bold text-gray-800">Total:</span>
                                            <span className="font-bold text-xl text-[#ff4141]">${order.totalAmount.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
