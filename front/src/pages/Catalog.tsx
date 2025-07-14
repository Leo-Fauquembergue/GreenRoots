/** biome-ignore-all lint/a11y/useButtonType: <explanation> */
import "../style/catalog.scss";
import TreeCard from "./../components/TreeCard.tsx";

import React, { useState, useEffect } from "react";
import axios from "axios";

interface CatalogTree {
	catalogTreeId: number;
	commonName: string;
	scientificName: string;
	description: string;
	adultHeight: number;
	image: string;
	price: number;
	categoryId: number;
	regionId: number;
	category: {
		categoryId: number;
		name: string;
	};
	region: {
		regionId: number;
		name: string;
	};
}

interface Category {
	categoryId: number;
	name: string;
}

interface Region {
	regionId: number;
	name: string;
}

// Configuration de l'API
const API_BASE_URL = "http://localhost:3000/api";

const useCatalogData = (categoryId: string, regionId: string) => {
	const [trees, setTrees] = useState<CatalogTree[]>([]);
	// On ne charge les catégories et régions qu'une seule fois
	const [categories, setCategories] = useState<Category[]>([]);
	const [regions, setRegions] = useState<Region[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Effet pour charger les catégories et régions (une seule fois)
	useEffect(() => {
		const fetchFilters = async () => {
			try {
				const [categoriesResponse, regionsResponse] = await Promise.all([
					axios.get(`${API_BASE_URL}/categories`),
					axios.get(`${API_BASE_URL}/regions`),
				]);
				setCategories(categoriesResponse.data);
				setRegions(regionsResponse.data);
			} catch (err: any) {
				setError(err.message || "Erreur lors du chargement des filtres.");
			}
		};
		fetchFilters();
	}, []); // Dépendance vide pour ne s'exécuter qu'au montage

	// Effet pour charger les ARBRES en fonction des filtres
	useEffect(() => {
		const fetchTrees = async () => {
			try {
				setLoading(true);

				// Construire les paramètres de requête dynamiquement
				const params = new URLSearchParams();
				if (categoryId && categoryId !== "all") {
					params.append("categoryId", categoryId);
				}
				if (regionId && regionId !== "all") {
					params.append("regionId", regionId);
				}

				const queryString = params.toString();
				const url = `${API_BASE_URL}/catalog-trees${queryString ? `?${queryString}` : ""}`;

				console.log("Appel API vers :", url); // Pour le débogage

				const treesResponse = await axios.get(url);
				setTrees(treesResponse.data);
			} catch (err: any) {
				setError(
					err.message ||
						"Une erreur est survenue lors du chargement des arbres.",
				);
			} finally {
				setLoading(false);
			}
		};

		fetchTrees();
	}, [categoryId, regionId]); // <-- Se redéclenche si categoryId ou regionId change !

	return { trees, categories, regions, loading, error };
};

const Catalog: React.FC = () => {
	const [selectedCategory, setSelectedCategory] = useState<string>("all");
	const [selectedRegion, setSelectedRegion] = useState<string>("all");

	// Le hook reçoit les filtres et renvoie les données déjà filtrées !
	const { trees, categories, regions, loading, error } = useCatalogData(
		selectedCategory,
		selectedRegion,
	);
	const [visibleCount, setVisibleCount] = useState(6);

	// À chaque changement de filtre, on réinitialise le nombre d'éléments visibles
	useEffect(() => {
		setVisibleCount(6);
	}, [trees]);

	const handleSeeMore = () => {
		// La variable `trees` contient DÉJÀ les arbres filtrés.
		setVisibleCount(trees.length);
	};

	if (loading) {
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
						<svg
							className="h-16 w-16 mx-auto"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>
					<p className="text-gray-600 mb-4">{error}</p>
					<button
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
		<div className="catalog min-h-screen bg-white py-20">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<header className="text-center mb-16">
					<h1 className="catalog-title text-4xl md:text-5xl mb-6">Catalogue</h1>
					<p className="text-lg max-w-2xl mx-auto leading-relaxed">
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi,
						voluptate incidunt odio amet doloremque nostrum odit repellat nihil,
						dolorem nesciunt temporibus earum veniam, in ad vero quos deleniti
						delectus fugiat.
					</p>
				</header>

				{/* Filters */}
				<div className="filter-bar flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 p-6 rounded-lg mb-12">
					<div className="flex items-center gap-3">
						<label className="text-sm font-medium text-gray-700">
							Catégorie:
						</label>
						<select
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
						<label className="text-sm font-medium text-gray-700">Région:</label>
						<select
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
					{loading ? (
						<div className="col-span-full text-center py-12">
							<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
						</div>
					) : trees.length === 0 ? (
						<div className="col-span-full text-center py-12">
							<p className="text-gray-600">
								Aucun arbre trouvé pour ces critères
							</p>
						</div>
					) : (
						trees
							.slice(0, visibleCount)
							.map((tree) => (
								<TreeCard
									key={tree.catalogTreeId}
									catalogTreeId={tree.catalogTreeId}
									commonName={tree.commonName}
									description={tree.description}
									image={tree.image}
									categoryName={tree.category.name}
									regionName={tree.region.name}
								/>
							))
					)}
				</div>

				{/* Bouton Voir plus */}
				{visibleCount < trees.length && !loading && (
					<div className="text-center">
						<button
							onClick={handleSeeMore}
							className="btn-dark px-8 py-4 text-white rounded-full text-base font-medium  transition-all duration-300 hover:-translate-y-0.5"
						>
							Voir plus
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Catalog;
