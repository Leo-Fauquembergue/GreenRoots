// Cette ligne dit :
// "Exécute le fichier associations.js pour t'assurer que tous les modèles
// (CatalogTree, Category, Region, etc.) sont bien définis et liés entre eux,
// PUIS, donne-moi accès aux variables exportées dont j'ai besoin."
import { CatalogTree, Category, Region } from "./../models/associations.js";
import { idSchema, catalogTreeSchema, updateCatalogTreeSchema } from "../schemas/index.js";
import { HttpError } from "../errors/http-error.js";

export async function getAllCatalogTrees(req, res) {
  // 1. On prépare un objet d'options vide pour notre requête Sequelize.
  const options = {
    include: ["category", "region"]
  };

  // 2. On vérifie la présence du paramètre 'limit'.
  const limit = parseInt(req.query.limit, 10);
  // Si la conversion a réussi et que le nombre est plus grand que 0...
  if (!Number.isNaN(limit) && limit > 0) {
    // ...alors, et seulement alors, ajoute cette limite à la requête de la base de données.
    options.limit = limit;
  }

  // 3. On vérifie la présence du paramètre 'order' et on le sécurise.
  const orderDirection = req.query.order?.toUpperCase();
  if (orderDirection === 'ASC' || orderDirection === 'DESC') {
    // On trie par date de création.
    options.order = [['createdAt', orderDirection]];
  } else {
    // Comportement par défaut : les plus récents en premier.
    options.order = [['createdAt', 'DESC']];
  }

  // 4. On exécute la requête avec les options construites dynamiquement.
  const trees = await CatalogTree.findAll(options);
  
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