# SHOPPER Backend API

A complete Node.js/Express backend API for the SHOPPER e-commerce website. This backend provides all the necessary endpoints for product management, user authentication, shopping cart functionality, and order processing.

## 🚀 Features

- **Product Management**: Browse, search, and filter products by category
- **User Authentication**: Registration, login, and JWT-based authentication
- **Shopping Cart**: Add, remove, and update cart items
- **Order Management**: Create orders from cart items and track order status
- **Security**: Password hashing, JWT tokens, CORS support, rate limiting
- **Error Handling**: Comprehensive error handling with consistent JSON responses

## 📁 Project Structure

```
server/
├── controllers/          # Business logic for each route
│   ├── authController.js
│   ├── cartController.js
│   ├── orderController.js
│   └── productController.js
├── data/                # Mock data store (replace with database)
│   └── mockData.js
├── middleware/          # Custom middleware functions
│   └── auth.js
├── models/             # Data models and classes
│   ├── User.js
│   ├── Product.js
│   ├── Cart.js
│   └── Order.js
├── routes/             # API route definitions
│   ├── auth.js
│   ├── cart.js
│   ├── orders.js
│   └── products.js
├── index.js            # Main server file
├── package.json        # Dependencies and scripts
├── env.example         # Environment variables template
└── README.md          # This file
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Environment Configuration

Copy the environment template and configure your variables:

```bash
cp env.example .env
```

Edit the `.env` file with your configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Secret - Generate a strong random string for production
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production

# CORS Configuration
FRONTEND_URL=https://thalesmar.github.io
```

**Important**: Change the `JWT_SECRET` to a strong, random string in production!

### 3. Start the Server

#### Development Mode (with auto-restart)
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000` (or the port specified in your `.env` file).

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication

Most endpoints require authentication via JWT token. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Response Format

All API responses follow this consistent format:

```json
{
  "success": true|false,
  "message": "Description of the result",
  "data": { ... } // Present only on success
}
```

### Endpoints

#### 🔐 Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/profile` | Get user profile | Yes |
| PUT | `/api/auth/profile` | Update user profile | Yes |

#### 🛍️ Products

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/products` | Get all products (with filtering) | No |
| GET | `/api/products/:id` | Get single product | No |
| GET | `/api/products/categories` | Get product categories | No |
| GET | `/api/products/category/:category` | Get products by category | No |
| GET | `/api/products/search` | Search products | No |

#### 🛒 Shopping Cart

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/cart` | Get user's cart | Yes |
| POST | `/api/cart` | Add item to cart | Yes |
| PUT | `/api/cart/:productId` | Update cart item quantity | Yes |
| DELETE | `/api/cart/:productId` | Remove item from cart | Yes |
| DELETE | `/api/cart` | Clear entire cart | Yes |

#### 📦 Orders

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/orders` | Get user's orders | Yes |
| GET | `/api/orders/:id` | Get single order | Yes |
| POST | `/api/orders` | Create new order | Yes |
| PUT | `/api/orders/:id/status` | Update order status | Yes |

## 🔗 Frontend Integration

### Example: Fetching Products

```javascript
// Get all products
fetch('/api/products')
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      console.log('Products:', data.data.products);
    }
  });

// Get products by category
fetch('/api/products/category/women')
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      console.log('Women products:', data.data.products);
    }
  });
```

### Example: User Authentication

```javascript
// Register new user
fetch('/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: 'john_doe',
    email: 'john@example.com',
    password: 'password123'
  })
})
.then(response => response.json())
.then(data => {
  if (data.success) {
    // Store token for future requests
    localStorage.setItem('token', data.data.token);
    console.log('User registered:', data.data.user);
  }
});

// Login user
fetch('/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'password123'
  })
})
.then(response => response.json())
.then(data => {
  if (data.success) {
    localStorage.setItem('token', data.data.token);
    console.log('Login successful:', data.data.user);
  }
});
```

### Example: Shopping Cart Operations

```javascript
const token = localStorage.getItem('token');

// Add item to cart
fetch('/api/cart', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    productId: 1,
    quantity: 2
  })
})
.then(response => response.json())
.then(data => {
  if (data.success) {
    console.log('Item added to cart:', data.data);
  }
});

// Get cart
fetch('/api/cart', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(response => response.json())
.then(data => {
  if (data.success) {
    console.log('Cart items:', data.data.items);
  }
});
```

### Example: Creating an Order

```javascript
const token = localStorage.getItem('token');

fetch('/api/orders', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    paymentMethod: 'credit_card'
  })
})
.then(response => response.json())
.then(data => {
  if (data.success) {
    console.log('Order created:', data.data);
    // Redirect to order confirmation page
  }
});
```

## 🔧 Configuration

### CORS Settings

The server is configured to allow requests from:
- `https://thalesmar.github.io` (your GitHub Pages domain)
- `http://localhost:3000` (local development)
- `http://localhost:5173` (Vite dev server)

To add more domains, update the CORS configuration in `index.js`:

```javascript
app.use(cors({
  origin: [
    'https://thalesmar.github.io',
    'http://localhost:3000',
    'http://localhost:5173',
    'https://your-custom-domain.com' // Add your domain here
  ],
  credentials: true
}));
```

### Rate Limiting

The API includes rate limiting to prevent abuse:
- 100 requests per 15 minutes per IP address
- Customize in `index.js` if needed

## 🗄️ Database Integration

Currently, the backend uses in-memory storage (arrays and Maps) for development. To integrate with a real database:

### SQLite (Recommended for beginners)
```bash
npm install sqlite3
```

### PostgreSQL
```bash
npm install pg
```

### MongoDB
```bash
npm install mongoose
```

### MySQL
```bash
npm install mysql2
```

Replace the mock data functions in `data/mockData.js` with actual database queries.

## 🚀 Deployment

### Environment Variables for Production

```env
NODE_ENV=production
PORT=5000
JWT_SECRET=your_very_strong_secret_key_here
FRONTEND_URL=https://thalesmar.github.io
```

### Deployment Platforms

- **Heroku**: Easy deployment with automatic builds
- **Railway**: Modern platform with great developer experience
- **DigitalOcean App Platform**: Scalable and reliable
- **AWS EC2**: Full control over your server
- **Vercel**: Great for serverless deployments

### Example: Deploying to Heroku

1. Install Heroku CLI
2. Create a new app: `heroku create your-app-name`
3. Set environment variables: `heroku config:set JWT_SECRET=your_secret`
4. Deploy: `git push heroku main`

## 🧪 Testing

### Sample Test Data

The backend includes sample data for testing:

**Test Users:**
- Email: `john@example.com`, Password: `password123`
- Email: `jane@example.com`, Password: `password123`

**Products:**
- 36 products across 3 categories (women, men, kid)
- Based on your frontend product data

### Testing with Postman/Insomnia

Import the following collection for testing all endpoints:

```json
{
  "info": {
    "name": "SHOPPER API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "{{baseUrl}}/health",
          "host": ["{{baseUrl}}"],
          "path": ["health"]
        }
      }
    }
  ],
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:5000"
    }
  ]
}
```

## 🔒 Security Features

- **Password Hashing**: Uses bcrypt with 12 salt rounds
- **JWT Authentication**: Secure token-based authentication
- **CORS Protection**: Configured for your specific domains
- **Rate Limiting**: Prevents API abuse
- **Input Validation**: Validates all incoming data
- **Error Handling**: No sensitive information leaked in errors

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure your frontend domain is included in the CORS configuration
2. **Authentication Errors**: Verify the JWT token is included in the Authorization header
3. **Port Already in Use**: Change the PORT in your `.env` file
4. **Module Not Found**: Run `npm install` to install all dependencies

### Debug Mode

Enable debug logging by setting:
```env
NODE_ENV=development
```

## 📝 License

MIT License - feel free to use this code for your projects!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Review the API documentation
3. Check the server logs for error messages
4. Ensure all environment variables are set correctly

---

**Happy coding! 🎉**

This backend provides a solid foundation for your e-commerce website. You can extend it with additional features like:
- Payment processing integration
- Email notifications
- Admin dashboard
- Product reviews and ratings
- Inventory management
- Advanced search and filtering
