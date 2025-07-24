import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ShieldCheck } from "lucide-react";
import "../style/style.scss";

export default function Profile() {
	// On récupère l'utilisateur directement depuis le contexte.
	const { user } = useAuth();

	// Le ProtectedRoute nous garantit que `user` n'est pas null ici.
	// S'il l'était, l'utilisateur aurait été redirigé.
	if (!user) {
		return (
			<p className="min-h-screen flex items-center justify-center">
				Redirection...
			</p>
		);
	}

	return (
		<div className="gr-container">
			<h2 className="page-title">Profil de {user.name}</h2>

			<div className="flex flex-col md:flex-row gap-8 my-10">
				<section className="flex-1">
					<h3 className="text-xl font-semibold mb-4">Mes Informations</h3>
					<div className="space-y-4 text-gray-800">
						<p>
							<strong>Nom :</strong> {user.name}
						</p>
						<p>
							<strong>Email :</strong> {user.email}
						</p>
						<p>
							<strong>Rôle :</strong> {user.role}
						</p>
					</div>
				</section>

				<section className="flex-1 flex flex-col justify-center space-y-4">
					<Link to="/orders" className="block text-center px-4 py-3 btn-dark">
						Voir mon historique de commandes
					</Link>
					<Link
						to="/planted-trees"
						className="block text-center px-4 py-3 btn-light"
					>
						Voir mes arbres plantés
					</Link>

					{/* On ajoute un bouton bien visible si l'utilisateur est un admin */}
					{user.role === "admin" && (
						<Link
							to="/admin"
							className="text-center px-4 py-3 bg-yellow-400 text-yellow-900 font-bold rounded-lg hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2"
						>
							<ShieldCheck /> Accéder au Panel d'Administration
						</Link>
					)}
				</section>
			</div>
		</div>
	);
}
