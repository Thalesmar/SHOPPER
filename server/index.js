/**
 * SHOPPER Backend Server with MongoDB
 * Main entry point for the Express.js API server
 * 
 * This file sets up the Express server with MongoDB connection,
 * Product model, and API routes for product management.
 */

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import authRoutes from './routes/auth.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/shopper';

// Middleware
app.use(express.json()); // Parse JSON requests

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB successfully');
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  });

// API root endpoint
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to SHOPPER API root route!'
  });
});

// Authentication routes
app.use('/api/auth', authRoutes);

// GET /api/products - Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json({
      success: true,
      data: products,
      count: products.length
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products'
    });
  }
});

// POST /api/products - Add a new product
app.post('/api/products', async (req, res) => {
  try {
    const { name, price, inStock } = req.body;
    
    // Validate required fields
    if (!name || !price) {
      return res.status(400).json({
        success: false,
        message: 'Name and price are required'
      });
    }
    
    // Validate price is a number
    if (typeof price !== 'number' || price < 0) {
      return res.status(400).json({
        success: false,
        message: 'Price must be a positive number'
      });
    }
    
    // Create new product
    const product = new Product({
      name,
      price,
      inStock: inStock !== undefined ? inStock : true
    });
    
    const savedProduct = await product.save();
    
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: savedProduct
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create product'
    });
  }
});

// Catch-all 404 handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 SHOPPER Backend Server running on port ${PORT}`);
  console.log(`📱 API Root: http://localhost:${PORT}/api`);
  console.log(`🛍️ Products: http://localhost:${PORT}/api/products`);
  console.log(`🗄️ MongoDB: ${MONGODB_URI}`);
});

export default app;