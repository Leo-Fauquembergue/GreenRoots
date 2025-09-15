import { sequelize } from "./sequelize-client.js";
import { Model, DataTypes } from "sequelize";

export class PlantedTree extends Model {}

PlantedTree.init(
	{
		plantedTreeId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		personalName: {
			type: DataTypes.STRING,
		},
		plantingDate: {
			type: DataTypes.DATEONLY,
		},
		plantingPlace: {
			type: DataTypes.STRING,
		},
	},
	{
		sequelize,
		tableName: "planted_tree",
	},
);