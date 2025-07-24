import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Hook pour lire les paramètres de l'URL (comme :id)
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import type { CatalogTree } from "../hooks/types";
import { ShoppingCart } from "lucide-react";
import api from "../services/api";
import { toastRef } from "../App";
import "../style/style.scss";
import "../style/_utils.scss";

const TreeDetails: React.FC = () => {
	// Récupère le paramètre 'id' depuis l'URL.
	const { id } = useParams<{ id: string }>();

	// États du composant
	const [tree, setTree] = useState<CatalogTree | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const { user } = useAuth();
	const { addToCart } = useCart();
	const navigate = useNavigate();

	// Ce hook s'exécute une fois que le composant est monté, ou si l'ID dans l'URL change.
	useEffect(() => {
		if (!id) return;

		const fetchTreeDetails = async () => {
			try {
				setLoading(true); // On commence le chargement
				const response = await api.get(`/catalog-trees/${id}`);
				setTree(response.data); // On met à jour l'état avec les données reçues de l'API
			} catch (err: any) {
				// En cas d'erreur (ex: l'arbre n'existe pas, erreur 404), on stocke le message d'erreur.
				setError(err.response?.data?.message || "Arbre non trouvé.");
			} finally {
				// Quoi qu'il arrive (succès ou erreur), on arrête le chargement.
				setLoading(false);
			}
		};

		fetchTreeDetails();
	}, [id]); // Dépendance : ce code se ré-exécute si l'ID change

	const handleAddToCart = async () => {
		if (!user) {
			alert("Vous devez être connecté pour ajouter un article au panier.");
			navigate("/login");
			return;
		}
		if (tree) {
			try {
				await addToCart(tree.catalogTreeId);
				toastRef.current?.showToast(
					`${tree.commonName} a été ajouté au panier !`,
					"success",
				);
			} catch (error) {
				toastRef.current?.showToast("Une erreur est survenue.", "error");
			}
		}
	};

	// Pendant le chargement, on affiche un spinner.
	if (loading) {
		return (
			<div className="min-h-screen bg-white flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600 mx-auto mb-4"></div>
					<p className="text-gray-600">Chargement de l'arbre...</p>
				</div>
			</div>
		);
	}

	// S'il y a eu une erreur ou si l'arbre n'a pas été trouvé, on affiche un message d'erreur.
	if (error || !tree) {
		return (
			<div className="min-h-screen bg-white flex items-center justify-center text-center">
				<p className="text-red-600">{error || "Une erreur est survenue."}</p>
			</div>
		);
	}

	// Les données JSON transforment souvent les nombres décimaux en chaînes de caractères (ex: "15.00").
	// On doit donc s'assurer de reconvertir le prix en un vrai type `number` avant d'utiliser .toFixed().
	const priceAsNumber = parseFloat(tree.price as any) || 0;

	// Si tout s'est bien passé, on affiche les détails de l'arbre.
	return (
		<div className="catalog min-h-screen py-20">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-10">
					<h1 className="text-4xl md:text-5xl font-bold text-gray-800 mt-35">
						Détails de l'arbre
					</h1>
				</div>

				<div className="bg-white rounded-lg shadow-xl overflow-hidden">
					<div className="grid grid-cols-1 md:grid-cols-2">
						{/* Colonne de gauche : l'image de l'arbre */}
						<div className="p-4">
							<img
								src={tree.image || "/images/tree-placeholder.jpg"}
								alt={tree.commonName}
								className="w-full h-full object-cover rounded-lg"
							/>
						</div>

						{/* Colonne de droite : les informations textuelles */}
						<div className="p-8 flex flex-col justify-between">
							<div>
								<h2 className="text-3xl font-bold text-gray-900 mb-2">
									{tree.commonName}
								</h2>
								<p className="text-md text-gray-500 italic mb-6">
									{tree.scientificName}
								</p>

								<div className="space-y-4 text-gray-700">
									<div>
										<strong className="font-semibold">Description :</strong>
										<p className="mt-1">{tree.description}</p>
									</div>
									<div>
										<strong className="font-semibold">Taille adulte :</strong>{" "}
										{tree.adultHeight} m
									</div>
									<div>
										<strong className="font-semibold">Catégorie :</strong>{" "}
										{tree.category.name}
									</div>
									<div>
										<strong className="font-semibold">Région :</strong>{" "}
										{tree.region.name}
									</div>
									<div className="text-2xl font-bold text-emerald-600 pt-4">
										<strong className="font-semibold">Prix :</strong>
										{/* On utilise notre variable convertie pour un affichage sécurisé */}
										{priceAsNumber.toFixed(2)} €
									</div>
								</div>
							</div>

							{/* Bouton d'action en bas de la colonne */}
							<div className="mt-8">
								<button
									type="button"
									onClick={handleAddToCart}
									className="btn-dark w-full flex items-center justify-center gap-3 px-6 py-4 rounded-lg text-lg font-medium text-white transition-all duration-300 hover:-translate-y-0.5"
								>
									<ShoppingCart size={20} />
									Ajouter au panier
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TreeDetails;
