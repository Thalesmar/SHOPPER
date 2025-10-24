/**
 * Authentication Middleware
 * 
 * This middleware handles JWT token verification and user authentication.
 * It extracts the token from the Authorization header and verifies it.
 */

import jwt from 'jsonwebtoken';
import { users } from '../data/mockData.js';

/**
 * Middleware to verify JWT token and authenticate user
 * Usage: app.use('/protected-route', authenticateToken, routeHandler)
 */
export const authenticateToken = (req, res, next) => {
  // Get token from Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token required'
    });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user in our mock data (in real app, query database)
    const user = users.find(u => u.id === decoded.userId);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    // Add user info to request object for use in route handlers
    req.user = {
      id: user.id,
      username: user.username,
      email: user.email
    };

    next(); // Continue to the next middleware/route handler
  } catch (error) {
    console.error('Token verification error:', error);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token has expired'
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Token verification failed'
    });
  }
};

/**
 * Optional authentication middleware
 * Similar to authenticateToken but doesn't require a token
 * Useful for routes that work with or without authentication
 */
export const optionalAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = users.find(u => u.id === decoded.userId);
    
    if (user) {
      req.user = {
        id: user.id,
        username: user.username,
        email: user.email
      };
    } else {
      req.user = null;
    }
  } catch (error) {
    req.user = null;
  }

  next();
};

/**
 * Generate JWT token for a user
 * This is a utility function used in auth controllers
 */
export const generateToken = (userId) => {
  return jwt.sign(
    { userId }, // Payload
    process.env.JWT_SECRET, // Secret key
    { expiresIn: '7d' } // Token expires in 7 days
  );
};
