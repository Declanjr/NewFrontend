import React, { useState } from 'react';
import '../assets/signup.css'

const Signup = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    dob: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Destructure form data
    const { firstName, lastName, email, username, dob, phone, password, confirmPassword } = formData;

    // Check if all fields are filled
    if (!firstName || !lastName || !email || !username || !dob || !phone || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Construct data to send
    const data = {
      firstName,
      lastName,
      email,
      username,
      dob,
      phone,
      password
    };

    // Send data to server (replace '/signup' with your API endpoint)
    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.ok) {
          alert("Registration successful!");
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            dob: '',
            phone: '',
            password: '',
            confirmPassword: ''
          }); // Clear form on success
        } else {
          alert("Registration failed. Please try again.");
        }
      })
      .catch(error => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      });
  };

  return (
    <div className="signup-container">
    <div className="signup-card">
      <h2 className="signup">SIGN UP</h2>
      <form id="signup" onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="fname"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter First Name"
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="lname"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter Last Name"
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Email"
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter Username"
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="date"
            className="form-control"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            placeholder="Enter Date of Birth"
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="tel"
            className="form-control"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter Phone Number"
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter Password"
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            id="passwordcon"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
          />
        </div>

        <section className="links">
          <button type="submit" className="btn btn-primary" id="submit">
            Submit
          </button>
          <article className="register">
            Already Have an Account? <a href="/login">Log in</a>
          </article>
        </section>
      </form>
    </div>
    </div>
  );
};

export default Signup;
