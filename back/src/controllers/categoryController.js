import { Category, CatalogTree } from "../models/associations.js";
import { idSchema, categorySchema } from "../schemas/index.js";
import { HttpError } from "../errors/http-error.js";

// GET /categories - Récupérer toutes les catégories
export async function getAllCategories(req, res) {
	const categories = await Category.findAll();
	res.json(categories);
}

// GET /categories/:id - Détails d'une catégorie
export async function getOneCategory(req, res) {
	const { id } = idSchema.parse(req.params);
	const category = await Category.findByPk(id);
	if (!category) throw new HttpError(404, "Catégorie non trouvée.");
	res.json(category);
}

// POST /categories - Créer une nouvelle catégorie
export async function createCategory(req, res) {
	const data = categorySchema.parse(req.body);
	const newCategory = await Category.create(data);
	res.status(201).json(newCategory);
}

// PATCH /categories/:id - Modifier une catégorie
export async function updateCategory(req, res) {
	const { id } = idSchema.parse(req.params);
	const data = categorySchema.parse(req.body);
	const [updated] = await Category.update(data, { where: { categoryId: id } });
	if (!updated) throw new HttpError(404, "Catégorie non trouvée.");
	const updatedCategory = await Category.findByPk(id);
	res.json(updatedCategory);
}

// DELETE /categories/:id - Supprimer une catégorie (si inutilisée)
export async function deleteCategory(req, res) {
	// 1. On valide l'ID de la requête
	const { id } = idSchema.parse(req.params);

	// 2. On vérifie si cette catégorie est utilisée par des arbres dans le catalogue
	const associatedTreesCount = await CatalogTree.count({
		where: { categoryId: id },
	});

	// 3. Si la catégorie est utilisée, on refuse la suppression avec une erreur 409 (Conflit)
	if (associatedTreesCount > 0) {
		throw new HttpError(
			409,
			`Impossible de supprimer cette catégorie (ID: ${id}) car elle est associée à ${associatedTreesCount} arbre(s) du catalogue.`,
		);
	}

	// 4. Si la catégorie n'est pas utilisée, on procède à la suppression
	const deleted = await Category.destroy({
		where: { categoryId: id },
	});

	// 5. Si 'destroy' renvoie 0, c'est que la catégorie n'a jamais existé
	if (!deleted) {
		throw new HttpError(404, "Catégorie non trouvée.");
	}

	// 6. On envoie une réponse 204 No Content pour signifier que la suppression a réussi
	res.status(204).end();
}
