import "dotenv/config";
import { Sequelize } from "sequelize";

const options = {
	logging: false, // Désactive les logs SQL dans la console, à activer pour le debug.
	define: {
		underscored: true, // Transforme les noms de modèles camelCase en snake_case pour les tables.
		timestamps: true, // Active les timestamps 'createdAt' et 'updatedAt'.
		createdAt: "created_at",
		updatedAt: "updated_at",
	},
};

// === AJOUT POUR LA PRODUCTION ===
// Si la variable d'environnement NODE_ENV est 'production', on ajoute les options SSL.
if (process.env.NODE_ENV === "production") {
	options.dialectOptions = {
		ssl: {
			require: true,
			// Cette option est souvent nécessaire sur Render pour éviter des erreurs de certificat
			rejectUnauthorized: false, 
		},
	};
}

// On crée l'instance Sequelize en passant l'URL et les options (qui contiennent maintenant le SSL si besoin)
export const sequelize = new Sequelize(process.env.DATABASE_URL, options);