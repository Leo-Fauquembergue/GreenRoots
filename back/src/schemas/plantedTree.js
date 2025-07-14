import { z } from "zod";

export const plantedTreeSchema = z.object({
	personalName: z.string().trim().optional(),
	plantingDate: z.string().date().optional(), // Date ISO (YYYY-MM-DD)
	plantingPlace: z.string().trim().optional(),
	catalogTreeId: z.number().int().positive(),
	orderId: z.number().int().positive(),
});

export const updatePlantedTreeSchema = plantedTreeSchema.partial();
