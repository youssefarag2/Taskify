// src/components/Sidebar.tsx
import React from "react";
// Use NavLink for automatic active class styling
import { NavLink } from "react-router-dom";

function Sidebar() {
  // Helper function to conditionally apply classes for active links
  const navLinkClasses = ({ isActive }: { isActive: boolean }): string =>
    `flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors duration-150 ease-in-out ${
      isActive
        ? "bg-gray-900 text-white" // Active link style
        : "text-gray-300 hover:bg-gray-700 hover:text-white" // Inactive link style
    }`;

  return (
    // Sidebar container: Fixed width, background, text color, full height, padding
    <div className="w-60 flex-shrink-0 bg-gray-800 text-gray-100 h-screen flex flex-col p-4 space-y-4">
      {/* App Logo/Name Section */}
      <div className="flex items-center justify-center pt-4 pb-6 border-b border-gray-700">
        {/* Reusing the logo idea from LoginPage */}
        <div className="text-indigo-500 mr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
        </div>
        <span className="text-xl font-bold text-white">Taskify</span>
      </div>

      {/* Navigation Links */}
      <nav className="mt-6 flex-1">
        {" "}
        {/* flex-1 pushes items below it down */}
        <NavLink to="/dashboard" end className={navLinkClasses}>
          {/* Example Icon Placeholder */}
          {/* <svg className="h-5 w-5 mr-3" ... /> */}
          <span>Tasks</span>
        </NavLink>
        <NavLink to="/dashboard/completed" className={navLinkClasses}>
          {/* <svg className="h-5 w-5 mr-3" ... /> */}
          <span>Completed</span>
        </NavLink>
        <NavLink to="/settings" className={navLinkClasses}>
          {/* <svg className="h-5 w-5 mr-3" ... /> */}
          <span>Settings</span>
        </NavLink>
      </nav>

      {/* Optional: User Info / Logout area at the bottom */}
      {/* <div className="mt-auto border-t border-gray-700 pt-4">
         User Info / Logout Button
      </div> */}
    </div>
  );
}

export default Sidebar;
