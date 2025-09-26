import { CatalogTree, PlantedTree } from "./../models/associations.js";
import {
	idSchema,
	catalogTreeSchema,
	updateCatalogTreeSchema,
} from "../schemas/index.js";
import { HttpError } from "../errors/http-error.js";

export async function getAllCatalogTrees(req, res) {
	// Récupération et validation des paramètres de pagination
	const page = parseInt(req.query.page, 10) || 1;
	// On récupère la limite, avec 6 par défaut.
	let limit = parseInt(req.query.limit, 10) || 6; 

    // --- CORRECTION POUR L'ADMIN ---
	// Si le client demande une limite de -1, cela signifie qu'il veut tous les résultats.
	// On désactive alors la pagination en mettant la limite à `null`.
	if (limit === -1) {
		limit = null;
	}

	// On calcule l'offset. Si la pagination est désactivée, on commence à 0.
	const offset = limit ? (page - 1) * limit : 0;

	// Construction des options de la requête Sequelize
	const options = {
		include: ["category", "region"],
		where: {},
		// On ajoute les options de pagination. Sequelize ignore `limit` et `offset` s'ils sont `null`.
		limit: limit,
		offset: limit ? offset : null, // Si pas de limite, pas d'offset.
	};

	// On récupère les filtres potentiels depuis les paramètres de l'URL (query parameters).
	const { categoryId, regionId } = req.query;

	if (categoryId && categoryId !== "all") {
		const numericCategoryId = parseInt(categoryId, 10);
		if (!Number.isNaN(numericCategoryId)) {
			options.where.categoryId = numericCategoryId;
		}
	}

	if (regionId && regionId !== "all") {
		const numericRegionId = parseInt(regionId, 10);
		if (!Number.isNaN(numericRegionId)) {
			options.where.regionId = numericRegionId;
		}
	}

	// On vérifie la présence du paramètre 'order' et on le sécurise.
	const orderDirection = req.query.order?.toUpperCase();
	if (orderDirection === "ASC" || orderDirection === "DESC") {
		// On trie par date de création.
		options.order = [["created_at", orderDirection]];
	} else {
		// Comportement par défaut : les plus récents en premier.
		options.order = [["created_at", "DESC"]];
	}

	// Exécution de la requête avec findAndCountAll
	// `findAndCountAll` retourne un objet avec deux propriétés :
	// - `count`: Le nombre TOTAL d'enregistrements qui correspondent aux filtres `where`, en ignorant `limit` et `offset`.
	// - `rows`: Un tableau des enregistrements pour la page actuelle, en respectant `limit` et `offset`.
	const { count, rows } = await CatalogTree.findAndCountAll(options);

	// Envoi de la réponse au format attendu par le frontend
	// Le frontend a besoin de `{ totalCount, data }`
	res.json({
		totalCount: count, // Le nombre total pour calculer le nombre de pages
		data: rows, // Les arbres de la page actuelle
	});
}

export async function getOneCatalogTree(req, res) {
	const { id } = idSchema.parse(req.params);
	const tree = await CatalogTree.findByPk(id, {
		include: ["category", "region"],
	});
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
	const [updated] = await CatalogTree.update(data, {
		where: { catalogTreeId: id },
	});
	if (!updated) throw new HttpError(404, "Arbre du catalogue non trouvé.");
	res.json(await CatalogTree.findByPk(id));
}

export async function deleteCatalogTree(req, res) {
	// 1. On valide l'ID de la requête
	const { id } = idSchema.parse(req.params);

	// 2. On vérifie si cet arbre du catalogue est utilisé dans la table "planted_tree"
	const associatedPlantedTreesCount = await PlantedTree.count({
		where: { catalogTreeId: id },
	});

	// 3. Si l'arbre est utilisé, on refuse la suppression avec une erreur 409 (Conflit)
	if (associatedPlantedTreesCount > 0) {
		throw new HttpError(
			409, // 409 Conflict est le statut HTTP sémantiquement correct ici.
			`Impossible de supprimer cet arbre du catalogue (ID: ${id}) car il est associé à ${associatedPlantedTreesCount} arbre(s) planté(s).`,
		);
	}

	// 4. Si l'arbre n'est pas utilisé, on procède à la suppression
	const deleted = await CatalogTree.destroy({
		where: { catalogTreeId: id },
	});

	// 5. Si 'destroy' renvoie 0, c'est que l'arbre n'a pas été trouvé
	if (!deleted) {
		throw new HttpError(404, "Arbre du catalogue non trouvé.");
	}

	// 6. On envoie une réponse 204 No Content pour signifier que la suppression a réussi
	res.status(204).end();
}
