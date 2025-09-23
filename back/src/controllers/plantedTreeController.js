import { PlantedTree } from "./../models/associations.js";
import {
	idSchema,
	plantedTreeSchema,
	updatePlantedTreeSchema,
} from "../schemas/index.js";
import { HttpError } from "../errors/http-error.js";

export async function getAllPlantedTrees(req, res) {
	const trees = await PlantedTree.findAll({
		include: ["order", "catalogTree"],
		order: [["created_at", "DESC"]],
	});
	res.json(trees);
}

export async function getOnePlantedTree(req, res) {
	const { id: plantedTreeId } = idSchema.parse(req.params);
	const user = req.session.user;

	const tree = await PlantedTree.findByPk(plantedTreeId, {
		include: [
			{ association: "order" },
			{ association: "catalogTree" },
			{ association: "trackings" },
		],
	});

	if (!tree) {
		throw new HttpError(404, "Arbre planté non trouvé.");
	}

	// L'utilisateur peut voir l'arbre si il est admin OU si la commande associée lui appartient.
	if (user.role !== "admin" && tree.order.userId !== user.id) {
		throw new HttpError(403, "Accès refusé.");
	}

	res.json(tree);
}

export async function createPlantedTree(req, res) {
	const data = plantedTreeSchema.parse(req.body);
	const newTree = await PlantedTree.create(data);
	res.status(201).json(newTree);
}

export async function updatePlantedTree(req, res) {
	const { id: plantedTreeId } = idSchema.parse(req.params);
	const user = req.session.user;
	const data = updatePlantedTreeSchema.parse(req.body);

	const treeToUpdate = await PlantedTree.findByPk(plantedTreeId, {
		include: ["order"],
	});
	if (!treeToUpdate) throw new HttpError(404, "Arbre planté non trouvé.");

	// L'utilisateur peut mettre à jour l'arbre si :
	// 1. Il est admin (il peut tout modifier).
	// 2. OU si la commande lui appartient ET qu'il ne tente de modifier que des champs autorisés (comme personalName).
	if (user.role !== "admin") {
		if (treeToUpdate.order.userId !== user.id) {
			throw new HttpError(
				403,
				"Accès refusé. Vous ne pouvez modifier que vos propres arbres.",
			);
		}
		// Sécurité : un utilisateur normal ne peut pas changer l'orderId ou le catalogTreeId.
		// On s'assure qu'il ne modifie que les champs permis.
		const allowedUpdates = ["personalName", "plantingPlace"]; // Ajoutez les champs que l'user peut modifier
		for (const key in data) {
			if (!allowedUpdates.includes(key)) {
				throw new HttpError(
					403,
					`Vous n'êtes pas autorisé à modifier le champ '${key}'.`,
				);
			}
		}
	}

	const [updated] = await PlantedTree.update(data, {
		where: { plantedTreeId },
	});
	if (!updated) throw new HttpError(404, "Mise à jour échouée.");

	res.json(await PlantedTree.findByPk(plantedTreeId));
}

export async function deletePlantedTree(req, res) {
	const { id } = idSchema.parse(req.params);
	const deleted = await PlantedTree.destroy({ where: { plantedTreeId: id } });
	if (!deleted) {
		throw new HttpError(404, "Arbre planté non trouvé.");
	}
	res.status(204).end();
}

export async function getUserPlantedTrees(req, res) {
	const userId = req.session.user?.id;

	if (!userId) {
		return res.status(401).json({ message: "Utilisateur non connecté." });
	}

	try {
		const trees = await PlantedTree.findAll({
			include: [
				{
					association: "order",
					where: {
						userId,
						status: ["completed"], // ou ['completed', 'cancelled'] selon ton besoin
					},
					attributes: [], // on masque les détails de la commande
				},
				{
					association: "catalogTree",
					attributes: ["catalogTreeId", "commonName", "image"],
				},
			],
			order: [["created_at", "DESC"]],
		});

		res.json(trees);
	} catch (error) {
		res.status(500).json({ message: "Erreur serveur", error });
	}
}
