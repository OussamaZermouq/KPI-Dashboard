import "./App.css";
import React, { useState, useEffect } from "react";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./service/Login";
import Signup from "./service/Signup";
import OptionsMenu from "./components/dashboard/components/OptionsMenu";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignup, setShowSignup] = useState(false); // State to toggle between Login and Signup

  useEffect(() => {
    const token = localStorage.getItem("jwt-token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    console.log("User logged out"); // Debugging log
    localStorage.removeItem("jwt-token"); // Clear the token from localStorage
    setIsAuthenticated(false); // Update the state to redirect to login
  };

  const handleSignup = () => {
    setShowSignup(false); // Hide the signup form after successful signup
  };

  return (
    <div className="App">
      {!isAuthenticated ? (
        showSignup ? (
          <Signup onClose={() => setShowSignup(false)} onSignup={handleSignup} />
        ) : (
          <Login onLogin={handleLogin} onShowSignup={() => setShowSignup(true)} />
        )
      ) : (
        <Dashboard onLogout={handleLogout} />
      )}
      {isAuthenticated && <OptionsMenu onLogout={handleLogout} />}
    </div>
  );
}

export default App;
