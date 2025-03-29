
import React from 'react';
import ModelViewer from './ModelViewer';

const Hero = () => {
  return (
    <section 
      id="hero" 
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white to-gray-100"></div>
      
      {/* Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl -z-10"></div>
      
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          {/* Text Content */}
          <div className="w-full md:w-1/2 pt-20 md:pt-0 staggered-fade-in">
            <div className="space-y-6 max-w-xl">
              <span className="inline-block px-3 py-1 bg-purple-500/10 text-purple-600 rounded-full text-sm font-medium">
                Performance Redefined
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                Rocket <span className="text-purple-600">Riders</span> Superbikes
              </h1>
              <p className="text-muted-foreground text-lg">
                Experience extraordinary power and precision with our exclusive collection of superbikes. 
                Engineered for speed enthusiasts and designed for the serious rider.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#specifications" 
                  className="px-6 py-3 bg-purple-600 text-white rounded-full font-medium inline-flex items-center button-hover"
                >
                  Explore Models
                </a>
                <a 
                  href="#parts" 
                  className="px-6 py-3 bg-transparent border border-foreground/20 hover:border-foreground/40 rounded-full font-medium inline-flex items-center transition-all"
                >
                  Shop Parts
                </a>
              </div>
            </div>
          </div>
          
          {/* Image */}
          <div className="w-full md:w-1/2 h-[400px] md:h-[600px] mt-8 md:mt-0 animate-fade-in">
            <ModelViewer />
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute left-1/2 bottom-8 -translate-x-1/2 flex flex-col items-center">
          <span className="text-sm text-muted-foreground mb-2">Scroll to explore</span>
          <div className="w-[30px] h-[50px] rounded-full border-2 border-foreground/20 flex justify-center p-2">
            <div className="w-1.5 h-1.5 rounded-full bg-foreground animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
