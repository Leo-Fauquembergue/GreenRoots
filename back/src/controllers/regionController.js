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
  const { id } = idSchema.parse(req.params);
  const deleted = await Region.destroy({ where: { regionId: id } });
  if (!deleted) throw new HttpError(404, "Impossible de supprimer la région : elle est peut-être utilisée.");
  res.status(204).end();
}

// 🌱 GET /regions/:id/catalog-trees - Arbres d'une région
export async function getTreesByRegion(req, res) {
  const { id } = idSchema.parse(req.params);
  const region = await Region.findByPk(id);
  if (!region) throw new HttpError(404, "Région non trouvée.");

  const trees = await CatalogTree.findAll({
    where: { regionId: id },
    include: ["category"] // Facultatif : tu peux inclure d'autres associations ici
  });

  res.json(trees);
}