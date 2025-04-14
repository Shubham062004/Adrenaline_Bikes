
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const images = [
  {
    url: 'https://images.unsplash.com/photo-1580341289255-5b47c98a59df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    title: 'Front View'
  },
  {
    url: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    title: 'Action Shot'
  },
  {
    url: 'https://images.unsplash.com/photo-1619771914272-e3585f1845ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    title: 'Racing Performance'
  },
  {
    url: 'https://images.unsplash.com/photo-1635073944848-eff26a0e1b39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    title: 'Detail Shot'
  },
  {
    url: 'https://images.unsplash.com/photo-1622185135505-2d795003994a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    title: 'Side Profile'
  }
];

const Gallery = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const openLightbox = (index: number) => {
    setActiveImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setActiveImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="gallery" className="py-24 relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white to-purple-50"></div>
      
      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto mb-16 px-6">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Gallery
        </motion.h2>
        <motion.p 
          className="section-subtitle mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Experience the beauty and power of the SuperBike from every angle.
        </motion.p>
      </div>

      {/* Gallery Slider */}
      <div className="relative px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide py-8 cursor-grab select-none"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="min-w-[280px] md:min-w-[400px] glass-card overflow-hidden rounded-xl flex-shrink-0 transform transition-all duration-300 hover:scale-[1.02]"
              onClick={() => openLightbox(index)}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-purple-700">{image.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scroll Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === Math.floor(
                  (scrollRef.current?.scrollLeft || 0) /
                    (scrollRef.current?.scrollWidth || 1) *
                    images.length
                )
                  ? 'bg-purple-600 w-6'
                  : 'bg-gray-300'
              }`}
              onClick={() => {
                if (scrollRef.current) {
                  scrollRef.current.scrollLeft =
                    (scrollRef.current.scrollWidth / images.length) * index;
                }
              }}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {activeImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center px-4">
            <button
              className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full"
              onClick={closeLightbox}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <img
              src={images[activeImage].url}
              alt={images[activeImage].title}
              className="max-w-full max-h-full object-contain"
            />
            <div className="absolute bottom-4 left-0 right-0 text-center text-white text-lg">
              {images[activeImage].title}
            </div>

            {/* Navigation Arrows */}
            {activeImage > 0 && (
              <button
                className="absolute left-4 p-2 bg-black/50 rounded-full text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImage(activeImage - 1);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            )}
            {activeImage < images.length - 1 && (
              <button
                className="absolute right-4 p-2 bg-black/50 rounded-full text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImage(activeImage + 1);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
