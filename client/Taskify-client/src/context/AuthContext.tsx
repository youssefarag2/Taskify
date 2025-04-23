import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";

// Define the shape of the context data
interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  login: (newToken: string) => void;
  logout: () => void;
}

interface JwtPayload {
  userId: string;
  email: string;
  iat?: number; // Issued at (standard JWT claim, optional)
  exp?: number; // Expiration time (standard JWT claim, optional)
}

// Define the shape of the user object we'll store in state
interface User {
  userId: string;
  email: string;
}

const AuthContext = createContext<AuthContextType>(null!);

export function useAuth() {
  return useContext(AuthContext);
}

// Create the Provider component
interface AuthProviderProps {
  children: ReactNode; // Type for children prop
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null); // <-- State for user info

  // Decode token and set user state
  const processToken = (tokenToProcess: string | null) => {
    if (tokenToProcess) {
      try {
        const decoded = jwtDecode<JwtPayload>(tokenToProcess);
        // Optional: Check token expiration (decoded.exp) here if needed
        setUser({ userId: decoded.userId, email: decoded.email });
        setToken(tokenToProcess);
      } catch (error) {
        console.error("Failed to decode token:", error);
        // Invalid token, clear storage and state
        localStorage.removeItem("authToken");
        setUser(null);
        setToken(null);
      }
    } else {
      // No token
      setUser(null);
      setToken(null);
    }
  };

  // Check localStorage for token on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    console.log("AuthProvider Mounted - Stored Token:", storedToken); // Debug log
    processToken(storedToken);
  }, []); // Empty dependency array means this runs only once on mount

  const login = (newToken: string) => {
    localStorage.setItem("authToken", newToken);
    processToken(newToken);
    setToken(newToken);
    // Navigation should still happen in the LoginPage component after calling login
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
    setUser(null); // <-- Clear user state on logout
    console.log("Logged out"); // Debug log
  };

  const isAuthenticated = !!token;
  // Value provided to consuming components
  const value = {
    isAuthenticated,
    user,
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
