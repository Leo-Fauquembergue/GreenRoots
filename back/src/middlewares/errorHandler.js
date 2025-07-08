import { HttpError } from "../errors/http-error.js";
import { ZodError } from "zod";

export function errorHandler(error, req, res, next) {
  console.error(error);

  if (error instanceof HttpError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  if (error instanceof ZodError) {
    return res.status(400).json({
      message: "Erreur de validation des données.",
      errors: error.errors,
    });
  }

  res.status(500).json({ message: "Erreur interne du serveur." });
}
