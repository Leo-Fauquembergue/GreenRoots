import React, { useState, useEffect, FormEvent } from "react";
import CommandeGestion from "../components/admin/OrderGestion";
import UtilisateurGestion from "../components/admin/UsersGestion";
import CatalogueGestion from "../components/admin/CatalogGestion";

import { User, LogOut, ShoppingCart, Users, TreePine  } from "lucide-react";

// === Types ===
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

type AdminTab = "commandes" | "utilisateurs" | "catalogue";

interface ApiUserResponse {
  user: User | null;
}

interface ApiLoginResponse {
  user?: User;
  message?: string;
}

// === Page principale ===

export default function AdminPage(): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<AdminTab>("commandes");

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then((res) => res.json())
      .then((data: ApiUserResponse) => {
        if (data.user) setUser(data.user);
      })
      .catch(() => {
        /* ignore */
      });
  }, []);

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data: ApiLoginResponse = await res.json();

    if (!res.ok || !data.user) {
      setError(data.message ?? "Échec de connexion");
    } else {
      setUser(data.user);
    }
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
            <User size={28} className="text-green-600" /> Connexion Admin
          </h2>
          {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition-colors"
            >
              Se connecter
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md flex justify-between items-center px-8 py-5">
        <div>
          <h1 className="text-3xl font-extrabold text-green-700 flex items-center gap-3">
            <User size={36} /> Admin – GreenRoots
          </h1>
          <p className="text-gray-600 mt-1">
            Connecté en tant que <strong>{user.name}</strong> ({user.role})
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-5 rounded-md transition-colors"
        >
          <LogOut size={20} />
          Déconnexion
        </button>
      </header>

      <nav className="bg-white shadow-sm flex justify-center space-x-6 py-4">
        <button
          onClick={() => setTab("commandes")}
          className={`flex items-center gap-2 px-5 py-2 rounded-md font-medium transition-colors ${
            tab === "commandes"
              ? "bg-green-600 text-white shadow-lg"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <ShoppingCart size={20} />
          Commandes
        </button>
        <button
          onClick={() => setTab("utilisateurs")}
          className={`flex items-center gap-2 px-5 py-2 rounded-md font-medium transition-colors ${
            tab === "utilisateurs"
              ? "bg-green-600 text-white shadow-lg"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <Users size={20} />
          Utilisateurs
        </button>
        <button
          onClick={() => setTab("catalogue")}
          className={`flex items-center gap-2 px-5 py-2 rounded-md font-medium transition-colors ${
            tab === "catalogue"
              ? "bg-green-600 text-white shadow-lg"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <TreePine size={20} />
          Catalogue
        </button>
      </nav>

      <main className="p-8 max-w-7xl mx-auto">
        {tab === "commandes" && <CommandeGestion />}
        {tab === "utilisateurs" && <UtilisateurGestion />}
        {tab === "catalogue" && <CatalogueGestion />}
      </main>
    </div>
  );
}
