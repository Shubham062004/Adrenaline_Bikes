import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ArrowLeft, Star } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ReviewList from '@/components/reviews/ReviewList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';

const getPart = (id: string) => {
  const parts = [
    {
      id: "part-1",
      name: "Performance Air Filter",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1578188688082-7c079235d0e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      brand: "K&N",
      category: "Air Intake",
      compatibility: ["honda", "yamaha", "kawasaki"],
      description: "High-flow air filter for improved performance and throttle response. Designed to increase horsepower while providing excellent filtration. Washable and reusable design for long service life and reduced maintenance costs.",
      rating: 4.8,
      inStock: true
    },
    {
      id: "part-2",
      name: "Racing Exhaust System",
      price: 649.99,
      image: "https://images.unsplash.com/photo-1594787317554-dcc17c53f741?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      brand: "Akrapovic",
      category: "Exhaust",
      compatibility: ["ducati", "bmw", "aprilia"],
      description: "Titanium racing exhaust system for maximum power gains and weight reduction. Handcrafted from high-grade titanium with carbon fiber endcaps. Includes removable dB killer for track days.",
      rating: 4.9,
      inStock: true
    },
    // more parts would be here in a real application
  ];
  
  return parts.find(p => p.id === id);
};

const PartDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { user } = useAuth();
  const [part, setPart] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');
  const [review, setReview] = useState({ rating: 5, comment: '' });
  const [refreshReviews, setRefreshReviews] = useState(0);

  useEffect(() => {
    if (id) {
      const foundPart = getPart(id);
      if (foundPart) {
        setPart(foundPart);
        setActiveImage(foundPart.image);
      }
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-6 py-20 text-center">
          <p>Loading part details...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!part) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Part Not Found</h1>
          <p className="mb-6">The part you're looking for does not exist.</p>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
        <Footer />
      </>
    );
  }

  const handleAddToCart = () => {
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

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to leave a review.",
        variant: "destructive"
      });
      return;
    }

    if (!review.comment.trim()) {
      toast({
        title: "Review required",
        description: "Please write a review before submitting.",
        variant: "destructive"
      });
      return;
    }

    const newReview = {
      id: `review-${Date.now()}`,
      userId: user.email,
      userName: user.name || 'Anonymous',
      rating: review.rating,
      comment: review.comment,
      date: new Date().toISOString(),
      helpfulCount: 0
    };

    const storedReviews = localStorage.getItem('productReviews') || '{}';
    const allReviews = JSON.parse(storedReviews);
    const productKey = `part_${part.id}`;
    
    if (!allReviews[productKey]) {
      allReviews[productKey] = [];
    }
    
    allReviews[productKey].unshift(newReview);
    localStorage.setItem('productReviews', JSON.stringify(allReviews));
    
    setReview({ rating: 5, comment: '' });
    setRefreshReviews(prev => prev + 1);
    
    toast({
      title: "Review submitted",
      description: "Thank you for your feedback!",
    });
  };

  const galleryImages = [
    part.image,
    "https://images.unsplash.com/photo-1635073908681-644fcd6e5df0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1620726990664-aaef22b75c43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1605584272006-f9ba707d8bea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  ];

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-16">
        <Button variant="outline" className="mb-6" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-lg bg-gray-100 h-80">
              <img 
                src={activeImage} 
                alt={part.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {galleryImages.map((img, idx) => (
                <div 
                  key={idx} 
                  className={`h-20 rounded-md overflow-hidden cursor-pointer border-2 ${activeImage === img ? 'border-purple-500' : 'border-transparent'}`}
                  onClick={() => setActiveImage(img)}
                >
                  <img 
                    src={img} 
                    alt={`${part.name} view ${idx+1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{part.name}</h1>
              <div className="flex items-center mt-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= part.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm ml-2 text-muted-foreground">({part.rating}/5)</span>
              </div>
            </div>

            <p className="text-2xl font-bold text-purple-600"> ₹{part.price}</p>
            
            <div className="space-y-3">
              <p className="text-muted-foreground">{part.description}</p>
              
              <div className="grid grid-cols-2 gap-y-2">
                <div><span className="font-semibold">Brand:</span> {part.brand}</div>
                <div><span className="font-semibold">Category:</span> {part.category}</div>
                <div><span className="font-semibold">Availability:</span> 
                  <span className={part.inStock ? "text-green-600" : "text-red-600"}>
                    {part.inStock ? " In Stock" : " Out of Stock"}
                  </span>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Compatible with:</h3>
                <div className="flex flex-wrap gap-2">
                  {part.compatibility.map((brand: string) => (
                    <span key={brand} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      {brand.charAt(0).toUpperCase() + brand.slice(1)}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <Button 
              className="w-full bg-purple-600 hover:bg-purple-700"
              onClick={handleAddToCart}
              disabled={!part.inStock}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {part.inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="description">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="p-4">
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold mb-4">About this Product</h2>
              <p className="mb-4">{part.description}</p>
              <h3 className="text-xl font-bold mb-3">Features</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>High-quality materials and construction</li>
                <li>Direct bolt-on replacement for OEM parts</li>
                <li>Designed specifically for motorcycle performance</li>
                <li>Tested to ensure durability and reliability</li>
                <li>Includes all necessary hardware for installation</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="gallery" className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryImages.map((img, idx) => (
                <div key={idx} className="h-48 rounded-lg overflow-hidden">
                  <img 
                    src={img} 
                    alt={`${part.name} gallery image ${idx+1}`}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300 cursor-pointer"
                    onClick={() => setActiveImage(img)}
                  />
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="p-4">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
                <ReviewList 
                  productId={part.id} 
                  productType="part" 
                  refreshTrigger={refreshReviews} 
                />
              </div>
              
              {user ? (
                <div className="mt-8 border-t pt-8">
                  <h3 className="text-xl font-bold mb-4">Write a Review</h3>
                  <form onSubmit={handleSubmitReview}>
                    <div className="mb-4">
                      <label className="block mb-2">Your Rating</label>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReview({...review, rating: star})}
                            className="focus:outline-none"
                          >
                            <Star
                              className={`h-6 w-6 ${
                                star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="comment" className="block mb-2">Your Review</label>
                      <textarea
                        id="comment"
                        rows={5}
                        className="w-full rounded-md border border-gray-300 p-3"
                        placeholder="Share your experience with this product..."
                        value={review.comment}
                        onChange={(e) => setReview({...review, comment: e.target.value})}
                        required
                      />
                    </div>
                    <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                      Submit Review
                    </Button>
                  </form>
                </div>
              ) : (
                <div className="mt-8 border-t pt-8 text-center">
                  <p className="mb-4">Please sign in to leave a review.</p>
                  <Button asChild className="bg-purple-600 hover:bg-purple-700">
                    <a href="/sign-in">Sign In</a>
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </>
  );
};

export default PartDetail;
