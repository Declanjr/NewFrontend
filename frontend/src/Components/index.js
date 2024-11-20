import React from "react";
import { Link } from "react-router-dom";
import "../assets/index.css";

const Home = () => {
  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Add logic for contact form submission
    console.log("Contact form submitted");
  };

  return (
    <>
      {/* Header */}
      <header>
        <div className="container">
          <h1>Welcome to Our Logistics Company</h1>
          <nav>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/services" className="nav-link">Services</Link>
            <Link to="/charts" className="nav-link">Logistics Statistics</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Company Overview Section */}
        <section id="overview" className="section">
          <div className="container">
            <h2>Reliable Logistics Services</h2>
            <p>
              We offer fast, reliable, and secure logistics solutions for
              businesses of all sizes. Our team is dedicated to ensuring your
              goods are transported safely and on time.
            </p>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="section">
          <div className="container">
            <h2>Our Services</h2>
            <div className="services-grid">
              <div className="service">
                <i className="fas fa-truck"></i>
                <h3>Freight Transportation</h3>
                <p>
                  We provide efficient and cost-effective freight transportation
                  for a variety of industries.
                </p>
              </div>
              <div className="service">
                <i className="fas fa-warehouse"></i>
                <h3>Warehouse Solutions</h3>
                <p>
                  Our secure warehouses are equipped to store your goods safely
                  and efficiently.
                </p>
              </div>
              <div className="service">
                <i className="fas fa-shipping-fast"></i>
                <h3>Express Delivery</h3>
                <p>
                  Get your packages delivered quickly with our express delivery
                  service.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact" className="section">
          <div className="container">
            <h2>Contact Us</h2>
            <form
              onSubmit={handleContactSubmit}
              className="contact-form"
            >
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" required />

              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />

              <label htmlFor="message">Message:</label>
              <textarea id="message" name="message" rows="5" required></textarea>

              <button type="submit">Send Message</button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <div className="container">
          <p>&copy; 2024 Logistics Company. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Home;
