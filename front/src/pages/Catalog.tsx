import React, { useState } from 'react';

interface CatalogItem {
  id: number;
  title: string;
  description: string;
  category: string;
  region: string;
  image: string;
}

const Catalog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('tropicaux');
  const [selectedRegion, setSelectedRegion] = useState<string>('Montagneux');

  const catalogItems: CatalogItem[] = [
    {
      id: 1,
      title: 'Blog title heading goes here',
      description: 'Lorem ipsum dolor sit amet et delectus accommodare his consul copiosae.',
      category: 'tropicaux',
      region: 'Montagneux',
      image: '/images/tree-placeholder.jpg'
    },
    {
      id: 2,
      title: 'Blog title heading goes here',
      description: 'Lorem ipsum dolor sit amet et delectus accommodare his consul copiosae.',
      category: 'tropicaux',
      region: 'Montagneux',
      image: '/images/tree-placeholder.jpg'
    },
    {
      id: 3,
      title: 'Blog title heading goes here',
      description: 'Lorem ipsum dolor sit amet et delectus accommodare his consul copiosae.',
      category: 'tropicaux',
      region: 'Montagneux',
      image: '/images/tree-placeholder.jpg'
    },
    {
      id: 4,
      title: 'Blog title heading goes here',
      description: 'Lorem ipsum dolor sit amet et delectus accommodare his consul copiosae.',
      category: 'tropicaux',
      region: 'Montagneux',
      image: '/images/tree-placeholder.jpg'
    },
    {
      id: 5,
      title: 'Blog title heading goes here',
      description: 'Lorem ipsum dolor sit amet et delectus accommodare his consul copiosae.',
      category: 'tropicaux',
      region: 'Montagneux',
      image: '/images/tree-placeholder.jpg'
    },
    {
      id: 6,
      title: 'Blog title heading goes here',
      description: 'Lorem ipsum dolor sit amet et delectus accommodare his consul copiosae.',
      category: 'tropicaux',
      region: 'Montagneux',
      image: '/images/tree-placeholder.jpg'
    }
  ];

  const handleFilter = () => {
    // Logic for filtering items based on selected category and region
    console.log('Filtering with:', selectedCategory, selectedRegion);
  };

  const handleLearnMore = (id: number) => {
    console.log('Learn more clicked for item:', id);
  };

  return (
    <div className="catalog min-h-screen bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light text-emerald-900 mb-6 font-serif">
            Catalogue
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Lorem ipsum dolor sit amet et delectus accommodare his consul copiosae.
          </p>
        </header>

        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 bg-gray-50 p-6 rounded-lg mb-12">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700">Category:</label>
            <select 
              className="px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 text-sm min-w-32 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="tropicaux">tropicaux</option>
              <option value="urbain">urbain</option>
              <option value="nature">nature</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700">Region:</label>
            <select 
              className="px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 text-sm min-w-32 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              <option value="Montagneux">Montagneux</option>
              <option value="Côtier">Côtier</option>
              <option value="Continental">Continental</option>
            </select>
          </div>

          <button 
            className="px-6 py-2 bg-emerald-700 text-white rounded-full text-sm font-medium hover:bg-emerald-800 transition-all duration-300 hover:-translate-y-0.5"
            onClick={handleFilter}
          >
            Filter
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {catalogItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="h-48 bg-gray-100 flex items-center justify-center relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                {/* Placeholder icon when no image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-12 bg-gray-300 rounded flex items-center justify-center">
                    <div className="w-6 h-6 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-3">
                  <span className="text-xs text-emerald-600 font-semibold uppercase tracking-wide">
                    Category/region
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-emerald-900 mb-3 leading-tight">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {item.description}
                </p>
                <button 
                  className="px-6 py-3 bg-emerald-50 text-emerald-800 rounded-full text-sm font-medium hover:bg-emerald-600 hover:text-white transition-all duration-300 hover:-translate-y-0.5"
                  onClick={() => handleLearnMore(item.id)}
                >
                  En savoir plus
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="text-center">
          <button className="px-8 py-4 bg-emerald-700 text-white rounded-full text-base font-medium hover:bg-emerald-800 transition-all duration-300 hover:-translate-y-0.5">
            voir plus
          </button>
        </div>
      </div>
    </div>
  );
};

export default Catalog;