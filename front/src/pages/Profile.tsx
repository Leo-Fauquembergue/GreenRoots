import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import type { User } from "../hooks/types";
import "../style/style.scss";

export default function Profile() {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  // --- States ---
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  // --- Récupération des données de session ---
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get<{ user: User | null }>(
          `${apiBaseUrl}/auth/me`,
          {
            withCredentials: true,
          }
        );
        setUser(response.data.user);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Erreur lors du chargement du profil.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // --- Affichage ---
  if (loading) {
    return (
      <p className="min-h-screen flex items-center justify-center text-gray-700">
        Chargement du profil...
      </p>
    );
  }

  if (error) {
    return (
      <p className="min-h-screen flex items-center justify-center text-red-600">
        Erreur : {error}
      </p>
    );
  }

  if (!user) {
    return (
      <p className="min-h-screen flex items-center justify-center text-gray-700">
        Aucun utilisateur connecté.
      </p>
    );
  }

  return (
    <div className="gr-container">
  
        <h2 className="page-title">Profil utilisateur</h2>
        
        {/* Contenu principal en 2 colonnes */}
        <div className="flex flex-col md:flex-row gap-8 my-10">
          
          {/* Infos utilisateur */}
          <section className="flex-1">
            <div className="space-y-4 text-gray-800">
              <p>
                <strong>Nom :</strong> {user?.name}
              </p>
              <p>
                <strong>Email :</strong> {user?.email}
              </p>
              <p>
                <strong>Rôle :</strong> {user?.role}
              </p>
            </div>
          </section>

          {/* Boutons de navigation */}
          <section className="flex-1 flex flex-col justify-center space-y-4">
            <Link
              to="/orders"
              className="block text-center md:text-left px-4 py-3 btn-dark"
            >
              Mes commandes
            </Link>
            <Link
              to="/planted-trees/user"
              className="block text-center md:text-left px-4 py-3 btn-light"
            >
              Mes arbres plantés
            </Link>
          </section>
        </div>
    </div>

  );
}
