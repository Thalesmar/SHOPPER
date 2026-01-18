/**
 * Product Routes
 * 
 * This file defines all the routes related to products.
 * It handles product listing, searching, filtering, and individual product details.
 */

import express from 'express';
import {
  getAllProducts,
  getProductById,
  getProductsByCategoryRoute,
  searchProducts,
  getCategories
} from '../controllers/productController.js';

const router = express.Router();

/**
 * GET /api/products
 * Get all products with optional filtering and pagination
 * 
 * Query parameters:
 * - category: Filter by category (women, men, kid)
 * - page: Page number (default: 1)
 * - limit: Items per page (default: 36)
 * - search: Search term for product name
 * 
 * Example: GET /api/products?category=women&page=1&limit=12&search=blouse
 * 
 * Frontend integration:
 * fetch('/api/products?category=women&page=1&limit=12')
 *   .then(response => response.json())
 *   .then(data => {
 *     if (data.success) {
 *       console.log('Products:', data.data.products);
 *       console.log('Pagination:', data.data.pagination);
 *     }
 *   });
 */
import { query, validationResult } from 'express-validator';

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

/**
 * GET /api/products
 * Get all products with optional filtering and pagination
 */
router.get('/', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  validate
], getAllProducts);

/**
 * GET /api/products/categories
 * Get all available product categories
 */
router.get('/categories', getCategories);

/**
 * GET /api/products/search
 * Search products by name or description
 */
router.get('/search', [
  query('q').trim().notEmpty().withMessage('Search query is required'),
  validate
], searchProducts);

/**
 * GET /api/products/category/:category
 * Get products by specific category
 */
router.get('/category/:category', getProductsByCategoryRoute);

/**
 * GET /api/products/:id
 * Get a single product by ID
 */
router.get('/:id', getProductById);

export default router;
