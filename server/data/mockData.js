/**
 * Mock Data Store
 * 
 * This file contains sample data for development and testing.
 * In a real application, this would be replaced with a database.
 * 
 * The data structure is based on your frontend all_product.js file.
 */

// Temporarily commented out to fix server startup
// import User from '../models/User.js';
// import Product from '../models/Product.js';
// import { Cart } from '../models/Cart.js';
// import { Order, OrderItem } from '../models/Order.js';

// Sample products based on your frontend data
export const products = [
  // Women's products (1-12)
  {
    id: 1,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "women",
    image: "/assets/product_1.png",
    new_price: 50.0,
    old_price: 80.5,
    inStock: true
  },
  {
    id: 2,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "women",
    image: "/assets/product_2.png",
    new_price: 85.0,
    old_price: 120.5,
    inStock: true
  },
  {
    id: 3,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "women",
    image: "/assets/product_3.png",
    new_price: 60.0,
    old_price: 100.5,
    inStock: true
  },
  {
    id: 4,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "women",
    image: "/assets/product_4.png",
    new_price: 100.0,
    old_price: 150.0,
    inStock: true
  },
  {
    id: 5,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "women",
    image: "/assets/product_5.png",
    new_price: 85.0,
    old_price: 120.5,
    inStock: true
  },
  {
    id: 6,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "women",
    image: "/assets/product_6.png",
    new_price: 85.0,
    old_price: 120.5,
    inStock: true
  },
  {
    id: 7,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "women",
    image: "/assets/product_7.png",
    new_price: 85.0,
    old_price: 120.5,
    inStock: true
  },
  {
    id: 8,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "women",
    image: "/assets/product_8.png",
    new_price: 85.0,
    old_price: 120.5,
    inStock: true
  },
  {
    id: 9,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "women",
    image: "/assets/product_9.png",
    new_price: 85.0,
    old_price: 120.5,
    inStock: true
  },
  {
    id: 10,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "women",
    image: "/assets/product_10.png",
    new_price: 85.0,
    old_price: 120.5,
    inStock: true
  },
  {
    id: 11,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "women",
    image: "/assets/product_11.png",
    new_price: 85.0,
    old_price: 120.5,
    inStock: true
  },
  {
    id: 12,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "women",
    image: "/assets/product_12.png",
    new_price: 85.0,
    old_price: 120.5,
    inStock: true
  },

  // Men's products (13-24) - Temporarily commented out
  /* new Product(13, "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", "men", "/assets/product_13.png", 85.0, 120.5, "Modern green bomber jacket with full-zip design and slim fit."),
  new Product(14, "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", "men", "/assets/product_14.png", 85.0, 120.5, "Stylish green bomber jacket perfect for casual wear."),
  new Product(15, "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", "men", "/assets/product_15.png", 85.0, 120.5, "Comfortable green bomber jacket with contemporary styling."),
  new Product(16, "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", "men", "/assets/product_16.png", 85.0, 120.5, "Premium green bomber jacket with excellent craftsmanship."),
  new Product(17, "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", "men", "/assets/product_17.png", 85.0, 120.5, "Versatile green bomber jacket for any season."),
  new Product(18, "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", "men", "/assets/product_18.png", 85.0, 120.5, "Trendy green bomber jacket with modern appeal."),
  new Product(19, "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", "men", "/assets/product_19.png", 85.0, 120.5, "Classic green bomber jacket with updated design."),
  new Product(20, "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", "men", "/assets/product_20.png", 85.0, 120.5, "Sophisticated green bomber jacket with premium materials."),
  new Product(21, "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", "men", "/assets/product_21.png", 85.0, 120.5, "Chic green bomber jacket with contemporary fit."),
  new Product(22, "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", "men", "/assets/product_22.png", 85.0, 120.5, "Elegant green bomber jacket with refined details."),
  new Product(23, "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", "men", "/assets/product_23.png", 85.0, 120.5, "Stylish green bomber jacket with modern silhouette."),
  new Product(24, "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", "men", "/assets/product_24.png", 85.0, 120.5, "Beautiful green bomber jacket with timeless appeal."),

  // Kids' products (25-36)
  new Product(25, "Boys Orange Colourblocked Hooded Sweatshirt", "kid", "/assets/product_25.png", 85.0, 120.5, "Fun orange colourblocked sweatshirt with hood for boys."),
  new Product(26, "Boys Orange Colourblocked Hooded Sweatshirt", "kid", "/assets/product_26.png", 85.0, 120.5, "Comfortable orange sweatshirt perfect for active kids."),
  new Product(27, "Boys Orange Colourblocked Hooded Sweatshirt", "kid", "/assets/product_27.png", 85.0, 120.5, "Stylish orange sweatshirt with modern colourblock design."),
  new Product(28, "Boys Orange Colourblocked Hooded Sweatshirt", "kid", "/assets/product_28.png", 85.0, 120.5, "Durable orange sweatshirt with quality construction."),
  new Product(29, "Boys Orange Colourblocked Hooded Sweatshirt", "kid", "/assets/product_29.png", 85.0, 120.5, "Versatile orange sweatshirt for play and school."),
  new Product(30, "Boys Orange Colourblocked Hooded Sweatshirt", "kid", "/assets/product_30.png", 85.0, 120.5, "Trendy orange sweatshirt with contemporary styling."),
  new Product(31, "Boys Orange Colourblocked Hooded Sweatshirt", "kid", "/assets/product_31.png", 85.0, 120.5, "Classic orange sweatshirt with updated design."),
  new Product(32, "Boys Orange Colourblocked Hooded Sweatshirt", "kid", "/assets/product_32.png", 85.0, 120.5, "Premium orange sweatshirt with excellent materials."),
  new Product(33, "Boys Orange Colourblocked Hooded Sweatshirt", "kid", "/assets/product_33.png", 85.0, 120.5, "Chic orange sweatshirt with modern appeal."),
  new Product(34, "Boys Orange Colourblocked Hooded Sweatshirt", "kid", "/assets/product_34.png", 85.0, 120.5, "Elegant orange sweatshirt with refined details."),
  new Product(35, "Boys Orange Colourblocked Hooded Sweatshirt", "kid", "/assets/product_35.png", 85.0, 120.5, "Stylish orange sweatshirt with contemporary fit."),
  new Product(36, "Boys Orange Colourblocked Hooded Sweatshirt", "kid", "/assets/product_36.png", 85.0, 120.5, "Beautiful orange sweatshirt with timeless design.") */
];

// Sample users (for testing)
export const users = [
  {
    id: 1,
    username: 'john_doe',
    email: 'john@example.com',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8K5.5K2', // password: "password123"
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 2,
    username: 'jane_smith',
    email: 'jane@example.com',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8K5.5K2', // password: "password123"
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02')
  }
];

// Sample carts (empty initially)
export const carts = new Map();

// Sample orders (empty initially)
export const orders = [];

// Helper functions for data management
export const getNextUserId = () => {
  return Math.max(...users.map(u => u.id), 0) + 1;
};

export const getNextOrderId = () => {
  return Math.max(...orders.map(o => o.id), 0) + 1;
};

export const findUserByEmail = (email) => {
  return users.find(user => user.email === email);
};

export const findUserById = (id) => {
  return users.find(user => user.id === id);
};

export const findProductById = (id) => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category) => {
  return products.filter(product => product.category === category);
};

export const getUserCart = (userId) => {
  if (!carts.has(userId)) {
    // carts.set(userId, new Cart(userId));
    carts.set(userId, { userId, items: [] });
  }
  return carts.get(userId);
};

export const getUserOrders = (userId) => {
  return orders.filter(order => order.userId === userId);
};
