import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
}

interface AuthContextType {
  auth: AuthState;
  setAuth: (auth: AuthState) => void;
  isAuthLoading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Correctly exported useAuth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    isAdmin: false,
  });
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const logout = useCallback(() => {
    setAuth({ isAuthenticated: false, isAdmin: false });
    fetch('http://localhost:5000/api/logout', { method: 'POST', credentials: 'include' });
  }, []);

  useEffect(() => {
    const TIMEOUT_DURATION = 15 * 60 * 1000; // 15 minutes
    let timeoutId: NodeJS.Timeout;

    const resetTimeout = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (auth.isAuthenticated && !auth.isAdmin) {
          logout();
          alert("You have been logged out due to inactivity.");
        }
      }, TIMEOUT_DURATION);
    };

    const activityEvents: (keyof WindowEventMap)[] = ['mousemove', 'keydown', 'mousedown', 'touchstart'];

    if (auth.isAuthenticated && !auth.isAdmin) {
      activityEvents.forEach(event => window.addEventListener(event, resetTimeout));
      resetTimeout();
    }

    return () => {
      clearTimeout(timeoutId);
      activityEvents.forEach(event => window.removeEventListener(event, resetTimeout));
    };
  }, [auth, logout]);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/check-auth', { credentials: 'include' });
        if (response.ok) {
          const data = await response.json();
          setAuth({ isAuthenticated: data.isAuthenticated, isAdmin: data.isAdmin });
        } else {
          setAuth({ isAuthenticated: false, isAdmin: false });
        }
      } catch (error) {
        setAuth({ isAuthenticated: false, isAdmin: false });
      } finally {
        setIsAuthLoading(false);
      }
    };
    verifyAuth();
  }, []);

  const value = { auth, setAuth, isAuthLoading, logout };

  return (
    <AuthContext.Provider value={value}>
      {!isAuthLoading && children}
    </AuthContext.Provider>
  );
};
