import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditDriver = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [driver, setDriver] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    gender: ''
  });
  const [error, setError] = useState(null);

  // Fetch driver details
  useEffect(() => {
    const fetchDriver = async () => {
      try {
        const response = await fetch(`http://localhost:8080/Driver/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch driver details');
        }
        const data = await response.json();
        setDriver(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchDriver();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDriver(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/Driver/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(driver)
      });

      if (!response.ok) {
        throw new Error('Failed to update driver');
      }

      // Redirect to driver list after successful update
      navigate('/Driver');
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <h2>Edit Driver</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            value={driver.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            value={driver.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={driver.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={driver.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <select
            className="form-control"
            name="gender"
            value={driver.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Update Driver</button>
        <button 
          type="button" 
          className="btn btn-secondary" 
          onClick={() => navigate('/Driver')}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditDriver;