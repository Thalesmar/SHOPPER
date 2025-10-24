# Test Authentication Endpoints
Write-Host "Testing User Authentication..." -ForegroundColor Green
Write-Host ""

# Test 1: Register a new user
Write-Host "1. Testing User Registration..." -ForegroundColor Yellow
$registerBody = @{
    username = "testuser"
    email = "test@example.com"
    password = "password123"
} | ConvertTo-Json

try {
    $registerResponse = Invoke-RestMethod -Uri "http://localhost:5001/api/auth/register" -Method POST -Body $registerBody -ContentType "application/json"
    Write-Host "✅ Registration Success:" -ForegroundColor Green
    $registerResponse | ConvertTo-Json -Depth 3
} catch {
    Write-Host "❌ Registration Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 2: Login user
Write-Host "2. Testing User Login..." -ForegroundColor Yellow
$loginBody = @{
    email = "test@example.com"
    password = "password123"
} | ConvertTo-Json

try {
    $loginResponse = Invoke-RestMethod -Uri "http://localhost:5001/api/auth/login" -Method POST -Body $loginBody -ContentType "application/json"
    Write-Host "✅ Login Success:" -ForegroundColor Green
    $loginResponse | ConvertTo-Json -Depth 3
} catch {
    Write-Host "❌ Login Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 3: Get all users
Write-Host "3. Testing Get All Users..." -ForegroundColor Yellow
try {
    $usersResponse = Invoke-RestMethod -Uri "http://localhost:5001/api/auth/users" -Method GET
    Write-Host "✅ Users Retrieved:" -ForegroundColor Green
    $usersResponse | ConvertTo-Json -Depth 3
} catch {
    Write-Host "❌ Get Users Error: $($_.Exception.Message)" -ForegroundColor Red
}

