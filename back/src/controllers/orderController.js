import { Order, User, PlantedTree, CatalogTree } from "./../models/associations.js";
import { idSchema, orderSchema, updateOrderSchema } from "../schemas/index.js";
import { HttpError } from "../errors/http-error.js";

export async function getAllOrders(req, res) {
  const orders = await Order.findAll({
    include: [{ association: "user", attributes: ["userId", "name", "email"] }]
  });
  res.json(orders);
}

export async function getOneOrder(req, res) {
  const { id } = idSchema.parse(req.params);
  const order = await Order.findByPk(id, {
    include: [
      // Le scope par défaut du user s'applique (pas de mdp)
      { association: "user" }, // Relation directe : Order -> User
      { 
        // Premier niveau d'imbrication : on suit le chemin Order -> PlantedTree
        association: "plantedTrees", 
        
        // Deuxième niveau d'imbrication :
        // POUR CHAQUE plantedTree trouvé, on suit le chemin PlantedTree -> CatalogTree
        include: [{ association: "catalogTree" }]
      }
    ]
  });
  if (!order) {
    throw new HttpError(404, "Commande non trouvée.");
  }
  res.json(order);
}

export async function createOrder(req, res) {
  const data = orderSchema.parse(req.body);
  const newOrder = await Order.create(data);
  res.status(201).json(newOrder);
}

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

export async function deleteOrder(req, res) {
  const { id } = idSchema.parse(req.params);
  const deleted = await Order.destroy({ where: { orderId: id } });
  if (!deleted) {
    throw new HttpError(404, "Commande non trouvée.");
  }
  res.status(204).end();
}