import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContextInstance'
import { Notification } from '../Component/Notification/Notification'

export const LoginSignup = () => {
  const { login } = useContext(ShopContext);
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: 'info' });
  const navigate = useNavigate();


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Only validate name for signup, not login
    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Simple hash function for password hashing (in production, use bcrypt)
  const hashPassword = (password) => {
    if (!password || password.length === 0) return '0';

    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (isLogin) {
        // Login logic
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const hashedPassword = hashPassword(formData.password);


        // Try to find user with hashed password first
        let user = users.find(u => u.email === formData.email && u.password === hashedPassword);

        // If not found, try with plain text password (for backward compatibility)
        if (!user) {
          user = users.find(u => u.email === formData.email && u.password === formData.password);
          // If found with plain text, update to hashed password
          if (user) {
            user.password = hashedPassword;
            localStorage.setItem('users', JSON.stringify(users));
          }
        }

        if (user) {
          // Remove password from user object before storing in context
          const { password, ...userWithoutPassword } = user;
          login(userWithoutPassword);
          setNotification({ message: 'Login successful!', type: 'success' });
          setTimeout(() => navigate('/'), 1000);
        } else {
          setNotification({ message: 'Invalid email or password', type: 'error' });
        }
      } else {
        // Sign up logic
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const existingUser = users.find(u => u.email === formData.email);

        if (existingUser) {
          setNotification({ message: 'User already exists with this email', type: 'error' });
          return;
        }

        const hashedPassword = hashPassword(formData.password);


        const newUser = {
          id: Date.now(),
          name: formData.name,
          email: formData.email,
          password: hashedPassword,
          createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Remove password from user object before storing in context
        const { password, ...userWithoutPassword } = newUser;
        login(userWithoutPassword);

        setNotification({ message: 'Sign up successful!', type: 'success' });
        setTimeout(() => navigate('/'), 1000);
      }
    } catch (error) {
      setNotification({ message: 'An error occurred. Please try again.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
  };

  return (
    <div className='w-full h-auto py-24 bg-[#fce3fe]'>
      <div className="w-[90%] max-w-[580px] h-auto bg-white m-auto py-10 px-8 md:px-14 rounded-3xl shadow-lg">
        <h1 className="text-3xl font-bold text-[#2c2c2c] mb-6">{isLogin ? 'Log In' : 'Sign Up'}</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-7 mt-8">
          <div className="flex flex-col gap-5">
            {!isLogin && (
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder='Your Name'
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`h-16 w-full pl-5 border border-[#c9c9c9] outline-none text-[#5c5c5c] text-lg rounded-lg focus:border-primary focus:ring-1 focus:ring-primary transition-colors ${errors.name ? 'border-red-500' : ''}`}
                />
                {errors.name && <span className="text-red-500 text-sm mt-1 block">{errors.name}</span>}
              </div>
            )}
            <div>
              <input
                type="email"
                name="email"
                placeholder='Email Address'
                value={formData.email}
                onChange={handleInputChange}
                className={`h-16 w-full pl-5 border border-[#c9c9c9] outline-none text-[#5c5c5c] text-lg rounded-lg focus:border-primary focus:ring-1 focus:ring-primary transition-colors ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && <span className="text-red-500 text-sm mt-1 block">{errors.email}</span>}
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder='Password'
                value={formData.password}
                onChange={handleInputChange}
                className={`h-16 w-full pl-5 border border-[#c9c9c9] outline-none text-[#5c5c5c] text-lg rounded-lg focus:border-primary focus:ring-1 focus:ring-primary transition-colors ${errors.password ? 'border-red-500' : ''}`}
              />
              {errors.password && <span className="text-red-500 text-sm mt-1 block">{errors.password}</span>}
            </div>
            {!isLogin && (
              <div>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder='Confirm Password'
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`h-16 w-full pl-5 border border-[#c9c9c9] outline-none text-[#5c5c5c] text-lg rounded-lg focus:border-primary focus:ring-1 focus:ring-primary transition-colors ${errors.confirmPassword ? 'border-red-500' : ''}`}
                />
                {errors.confirmPassword && <span className="text-red-500 text-sm mt-1 block">{errors.confirmPassword}</span>}
              </div>
            )}
          </div>
          <button type="submit" disabled={isLoading} className="w-full h-16 text-white bg-[#ff4141] mt-4 border-none text-xl font-medium cursor-pointer rounded-lg hover:bg-[#e63b3b] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
            {isLoading ? 'Processing...' : (isLogin ? 'Log In' : 'Continue')}
          </button>
        </form>

        <p className='mt-5 text-[#5c5c5c] text-base font-medium'>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span onClick={toggleMode} className="text-[#ff4141] font-semibold cursor-pointer hover:underline">
            {isLogin ? 'Sign Up' : 'Log In'}
          </span>
        </p>

        {!isLogin && (
          <div className='flex items-center mt-6 gap-4 text-[#5c5c5c] text-sm font-medium'>
            <input type="checkbox" name='agree' id='agree' required className="w-4 h-4 accent-[#ff4141]" />
            <p>I agree to the <span className="text-[#ff4141] cursor-pointer hover:underline">Terms of Service</span> and <span className="text-[#ff4141] cursor-pointer hover:underline">Privacy Policy</span></p>
          </div>
        )}
      </div>
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: 'info' })}
      />
    </div>
  )
}
