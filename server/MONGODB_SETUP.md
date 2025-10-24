# MongoDB Setup Guide

## 🌐 Option 1: MongoDB Atlas (Cloud - Recommended)

### Step 1: Create MongoDB Atlas Account
1. Go to https://cloud.mongodb.com
2. Click "Try Free" 
3. Create account with email/password

### Step 2: Create a Cluster
1. Choose "Shared" (Free tier)
2. Select a region close to you
3. Click "Create Cluster"

### Step 3: Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with `shopper`

### Step 4: Update .env file
```env
MONGODB_URI=mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/shopper?retryWrites=true&w=majority
```

---

## 💻 Option 2: Local MongoDB

### Windows:
1. Download MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Install with default settings
3. Start MongoDB service:
   ```cmd
   net start MongoDB
   ```

### Update .env file:
```env
MONGODB_URI=mongodb://localhost:27017/shopper
```

---

## 🚀 Start Your Server

After setting up MongoDB:

```bash
cd server
npm run dev
```

## 🧪 Test with PowerShell

### Test API Root:
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api" -Method GET
```

### Test GET Products:
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/products" -Method GET
```

### Test POST Product:
```powershell
$body = @{
    name = "Test Product"
    price = 29.99
    inStock = $true
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/products" -Method POST -Body $body -ContentType "application/json"
```
