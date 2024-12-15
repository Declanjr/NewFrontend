import React, { useState, useEffect } from "react";
import "../assets/DriverDisplay.css";

const ShipmentsView = () => {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [shipmentsPerPage] = useState(10);

  useEffect(() => {
    fetchShipments();
  }, []);

  const fetchShipments = async () => {
    try {
      const response = await fetch("https://driverbackend.onrender.com/shipments", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setShipments(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this shipment?")) {
      try {
        const response = await fetch(`https://driverbackend.onrender.com/shipments/delete/${id}`, {
          method: "DELETE",
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Remove the deleted shipment from the state
        setShipments(shipments.filter(shipment => shipment.id !== id));
        alert("Shipment deleted successfully!");
      } catch (err) {
        console.error("Error deleting shipment:", err);
        alert("Failed to delete shipment");
      }
    }
  };

  // Pagination logic
  const indexOfLastShipment = currentPage * shipmentsPerPage;
  const indexOfFirstShipment = indexOfLastShipment - shipmentsPerPage;
  const currentShipments = shipments.slice(indexOfFirstShipment, indexOfLastShipment);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>;
  }

  return (
    <div className="shipments-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="page-title">Shipments List</h2>
        <a href="/shipments/create" className="btn btn-primary">
          Add New Shipment
        </a>
      </div>

      {shipments.length === 0 ? (
        <div className="alert alert-info">No shipments found.</div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Content</th>
                  <th>Sender</th>
                  <th>Receiver</th>
                  <th>Departure Destination</th>
                  <th>Arrival Destination</th>
                  <th>Departure Date</th>
                  <th>Arrival Date</th>
                  <th>Status</th>
                  <th>Cost</th>
                  <th>Driver</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentShipments.map((shipment) => (
                  <tr key={shipment.id}>
                    <td>{shipment.id}</td>
                    <td>{shipment.content}</td>
                    <td>{shipment.sender}</td>
                    <td>{shipment.receiver}</td>
                    <td>{shipment.departuredestination}</td>
                    <td>{shipment.arrivaldestination}</td>
                    <td>{new Date(shipment.departuredate).toLocaleDateString()}</td>
                    <td>{new Date(shipment.arrivaldate).toLocaleDateString()}</td>
                    <td>
                      <span 
                        className={`badge ${
                          shipment.status === 'DELIVERED' ? 'bg-success' :
                          shipment.status === 'IN TRANSIT' ? 'bg-warning' :
                          'bg-secondary'
                        }`}
                      >
                        {shipment.status}
                      </span>
                    </td>
                    <td>${shipment.cost.toLocaleString()}</td>
                    <td>{shipment.driver?.name || 'Unassigned'}</td>
                    <td>
                      <div className="btn-group" role="group">
                        <a 
                          href={`/shipments/edit/${shipment.id}`} 
                          className="btn btn-sm btn-primary"
                        >
                          Edit
                        </a>
                        <button 
                          onClick={() => handleDelete(shipment.id)}
                          className="btn btn-sm btn-danger"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <nav>
            <ul className="pagination justify-content-center">
              {Array.from({ length: Math.ceil(shipments.length / shipmentsPerPage) }).map((_, index) => (
                <li 
                  key={index} 
                  className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                >
                  <button 
                    onClick={() => paginate(index + 1)} 
                    className="page-link"
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </div>
  );
};

export default ShipmentsView;