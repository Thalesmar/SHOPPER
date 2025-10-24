# MongoDB Setup Guide

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set up Environment Variables
```bash
cp env.example .env
```

Edit `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/shopper
```

### 3. Start MongoDB

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Run: `npm run dev`

#### Option B: MongoDB Atlas (Cloud)
1. Create free account at https://cloud.mongodb.com
2. Create a cluster
3. Get connection string
4. Update `.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shopper?retryWrites=true&w=majority
```

### 4. Start Server
```bash
npm run dev
```

## 🧪 Test the API

### Test API Root
```bash
curl http://localhost:5000/api
```

### Test GET Products
```bash
curl http://localhost:5000/api/products
```

### Test POST Product
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Product","price":29.99,"inStock":true}'
```

### Test 404 Route
```bash
curl http://localhost:5000/api/nonexistent
```

## 📋 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api` | API root with welcome message |
| GET | `/api/products` | Get all products |
| POST | `/api/products` | Add new product |
| * | `/*` | 404 for undefined routes |

## 🔧 Product Model

```javascript
{
  name: String (required),
  price: Number (required, min: 0),
  inStock: Boolean (default: true),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## 📝 Example Usage

### Add a Product
```javascript
fetch('/api/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Awesome Product',
    price: 99.99,
    inStock: true
  })
})
.then(response => response.json())
.then(data => console.log(data));
```

### Get All Products
```javascript
fetch('/api/products')
  .then(response => response.json())
  .then(data => console.log(data));
```
