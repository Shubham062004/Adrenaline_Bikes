import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ReviewFormProps {
  productId: string;
  productType: 'motorcycle' | 'part' | 'gear';
  onReviewSubmitted: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productId, productType, onReviewSubmitted }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to leave a review",
        variant: "destructive",
      });
      return;
    }
    
    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a rating before submitting",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call - in a real app, this would save to a database
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store in localStorage for demo purposes
      const storedReviews = localStorage.getItem('productReviews') || '{}';
      const reviews = JSON.parse(storedReviews);
      
      const productKey = `${productType}_${productId}`;
      if (!reviews[productKey]) {
        reviews[productKey] = [];
      }
      
      const newReview = {
        id: Date.now().toString(),
        userId: user.email,
        userName: user.name,
        rating,
        comment: review,
        date: new Date().toISOString(),
      };
      
      reviews[productKey].unshift(newReview);
      localStorage.setItem('productReviews', JSON.stringify(reviews));
      
      toast({
        title: "Review submitted",
        description: "Thank you for your feedback!",
      });
      
      setRating(0);
      setReview('');
      onReviewSubmitted();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="border p-4 rounded-lg text-center">
        <p className="mb-2">Please sign in to leave a review</p>
        <Button asChild>
          <Link to="/sign-in">Sign In</Link>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded-lg">
      <h3 className="text-lg font-medium mb-4">Write a Review</h3>
      
      <div className="mb-4">
        <label className="block mb-2">Your Rating</label>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="text-2xl focus:outline-none mr-1"
            >
              <Star
                className={`h-6 w-6 ${
                  (hoverRating || rating) >= star
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
      
      <div className="mb-4">
        <label htmlFor="review" className="block mb-2">
          Your Review
        </label>
        <Textarea
          id="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Share your experience with this product..."
          className="h-32"
        />
      </div>
      
      <Button type="submit" disabled={isSubmitting} className="bg-purple-600 hover:bg-purple-700">
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </Button>
    </form>
  );
};

export default ReviewForm;
