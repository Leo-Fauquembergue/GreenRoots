INSERT INTO utilisateur (nom, email, mot_de_passe, role)
VALUES
('Alice Dupont', 'alice@example.com', 'hashedpwd1', 'admin'),
('Bob Martin', 'bob@example.com', 'hashedpwd2', 'user'),
('Clara Dubois', 'clara@example.com', 'hashedpwd3', 'user');

INSERT INTO region (nom)
VALUES
('Europe de l\'Ouest'),
('Méditerranée (Europe du Sud)'),
('Asie de l\'Est'),
('Amérique du Nord'),
('Europe du Nord'),
('Europe Centrale'),
('Afrique du Nord'),
('Amérique Centrale et Caraïbes'),
('Australie et Nouvelle-Zélande'),
('Asie du Sud-Est');

INSERT INTO categorie (nom)
VALUES
('Feuillus'),
('Conifères'),
('Méditerranéens'),
('Exotiques'),
('Ornementaux'),
('Fruitier'),
('Arbres à fleurs');

INSERT INTO catalogue_arbre (nom_commun, nom_scientifique, description, hauteur_adulte, image, prix, categorie_id, region_id)
VALUES
("Chêne pédonculé", "Quercus robur", "Majestueux arbre à feuilles lobées.", 40.00, "chene.jpg", 65.00, 1, 1),
("Sapin blanc", "Abies alba", "Conifère élancé des montagnes.", 50.00, "sapin.jpg", 55.00, 2, 1),
("Olivier", "Olea europaea", "Arbre méditerranéen producteur d'olives.", 7.00, "olivier.jpg", 60.00, 6, 2),
("Cerisier du Japon", "Prunus serrulata", "Floraison rose spectaculaire.", 8.00, "cerisier.jpg", 45.00, 7, 3),
("Séquoia géant", "Sequoiadendron giganteum", "Arbre géant des forêts californiennes.", 80.00, "sequoia.jpg", 95.00, 4, 4),
("Érable rouge", "Acer rubrum", "Feuillage flamboyant en automne.", 25.00, "erable.jpg", 40.00, 1, 1),
("Pin parasol", "Pinus pinea", "Typique du sud de la France.", 20.00, "pin.jpg", 38.00, 2, 2),
("Palmier dattier", "Phoenix dactylifera", "Palmier producteur de dattes.", 15.00, "palmier.jpg", 58.00, 6, 7),
("Bouleau blanc", "Betula pendula", "Écorce blanche élégante.", 18.00, "bouleau.jpg", 42.00, 1, 5),
("Magnolia", "Magnolia grandiflora", "Fleurs blanches parfumées.", 12.00, "magnolia.jpg", 50.00, 7, 8);


INSERT INTO commande (code_commande, statut, utilisateur_id)
VALUES
('CMD001', 'validee', 1),
('CMD002', 'en_cours', 2),
('CMD003', 'validee', 2),
('CMD004', 'en_cours', 3),
('CMD005', 'validee', 3);


INSERT INTO arbre_plante (code_plantation, nom_personnalise, date_plantation, lieu_plantation, catalogue_arbre_id, commande_id)
VALUES
('PLT001', 'Chêne Alice', '2024-07-01', 'Strasbourg', 1, 1),
('PLT002', 'Sapin Bob', '2024-07-02', 'Mulhouse', 2, 2),
('PLT003', 'Olivier Clara', '2024-07-03', 'Nice', 3, 4),
('PLT004', 'Cerisier Bob', '2024-07-03', 'Rennes', 4, 3),
('PLT005', 'Séquoia Alice', '2024-07-04', 'Colmar', 5, 1),
('PLT006', 'Érable Clara', '2024-07-05', 'Brest', 6, 5),
('PLT007', 'Pin Bob', '2024-07-06', 'Marseille', 7, 2),
('PLT008', 'Palmier Clara', '2024-07-06', 'Toulon', 8, 4),
('PLT009', 'Bouleau Alice', '2024-07-07', 'Nancy', 9, 1),
('PLT010', 'Magnolia Clara', '2024-07-07', 'Avignon', 10, 5);

INSERT INTO suivi (code_suivi, date_releve, etat, taille_actuelle, photo_actuelle, arbre_plante_id)
VALUES
('SUIV001', '2024-07-01 10:00:00', 'bon', 1.20, 'suivi1.jpg', 1),
('SUIV002', '2024-07-02 11:00:00', 'excellent', 1.10, 'suivi2.jpg', 2),
('SUIV003', '2024-07-03 09:30:00', 'bon', 0.80, 'suivi3.jpg', 3),
('SUIV004', '2024-07-03 14:00:00', 'fragile', 0.65, 'suivi4.jpg', 4),
('SUIV005', '2024-07-04 08:45:00', 'excellent', 1.50, 'suivi5.jpg', 5),
('SUIV006', '2024-07-05 09:00:00', 'bon', 0.90, 'suivi6.jpg', 6),
('SUIV007', '2024-07-06 10:15:00', 'moyen', 0.70, 'suivi7.jpg', 7),
('SUIV008', '2024-07-06 11:00:00', 'bon', 0.75, 'suivi8.jpg', 8),
('SUIV009', '2024-07-07 12:30:00', 'excellent', 1.00, 'suivi9.jpg', 9),
('SUIV010', '2024-07-07 14:20:00', 'fragile', 0.60, 'suivi10.jpg', 10);



COMMIT;

            
