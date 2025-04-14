
import React from 'react';
import { useComparison } from '@/contexts/ComparisonContext';
import { Button } from '@/components/ui/button';
import { GitCompare, X, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";

const ComparisonDrawer = () => {
  const { items, removeItem, clearAll } = useComparison();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative"
          aria-label="Comparison"
        >
          <GitCompare className="h-5 w-5" />
          {items.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {items.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col h-full w-full sm:max-w-md">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="flex justify-between items-center">
            Motorcycle Comparison
            {items.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-destructive"
                onClick={clearAll}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            )}
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex-grow overflow-auto py-4">
          {items.length > 0 ? (
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex items-start gap-4 p-4 rounded-lg border">
                  <div className="h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{item.name}</h4>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-destructive -mt-1 -mr-1"
                        onClick={() => removeItem(item.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground"> ₹{item.price.toLocaleString()}</p>
                    <div className="text-sm mt-1">
                      <span className="inline-block px-2 py-1 bg-gray-100 rounded text-xs">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <GitCompare className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="font-medium text-lg">No motorcycles to compare</h3>
              <p className="text-muted-foreground">Add motorcycles to compare their specifications and features.</p>
            </div>
          )}
        </div>
        
        {items.length >= 2 && (
          <SheetFooter className="border-t py-4 flex-shrink-0">
            <Button className="w-full bg-purple-600 hover:bg-purple-700" asChild>
              <Link to="/compare">
                Compare ({items.length})
              </Link>
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default ComparisonDrawer;
