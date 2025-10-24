/**
 * Product Model
 * 
 * This class represents a product in our e-commerce system.
 * Based on your frontend data structure from all_product.js
 */

class Product {
  constructor(id, name, category, image, newPrice, oldPrice, description = '') {
    this.id = id;
    this.name = name;
    this.category = category; // 'women', 'men', 'kid'
    this.image = image; // Image URL or path
    this.new_price = newPrice; // Current price
    this.old_price = oldPrice; // Original price (for showing discounts)
    this.description = description;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  // Calculate discount percentage
  getDiscountPercentage() {
    if (this.old_price <= this.new_price) return 0;
    return Math.round(((this.old_price - this.new_price) / this.old_price) * 100);
  }

  // Check if product is on sale
  isOnSale() {
    return this.old_price > this.new_price;
  }

  // Return product data for API responses
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      category: this.category,
      image: this.image,
      new_price: this.new_price,
      old_price: this.old_price,
      description: this.description,
      discount_percentage: this.getDiscountPercentage(),
      is_on_sale: this.isOnSale(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  // Static method to create a new product
  static create(productData) {
    return new Product(
      productData.id,
      productData.name,
      productData.category,
      productData.image,
      productData.new_price,
      productData.old_price,
      productData.description
    );
  }
}

export default Product;
