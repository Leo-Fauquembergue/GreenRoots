// =====================================
// Interfaces pour les Données de l'API
// =====================================

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface Category {
  categoryId: number;
  name: string;
}

export interface Region {
  regionId: number;
  name: string;
}

export interface CatalogTree {
  catalogTreeId: number;
  commonName: string;
  scientificName: string;
  description: string;
  adultHeight: number;
  image: string;
  price: string; 
  category: Category;
  region: Region;     
}

export interface PlantedTree {
  plantedTreeId: number;
  personalName: string | null;
  plantingDate: string | null;
  plantingPlace: string | null;
  catalogTree: CatalogTree; // L'objet complet de l'espèce
}

export interface CartData {
  orderId: number;
  status: string;
  plantedTrees: PlantedTree[];
}

export interface Order {
  orderId: number;
  orderDate: string; // La date sera une chaîne de caractères (format ISO)
  status: "cart", "completed", "cancelled"; 
  plantedTrees: PlantedTree[]; 
}


export interface CatalogTree {
  catalogTreeId: number;
  commonName: string;
  scientificName: string;
  price: string;
  image: string;
}

export interface Tracking {
  trackingId: number;
  statementDate: string;
  condition?: string;
  currentHeight?: number;
  currentPicture?: string;
  plantedTreeId: number;
}

export interface PlantedTree {
  plantedTreeId: number;
  personalName?: string;
  plantingDate?: string;
  plantingPlace?: string;
  catalogTreeId: number;
  orderId: number;
  catalogTree: CatalogTree; // Inclus via la requête API
  trackings?: Tracking[];   // Inclus via la requête API
}

// =====================================
// Interfaces pour les Props des Composants
// =====================================

export interface TreeCardProps {
  tree: CatalogTree;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// =====================================
// Interfaces pour les Contextes
// =====================================

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
}

export interface CartContextType {
  cart: CartData | null;
  fetchCart: () => Promise<void>;
  addToCart: (catalogTreeId: number) => Promise<void>;
  deleteFromCart: (plantedTreeId: number) => Promise<void>;
  checkout: () => Promise<any>;
  cartItemCount: number;
}


