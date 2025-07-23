# GreenRoots 🌳 - Plantez un arbre, suivez son histoire

![Bannière GreenRoots](./front/src/assets/background-tree.jpg)

GreenRoots est une plateforme web full-stack conçue pour connecter les utilisateurs à leur impact environnemental. Elle permet de financer la plantation d'arbres, de les personnaliser, de suivre leur croissance via un panel dédié, et de gérer l'ensemble du processus via une interface d'administration.

Ce projet a été réalisé dans le cadre de l'Apothéose de l'école O'clock.

**[🔗 Lien vers le site déployé](https://greenroots-app.vercel.app/)** | **[🔗 Lien vers l'API déployée](https://greenroots-api.onrender.com/)**

---

## ✨ Fonctionnalités Principales

### Côté Utilisateur
- **Catalogue d'Arbres :** Consultation du catalogue avec filtres et pagination.
- **Authentification Sécurisée :** Inscription et connexion avec hachage de mot de passe (Argon2) et gestion de session par cookies `httpOnly`.
- **Panier Persistant :** Le panier est sauvegardé en base de données et lié au compte de l'utilisateur.
- **Processus de Commande :** Tunnel d'achat du panier à une page de paiement factice, avec notifications "Toast".
- **Espace Personnel :** Consultation de l'historique des commandes et de la liste des arbres plantés.
- **Personnalisation :** Possibilité de donner un nom personnalisé à chaque arbre après l'achat.
- **Suivi des Arbres :** Visualisation de l'historique de suivi mis à jour par les administrateurs.

### Côté Administration
- **Panel Admin Sécurisé :** Accès réservé aux utilisateurs avec le rôle "admin".
- **Tableau de Bord :** Vue d'ensemble avec navigation par onglets.
- **Gestion CRUD :** Gestion complète des utilisateurs, commandes, et du catalogue.
- **Gestion du Suivi :** Ajout et modification des entrées de suivi pour chaque arbre planté.

---

## 🛠️ Stack Technique

Ce projet est une application full-stack moderne utilisant une architecture découplée.

### Backend (API RESTful)
- **Framework :** Node.js avec Express.js
- **Base de Données :** PostgreSQL
- **ORM :** Sequelize
- **Authentification :** `express-session` avec `connect-session-sequelize` pour des sessions persistantes.
- **Sécurité :** Hachage des mots de passe avec `argon2`, protection CORS, `express-xss-sanitizer`.
- **Validation :** Zod pour la validation des schémas de données.

### Frontend (Single Page Application)
- **Framework :** React avec Vite.js et TypeScript
- **Style :** Tailwind CSS pour le design utilitaire et SCSS pour le style global.
- **Routage :** React Router
- **Gestion d'État :** React Context API (`AuthContext`, `CartContext`).
- **Client HTTP :** Axios (instance centralisée).

### Outillage (Tooling)
- **Gestion de paquets :** PNPM
- **Conteneurisation :** Docker et Docker Compose.
- **Linting & Formatage :** Biome.js

---

## 🚀 Installation et Démarrage Local

Pour lancer ce projet en local, vous aurez besoin de Node.js, pnpm, et Docker.

### 1. Configuration des Environnements

Avant de lancer le projet, vous devez configurer vos variables d'environnement. Des fichiers d'exemple sont fournis.

```bash
# 1. Clonez le dépôt et naviguez à l'intérieur
git clone https://github.com/votre-nom/votre-repo.git
cd votre-repo

# 2. Configurez les variables de la base de données pour Docker
# (à la racine du projet)
cp .env.db.example .env.db

# 3. Configurez les variables du serveur backend
# (dans le dossier 'back')
cp back/.env.example back/.env

# 4. Configurez les variables du client frontend
# (dans le dossier 'front')
cp front/.env.example front/.env.local
```
➡️ **Important :** Ouvrez les trois nouveaux fichiers (`.env.db`, `back/.env`, `front/.env.local`) et assurez-vous que les valeurs correspondent à votre configuration locale. Par défaut, les exemples sont déjà configurés pour fonctionner ensemble.

### 2. Lancement des Services

Le projet nécessite 3 terminaux ouverts à la **racine du projet** pour fonctionner.

#### **Terminal 1 : Base de Données (Docker)**
```bash
# Lancez le conteneur PostgreSQL avec Docker Compose
docker-compose up
```
🟢 Laissez ce terminal ouvert pour voir les logs de la base de données.

#### **Terminal 2 : Backend (API)**
```bash
# Naviguez dans le dossier du backend
cd back

# Installez les dépendances
pnpm install

# Créez les tables et remplissez-les avec des données de test
pnpm db:reset

# Lancez le serveur de développement
pnpm dev
```
🟢 L'API est maintenant active sur **`http://localhost:3000`**. Laissez ce terminal ouvert.

#### **Terminal 3 : Frontend (Application React)**
```bash
# Naviguez dans le dossier du frontend
cd front

# Installez les dépendances
pnpm install

# Lancez le serveur de développement
pnpm dev
```
🟢 Le site est maintenant accessible sur **`http://localhost:5173`**.

---

## 📦 Déploiement

L'application est déployée en suivant une approche découplée pour des performances optimales.

### Backend (sur Render)
- Le serveur Node.js et la base de données PostgreSQL sont hébergés sur Render.
- Le déploiement est continu : chaque `push` sur la branche `main` du dépôt backend déclenche automatiquement un nouveau build et une mise en ligne du service.
- Les variables d'environnement (`DATABASE_URL`, `SESSION_SECRET`, `CORS_ORIGIN`, etc.) sont configurées directement dans l'interface de Render.

### Frontend (sur Vercel)
- L'application React est hébergée sur Vercel.
- Le déploiement est également continu et lié au dépôt frontend.
- Vercel distribue le site sur son CDN global (Edge Network), garantissant des temps de chargement rapides pour les utilisateurs du monde entier.
- La variable d'environnement `VITE_API_BASE_URL` est configurée sur Vercel pour pointer vers l'URL de l'API déployée sur Render.

---

## 👥 Auteurs

Ce projet a été réalisé par :
- **Léo Fauquembergue** - ([@Leo-Fauquembergue](https://github.com/Leo-Fauquembergue))
- **Canap Alsan** - ([@CanapAlsan](https://github.com/CanapAlsan))
- **Tamara Fatemi** - ([@tamara-fatemi](https://github.com/tamara-fatemi))
- **Théo Richard** - ([@Theorichardo](https://github.com/Theorichardo))
