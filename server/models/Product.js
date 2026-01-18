/**
 * Product Model using Mongoose
 * 
 * This model defines the Product schema for MongoDB
 */

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [200, 'Product name cannot exceed 200 characters']
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    enum: ['men', 'women', 'kid'],
    lowercase: true
  },
  image: {
    type: String,
    required: [true, 'Product image is required']
  },
  new_price: {
    type: Number,
    required: [true, 'Product new price is required'],
    min: [0, 'Price cannot be negative']
  },
  old_price: {
    type: Number,
    required: [true, 'Product old price is required'],
    min: [0, 'Price cannot be negative']
  },
  inStock: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// Add indexes for better query performance
productSchema.index({ name: 'text', category: 1 });
productSchema.index({ category: 1 });
productSchema.index({ new_price: 1 });

// Create and export the Product model
const Product = mongoose.model('Product', productSchema);

export default Product;