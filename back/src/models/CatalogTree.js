import { sequelize } from "./sequelize-client.js";
import { Model, DataTypes } from "sequelize";

export class CatalogTree extends Model {}

CatalogTree.init(
	{
		catalogTreeId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		commonName: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: { msg: "Le nom commun ne peut pas être vide." },
			},
		},
		scientificName: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		description: {
			type: DataTypes.TEXT,
		},
		adultHeight: {
			type: DataTypes.DECIMAL(5, 2),
			validate: {
				isDecimal: true,
				min: { args: [0], msg: "La hauteur adulte ne peut pas être négative." },
			},
		},
		image: {
			type: DataTypes.STRING,
			validate: {
				isUrl: { msg: "Le chemin de l'image doit être une URL valide." },
			},
		},
		price: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
			validate: {
				isDecimal: true,
				min: { args: [0.01], msg: "Le prix doit être positif." },
			},
		},
	},
	{
		sequelize,
		tableName: "catalog_tree",
	},
);
