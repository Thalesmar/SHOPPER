/**
 * Simple test script for the API
 */

import fetch from 'node-fetch';

const API_BASE = 'http://localhost:5000/api';

async function testAPI() {
  console.log('🧪 Testing SHOPPER API...\n');
  
  try {
    // Test API root
    console.log('1. Testing API root...');
    const rootResponse = await fetch(`${API_BASE}`);
    const rootData = await rootResponse.json();
    console.log('✅ API Root:', rootData);
    
    // Test GET products (should be empty initially)
    console.log('\n2. Testing GET /api/products...');
    const getResponse = await fetch(`${API_BASE}/products`);
    const getData = await getResponse.json();
    console.log('✅ GET Products:', getData);
    
    // Test POST product
    console.log('\n3. Testing POST /api/products...');
    const postResponse = await fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Test Product',
        price: 29.99,
        inStock: true
      })
    });
    const postData = await postResponse.json();
    console.log('✅ POST Product:', postData);
    
    // Test GET products again (should now have 1 product)
    console.log('\n4. Testing GET /api/products after adding product...');
    const getResponse2 = await fetch(`${API_BASE}/products`);
    const getData2 = await getResponse2.json();
    console.log('✅ GET Products (after POST):', getData2);
    
    // Test 404 route
    console.log('\n5. Testing 404 route...');
    const notFoundResponse = await fetch(`${API_BASE}/nonexistent`);
    const notFoundData = await notFoundResponse.json();
    console.log('✅ 404 Response:', notFoundData);
    
    console.log('\n🎉 All tests completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testAPI();
