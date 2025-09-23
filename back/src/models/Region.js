import { sequelize } from "./sequelize-client.js";
import { Model, DataTypes } from "sequelize";

export class Region extends Model {}

Region.init(
	{
		regionId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				notEmpty: { msg: "Le nom de la région ne peut pas être vide." },
			},
		},
	},
	{
		sequelize,
		tableName: "region",
	},
);
