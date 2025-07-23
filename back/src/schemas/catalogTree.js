import { z } from "zod";

export const catalogTreeSchema = z.object({
	commonName: z.string().trim().nonempty(),
	scientificName: z.string().trim().nonempty(),
	description: z.string().trim().optional(),
	adultHeight: z.number().positive().optional(), // NUMERIC => number (optionnel si pas obligatoire)
	image: z.string().url().optional(), // On suppose que c’est une URL
	price: z.number().nonnegative().optional(), // Prix >= 0
	categoryId: z.number().int().positive(), // Foreign key obligatoire
	regionId: z.number().int().positive(), // Foreign key obligatoire
});

export const updateCatalogTreeSchema = catalogTreeSchema.partial();
