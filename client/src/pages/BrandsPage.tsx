
import React from 'react';
import { Link } from 'react-router-dom';
import { brands } from '@/data/motorcycles';
import { ArrowRight } from 'lucide-react';

const BrandsPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Motorcycle Brands</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of premium motorcycle brands, each with their own unique heritage and riding experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {brands.map((brand) => (
            <Link 
              key={brand.id} 
              to={`/brands/${brand.id}`}
              className="group block"
            >
              <div 
                className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl"
                style={{ borderTop: `4px solid ${brand.primaryColor}` }}
              >
                <div className="h-40 flex items-center justify-center p-4">
                  <img 
                    src={brand.logo} 
                    alt={brand.name} 
                    className="max-h-32 object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2" style={{ color: brand.primaryColor }}>
                    {brand.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {brand.description}
                  </p>
                  <div 
                    className="flex items-center justify-end font-medium text-sm"
                    style={{ color: brand.primaryColor }}
                  >
                    <span>View motorcycles</span>
                    <ArrowRight className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandsPage;
