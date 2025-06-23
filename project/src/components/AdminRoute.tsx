import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { RefreshCw } from 'lucide-react';

const AdminRoute: React.FC = () => {
  const { auth, isAuthLoading } = useAuth();
  const location = useLocation();

  if (isAuthLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center">
          <RefreshCw className="h-8 w-8 animate-spin text-blue-500" />
          <p className="mt-2 text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  if (!auth.isAdmin) {
    // Redirect them to the login page, but save the current location they were
    // trying to go to. This allows us to send them along to that page after they log in,
    // which is a nicer user experience than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default AdminRoute; 