export interface CatalogTree {
	catalogTreeId: number;
	commonName: string;
	scientificName: string;
	description: string;
	adultHeight: number;
	image: string;
	price: number;
	categoryId: number;
	regionId: number;
	category: {
		categoryId: number;
		name: string;
	};
	region: {
		regionId: number;
		name: string;
	};
}

export interface Category {
	categoryId: number;
	name: string;
}

export interface Region {
	regionId: number;
	name: string;
}

export interface TreeCardProps {
  catalogTreeId: number;
  commonName: string;
  scientificName?: string;
  description: string;
  image?: string;
  categoryName: string;
  regionName: string;
}
