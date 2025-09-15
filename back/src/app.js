import express from "express";
import session from "express-session";
import SequelizeStore from "connect-session-sequelize";
import { sequelize } from "./models/associations.js";
import { router } from "./routers/router.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import cors from "cors";
import { xss } from "express-xss-sanitizer";

export const app = express();

// --- Configuration du stockage des sessions en BDD ---
const SessionStore = SequelizeStore(session.Store);
const sessionStore = new SessionStore({
	db: sequelize, // On dit au store d'utiliser notre connexion BDD
});

// --- Configuration du middleware de session ---
app.use(
	session({
		secret: process.env.SESSION_SECRET, // Une phrase secrète à mettre dans votre .env
		store: sessionStore, // On utilise notre stockage en BDD.
		resave: false, // Ne pas sauvegarder les sessions qui n'ont pas été modifiées.
		saveUninitialized: false, // Ne pas créer de session pour les visiteurs non authentifiés.
		cookie: {
			httpOnly: true, // Le cookie ne peut pas être lu par du JavaScript côté client (protection XSS).
			secure: process.env.NODE_ENV === "production", // Le cookie ne sera envoyé que sur des connexions HTTPS en production.
			maxAge: 7 * 24 * 60 * 60 * 1000, // Durée de vie du cookie (ex: 7 jours).
		},
	}),
);

// Middleware CORS
app.use(
	cors({
		origin: process.env.CORS_ORIGIN, // Domaine(s) autorisé(s)
		methods: ["GET", "POST", "PATCH", "DELETE"], // Méthodes autorisées
		credentials: true, // Autorise l'envoi de cookies entre domaines
	}),
);

// Middleware pour parser le JSON
app.use(express.json());

// Middleware anti-XSS
app.use(xss());

// Route "health check" pour vérifier que le serveur est en ligne
app.get("/", (req, res) => {
	res.json({
		message: "GreenRoots API is running",
	});
});

// Toutes les routes de l'API seront préfixées par /api
app.use("/api", router);

// Middleware gestion d'erreur
app.use(errorHandler);