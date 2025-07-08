// --- Schéma Générique ---
// Pour valider les IDs numériques dans les paramètres d'URL (ex: /orders/1)
import { z } from "zod";

export const idSchema = z.object({
  id: z.coerce.number().int().positive("L'ID doit être un entier positif."),
});