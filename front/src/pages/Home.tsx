import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TreeCard from "../components/TreeCard.tsx";
import backgroundImage from "../assets/background-tree.jpg";
import api from "../services/api";
import type { CatalogTree } from "../hooks/types";
import "../style/style.scss";

export default function Home() {
	const [trees, setTrees] = useState<CatalogTree[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchLatestTrees = async () => {
			try {
				setLoading(true);
				const response = await api.get("/catalog-trees?limit=3");
				setTrees(response.data.data); //`data` est un objet,
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
		<div className="pt-0 min-h-screen">
			{/* Section principale */}
			<section
				className="flex flex-col justify-center items-center text-center h-screen bg-dark bg-cover bg-center text-white px-8"
				style={{ backgroundImage: `url(${backgroundImage})` }}
			>
				<div className="max-w-[50rem] pt-10 mt-90 mb-12 text-shadow backdrop-blur-[0.8px]">
					<h1 className="text-6xl mb-10 " 
					>
						Plantez un arbre !<br />
						Respirez demain !
					</h1>
					<p className="text-2xl mb-8">
						Chez Greenroots, nous croyons qu'un petit geste peut avoir un grand
						impact. Planter un arbre, c'est bien plus qu'un acte symbolique.
						C'est lutter contre le réchauffement climatique en capturant le
						CO2, c'est restaurer la biodiversité en créant des habitats pour
						la faune, c'est préserver les sols et les ressources en eau,
						c'est soutenir les communautés locales grâce à des projets de
						reforestation durable.
					</p>
					<Link to="/en-savoir-plus" className="btn-dark p-4 mb-20 inline-block">
  					En savoir plus
					</Link>

				</div>
			</section>

			{/* Section des 3 derniers arbres */}
			<section  className="justify-around py-16 px-24">
				<h2 className="text-center text-2xl font-bold mb-10">Derniers arbres ajoutés:</h2>

				{loading && <p>Chargement...</p>}
				{error && <p className="text-red-500">{error}</p>}

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
					{trees.map((tree) => (
						<TreeCard key={tree.catalogTreeId} tree={tree} />
					))}
				</div>
			</section>
		</div>
	);
}
