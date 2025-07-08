import { sequelize } from "./../models/associations.js";

console.log("🚧 Création des tables");
await sequelize.sync({ force: true });

sequelize.close();
console.log("✅ Tables créées");