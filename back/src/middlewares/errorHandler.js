// Classe d'erreur
import { HttpError } from "../errors/http-error.js";
// ZodError pour gérer les erreurs de validation
import { ZodError } from "zod";

export function errorHandler(error, req, res, next) {

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
  })
};