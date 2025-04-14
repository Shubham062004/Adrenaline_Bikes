
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Brand, brands } from '@/data/motorcycles';

interface BrandContextType {
  currentBrand: Brand | null;
  setCurrentBrand: (brand: Brand | null) => void;
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export function BrandProvider({ children }: { children: ReactNode }) {
  const [currentBrand, setCurrentBrand] = useState<Brand | null>(null);

  return (
    <BrandContext.Provider value={{ currentBrand, setCurrentBrand }}>
      {children}
    </BrandContext.Provider>
  );
}

export function useBrand() {
  const context = useContext(BrandContext);
  if (context === undefined) {
    throw new Error('useBrand must be used within a BrandProvider');
  }
  return context;
}
