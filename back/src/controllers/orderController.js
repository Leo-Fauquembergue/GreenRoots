import {
	Order,
	User,
	PlantedTree,
	CatalogTree,
} from "./../models/associations.js";
import { idSchema, orderSchema, updateOrderSchema } from "../schemas/index.js";
import { HttpError } from "../errors/http-error.js";

// Fonction pour l'admin, pour voir TOUTES les commandes
export async function getAllOrders(req, res) {
	const orders = await Order.findAll({
		// On s'assure d'inclure les attributs et les associations
		attributes: ["orderId", "status", "orderDate", "created_at"], // On demande explicitement les champs
		include: [
			{
				association: "user",
				attributes: ["userId", "name", "email"],
			},
			{
				association: "plantedTrees",
				include: [
					{
						association: "catalogTree",
						attributes: ["commonName", "scientificName", "price", "image"], // On inclut les infos nécessaires
					},
				],
			},
		],
		order: [["orderDate", "DESC"]], // Trier du plus récent au plus ancien
	});
	res.json(orders);
}

// Fonction pour voir UNE commande (avec contrôle de permission)
export async function getOneOrder(req, res) {
	const { id: orderId } = idSchema.parse(req.params);
	const user = req.session.user;

	const order = await Order.findByPk(orderId, {
		include: [
			{ association: "user" },
			{
				association: "plantedTrees",
				include: [{ association: "catalogTree" }],
			},
		],
	});

	if (!order) {
		throw new HttpError(404, "Commande non trouvée.");
	}

	if (user.role !== "admin" && order.userId !== user.id) {
		throw new HttpError(
			403,
			"Accès refusé. Vous ne pouvez voir que vos propres commandes.",
		);
	}

	res.json(order);
}

// Fonction pour créer une commande (utilisée par l'admin, si besoin)
export async function createOrder(req, res) {
	const data = orderSchema.parse(req.body);
	const newOrder = await Order.create(data);
	res.status(201).json(newOrder);
}

// Fonction pour mettre à jour une commande (utilisée par l'admin)
export async function updateOrder(req, res) {
	const { id } = idSchema.parse(req.params);
	const data = updateOrderSchema.parse(req.body);

	const [updated] = await Order.update(data, { where: { orderId: id } });
	if (!updated) {
		throw new HttpError(404, "Commande non trouvée.");
	}

	const updatedOrder = await Order.findByPk(id);
	res.json(updatedOrder);
}

// Fonction pour supprimer une commande (utilisée par l'admin)
export async function deleteOrder(req, res) {
	const { id } = idSchema.parse(req.params);
	const deleted = await Order.destroy({ where: { orderId: id } });
	if (!deleted) {
		throw new HttpError(404, "Commande non trouvée.");
	}
	res.status(204).end();
}

// Fonction pour un utilisateur qui veut voir SES commandes
export async function getUserOrders(req, res) {
	if (!req.session.user) {
		throw new HttpError(
			401,
			"Vous devez être connecté pour voir vos commandes.",
		);
	}

	const userId = req.session.user.id;

	const orders = await Order.findAll({
		where: {
			userId: userId,
			status: ["completed", "cancelled"], // On exclut les paniers en cours
		},
		include: [
			{
				association: "plantedTrees",
				include: [
					{
						association: "catalogTree",
						include: ["category", "region"],
					},
				],
			},
		],
		order: [["orderDate", "DESC"]],
	});

	res.json(orders);
}
