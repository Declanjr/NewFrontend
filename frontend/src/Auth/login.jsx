import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../assets/login.css';

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(loginData)
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log('Login successful:', data);
        // Store user info if needed
        localStorage.setItem('username', data.username);
        navigate('/Home');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="card">
        <h2 className="login">LOGIN PAGE</h2>
        
        {/* Error Message Display */}
        {error && (
          <div className="alert alert-danger" role="alert">
            <span>{error}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label"></label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              placeholder="Enter Username"
              value={loginData.username}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="password" className="form-label"></label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="*******"
              value={loginData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <Link to="/forgot">Forgot Password</Link>
          <br />
          
          <section className="links">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            
            <article className="register">
              Don't have an Account? <Link to="/signup">SIGN UP</Link>
            </article>
          </section>
        </form>
      </div>
    </div>
  );
};

export default Login;