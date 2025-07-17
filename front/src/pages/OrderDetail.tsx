

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import api from '../services/api'; 
import type { Order } from '../hooks/types'; 
import "../style/OrderDetails.scss";

export default function OrderDetailPage() {

  const { orderId } = useParams<{ orderId: string }>();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Si orderId n'est pas défini, on ne fait rien.
    if (!orderId) {
      setLoading(false);
      setError("ID de commande manquant.");
      return;
    }

    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get<Order>(`/orders/${orderId}`);
        setOrder(response.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 404) {
            setError("Cette commande n'a pas été trouvée.");
          } else if (err.response?.status === 403) {
            setError("Vous n'êtes pas autorisé à voir cette commande.");
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

    fetchOrderDetails();
  }, [orderId]); // L'effet se redéclenche si l'ID dans l'URL change

  const calculateTotal = (currentOrder: Order): number => {
    return currentOrder.plantedTrees.reduce((total, tree) => {
      return total + parseFloat(tree.catalogTree.price);
    }, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Chargement des détails de la commande...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        <p>Erreur : {error}</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Aucune donnée de commande à afficher.</p>
      </div>
    );
  }
  
  // --- Affichage des détails ---
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className=" order-detail-container max-w-4xl mx-auto">
        <Link to="/orders" className="return-to-orders mb-6 inline-block">
          ← Retour à l'historique
        </Link>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* En-tête de la commande */}
          <div className="flex flex-col sm:flex-row justify-between items-start border-b border-gray-400 pb-4 mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-700">
                Détail de la Commande #{order.orderId}
              </h1>
              <p className="text-sm text-gray-500">
                Passée le {new Date(order.orderDate).toLocaleDateString('fr-FR', {
                  day: 'numeric', month: 'long', year: 'numeric'
                })}
              </p>
            </div>
            <div className="text-left sm:text-right mt-4 sm:mt-0">
              <p className="font-semibold text-2xl text-gray-700">
                Total : {calculateTotal(order).toFixed(2)} €
              </p>
            </div>
          </div>
          
          {/* Liste des arbres */}
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Arbres inclus dans cette commande
          </h2>
          <div className="space-y-4">
            {order.plantedTrees.map((plantedTree) => (
              <div key={plantedTree.plantedTreeId} className="flex items-center gap-6 p-4 border border-gray-300 rounded-md">
                <img 
                  src={plantedTree.catalogTree.image} 
                  alt={plantedTree.catalogTree.commonName}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-grow">
                  <h3 className="tree-title font-bold text-lg">{plantedTree.catalogTree.commonName}</h3>
                  <p className="text-sm text-gray-600 italic">{plantedTree.catalogTree.scientificName}</p>
                </div>
                <p className="font-semibold text-lg">
                  {parseFloat(plantedTree.catalogTree.price).toFixed(2)} €
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}