import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  switch (user.role) {
    case 'admin':
      return <Navigate to="/admin" />;
    case 'mesero':
      return <Navigate to="/mesero" />;
    case 'cajero':
      return <Navigate to="/cajero" />;
    default:
      return <div>Rol no reconocido</div>;
  }
};

export default Dashboard;