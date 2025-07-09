import { Tracking, PlantedTree, CatalogTree } from "./../models/associations.js";
import { idSchema, trackingSchema, updateTrackingSchema } from "../schemas/index.js";
import { HttpError } from "../errors/http-error.js";

export async function getAllTrackings(req, res) {
  const trackings = await Tracking.findAll({
    include: {
      association: "plantedTree",
      attributes: ["plantedTreeId", "personalName"],
    },
    order: [['statementDate', 'DESC']]
  });
  res.json(trackings);
}

export async function getOneTracking(req, res) {
  const { id } = idSchema.parse(req.params);
  const tracking = await Tracking.findByPk(id, {
    include: [{
      association: "plantedTree",
      include: ["catalogTree"]
    }]
  });
  if (!tracking) {
    throw new HttpError(404, "Entrée de suivi non trouvée.");
  }
  res.json(tracking);
}


export async function createTracking(req, res) {
  const data = trackingSchema.parse(req.body);

  // On vérifie que l'arbre parent existe AVANT d'essayer de créer le suivi.
  const plantedTree = await PlantedTree.findByPk(data.plantedTreeId);
  if (!plantedTree) {
    throw new HttpError(404, `L'arbre planté avec l'ID ${data.plantedTreeId} n'existe pas.`);
  }

  const newTracking = await Tracking.create(data);
  res.status(201).json(newTracking);
}

export async function updateTracking(req, res) {
  const { id } = idSchema.parse(req.params);
  const data = updateTrackingSchema.parse(req.body);
  
  const [updated] = await Tracking.update(data, { where: { trackingId: id } });
  if (!updated) {
    throw new HttpError(404, "Entrée de suivi non trouvée.");
  }
  
  const updatedTracking = await Tracking.findByPk(id);
  res.json(updatedTracking);
}

export async function deleteTracking(req, res) {
  const { id } = idSchema.parse(req.params);
  const deleted = await Tracking.destroy({ where: { trackingId: id } });
  if (!deleted) {
    throw new HttpError(404, "Entrée de suivi non trouvée.");
  }
  res.status(204).end();
}