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

const getGearItem = (id: string) => {
  const gearItems = [
    {
      id: 1,
      name: "Pro Racing Helmet",
      price: "$599",
      numericPrice: 599,
      rating: 4.9,
      description: "Aerodynamic racing helmet with advanced impact protection and ventilation. Features multi-density EPS liner, emergency release cheek pads, and anti-fog visor system. Meets or exceeds DOT and ECE 22.05 safety standards.",
      category: "Helmets",
      image: "https://images.unsplash.com/photo-1583227122027-d2d360c66d3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      brand: "Shoei",
      inStock: true,
      features: [
        "Lightweight composite shell",
        "Multiple air intakes and exhausts",
        "Integrated emergency quick-release system",
        "Anti-fog double lens visor",
        "Removable and washable liner"
      ],
      sizes: ["S", "M", "L", "XL", "XXL"]
    },
    {
      id: 2,
      name: "Premium Leather Suit",
      price: "$1,499",
      numericPrice: 1499,
      rating: 4.8,
      description: "Full body racing suit with CE-rated protection and stretch panels for comfort. Crafted from premium cowhide leather with strategically placed stretch panels for optimal fit and flexibility during aggressive riding positions.",
      category: "Racing Suits",
      image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      brand: "Alpinestars",
      inStock: true,
      features: [
        "1.3mm premium cowhide leather construction",
        "CE level 2 armor at shoulders, elbows, and knees",
        "Aerodynamic speed hump",
        "Multiple stretch panels for mobility",
        "Perforated panels for ventilation"
      ],
      sizes: ["48", "50", "52", "54", "56", "58"]
    },
  ];
  
  return gearItems.find(g => g.id.toString() === id);
};

const GearDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { user } = useAuth();
  const [gear, setGear] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');
  const [review, setReview] = useState({ rating: 5, comment: '' });
  const [refreshReviews, setRefreshReviews] = useState(0);

  useEffect(() => {
    if (id) {
      const foundGear = getGearItem(id);
      if (foundGear) {
        setGear(foundGear);
        setActiveImage(foundGear.image);
        if (foundGear.sizes && foundGear.sizes.length > 0) {
          setSelectedSize(foundGear.sizes[0]);
        }
      }
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-6 py-20 text-center">
          <p>Loading gear details...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!gear) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Gear Not Found</h1>
          <p className="mb-6">The gear item you're looking for does not exist.</p>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
        <Footer />
      </>
    );
  }

  const handleAddToCart = () => {
    if (gear.sizes && gear.sizes.length > 0 && !selectedSize) {
      toast({
        title: "Size required",
        description: "Please select a size before adding to cart.",
        variant: "destructive"
      });
      return;
    }

    addItem({
      id: gear.id.toString(),
      name: selectedSize ? `${gear.name} - Size ${selectedSize}` : gear.name,
      price: gear.numericPrice,
      image: gear.image,
      type: 'gear'
    });
    toast({
      title: "Added to cart",
      description: `${gear.name} has been added to your cart.`,
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
    const productKey = `gear_${gear.id}`;
    
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
    gear.image,
    "https://images.unsplash.com/photo-1551105204-3c8e3effb308?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1581175909806-8083f87cf312?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
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
                alt={gear.name} 
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
                    alt={`${gear.name} view ${idx+1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{gear.name}</h1>
              <div className="flex items-center mt-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= gear.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm ml-2 text-muted-foreground">({gear.rating}/5)</span>
              </div>
            </div>

            <p className="text-2xl font-bold text-purple-600">{gear.price}</p>
            
            <div className="space-y-3">
              <p className="text-muted-foreground">{gear.description}</p>
              
              <div className="grid grid-cols-2 gap-y-2">
                <div><span className="font-semibold">Brand:</span> {gear.brand}</div>
                <div><span className="font-semibold">Category:</span> {gear.category}</div>
                <div><span className="font-semibold">Availability:</span> 
                  <span className={gear.inStock ? "text-green-600" : "text-red-600"}>
                    {gear.inStock ? " In Stock" : " Out of Stock"}
                  </span>
                </div>
              </div>
              
              {gear.sizes && (
                <div className="space-y-2">
                  <h3 className="font-semibold">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {gear.sizes.map((size: string) => (
                      <button
                        key={size}
                        type="button"
                        className={`px-4 py-2 border rounded-md ${
                          selectedSize === size 
                            ? 'border-purple-600 bg-purple-50 text-purple-600' 
                            : 'border-gray-300 hover:border-purple-600'
                        }`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Button 
              className="w-full bg-purple-600 hover:bg-purple-700"
              onClick={handleAddToCart}
              disabled={!gear.inStock}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {gear.inStock ? "Add to Cart" : "Out of Stock"}
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
              <p className="mb-4">{gear.description}</p>
              <h3 className="text-xl font-bold mb-3">Features</h3>
              <ul className="list-disc list-inside space-y-2">
                {gear.features ? (
                  gear.features.map((feature: string, idx: number) => (
                    <li key={idx}>{feature}</li>
                  ))
                ) : (
                  <>
                    <li>High-quality materials and construction</li>
                    <li>Designed for motorcycle riders</li>
                    <li>Comfortable fit and feel</li>
                    <li>Durable and long-lasting</li>
                  </>
                )}
              </ul>
              
              <h3 className="text-xl font-bold my-3">Care Instructions</h3>
              <p>
                Please refer to the product label for specific care instructions. 
                Generally, we recommend hand washing or gentle machine washing with 
                similar colors. Do not bleach. Line dry or tumble dry on low heat.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="gallery" className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryImages.map((img, idx) => (
                <div key={idx} className="h-48 rounded-lg overflow-hidden">
                  <img 
                    src={img} 
                    alt={`${gear.name} gallery image ${idx+1}`}
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
                  productId={gear.id.toString()} 
                  productType="gear" 
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

export default GearDetail;
