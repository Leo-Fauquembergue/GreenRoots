import { z } from "zod";

export const userSchema = z.object({
  name: z.string().trim().nonempty(),                 
  email: z.string().email(),                          
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères.")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial."                 
  ),                    
  role: z.string().trim().nonempty().optional(),       // Optionnel car il a une valeur par défaut en SQL
});

// Pour la mise à jour du User (tous les champs optionnels)
export const updateUserSchema = userSchema.partial();
