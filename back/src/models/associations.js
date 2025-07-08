import { sequelize } from "./sequelize-client.js";

// Import de tous les modèles
import { User } from "./User.js";
import { Category } from "./Category.js";
import { Region } from "./Region.js";
import { CatalogTree } from "./CatalogTree.js";
import { Order } from "./Order.js";
import { PlantedTree } from "./PlantedTree.js";
import { Tracking } from "./Tracking.js";

// --- Définition des associations avec contraintes et comportements ---

// 1. User <-> Order (One-to-Many)
// Une commande DOIT appartenir à un utilisateur.
// Si un utilisateur est supprimé, toutes ses commandes sont également supprimées.
User.hasMany(Order, {
  foreignKey: 'userId',
  as: 'orders',
  onDelete: 'CASCADE' 
});
Order.belongsTo(User, {
  foreignKey: {
    name: 'userId',
    allowNull: false
  },
  as: 'user'
});

// 2. Category <-> CatalogTree (One-to-Many)
// Un arbre du catalogue DOIT appartenir à une catégorie.
// On ne peut pas supprimer une catégorie si elle est encore utilisée par des arbres du catalogue.
Category.hasMany(CatalogTree, {
  foreignKey: 'categoryId',
  as: 'catalogTrees',
  onDelete: 'RESTRICT' 
});
CatalogTree.belongsTo(Category, {
  foreignKey: {
    name: 'categoryId',
    allowNull: false
  },
  as: 'category'
});

// 3. Region <-> CatalogTree (One-to-Many)
// Un arbre du catalogue DOIT appartenir à une région.
// On ne peut pas supprimer une région si elle est encore liée à des arbres du catalogue.
Region.hasMany(CatalogTree, {
  foreignKey: 'regionId',
  as: 'catalogTrees',
  onDelete: 'RESTRICT'
});
CatalogTree.belongsTo(Region, {
  foreignKey: {
    name: 'regionId',
    allowNull: false
  },
  as: 'region'
});

// 4. Order <-> PlantedTree (One-to-Many)
// Un arbre planté DOIT provenir d'une commande.
// Si une commande est supprimée, les enregistrements des arbres plantés associés sont aussi supprimés.
Order.hasMany(PlantedTree, {
  foreignKey: 'orderId',
  as: 'plantedTrees',
  onDelete: 'CASCADE'
});
PlantedTree.belongsTo(Order, {
  foreignKey: {
    name: 'orderId',
    allowNull: false
  },
  as: 'order'
});

// 5. CatalogTree <-> PlantedTree (One-to-Many)
// Un arbre planté DOIT correspondre à une espèce du catalogue.
// On ne peut pas supprimer une espèce du catalogue si des arbres de cette espèce ont déjà été plantés et sont suivis.
CatalogTree.hasMany(PlantedTree, {
  foreignKey: 'catalogTreeId',
  as: 'plantedTrees',
  onDelete: 'RESTRICT'
});
PlantedTree.belongsTo(CatalogTree, {
  foreignKey: {
    name: 'catalogTreeId',
    allowNull: false
  },
  as: 'catalogTree'
});

// 6. PlantedTree <-> Tracking (One-to-Many)
// Un enregistrement de suivi DOIT concerner un arbre planté spécifique.
// Si un arbre planté est supprimé de la base de données, tout son historique de suivi est également supprimé.
PlantedTree.hasMany(Tracking, {
  foreignKey: 'plantedTreeId',
  as: 'trackings',
  onDelete: 'CASCADE'
});
Tracking.belongsTo(PlantedTree, {
  foreignKey: {
    name: 'plantedTreeId',
    allowNull: false
  },
  as: 'plantedTree'
});


// On exporte tous les modèles et l'instance sequelize depuis ce fichier central
export {
  User,
  Category,
  Region,
  CatalogTree,
  Order,
  PlantedTree,
  Tracking,
  sequelize
};