/**
 * Authentication Routes
 * 
 * This file defines all the routes related to user authentication.
 * It handles registration, login, and profile management.
 */

import express from 'express';
import { 
  register, 
  login, 
  getProfile, 
  updateProfile 
} from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

/**
 * POST /api/auth/register
 * Register a new user
 * 
 * Request body:
 * {
 *   "username": "john_doe",
 *   "email": "john@example.com",
 *   "password": "password123"
 * }
 * 
 * Frontend integration:
 * fetch('/api/auth/register', {
 *   method: 'POST',
 *   headers: {
 *     'Content-Type': 'application/json'
 *   },
 *   body: JSON.stringify({
 *     username: 'john_doe',
 *     email: 'john@example.com',
 *     password: 'password123'
 *   })
 * })
 * .then(response => response.json())
 * .then(data => {
 *   if (data.success) {
 *     console.log('User registered:', data.data.user);
 *     console.log('Token:', data.data.token);
 *     // Store token in localStorage or sessionStorage
 *     localStorage.setItem('token', data.data.token);
 *   } else {
 *     console.error('Registration failed:', data.message);
 *   }
 * });
 */
router.post('/register', register);

/**
 * POST /api/auth/login
 * Login user
 * 
 * Request body:
 * {
 *   "email": "john@example.com",
 *   "password": "password123"
 * }
 * 
 * Frontend integration:
 * fetch('/api/auth/login', {
 *   method: 'POST',
 *   headers: {
 *     'Content-Type': 'application/json'
 *   },
 *   body: JSON.stringify({
 *     email: 'john@example.com',
 *     password: 'password123'
 *   })
 * })
 * .then(response => response.json())
 * .then(data => {
 *   if (data.success) {
 *     console.log('Login successful:', data.data.user);
 *     console.log('Token:', data.data.token);
 *     // Store token in localStorage or sessionStorage
 *     localStorage.setItem('token', data.data.token);
 *   } else {
 *     console.error('Login failed:', data.message);
 *   }
 * });
 */
router.post('/login', login);

/**
 * GET /api/auth/profile
 * Get current user profile
 * Requires authentication
 * 
 * Headers:
 * Authorization: Bearer <token>
 * 
 * Frontend integration:
 * const token = localStorage.getItem('token');
 * fetch('/api/auth/profile', {
 *   headers: {
 *     'Authorization': `Bearer ${token}`
 *   }
 * })
 * .then(response => response.json())
 * .then(data => {
 *   if (data.success) {
 *     console.log('User profile:', data.data);
 *   } else {
 *     console.error('Failed to get profile:', data.message);
 *   }
 * });
 */
router.get('/profile', authenticateToken, getProfile);

/**
 * PUT /api/auth/profile
 * Update user profile
 * Requires authentication
 * 
 * Headers:
 * Authorization: Bearer <token>
 * 
 * Request body:
 * {
 *   "username": "new_username",
 *   "email": "newemail@example.com"
 * }
 * 
 * Frontend integration:
 * const token = localStorage.getItem('token');
 * fetch('/api/auth/profile', {
 *   method: 'PUT',
 *   headers: {
 *     'Content-Type': 'application/json',
 *     'Authorization': `Bearer ${token}`
 *   },
 *   body: JSON.stringify({
 *     username: 'new_username',
 *     email: 'newemail@example.com'
 *   })
 * })
 * .then(response => response.json())
 * .then(data => {
 *   if (data.success) {
 *     console.log('Profile updated:', data.data);
 *   } else {
 *     console.error('Update failed:', data.message);
 *   }
 * });
 */
router.put('/profile', authenticateToken, updateProfile);

export default router;
