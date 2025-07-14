import express from "express";
import { router } from "./routers/router.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import cors from "cors";
import { xss } from "express-xss-sanitizer";

export const app = express();

// Middleware CORS
app.use(
	cors({
		origin: process.env.CORS_ORIGIN, // Domaine(s) autorisé(s)
		methods: ["GET", "POST", "PATCH", "DELETE"], // Méthodes autorisées
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
