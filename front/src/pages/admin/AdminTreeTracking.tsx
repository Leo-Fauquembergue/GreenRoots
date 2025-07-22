import React, { useEffect, useState, useCallback, type FormEvent } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';
import type { PlantedTree, Tracking } from '../../hooks/types';
import { toastRef } from '../../App';
import { Edit, ChevronLeft, MapPin, CalendarDays } from 'lucide-react';

export default function AdminTreeTracking() {
  const { treeId } = useParams<{ treeId: string }>();
  const [tree, setTree] = useState<PlantedTree | null>(null);
  const [loading, setLoading] = useState(true);
  
  // États pour le formulaire de SUIVI
  const [isEditing, setIsEditing] = useState<Tracking | null>(null);
  const [condition, setCondition] = useState('');
  const [currentHeight, setCurrentHeight] = useState('');

  // États pour le formulaire d'INFORMATIONS DE PLANTATION
  const [plantingDate, setPlantingDate] = useState('');
  const [plantingPlace, setPlantingPlace] = useState('');
  
  // Fonction pour récupérer toutes les données de l'arbre
  const fetchTreeAndTrackings = useCallback(async () => {
    if (!treeId) return;
    try {
      setLoading(true);
      const response = await api.get(`/planted-trees/${treeId}`);
      const fetchedTree = response.data;

      // Trier les suivis du plus récent au plus ancien
      fetchedTree.trackings?.sort((a, b) => new Date(b.statementDate).getTime() - new Date(a.statementDate).getTime());
      setTree(fetchedTree);

      // Pré-remplir les champs de plantation avec les données de la BDD
      // On formate la date pour l'input de type 'date' (YYYY-MM-DD)
      setPlantingDate(fetchedTree.plantingDate ? fetchedTree.plantingDate.split('T')[0] : '');
      setPlantingPlace(fetchedTree.plantingPlace || '');

    } catch (error: any) {
      toastRef.current?.showToast(error.response?.data?.message || "Erreur de chargement", 'error');
    } finally {
      setLoading(false);
    }
  }, [treeId]);

  useEffect(() => {
    fetchTreeAndTrackings();
  }, [fetchTreeAndTrackings]);

  // --- Fonctions pour le formulaire de SUIVI ---
  const handleEditClick = (tracking: Tracking) => {
    setIsEditing(tracking);
    setCondition(tracking.condition || '');
    setCurrentHeight(String(tracking.currentHeight || ''));
  };

  const resetForm = () => {
    setIsEditing(null);
    setCondition('');
    setCurrentHeight('');
  };

  const handleSubmitTracking = async (e: FormEvent) => {
    e.preventDefault();
    if (!treeId) return;
    const trackingData = { condition, currentHeight: currentHeight ? parseFloat(currentHeight) : null, plantedTreeId: parseInt(treeId) };

    try {
      if (isEditing) {
        await api.patch(`/tracking/${isEditing.trackingId}`, trackingData);
        toastRef.current?.showToast("Suivi mis à jour !", 'success');
      } else {
        await api.post('/tracking', trackingData);
        toastRef.current?.showToast("Nouveau suivi ajouté !", 'success');
      }
      resetForm();
      await fetchTreeAndTrackings();
    } catch (error: any) {
      toastRef.current?.showToast(error.response?.data?.message || "Erreur", 'error');
    }
  };

  // --- Fonction pour le formulaire d'INFORMATIONS DE PLANTATION ---
  const handleSavePlantingInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.patch(`/planted-trees/${treeId}`, {
        plantingDate: plantingDate || null,
        plantingPlace: plantingPlace.trim() || null,
      });
      toastRef.current?.showToast("Informations de plantation mises à jour !", 'success');
      await fetchTreeAndTrackings();
    } catch (error: any) {
      toastRef.current?.showToast(error.response?.data?.message || "Erreur", 'error');
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (!tree) return <div>Arbre non trouvé.</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-8">
      <div>
        <Link to="/admin/orders" className="inline-flex items-center gap-2 text-emerald-600 hover:underline mb-4 font-semibold">
          <ChevronLeft size={18} /> Retour à la liste des commandes
        </Link>
        <h2 className="text-3xl font-bold mb-1">Gestion de l'Arbre</h2>
        <p className="text-gray-600">Pour : <strong>{tree.personalName || tree.catalogTree.commonName}</strong> (ID: {tree.plantedTreeId})</p>
      </div>
      
      {/* Formulaire des Informations de Plantation */}
      <form onSubmit={handleSavePlantingInfo} className="p-4 border rounded-lg bg-gray-50 space-y-4">
        <h3 className="font-semibold text-xl text-gray-800 flex items-center gap-3"><MapPin size={20}/> Informations de Plantation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="plantingDate" className="block text-sm font-medium text-gray-700 mb-1">Date de plantation</label>
            <input id="plantingDate" type="date" value={plantingDate} onChange={e => setPlantingDate(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md"/>
          </div>
          <div>
            <label htmlFor="plantingPlace" className="block text-sm font-medium text-gray-700 mb-1">Lieu de plantation</label>
            <input id="plantingPlace" value={plantingPlace} onChange={e => setPlantingPlace(e.target.value)} placeholder="Ex: Forêt de Fontainebleau" className="w-full p-2 border border-gray-300 rounded-md"/>
          </div>
        </div>
        <button type="submit" className="btn-light px-4 py-2">Enregistrer les informations</button>
      </form>
      
      {/* Formulaire d'ajout/modification de Suivi */}
      <form onSubmit={handleSubmitTracking} className="p-4 border rounded-lg bg-gray-50 space-y-4">
        <h3 className="font-semibold text-xl text-gray-800 flex items-center gap-3"><CalendarDays size={20} /> Suivi de l'Arbre</h3>
        <h4 className="text-md font-medium text-gray-600 -mt-2">{isEditing ? `Modification du suivi #${isEditing.trackingId}` : "Ajouter une nouvelle entrée"}</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
            <input id="condition" value={condition} onChange={e => setCondition(e.target.value)} placeholder="Ex: En bonne santé" required className="w-full p-2 border border-gray-300 rounded-md"/>
          </div>
          <div>
            <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">Hauteur (cm)</label>
            <input id="height" type="number" step="0.1" value={currentHeight} onChange={e => setCurrentHeight(e.target.value)} placeholder="Ex: 120.5" className="w-full p-2 border border-gray-300 rounded-md"/>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button type="submit" className="btn-dark px-4 py-2">
            {isEditing ? 'Mettre à jour le suivi' : 'Ajouter le suivi'}
          </button>
          {isEditing && (
            <button type="button" onClick={resetForm} className="btn-light px-4 py-2">Annuler</button>
          )}
        </div>
      </form>
      
      {/* Historique des suivis */}
      <div>
        <h3 className="font-semibold text-lg mb-4 text-gray-800">Historique des suivis ({tree.trackings?.length || 0})</h3>
        <ul className="space-y-3">
          {tree.trackings && tree.trackings.length > 0 ? (
            tree.trackings.map(tracking => (
              <li key={tracking.trackingId} className="flex justify-between items-center p-3 border rounded-md bg-gray-50">
                <div>
                  <p><strong>Date :</strong> {new Date(tracking.statementDate).toLocaleDateString('fr-FR')}</p>
                  <p><strong>Condition :</strong> {tracking.condition || 'Non renseignée'}</p>
                  <p><strong>Hauteur :</strong> {tracking.currentHeight ? `${tracking.currentHeight} cm` : 'Non renseignée'}</p>
                </div>
                <button type="button" onClick={() => handleEditClick(tracking)} className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors">
                  <Edit size={16} />
                </button>
              </li>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">Aucun suivi n'a encore été enregistré.</p>
          )}
        </ul>
      </div>
    </div>
  );
}