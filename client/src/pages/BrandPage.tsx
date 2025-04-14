
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useBrand } from '@/contexts/BrandContext';
import { brands, motorcycles } from '@/data/motorcycles';
import { ShoppingCart, ArrowLeft, GitCompare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useComparison } from '@/contexts/ComparisonContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from '@/hooks/use-toast';

const BrandPage = () => {
  const { brandId } = useParams<{ brandId: string }>();
  const navigate = useNavigate();
  const { setCurrentBrand } = useBrand();
  const { addItem: addToCart } = useCart();
  const { addItem: addToComparison, isInComparison } = useComparison();
  
  const brand = brands.find(b => b.id === brandId);
  const brandBikes = motorcycles.filter(bike => bike.brand === brandId);
  
  useEffect(() => {
    if (brand) {
      setCurrentBrand(brand);
    }
    
    return () => {
      setCurrentBrand(null);
    };
  }, [brand, setCurrentBrand]);
  
  if (!brand) {
    return (
      <>
        {/* <Navbar /> */}
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-bold mb-4">Brand not found</h2>
          <Link to="/brands" className="text-primary hover:underline">
            Back
          </Link>
        </div>
        <Footer />
      </>
    );
  }
  
  const handleAddToCart = (bike: any) => {
    addToCart({
      id: bike.id,
      name: bike.name,
      price: bike.price,
      image: bike.image,
      type: 'motorcycle'
    });
    toast({
      title: "Added to cart",
      description: `${bike.name} has been added to your cart.`,
    });
  };
  
  const handleAddToComparison = (bike: any) => {
    addToComparison(bike);
  };
  
  const bgStyle = {
    backgroundColor: `${brand.secondaryColor}15`, // Using opacity for background
  };
  
  const primaryColorStyle = {
    color: brand.primaryColor,
    borderColor: brand.primaryColor,
  };
  
  const buttonStyle = {
    backgroundColor: brand.primaryColor,
    color: '#ffffff',
  };
  
  return (
    <>
      {/* <Navbar /> */}
      <div style={bgStyle} className="min-h-screen pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <Link 
              to="/brands" 
              className="inline-flex items-center gap-2 mb-6 hover:opacity-70 transition-opacity"
              style={primaryColorStyle}
            >
              <ArrowLeft size={18} />
              Back
            </Link>
            
            <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-white p-2 flex items-center justify-center shadow-lg">
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="w-24 h-24 object-contain"
                />
              </div>
              
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold mb-3" style={{ color: brand.primaryColor }}>
                  {brand.name} Motorcycles
                </h1>
                <p className="text-muted-foreground max-w-2xl">
                  {brand.description}
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brandBikes.map((bike) => (
              <Card key={bike.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <Link to={`/motorcycle/${bike.id}`} className="h-48 overflow-hidden block">
                  <img 
                    src={bike.image} 
                    alt={bike.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </Link>
                <CardContent className="p-6">
                  <Link to={`/motorcycle/${bike.id}`}>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-xl">{bike.name}</h3>
                      <span className="font-bold" style={{ color: brand.primaryColor }}>
                      ₹{bike.price.toLocaleString()}
                      </span>
                    </div>
                  </Link>
                  
                  <div className="flex gap-2 mb-3">
                    <Badge style={{ backgroundColor: brand.primaryColor }}>
                      {bike.category}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-4">
                    {bike.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-y-2 text-sm mb-4">
                    <div><span className="font-semibold">Engine:</span> {bike.engine}</div>
                    <div><span className="font-semibold">Power:</span> {bike.power}</div>
                    <div><span className="font-semibold">Weight:</span> {bike.weight}</div>
                    <div><span className="font-semibold">Fuel:</span> {bike.fuelCapacity}</div>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex gap-2">
                  <Button 
                    className="flex-1"
                    style={buttonStyle}
                    onClick={() => handleAddToCart(bike)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button 
                    variant={isInComparison(bike.id) ? "default" : "outline"}
                    style={isInComparison(bike.id) ? buttonStyle : primaryColorStyle}
                    onClick={() => handleAddToComparison(bike)}
                    disabled={isInComparison(bike.id)}
                  >
                    <GitCompare className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            {brandBikes.length === 0 && (
              <div className="col-span-3 text-center py-12">
                <h3 className="text-xl font-medium mb-2">No motorcycles available</h3>
                <p className="text-muted-foreground">Check back soon for new models.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default BrandPage;
