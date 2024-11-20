import React, { useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";
import "../assets/charts.css";
import {Link} from "react-router-dom"

const Dashboard = () => {
  useEffect(() => {
    // Any additional effects can go here if needed in the future
  }, []);

  // Data for Bar Chart (Shipment Volume)
  const shipmentData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Shipment Volume",
        data: [1200, 1900, 1700, 1600, 2100, 1800],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Data for Line Chart (Delivery Performance)
  const deliveryData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "On-Time Delivery Rate (%)",
        data: [95, 93, 97, 96, 98, 97],
        fill: true,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="container-fluid py-4 bg-light">
      {/* Header */}
      <div className="row mb-4">
        <div className="col text-center">
          <h1 className="text-primary">Company Performance</h1>
          <p className="text-muted">Real-time logistics and shipment analytics</p>
        </div>
      </div>

      <button 
      className="btn btn-primary"
      >
        <Link to="/" className="returnlink">Return to HomePage</Link>
      </button>

      {/* KPI Cards */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card dashboard-card">
            <div className="card-body text-center">
              <div className="kpi-value text-success">98.5%</div>
              <div className="kpi-label">On-Time Delivery Rate</div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card dashboard-card">
            <div className="card-body text-center">
              <div className="kpi-value text-info">24</div>
              <div className="kpi-label">Active Shipments</div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card dashboard-card">
            <div className="card-body text-center">
              <div className="kpi-value text-warning">2.3 days</div>
              <div className="kpi-label">Average Delivery Time</div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="row">
        <div className="col-md-6">
          <div className="card dashboard-card">
            <div className="card-body">
              <h5 className="card-title">Monthly Shipment Volume</h5>
              <div className="chart-container">
                <Bar data={shipmentData} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card dashboard-card">
            <div className="card-body">
              <h5 className="card-title">Delivery Performance</h5>
              <div className="chart-container">
                <Line data={deliveryData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
