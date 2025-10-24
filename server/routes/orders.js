/**
 * Order Routes
 * 
 * This file defines all the routes related to order management.
 * All routes require authentication.
 */

import express from 'express';
import {
  getUserOrdersList,
  getOrderById,
  createOrder,
  updateOrderStatus
} from '../controllers/orderController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// All order routes require authentication
router.use(authenticateToken);

/**
 * GET /api/orders
 * Get user's orders
 * Requires authentication
 * 
 * Headers:
 * Authorization: Bearer <token>
 * 
 * Frontend integration:
 * const token = localStorage.getItem('token');
 * fetch('/api/orders', {
 *   headers: {
 *     'Authorization': `Bearer ${token}`
 *   }
 * })
 * .then(response => response.json())
 * .then(data => {
 *   if (data.success) {
 *     console.log('User orders:', data.data);
 *   }
 * });
 */
router.get('/', getUserOrdersList);

/**
 * GET /api/orders/:id
 * Get single order by ID
 * Requires authentication
 * 
 * Headers:
 * Authorization: Bearer <token>
 * 
 * URL parameters:
 * - id: Order ID
 * 
 * Frontend integration:
 * const token = localStorage.getItem('token');
 * fetch('/api/orders/1', {
 *   headers: {
 *     'Authorization': `Bearer ${token}`
 *   }
 * })
 * .then(response => response.json())
 * .then(data => {
 *   if (data.success) {
 *     console.log('Order details:', data.data);
 *   }
 * });
 */
router.get('/:id', getOrderById);

/**
 * POST /api/orders
 * Create new order from cart
 * Requires authentication
 * 
 * Headers:
 * Authorization: Bearer <token>
 * 
 * Request body:
 * {
 *   "shippingAddress": {
 *     "street": "123 Main St",
 *     "city": "New York",
 *     "state": "NY",
 *     "zipCode": "10001",
 *     "country": "USA"
 *   },
 *   "paymentMethod": "credit_card"
 * }
 * 
 * Frontend integration:
 * const token = localStorage.getItem('token');
 * fetch('/api/orders', {
 *   method: 'POST',
 *   headers: {
 *     'Content-Type': 'application/json',
 *     'Authorization': `Bearer ${token}`
 *   },
 *   body: JSON.stringify({
 *     shippingAddress: {
 *       street: '123 Main St',
 *       city: 'New York',
 *       state: 'NY',
 *       zipCode: '10001',
 *       country: 'USA'
 *     },
 *     paymentMethod: 'credit_card'
 *   })
 * })
 * .then(response => response.json())
 * .then(data => {
 *   if (data.success) {
 *     console.log('Order created:', data.data);
 *     // Redirect to order confirmation page
 *   } else {
 *     console.error('Order creation failed:', data.message);
 *   }
 * });
 */
router.post('/', createOrder);

/**
 * PUT /api/orders/:id/status
 * Update order status
 * Requires authentication
 * 
 * Headers:
 * Authorization: Bearer <token>
 * 
 * URL parameters:
 * - id: Order ID
 * 
 * Request body:
 * {
 *   "orderStatus": "shipped",
 *   "paymentStatus": "paid"
 * }
 * 
 * Frontend integration:
 * const token = localStorage.getItem('token');
 * fetch('/api/orders/1/status', {
 *   method: 'PUT',
 *   headers: {
 *     'Content-Type': 'application/json',
 *     'Authorization': `Bearer ${token}`
 *   },
 *   body: JSON.stringify({
 *     orderStatus: 'shipped',
 *     paymentStatus: 'paid'
 *   })
 * })
 * .then(response => response.json())
 * .then(data => {
 *   if (data.success) {
 *     console.log('Order status updated:', data.data);
 *   }
 * });
 */
router.put('/:id/status', updateOrderStatus);

export default router;
