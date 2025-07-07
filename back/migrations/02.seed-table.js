

console.log("🌱 Seeding des données du projet de reforestation");

await sequelize.sync({ force: true }); // optionnel : vide les tables si besoin

// 🧑 Utilisateurs
console.log("🚧 Ajout des utilisateurs");
const [alice, bob] = await Promise.all([
  User.create({ name: 'Alice Green', email: 'alice@example.com', password: 'hashed_password_1', role: 'user' }),
  User.create({ name: 'Bob Brown', email: 'bob@example.com', password: 'hashed_password_2', role: 'admin' }),
]);

// 🌍 Régions
console.log("🚧 Ajout des régions");
const regions = await Region.bulkCreate([
  { name: 'Amazon Rainforest' },
  { name: 'Sahara Desert' },
  { name: 'Alps Mountains' },
  { name: 'Mediterranean Coast' },
  { name: 'Boreal Forest' },
  { name: 'Temperate Europe' },
  { name: 'Sub-Saharan Africa' },
  { name: 'Australian Outback' },
  { name: 'North American Forest' },
  { name: 'Coastal Mangroves' }
]);

// 🌳 Catégories
console.log("🚧 Ajout des catégories");
const categories = await Category.bulkCreate([
  { name: 'Evergreen' },
  { name: 'Deciduous' },
  { name: 'Conifer' },
  { name: 'Tropical' },
  { name: 'Fruit Tree' },
  { name: 'Medicinal' },
  { name: 'Fast-growing' },
  { name: 'Endangered' },
  { name: 'Sacred' },
  { name: 'Urban-friendly' }
]);

// 📦 Arbres du catalogue
console.log("🚧 Ajout des arbres au catalogue");
const trees = await CatalogTree.bulkCreate([
  {
    common_name: 'Chêne',
    scientific_name: 'Quercus robur',
    description: 'Grand arbre caduc originaire d\'Europe.',
    adult_height: 25.00,
    image: 'chene.jpg',
    price: 15.00,
    category_id: categories[1].id,
    region_id: regions[5].id
  },
  {
    common_name: 'Pin',
    scientific_name: 'Pinus sylvestris',
    description: 'Conifère persistant à croissance rapide.',
    adult_height: 30.00,
    image: 'pin.jpg',
    price: 12.00,
    category_id: categories[0].id,
    region_id: regions[4].id
  },
  {
    common_name: 'Baobab',
    scientific_name: 'Adansonia digitata',
    description: 'Arbre emblématique au tronc massif d\'Afrique.',
    adult_height: 18.00,
    image: 'baobab.jpg',
    price: 20.00,
    category_id: categories[3].id,
    region_id: regions[6].id
  },
  {
    common_name: 'Bouleau',
    scientific_name: 'Betula pendula',
    description: 'Arbre élégant à écorce blanche.',
    adult_height: 15.00,
    image: 'bouleau.jpg',
    price: 2.00,
    category_id: categories[1].id,
    region_id: regions[5].id
  },
  {
    common_name: 'Érable',
    scientific_name: 'Acer saccharum',
    description: 'Connu pour sa sève sucrée sirop d\'érable.',
    adult_height: 20.00,
    image: 'erable.jpg',
    price: 14.00,
    category_id: categories[4].id,
    region_id: regions[5].id
  },
  {
    common_name: 'Cèdre',
    scientific_name: 'Cedrus libani',
    description: 'Arbre persistant parfumé des montagnes.',
    adult_height: 28.00,
    image: 'cedre.jpg',
    price: 18.00,
    category_id: categories[0].id,
    region_id: regions[2].id
  },
  {
    common_name: 'Eucalyptus',
    scientific_name: 'Eucalyptus globulus',
    description: 'Arbre à croissance rapide d\'Australie.',
    adult_height: 35.00,
    image: 'eucalyptus.jpg',
    price: 16.00,
    category_id: categories[6].id,
    region_id: regions[7].id
  },
  {
    common_name: 'Saule pleureur',
    scientific_name: 'Salix babylonica',
    description: 'Arbre à longues branches tombantes.',
    adult_height: 12.00,
    image: 'saule.jpg',
    price: 9.00,
    category_id: categories[1].id,
    region_id: regions[3].id
  },
  {
    common_name: 'Séquoia géant',
    scientific_name: 'Sequoiadendron giganteum',
    description: 'Un des plus hauts arbres de la planète.',
    adult_height: 90.00,
    image: 'sequoia.jpg',
    price: 25.00,
    category_id: categories[6].id,
    region_id: regions[8].id
  },
  {
    common_name: 'Mangrove',
    scientific_name: 'Rhizophora mangle',
    description: 'Arbre des zones côtières salines.',
    adult_height: 8.00,
    image: 'mangrove.jpg',
    price: 13.00,
    category_id: categories[0].id,
    region_id: regions[9].id
  }
]);

// 🧾 Commandes
console.log("🚧 Ajout des commandes");
const [order1, order2] = await Promise.all([
  Order.create({ status: 'completed', user_id: alice.id }),
  Order.create({ status: 'pending', user_id: bob.id })
]);

// 🌱 Arbres plantés
console.log("🚧 Ajout des arbres plantés");
const plantedTrees = await PlantedTree.bulkCreate([
  {
    personal_name: 'Little Oak',
    planting_date: '2024-11-15',
    planting_place: 'Bordeaux',
    catalog_tree_id: trees[0].id,
    order_id: order1.id
  },
  {
    personal_name: 'Desert Baobab',
    planting_date: '2024-12-01',
    planting_place: 'Agadir',
    catalog_tree_id: trees[2].id,
    order_id: order1.id
  },
  {
    personal_name: 'Family Birch',
    planting_date: '2025-01-10',
    planting_place: 'Strasbourg',
    catalog_tree_id: trees[3].id,
    order_id: order2.id
  },
  {
    personal_name: 'Majestic Pine',
    planting_date: '2025-02-20',
    planting_place: 'Annecy',
    catalog_tree_id: trees[1].id,
    order_id: order2.id
  }
]);

// 📸 Suivi (tracking)
console.log("🚧 Ajout des entrées de suivi");
await Tracking.bulkCreate([
  {
    statement_date: '2025-03-01',
    condition: 'Healthy',
    current_height: 1.20,
    current_picture: 'oak_tracking1.jpg',
    planted_tree_id: plantedTrees[0].id
  },
  {
    statement_date: '2025-03-10',
    condition: 'Growing well',
    current_height: 0.80,
    current_picture: 'baobab_tracking1.jpg',
    planted_tree_id: plantedTrees[1].id
  },
  {
    statement_date: '2025-03-15',
    condition: 'Needs water',
    current_height: 0.50,
    current_picture: 'birch_tracking1.jpg',
    planted_tree_id: plantedTrees[2].id
  },
  {
    statement_date: '2025-03-22',
    condition: 'Excellent',
    current_height: 1.50,
    current_picture: 'pine_tracking1.jpg',
    planted_tree_id: plantedTrees[3].id
  }
]);

await sequelize.close();
console.log("✅ Données insérées avec succès");
