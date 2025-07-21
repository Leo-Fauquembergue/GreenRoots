import type React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { user, isLoading } = useAuth();

  // 1. On attend que la vérification de session soit terminée
  if (isLoading) {
    return (
      <div className="page-container flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  // 2. Si la vérification est terminée et qu'il n'y a pas d'utilisateur, on redirige vers le login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3. Si des rôles sont spécifiés, on vérifie que l'utilisateur a l'un des rôles autorisés
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // L'utilisateur est connecté mais n'a pas les droits, on le renvoie à l'accueil
    return <Navigate to="/" replace />;
  }

  // 4. Si toutes les vérifications passent, on affiche le contenu de la route
  return <Outlet />;
};

export default ProtectedRoute;