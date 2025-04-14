
import React from 'react';
import { useComparison } from '@/contexts/ComparisonContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trash2, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ComparePage = () => {
  const { items, removeItem, clearAll } = useComparison();
  const navigate = useNavigate();

  if (items.length < 2) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-6 py-20 flex flex-col items-center justify-center min-h-[60vh]">
          <h1 className="text-2xl font-bold mb-4">Not Enough Motorcycles</h1>
          <p className="text-muted-foreground text-center mb-6">
            You need at least 2 motorcycles to compare. Please add more motorcycles.
          </p>
          <Button asChild className="bg-purple-600 hover:bg-purple-700">
            <Link to="/brands">Browse Motorcycles</Link>
          </Button>
        </div>
        <Footer />
      </>
    );
  }

  const specs = [
    { label: "Engine", key: "engine" },
    { label: "Power", key: "power" },
    { label: "Weight", key: "weight" },
    { label: "Fuel Capacity", key: "fuelCapacity" },
    { label: "Category", key: "category" },
    { label: "Origin", key: "origin" },
  ];

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-16">
        <div className="flex justify-between items-center mb-8">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Motorcycle Comparison</h1>
          <Button variant="outline" className="text-destructive" onClick={clearAll}>
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col">
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-60 object-cover rounded-t-lg"
                />
                <Button 
                  variant="destructive" 
                  size="icon" 
                  className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white bg-opacity-80 text-gray-700 hover:bg-opacity-100 hover:text-destructive"
                  onClick={() => removeItem(item.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="p-4 border-x border-b rounded-b-lg">
                <h3 className="text-xl font-bold">{item.name}</h3>
                <p className="text-purple-600 font-bold text-lg"> ₹{item.price.toLocaleString()}</p>
                <div className="mt-4 space-y-4">
                  {specs.map((spec) => (
                    <div key={spec.key} className="border-t pt-2">
                      <div className="text-sm text-muted-foreground">{spec.label}</div>
                      <div className="font-medium">{item[spec.key as keyof typeof item]}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ComparePage;
