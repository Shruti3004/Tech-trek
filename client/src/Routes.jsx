import React, { useEffect, useState } from "react";
import { Routes as Router, Route, Navigate } from "react-router-dom";
import App from "./App";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TimerPage from "./pages/Timer";
import Rules from "./pages/Rules";
import NavbarDashboard from "./components/NavbarDashboard";
import Dashboard from "./pages/Dashboard";
import { getDashboardInfo } from "./api";
import Leaderboard from "./pages/Leaderboard";

const Routes = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getDashboardInfo().then((res) => {
      setUser(res);
      setLoading(false);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Router>
      <Route
        exact
        path="/"
        element={
          <React.Suspense fallback={<Loader />}>
            <App />
            <Footer />
          </React.Suspense>
        }
      />
      <Route
        exact
        path="/login"
        element={
          <React.Suspense fallback={<Loader />}>
            <Login />
            <Footer />
          </React.Suspense>
        }
      />
      <Route
        exact
        path="/register"
        element={
          <React.Suspense fallback={<Loader />}>
            <Signup />
            <Footer />
          </React.Suspense>
        }
      />
      <Route
        exact
        path="/timer"
        element={
          <React.Suspense fallback={<Loader />}>
            <TimerPage />
          </React.Suspense>
        }
      />
      <Route
        path="/rules"
        exact
        element={
          <div className="background min-h-screen">
            <React.Suspense fallback={<Loader />}>
              {loading ? (
                <div className="flex justify-center items-center h-full w-full">
                  <Loader />
                </div>
              ) : (
                <NavbarDashboard user={user} setUser={setUser}>
                  <Rules user={user} />
                </NavbarDashboard>
              )}
            </React.Suspense>
          </div>
        }
      />
      <Route
        path="/dashboard"
        exact
        element={
          <div className="background min-h-screen">
            <React.Suspense fallback={<Loader />}>
              {loading ? (
                <div className="flex justify-center items-center animate-spin h-5 w-5">
                  <Loader />
                </div>
              ) : (
                <NavbarDashboard user={user} setUser={setUser}>
                  <Dashboard user={user} setUser={setUser} />
                </NavbarDashboard>
              )}
            </React.Suspense>
          </div>
        }
      />
      <Route
        path="/leaderboard"
        exact
        element={
          <div className="background min-h-screen">
            <React.Suspense fallback={<Loader />}>
              {loading ? (
                <div className="flex justify-center items-center h-full w-full">
                  <Loader />
                </div>
              ) : (
                <NavbarDashboard user={user} setUser={setUser}>
                  <Leaderboard user={user} />
                </NavbarDashboard>
              )}
            </React.Suspense>
          </div>
        }
      />
      <Route path="*" element={<div>404</div>} />
    </Router>
  );
};

export default Routes;
