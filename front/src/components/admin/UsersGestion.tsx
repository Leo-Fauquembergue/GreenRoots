import React, { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function UserManagement(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("/api/users", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Erreur chargement utilisateurs :", err));
  }, []);

  async function deleteUser(id: number) {
    const res = await fetch(`/api/users/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (res.ok) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } else {
      alert("Erreur lors de la suppression.");
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">👤 Gestion des utilisateurs</h2>
      <ul className="space-y-4">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex justify-between items-center border rounded p-4 bg-white shadow"
          >
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-500">Rôle : {user.role}</p>
            </div>
            <button
              onClick={() => deleteUser(user.id)}
              className="text-red-600 hover:text-red-800 font-medium"
            >
              🗑️ Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
