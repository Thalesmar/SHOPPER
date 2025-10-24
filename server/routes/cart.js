/**
 * Cart Routes
 * 
 * This file defines all the routes related to shopping cart operations.
 * All routes require authentication.
 */

import express from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} from '../controllers/cartController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// All cart routes require authentication
router.use(authenticateToken);

/**
 * GET /api/cart
 * Get user's current cart
 * Requires authentication
 * 
 * Headers:
 * Authorization: Bearer <token>
 * 
 * Frontend integration:
 * const token = localStorage.getItem('token');
 * fetch('/api/cart', {
 *   headers: {
 *     'Authorization': `Bearer ${token}`
 *   }
 * })
 * .then(response => response.json())
 * .then(data => {
 *   if (data.success) {
 *     console.log('Cart items:', data.data.items);
 *     console.log('Total items:', data.data.totalItems);
 *   }
 * });
 */
router.get('/', getCart);

/**
 * POST /api/cart
 * Add item to cart
 * Requires authentication
 * 
 * Headers:
 * Authorization: Bearer <token>
 * 
 * Request body:
 * {
 *   "productId": 1,
 *   "quantity": 2
 * }
 * 
 * Frontend integration:
 * const token = localStorage.getItem('token');
 * fetch('/api/cart', {
 *   method: 'POST',
 *   headers: {
 *     'Content-Type': 'application/json',
 *     'Authorization': `Bearer ${token}`
 *   },
 *   body: JSON.stringify({
 *     productId: 1,
 *     quantity: 2
 *   })
 * })
 * .then(response => response.json())
 * .then(data => {
 *   if (data.success) {
 *     console.log('Item added to cart:', data.data);
 *   } else {
 *     console.error('Failed to add item:', data.message);
 *   }
 * });
 */
router.post('/', addToCart);

/**
 * PUT /api/cart/:productId
 * Update cart item quantity
 * Requires authentication
 * 
 * Headers:
 * Authorization: Bearer <token>
 * 
 * URL parameters:
 * - productId: Product ID to update
 * 
 * Request body:
 * {
 *   "quantity": 3
 * }
 * 
 * Frontend integration:
 * const token = localStorage.getItem('token');
 * fetch('/api/cart/1', {
 *   method: 'PUT',
 *   headers: {
 *     'Content-Type': 'application/json',
 *     'Authorization': `Bearer ${token}`
 *   },
 *   body: JSON.stringify({
 *     quantity: 3
 *   })
 * })
 * .then(response => response.json())
 * .then(data => {
 *   if (data.success) {
 *     console.log('Cart updated:', data.data);
 *   }
 * });
 */
router.put('/:productId', updateCartItem);

/**
 * DELETE /api/cart/:productId
 * Remove item from cart
 * Requires authentication
 * 
 * Headers:
 * Authorization: Bearer <token>
 * 
 * URL parameters:
 * - productId: Product ID to remove
 * 
 * Frontend integration:
 * const token = localStorage.getItem('token');
 * fetch('/api/cart/1', {
 *   method: 'DELETE',
 *   headers: {
 *     'Authorization': `Bearer ${token}`
 *   }
 * })
 * .then(response => response.json())
 * .then(data => {
 *   if (data.success) {
 *     console.log('Item removed from cart');
 *   }
 * });
 */
router.delete('/:productId', removeFromCart);

/**
 * DELETE /api/cart
 * Clear entire cart
 * Requires authentication
 * 
 * Headers:
 * Authorization: Bearer <token>
 * 
 * Frontend integration:
 * const token = localStorage.getItem('token');
 * fetch('/api/cart', {
 *   method: 'DELETE',
 *   headers: {
 *     'Authorization': `Bearer ${token}`
 *   }
 * })
 * .then(response => response.json())
 * .then(data => {
 *   if (data.success) {
 *     console.log('Cart cleared');
 *   }
 * });
 */
router.delete('/', clearCart);

export default router;
