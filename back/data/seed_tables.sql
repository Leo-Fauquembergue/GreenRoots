-- Début de la transaction pour assurer l'intégrité des données
BEGIN;

-- Vider les tables dans l'ordre inverse des dépendances pour éviter les erreurs.
-- RESTART IDENTITY réinitialise les compteurs des ID (SERIAL).
-- CASCADE propage la suppression aux tables dépendantes.
TRUNCATE TABLE user, categorie, region, catalog_tree, order, planted_tree, tracking RESTART IDENTITY CASCADE;

-- Insert users
INSERT INTO user (name, email, password, role)
VALUES 
('Alice Green', 'alice@example.com', 'hashed_password_1', 'user'),
('Bob Brown', 'bob@example.com', 'hashed_password_2', 'admin');

-- Insert regions (adaptées aux espèces d'arbres)
INSERT INTO region (name)
VALUES 
('Amazon Rainforest'),
('Sahara Desert'),
('Alps Mountains'),
('Mediterranean Coast'),
('Boreal Forest'),
('Temperate Europe'),
('Sub-Saharan Africa'),
('Australian Outback'),
('North American Forest'),
('Coastal Mangroves');

-- Insert categories (adaptées aux essences d’arbres)
INSERT INTO category (name)
VALUES 
('Evergreen'),
('Deciduous'),
('Conifer'),
('Tropical'),
('Fruit Tree'),
('Medicinal'),
('Fast-growing'),
('Endangered'),
('Sacred'),
('Urban-friendly');

-- Insertion des arbres dans le catalogue (en français)
INSERT INTO catalog_tree (
    common_name, scientific_name, description, adult_height, image, price, category_id, region_id
)
VALUES 
('Chêne', 'Quercus robur', 'Grand arbre caduc originaire d''Europe.', 25.00, 'chene.jpg', 15.00, 2, 6),
('Pin', 'Pinus sylvestris', 'Conifère persistant à croissance rapide.', 30.00, 'pin.jpg', 12.00, 1, 5),
('Baobab', 'Adansonia digitata', 'Arbre emblématique au tronc massif d''Afrique.', 18.00, 'baobab.jpg', 20.00, 4, 7),
('Bouleau', 'Betula pendula', 'Arbre élégant à écorce blanche.', 15.00, 'bouleau.jpg', 2.00, 2, 6),
('Érable', 'Acer saccharum', 'Connu pour sa sève sucrée sirop d''érable.', 20.00, 'erable.jpg', 14.00, 5, 6),
('Cèdre', 'Cedrus libani', 'Arbre persistant parfumé des montagnes.', 28.00, 'cedre.jpg', 18.00, 1, 3),
('Eucalyptus', 'Eucalyptus globulus', 'Arbre à croissance rapide d''Australie.', 35.00, 'eucalyptus.jpg', 16.00, 7, 8),
('Saule pleureur', 'Salix babylonica', 'Arbre à longues branches tombantes.', 12.00, 'saule.jpg', 9.00, 2, 4),
('Séquoia géant', 'Sequoiadendron giganteum', 'Un des plus hauts arbres de la planète.', 90.00, 'sequoia.jpg', 25.00, 7, 9),
('Mangrove', 'Rhizophora mangle', 'Arbre des zones côtières salines.', 8.00, 'mangrove.jpg', 13.00, 1, 10);


-- Insert orders
INSERT INTO order (status, user_id)
VALUES 
('completed', 1),
('pending', 2);

-- Insert planted trees
INSERT INTO planted_tree (personal_name, planting_date, planting_place, catalog_tree_id, order_id)
VALUES
('Little Oak', '2024-11-15', 'Bordeaux', 1, 1),
('Desert Baobab', '2024-12-01', 'Agadir', 3, 1),
('Family Birch', '2025-01-10', 'Strasbourg', 4, 2),
('Majestic Pine', '2025-02-20', 'Annecy', 2, 2);

-- Insert tracking entries
INSERT INTO tracking (statement_date, condition, current_height, current_picture, planted_tree_id)
VALUES
('2025-03-01', 'Healthy', 1.20, 'oak_tracking1.jpg', 1),
('2025-03-10', 'Growing well', 0.80, 'baobab_tracking1.jpg', 2),
('2025-03-15', 'Needs water', 0.50, 'birch_tracking1.jpg', 3),
('2025-03-22', 'Excellent', 1.50, 'pine_tracking1.jpg', 4);

-- Fin de la transaction, on valide toutes les insertions
COMMIT;