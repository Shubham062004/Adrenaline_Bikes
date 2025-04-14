
import React from 'react';

const About = () => {
  return (
    <section id="about" className="section py-24 relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-purple-100 to-white"></div>
      
      {/* Content Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Image Side */}
        <div className="relative">
          <div className="aspect-square rounded-2xl overflow-hidden glass-card p-4">
            <img 
              src="https://images.unsplash.com/photo-1632743050926-0e0d76926acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Motorcycle Factory" 
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="absolute -bottom-8 -right-8 bg-purple-600/90 backdrop-blur-sm text-white p-6 rounded-xl max-w-xs hidden md:block">
            <p className="text-sm leading-relaxed">
              "For over 50 years, the premium superbike lines have pushed the boundaries of motorcycle performance."
            </p>
          </div>
        </div>
        
        {/* Text Side */}
        <div className="space-y-8">
          <div>
            <h4 className="text-purple-600 font-medium mb-3">Our Legacy</h4>
            <h2 className="section-title mb-6">Experience the Difference</h2>
            <p className="text-muted-foreground">
              Since 1966, premium motorcycle manufacturers have been pioneering innovation. The world-class superbike lines, revolutionized sportbike design with unparalleled blends of power, handling, and aerodynamics.
            </p>
          </div>
          
          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-8 mt-12">
            <div>
              <div className="bg-purple-600/10 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Built with Passion</h3>
              <p className="text-muted-foreground">Crafted by enthusiasts for enthusiasts, with attention to every detail.</p>
            </div>
            <div>
              <div className="bg-purple-600/10 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5Z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Racing Heritage</h3>
              <p className="text-muted-foreground">Technology developed on the racetrack, refined for the streets.</p>
            </div>
            <div>
              <div className="bg-purple-600/10 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Safety First</h3>
              <p className="text-muted-foreground">Advanced electronics and systems designed to enhance rider safety.</p>
            </div>
            <div>
              <div className="bg-purple-600/10 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Future Tech</h3>
              <p className="text-muted-foreground">Constantly innovating to deliver tomorrow's technology today.</p>
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="pt-6">
            <a 
              href="#contact" 
              className="px-6 py-3 bg-purple-600 text-white rounded-full font-medium inline-flex items-center button-hover"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
