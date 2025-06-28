import React from "react";

export default function Logout({ onLogout }) {
  const handleLogout = () => {
    console.log("Logout clicked"); // Debugging log
    localStorage.removeItem("jwt-token");
    onLogout();
  };

  return (
    <button
      onClick={handleLogout}
      style={{ cursor: "pointer", background: "none", border: "none" }}
    >
      Logout
    </button>
  );
}