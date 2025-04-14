
import React from 'react';
import { Link } from 'react-router-dom';
import { gearItems } from '@/data/gear';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

const HomeGearSection = () => {
  const { addItem } = useCart();
  
  // Select a subset of gear items to show
  const featuredGear = gearItems.slice(0, 4);
  
  const handleAddToCart = (item) => {
    addItem({
      id: item.id.toString(),
      name: item.name,
      price: item.numericPrice,
      image: item.image,
      type: 'gear'
    });
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    });
  };
  
  const handleAddToWishlist = (item) => {
    const wishlistItem = {
      id: item.id.toString(),
      name: item.name,
      price: item.numericPrice,
      image: item.image,
      type: 'gear',
      addedAt: new Date().toISOString()
    };
    
    const existingWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const isItemInWishlist = existingWishlist.some(i => i.id === wishlistItem.id && i.type === wishlistItem.type);
    
    if (isItemInWishlist) {
      const updatedWishlist = existingWishlist.filter(i => !(i.id === wishlistItem.id && i.type === wishlistItem.type));
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      toast({
        title: "Removed from wishlist",
        description: `${item.name} has been removed from your wishlist.`,
      });
    } else {
      const updatedWishlist = [...existingWishlist, wishlistItem];
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      toast({
        title: "Added to wishlist",
        description: `${item.name} has been added to your wishlist.`,
      });
    }
  };
  
  const isInWishlist = (itemId) => {
    const existingWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    return existingWishlist.some(item => item.id === itemId.toString() && item.type === 'gear');
  };
  
  // Function to convert $ to ₹ (multiplying by 75 as an approximate exchange rate)
  const convertToRupees = (price) => {
    if (typeof price === 'number') {
      return `₹${Math.round(price * 75).toLocaleString('en-IN')}`;
    }
    // If price is already a string with $ sign
    const numericValue = parseFloat(price.replace(/[^0-9.]/g, ''));
    return `₹${Math.round(numericValue * 75).toLocaleString('en-IN')}`;
  };

  return (
    <section id="featured-gear" className="py-20 bg-purple-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Premium Riding Gear</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Equip yourself with top-quality gear designed for performance, safety, and comfort.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {featuredGear.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full flex flex-col"
            >
              <div className="relative">
                <Link to={`/gear/${item.id}`} className="h-48 overflow-hidden block">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                  <div className="absolute top-3 left-3 text-white px-2 py-1 text-xs rounded-full bg-purple-600">
                    {item.category}
                  </div>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`absolute top-3 right-3 rounded-full ${
                    isInWishlist(item.id) ? 'text-red-500 hover:text-red-600' : 'text-white hover:text-red-500'
                  }`}
                  onClick={() => handleAddToWishlist(item)}
                >
                  <Heart className={`h-5 w-5 ${isInWishlist(item.id) ? 'fill-current' : ''}`} />
                </Button>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <Link to={`/gear/${item.id}`} className="block">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <span className="font-bold text-purple-600">{convertToRupees(item.price)}</span>
                  </div>
                </Link>
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < Math.floor(item.rating) ? 'fill-current' : ''}`} />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground ml-1">{item.rating}/5</span>
                </div>
                <p className="text-muted-foreground text-sm mb-2 line-clamp-2">{item.description}</p>
                <div className="flex justify-between items-center mb-4 mt-auto">
                  <span className="text-xs text-muted-foreground">{item.brand}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${item.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {item.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                <Button 
                  className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={() => handleAddToCart(item)}
                  disabled={!item.inStock}
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center">
          <Button 
            asChild
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Link to="/gear" className="inline-flex items-center">
              View All Gear
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HomeGearSection;
