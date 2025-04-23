// src/pages/DashboardPage.tsx
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // Import useAuth
import { useNavigate } from "react-router-dom"; // Import useNavigate

function DashboardPage() {
  // Get auth state and logout function from context
  const { isAuthenticated, logout, user } = useAuth();
  // Get navigate function from router
  const navigate = useNavigate();

  // --- Protected Route Logic ---
  // Redirect to login if not authenticated when component mounts or auth state changes
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);
  // --- End Protected Route Logic ---

  // --- Logout Handler ---
  const handleLogout = () => {
    logout(); // Call the logout function from context (clears state & localStorage)
    // Navigate AFTER clearing the auth state
    navigate("/login", { replace: true }); // Redirect to login page
  };
  // --- End Logout Handler ---

  // Don't render the rest if not authenticated (optional, effect handles redirect)
  // if (!isAuthenticated) {
  //   return null; // Or a loading indicator
  // }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-6">Dashboard</h1>
      <p className="text-center"> Welcome, {user?.email || "User"}</p>

      {/* Logout Button */}
      <div className="mt-8 text-center">
        <button
          onClick={handleLogout} // Call handleLogout on click
          className="px-4 py-2 bg-red-600 text-white rounded-md shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default DashboardPage;
