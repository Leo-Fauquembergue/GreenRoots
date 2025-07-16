// src/pages/OrderHistory.tsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import api from "../services/api";
import "../style/orderHistory.scss";

// Importez l'interface Order depuis votre fichier de types centralisé
import type { Order } from "../hooks/types"; 

export default function OrderHistory() {
  

  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get<Order[]>("/orders/my-orders");
        setOrders(response.data);

      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 401) {
            setError("Vous devez être connecté pour voir cette page.");
          } else {
            setError(err.response?.data?.message || err.message);
          }
        } else {
          setError("Une erreur inattendue est survenue.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const calculateTotal = (order: Order): number => {
    return order.plantedTrees.reduce((total, tree) => {
      const price = parseFloat(tree.catalogTree.price);
      return total + price; 
    }, 0);
  };

  if (loading) {
    return (
      <p className="min-h-screen text-center pt-10">
        Chargement de l'historique des commandes...
      </p>
    );
  }

  if (error) {
    return (
      <p className="min-h-screen text-center pt-10 text-red-600">
        Erreur : {error}
      </p>
    );
  }

  return (
    <div className="main min-h-screen  p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Mes Commandes</h1>
        {orders.length === 0 ? (
          <p>Vous n'avez pas encore de commande finalisée.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Link
                to={`/orders/${order.orderId}`}
                key={order.orderId}
                className="order-list block bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div>
                    <h2 className=" font-bold text-lg">
                      Commande #{order.orderId}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Date :{" "}
                      {new Date(order.orderDate).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="font-semibold text-xl">
                      {calculateTotal(order).toFixed(2)} €
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}