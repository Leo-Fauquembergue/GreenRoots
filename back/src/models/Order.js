import { sequelize } from "./sequelize-client.js";
import { Model, DataTypes } from "sequelize";

export class Order extends Model {}

Order.init(
	{
		orderId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		orderDate: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
		status: {
			type: DataTypes.ENUM("cart", "completed", "cancelled"),
			allowNull: false,
			defaultValue: "cart",
		},
	},
	{
		sequelize,
		tableName: "order",
	},
);