
import React from 'react';
import { Wrench, ShoppingCart, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const BikeParts = () => {
  const { addItem } = useCart();
  
  const parts = [
    {
      id: "part-1",
      name: "Performance Exhaust System",
      price: 899,
      description: "Titanium racing exhaust with carbon fiber tip. Reduces weight and increases power output.",
      image: "https://images.unsplash.com/photo-1635073908681-644fcd6e5df0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "part-2",
      name: "Carbon Fiber Fairings",
      price: 1299,
      description: "Full set of racing-grade carbon fiber fairings. Reduces weight by up to 40% compared to stock.",
      image: "https://images.unsplash.com/photo-1620726990664-aaef22b75c43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "part-3",
      name: "Racing Brake Calipers",
      price: 749,
      description: "Forged aluminum 4-piston brake calipers with improved thermal management.",
      image: "https://images.unsplash.com/photo-1605584272006-f9ba707d8bea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "part-4",
      name: "Performance ECU",
      price: 599,
      description: "Programmable engine control unit with multiple power maps and launch control.",
      image: "https://images.unsplash.com/photo-1605947464626-617a058dedcf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    }
  ];

  const handleAddToCart = (part: typeof parts[0]) => {
    addItem({
      id: part.id,
      name: part.name,
      price: part.price,
      image: part.image,
      type: 'part'
    });
    toast({
      title: "Added to cart",
      description: `${part.name} has been added to your cart.`,
    });
  };

  const handleAddToWishlist = (part) => {
    const wishlistItem = {
      id: part.id,
      name: part.name,
      price: part.price,
      image: part.image,
      type: 'part',
      addedAt: new Date().toISOString()
    };
    
    const existingWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const isItemInWishlist = existingWishlist.some(i => i.id === wishlistItem.id && i.type === wishlistItem.type);
    
    if (isItemInWishlist) {
      const updatedWishlist = existingWishlist.filter(i => !(i.id === wishlistItem.id && i.type === wishlistItem.type));
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      toast({
        title: "Removed from wishlist",
        description: `${part.name} has been removed from your wishlist.`,
      });
    } else {
      const updatedWishlist = [...existingWishlist, wishlistItem];
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      toast({
        title: "Added to wishlist",
        description: `${part.name} has been added to your wishlist.`,
      });
    }
  };

  const isInWishlist = (itemId) => {
    const existingWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    return existingWishlist.some(item => item.id === itemId && item.type === 'part');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="parts" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="flex justify-center items-center mb-3"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-2 bg-purple-100 rounded-full">
              <Wrench className="h-6 w-6 text-purple-600" />
            </div>
          </motion.div>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Performance Parts
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Upgrade your ride with our premium selection of high-performance motorcycle parts designed for maximum power and precision.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {parts.map((part) => (
            <motion.div 
              key={part.id} 
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              variants={itemVariants}
            >
               <div className="relative">
                <Link to={`/part/${part.id}`} className="h-48 overflow-hidden block">
                  <img 
                    src={part.image} 
                    alt={part.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`absolute top-3 right-3 rounded-full ${
                    isInWishlist(part.id) ? 'text-red-500 hover:text-red-600' : 'text-white hover:text-red-500'
                  }`}
                  onClick={() => handleAddToWishlist(part)}
                >
                  <Heart className={`h-5 w-5 ${isInWishlist(part.id) ? 'fill-current' : ''}`} />
                </Button>
              </div>
              <div className="p-6">
                <Link to={`/part/${part.id}`} className="block">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{part.name}</h3>
                    <span className="font-bold text-purple-600"> ₹{part.price}</span>
                  </div>
                </Link>
                <p className="text-muted-foreground text-sm mb-4">{part.description}</p>
                <Button 
                  className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={() => handleAddToCart(part)}
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center mt-12">
          <Button 
            variant="outline"
            className="inline-flex items-center px-6 py-3 border border-purple-600 text-purple-600 hover:bg-purple-50 rounded-full font-medium transition-colors"
            asChild
          >
            <Link to="/parts">
              View All Parts
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BikeParts;
