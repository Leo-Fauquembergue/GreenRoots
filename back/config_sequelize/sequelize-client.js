import "dotenv/config";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.DATABASE_URL,
  {
    logging: console.log,
    define: {
      underscored: true, // utiliser du snake_case sur tous les nom de table, de champs et les timestamps
    
    }
  }
);