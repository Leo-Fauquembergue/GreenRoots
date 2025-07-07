import { z } from "zod";

export const catalogTreeSchema = z.object({
  common_name: z.string().trim().nonempty(),
  scientific_name: z.string().trim().nonempty(),
  description: z.string().trim().optional(),
  adult_height: z.number().positive().optional(), // NUMERIC => number (optionnel si pas obligatoire)
  image: z.string().url().optional(),              // On suppose que c’est une URL
  price: z.number().nonnegative().optional(),      // Prix >= 0
  category_id: z.number().int().positive(),        // Foreign key obligatoire
  region_id: z.number().int().positive(),          // Foreign key obligatoire
});

export const updateCatalogTreeSchema = catalogTreeSchema.partial();
