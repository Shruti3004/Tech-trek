import React from "react";
import { Routes as Router, Route } from "react-router-dom";
import App from "./App";

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
      <Route path="*" element={<div>404</div>} />
    </Router>
  );
};

export default Routes;
