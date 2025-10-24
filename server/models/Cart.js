/**
 * Cart Model
 * 
 * This class represents a shopping cart for a user.
 * Each user has one cart that contains multiple cart items.
 */

class Cart {
  constructor(userId) {
    this.userId = userId;
    this.items = []; // Array of CartItem objects
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  // Add item to cart or update quantity if item already exists
  addItem(productId, quantity = 1) {
    const existingItem = this.items.find(item => item.productId === productId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push(new CartItem(productId, quantity));
    }
    
    this.updatedAt = new Date();
  }

  // Remove item from cart
  removeItem(productId) {
    this.items = this.items.filter(item => item.productId !== productId);
    this.updatedAt = new Date();
  }

  // Update item quantity
  updateItemQuantity(productId, quantity) {
    const item = this.items.find(item => item.productId === productId);
    if (item) {
      if (quantity <= 0) {
        this.removeItem(productId);
      } else {
        item.quantity = quantity;
        this.updatedAt = new Date();
      }
    }
  }

  // Clear all items from cart
  clear() {
    this.items = [];
    this.updatedAt = new Date();
  }

  // Get total number of items in cart
  getTotalItems() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  // Get cart data for API responses
  toJSON() {
    return {
      userId: this.userId,
      items: this.items.map(item => item.toJSON()),
      totalItems: this.getTotalItems(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

/**
 * CartItem Model
 * Represents an individual item in the shopping cart
 */
class CartItem {
  constructor(productId, quantity) {
    this.productId = productId;
    this.quantity = quantity;
    this.addedAt = new Date();
  }

  toJSON() {
    return {
      productId: this.productId,
      quantity: this.quantity,
      addedAt: this.addedAt
    };
  }
}

export { Cart, CartItem };
