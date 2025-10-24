/**
 * User Model
 * 
 * This class represents a user in our e-commerce system.
 * In a real application, this would be replaced with a database model
 * (like Mongoose for MongoDB, Sequelize for PostgreSQL, etc.)
 */

import bcrypt from 'bcryptjs';

class User {
  constructor(id, username, email, password) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password; // This will be hashed
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  // Hash password before saving
  async hashPassword() {
    const saltRounds = 12; // Higher number = more secure but slower
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  // Compare password for login
  async comparePassword(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  }

  // Return user data without password (for API responses)
  toJSON() {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  // Static method to create a new user
  static async create(userData) {
    const user = new User(
      userData.id,
      userData.username,
      userData.email,
      userData.password
    );
    await user.hashPassword();
    return user;
  }
}

export default User;
