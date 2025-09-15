import { User } from "./../models/associations.js";
import { idSchema, updateUserSchema } from "../schemas/index.js";
import { HttpError } from "../errors/http-error.js";
import argon2 from "argon2";

export async function getAllUsers(req, res) {
	const users = await User.findAll({
		include: {
			association: "orders",
			attributes: ["orderId", "status", "orderDate"],
		},
		order: [["created_at", "DESC"]],
	});
	res.json(users);
}

export async function getOneUser(req, res) {
	const { id } = idSchema.parse(req.params);
	const user = await User.findByPk(id, {
		include: {
			association: "orders",
			include: {
				association: "plantedTrees",
				include: ["catalogTree"],
			},
		},
	});
	if (!user) {
		throw new HttpError(404, "Utilisateur non trouvé.");
	}
	res.json(user);
}

export async function updateUser(req, res) {
	const { id } = idSchema.parse(req.params);
	const data = updateUserSchema.parse(req.body);
	if (data.password) {
		data.password = await argon2.hash(data.password);
	}
	const [updated] = await User.update(data, { where: { userId: id } });
	if (!updated) throw new HttpError(404, "Utilisateur non trouvé.");
	res.json(await User.findByPk(id));
}

export async function deleteUser(req, res) {
	const { id } = idSchema.parse(req.params);
	const deleted = await User.destroy({ where: { userId: id } });
	if (!deleted) throw new HttpError(404, "Utilisateur non trouvé.");
	res.status(204).end();
}