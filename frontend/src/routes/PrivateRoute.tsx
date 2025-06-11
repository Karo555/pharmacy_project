import { Navigate } from 'react-router-dom';
import { useAuth } from '@/auth/AuthProvider';
import { ReactNode } from 'react';

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
}
