import React from 'react'
import "./CSS/LoginSign.css";

export const LoginSignup = () => {
  return (
    <div className='loginSignup'>
        <div className="loginSignup-container">
            <h1>Sign Up</h1>
            <div className="loginSignup-fields">
                <input type="text" placeholder='Your Name' />
                <input type="email" placeholder='Email Address' />
                <input type="password" placeholder='password' />
            </div>
            <button>Continue</button>
            <hr className='divider' />
            <p className='loginSignup-login'>Already have an account? <span>Log In</span></p>
            <div className='loginSignup-agree'>
                <input type="checkbox" name='' id='' />
                <p>I agree to the <span>Terms of Service</span> and <span>Privacy Policy</span></p>
            </div>
        </div>
        <hr />
    </div>
  )
}
