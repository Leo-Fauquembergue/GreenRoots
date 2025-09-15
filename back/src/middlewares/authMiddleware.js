import { HttpError } from "../errors/http-error.js";

// Vérifie si une session utilisateur existe. Si non, l'accès est refusé.
export function isAuthenticated(req, res, next) {
	if (req.session.user) {
		// La personne est authentifiée. On la laisse passer à l'étape suivante.
		next();
	} else {
		// Personne inconnue. On lance une erreur 401 (Non autorisé).
		throw new HttpError(
			401,
			"Accès non autorisé. Vous devez être connecté pour accéder à cette ressource.",
		);
	}
}

// Vérifie le rôle de l'utilisateur. Il doit impérativement être utilisé APRÈS le middleware 'isAuthenticated'.
export function isAdmin(req, res, next) {
	if (req.session.user.role === "admin") {
		// C'est bien un admin. On le laisse passer à la destination finale (le contrôleur).
		next();
	} else {
		// C'est un simple utilisateur qui essaie d'accéder à une zone réservée. On lance une erreur 403 (Interdit).
		throw new HttpError(
			403,
			"Accès refusé. Cette action requiert des droits d'administrateur.",
		);
	}
}