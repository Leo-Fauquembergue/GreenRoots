import express from "express";
import { router } from "./routers/router.js";
import { HttpError } from "./errors/http-error.js"; // Classe d'erreur
import { ZodError } from "zod"; // ZodError pour gérer les erreurs de validation

export const app = express();

// Utiliser un body parser pour spécifier qu'on reçoit du json dans les body des requêtes
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "GreenRoots API is running",
  });
});

app.use(router);

// --- MIDDLEWARE DE GESTION D'ERREURS ---
app.use((error, req, res, next) => {
  // Toujours loguer l'erreur en console pour le débogage
  console.error(error);

  // Cas 1 : C'est une erreur HTTP que nous avons lancée intentionnellement
  if (error instanceof HttpError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  // Cas 2 : C'est une erreur de validation de Zod
  if (error instanceof ZodError) {
    // On formate une réponse claire avec les détails de l'erreur de validation
    return res.status(400).json({
      message: "Erreur de validation des données.",
      errors: error.errors, // Le tableau détaillé des champs invalides
    });
  }

  // Cas 3 : Pour toutes les autres erreurs imprévues (bugs, etc.)
  // On renvoie une erreur 500 générique pour ne pas exposer de détails sensibles.
  res.status(500).json({ message: "Erreur interne du serveur." });
});