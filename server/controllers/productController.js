/**
 * Product Controller
 * 
 * This controller handles all product-related operations.
 * It provides functions to get products, search products, and filter by category.
 */

import { 
  products, 
  findProductById, 
  getProductsByCategory 
} from '../data/mockData.js';

/**
 * Get all products with optional filtering and pagination
 * GET /api/products?category=women&page=1&limit=10&search=blouse
 */
export const getAllProducts = (req, res) => {
  try {
    const { category, page = 1, limit = 36, search } = req.query;
    
    let filteredProducts = [...products];
    
    // Filter by category if provided
    if (category) {
      filteredProducts = getProductsByCategory(category);
    }
    
    // Search by product name if provided
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm)
      );
    }
    
    // Calculate pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    
    // Calculate total pages
    const totalPages = Math.ceil(filteredProducts.length / limitNum);
    
    res.json({
      success: true,
      data: {
        products: paginatedProducts.map(product => product.toJSON()),
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalProducts: filteredProducts.length,
          hasNextPage: pageNum < totalPages,
          hasPrevPage: pageNum > 1
        }
      }
    });
  } catch (error) {
    console.error('Error getting products:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve products'
    });
  }
};

/**
 * Get a single product by ID
 * GET /api/products/:id
 */
export const getProductById = (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    
    if (isNaN(productId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID'
      });
    }
    
    const product = findProductById(productId);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      data: product.toJSON()
    });
  } catch (error) {
    console.error('Error getting product:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve product'
    });
  }
};

/**
 * Get products by category
 * GET /api/products/category/:category
 */
export const getProductsByCategoryRoute = (req, res) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 36 } = req.query;
    
    // Validate category
    const validCategories = ['women', 'men', 'kid'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category. Must be one of: women, men, kid'
      });
    }
    
    const categoryProducts = getProductsByCategory(category);
    
    // Calculate pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    
    const paginatedProducts = categoryProducts.slice(startIndex, endIndex);
    const totalPages = Math.ceil(categoryProducts.length / limitNum);
    
    res.json({
      success: true,
      data: {
        products: paginatedProducts.map(product => product.toJSON()),
        category,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalProducts: categoryProducts.length,
          hasNextPage: pageNum < totalPages,
          hasPrevPage: pageNum > 1
        }
      }
    });
  } catch (error) {
    console.error('Error getting products by category:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve products by category'
    });
  }
};

/**
 * Search products by name
 * GET /api/products/search?q=searchTerm
 */
export const searchProducts = (req, res) => {
  try {
    const { q: searchTerm, page = 1, limit = 36 } = req.query;
    
    if (!searchTerm || searchTerm.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Search term is required'
      });
    }
    
    const searchLower = searchTerm.toLowerCase();
    const matchingProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower)
    );
    
    // Calculate pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    
    const paginatedProducts = matchingProducts.slice(startIndex, endIndex);
    const totalPages = Math.ceil(matchingProducts.length / limitNum);
    
    res.json({
      success: true,
      data: {
        products: paginatedProducts.map(product => product.toJSON()),
        searchTerm,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalProducts: matchingProducts.length,
          hasNextPage: pageNum < totalPages,
          hasPrevPage: pageNum > 1
        }
      }
    });
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search products'
    });
  }
};

/**
 * Get product categories
 * GET /api/products/categories
 */
export const getCategories = (req, res) => {
  try {
    const categories = [
      {
        name: 'women',
        displayName: 'Women',
        productCount: getProductsByCategory('women').length
      },
      {
        name: 'men',
        displayName: 'Men',
        productCount: getProductsByCategory('men').length
      },
      {
        name: 'kid',
        displayName: 'Kids',
        productCount: getProductsByCategory('kid').length
      }
    ];
    
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Error getting categories:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve categories'
    });
  }
};
