import React from 'react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Tableau de Bord</h2>
      <p>Bienvenue dans le panel d'administration de GreenRoots.</p>
      <p className="mt-2">Utilisez le menu sur la gauche pour gérer les utilisateurs, les commandes et le catalogue des arbres.</p>
    </div>
  );
};

export default AdminDashboard;