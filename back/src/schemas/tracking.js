import { z } from "zod";

export const trackingSchema = z.object({
  statement_date: z.string().datetime().optional(),
  condition: z.string().trim().optional(),
  current_height: z.number().positive().optional(),
  current_picture: z.string().url().optional(),
  planted_tree_id: z.number().int().positive(),
});

export const updateTrackingSchema = trackingSchema.partial();   
