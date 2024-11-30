import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./Pages/index";
import Login from "./Auth/login"
import Charts from "./Pages/charts"
import Signup from "./Auth/signup";
import Home from "./Pages/StaffHome"
import Driver from "./Pages/DriverDisplay"
import CreateDriver from "./Pages/DriverCreate"
import NotFound from "./Pages/404";
import ProtectedRoute from "./Routes/ProtectedRoute";
import DriverEdit from "./Pages/DriverEdit";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/charts" element={<Charts />} />
        <Route path="/signup" element={<Signup />} />
        {/* Protected Route */}
        <Route 
          path="/Home" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />

        <Route path="/driver" element={
          <ProtectedRoute>
            <Driver />
          </ProtectedRoute>
          } />

        <Route path="/create-driver" element={
          <ProtectedRoute>
            <CreateDriver />
          </ProtectedRoute>
          } />

        <Route path="/edit-driver/:id" element={
          <ProtectedRoute>
            <DriverEdit />
          </ProtectedRoute>
          } />
          
        {/* Default Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

