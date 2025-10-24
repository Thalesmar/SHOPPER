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
router.get('/', getAllProducts);

/**
 * GET /api/products/categories
 * Get all available product categories
 * 
 * Frontend integration:
 * fetch('/api/products/categories')
 *   .then(response => response.json())
 *   .then(data => {
 *     if (data.success) {
 *       console.log('Categories:', data.data);
 *     }
 *   });
 */
router.get('/categories', getCategories);

/**
 * GET /api/products/search
 * Search products by name or description
 * 
 * Query parameters:
 * - q: Search term (required)
 * - page: Page number (default: 1)
 * - limit: Items per page (default: 36)
 * 
 * Example: GET /api/products/search?q=blouse&page=1&limit=10
 * 
 * Frontend integration:
 * fetch('/api/products/search?q=blouse')
 *   .then(response => response.json())
 *   .then(data => {
 *     if (data.success) {
 *       console.log('Search results:', data.data.products);
 *     }
 *   });
 */
router.get('/search', searchProducts);

/**
 * GET /api/products/category/:category
 * Get products by specific category
 * 
 * URL parameters:
 * - category: Category name (women, men, kid)
 * 
 * Query parameters:
 * - page: Page number (default: 1)
 * - limit: Items per page (default: 36)
 * 
 * Example: GET /api/products/category/women?page=1&limit=12
 * 
 * Frontend integration:
 * fetch('/api/products/category/women')
 *   .then(response => response.json())
 *   .then(data => {
 *     if (data.success) {
 *       console.log('Women products:', data.data.products);
 *     }
 *   });
 */
router.get('/category/:category', getProductsByCategoryRoute);

/**
 * GET /api/products/:id
 * Get a single product by ID
 * 
 * URL parameters:
 * - id: Product ID (number)
 * 
 * Example: GET /api/products/1
 * 
 * Frontend integration:
 * fetch('/api/products/1')
 *   .then(response => response.json())
 *   .then(data => {
 *     if (data.success) {
 *       console.log('Product details:', data.data);
 *     } else {
 *       console.error('Product not found');
 *     }
 *   });
 */
router.get('/:id', getProductById);

export default router;
