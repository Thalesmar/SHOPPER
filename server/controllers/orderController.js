/**
 * Order Controller
 * 
 * This controller handles order creation and management.
 * It processes cart items into orders and manages order status.
 */

import { 
  getUserCart, 
  getUserOrders, 
  getNextOrderId, 
  findProductById,
  orders 
} from '../data/mockData.js';
import { Order, OrderItem } from '../models/Order.js';

/**
 * Get user's orders
 * GET /api/orders
 * Requires authentication
 */
export const getUserOrdersList = (req, res) => {
  try {
    const userId = req.user.id;
    const userOrders = getUserOrders(userId);
    
    // Sort orders by creation date (newest first)
    const sortedOrders = userOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    res.json({
      success: true,
      data: sortedOrders.map(order => order.toJSON())
    });
  } catch (error) {
    console.error('Error getting user orders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve orders'
    });
  }
};

/**
 * Get single order by ID
 * GET /api/orders/:id
 * Requires authentication
 */
export const getOrderById = (req, res) => {
  try {
    const orderId = parseInt(req.params.id);
    const userId = req.user.id;
    
    // Validate order ID
    if (isNaN(orderId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order ID'
      });
    }
    
    // Find order
    const order = orders.find(o => o.id === orderId && o.userId === userId);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    res.json({
      success: true,
      data: order.toJSON()
    });
  } catch (error) {
    console.error('Error getting order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve order'
    });
  }
};

/**
 * Create new order from cart
 * POST /api/orders
 * Requires authentication
 */
export const createOrder = (req, res) => {
  try {
    const userId = req.user.id;
    const { shippingAddress, paymentMethod = 'credit_card' } = req.body;
    
    // Get user's cart
    const cart = getUserCart(userId);
    
    // Check if cart is empty
    if (cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty. Add items to cart before placing an order.'
      });
    }
    
    // Validate shipping address
    if (!shippingAddress || !shippingAddress.street || !shippingAddress.city || !shippingAddress.zipCode) {
      return res.status(400).json({
        success: false,
        message: 'Shipping address is required (street, city, zipCode)'
      });
    }
    
    // Create order items from cart items
    const orderItems = [];
    let totalAmount = 0;
    
    for (const cartItem of cart.items) {
      const product = findProductById(cartItem.productId);
      
      if (!product) {
        return res.status(400).json({
          success: false,
          message: `Product with ID ${cartItem.productId} not found`
        });
      }
      
      const orderItem = new OrderItem(
        product.id,
        product.name,
        product.image,
        product.new_price,
        cartItem.quantity
      );
      
      orderItems.push(orderItem);
      totalAmount += orderItem.getSubtotal();
    }
    
    // Create new order
    const newOrder = new Order(
      getNextOrderId(),
      userId,
      orderItems,
      totalAmount,
      'pending', // Payment status
      shippingAddress
    );
    
    // Add order to mock data (in real app, save to database)
    orders.push(newOrder);
    
    // Clear the cart after successful order creation
    cart.clear();
    
    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: newOrder.toJSON()
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order'
    });
  }
};

/**
 * Update order status (for admin use in future)
 * PUT /api/orders/:id/status
 * Requires authentication
 */
export const updateOrderStatus = (req, res) => {
  try {
    const orderId = parseInt(req.params.id);
    const userId = req.user.id;
    const { orderStatus, paymentStatus } = req.body;
    
    // Validate order ID
    if (isNaN(orderId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order ID'
      });
    }
    
    // Find order
    const order = orders.find(o => o.id === orderId && o.userId === userId);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    // Update statuses if provided
    if (orderStatus) {
      const validOrderStatuses = ['processing', 'shipped', 'delivered', 'cancelled'];
      if (!validOrderStatuses.includes(orderStatus)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid order status. Must be one of: processing, shipped, delivered, cancelled'
        });
      }
      order.updateOrderStatus(orderStatus);
    }
    
    if (paymentStatus) {
      const validPaymentStatuses = ['pending', 'paid', 'failed', 'refunded'];
      if (!validPaymentStatuses.includes(paymentStatus)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid payment status. Must be one of: pending, paid, failed, refunded'
        });
      }
      order.updatePaymentStatus(paymentStatus);
    }
    
    res.json({
      success: true,
      message: 'Order status updated successfully',
      data: order.toJSON()
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update order status'
    });
  }
};
