
import React, { useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Bike } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Powerful Engine',
    description: '998cc liquid-cooled inline four-cylinder engine delivers incredible power and acceleration.',
    image: 'https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
  },
  {
    title: 'Advanced Suspension',
    description: 'Showa Balance Free Fork (BFF) front suspension and BFRC lite rear suspension for precise handling.',
    image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
  },
  {
    title: 'Electronic Rider Aids',
    description: 'Integrated Racing Electronics including Sport-Kawasaki TRaction Control and Power Modes.',
    image: 'https://images.unsplash.com/photo-1525160354320-d8e92641c563?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
  }
];

const Specifications = () => {
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    
    featureRefs.current.forEach((element, index) => {
      if (!element) return;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.2 }
      );
      
      observer.observe(element);
      observers.push(observer);
    });
    
    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);
  
  return (
    <section id="specifications" className="section relative py-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-purple-50 to-white"></div>
      
      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Technical Excellence
        </motion.h2>
        <motion.p 
          className="section-subtitle mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Precision engineering meets cutting-edge technology to deliver unmatched performance both on and off the track.
        </motion.p>
      </div>
      
      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {features.map((feature, index) => (
          <motion.div 
            key={index}
            ref={el => featureRefs.current[index] = el}
            className={cn(
              "glass-card p-6 opacity-0",
              index === 1 ? "md:translate-y-8" : ""
            )}
            style={{ animationDelay: `${0.2 * index}s` }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="aspect-video mb-6 overflow-hidden rounded-lg">
              <img 
                src={feature.image} 
                alt={feature.title} 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-purple-700">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Specifications;
