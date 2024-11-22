import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/signup.css'

const Signup = () => {
  const navigate = useNavigate();
  // State for form fields
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    date: '',
    number: '',
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
    const { firstname, lastname, email, username, date, number, password, confirmPassword } = formData;

    // Check if all fields are filled
    if (!firstname || !lastname || !email || !username || !date || !number || !password || !confirmPassword) {
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
      firstname,
      lastname,
      email,
      username,
      date: new Date(date), // Convert date to Date object
      number: parseInt(number), // Convert to number
      password
    };

    // Send data to server
    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.ok) {
          return response.json(); // Parse the response
        }
        throw new Error('Registration failed');
      })
      .then(savedUser => {
        alert("Registration successful!");
        navigate('/login');
        console.log('Saved user:', savedUser);
        // Reset form
        setFormData({
          firstname: '',
          lastname: '',
          email: '',
          username: '',
          date: '',
          number: '',
          password: '',
          confirmPassword: ''
        });
      })
      .catch(error => {
        console.error("Error:", error);
        alert(error.message || "An error occurred. Please try again.");
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
            name="firstname"
            value={formData.firstname}
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
            name="lastname"
            value={formData.lastname}
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
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            placeholder="Enter Date of Birth"
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="tel"
            className="form-control"
            id="number"
            name="number"
            value={formData.number}
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