import { Region, CatalogTree } from "../models/associations.js";
import { idSchema, regionSchema } from "../schemas/index.js";
import { HttpError } from "../errors/http-error.js";

// 🔎 GET /regions - Récupérer toutes les régions
export async function getAllRegions(req, res) {
	const regions = await Region.findAll();
	res.json(regions);
}

// 🔎 GET /regions/:id - Détails d'une région
export async function getOneRegion(req, res) {
	const { id } = idSchema.parse(req.params);
	const region = await Region.findByPk(id);
	if (!region) throw new HttpError(404, "Région non trouvée.");
	res.json(region);
}

// ➕ POST /regions - Créer une nouvelle région
export async function createRegion(req, res) {
	const data = regionSchema.parse(req.body);
	const newRegion = await Region.create(data);
	res.status(201).json(newRegion);
}

// ✏️ PATCH /regions/:id - Modifier une région
export async function updateRegion(req, res) {
	const { id } = idSchema.parse(req.params);
	const data = regionSchema.parse(req.body);
	const [updated] = await Region.update(data, { where: { regionId: id } });
	if (!updated) throw new HttpError(404, "Région non trouvée.");
	const updatedRegion = await Region.findByPk(id);
	res.json(updatedRegion);
}

// 🗑 DELETE /regions/:id - Supprimer une région (si inutilisée)
export async function deleteRegion(req, res) {
	// 1. On valide l'ID de la requête
	const { id } = idSchema.parse(req.params);

	// 2. On vérifie si cette région est utilisée par des arbres dans le catalogue
	const associatedTreesCount = await CatalogTree.count({
		where: { regionId: id },
	});

	// 3. Si la région est utilisée, on refuse la suppression avec une erreur 409 (Conflit)
	if (associatedTreesCount > 0) {
		throw new HttpError(
			409, // Statut HTTP pour "Conflit"
			`Impossible de supprimer cette région (ID: ${id}) car elle est associée à ${associatedTreesCount} arbre(s) du catalogue.`,
		);
	}

	// 4. Si la région n'est pas utilisée, on procède à la suppression
	const deleted = await Region.destroy({
		where: { regionId: id },
	});

	// 5. Si 'destroy' renvoie 0, c'est que la région n'a jamais existé
	if (!deleted) {
		throw new HttpError(404, "Région non trouvée.");
	}

	// 6. On envoie une réponse 204 No Content pour signifier que la suppression a réussi
	res.status(204).end();
}
