import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import api from "../services/api";
import type { PlantedTree } from "../hooks/types";

export default function PlantedTreesPage() {
  const [plantedTrees, setPlantedTrees] = useState<PlantedTree[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPlantedTrees = async () => {
      try {
        const response = await api.get<PlantedTree[]>("/planted-trees/user");
        setPlantedTrees(response.data);
      } catch (err: unknown) {
        setError("Erreur lors du chargement des arbres plantés.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlantedTrees();
  }, []);

  if (loading) {
    return (
      <p className="min-h-screen flex items-center justify-center text-center pt-28">
        Chargement des arbres plantés...
      </p>
    );
  }

  if (error) {
    return (
      <p className="min-h-screen flex items-center justify-center text-center pt-28 text-red-600">
        {error}
      </p>
    );
  }

  if (plantedTrees.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 pt-28">
        <h1 className="text-4xl font-bold uppercase text-black mb-8">
          MES ARBRES PLANTÉS
        </h1>
        <p>Vous n'avez pas encore planté d'arbres.</p>
      </div>
    );
  }

  return (

    <div className="mt-40 min-h-screen p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold uppercase text-black mb-8">
        MES ARBRES PLANTÉS
      </h1>
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plantedTrees.map((tree) => (
          <div
            key={tree.plantedTreeId}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
          >
            <img
              src={tree.catalogTree.image}
              alt={tree.catalogTree.commonName}
              className="w-full h-64 object-cover"
            />
            <div className="p-4 flex flex-col flex-1 justify-between">
              <h2 className="text-xl font-semibold mb-4">
                {tree.personalName || tree.catalogTree.commonName}
              </h2>
              <NavLink
                to={`/tracking/${tree.plantedTreeId}`}
                className="mt-auto inline-block bg-green-700 hover:bg-green-800 text-white text-center px-4 py-2 rounded shadow"
              >
                Voir le suivi 🌱
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
