import React, { useState } from 'react';
import './LoginPage.css'; // Import the CSS file

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Email validation
  const validateUsername = (username) =>
    /^[a-z](?=.*[0-9])[a-z0-9]{5,11}$/.test(username);
  

  const handleLogin = () => {
    const newErrors = {};

    // Validate Email or Username
    if (!email.trim() && !username.trim()) {
      newErrors.general = 'Please provide either Email or Username';
    } else {
      if (email.trim() && !validateEmail(email)) {
        newErrors.email = 'Invalid email format';
      }
      if (username.trim() && !validateUsername(username)) {
        newErrors.username =
          'Username must start with a lowercase letter, be 6-12 characters long, and contain no special characters.';
      }
    }

    // Validate Password
    if (!password.trim()) {
      newErrors.password = 'Please enter your password';
    }

    setErrors(newErrors);

    // If no errors, proceed with login
    if (Object.keys(newErrors).length === 0) {
      console.log('Email:', email || 'N/A');
      console.log('Username:', username || 'N/A');
      console.log('Password:', password);
      // Add your login logic here
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h1 className="login-title">Log in</h1>
        {errors.general && <p className="error-text">{errors.general}</p>}
        
          <input
            type="email"
            placeholder="Email ID"
            className="form-input"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setUsername(''); // Clear username if email is being entered
            }}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        
        <div className="separator">--------------- or ---------------</div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Username"
            className="form-input"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setEmail(''); // Clear email if username is being entered
            }}
          />
          {errors.username && <p className="error-text">{errors.username}</p>}
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>
        <button className="login-button" onClick={handleLogin}>
          Log In
        </button>
        <div className="info-icon">
          ℹ️ Login with your email id or username
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
