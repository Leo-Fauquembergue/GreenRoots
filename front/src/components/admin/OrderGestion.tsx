import React, { useEffect, useState } from "react";

interface OrderData {
  id: number;
  date: string;
  etat: string;
  arbres: {
    id: number;
    nom: string;
    quantite: number;
  }[];
  utilisateur: {
    id: number;
    name: string;
    email: string;
  };
}

export default function OrderManagement(): JSX.Element {
  const [orders, setOrders] = useState<OrderData[]>([]);

  useEffect(() => {
    fetch("/api/orders", { credentials: "include" })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur lors du chargement des commandes.");
        }
        return res.json();
      })
      .then((data) => setOrders(data))
      .catch((err) =>
        console.error("Erreur chargement commandes :", err.message)
      );
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">📦 Gestion des commandes</h2>

      {orders.map((order) => (
        <div
          key={order.id}
          className="border border-gray-300 rounded-md p-4 mb-4 shadow-sm bg-white"
        >
          <p className="font-bold text-lg">Commande #{order.id}</p>
          <p className="text-sm text-gray-600">
            Date : {new Date(order.date).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-600">État : {order.etat}</p>
          <p className="text-sm text-gray-600">
            Client : {order.utilisateur.name} ({order.utilisateur.email})
          </p>

          <ul className="mt-2 list-disc list-inside">
            {order.arbres.map((tree) => (
              <li key={tree.id} className="text-sm text-gray-700">
                🌳 {tree.nom} – Quantité : {tree.quantite}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
