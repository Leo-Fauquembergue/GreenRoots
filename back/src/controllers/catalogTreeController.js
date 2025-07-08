// Cette ligne dit :
// "Exécute le fichier associations.js pour t'assurer que tous les modèles
// (CatalogTree, Category, Region, etc.) sont bien définis et liés entre eux,
// PUIS, donne-moi accès aux variables exportées dont j'ai besoin."
import { CatalogTree, Category, Region } from "./../models/associations.js";
import { idSchema, catalogTreeSchema, updateCatalogTreeSchema } from "../schemas/index.js";
import { HttpError } from "../errors/http-error.js";

export async function getAllCatalogTrees(req, res) {
  const trees = await CatalogTree.findAll({
    include: ["category", "region"]
  });
  res.json(trees);
}

export async function getOneCatalogTree(req, res) {
  const { id } = idSchema.parse(req.params);
  const tree = await CatalogTree.findByPk(id, { include: ["category", "region"] });
  if (!tree) throw new HttpError(404, "Arbre du catalogue non trouvé.");
  res.json(tree);
}

export async function createCatalogTree(req, res) {
  const data = catalogTreeSchema.parse(req.body);
  const newTree = await CatalogTree.create(data);
  res.status(201).json(newTree);
}

export async function updateCatalogTree(req, res) {
  const { id } = idSchema.parse(req.params);
  const data = updateCatalogTreeSchema.parse(req.body);
  const [updated] = await CatalogTree.update(data, { where: { catalogTreeId: id } });
  if (!updated) throw new HttpError(404, "Arbre du catalogue non trouvé.");
  res.json(await CatalogTree.findByPk(id));
}

export async function deleteCatalogTree(req, res) {
  const { id } = idSchema.parse(req.params);
  const deleted = await CatalogTree.destroy({ where: { catalogTreeId: id } });
  if (!deleted) throw new HttpError(404, "Arbre du catalogue non trouvé.");
  res.status(204).end();
}