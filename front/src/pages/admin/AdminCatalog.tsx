import { useEffect, useState, type FormEvent, useCallback } from "react";
import api from "../../services/api";
import type { CatalogTree, Category, Region } from "../../hooks/types";
import { toastRef, confirmModalRef } from "../../App";
import { Trash2, TreePine } from "lucide-react";

export default function AdminCatalog() {
	const [trees, setTrees] = useState<CatalogTree[]>([]);
	const [loading, setLoading] = useState(true);

	// États pour le formulaire d'ajout
	const [commonName, setCommonName] = useState("");
	const [scientificName, setScientificName] = useState("");
	const [price, setPrice] = useState("");

	const [categoryId, setCategoryId] = useState<number | null>(null);
	const [regionId, setRegionId] = useState<number | null>(null);
	const [categories, setCategories] = useState<Category[]>([]);
	const [regions, setRegions] = useState<Region[]>([]);

	const fetchTrees = useCallback(async () => {
		try {
			setLoading(true);
			const response = await api.get("/catalog-trees");
			setTrees(response.data.data);
		} catch (err: any) {
			toastRef.current?.showToast("Erreur de chargement du catalogue", "error");
		} finally {
			setLoading(false);
		}
	}, []);

	const fetchCategoriesAndRegions = useCallback(async () => {
		try {
			const [catRes, regRes] = await Promise.all([
				api.get("/categories"),
				api.get("/regions"),
			]);
			setCategories(catRes.data);
			setRegions(regRes.data);
		} catch {
			toastRef.current?.showToast(
				"Erreur lors du chargement des données",
				"error",
			);
		}
	}, []);

	useEffect(() => {
		fetchTrees();
		fetchCategoriesAndRegions();
	}, [fetchTrees, fetchCategoriesAndRegions]);

	const handleAddTree = async (e: FormEvent) => {
		e.preventDefault();
		if (!categoryId || !regionId) {
			toastRef.current?.showToast(
				"Veuillez sélectionner une catégorie et une région",
				"error",
			);
			return;
		}
		try {
			const newTreeData = {
				commonName,
				scientificName,
				price: parseFloat(price),
				categoryId,
				regionId,
			};
			await api.post("/catalog-trees", newTreeData);
			toastRef.current?.showToast("Arbre ajouté avec succès !", "success");
			await fetchTrees();

			// Réinitialiser le formulaire
			setCommonName("");
			setScientificName("");
			setPrice("");
			setCategoryId(null);
			setRegionId(null);
		} catch (err: any) {
			toastRef.current?.showToast(
				err.response?.data?.message || "Erreur lors de l'ajout",
				"error",
			);
		}
	};

	const handleDeleteTree = (id: number, name: string) => {
		confirmModalRef.current?.show(
			"Confirmer la suppression",
			`Voulez-vous vraiment supprimer "${name}" du catalogue ?`,
			async () => {
				try {
					await api.delete(`/catalog-trees/${id}`);
					toastRef.current?.showToast("Arbre supprimé avec succès.", "success");
					await fetchTrees();
				} catch (err: any) {
					toastRef.current?.showToast(
						err.response?.data?.message || "Erreur de suppression",
						"error",
					);
				}
			},
		);
	};

	if (loading)
		return <p className="text-center p-4">Chargement du catalogue...</p>;

	return (
		<div className="bg-white p-6 rounded-lg shadow-md">
			<h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-800">
				<TreePine size={24} />
				Gestion du catalogue
			</h2>

			<form
				onSubmit={handleAddTree}
				className="mb-8 p-4 border border-gray-200 rounded-lg bg-gray-50 space-y-4"
			>
				<h3 className="font-semibold text-lg text-gray-700">
					Ajouter un nouvel arbre
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<input
						value={commonName}
						onChange={(e) => setCommonName(e.target.value)}
						placeholder="Nom commun"
						required
						className="input-group"
					/>
					<input
						value={scientificName}
						onChange={(e) => setScientificName(e.target.value)}
						placeholder="Nom scientifique"
						required
						className="input-group"
					/>
					<input
						type="number"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
						placeholder="Prix"
						required
						className="input-group"
					/>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<select
						value={categoryId ?? ""}
						onChange={(e) => setCategoryId(Number(e.target.value))}
						required
						className="input-group"
					>
						<option value="" disabled>
							Choisir une catégorie
						</option>
						{categories.map((cat) => (
							<option key={cat.id} value={cat.id}>
								{cat.name}
							</option>
						))}
					</select>

					<select
						value={regionId ?? ""}
						onChange={(e) => setRegionId(Number(e.target.value))}
						required
						className="input-group"
					>
						<option value="" disabled>
							Choisir une région
						</option>
						{regions.map((reg) => (
							<option key={reg.id} value={reg.id}>
								{reg.name}
							</option>
						))}
					</select>
				</div>

				<button type="submit" className="btn-dark px-6 py-2">
					Ajouter l'arbre
				</button>
			</form>

			<ul className="space-y-3">
				{trees.map((tree) => (
					<li
						key={tree.catalogTreeId}
						className="flex justify-between items-center border border-gray-200 rounded-md p-3 bg-gray-50"
					>
						<div>
							<p className="font-semibold text-gray-900">{tree.commonName}</p>
							<p className="text-sm text-gray-600">{tree.scientificName}</p>
						</div>
						<button
							type="button"
							onClick={() =>
								handleDeleteTree(tree.catalogTreeId, tree.commonName)
							}
							className="p-2 text-red-500 rounded-full hover:bg-red-100 hover:text-red-700 transition-colors"
						>
							<Trash2 size={18} />
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
