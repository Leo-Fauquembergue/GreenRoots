// On importe tous les modèles et l'instance sequelize depuis notre fichier central.
// C'est le seul import nécessaire.
import {
	User,
	Region,
	Category,
	CatalogTree,
	Order,
	PlantedTree,
	Tracking,
	sequelize,
} from "./../models/associations.js";

// On utilise une fonction asynchrone auto-exécutée (IIFE) pour
// pouvoir utiliser await et bien gérer les erreurs.
(async () => {
	console.log("🌱 Début du seeding de la base de données...");

	try {
		// Ce script suppose que les tables sont déjà créées et vides.
		// La commande `sequelize.sync({ force: true })` doit être dans un script séparé.

		// 🧑 Utilisateurs
		console.log("🚧 Ajout des utilisateurs...");
		const [alice, bob] = await Promise.all([
			User.create({
				name: "Alice Green",
				email: "alice@example.com",
				password: "hashed_password_1",
				role: "user",
			}),
			User.create({
				name: "Bob Brown",
				email: "bob@example.com",
				password: "hashed_password_2",
				role: "admin",
			}),
		]);

		// 🌍 Régions
		console.log("🚧 Ajout des régions...");
		const regions = await Region.bulkCreate([
			{ name: "Amazon Rainforest" },
			{ name: "Sahara Desert" },
			{ name: "Alps Mountains" },
			{ name: "Mediterranean Coast" },
			{ name: "Boreal Forest" },
			{ name: "Temperate Europe" },
			{ name: "Sub-Saharan Africa" },
			{ name: "Australian Outback" },
			{ name: "North American Forest" },
			{ name: "Coastal Mangroves" },
		]);

		// 🌳 Catégories
		console.log("🚧 Ajout des catégories...");
		const categories = await Category.bulkCreate([
			{ name: "Evergreen" },
			{ name: "Deciduous" },
			{ name: "Conifer" },
			{ name: "Tropical" },
			{ name: "Fruit Tree" },
			{ name: "Medicinal" },
			{ name: "Fast-growing" },
			{ name: "Endangered" },
			{ name: "Sacred" },
			{ name: "Urban-friendly" },
		]);

		// 📦 Arbres du catalogue
		console.log("🚧 Ajout des arbres au catalogue...");
		// On utilise les propriétés du modèle (camelCase) et on référence les ID des objets créés précédemment.
		const trees = await CatalogTree.bulkCreate([
			{
				commonName: "Chêne",
				scientificName: "Quercus robur",
				description: "Grand arbre caduc.",
				adultHeight: 25.0,
				image: "Chene.webp",
				price: 15.0,
				categoryId: categories[1].categoryId,
				regionId: regions[5].regionId,
			},
			{
				commonName: "Pin",
				scientificName: "Pinus sylvestris",
				description: "Conifère persistant.",
				adultHeight: 30.0,
				image: "pin.webp",
				price: 12.0,
				categoryId: categories[0].categoryId,
				regionId: regions[4].regionId,
			},
			{
				commonName: "Baobab",
				scientificName: "Adansonia digitata",
				description: "Arbre emblématique.",
				adultHeight: 18.0,
				image: "baobab.webp",
				price: 20.0,
				categoryId: categories[3].categoryId,
				regionId: regions[6].regionId,
			},
			{
				commonName: "Bouleau",
				scientificName: "Betula pendula",
				description: "Arbre élégant.",
				adultHeight: 15.0,
				image: "bouleau.webp",
				price: 2.0,
				categoryId: categories[1].categoryId,
				regionId: regions[5].regionId,
			},
			{
				commonName: "Érable",
				scientificName: "Acer saccharum",
				description: "Connu pour son sirop.",
				adultHeight: 20.0,
				image: "erable.webp",
				price: 14.0,
				categoryId: categories[4].categoryId,
				regionId: regions[5].regionId,
			},
			{
				commonName: "Cèdre",
				scientificName: "Cedrus libani",
				description: "Arbre parfumé.",
				adultHeight: 28.0,
				image: "cedre.webp",
				price: 18.0,
				categoryId: categories[0].categoryId,
				regionId: regions[2].regionId,
			},
			{
				commonName: "Eucalyptus",
				scientificName: "Eucalyptus globulus",
				description: "Croissance rapide.",
				adultHeight: 35.0,
				image: "ecalyptus.webp",
				price: 16.0,
				categoryId: categories[6].categoryId,
				regionId: regions[7].regionId,
			},
			{
				commonName: "Saule pleureur",
				scientificName: "Salix babylonica",
				description: "Branches tombantes.",
				adultHeight: 12.0,
				image: "saule.webp",
				price: 9.0,
				categoryId: categories[1].categoryId,
				regionId: regions[3].regionId,
			},
			{
				commonName: "Séquoia géant",
				scientificName: "Sequoiadendron giganteum",
				description: "Un des plus hauts.",
				adultHeight: 90.0,
				image: "sequoia.webp",
				price: 25.0,
				categoryId: categories[6].categoryId,
				regionId: regions[8].regionId,
			},
			{
				commonName: "Mangrove",
				scientificName: "Rhizophora mangle",
				description: "Arbre côtier.",
				adultHeight: 8.0,
				image: "mangrove.webp",
				price: 13.0,
				categoryId: categories[0].categoryId,
				regionId: regions[9].regionId,
			},
		]);

		// 🧾 Commandes
		console.log("🚧 Ajout des commandes...");
		const [order1, order2] = await Promise.all([
			Order.create({ status: "completed", userId: alice.userId }),
			Order.create({ status: "pending", userId: bob.userId }),
		]);

		// 🌱 Arbres plantés
		console.log("🚧 Ajout des arbres plantés...");
		const plantedTrees = await PlantedTree.bulkCreate([
			{
				personalName: "Little Oak",
				plantingDate: "2024-11-15",
				plantingPlace: "Bordeaux",
				catalogTreeId: trees[0].catalogTreeId,
				orderId: order1.orderId,
			},
			{
				personalName: "Desert Baobab",
				plantingDate: "2024-12-01",
				plantingPlace: "Agadir",
				catalogTreeId: trees[2].catalogTreeId,
				orderId: order1.orderId,
			},
			{
				personalName: "Family Birch",
				plantingDate: "2025-01-10",
				plantingPlace: "Strasbourg",
				catalogTreeId: trees[3].catalogTreeId,
				orderId: order2.orderId,
			},
			{
				personalName: "Majestic Pine",
				plantingDate: "2025-02-20",
				plantingPlace: "Annecy",
				catalogTreeId: trees[1].catalogTreeId,
				orderId: order2.orderId,
			},
		]);

		// 📸 Suivi (tracking)
		console.log("🚧 Ajout des entrées de suivi...");
		await Tracking.bulkCreate([
			{
				statementDate: "2025-03-01",
				condition: "Healthy",
				currentHeight: 1.2,
				currentPicture: "oak_tracking1.jpg",
				plantedTreeId: plantedTrees[0].plantedTreeId,
			},
			{
				statementDate: "2025-03-10",
				condition: "Growing well",
				currentHeight: 0.8,
				currentPicture: "baobab_tracking1.jpg",
				plantedTreeId: plantedTrees[1].plantedTreeId,
			},
			{
				statementDate: "2025-03-15",
				condition: "Needs water",
				currentHeight: 0.5,
				currentPicture: "birch_tracking1.jpg",
				plantedTreeId: plantedTrees[2].plantedTreeId,
			},
			{
				statementDate: "2025-03-22",
				condition: "Excellent",
				currentHeight: 1.5,
				currentPicture: "pine_tracking1.jpg",
				plantedTreeId: plantedTrees[3].plantedTreeId,
			},
		]);

		console.log("✅ Données insérées avec succès !");
	} catch (error) {
		console.error("❌ Erreur lors du seeding de la base de données :", error);
	} finally {
		// Il est crucial de fermer la connexion à la fin, que le script réussisse ou échoue.
		await sequelize.close();
		console.log("🔌 Connexion à la base de données fermée.");
	}
})();
