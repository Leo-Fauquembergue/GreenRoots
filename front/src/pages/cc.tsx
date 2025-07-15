import React, { useState, useEffect } from "react";
import axios from "axios";
import type { CatalogTree, Category, Region} from "../hooks/types"; 
import "../style/catalog.scss";
import TreeCard from "./../components/TreeCard.tsx";
import { AlertCircle, Search, ChevronLeft, ChevronRight } from "lucide-react";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;



const useCatalogData = (categoryId: string, regionId: string, page: number, limit: number = 6) => {
	const [paginationData, setPaginationData] = useState<PaginationData>({
		trees: [],
		totalCount: 0,
		currentPage: 1,
		totalPages: 1,
		hasNextPage: false,
		hasPreviousPage: false
	});
	const [categories, setCategories] = useState<Category[]>([]);
	const [regions, setRegions] = useState<Region[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Effet pour charger les catégories et régions (une seule fois)
	useEffect(() => {
		const fetchFilters = async () => {
			try {
				const [categoriesResponse, regionsResponse] = await Promise.all([
					axios.get(`${apiBaseUrl}/categories`),
					axios.get(`${apiBaseUrl}/regions`),
				]);
				setCategories(categoriesResponse.data);
				setRegions(regionsResponse.data);
			} catch (err: unknown) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError("Erreur lors du chargement des filtres.");
				}
			}
		};
		fetchFilters();
	}, []);

	// Effet pour charger les ARBRES avec pagination
	useEffect(() => {
		const fetchTrees = async () => {
			try {
				setLoading(true);
				setError(null);

				// Construire les paramètres de requête dynamiquement
				const params = new URLSearchParams();
				if (categoryId && categoryId !== "all") {
					params.append("categoryId", categoryId);
				}
				if (regionId && regionId !== "all") {
					params.append("regionId", regionId);
				}
				
				// Ajouter les paramètres de pagination
				params.append("page", page.toString());
				params.append("limit", limit.toString());

				const queryString = params.toString();
				const url = `${apiBaseUrl}/catalog-trees?${queryString}`;

				console.log("Appel API vers :", url);

				const response = await axios.get(url);
				
				// Supposons que votre API retourne les données dans ce format :
				// {
				//   trees: CatalogTree[],
				//   totalCount: number,
				//   currentPage: number,
				//   totalPages: number,
				//   hasNextPage: boolean,
				//   hasPreviousPage: boolean
				// }
				
				setPaginationData({
					trees: response.data.trees || response.data, // Fallback si l'API retourne directement les arbres
					totalCount: response.data.totalCount || response.data.length || 0,
					currentPage: response.data.currentPage || page,
					totalPages: response.data.totalPages || Math.ceil((response.data.totalCount || response.data.length || 0) / limit),
					hasNextPage: response.data.hasNextPage ?? (page < (response.data.totalPages || 1)),
					hasPreviousPage: response.data.hasPreviousPage ?? (page > 1)
				});

			} catch (err: unknown) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError("Une erreur est survenue lors du chargement des arbres.");
				}
			} finally {
				setLoading(false);
			}
		};

		fetchTrees();
	}, [categoryId, regionId, page, limit]);

	return { paginationData, categories, regions, loading, error };
};

const Catalog: React.FC = () => {
	const [selectedCategory, setSelectedCategory] = useState<string>("all");
	const [selectedRegion, setSelectedRegion] = useState<string>("all");
	const [currentPage, setCurrentPage] = useState<number>(1);
	const itemsPerPage = 6;

	const { paginationData, categories, regions, loading, error } = useCatalogData(
		selectedCategory,
		selectedRegion,
		currentPage,
		itemsPerPage
	);

	// Réinitialiser à la page 1 quand les filtres changent
	useEffect(() => {
		setCurrentPage(1);
	}, [selectedCategory, selectedRegion]);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		// Optionnel : scroll vers le haut
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const handlePreviousPage = () => {
		if (paginationData.hasPreviousPage) {
			handlePageChange(currentPage - 1);
		}
	};

	const handleNextPage = () => {
		if (paginationData.hasNextPage) {
			handlePageChange(currentPage + 1);
		}
	};

	// Générer les numéros de page à afficher
	const getPageNumbers = () => {
		const { totalPages, currentPage } = paginationData;
		const pages = [];
		const maxVisiblePages = 5;

		if (totalPages <= maxVisiblePages) {
			// Afficher toutes les pages si il y en a peu
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			// Logique pour afficher les pages avec "..."
			const startPage = Math.max(1, currentPage - 2);
			const endPage = Math.min(totalPages, currentPage + 2);

			if (startPage > 1) {
				pages.push(1);
				if (startPage > 2) {
					pages.push('...');
				}
			}

			for (let i = startPage; i <= endPage; i++) {
				pages.push(i);
			}

			if (endPage < totalPages) {
				if (endPage < totalPages - 1) {
					pages.push('...');
				}
				pages.push(totalPages);
			}
		}

		return pages;
	};

	if (loading && currentPage === 1) {
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
					<button type="button"
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
						<label htmlFor="category-select" className="text-sm font-medium text-gray-700">
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
						<label htmlFor="region-select" className="text-sm font-medium text-gray-700">Région:</label>
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

				{/* Results Info */}
				{paginationData.totalCount > 0 && (
					<div className="text-center mb-6">
						<p className="text-gray-600">
							{paginationData.totalCount} arbre{paginationData.totalCount > 1 ? 's' : ''} trouvé{paginationData.totalCount > 1 ? 's' : ''}
						</p>
					</div>
				)}

				{/* Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
					{loading ? (
						<div className="col-span-full text-center py-12">
							<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
							<p className="text-gray-600">Chargement...</p>
						</div>
					) : paginationData.trees.length === 0 ? (
						<div className="col-span-full text-center py-12">
							<Search className="h-16 w-16 mx-auto text-gray-600 mb-4" aria-hidden="true" />
							<p className="text-gray-600">
								Aucun arbre trouvé pour ces critères
							</p>
						</div>
					) : (
						paginationData.trees.map((tree) => (
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

				{/* Pagination */}
				{paginationData.totalPages > 1 && (
					<div className="flex justify-center items-center gap-2 mb-8">
						{/* Bouton Précédent */}
						<button
							type="button"
							onClick={handlePreviousPage}
							disabled={!paginationData.hasPreviousPage}
							className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
								paginationData.hasPreviousPage
									? 'bg-emerald-600 text-white hover:bg-emerald-700'
									: 'bg-gray-300 text-gray-500 cursor-not-allowed'
							}`}
						>
							<ChevronLeft className="h-4 w-4" />
							Précédent
						</button>

						{/* Numéros de page */}
						<div className="flex gap-1">
							{getPageNumbers().map((pageNumber, index) => (
								<React.Fragment key={index}>
									{pageNumber === '...' ? (
										<span className="px-3 py-2 text-gray-500">...</span>
									) : (
										<button
											type="button"
											onClick={() => handlePageChange(pageNumber as number)}
											className={`px-3 py-2 rounded-lg transition-colors ${
												pageNumber === paginationData.currentPage
													? 'bg-emerald-600 text-white'
													: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
											}`}
										>
											{pageNumber}
										</button>
									)}
								</React.Fragment>
							))}
						</div>

						{/* Bouton Suivant */}
						<button
							type="button"
							onClick={handleNextPage}
							disabled={!paginationData.hasNextPage}
							className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
								paginationData.hasNextPage
									? 'bg-emerald-600 text-white hover:bg-emerald-700'
									: 'bg-gray-300 text-gray-500 cursor-not-allowed'
							}`}
						>
							Suivant
							<ChevronRight className="h-4 w-4" />
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Catalog;