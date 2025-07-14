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
	const userProfile = await User.findByPk(user.userId);
	res.json({ message: "Connexion réussie !", user: userProfile });
}

export async function logout(req, res) {
	res.status(200).json({ message: "Déconnexion réussie." });
}
