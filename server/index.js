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
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import process from 'process';
import Product from './models/Product.js';
import authRoutes from './routes/auth.js';
import cartRoutes from './routes/cart.js';
import orderRoutes from './routes/orders.js';
import productRoutes from './routes/products.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/shopper';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Middleware
app.use(helmet()); // Security headers
app.use(limiter); // Rate limiting
app.use(cors({
  origin: [FRONTEND_URL, 'http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' })); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests

// MongoDB Connection with retry logic
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('✅ Connected to MongoDB successfully');
    console.log(`🗄️ Database: ${conn.connection.name}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('⚠️ Running without database - some features may not work');
    // Don't exit process, allow server to run without DB for development
  }
};

connectDB();

// API root endpoint
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to SHOPPER API root route!'
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);


// Catch-all 404 handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Global error handler
app.use((err, req, res) => {
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