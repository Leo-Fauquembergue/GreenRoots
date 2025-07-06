-- Suppression des tables dans le bon ordre 
DROP TABLE IF EXISTS suivi;
DROP TABLE IF EXISTS arbre_plante;
DROP TABLE IF EXISTS commande;
DROP TABLE IF EXISTS catalogue_arbre;
DROP TABLE IF EXISTS categorie;
DROP TABLE IF EXISTS region;
DROP TABLE IF EXISTS utilisateur;

-- Début de transaction 
BEGIN;

-- Table UTILISATEUR
CREATE TABLE utilisateur (
    id SERIAL PRIMARY KEY,
    nom TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    mot_de_passe TEXT NOT NULL,
    role TEXT DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table COMMANDE
CREATE TABLE commande (
    id SERIAL PRIMARY KEY,
    code_commande TEXT UNIQUE NOT NULL,
    date_commande TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    statut TEXT DEFAULT 'en_cours',
    utilisateur_id INTEGER REFERENCES utilisateur(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table REGION
CREATE TABLE region (
    id SERIAL PRIMARY KEY,
    nom TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table CATEGORIE
CREATE TABLE categorie (
    id SERIAL PRIMARY KEY,
    nom TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table CATALOGUE_ARBRE
CREATE TABLE catalogue_arbre (
    id SERIAL PRIMARY KEY,
    nom_commun TEXT NOT NULL,
    nom_scientifique TEXT NOT NULL,
    description TEXT,
    hauteur_adulte NUMERIC(5,2),
    image TEXT,
    prix NUMERIC(10,2),
    categorie_id INTEGER REFERENCES categorie(id),
    region_id INTEGER REFERENCES region(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Table ARBRE_PLANTE
CREATE TABLE arbre_plante (
    id SERIAL PRIMARY KEY,
    code_plantation TEXT UNIQUE NOT NULL,
    nom_personnalise TEXT,
    date_plantation DATE,
    lieu_plantation TEXT,
    catalogue_arbre_id INTEGER REFERENCES catalogue_arbre(id),
    commande_id INTEGER REFERENCES commande(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table SUIVI
CREATE TABLE suivi (
    id SERIAL PRIMARY KEY,
    code_suivi TEXT UNIQUE NOT NULL,
    date_releve TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    etat TEXT NOT NULL,
    taille_actuelle NUMERIC(5,2),
    photo_actuelle TEXT,
    arbre_plante_id INTEGER REFERENCES arbre_plante(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Fin de transaction
COMMIT;
