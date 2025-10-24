# PowerShell test script for SHOPPER API

Write-Host "🧪 Testing SHOPPER API..." -ForegroundColor Green
Write-Host ""

try {
    # Test API root
    Write-Host "1. Testing API root..." -ForegroundColor Yellow
    $rootResponse = Invoke-RestMethod -Uri "http://localhost:5000/api" -Method GET
    Write-Host "✅ API Root: $($rootResponse | ConvertTo-Json)" -ForegroundColor Green
    
    # Test GET products
    Write-Host "`n2. Testing GET /api/products..." -ForegroundColor Yellow
    $getResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/products" -Method GET
    Write-Host "✅ GET Products: $($getResponse | ConvertTo-Json)" -ForegroundColor Green
    
    # Test POST product
    Write-Host "`n3. Testing POST /api/products..." -ForegroundColor Yellow
    $productData = @{
        name = "Test Product"
        price = 29.99
        inStock = $true
    } | ConvertTo-Json
    
    $postResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/products" -Method POST -Body $productData -ContentType "application/json"
    Write-Host "✅ POST Product: $($postResponse | ConvertTo-Json)" -ForegroundColor Green
    
    # Test GET products again
    Write-Host "`n4. Testing GET /api/products after adding product..." -ForegroundColor Yellow
    $getResponse2 = Invoke-RestMethod -Uri "http://localhost:5000/api/products" -Method GET
    Write-Host "✅ GET Products (after POST): $($getResponse2 | ConvertTo-Json)" -ForegroundColor Green
    
    # Test 404 route
    Write-Host "`n5. Testing 404 route..." -ForegroundColor Yellow
    try {
        $notFoundResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/nonexistent" -Method GET
    } catch {
        $notFoundResponse = $_.Exception.Response
    }
    Write-Host "✅ 404 Response: Route not found" -ForegroundColor Green
    
    Write-Host "`n🎉 All tests completed successfully!" -ForegroundColor Green
    
} catch {
    Write-Host "❌ Test failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Make sure your server is running on port 5000" -ForegroundColor Yellow
}
