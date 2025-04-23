import { response } from "express";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    // If the user is already authenticated (token exists and is recognized by AuthContext),
    // redirect them away from the login page to the dashboard.
    if (isAuthenticated) {
      console.log("User already authenticated, redirecting to dashboard...");
      navigate("/dashboard", { replace: true }); // Use replace: true
    }
  }, [isAuthenticated, navigate]); // Dependency array

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null); // Clear previous errors

    // Prevent login attempt if already authenticated (optional, belt-and-suspenders)
    if (isAuthenticated) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.message || `HTTP error! status: ${response.status}`
        );
      }

      if (data.token) {
        login(data.token);
        navigate("/dashboard");
      } else {
        setError("Login successful, but no token received.");
        setIsLoading(false);
        return;
      }
    } catch (err: any) {
      console.error("Login failed:", err);
      setError(err.message || "Failed to login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg space-y-6">
        {/* Changed Header Section to use Flexbox */}
        <div className="flex flex-col items-center">
          {" "}
          {/* Center the whole block */}
          <div className="flex items-center justify-center mb-3">
            {" "}
            {/* Logo + Title Row */}
            <div className="text-indigo-600 mr-3">
              {" "}
              {/* Added right margin to logo */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-9 w-9" // Slightly smaller logo
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
            <h1 className="text-3xl font-extrabold text-gray-900 font-mono">
              Taskify
            </h1>
          </div>
          <p className="text-sm text-gray-600 font-mono">
            {" "}
            {/* Subtitle remains centered below */}
            Log in to continue
          </p>
        </div>

        {error && (
          <p className="text-center text-sm text-red-600 mb-4">{error}</p>
        )}

        <form className="space-y-6" onSubmit={handleLoginSubmit}>
          <div>
            <label htmlFor="email" className="sr-only">
              Email Address
            </label>{" "}
            {/* Added sr-only for screen readers */}
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>{" "}
            {/* Added sr-only for screen readers */}
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassowrd(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
