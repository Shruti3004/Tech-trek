import React from "react";
import { Routes as Router, Route } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const Routes = () => {
  return (
    <Router>
      <Route
        exact
        path="/"
        element={
          <React.Suspense fallback={<div>Loading..</div>}>
            <App />
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
        path="/signup"
        element={
          <React.Suspense fallback={<div>Loading..</div>}>
            <Signup />
          </React.Suspense>
        }
      />
      <Route path="*" element={<div>404</div>} />
    </Router>
  );
};

export default Routes;
