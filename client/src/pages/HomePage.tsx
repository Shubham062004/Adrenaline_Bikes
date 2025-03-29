
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Specifications from '@/components/Specifications';
import BikeParts from '@/components/BikeParts';
import Gear from '@/components/Gear';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { brands } from '@/data/motorcycles';
import { ArrowRight, Bike } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBrand } from '@/contexts/BrandContext';
import { motion } from 'framer-motion';

const Index = () => {
  const { setCurrentBrand } = useBrand();
  
  // Reset brand on home page
  useEffect(() => {
    setCurrentBrand(null);
  }, [setCurrentBrand]);

  // Smooth scrolling for anchor links
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A') {
        const href = (target as HTMLAnchorElement).getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const element = document.querySelector(href);
          if (element) {
            window.scrollTo({
              top: element.getBoundingClientRect().top + window.scrollY - 80,
              behavior: 'smooth'
            });
          }
        }
      }
    };

    document.addEventListener('click', handleLinkClick);
    return () => document.removeEventListener('click', handleLinkClick);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <Specifications />
      
      {/* Brands Showcase Section */}
      <motion.section 
        className="py-20 bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <Bike className="h-12 w-12 text-purple-600" />
            </div>
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Premium SuperBike Brands
            </motion.h2>
            <motion.p 
              className="text-muted-foreground max-w-2xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Explore our extensive collection of motorcycles from world-renowned manufacturers.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
            {brands.slice(0, 8).map((brand, index) => (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link
                  to={`/brands/${brand.id}`}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col items-center justify-center"
                  style={{ borderTop: `3px solid ${brand.primaryColor}` }}
                >
                  <div className="w-24 h-24 flex items-center justify-center">
                    <img 
                      src={brand.logo} 
                      alt={brand.name} 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mt-3" style={{ color: brand.primaryColor }}>
                    {brand.name}
                  </h3>
                  <div className="mt-2 h-20 w-full overflow-hidden rounded-md">
                    <img 
                      src={`https://source.unsplash.com/featured/?motorcycle,${brand.name}`} 
                      alt={`${brand.name} motorcycle`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center">
            <Button 
              asChild
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Link to="/brands" className="inline-flex items-center">
                View All Brands
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </motion.section>
      
      <BikeParts />
      <Gear />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
