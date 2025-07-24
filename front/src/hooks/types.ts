// ====================================================================
// SECTION 1 : INTERFACES DE BASE (Correspondent aux modèles Sequelize)
// ====================================================================

/**
 * Représente un utilisateur de l'application.
 */
export interface User {
	userId: number;
	name: string;
	email: string;
	role: "user" | "admin";
}

/**
 * Représente une catégorie d'arbre (ex: Feuillu, Conifère).
 */
export interface Category {
	categoryId: number;
	name: string;
}

/**
 * Représente une région géographique.
 */
export interface Region {
	regionId: number;
	name: string;
}

/**
 * Représente un arbre tel qu'il est défini dans le catalogue de vente.
 */
export interface CatalogTree {
	catalogTreeId: number;
	commonName: string;
	scientificName: string;
	description: string;
	adultHeight: number;
	image: string;
	price: string; // La sérialisation JSON transforme les décimaux en chaînes
	category: Category;
	region: Region;
}

/**
 * Représente une entrée de suivi pour un arbre planté.
 */
export interface Tracking {
	trackingId: number;
	statementDate: string; // Date au format ISO
	condition: string | null;
	currentHeight: number | null;
	currentPicture: string | null;
}

/**
 * Représente une instance unique d'un arbre qui a été acheté et/ou planté.
 * Il est lié à une commande et à une espèce du catalogue.
 */
export interface PlantedTree {
	plantedTreeId: number;
	personalName: string | null;
	plantingDate: string | null; // Date au format 'YYYY-MM-DD'
	plantingPlace: string | null;
	catalogTree: CatalogTree;
	trackings?: Tracking[]; // L'historique de suivi, chargé optionnellement
}

/**
 * Représente une commande.
 * C'est la structure de base pour un panier ('cart') et une commande finalisée.
 */
export interface Order {
	orderId: number;
	status: "cart" | "completed" | "cancelled";
	orderDate: string; // Date au format ISO
	plantedTrees: PlantedTree[];
}

// ====================================================================
// SECTION 2 : TYPES COMPOSÉS POUR DES CAS D'USAGE SPÉCIFIQUES
// ====================================================================

/**
 * Type pour le panier de l'utilisateur, qui est une forme de commande.
 */
export type CartData = Order;

/**
 * Type pour une commande telle qu'affichée dans le panel admin.
 * Elle étend le type `Order` en y ajoutant les informations de l'utilisateur.
 */
export interface AdminOrder extends Order {
	user: User;
	createdAt: string; // Le timestamp technique de création peut être utile à l'admin
}

/**
 * Type pour un utilisateur tel qu'affiché dans le panel admin.
 */
export type AdminUser = User;

// ====================================================================
// SECTION 3 : INTERFACES POUR LES PROPS DES COMPOSANTS
// ====================================================================

/**
 * Props pour le composant `TreeCard` qui affiche un aperçu d'un arbre.
 */
export interface TreeCardProps {
	tree: CatalogTree;
}

/**
 * Props pour le composant `Pagination`.
 */
export interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

// ====================================================================
// SECTION 4 : INTERFACES POUR LES CONTEXTES REACT
// ====================================================================

/**
 * Définit la structure de l'objet fourni par `AuthContext`.
 */
export interface AuthContextType {
	user: User | null;
	setUser: (user: User | null) => void;
	isLoading: boolean;
}

/**
 * Définit la structure de l'objet fourni par `CartContext`.
 */
export interface CartContextType {
	cart: CartData | null;
	fetchCart: () => Promise<void>;
	addToCart: (catalogTreeId: number) => Promise<void>;
	deleteFromCart: (plantedTreeId: number) => Promise<void>;
	checkout: () => Promise<any>;
	cartItemCount: number;
}
