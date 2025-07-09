import { Category, CatalogTree } from "../models/associations.js";
import { idSchema, categorySchema } from "../schemas/index.js";
import { HttpError } from "../errors/http-error.js";

// 🔎 GET /categories - Récupérer toutes les catégories
export async function getAllCategories(req, res) {
  const categories = await Category.findAll();
  res.json(categories);
}

// 🔎 GET /categories/:id - Détails d'une catégorie
export async function getOneCategory(req, res) {
  const { id } = idSchema.parse(req.params);
  const category = await Category.findByPk(id);
  if (!category) throw new HttpError(404, "Catégorie non trouvée.");
  res.json(category);
}

// ➕ POST /categories - Créer une nouvelle catégorie
export async function createCategory(req, res) {
  const data = categorySchema.parse(req.body);
  const newCategory = await Category.create(data);
  res.status(201).json(newCategory);
}

// ✏️ PATCH /categories/:id - Modifier une catégorie
export async function updateCategory(req, res) {
  const { id } = idSchema.parse(req.params);
  const data = categorySchema.parse(req.body);
  const [updated] = await Category.update(data, { where: { categoryId: id } });
  if (!updated) throw new HttpError(404, "Catégorie non trouvée.");
  const updatedCategory = await Category.findByPk(id);
  res.json(updatedCategory);
}

// 🗑 DELETE /categories/:id - Supprimer une catégorie (si inutilisée)
export async function deleteCategory(req, res) {
  const { id } = idSchema.parse(req.params);
  const deleted = await Category.destroy({ where: { categoryId: id } });
  if (!deleted) throw new HttpError(404, "Impossible de supprimer la catégorie : elle est peut-être utilisée.");
  res.status(204).end();
}

// 🌱 GET /categories/:id/catalog-trees - Arbres d'une catégorie
export async function getTreesByCategory(req, res) {
  const { id } = idSchema.parse(req.params);
  const category = await Category.findByPk(id);
  if (!category) throw new HttpError(404, "Catégorie non trouvée.");

  const trees = await CatalogTree.findAll({
    where: { categoryId: id },
    include: ["region"] // Tu peux inclure ce que tu veux ici
  });

  res.json(trees);
}