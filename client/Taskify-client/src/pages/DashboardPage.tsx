// src/pages/DashboardPage.tsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"; // Import useAuth
import { useNavigate } from "react-router-dom"; // Import useNavigate

function DashboardPage() {
  // Get auth state and logout function from context

  interface Task {
    id: string;
    title: string;
    description?: string | null;
    completed: boolean;
  }

  const { isAuthenticated, logout, user, token } = useAuth();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoadingTasks, setIsLoadingTasks] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const handleDelete = async (taskId: string) => {
    // Optional: Ask for confirmation
    // if (!window.confirm('Are you sure you want to delete this task?')) {
    //   return;
    // }

    // Find the task title for potential error message (optional)
    const taskToDelete = tasks.find((t) => t.id === taskId);
    const taskTitle = taskToDelete ? `"${taskToDelete.title}"` : "the task";

    // Note: Consider adding specific loading/disabled state for the delete button itself
    // For simplicity now, we'll just handle the main list loading/error states.
    setFetchError(null); // Clear previous errors

    try {
      if (!token) {
        throw new Error("Authentication token not found.");
      }

      const response = await fetch(`/api/tasks/${taskId}`, {
        // Target specific task ID
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        // Try to get error message from backend
        let errorMessage = `Failed to delete ${taskTitle} (status: ${response.status})`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          /* Ignore if response body is not JSON */
        }
        throw new Error(errorMessage);
      }

      // If deletion was successful on the backend, remove from frontend state
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      console.log(`Task ${taskTitle} deleted successfully.`);
    } catch (err: any) {
      console.error(`Error deleting task ${taskTitle}:`, err);
      setFetchError(err.message || `Failed to delete ${taskTitle}.`);
      // Optional: Handle specific auth errors like in fetchTasks if needed
    }
    // Note: No setIsLoadingTasks here unless you want the whole list to show loading
  };

  // Redirect to login if not authenticated when component mounts or auth state changes
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // --- Effect to Fetch Tasks ---
  useEffect(() => {
    // Function to fetch tasks from the backend
    const fetchTasks = async () => {
      // Ensure token exists before attempting fetch
      if (!token) {
        setIsLoadingTasks(false); // Stop loading if no token
        setFetchError("Authentication token not found."); // Set error
        return;
      }

      // Set loading state true, clear previous errors
      setIsLoadingTasks(true);
      setFetchError(null);
      let response: Response | undefined;
      try {
        // Make GET request to the backend tasks endpoint
        response = await fetch("/api/tasks", {
          // Use relative path (proxy handles it)
          method: "GET",
          headers: {
            // IMPORTANT: Include the Authorization header
            Authorization: `Bearer ${token}`,
          },
        });

        // Check if the response status indicates an error
        if (!response.ok) {
          // Try to parse error message from backend if available
          let errorMessage = `HTTP error! status: ${response.status}`;
          try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
          } catch (parseError) {
            // Ignore if response isn't JSON
          }
          throw new Error(errorMessage);
        }

        // Parse the successful JSON response
        const data = await response.json();

        // Ensure the received data has the expected structure
        if (data && Array.isArray(data.data)) {
          setTasks(data.data); // Update tasks state
        } else {
          console.error("Received unexpected data format:", data);
          throw new Error("Received invalid data format for tasks.");
        }
      } catch (err: any) {
        console.error("Failed to fetch tasks:", err);
        setFetchError(err.message || "Failed to load tasks."); // Set error state

        // If error is auth-related (e.g., bad token), log out and redirect
        if (response && (response.status === 401 || response.status === 403)) {
          console.log("Auth error during fetch, logging out.");
          logout();
          // navigate('/login', { replace: true }); // Navigation is handled by the other useEffect
        }
      } finally {
        // Always stop loading once fetch is complete (success or error)
        setIsLoadingTasks(false);
      }
    };

    // Only fetch tasks if we are authenticated (have a token)
    // This check prevents unnecessary fetches if the token isn't ready yet
    if (isAuthenticated && token) {
      fetchTasks();
    } else if (!token && !isAuthenticated) {
      // If loading finishes and there's no token (e.g. expired token removed on load)
      // ensure loading state is false. The other useEffect handles redirect.
      setIsLoadingTasks(false);
    }

    // Dependency array: re-run effect if isAuthenticated or token changes
  }, [isAuthenticated, token, navigate, logout]);

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
      {/* Header Bar */}
      <div className="flex justify-between items-center p-4 border-b bg-white shadow-sm">
        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">{user?.email}</span>
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-4 md:p-6 lg:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Tasks</h2>

        {/* Loading State for Tasks */}
        {isLoadingTasks && (
          <div className="text-center py-10">
            <p className="text-gray-500">Loading tasks...</p>
            {/* Add a spinner here later if desired */}
          </div>
        )}

        {/* Error State for Tasks */}
        {fetchError && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
            role="alert"
          >
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{fetchError}</span>
          </div>
        )}

        {/* Task List Display (only if NOT loading and NO error) */}
        {!isLoadingTasks && !fetchError && (
          <div>
            {tasks.length === 0 ? (
              <div className="text-center py-10 bg-white rounded-lg shadow border border-gray-200">
                <p className="text-gray-500">You have no tasks yet!</p>
                {/* TODO: Add a "Create your first task" button here later */}
              </div>
            ) : (
              <ul className="space-y-4">
                {tasks.map((task) => (
                  // --- Task Item ---
                  <li
                    key={task.id}
                    className="bg-white p-4 rounded-lg shadow border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:shadow-md transition-shadow duration-150 ease-in-out"
                  >
                    <div className="flex-1 mb-3 sm:mb-0 sm:mr-4">
                      <span
                        className={`block font-semibold text-lg ${
                          task.completed
                            ? "line-through text-gray-500"
                            : "text-gray-900"
                        }`}
                      >
                        {task.title}
                      </span>
                      {task.description && (
                        <p
                          className={`text-sm mt-1 ${
                            task.completed ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {task.description}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center space-x-3 flex-shrink-0 w-full sm:w-auto justify-end">
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          task.completed
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {task.completed ? "Done" : "Pending"}
                      </span>
                      {/* TODO: Add Complete/Incomplete toggle button */}
                      <button
                        disabled // Placeholder
                        title="Update Task (coming soon)"
                        className="p-1 text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(task.id)}
                        title="Delete Task"
                        className="p-1 text-red-600 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </li>
                  // --- End Task Item ---
                ))}
              </ul>
            )}
          </div>
        )}

        {/* TODO: Add "Create Task" button/form later */}
      </div>
    </div>
  );
}

export default DashboardPage;
