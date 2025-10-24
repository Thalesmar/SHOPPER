/**
 * Cart Controller
 * 
 * This controller handles shopping cart operations.
 * It manages adding, removing, and updating items in the user's cart.
 */

import { 
  getUserCart, 
  findProductById 
} from '../data/mockData.js';

/**
 * Get user's cart
 * GET /api/cart
 * Requires authentication
 */
export const getCart = (req, res) => {
  try {
    const userId = req.user.id;
    const cart = getUserCart(userId);
    
    // Get product details for each cart item
    const cartWithProducts = {
      ...cart.toJSON(),
      items: cart.items.map(item => {
        const product = findProductById(item.productId);
        return {
          ...item,
          product: product ? product.toJSON() : null
        };
      })
    };
    
    res.json({
      success: true,
      data: cartWithProducts
    });
  } catch (error) {
    console.error('Error getting cart:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve cart'
    });
  }
};

/**
 * Add item to cart
 * POST /api/cart
 * Requires authentication
 */
export const addToCart = (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity = 1 } = req.body;
    
    // Validate required fields
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required'
      });
    }
    
    // Validate product exists
    const product = findProductById(parseInt(productId));
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    // Validate quantity
    const quantityNum = parseInt(quantity);
    if (isNaN(quantityNum) || quantityNum <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be a positive number'
      });
    }
    
    // Get user's cart and add item
    const cart = getUserCart(userId);
    cart.addItem(parseInt(productId), quantityNum);
    
    // Return updated cart
    const cartWithProducts = {
      ...cart.toJSON(),
      items: cart.items.map(item => {
        const product = findProductById(item.productId);
        return {
          ...item,
          product: product ? product.toJSON() : null
        };
      })
    };
    
    res.json({
      success: true,
      message: 'Item added to cart successfully',
      data: cartWithProducts
    });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add item to cart'
    });
  }
};

/**
 * Update cart item quantity
 * PUT /api/cart/:productId
 * Requires authentication
 */
export const updateCartItem = (req, res) => {
  try {
    const userId = req.user.id;
    const productId = parseInt(req.params.productId);
    const { quantity } = req.body;
    
    // Validate product ID
    if (isNaN(productId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID'
      });
    }
    
    // Validate product exists
    const product = findProductById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    // Validate quantity
    const quantityNum = parseInt(quantity);
    if (isNaN(quantityNum) || quantityNum < 0) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be a non-negative number'
      });
    }
    
    // Get user's cart and update item
    const cart = getUserCart(userId);
    cart.updateItemQuantity(productId, quantityNum);
    
    // Return updated cart
    const cartWithProducts = {
      ...cart.toJSON(),
      items: cart.items.map(item => {
        const product = findProductById(item.productId);
        return {
          ...item,
          product: product ? product.toJSON() : null
        };
      })
    };
    
    res.json({
      success: true,
      message: 'Cart item updated successfully',
      data: cartWithProducts
    });
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update cart item'
    });
  }
};

/**
 * Remove item from cart
 * DELETE /api/cart/:productId
 * Requires authentication
 */
export const removeFromCart = (req, res) => {
  try {
    const userId = req.user.id;
    const productId = parseInt(req.params.productId);
    
    // Validate product ID
    if (isNaN(productId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID'
      });
    }
    
    // Get user's cart and remove item
    const cart = getUserCart(userId);
    cart.removeItem(productId);
    
    // Return updated cart
    const cartWithProducts = {
      ...cart.toJSON(),
      items: cart.items.map(item => {
        const product = findProductById(item.productId);
        return {
          ...item,
          product: product ? product.toJSON() : null
        };
      })
    };
    
    res.json({
      success: true,
      message: 'Item removed from cart successfully',
      data: cartWithProducts
    });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove item from cart'
    });
  }
};

/**
 * Clear entire cart
 * DELETE /api/cart
 * Requires authentication
 */
export const clearCart = (req, res) => {
  try {
    const userId = req.user.id;
    const cart = getUserCart(userId);
    cart.clear();
    
    res.json({
      success: true,
      message: 'Cart cleared successfully',
      data: cart.toJSON()
    });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to clear cart'
    });
  }
};
