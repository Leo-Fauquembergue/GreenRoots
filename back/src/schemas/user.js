import { z } from "zod";

// Schéma pour la CRÉATION / L'ENREGISTREMENT (REGISTER)
export const userSchema = z.object({
	name: z.string().trim().nonempty(),
	email: z.string().email(),
	password: z
		.string()
		.min(8, "Le mot de passe doit contenir au moins 8 caractères.")
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
			"Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial.",
		),
	role: z.enum(["user", "admin"]).optional(),
});

// Schéma pour la MISE À JOUR
export const updateUserSchema = userSchema.partial();

// Schéma pour la CONNEXION (LOGIN)
export const loginSchema = z.object({
	email: z.string().email("L'adresse email est invalide."),
	password: z.string().nonempty("Le mot de passe ne peut pas être vide."),
});
