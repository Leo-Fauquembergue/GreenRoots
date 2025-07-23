// On importe dotenv pour s'assurer que les variables d'environnement comme FRONTEND_URL sont chargées
import "dotenv/config";
import argon2 from "argon2";
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

(async () => {
	console.log("🌱 Début du seeding de la base de données...");

	try {
		// --- UTILISATEURS ---
		// On crée plusieurs utilisateurs avec des rôles différents pour les tests.
		// Les mots de passe sont hachés avec Argon2 pour simuler un environnement de production.
		console.log("🚧 Ajout des utilisateurs...");
		const hashedPasswordUser = await argon2.hash("PasswordUser123!");
		const hashedPasswordAdmin = await argon2.hash("PasswordAdmin123!");
		const hashedPasswordCharlie = await argon2.hash("PasswordCharlie123!");

		const [alice, bob, charlie] = await Promise.all([
			User.create({
				name: "Alice Green",
				email: "alice@example.com",
				password: hashedPasswordUser,
				role: "user",
			}),
			User.create({
				name: "Bob Brown (Admin)",
				email: "bob-admin@example.com",
				password: hashedPasswordAdmin,
				role: "admin",
			}),
			User.create({
				name: "Charlie Delta",
				email: "charlie@example.com",
				password: hashedPasswordCharlie,
				role: "user",
			}),
		]);

		// --- RÉGIONS & CATÉGORIES ---
		// Données de base pour structurer le catalogue.
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

		// --- ARBRES DU CATALOGUE ---
		// On utilise votre liste d'arbres spécifique pour correspondre aux fichiers images `public/images/`.
		// Les URL sont construites dynamiquement avec la variable d'environnement FRONTEND_URL.
		console.log("🚧 Ajout des arbres au catalogue...");
		const trees = await CatalogTree.bulkCreate([
			{
				commonName: "Chêne",
				scientificName: "Quercus robur",
				description: "Grand arbre caduc originaire d'Europe.",
				adultHeight: 25.0,
				image: `${process.env.FRONTEND_URL}/images/chene.webp`,
				price: 15.0,
				categoryId: categories[1].categoryId,
				regionId: regions[5].regionId,
			},
			{
				commonName: "Pin",
				scientificName: "Pinus sylvestris",
				description: "Conifère persistant à croissance rapide.",
				adultHeight: 30.0,
				image: `${process.env.FRONTEND_URL}/images/pin.webp`,
				price: 12.0,
				categoryId: categories[2].categoryId,
				regionId: regions[4].regionId,
			},
			{
				commonName: "Baobab",
				scientificName: "Adansonia digitata",
				description: "Arbre emblématique au tronc massif d'Afrique.",
				adultHeight: 18.0,
				image: `${process.env.FRONTEND_URL}/images/baobab.webp`,
				price: 20.0,
				categoryId: categories[3].categoryId,
				regionId: regions[6].regionId,
			},
			{
				commonName: "Bouleau",
				scientificName: "Betula pendula",
				description: "Arbre élégant à écorce blanche.",
				adultHeight: 15.0,
				image: `${process.env.FRONTEND_URL}/images/bouleau.webp`,
				price: 10.0,
				categoryId: categories[1].categoryId,
				regionId: regions[5].regionId,
			},
			{
				commonName: "Érable",
				scientificName: "Acer saccharum",
				description: "Connu pour sa sève sucrée et son sirop.",
				adultHeight: 20.0,
				image: `${process.env.FRONTEND_URL}/images/erable.webp`,
				price: 14.0,
				categoryId: categories[4].categoryId,
				regionId: regions[8].regionId,
			},
			{
				commonName: "Cèdre",
				scientificName: "Cedrus libani",
				description: "Arbre persistant parfumé des montagnes.",
				adultHeight: 28.0,
				image: `${process.env.FRONTEND_URL}/images/cedre.webp`,
				price: 18.0,
				categoryId: categories[2].categoryId,
				regionId: regions[2].regionId,
			},
			{
				commonName: "Eucalyptus",
				scientificName: "Eucalyptus globulus",
				description: "Arbre à croissance rapide d'Australie.",
				adultHeight: 35.0,
				image: `${process.env.FRONTEND_URL}/images/eucalyptus.webp`,
				price: 16.0,
				categoryId: categories[6].categoryId,
				regionId: regions[7].regionId,
			},
			{
				commonName: "Saule pleureur",
				scientificName: "Salix babylonica",
				description: "Arbre à longues branches tombantes, aime l'eau.",
				adultHeight: 12.0,
				image: `${process.env.FRONTEND_URL}/images/saule.webp`,
				price: 9.0,
				categoryId: categories[1].categoryId,
				regionId: regions[3].regionId,
			},
			{
				commonName: "Séquoia géant",
				scientificName: "Sequoiadendron giganteum",
				description: "Un des plus hauts arbres de la planète.",
				adultHeight: 90.0,
				image: `${process.env.FRONTEND_URL}/images/sequoia.webp`,
				price: 25.0,
				categoryId: categories[7].categoryId,
				regionId: regions[8].regionId,
			},
			{
				commonName: "Mangrove",
				scientificName: "Rhizophora mangle",
				description: "Arbre des zones côtières salines.",
				adultHeight: 8.0,
				image: `${process.env.FRONTEND_URL}/images/mangrove.webp`,
				price: 13.0,
				categoryId: categories[0].categoryId,
				regionId: regions[9].regionId,
			},
		]);

		// --- COMMANDES ---
		// On crée plusieurs commandes avec des statuts et des propriétaires différents
		// pour simuler des scénarios réels (un panier, une commande passée, une commande annulée).
		console.log("🚧 Ajout des commandes...");

		// 1. Un panier actif pour Alice
		const aliceCart = await Order.create({
			status: "cart",
			userId: alice.userId,
		});

		// 2. Une commande complétée et payée pour Bob
		const bobCompletedOrder = await Order.create({
			status: "completed",
			userId: bob.userId,
			orderDate: new Date("2024-06-15T10:00:00Z"),
		});

		// 3. Une commande plus ancienne et annulée pour Charlie
		// On n'a pas besoin de stocker la variable car on ne l'utilise pas plus tard.
		await Order.create({
			status: "cancelled",
			userId: charlie.userId,
			orderDate: new Date("2024-03-01T15:30:00Z"),
		});

		// 4. Une autre commande complétée pour Alice
		const aliceOldOrder = await Order.create({
			status: "completed",
			userId: alice.userId,
			orderDate: new Date("2024-05-20T12:00:00Z"),
		});

		// --- ARBRES PLANTÉS ---
		// On lie les arbres aux commandes correspondantes.
		// Certains sont personnalisés, d'autres non.
		console.log("🚧 Ajout des arbres plantés...");
		const plantedTrees = await PlantedTree.bulkCreate([
			// Arbres dans le panier actif d'Alice
			{ catalogTreeId: trees[0].catalogTreeId, orderId: aliceCart.orderId }, // Un Chêne
			{ catalogTreeId: trees[4].catalogTreeId, orderId: aliceCart.orderId }, // Un Érable

			// Arbres de la commande complétée de Bob (l'admin)
			{
				personalName: "Le Pin des Montagnes",
				plantingDate: "2024-07-01",
				plantingPlace: "Alpes",
				catalogTreeId: trees[1].catalogTreeId,
				orderId: bobCompletedOrder.orderId,
			},
			{
				personalName: "Vieux Sage",
				plantingDate: "2024-07-01",
				plantingPlace: "Sénégal",
				catalogTreeId: trees[2].catalogTreeId,
				orderId: bobCompletedOrder.orderId,
			},

			// Arbres de l'ancienne commande d'Alice
			{
				personalName: "Le Bouleau du Jardin",
				plantingDate: "2024-06-01",
				plantingPlace: "Strasbourg",
				catalogTreeId: trees[3].catalogTreeId,
				orderId: aliceOldOrder.orderId,
			},
		]);

		// --- SUIVI ---
		// On ajoute des entrées de suivi uniquement pour les arbres des commandes complétées.
		console.log("🚧 Ajout des entrées de suivi...");
		await Tracking.bulkCreate([
			// Suivi pour le Pin de Bob
			{
				statementDate: "2024-07-15T10:00:00Z",
				condition: "Excellente reprise après plantation",
				currentHeight: 120.5,
				plantedTreeId: plantedTrees[2].plantedTreeId,
			},

			// Suivi pour le Bouleau d'Alice
			{
				statementDate: "2024-06-15T09:00:00Z",
				condition: "Plantation effectuée",
				currentHeight: 150,
				plantedTreeId: plantedTrees[4].plantedTreeId,
			},
			{
				statementDate: "2024-07-20T14:00:00Z",
				condition: "En pleine croissance, apparition de nouvelles feuilles",
				currentHeight: 165,
				plantedTreeId: plantedTrees[4].plantedTreeId,
			},
		]);

		console.log("✅ Données insérées avec succès !");
	} catch (error) {
		console.error("❌ Erreur lors du seeding de la base de données :", error);
	} finally {
		await sequelize.close();
		console.log("🔌 Connexion à la base de données fermée.");
	}
})();