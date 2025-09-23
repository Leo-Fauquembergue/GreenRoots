import { sequelize } from "./../models/associations.js";
import session from "express-session";
import SequelizeStore from "connect-session-sequelize";

// On doit recréer une instance du store ici pour pouvoir appeler .sync()
const SessionStore = SequelizeStore(session.Store);
const sessionStore = new SessionStore({
	db: sequelize,
});

console.log("🚧 Création des tables");

// On enveloppe dans un try/catch pour une meilleure gestion des erreurs
try {
	await sequelize.sync({ force: true });
	await sessionStore.sync(); // Cette ligne peut maintenant créer la table 'Sessions'
	console.log("✅ Tables créées avec succès !");
} catch (error) {
	console.error("❌ Erreur lors de la création des tables :", error);
} finally {
	await sequelize.close();
	console.log("🔌 Connexion à la base de données fermée.");
}
