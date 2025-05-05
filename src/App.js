import "./App.css";
import React, { useState, useEffect } from "react";
import Dashboard from "./components/dashboard/Dashboard";
import LoginComponent from "./components/dashboard/components/custom/LoginComponent";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SingupComponent from "./components/dashboard/components/custom/SignupComponent";
import TestComponent from "./components/dashboard/components/custom/test";
import UsersPage from "./components/users/Users";
import {
  createTheme,
  ThemeProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from '@mui/material/styles';
import { CssVarsProvider as JoyCssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/material/CssBaseline';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt-token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const ProtectedRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem("jwt-token");
    return isAuthenticated ? children : <Navigate to="/login" replace />;
  };
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/signup" element={<SingupComponent />} />
        <Route path="/test" element={<TestComponent />} />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <UsersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
