import React, { useEffect, useState } from "react";
import TreeCard from "../components/TreeCard.tsx";
import backgroundImage from "../assets/background-tree.jpg";
import axios from "axios";
import "../style/home.scss";
import type { CatalogTree } from "../hooks/types"; // Interface de type pour un arbre

export default function Home() {
	const [trees, setTrees] = useState<CatalogTree[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchLatestTrees = async () => {
			try {
				const response = await axios.get(
					"http://localhost:3000/api/catalog-trees?limit=3",
				);
				setTrees(response.data);
			} catch (err: unknown) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError("Erreur de chargement");
				}
			} finally {
				setLoading(false);
			}
		};

		fetchLatestTrees();
	}, []);

	return (
		<div className="home-container">
			{/* Section principale */}
			<section
				className="hero"
				style={{ backgroundImage: `url(${backgroundImage})` }}
			>
				<div className="hero-text">
					<h1>
						Plantez un arbre !<br />
						Respirez demain !
					</h1>
					<p>
						Chez Greenroots, nous croyons qu'un petit geste peut avoir un grand
						impact. Planter un arbre, c'est bien plus qu'un acte symbolique.
						C'est lutter contre le réchauffement climatique en capturant le CO2,
						c'est restaurer la biodiversité en créant des habitats pour la
						faune, c'est préserver les sols et les ressources en eau, c'est
						soutenir les communautés locales grâce à des projets de
						reforestation durable.
					</p>
					<button className="more-button" type="button">
						En savoir plus
					</button>
				</div>
			</section>

			{/* Section des 3 derniers arbres */}
			<section className="cards-section">
				<h2 className="text-center text-2xl font-bold mb-6">
					Derniers arbres ajoutés
				</h2>

				{loading && <p>Chargement...</p>}
				{error && <p className="text-red-500">{error}</p>}

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
					{trees.map((tree) => (
						<TreeCard
							key={tree.catalogTreeId}
							catalogTreeId={tree.catalogTreeId}
							commonName={tree.commonName}
							description={tree.description}
							image={tree.image}
							categoryName={tree.category.name}
							regionName={tree.region.name}
						/>
					))}
				</div>
			</section>
		</div>
	);
}
