# GreenRoots 🌳 - Plantez un arbre, suivez son histoire

![GreenRoots Banner](https://votre-domaine.com/path/to/banner.png)

GreenRoots est une plateforme web full-stack conçue pour connecter les utilisateurs à leur impact environnemental. Elle permet de financer la plantation d'arbres, de les personnaliser, de suivre leur croissance via un panel dédié, et de gérer l'ensemble du processus via une interface d'administration.

Ce projet a été réalisé dans le cadre de [Nom de votre formation/projet, ex: l'Apothéose O'clock].

**[🔗 Lien vers le site déployé](https://votre-site.vercel.app/)** | **[🔗 Lien vers l'API déployée](https://votre-api.onrender.com/)**

---

## ✨ Fonctionnalités Principales

### Côté Utilisateur
- **Catalogue d'Arbres :** Consultation du catalogue avec filtres et pagination.
- **Authentification Sécurisée :** Inscription et connexion avec hachage de mot de passe (Argon2) et gestion de session par cookies `httpOnly`.
- **Panier Persistant :** Le panier est sauvegardé en base de données et lié au compte de l'utilisateur.
- **Processus de Commande :** Un tunnel d'achat simple du panier à la page de paiement factice.
- **Espace Personnel :** Consultation de l'historique des commandes et de la liste des arbres plantés.
- **Personnalisation :** Possibilité de donner un nom personnalisé à chaque arbre après l'achat.
- **Suivi des Arbres :** Visualisation de l'historique de suivi (état, taille...) mis à jour par les administrateurs.

### Côté Administration
- **Panel Admin Sécurisé :** Accès réservé aux utilisateurs avec le rôle "admin".
- **Tableau de Bord :** Vue d'ensemble avec navigation par onglets.
- **Gestion des Utilisateurs :** Visualisation et suppression des utilisateurs.
- **Gestion des Commandes :** Consultation de toutes les commandes et de leur contenu.
- **Gestion du Catalogue :** Ajout et suppression d'arbres dans le catalogue.
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
- **Validation :** Zod pour la validation des schémas de données entrants.

### Frontend (Single Page Application)
- **Framework :** React avec Vite.js et TypeScript
- **Style :** Tailwind CSS pour le design utilitaire et SCSS pour le style global et des composants.
- **Routage :** React Router
- **Gestion d'État :** React Context API (`AuthContext`, `CartContext`).
- **Client HTTP :** Axios (instance centralisée).

### Déploiement
- **Backend & Base de Données :** Déployés sur **Render**.
- **Frontend :** Déployé sur **Vercel** avec un CDN global pour des performances optimales.

---

## 🚀 Installation et Démarrage

Pour lancer ce projet en local, vous aurez besoin de Node.js, pnpm (ou npm/yarn), et Docker.

### 1. Cloner le dépôt
```bash
git clone https://github.com/votre-nom/votre-repo.git
cd votre-repo
