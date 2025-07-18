import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import type { PlantedTree, Tracking } from "../hooks/types";

export default function TrackingPage() {
  const { id } = useParams();
  const [plantedTree, setPlantedTree] = useState<PlantedTree | null>(null);
  const [trackings, setTrackings] = useState<Tracking[]>([]);
  const [personalName, setPersonalName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTreeData() {
      try {
        const response = await api.get(`/planted-trees/${id}`);
        const data = response.data;
        setPlantedTree(data);
        setTrackings(data.trackings);
        setPersonalName(data.personalName || "");
      } catch (error) {
        console.error("Erreur lors du chargement du suivi :", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTreeData();
  }, [id]);

  const handleSave = async () => {
    try {
      await api.patch(`/planted-trees/${id}`, { personalName });
      alert("Nom enregistré !");
    } catch (error) {
      alert("Erreur lors de la sauvegarde.");
      console.error(error);
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (!plantedTree) return <p>Arbre non trouvé.</p>;

  // Prendre le suivi le plus récent (supposé dernier dans le tableau)
  const latestTracking = trackings.length > 0 ? trackings[trackings.length - 1] : null;

  return (
    <div className="max-w-3xl pt-28 mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Suivi de votre arbre 🌱 : {personalName || plantedTree.catalogTree.commonName}
      </h1>

      <div className="mb-6 border p-4 rounded shadow bg-white">
        <img
          src={plantedTree.catalogTree.image}
          alt={plantedTree.catalogTree.commonName}
          className="w-full max-h-64 object-cover rounded mb-4"
        />
        <label htmlFor="personalName" className="block mb-2 font-medium">
          Nom personnel de l'arbre :
        </label>
        <div className="flex gap-2 mb-6">
          <input
            id="personalName"
            type="text"
            value={personalName}
            onChange={(e) => setPersonalName(e.target.value)}
            className="flex-1 border px-3 py-2 rounded"
            placeholder="Donnez-lui un nom !"
          />
          <button
            type="submit"
            onClick={handleSave}
            className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded"
          >
            Enregistrer
          </button>
        </div>

        {latestTracking ? (
          <div>
            <p><strong>Date du dernier suivi :</strong> {new Date(latestTracking.statementDate).toLocaleDateString()}</p>
            <p><strong>État :</strong> {latestTracking.condition}</p>
            <p><strong>Hauteur actuelle :</strong> {latestTracking.currentHeight} m</p>
            {latestTracking.currentPicture && (
              <img
                src={`/uploads/${latestTracking.currentPicture}`}
                alt=" suivi"
                className="mt-4 max-h-64 object-cover rounded"
              />
            )}
          </div>
        ) : (
          <p>Aucun suivi disponible pour cet arbre.</p>
        )}
      </div>
    </div>
  );
}
