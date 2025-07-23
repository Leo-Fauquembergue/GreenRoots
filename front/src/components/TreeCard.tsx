import type React from "react";
import { Link } from "react-router-dom";
import type { TreeCardProps } from "../hooks/types";
import "../style/style.scss";

const TreeCard: React.FC<TreeCardProps> = ({ tree }) => {
	return (
		<div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
			<div className="h-48 bg-gray-100 relative overflow-hidden">
				<img
					// On passe directement l'URL complète que l'on reçoit de l'API.
					// Si l'image n'existe pas, on utilise l'image de remplacement.
					src={tree.image || "/images/tree-placeholder.jpg"}
					alt={tree.commonName}
					className="w-full h-full object-cover"
					onError={(e) => {
						e.currentTarget.src = "/images/tree-placeholder.jpg";
					}}
				/>
			</div>
			<div className="p-6 flex flex-col flex-grow">
				<div className="mb-3">
					<span className="color-pistachio text-xs italic tracking-wide">
						{tree.category.name} / {tree.region.name}
					</span>
				</div>
				<h3 className="text-xl mb-2 leading-tight">{tree.commonName}</h3>
				<p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
					{tree.description}
				</p>
				<Link
					to={`/catalog/${tree.catalogTreeId}`}
					className="btn-light w-full text-center px-6 py-3 rounded-full text-sm font-medium hover:text-white transition-all duration-300 hover:-translate-y-0.5 mt-auto"
				>
					En savoir plus
				</Link>
			</div>
		</div>
	);
};

export default TreeCard;
