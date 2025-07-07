import { sequelize } from "./sequelize-client.js";
import { Model, DataTypes } from "sequelize";

export class Tracking extends Model {}

Tracking.init({
  trackingId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  statementDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  condition: {
    type: DataTypes.TEXT,
  },
  currentHeight: {
    type: DataTypes.DECIMAL(5, 2),
    validate: {
      isDecimal: true,
      min: { args: [0], msg: "La hauteur ne peut pas être négative." }
    }
  },
  currentPicture: {
    type: DataTypes.STRING,
    validate: {
      isUrl: { msg: "Le chemin de l'image doit être une URL valide." }
    }
  },
}, {
  sequelize,
  tableName: "tracking",
});