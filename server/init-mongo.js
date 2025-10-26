// MongoDB initialization script for SHOPPER e-commerce
// This script creates the initial database structure and sample data

db = db.getSiblingDB('shopper');

// Create collections
db.createCollection('users');
db.createCollection('products');
db.createCollection('orders');
db.createCollection('carts');

// Create indexes for better performance
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "username": 1 }, { unique: true });
db.products.createIndex({ "id": 1 }, { unique: true });
db.products.createIndex({ "category": 1 });
db.orders.createIndex({ "userId": 1 });
db.carts.createIndex({ "userId": 1 }, { unique: true });

// Insert sample products (matching frontend data structure)
db.products.insertMany([
  {
    id: 1,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "women",
    image: "/src/Component/Assets/product_1.png",
    new_price: 50.0,
    old_price: 80.5,
    inStock: true
  },
  {
    id: 2,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "women",
    image: "/src/Component/Assets/product_2.png",
    new_price: 85.0,
    old_price: 120.5,
    inStock: true
  },
  {
    id: 13,
    name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
    category: "men",
    image: "/src/Component/Assets/product_13.png",
    new_price: 85.0,
    old_price: 120.5,
    inStock: true
  },
  {
    id: 25,
    name: "Boys Orange Colourblocked Hooded Sweatshirt",
    category: "kid",
    image: "/src/Component/Assets/product_25.png",
    new_price: 85.0,
    old_price: 120.5,
    inStock: true
  }
]);

// Create admin user
db.users.insertOne({
  username: "admin",
  email: "admin@shopper.com",
  password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeRMpPJcS5HSqLBvG", // password: admin123
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date()
});

print("✅ SHOPPER database initialized successfully!");
print("📊 Sample data created:");
print("   - Products: " + db.products.countDocuments());
print("   - Users: " + db.users.countDocuments());
print("🔑 Admin credentials: admin@shopper.com / admin123");
