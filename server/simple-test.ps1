# Simple Authentication Test
$body = @{
    username = "testuser"
    email = "test@example.com"
    password = "password123"
} | ConvertTo-Json

Write-Host "Testing user registration..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:5001/api/auth/register" -Method POST -Body $body -ContentType "application/json"
    Write-Host "✅ User registered successfully!" -ForegroundColor Green
    $response | ConvertTo-Json -Depth 3
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
}

