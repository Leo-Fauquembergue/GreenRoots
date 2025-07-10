import React, { useEffect, useState } from "react";
import TreeCard from "../components/TreeCard.tsx";
import backgroundImage from "../assets/background-tree.jpg";
import axios from "axios";
import "../style/home.scss";



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

export default function Home() {
  const [trees, setTrees] = useState<CatalogTree[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestTrees = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/catalog-trees?limit=3");
        setTrees(response.data);
      } catch (err: any) {
        setError(err.message || "Erreur de chargement");
      } finally {
        setLoading(false);
      }
    };

    fetchLatestTrees();
  }, []);

  return (
    <div className="home-container">
      {/* Section principale */}
      <section className="hero" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="hero-text">
          <h1>
            Plantez un arbre !<br />
            Respirez demain !
          </h1>
          <p>
		  Chez Greenroots, nous croyons qu'un petit geste peut avoir un grand
// 						impact. Planter un arbre, c'est bien plus qu'un acte symbolique.
// 						C'est lutter contre le réchauffement climatique en capturant le CO2,
// 						c'est restaurer la biodiversité en créant des habitats pour la
// 						faune, c'est préserver les sols et les ressources en eau, c'est
// 						soutenir les communautés locales grâce à des projets de
// 						reforestation durable.
          </p>
          <button>En savoir plus</button>
        </div>
      </section>

      {/* Section des 3 derniers arbres */}
      <section className="cards-section">
        {/* <h2 className="text-center text-2xl font-bold mb-6">Derniers arbres ajoutés</h2> */}

        {loading && <p>Chargement...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {trees.map((tree) => (
			<TreeCard
				categoryName={tree.category.name}
				key={tree.catalogTreeId}
				catalogTreeId={tree.catalogTreeId}
				commonName={tree.commonName}
				description={tree.description}
				image={tree.image}
				regionName={tree.region.name}
				
			
/>          ))}
        </div>
      </section>
    </div>
  );
}