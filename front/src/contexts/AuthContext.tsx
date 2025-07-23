import { createContext, useState, useContext, type ReactNode, useEffect } from 'react';
import api from '../services/api';
import type { User, AuthContextType } from '../hooks/types';

// Création du contexte
const AuthContext = createContext<AuthContextType | null>(null);

// Création du "Provider" qui enveloppera notre application
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Pour gérer le chargement initial

  // Au premier chargement de l'application, on vérifie si une session existe déjà
  useEffect(() => {
    // On crée une route "me" pour vérifier la session actuelle
    api.get('/auth/me')
      .then(response => {
        setUser(response.data.user);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const value = { user, setUser, isLoading };

  if (isLoading) {
    return <div>Chargement de la session...</div>; // Ou un spinner global
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour utiliser facilement le contexte
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};