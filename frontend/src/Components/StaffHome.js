import React from 'react';
import '../assets/StaffHome.css'

const StaffHome = () => {
  return (
    <div className="Home-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">Dashboard</div>
        <ul className="sidebar-menu">
          <li><a href="/">Home</a></li>
          <li><a href="/Driver">Drivers</a></li>
          <li><a href="/shipments/index">Shipments</a></li>
          <li><a href="/login">Logout</a></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1>Welcome to the Staff Dashboard</h1>
        <div className="button-group">
          <a href="/Driver" className="btn btn-primary">View Drivers</a>
          <a href="/shipments/index" className="btn btn-secondary">View Shipments</a>
        </div>
      </div>
    </div>
  );
};

export default StaffHome;
