/**
 * Order Model
 * 
 * This class represents an order in our e-commerce system.
 * An order contains multiple order items and belongs to a user.
 */

class Order {
  constructor(id, userId, items, totalAmount, paymentStatus = 'pending', shippingAddress = {}) {
    this.id = id;
    this.userId = userId;
    this.items = items; // Array of OrderItem objects
    this.totalAmount = totalAmount;
    this.paymentStatus = paymentStatus; // 'pending', 'paid', 'failed', 'refunded'
    this.orderStatus = 'processing'; // 'processing', 'shipped', 'delivered', 'cancelled'
    this.shippingAddress = shippingAddress;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  // Update payment status
  updatePaymentStatus(status) {
    this.paymentStatus = status;
    this.updatedAt = new Date();
  }

  // Update order status
  updateOrderStatus(status) {
    this.orderStatus = status;
    this.updatedAt = new Date();
  }

  // Get total number of items in order
  getTotalItems() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  // Get order data for API responses
  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      items: this.items.map(item => item.toJSON()),
      totalAmount: this.totalAmount,
      totalItems: this.getTotalItems(),
      paymentStatus: this.paymentStatus,
      orderStatus: this.orderStatus,
      shippingAddress: this.shippingAddress,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  // Static method to create a new order
  static create(orderData) {
    return new Order(
      orderData.id,
      orderData.userId,
      orderData.items,
      orderData.totalAmount,
      orderData.paymentStatus,
      orderData.shippingAddress
    );
  }
}

/**
 * OrderItem Model
 * Represents an individual item in an order
 */
class OrderItem {
  constructor(productId, productName, productImage, price, quantity) {
    this.productId = productId;
    this.productName = productName;
    this.productImage = productImage;
    this.price = price; // Price at time of order
    this.quantity = quantity;
  }

  // Calculate subtotal for this item
  getSubtotal() {
    return this.price * this.quantity;
  }

  toJSON() {
    return {
      productId: this.productId,
      productName: this.productName,
      productImage: this.productImage,
      price: this.price,
      quantity: this.quantity,
      subtotal: this.getSubtotal()
    };
  }
}

export { Order, OrderItem };
