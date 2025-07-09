/** biome-ignore-all lint/a11y/useButtonType: <explanation> */
import "../style/catalog.scss"

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface CatalogTree {
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

interface Category {
  categoryId: number;
  name: string;
}

interface Region {
  regionId: number;
  name: string;
}

const API_BASE_URL = 'http://localhost:3000';

// Hook personnalisé avec axios
const useCatalogData = () => {
  const [trees, setTrees] = useState<CatalogTree[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [treesResponse, categoriesResponse, regionsResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/catalog-trees`),
          axios.get(`${API_BASE_URL}/categories`),
          axios.get(`${API_BASE_URL}/regions`)
        ]);

        setTrees(treesResponse.data);
        setCategories(categoriesResponse.data);
        setRegions(regionsResponse.data);
      } catch (err: any) {
        setError(err.message || 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { trees, categories, regions, loading, error };
};

const Catalog: React.FC = () => {
  const { trees, categories, regions, loading, error } = useCatalogData();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [filteredTrees, setFilteredTrees] = useState<CatalogTree[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    let filtered = trees;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(tree => tree.category.name === selectedCategory);
    }

    if (selectedRegion !== 'all') {
      filtered = filtered.filter(tree => tree.region.name === selectedRegion);
    }

    setFilteredTrees(filtered);
  }, [trees, selectedCategory, selectedRegion]);

  const handleFilter = () => {
    console.log('Filtrage appliqué:', selectedCategory, selectedRegion);
  };

  const handleSeeMore = () => {
    setVisibleCount(filteredTrees.length);
  };

  const handleLearnMore = (id: number) => {
    console.log('En savoir plus cliqué pour l\'arbre:', id);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du catalogue...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <svg className="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="catalog min-h-screen bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="catalog-title text-4xl md:text-5xl mb-6">Catalogue</h1>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi, voluptate incidunt odio amet doloremque nostrum odit repellat nihil, dolorem nesciunt temporibus earum veniam, in ad vero quos deleniti delectus fugiat.
          </p>
        </header>

        {/* Filters */}
        <div className="filter-bar flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 p-6 rounded-lg mb-12">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700">Catégorie:</label>
            <select 
              className="px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 text-sm min-w-32 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">Toutes les catégories</option>
              {categories.map((category) => (
                <option key={category.categoryId} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700">Région:</label>
            <select 
              className="px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 text-sm min-w-32 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              <option value="all">Toutes les régions</option>
              {regions.map((region) => (
                <option key={region.regionId} value={region.name}>
                  {region.name}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredTrees.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-gray-600">Aucun arbre trouvé pour ces critères</p>
            </div>
          ) : (
            filteredTrees.slice(0, visibleCount).map((tree) => (
              <div key={tree.catalogTreeId} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="h-48 bg-gray-100 flex items-center justify-center relative overflow-hidden">
                  <img 
                    src={tree.image ? `/images/${tree.image}` : '/images/tree-placeholder.jpg'} 
                    alt={tree.commonName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/images/tree-placeholder.jpg';
                    }}
                  />
                </div>
                <div className="p-6">
                  <div className="mb-3">
                    <span className="card-cat-reg text-xs italic tracking-wide">
                      {tree.category.name} / {tree.region.name}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-emerald-900 mb-2 leading-tight">
                    {tree.commonName}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {tree.description}
                  </p>
                  <button 
                    className="btn-light w-full px-6 py-3 rounded-full text-sm font-medium hover:text-white transition-all duration-300 hover:-translate-y-0.5"
                    onClick={() => handleLearnMore(tree.catalogTreeId)}
                  >
                    En savoir plus
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bouton Voir plus */}
        {visibleCount < filteredTrees.length && (
          <div className="text-center">
            <button 
              className="btn-dark px-8 py-4 text-white rounded-full text-base font-medium  transition-all duration-300 hover:-translate-y-0.5"
              onClick={handleSeeMore}
            >
              Voir plus
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;
