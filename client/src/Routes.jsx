import React from "react";
import { Routes as Router, Route, Navigate } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TimerPage from "./pages/Timer";

const Routes = () => {
  return (
    <Router>
      <Route
        exact
        path="/"
        element={
          <React.Suspense fallback={<div>Loading..</div>}>
            {localStorage.getItem("accessToken") ? (
              <Navigate to="/timer" />
            ) : (
              <App />
            )}
          </React.Suspense>
        }
      />
      <Route
        exact
        path="/login"
        element={
          <React.Suspense fallback={<div>Loading..</div>}>
            <Login />
          </React.Suspense>
        }
      />
      <Route
        exact
        path="/register"
        element={
          <React.Suspense fallback={<div>Loading..</div>}>
            <Signup />
          </React.Suspense>
        }
      />
      <Route
        exact
        path="/timer"
        element={
          <React.Suspense fallback={<div>Loading..</div>}>
            {localStorage.getItem("accessToken") ? (
              <TimerPage />
            ) : (
              <Navigate to="/" />
            )}
          </React.Suspense>
        }
      />
      <Route path="*" element={<div>404</div>} />
    </Router>
  );
};

export default Routes;
