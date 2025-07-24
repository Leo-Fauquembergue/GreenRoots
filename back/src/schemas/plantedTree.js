import { z } from "zod";

export const plantedTreeSchema = z.object({
	personalName: z.string().trim().optional(),
	plantingDate: z
		.string()
		.regex(/^\d{4}-\d{2}-\d{2}$/, "Date invalide, format attendu : YYYY-MM-DD")
		.optional(),
	plantingPlace: z.string().trim().optional(),
	catalogTreeId: z.number().int().positive(),
	orderId: z.number().int().positive(),
});

export const updatePlantedTreeSchema = plantedTreeSchema.partial();
