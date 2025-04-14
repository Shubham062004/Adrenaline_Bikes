import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ArrowLeft, Star, GitCompare } from 'lucide-react';
import { motorcycles } from '@/data/motorcycles';
import { useCart } from '@/contexts/CartContext';
import { useComparison } from '@/contexts/ComparisonContext';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ReviewList from '@/components/reviews/ReviewList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';

const MotorcycleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem: addToCart } = useCart();
  const { addItem: addToComparison, isInComparison } = useComparison();
  const { user } = useAuth();
  const [motorcycle, setMotorcycle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');
  const [review, setReview] = useState({ rating: 5, comment: '' });
  const [refreshReviews, setRefreshReviews] = useState(0);

  useEffect(() => {
    if (id) {
      const bike = motorcycles.find(m => m.id === id);
      if (bike) {
        setMotorcycle(bike);
        setActiveImage(bike.image);
      }
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-6 py-20 text-center">
          <p>Loading motorcycle details...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!motorcycle) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Motorcycle Not Found</h1>
          <p className="mb-6">The motorcycle you're looking for does not exist.</p>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
        <Footer />
      </>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: motorcycle.id,
      name: motorcycle.name,
      price: motorcycle.price,
      image: motorcycle.image,
      type: 'motorcycle'
    });
    toast({
      title: "Added to cart",
      description: `${motorcycle.name} has been added to your cart.`,
    });
  };

  const handleAddToComparison = () => {
    addToComparison(motorcycle);
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
    const productKey = `motorcycle_${motorcycle.id}`;
    
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
    motorcycle.image,
    "https://images.unsplash.com/photo-1558979158-65a1eaa08691?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1572025442646-866d16c84a54?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1547549082-6bc09f2049ae?auto=format&fit=crop&w=600&q=80"
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
                alt={motorcycle.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-5 gap-2">
              {galleryImages.map((img, idx) => (
                <div 
                  key={idx} 
                  className={`h-20 rounded-md overflow-hidden cursor-pointer border-2 ${activeImage === img ? 'border-purple-500' : 'border-transparent'}`}
                  onClick={() => setActiveImage(img)}
                >
                  <img 
                    src={img} 
                    alt={`${motorcycle.name} view ${idx+1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{motorcycle.name}</h1>
              <div className="flex items-center mt-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm ml-2 text-muted-foreground">(24 reviews)</span>
              </div>
            </div>

            <p className="text-2xl font-bold text-purple-600"> ₹{motorcycle.price.toLocaleString()}</p>
            
            <div className="space-y-3">
              <p className="text-muted-foreground">{motorcycle.description}</p>
              
              <div className="grid grid-cols-2 gap-y-2">
                <div><span className="font-semibold">Brand:</span> {motorcycle.brand}</div>
                <div><span className="font-semibold">Category:</span> {motorcycle.category}</div>
                <div><span className="font-semibold">Engine:</span> {motorcycle.engine}</div>
                <div><span className="font-semibold">Power:</span> {motorcycle.power}</div>
                <div><span className="font-semibold">Weight:</span> {motorcycle.weight}</div>
                <div><span className="font-semibold">Fuel:</span> {motorcycle.fuelCapacity}</div>
                <div><span className="font-semibold">Origin:</span> {motorcycle.origin}</div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button 
                className="flex-1 bg-purple-600 hover:bg-purple-700"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              
              <Button 
                variant={isInComparison(motorcycle.id) ? "default" : "outline"}
                className={isInComparison(motorcycle.id) ? "bg-purple-600 hover:bg-purple-700" : ""}
                onClick={handleAddToComparison}
                disabled={isInComparison(motorcycle.id)}
              >
                <GitCompare className="h-4 w-4 mr-2" />
                {isInComparison(motorcycle.id) ? "Added to Compare" : "Add to Compare"}
              </Button>
            </div>
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
              <h2 className="text-2xl font-bold mb-4">About the {motorcycle.name}</h2>
              <p className="mb-4">{motorcycle.description}</p>
              <h3 className="text-xl font-bold mb-3">Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Engine & Performance</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li><span className="font-medium">Engine:</span> {motorcycle.engine}</li>
                    <li><span className="font-medium">Power:</span> {motorcycle.power}</li>
                    <li><span className="font-medium">Torque:</span> 112 Nm @ 6000 rpm</li>
                    <li><span className="font-medium">Transmission:</span> 6-speed</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Dimensions & Weight</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li><span className="font-medium">Weight:</span> {motorcycle.weight}</li>
                    <li><span className="font-medium">Seat Height:</span> 825 mm</li>
                    <li><span className="font-medium">Wheelbase:</span> 1440 mm</li>
                    <li><span className="font-medium">Ground Clearance:</span> 135 mm</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="gallery" className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryImages.map((img, idx) => (
                <div key={idx} className="h-48 rounded-lg overflow-hidden">
                  <img 
                    src={img} 
                    alt={`${motorcycle.name} gallery image ${idx+1}`}
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
                  productId={motorcycle.id} 
                  productType="motorcycle" 
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
                        placeholder="Share your experience with this motorcycle..."
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

export default MotorcycleDetail;
