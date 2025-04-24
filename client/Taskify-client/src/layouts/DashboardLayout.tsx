// src/layouts/DashboardLayout.tsx
import React from "react";
import { Outlet } from "react-router-dom"; // Import Outlet
import Sidebar from "../components/Sidebar";
function DashboardLayout() {
  return (
    // Use Flexbox to create sidebar + main content structure
    <div className="flex h-screen bg-gray-100">
      {" "}
      {/* Full screen height */}
      {/* Sidebar Component */}
      <Sidebar />
      {/* Main Content Area (Takes remaining space) */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Optional: Header bar within the main content area */}
        {/* You could add a search bar or user menu here later */}
        {/* <header className="bg-white shadow-sm h-16"> Header Content </header> */}

        {/* Page Content */}
        {/* Outlet renders the component matched by the nested child routes */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
