import { Link } from "react-router-dom";
import { Leaf, Globe, TreeDeciduous, Gift } from "lucide-react";
import "../style/style.scss";

export default function AboutUsPage() {
	return (
		<div className="min-h-screen text-gray-800 px-4 pt-38 pb-20 md:px-10">
			<div className="max-w-6xl mx-auto">
				{/* Titre principal */}
				<h1 className="page-title">
					GreenRoots : Plantez un arbre, suivez son impact
				</h1>

				<p className="text-lg md:text-xl text-center mb-10 text-gray-700">
					Avec GreenRoots, chaque arbre planté devient une histoire vivante.{" "}
					<Leaf className="inline w-5 h-5 text-green-700" />
				</p>

				{/* Section plantation */}
				<div className="grid md:grid-cols-2 gap-10 items-center mb-20">
					<img
						src="/images/gens-plantant-des-arbres-a-la-campagne.webp"
						alt="Plantation d'un arbre"
						className="w-full rounded-xl shadow-md object-cover max-h-[400px]"
					/>
					<div>
						<h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-green-800">
							<Globe className="w-6 h-6" />
							Une action concrète pour la planète
						</h2>
						<p className="text-gray-800 mb-4">
							GreenRoots vous permet de parrainer un arbre, de choisir son
							espèce, sa région, et de recevoir des mises à jour régulières sur
							sa croissance, sa santé et son impact écologique.
						</p>
						<p className="text-gray-800">
							En collaborant avec des associations locales, nous garantissons
							une plantation responsable, durable, et 100% traçable.
						</p>
					</div>
				</div>

				{/* Section tracking */}
				<div className="grid md:grid-cols-2 gap-10 items-center mb-20">
					<img
						src="/images/pexels-gary-barnes-6231889.webp"
						alt="Suivi d'un arbre planté"
						className="w-full rounded-xl shadow-md object-cover max-h-[400px]"
					/>
					<div>
						<h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-green-800">
							<TreeDeciduous className="w-6 h-6" />
							Un suivi personnalisé
						</h2>
						<p className="text-gray-800 mb-4">
							Chaque arbre possède une fiche de suivi accessible depuis votre
							espace personnel. Hauteur, photos, conditions de croissance...
							vous suivez l’évolution de votre arbre en temps réel.
						</p>
						<p className="text-gray-800">
							Offrez-le, nommez-le, suivez-le. GreenRoots, c’est une expérience
							personnelle et engageante.
						</p>
					</div>
				</div>

				{/* Section À propos de nous */}
				<div className="mb-20">
					<h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-4 text-center">
						À propos de GreenRoots
					</h2>
					<p className="text-gray-800 text-center max-w-3xl mx-auto leading-relaxed">
						GreenRoots est une plateforme créée en 2025 par une équipe
						passionnée par la nature, le numérique et l’impact positif. <br />
						<br />
						Notre mission est simple : rendre la reforestation accessible à
						tous. 🌳 Grâce à une technologie de suivi innovante et des
						partenariats locaux solides, nous offrons à chaque utilisateur la
						possibilité de planter un arbre, de lui donner un nom et de suivre
						son évolution dans le temps.
						<br />
						<br />
						GreenRoots, c’est bien plus qu’un geste symbolique. C’est une
						manière concrète de participer à la restauration des écosystèmes, de
						soutenir des communautés locales et de transmettre un héritage
						durable aux générations futures.
					</p>
				</div>

				{/* Appel à l’action */}
				<div className="text-center mt-24">
					<h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-4 flex items-center justify-center gap-2">
						<Gift className="w-6 h-6" />
						Rejoignez le mouvement
					</h2>
					<p className="text-gray-800 mb-6">
						Parce que chaque arbre compte. Offrez un cadeau porteur de sens, ou
						engagez-vous pour un avenir plus vert.
					</p>
					<Link className="btn-dark p-3" to="/catalog">
						🌱 Découvrir les arbres à planter
					</Link>
				</div>
			</div>
		</div>
	);
}
