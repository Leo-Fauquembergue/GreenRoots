import { z } from "zod";

export const trackingSchema = z.object({
	statementDate: z.string().datetime().optional(),
	condition: z.string().trim().optional(),
	currentHeight: z.number().positive().optional(),
	currentPicture: z.string().url().optional(), // à voir si on utilise url ou local
	plantedTreeId: z.number().int().positive(),
});

export const updateTrackingSchema = trackingSchema.partial();
