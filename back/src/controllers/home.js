import {CatalogTree} from "./../models/associations.js";

export async function getLatest(req, res) {

      const latestTrees = await CatalogTree.findAll({
        limit: 3, // On récupère les 3 derniers
        order: [["createdAt", "DESC"]], // Tri par date de création (les plus récentes d'abord)
        include: ["region", "category"] 
      });
  
      res.json(latestTrees); 
  }