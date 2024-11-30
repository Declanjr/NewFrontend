import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../assets/DriverDisplay.css';

const StaffHome = () => {
  const navigate = useNavigate();
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 3;
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
    rw: {
      dashboardTitle: "Ibikoresho By'ibanze",
      home: "Ahabanza",
      drivers: "Abashoferi",
      shipments: "Ibicuruzwa",
      logout: "Gusohoka",
      chooseLanguage: "Hitamo ururimi",
      driverDashboard: "IBIKORESHO BY'ABASHOFERI",
      insertNewDriver: "Shyiramo Umushoferi Mushya",
      filterByGender: "Shungura ukurikije igitsina",
      male: "Gabo",
      female: "Gore",
      downloadRecords: "Kuramo inyandiko",
      edit: "Hindura",
      delete: "Siba",
    },
    fr: {
      dashboardTitle: "Tableau de bord",
      home: "Accueil",
      drivers: "Chauffeurs",
      shipments: "Expéditions",
      logout: "Se déconnecter",
      chooseLanguage: "Choisir la langue",
      driverDashboard: "TABLEAU DE BORD DES CHAUFFEURS",
      insertNewDriver: "Insérer un nouveau chauffeur",
      filterByGender: "Filtrer par genre",
      male: "Homme",
      female: "Femme",
      downloadRecords: "Télécharger les dossiers",
      edit: "Modifier",
      delete: "Supprimer",
    },    
  };

  const translate = (key) => resources[language][key] || key;

  // Fetch drivers from the backend API
  const fetchDrivers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/Driver');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setDrivers(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setDrivers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  // Delete driver function
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this driver?')) {
      try {
        const response = await fetch(`http://localhost:8080/Driver/${id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Refresh the drivers list after successful deletion
        fetchDrivers();
      } catch (err) {
        setError(err.message);
      }
    }
  };

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

  // ... existing helper functions (handleSearch, handleGenderFilter, etc.) ...

  const handleEdit = (id) => {
    navigate(`/edit-driver/${id}`);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(0); // Reset to the first page
  };

  const handleGenderFilter = (e) => {
    setGenderFilter(e.target.value);
    setCurrentPage(0); // Reset to the first page
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

  const changeLanguage = (e) => {
    setLanguage(e.target.value);
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
              <option value="rw">Kinyarwanda</option>
              <option value="fr">French</option>
            </select>
          </li>
        </ul>
      </div>

      <div className="main-content">
        <h1>{translate("driverDashboard")}</h1>
        
        {error && (
          <div className="alert alert-danger" role="alert">
            {translate("error")}: {error}
          </div>
        )}

        {loading ? (
          <div className="loading">{translate("loading")}</div>
        ) : (
          <>
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
                  <th onClick={() => sortTable("id")}>ID</th>
                  <th onClick={() => sortTable("firstName")}>Names</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Gender</th>
                  <th>Action</th>
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
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={() => handleEdit(driver.id)}
                      >
                        {translate("edit")}
                      </button>
                      <button 
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(driver.id)}
                      >
                        {translate("delete")}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pagination">
              <button 
                onClick={handlePrevPage}
                disabled={currentPage === 0}
              >
                Previous
              </button>
              <button 
                onClick={handleNextPage}
                disabled={(currentPage + 1) * rowsPerPage >= filteredDrivers.length}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StaffHome;