
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { brands } from '@/data/index';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BrandCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const activeBrand = brands[activeIndex];

  return (
    <section id="about" className="section py-24 relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-purple-100 to-white"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Premium Motorcycle Brands</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our extensive collection of motorcycles from world-renowned manufacturers.
          </p>
        </div>
        
        <div className="mx-auto max-w-5xl">
          <Carousel 
            className="w-full relative"
            // Fix: Ensure we're properly handling the onSelect by calling setActiveIndex with the index value
            onSelect={(index) => {
              if (typeof index === 'number') {
                setActiveIndex(index);
              }
            }}
          >
            <CarouselContent>
              {brands.map((brand, index) => (
                <CarouselItem key={brand.id}>
                  <div className="flex flex-col md:flex-row gap-8 p-6">
                    {/* Brand Info */}
                    <div className="md:w-1/2 space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-white rounded-full p-2 flex items-center justify-center shadow-md" style={{ borderColor: brand.primaryColor, borderWidth: '2px' }}>
                          <img src={brand.logo} alt={brand.name} className="w-10 h-10 object-contain" />
                        </div>
                        <h3 className="text-2xl font-bold" style={{ color: brand.primaryColor }}>{brand.name}</h3>
                      </div>
                      
                      <p className="text-muted-foreground">
                        {brand.description}
                      </p>
                      
                      <div className="pt-4">
                        <Button 
                          asChild
                          style={{ backgroundColor: brand.primaryColor }}
                          className="text-white"
                        >
                          <Link to={`/brands/${brand.id}`} className="inline-flex items-center">
                            Explore {brand.name} 
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                    
                    {/* Brand Image */}
                    <div className="md:w-1/2 h-64 md:h-72">
                      <div className="rounded-xl overflow-hidden h-full">
                        <img 
                          src={`https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&brand=${brand.name}`}
                          alt={`${brand.name} motorcycles`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <div className="absolute -bottom-12 left-0 right-0 flex justify-center gap-4">
              <CarouselPrevious className="relative inset-0 translate-y-0 h-10 w-10" />
              <CarouselNext className="relative inset-0 translate-y-0 h-10 w-10" />
            </div>
          </Carousel>
          
          <div className="mt-16 flex justify-center">
            <div className="flex space-x-2">
              {brands.map((brand, index) => (
                <button
                  key={brand.id}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'bg-purple-600 w-6' : 'bg-gray-300'
                  }`}
                  aria-label={`View ${brand.name}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandCarousel;
