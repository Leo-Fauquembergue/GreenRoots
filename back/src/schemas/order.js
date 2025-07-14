import { z } from "zod";

export const orderSchema = z.object({
	orderDate: z.string().datetime().optional(), // Optional car SQL donne une valeur par défaut
	status: z.enum(["pending", "completed", "cancelled"]).optional(), // Exemple de statut si tu veux limiter les valeurs
	userId: z.number().int().positive(), // Clé étrangère obligatoire
});

// Pour la mise à jour de l'Order
export const updateOrderSchema = orderSchema.partial();
