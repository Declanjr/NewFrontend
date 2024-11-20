import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../assets/login.css';

const Login = () => {
  const [error, setError] = useState(null); // To manage error messages if any

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log("Form submitted");
  };

  return (
    <div className="login-container">
    
    <div className="card">
      <h2 className="login">LOGIN PAGE</h2>

      {/* Error Message Display */}
      {error && (
        <div className="alert alert-danger" role="alert">
          <span>{error || "Invalid username or password"}</span>
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
