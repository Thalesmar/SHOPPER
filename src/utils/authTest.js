// Utility function to test authentication
export const testAuth = () => {
  // Clear existing users for testing
  localStorage.removeItem('users');
  
  // Test password hashing
  const testPassword = 'test123';
  const hashPassword = (password) => {
    if (!password || password.length === 0) return '0';
    
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash.toString();
  };
  
  const hashedPassword = hashPassword(testPassword);
  console.log('Test password:', testPassword);
  console.log('Hashed password:', hashedPassword);
  
  // Create test user
  const testUser = {
    id: Date.now(),
    name: 'Test User',
    email: 'test@example.com',
    password: hashedPassword,
    createdAt: new Date().toISOString()
  };
  
  localStorage.setItem('users', JSON.stringify([testUser]));
  console.log('Test user created:', testUser);
  
  // Test login
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const loginPassword = 'test123';
  const loginHashedPassword = hashPassword(loginPassword);
  const foundUser = users.find(u => u.email === 'test@example.com' && u.password === loginHashedPassword);
  
  console.log('Login test - Password match:', !!foundUser);
  console.log('Stored password:', testUser.password);
  console.log('Login hashed password:', loginHashedPassword);
  console.log('Passwords match:', testUser.password === loginHashedPassword);
  
  return {
    success: !!foundUser,
    storedPassword: testUser.password,
    loginPassword: loginHashedPassword,
    match: testUser.password === loginHashedPassword
  };
};
