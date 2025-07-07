import { sequelize } from "./sequelize-client.js";
import { Model, DataTypes } from "sequelize";

export class Category extends Model {}

Category.init({
  categoryId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: { msg: "Le nom de la catégorie ne peut pas être vide." }
    }
  },
}, {
  sequelize,
  tableName: "category",
});