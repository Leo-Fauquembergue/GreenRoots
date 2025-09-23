import { Order, PlantedTree, CatalogTree } from "./../models/associations.js";
import { idSchema } from "../schemas/index.js";
import { HttpError } from "../errors/http-error.js";

// Fonction pour récupérer ou créer le panier d'un utilisateur
async function findOrCreateCart(userId) {
	const [cartOrder] = await Order.findOrCreate({
		where: { userId, status: "cart" },
		defaults: { userId, status: "cart" },
	});
	return cartOrder;
}

// GET /api/cart - Récupère le contenu du panier de l'utilisateur connecté
export async function getCart(req, res) {
	if (!req.session.user) {
		throw new HttpError(
			401,
			"Vous devez être connecté pour voir votre panier.",
		);
	}
	const userId = req.session.user.id;

	const cart = await Order.findOne({
		where: { userId, status: "cart" },
		include: [
			{
				association: "plantedTrees",
				include: ["catalogTree"],
			},
		],
	});

	res.json(cart || { plantedTrees: [] }); // Renvoie un panier vide si rien n'est trouvé
}

// POST /api/cart/items - Ajoute un article au panier
export async function addToCart(req, res) {
	if (!req.session.user) {
		throw new HttpError(
			401,
			"Vous devez être connecté pour ajouter un article.",
		);
	}
	const userId = req.session.user.id;

	const { catalogTreeId } = req.body; // On a juste besoin de l'ID de l'arbre du catalogue
	if (!catalogTreeId) {
		throw new HttpError(400, "L'ID de l'arbre est requis.");
	}

	// Étape 1 : S'assurer que l'arbre existe
	const treeToAdd = await CatalogTree.findByPk(catalogTreeId);
	if (!treeToAdd) {
		throw new HttpError(404, "Cet arbre n'existe pas dans le catalogue.");
	}

	// Étape 2 : Trouver ou créer le panier de l'utilisateur
	const cart = await findOrCreateCart(userId);

	// Étape 3 : Créer une nouvelle entrée PlantedTree liée au panier et à l'arbre du catalogue
	await PlantedTree.create({
		orderId: cart.orderId,
		catalogTreeId: catalogTreeId,
		// On peut laisser les autres champs (personalName, etc.) vides pour l'instant
	});

	// Étape 4 : Renvoyer le panier mis à jour
	const updatedCart = await Order.findByPk(cart.orderId, {
		include: [{ association: "plantedTrees", include: ["catalogTree"] }],
	});

	res.status(201).json(updatedCart);
}

// DELETE /api/cart/items/:plantedTreeId - Supprime un article spécifique du panier
export async function deleteFromCart(req, res) {
	if (!req.session.user) {
		throw new HttpError(
			401,
			"Vous devez être connecté pour supprimer un article.",
		);
	}
	const userId = req.session.user.id;

	const { id: plantedTreeId } = idSchema.parse(req.params); // On récupère l'ID de l'ARBRE PLANTÉ

	// Vérification de sécurité : s'assurer que l'article appartient bien au panier de l'utilisateur
	const cart = await findOrCreateCart(userId);

	const itemToDelete = await PlantedTree.findOne({
		where: {
			plantedTreeId,
			orderId: cart.orderId,
		},
	});

	if (!itemToDelete) {
		throw new HttpError(
			404,
			"Cet article n'a pas été trouvé dans votre panier.",
		);
	}

	await itemToDelete.destroy();

	res.status(204).end();
}

// POST /api/cart/checkout - Transforme le panier en commande validée
export async function checkout(req, res) {
	if (!req.session.user) {
		throw new HttpError(401, "Vous devez être connecté pour passer commande.");
	}
	const userId = req.session.user.id;

	const cart = await Order.findOne({ where: { userId, status: "cart" } });
	if (!cart || (await cart.countPlantedTrees()) === 0) {
		throw new HttpError(400, "Votre panier est vide.");
	}

	// On change simplement le statut. La commande est maintenant "officielle".
	cart.status = "completed";
	await cart.save();

	res.json({ message: "Commande passée avec succès !", order: cart });
}
