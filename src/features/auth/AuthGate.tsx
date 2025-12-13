import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { login } from './authService';
import { useAuth } from './AuthProvider';

interface AuthGateProps {
  children: React.ReactNode;
}

export const AuthGate: React.FC<AuthGateProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      void login({ redirectUri: `${window.location.origin}${location.pathname}${location.search}` });
    }
  }, [isAuthenticated, location]);

  useEffect(() => {
    if (isAuthenticated && location.pathname === '/login') {
      navigate('/');
    }
  }, [isAuthenticated, location, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export const RoleGate: React.FC<{
  allowedRoles: string[];
  children: React.ReactNode;
}> = ({ allowedRoles, children }) => {
  const { roles } = useAuth();
  const hasRole = allowedRoles.some((role) => roles.includes(role));
  if (!hasRole) {
    return <div className="card">You need additional permissions to view this area.</div>;
  }
  return <>{children}</>;
};
