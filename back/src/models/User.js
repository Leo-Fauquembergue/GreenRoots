import { sequelize } from "./sequelize-client.js";
import { Model, DataTypes } from "sequelize";

export class User extends Model {}

User.init({
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Le nom ne peut pas être vide." },
      len: { args: [2, 100], msg: "Le nom doit contenir entre 2 et 100 caractères." }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: { msg: "L'email doit être une adresse valide." },
      notEmpty: { msg: "L'email ne peut pas être vide." }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: { args: [8, 255], msg: "Le mot de passe doit contenir au moins 8 caractères." }
    }
  },
  role: {
    type: DataTypes.ENUM('user', 'admin'),
    allowNull: false,
    defaultValue: 'user',
  },
}, {
  sequelize,
  tableName: "user",
  // Scopes pour la sécurité du mot de passe (ajoute une couche de sécurité, à voir si on le garde)
  defaultScope: {
    attributes: { exclude: ["password"] },
  },
  scopes: {
    withPassword: {
      attributes: { include: ["password"] },
    },
  },
});