
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useComparison } from '@/contexts/ComparisonContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, ShoppingCart, GitCompare, Heart, Trash2, ShoppingBag } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getMockWishlist, WishlistItem } from '@/data/wishlist';

const WishlistPage = () => {
  const { user } = useAuth();
  const { addItem: addToCart } = useCart();
  const { addItem: addToComparison, isInComparison } = useComparison();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(() => {
    if (!user) return [];
    return getMockWishlist(user.email);
  });
  
  if (!user) {
    navigate('/sign-in');
    return null;
  }
  
  const filteredItems = wishlistItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleRemoveFromWishlist = (itemId: string) => {
    setWishlistItems(items => items.filter(item => item.id !== itemId));
    toast({
      title: "Removed from wishlist",
      description: "Item has been removed from your wishlist.",
    });
  };
  
  const handleAddToCart = (item: WishlistItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      type: item.type
    });
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    });
  };
  
  const handleAddToComparison = (item: WishlistItem) => {
    if (item.type !== 'motorcycle') {
      toast({
        title: "Comparison not available",
        description: "Only motorcycles can be added to comparison.",
        variant: "destructive"
      });
      return;
    }
    
    // For motorcycles, we need to find the actual motorcycle data
    // In a real app, this would come from an API
    // For now, we'll just add it with the available data
    addToComparison({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: "Unknown",
      engine: "Unknown",
      power: "Unknown",
      weight: "Unknown",
      fuelCapacity: "Unknown",
      description: "Unknown",
      origin: "Unknown",
      brand: "Unknown"
    });
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">My Wishlist</h1>
              <p className="text-muted-foreground mt-1">
                {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
              </p>
            </div>
            <Button asChild className="bg-purple-600 hover:bg-purple-700">
              <a href="/parts">Continue Shopping</a>
            </Button>
          </div>
          
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search wishlist" 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            {filteredItems.length === 0 ? (
              <Card className="text-center py-16">
                <CardContent>
                  <div className="flex flex-col items-center">
                    <Heart className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium mb-2">Your Wishlist is Empty</h3>
                    <p className="text-muted-foreground mb-6">
                      {searchTerm.trim() !== '' ? 
                        "No items match your search. Try a different search term." : 
                        "Add items to your wishlist to keep track of products you love."}
                    </p>
                    <Button asChild className="bg-purple-600 hover:bg-purple-700">
                      <a href="/motorcycles">Start Shopping</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="relative">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-48 object-cover"
                      />
                      <Button 
                        variant="destructive" 
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8 rounded-full"
                        onClick={() => handleRemoveFromWishlist(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <CardContent className="p-4">
                      <div className="mb-4">
                        <h3 className="font-bold text-lg mb-1 line-clamp-1">{item.name}</h3>
                        <div className="flex items-center justify-between">
                          <p className="text-purple-600 font-bold"> ₹{item.price.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">Added {formatDate(item.addedAt)}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          className="flex-1 bg-purple-600 hover:bg-purple-700"
                          onClick={() => handleAddToCart(item)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                        
                        {item.type === 'motorcycle' && (
                          <Button 
                            variant="outline"
                            className="flex-0"
                            onClick={() => handleAddToComparison(item)}
                            disabled={isInComparison(item.id)}
                          >
                            <GitCompare className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WishlistPage;
