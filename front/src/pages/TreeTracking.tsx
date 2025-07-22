import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api'; 
import type { PlantedTree } from '../hooks/types'; 
import "../style/style.scss";

export default function TreeTracking() {
  const { treeId } = useParams<{ treeId: string }>();
  const [tree, setTree] = useState<PlantedTree | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!treeId) return;

    const fetchTreeDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get<PlantedTree>(`/planted-trees/${treeId}`);
        // Trier les suivis par date, du plus récent au plus ancien
        if (response.data.trackings) {
          response.data.trackings.sort((a, b) => new Date(b.statementDate).getTime() - new Date(a.statementDate).getTime());
        }
        setTree(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Erreur lors du chargement du suivi.");
      } finally {
        setLoading(false);
      }
    };

    fetchTreeDetails();
  }, [treeId]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><p>Chargement du suivi de l'arbre...</p></div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-600"><p>Erreur : {error}</p></div>;
  }

  if (!tree) {
    return <div className="min-h-screen flex items-center justify-center"><p>Arbre non trouvé.</p></div>;
  }

  const latestTracking = tree.trackings && tree.trackings.length > 0 ? tree.trackings[0] : null;

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="gr-container max-w-4xl mx-auto">
        <Link to="/planted-trees" className="color-pistachio mb-6 inline-block">
          ← Retour à mes arbres
        </Link>
        
        {/* En-tête de l'arbre */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 p-4 bg-white border-b border-gray-200">
          <img src={tree.catalogTree.image} alt={tree.catalogTree.commonName} className="w-32 h-32 object-cover rounded-full"/>
          <div>
            <h1 className="text-3xl font-bold text-gray-700 pb-4">{tree.personalName || tree.catalogTree.commonName}</h1>
            {tree.personalName && <p className="text-lg text-gray-500 italic">{tree.catalogTree.commonName}</p>}
            <p className="text-sm text-gray-500 mt-2">Planté le: {tree.plantingDate ? new Date(tree.plantingDate).toLocaleDateString('fr-FR') : 'Date non spécifiée'}</p>
            <p className="text-sm text-gray-500">Lieu: {tree.plantingPlace || 'Lieu non spécifié'}</p>
          </div>
        </div>

        {/* État actuel */}
        <div className="mb-8">
          <h2 className="page-title">État Actuel</h2>
          {latestTracking ? (
            <div className="bg-pistachio-100 p-6 rounded-lg">
              <p><strong>Dernier relevé :</strong> {new Date(latestTracking.statementDate).toLocaleDateString('fr-FR')}</p>
              <p><strong>Condition :</strong> {latestTracking.condition || 'Non renseignée'}</p>
              <p><strong>Hauteur :</strong> {latestTracking.currentHeight ? `${latestTracking.currentHeight} cm` : 'Non renseignée'}</p>
              {latestTracking.currentPicture && (
                <div className="mt-4">
                  <p><strong>Photo récente :</strong></p>
                  <img src={latestTracking.currentPicture} alt="Suivi de l'arbre" className="max-w-xs mt-2 rounded-lg shadow-lg" />
                </div>
              )}
            </div>
          ) : (
            <p className='text-center'>Aucune information de suivi n'est encore disponible pour cet arbre.</p>
          )}
        </div>
        
        {/* Historique des suivis */}
        {tree.trackings && tree.trackings.length > 1 && (
          <div>
            <h2 className="page-title">Historique des suivis</h2>
            <div className="space-y-4">
              {tree.trackings.slice(1).map(tracking => (
                <div key={tracking.trackingId} className="p-4 border border-gray-300 rounded-md">
                  <p><strong>Date :</strong> {new Date(tracking.statementDate).toLocaleDateString('fr-FR')}</p>
                  <p><strong>Condition :</strong> {tracking.condition || 'N/A'}</p>
                  <p><strong>Hauteur :</strong> {tracking.currentHeight ? `${tracking.currentHeight} cm` : 'N/A'}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}