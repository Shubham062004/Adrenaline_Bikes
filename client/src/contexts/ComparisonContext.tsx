
import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Motorcycle } from '@/data/motorcycles';

interface ComparisonContextType {
  items: Motorcycle[];
  addItem: (item: Motorcycle) => void;
  removeItem: (id: string) => void;
  clearAll: () => void;
  isInComparison: (id: string) => boolean;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export const ComparisonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Motorcycle[]>([]);

  useEffect(() => {
    const storedItems = localStorage.getItem('comparison');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('comparison', JSON.stringify(items));
  }, [items]);

  const addItem = (item: Motorcycle) => {
    if (items.length >= 3) {
      toast.warning("You can only compare up to 3 motorcycles at a time. Remove one to add another.");
      return;
    }
    
    if (items.some(i => i.id === item.id)) {
      toast.info(`${item.name} is already in your comparison list`);
      return;
    }
    
    setItems(prev => [...prev, item]);
    toast.success(`Added ${item.name} to comparison`);
  };

  const removeItem = (id: string) => {
    const itemToRemove = items.find(item => item.id === id);
    setItems(prev => prev.filter(item => item.id !== id));
    
    if (itemToRemove) {
      toast.info(`Removed ${itemToRemove.name} from comparison`);
    }
  };

  const clearAll = () => {
    setItems([]);
    toast.info("Cleared all items from comparison");
  };

  const isInComparison = (id: string) => {
    return items.some(item => item.id === id);
  };

  return (
    <ComparisonContext.Provider value={{ items, addItem, removeItem, clearAll, isInComparison }}>
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (context === undefined) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
};
