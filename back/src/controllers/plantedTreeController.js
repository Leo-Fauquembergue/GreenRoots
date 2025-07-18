import {
	PlantedTree,
	Order,
	CatalogTree,
	Tracking,
} from "./../models/associations.js";
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
	const { id } = idSchema.parse(req.params);
	const tree = await PlantedTree.findByPk(id, {
		include: [
			{ association: "order" },
			{ association: "catalogTree" },
			{ association: "trackings" },
		],
	});
	if (!tree) {
		throw new HttpError(404, "Arbre planté non trouvé.");
	}
	res.json(tree);
}

export async function createPlantedTree(req, res) {
	const data = plantedTreeSchema.parse(req.body);
	const newTree = await PlantedTree.create(data);
	res.status(201).json(newTree);
}

export async function updatePlantedTree(req, res) {
  try {
    const { id } = idSchema.parse(req.params);
    const data = updatePlantedTreeSchema.parse(req.body);

    const [updated] = await PlantedTree.update(data, {
      where: { plantedTreeId: id },
    });

    if (!updated) {
      throw new HttpError(404, "Arbre planté non trouvé.");
    }

    const updatedTree = await PlantedTree.findByPk(id);
    res.json(updatedTree);
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Erreur serveur",
    });
  }
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
            status: ['completed'], // ou ['completed', 'cancelled'] selon ton besoin
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