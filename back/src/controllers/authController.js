import { User } from "./../models/associations.js";
import { userSchema, loginSchema } from "../schemas/index.js";
import { HttpError } from "../errors/http-error.js";
import argon2 from "argon2";

export async function register(req, res) {
	const data = userSchema.parse(req.body);
	const existingUser = await User.findOne({ where: { email: data.email } });
	if (existingUser) {
		throw new HttpError(409, "Un utilisateur avec cet email existe déjà.");
	}
	const hashedPassword = await argon2.hash(data.password);
	const newUser = await User.create({ ...data, password: hashedPassword });
	res.status(201).json(newUser);
}

export async function login(req, res) {
	const { email, password } = loginSchema.parse(req.body);
	const user = await User.scope("withPassword").findOne({ where: { email } });
	if (!user || !(await argon2.verify(user.password, password))) {
		throw new HttpError(401, "Email ou mot de passe incorrect.");
	}

	// On stocke les informations de l'utilisateur dans la session.
	// Ne stockez JAMAIS le mot de passe dans la session.
	req.session.user = {
		id: user.userId,
		name: user.name,
		email: user.email,
		role: user.role,
	};

	res.json({ message: "Connexion réussie !", user: req.session.user });
}

export async function logout(req, res) {
	// On détruit la session sur le serveur.
	req.session.destroy((err) => {
		if (err) {
			return res.status(500).json({ message: "Échec de la déconnexion." });
		}
		// On efface le cookie côté client.
		res.clearCookie("connect.sid"); // 'connect.sid' est le nom par défaut du cookie de session
		res.status(200).json({ message: "Déconnexion réussie." });
	});
}

// GET /api/auth/me - Vérifie la session et renvoie l'utilisateur courant
export async function getCurrentUser(req, res) {
	// Le middleware de session a déjà fait tout le travail.
	// Si l'utilisateur est connecté, ses informations sont dans req.session.user.
	if (req.session.user) {
		res.json({ user: req.session.user });
	} else {
		// Si req.session.user n'existe pas, l'utilisateur n'est pas authentifié.
		// On pourrait renvoyer une erreur 401, mais renvoyer { user: null } est
		// souvent plus simple à gérer côté frontend.
		res.json({ user: null });
	}
}
