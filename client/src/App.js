import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useLocation, Navigate } from "react-router-dom";

import Header from "./components/Header/Header.js";

import Home from "./components/Home/Home.js";
import Dashboard from "./components/Dashboard/Dashboard.js";
import Login from "./components/Login/Login.js";
import Register from "./components/Register/Register.js";

import "./app.css";

function RequireAuth({ children }) {
  const location = useLocation();

  return true ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
}

export default function App() {
  const [isLoading, setLoaded] = useState(true);

  useEffect(() => {
    setLoaded(!isLoading);
  }, []); // eslint-disable-line

  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
      </Routes>
    </React.Fragment>
  );
}
