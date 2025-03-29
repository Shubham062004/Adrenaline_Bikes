
import React, { useState, useEffect } from 'react';

interface SearchSuggestionsProps {
  suggestions: string[];
  className?: string;
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({ suggestions, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % suggestions.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [suggestions.length]);

  return (
    <div className={`relative h-6 overflow-hidden ${className}`}>
      <div 
        className="transition-transform duration-500 ease-in-out" 
        style={{ transform: `translateY(-${currentIndex * 24}px)` }}
      >
        {suggestions.map((suggestion, index) => (
          <div key={index} className="h-6 flex items-center">
            {suggestion}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchSuggestions;
