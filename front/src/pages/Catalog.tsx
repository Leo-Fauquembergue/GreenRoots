import type React from "react";
import { useState, useEffect } from "react";
import api from "../services/api";
import type { CatalogTree, Category, Region } from "../hooks/types";
import "../style/catalog.scss";
import Pagination from "./../components/Pagination.tsx"; 
import TreeCard from "./../components/TreeCard.tsx";
import { AlertCircle, Search } from "lucide-react";

const ITEMS_PER_PAGE = 6; // Nombre d'arbres par page

const useCatalogData = (categoryId: string, regionId: string, page: number) => {
	const [trees, setTrees] = useState<CatalogTree[]>([]);
	// On ne charge les catégories et régions qu'une seule fois
	const [categories, setCategories] = useState<Category[]>([]);
	const [regions, setRegions] = useState<Region[]>([]);
	const [totalPages, setTotalPages] = useState(0); // Nouvel état pour le nombre total de pages
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Effet pour charger les catégories et régions (une seule fois)
	useEffect(() => {
		const fetchFilters = async () => {
			try {
				const [categoriesResponse, regionsResponse] = await Promise.all([
					api.get("/categories"),
					api.get("/regions"),
				]);
				setCategories(categoriesResponse.data);
				setRegions(regionsResponse.data);
			} catch (err: unknown) {
				//remplacé any par unknown
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError("Erreur lors du chargement des filtres.");
				}
			}
		};
		fetchFilters();
	}, []); // Dépendance vide pour ne s'exécuter qu'au montage

	// --- Effet pour charger les ARBRES (modifié pour la pagination) ---
	useEffect(() => {
		const fetchTrees = async () => {
			setLoading(true);
			setError(null);
			try {
				// On construit l'objet de paramètres pour axios
				const params = {
					page: page,
					limit: ITEMS_PER_PAGE,
					// On n'ajoute les filtres que s'ils ne sont pas "all"
					categoryId: categoryId !== "all" ? categoryId : undefined,
					regionId: regionId !== "all" ? regionId : undefined,
				};
				
				// axios gère automatiquement les paramètres undefined
				const response = await api.get("/catalog-trees", { params }); // <-- CORRIGÉ : utilise api et l'objet params

				// La réponse du backend doit être un objet { data: [...], totalCount: X }
				setTrees(response.data.data);
				setTotalPages(Math.ceil(response.data.totalCount / ITEMS_PER_PAGE));
			} catch (err: any) {
				setError(err.response?.data?.message || "Erreur de chargement des arbres.");
			} finally {
				setLoading(false);
			}
		};

		fetchTrees();
	}, [categoryId, regionId, page]); // Dépendances de l'effet

	return { trees, categories, regions, loading, error, totalPages };
};


// --- Le composant Catalog mis à jour ---
const Catalog: React.FC = () => {
	const [selectedCategory, setSelectedCategory] = useState<string>("all");
	const [selectedRegion, setSelectedRegion] = useState<string>("all");
	const [currentPage, setCurrentPage] = useState<number>(1); // Nouvel état pour la page actuelle

	// Le hook reçoit maintenant la page actuelle
	const { trees, categories, regions, loading, error, totalPages } =
		useCatalogData(selectedCategory, selectedRegion, currentPage);

	// Réinitialiser à la page 1 si les filtres changent
	// biome-ignore lint/correctness/useExhaustiveDependencies: <Je veux que cet effet se déclenche quand selectedCategory OU selectedRegion change, afin de réinitialiser la page à 1.>
		useEffect(() => {
		setCurrentPage(1);
	}, [selectedCategory, selectedRegion]);

	// gestion du chargement et des erreurs
	if (loading && trees.length === 0) { // On affiche le spinner global que lors du premier chargement
		return (
			<div className="min-h-screen bg-white flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600 mx-auto mb-4"></div>
					<p className="text-gray-600">Chargement du catalogue...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen bg-white flex items-center justify-center">
				<div className="text-center">
					<div className="text-red-600 mb-4">
						<AlertCircle className="h-16 w-16 text-red-600 mx-auto" />
					</div>
					<p className="text-gray-600 mb-4">{error}</p>
					<button
						type="button"
						onClick={() => window.location.reload()}
						className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
					>
						Réessayer
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="catalog min-h-screen py-20">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<header className="text-center mb-16">
					<h1 className="catalog-title text-4xl md:text-5xl mb-6">Catalogue</h1>
					<p className="text-lg max-w-2xl mx-auto leading-relaxed">
						Découvrez notre sélection d'arbres exceptionnels, adaptés à
						toutes les régions et tous les projets.
					</p>
				</header>

				{/* Filters */}
				<div className="filter-bar flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 p-6 rounded-lg mb-12">
					<div className="flex items-center gap-3">
						<label
							htmlFor="category-select"
							className="text-sm font-medium text-gray-700"
						>
							Catégorie:
						</label>
						<select
							id="category-select"
							className="px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 text-sm min-w-32 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
							value={selectedCategory}
							onChange={(e) => setSelectedCategory(e.target.value)}
						>
							<option value="all">Toutes les catégories</option>
							{categories.map((category) => (
								<option key={category.categoryId} value={category.categoryId}>
									{category.name}
								</option>
							))}
						</select>
					</div>

					<div className="flex items-center gap-3">

						<label
							htmlFor="region-select"
							className="text-sm font-medium text-gray-700"
						>


							Région:
						</label>
						<select
							id="region-select"
							className="px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 text-sm min-w-32 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
							value={selectedRegion}
							onChange={(e) => setSelectedRegion(e.target.value)}
						>
							<option value="all">Toutes les régions</option>
							{regions.map((region) => (
								<option key={region.regionId} value={region.regionId}>
									{region.name}
								</option>
							))}
						</select>
					</div>
				</div>

				{/* Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
					{loading ? ( // Afficher un spinner léger lors du changement de page
						<div className="col-span-full text-center py-12">


							<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>

						</div>
					) : trees.length === 0 ? (
						<div className="col-span-full text-center py-12">
							<p className="text-gray-600">
								Aucun arbre ne correspond à vos critères de recherche.
							</p>
						</div>
					) : (
						// On affiche directement les arbres de la page, plus besoin de .slice()
						trees.map((tree) => (
							<TreeCard key={tree.catalogTreeId} tree={tree} />
						))
					)}
				</div>


				{/* Section Pagination (remplace le bouton "Voir plus") */}
				<div className="flex justify-center mt-12">
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={(page: React.SetStateAction<number>) => setCurrentPage(page)}
					/>
				</div>

			</div>
		</div>
	);
};

export default Catalog;