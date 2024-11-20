import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../assets/DriverDisplay.css';

const StaffHome = () => {
  const navigate = useNavigate();
  const [drivers, setDrivers] = useState([]);
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 4;
  const [sortDirection, setSortDirection] = useState(true);
  const [language, setLanguage] = useState("en");

  const resources = {
    en: {
      dashboardTitle: "Dashboard",
      home: "Home",
      drivers: "Drivers",
      shipments: "Shipments",
      logout: "Logout",
      chooseLanguage: "Choose Language",
      driverDashboard: "DRIVER DASHBOARD",
      insertNewDriver: "Insert New Driver",
      filterByGender: "Filter by Gender",
      male: "Male",
      female: "Female",
      downloadRecords: "Download Records",
      edit: "Edit",
      delete: "Delete",
    },
    es: {
      dashboardTitle: "Tablero",
      home: "Inicio",
      drivers: "Conductores",
      shipments: "Envíos",
      logout: "Cerrar sesión",
      chooseLanguage: "Elige idioma",
      driverDashboard: "TABLERO DE CONDUCTORES",
      insertNewDriver: "Insertar nuevo conductor",
      filterByGender: "Filtrar por género",
      male: "Masculino",
      female: "Femenino",
      downloadRecords: "Descargar registros",
      edit: "Editar",
      delete: "Eliminar",
    },
    // Add more languages here
  };

  const translate = (key) => resources[language][key] || key;

  useEffect(() => {
    // Fetch drivers from API or backend (replace with actual API)
    const fetchedDrivers = [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        phone: "123456789",
        address: "123 Main St",
        gender: "Male",
        fileName: "license.pdf",
      },
      {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        phone: "987654321",
        address: "456 Elm St",
        gender: "Female",
        fileName: "certificate.pdf",
      },
      // Add more dummy drivers
    ];
    setDrivers(fetchedDrivers);
  }, []);

  // Filter, Search, and Paginate
  const filteredDrivers = drivers.filter((driver) => {
    const matchesSearch =
      `${driver.firstName} ${driver.lastName} ${driver.phone} ${driver.address}`
        .toLowerCase()
        .includes(search.toLowerCase());
    const matchesGender = genderFilter === "" || driver.gender === genderFilter;
    return matchesSearch && matchesGender;
  });

  const paginatedDrivers = filteredDrivers.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
  );

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(0); // Reset to the first page
  };

  const handleGenderFilter = (e) => {
    setGenderFilter(e.target.value);
    setCurrentPage(0); // Reset to the first page
  };

  const handleNextPage = () => {
    if ((currentPage + 1) * rowsPerPage < filteredDrivers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const sortTable = (column) => {
    const sortedDrivers = [...drivers].sort((a, b) => {
      const valA = a[column];
      const valB = b[column];
      if (column === "id") {
        return sortDirection ? valA - valB : valB - valA;
      }
      return sortDirection
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    });
    setDrivers(sortedDrivers);
    setSortDirection(!sortDirection);
  };

  const changeLanguage = (e) => {
    setLanguage(e.target.value);
  };

  const downloadCSV = () => {
    const headers = ["ID,First Name,Last Name,Phone,Address,Gender"];
    const rows = drivers.map(
      (driver) =>
        `${driver.id},${driver.firstName},${driver.lastName},${driver.phone},${driver.address},${driver.gender}`
    );
    const csvContent = headers.concat(rows).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "drivers.csv";
    link.click();
  };

  return (
    <div className="driver-container">
      <div className="sidebar">
        <div className="sidebar-header">{translate("dashboardTitle")}</div>
        <ul className="sidebar-menu">
          <li>
            <Link to="/">{translate("home")}</Link>
          </li>
          <li>
            <Link to="/Driver">{translate("drivers")}</Link>
          </li>
          <li>
            <Link to="/shipments">{translate("shipments")}</Link>
          </li>
          <li>
            <Link to="/login">{translate("logout")}</Link>
          </li>
          <li>
            <label>{translate("chooseLanguage")}: </label>
            <select id="languageSelect" onChange={changeLanguage}>
              <option value="en">English</option>
              <option value="es">Spanish</option>
              {/* Add more options */}
            </select>
          </li>
        </ul>
      </div>

      <div className="main-content">
        <h1>{translate("driverDashboard")}</h1>
        <div className="actions">
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/create-driver")}
          >
            {translate("insertNewDriver")}
          </button>
        </div>

        <div className="search-filter">
          <input
            type="text"
            placeholder="Search"
            className="form-control"
            value={search}
            onChange={handleSearch}
          />
          <select
            className="form-control"
            value={genderFilter}
            onChange={handleGenderFilter}
          >
            <option value="">{translate("filterByGender")}</option>
            <option value="Male">{translate("male")}</option>
            <option value="Female">{translate("female")}</option>
          </select>

          <button className="btn btn-secondary" onClick={downloadCSV}>
            {translate("downloadRecords")}
          </button>
        </div>

        <table id="driverTable">
          <thead>
            <tr>
              <th onClick={() => sortTable("id")}>{translate("ID")}</th>
              <th onClick={() => sortTable("firstName")}>
                {translate("Names")}
              </th>
              <th>{translate("Phone")}</th>
              <th>{translate("Address")}</th>
              <th>{translate("Gender")}</th>
              <th>{translate("Action")}</th>
            </tr>
          </thead>
          <tbody>
            {paginatedDrivers.map((driver) => (
              <tr key={driver.id}>
                <td>{driver.id}</td>
                <td>{`${driver.firstName} ${driver.lastName}`}</td>
                <td>{driver.phone}</td>
                <td>{driver.address}</td>
                <td>{driver.gender}</td>
                <td>
                  <button className="btn btn-primary btn-sm">
                    {translate("edit")}
                  </button>
                  <button className="btn btn-danger btn-sm">
                    {translate("delete")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button onClick={handlePrevPage}>Previous</button>
          <button onClick={handleNextPage}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default StaffHome;
