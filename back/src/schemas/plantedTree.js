import { z } from "zod";

export const plantedTreeSchema = z.object({
  personal_name: z.string().trim().optional(),
  planting_date: z.string().date().optional(),           // Date ISO (YYYY-MM-DD)
  planting_place: z.string().trim().optional(),
  catalog_tree_id: z.number().int().positive(),
  order_id: z.number().int().positive(),
});

export const updatePlantedTreeSchema = plantedTreeSchema.partial();
