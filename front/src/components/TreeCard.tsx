/** biome-ignore-all lint/a11y/useButtonType: <explanation> */
import React from 'react';

interface TreeCardProps {
  catalogTreeId: number;
  commonName: string;
  scientificName?: string;
  description: string;
  image?: string;
  categoryName: string;
  regionName: string;
  onLearnMore: (id: number) => void;
}

const TreeCard: React.FC<TreeCardProps> = ({
  catalogTreeId,
  commonName,
  description,
  image,
  categoryName,
  regionName,
  onLearnMore
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="h-48 bg-gray-100 flex items-center justify-center relative overflow-hidden">
        <img 
          src={image ? `/images/${image}` : '/images/tree-placeholder.jpg'} 
          alt={commonName}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = '/images/tree-placeholder.jpg';
          }}
        />
      </div>
      <div className="p-6">
        <div className="mb-3">
          <span className="card-cat-reg text-xs italic tracking-wide">
            {categoryName} / {regionName}
          </span>
        </div>
        <h3 className="text-xl mb-2 leading-tight">
          {commonName}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {description}
        </p>
        <button 
          className="btn-light w-full px-6 py-3 rounded-full text-sm font-medium hover:text-white transition-all duration-300 hover:-translate-y-0.5"
          onClick={() => onLearnMore(catalogTreeId)}
        >
          En savoir plus
        </button>
      </div>
    </div>
  );
};

export default TreeCard;
