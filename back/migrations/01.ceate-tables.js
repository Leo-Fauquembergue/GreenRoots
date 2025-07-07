import { sequelize } from 

// synchroniser un model
// await List.sync({ force: true });

// on peut synchroniser tous les omdèles en une seule fois, en utilisant Sequelize
console.log("🚧 Création des tables");
await sequelize.sync({ force: true });

sequelize.close();
console.log("✅ Tables créées");