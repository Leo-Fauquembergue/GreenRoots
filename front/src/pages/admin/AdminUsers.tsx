import { useEffect, useState, useCallback } from "react";
import api from "../../services/api";
import type { AdminUser } from "../../hooks/types";
import { Trash2, Users } from "lucide-react";
import { toastRef, confirmModalRef } from "../../App";

export default function AdminUsers() {
	const [users, setUsers] = useState<AdminUser[]>([]);
	const [loading, setLoading] = useState(true);

	// La fonction ne sera recréée que si ses dépendances (ici, aucune) changent.
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (err: any) {
      toastRef.current?.showToast(err.response?.data?.message || "Erreur de chargement", 'error');
    } finally {
      setLoading(false);
    }
  }, []); // Le tableau de dépendances de useCallback est vide, car fetchUsers n'utilise aucune prop ou état.

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

	const handleDeleteUser = (userId: number, name: string) => {
    // Affiche le modal de confirmation
    confirmModalRef.current?.show(
      "Confirmer la suppression",
      `Êtes-vous sûr de vouloir supprimer l'utilisateur "${name}" ? Cette action est irréversible.`,
      // Ceci est la fonction qui sera exécutée si l'utilisateur clique sur "Confirmer"
      async () => {
        try {
          await api.delete(`/users/${userId}`);
          toastRef.current?.showToast("Utilisateur supprimé.", 'success');
          // Après la suppression, on rafraîchit la liste en appelant la fonction mémorisée
          fetchUsers();
        } catch (err: any) {
          toastRef.current?.showToast(err.response?.data?.message || "Erreur de suppression", 'error');
        }
      }
    );
  };

	if (loading)
		return <p className="text-center p-4">Chargement des utilisateurs...</p>;

	return (
		<div className="bg-white p-6 rounded-lg shadow-md">
			<h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-800">
				<Users size={24} />
				Gestion des utilisateurs ({users.length})
			</h2>
			<div className="space-y-3">
				{users.map((user) => (
					<div
						key={user.userId}
						className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-md"
					>
						<div>
							<p className="font-semibold text-gray-900">{user.name}</p>
							<p className="text-sm text-gray-600">{user.email}</p>
						</div>
						<div className="flex items-center gap-4">
							<span
								className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full ${user.role === "admin" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}
							>
								{user.role}
							</span>
							<button
								type="button"
								onClick={() => handleDeleteUser(user.userId, user.name)}
								className="p-2 text-red-500 rounded-full hover:bg-red-100 hover:text-red-700 transition-colors"
							>
								<Trash2 size={18} />
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
