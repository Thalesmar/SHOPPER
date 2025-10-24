# Setup MongoDB Atlas Connection
Write-Host "Setting up MongoDB Atlas connection..." -ForegroundColor Green

# Create .env file with MongoDB Atlas connection string
$envContent = @"
# Environment Variables for SHOPPER Backend
PORT=5000
NODE_ENV=development

# MongoDB Atlas Configuration
MONGODB_URI=mongodb+srv://beneliot222_db_user:cVl5hfhcWVrg7ThR@shoppercluster.sgsgiiz.mongodb.net/shopper?retryWrites=true&w=majority

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production

# CORS Configuration
FRONTEND_URL=https://thalesmar.github.io
"@

# Write to .env file
$envContent | Out-File -FilePath ".env" -Encoding utf8

Write-Host ".env file created with MongoDB Atlas connection!" -ForegroundColor Green
Write-Host "Your MongoDB Atlas connection string has been added." -ForegroundColor Yellow
Write-Host "You can now restart your server to use MongoDB Atlas!" -ForegroundColor Cyan
