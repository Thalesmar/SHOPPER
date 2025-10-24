# Test POST endpoint
Write-Host "Testing POST /api/products..." -ForegroundColor Yellow

$body = @{
    name = "Awesome Product"
    price = 99.99
    inStock = $true
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:5001/api/products" -Method POST -Body $body -ContentType "application/json"
    Write-Host "✅ POST Success:" -ForegroundColor Green
    $response | ConvertTo-Json -Depth 3
} catch {
    Write-Host "❌ POST Error: $($_.Exception.Message)" -ForegroundColor Red
}
