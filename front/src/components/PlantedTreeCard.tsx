import { useState } from "react";
import { Link } from "react-router-dom";
import type { PlantedTree } from "../hooks/types";
import api from "../services/api";

interface PlantedTreeCardProps {
	tree: PlantedTree;
}

export default function PlantedTreeCard({ tree }: PlantedTreeCardProps) {
	const [personalName, setPersonalName] = useState(tree.personalName || "");
	const [isSaving, setIsSaving] = useState(false);
	const [message, setMessage] = useState<{
		type: "success" | "error";
		text: string;
	} | null>(null);

	const handleSaveChanges = async () => {
		// Ne rien faire si le nom n'a pas changé
		if (personalName === (tree.personalName || "")) return;

		setIsSaving(true);
		setMessage(null);
		try {
			await api.patch(`/planted-trees/${tree.plantedTreeId}`, {
				personalName: personalName.trim(),
			});
			setMessage({ type: "success", text: "Nom enregistré !" });
			// Mettre à jour le nom dans le composant parent pourrait être une amélioration
		} catch (error) {
			setMessage({ type: "error", text: "Erreur lors de la sauvegarde." });
		} finally {
			setIsSaving(false);
			// Fait disparaître le message après 3 secondes
			setTimeout(() => setMessage(null), 3000);
		}
	};

	return (
		<div className="bg-white p-4 border-t border-gray-200 first:border-none flex flex-col md:flex-row gap-4 items-center">
			<img
				src={tree.catalogTree.image}
				alt={tree.catalogTree.commonName}
				className="w-24 h-24 object-cover rounded-md"
			/>

			<div className="flex-grow text-center md:text-left">
				<h3 className="tree-title font-bold text-lg">
					{tree.catalogTree.commonName}
				</h3>
				<div className="flex flex-col sm:flex-row items-center gap-2 mt-2">
					<input
						className="border border-gray-300 rounded-md p-3"
						type="text"
						value={personalName}
						onChange={(e) => setPersonalName(e.target.value)}
						placeholder="Donnez-lui un nom !"
					/>
					<button
						type="submit"
						onClick={handleSaveChanges}
						disabled={isSaving}
						className="btn-dark px-3 py-2 w-full sm:w-auto"
					>
						{isSaving ? "Saving..." : "Enregistrer"}
					</button>
				</div>
				{message && (
					<p
						className={`text-sm mt-1 ${message.type === "success" ? "text-green-600" : "text-red-600"}`}
					>
						{message.text}
					</p>
				)}
			</div>

			<div className="mt-4 md:mt-0 ">
				<Link
					to={`/planted-trees/${tree.plantedTreeId}/tracking`}
					className="btn-light block px-3 py-2 full sm:w-auto "
				>
					Voir le suivi
				</Link>
			</div>
		</div>
	);
}
