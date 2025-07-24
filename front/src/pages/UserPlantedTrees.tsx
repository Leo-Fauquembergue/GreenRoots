import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import type { PlantedTree } from "../hooks/types";
import PlantedTreeCard from "../components/PlantedTreeCard";
import "../style/style.scss";

export default function UserPlantedTrees() {
	const [trees, setTrees] = useState<PlantedTree[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchUserTrees = async () => {
			try {
				setLoading(true);
				const response = await api.get<PlantedTree[]>("/planted-trees");
				setTrees(response.data);
			} catch (err: any) {
				if (err.response?.status === 401) {
					setError("Vous devez être connecté pour voir cette page.");
				} else {
					setError("Impossible de charger vos arbres plantés.");
				}
			} finally {
				setLoading(false);
			}
		};
		fetchUserTrees();
	}, []);

	if (loading) {
		return (
			<p className="min-h-screen text-center pt-10">
				Chargement de vos arbres...
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
		<div className="min-h-screen p-4 md:p-8">
			<div className="gr-container max-w-4xl mx-auto">
				<Link to="/profile" className="color-pistachio mb-6 inline-block">
					← Retour à mon profil
				</Link>
				<h1 className="page-title">Mes Arbres Plantés</h1>

				{trees.length === 0 ? (
					<p>Vous n'avez pas encore d'arbre planté.</p>
				) : (
					<div className="space-y-6">
						{trees.map((tree) => (
							<PlantedTreeCard key={tree.plantedTreeId} tree={tree} />
						))}
					</div>
				)}
			</div>
		</div>
	);
}
