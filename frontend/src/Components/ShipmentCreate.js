import React, { useState } from "react";
import "../assets/DriverCreate.css";

const AddShipmentForm = () => {
  const [formData, setFormData] = useState({
    content: "",
    sender: "",
    receiver: "",
    departuredestination: "",
    arrivaldestination: "",
    departuredate: "",
    arrivaldate: "",
    status: "",
    cost: "",
    driver: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://driverbackend.onrender.com/shipments/create", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || `Error: ${response.status}`);
      }

      // Clear form after successful submission
      setFormData({
        content: "",
        sender: "",
        receiver: "",
        departuredestination: "",
        arrivaldestination: "",
        departuredate: "",
        arrivaldate: "",
        status: "",
        cost: "",
        driver: ""
      });

      alert("Shipment added successfully!");
      window.location.href = "/shipments";
    } catch (err) {
      setError(err.message || "Failed to add shipment. Please try again.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add New Shipment</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <input
            type="text"
            className="form-control"
            id="content"
            name="content"
            placeholder="Shipment Content"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="sender" className="form-label">
            Sender
          </label>
          <input
            type="text"
            className="form-control"
            id="sender"
            name="sender"
            placeholder="Sender Name"
            value={formData.sender}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="receiver" className="form-label">
            Receiver
          </label>
          <input
            type="text"
            className="form-control"
            id="receiver"
            name="receiver"
            placeholder="Receiver Name"
            value={formData.receiver}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="departuredestination" className="form-label">
            Departure Destination
          </label>
          <input
            type="text"
            className="form-control"
            id="departuredestination"
            name="departuredestination"
            placeholder="Departure Destination"
            value={formData.departuredestination}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="arrivaldestination" className="form-label">
            Arrival Destination
          </label>
          <input
            type="text"
            className="form-control"
            id="arrivaldestination"
            name="arrivaldestination"
            placeholder="Arrival Destination"
            value={formData.arrivaldestination}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="departuredate" className="form-label">
            Departure Date
          </label>
          <input
            type="date"
            className="form-control"
            id="departuredate"
            name="departuredate"
            value={formData.departuredate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="arrivaldate" className="form-label">
            Arrival Date
          </label>
          <input
            type="date"
            className="form-control"
            id="arrivaldate"
            name="arrivaldate"
            value={formData.arrivaldate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <select
            className="form-select"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Status
            </option>
            <option value="IN TRANSIT">In Transit</option>
            <option value="DELIVERED">Delivered</option>
            <option value="PENDING">Pending</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="cost" className="form-label">
            Cost
          </label>
          <input
            type="number"
            className="form-control"
            id="cost"
            name="cost"
            placeholder="Shipment Cost"
            value={formData.cost}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="driver" className="form-label">
            Driver
          </label>
          <input
            type="text"
            className="form-control"
            id="driver"
            name="driver"
            placeholder="Driver Name"
            value={formData.driver}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
          <a href="/shipments" className="btn btn-outline-secondary">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
};

export default AddShipmentForm;