import "dotenv/config";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(process.env.PG_URL, {
  logging: false, // Désactive les logs SQL dans la console, à activer pour le debug.
  define: {
    underscored: true, // Transforme les noms de modèles camelCase en snake_case pour les tables.
    timestamps: true, // Active les timestamps 'createdAt' et 'updatedAt'.
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
});