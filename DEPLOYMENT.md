# SHOPPER - E-commerce Website Deployment Guide

This document provides comprehensive deployment instructions for the SHOPPER e-commerce application.

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SHOPPER
   ```

2. **Install dependencies**
   ```bash
   # Frontend dependencies
   npm install
   
   # Backend dependencies
   cd server
   npm install
   ```

3. **Environment Configuration**
   ```bash
   # Copy environment files
   cp env.example .env
   cp server/env.example server/.env
   ```

4. **Start development servers**
   ```bash
   # Terminal 1: Start backend
   cd server && npm run dev
   
   # Terminal 2: Start frontend
   npm run dev
   ```

## 🌐 Deployment Options

### 1. GitHub Pages (Static Frontend Only)

```bash
# Build and deploy to GitHub Pages
npm run build
npm run deploy
```

**Configuration:**
- Frontend only (no backend API)
- Uses local storage for data persistence
- Perfect for portfolio/demo purposes

### 2. Vercel (Full-Stack)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

**Features:**
- Automatic deployments from Git
- Serverless functions for backend
- Built-in database support
- Global CDN

### 3. Netlify (Full-Stack)

1. **Install Netlify CLI**
   ```bash
   npm i -g netlify-cli
   ```

2. **Deploy**
   ```bash
   netlify deploy --prod
   ```

**Features:**
- Git-based deployments
- Netlify Functions for backend
- Form handling
- Split testing

### 4. Render (Full-Stack)

1. **Connect your GitHub repository**
2. **Create services using render.yaml**
3. **Deploy automatically**

**Features:**
- Free tier available
- Automatic SSL
- Custom domains
- Database hosting

### 5. Docker Deployment

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

2. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - MongoDB: localhost:27017

**Features:**
- Complete containerized solution
- MongoDB included
- Nginx reverse proxy
- Production-ready

## ⚙️ Environment Variables

### Frontend (.env)
```env
VITE_APP_NAME=Shopper
VITE_API_BASE_URL=http://localhost:5000/api
VITE_ENABLE_DEBUG_MODE=false
```

### Backend (server/.env)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://localhost:27017/shopper
JWT_SECRET=your_secure_jwt_secret
FRONTEND_URL=https://yourdomain.com
```

## 🗄️ Database Setup

### Local MongoDB
```bash
# Install MongoDB Community Edition
# Start MongoDB service
mongod

# Or use MongoDB Docker container
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### MongoDB Atlas (Cloud)
1. Create account at https://cloud.mongodb.com
2. Create new cluster
3. Get connection string
4. Update MONGODB_URI in server/.env

## 📦 Production Build

```bash
# Build frontend
npm run build

# Test production build locally
npm run preview

# Start backend in production mode
cd server && NODE_ENV=production npm start
```

## 🔒 Security Checklist

- [ ] Update JWT_SECRET to a secure random string
- [ ] Configure CORS origins for production
- [ ] Enable HTTPS in production
- [ ] Set up rate limiting
- [ ] Configure security headers
- [ ] Enable MongoDB authentication
- [ ] Regular security updates

## 🚨 Troubleshooting

### Common Issues

1. **Build Errors**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Database Connection**
   ```bash
   # Check MongoDB status
   mongod --version
   # or
   docker ps | grep mongo
   ```

3. **Port Conflicts**
   ```bash
   # Check what's running on ports
   netstat -tulpn | grep :5000
   netstat -tulpn | grep :5173
   ```

## 📊 Performance Optimization

### Frontend
- [ ] Image optimization (WebP format)
- [ ] Code splitting
- [ ] Lazy loading
- [ ] Service worker for caching
- [ ] Bundle analysis

### Backend
- [ ] Database indexing
- [ ] Redis caching
- [ ] Response compression
- [ ] Load balancing
- [ ] CDN for static assets

## 🎯 Production Checklist

### Pre-deployment
- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Database migrations completed
- [ ] SSL certificates ready
- [ ] Domain DNS configured

### Post-deployment
- [ ] Health checks passing
- [ ] Monitoring setup
- [ ] Backup strategy
- [ ] Error logging
- [ ] Performance monitoring

## 📈 Monitoring & Analytics

### Recommended Tools
- **Uptime**: UptimeRobot, Pingdom
- **Analytics**: Google Analytics, Plausible
- **Error Tracking**: Sentry, LogRocket
- **Performance**: Lighthouse, WebPageTest

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Deploy
        run: npm run deploy
```

## 🆘 Support

For deployment issues:
1. Check the troubleshooting section
2. Review deployment platform documentation
3. Check GitHub Issues
4. Contact support team

---

**Last updated:** October 2024
**Version:** 1.0.0
