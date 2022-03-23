import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useLocation, Navigate } from "react-router-dom";

import Header from "./components/Header/Header.js";

import Home from "./components/Home/Home.js";
import Dashboard from "./components/Dashboard/Dashboard.js";
import Login from "./components/Login/Login.js";
import Register from "./components/Register/Register.js";

import "./app.css";

function RequireAuth({ children, loggedIn }) {
  const location = useLocation();

  return loggedIn ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
}

export default function App() {
  const [isLoading, setLoaded] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fetch("/api/user/session", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      credentials: "same-origin",
    })
      .then((r) =>
        r.json().then((data) => ({ status: r.status, body: data }))
      )
      .then(function (obj) {
        if (obj.status === 200) {
          setLoggedIn(true);
          setLoaded(!isLoading);
        } else {
          setLoaded(!isLoading);
        }
      });
  }, []); // eslint-disable-line

  return (
    <React.Fragment>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth loggedIn={loggedIn}>
              <Dashboard loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            </RequireAuth>
          }
        />
      </Routes>
    </React.Fragment>
  );
}
