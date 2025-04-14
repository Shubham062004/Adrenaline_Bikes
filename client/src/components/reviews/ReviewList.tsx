
import React, { useEffect, useState } from 'react';
import { Star, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpfulCount?: number;
  userVoted?: boolean;
}

interface ReviewListProps {
  productId: string;
  productType: 'motorcycle' | 'part' | 'gear';
  refreshTrigger?: number;
}

const ReviewList: React.FC<ReviewListProps> = ({ productId, productType, refreshTrigger = 0 }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    // Load reviews from localStorage
    const loadReviews = () => {
      const storedReviews = localStorage.getItem('productReviews') || '{}';
      const allReviews = JSON.parse(storedReviews);
      
      const productKey = `${productType}_${productId}`;
      const productReviews = allReviews[productKey] || [];
      
      // Load helpful votes
      const storedVotes = localStorage.getItem('helpfulVotes') || '{}';
      const votes = JSON.parse(storedVotes);
      
      const reviewsWithVotes = productReviews.map((review: Review) => {
        return {
          ...review,
          helpfulCount: votes[review.id] ? Object.keys(votes[review.id]).length : 0,
          userVoted: user && votes[review.id] ? !!votes[review.id][user.email] : false,
        };
      });
      
      setReviews(reviewsWithVotes);
      setLoading(false);
    };
    
    loadReviews();
  }, [productId, productType, refreshTrigger, user]);

  const handleHelpful = (reviewId: string) => {
    if (!user) return;
    
    // Update localStorage
    const storedVotes = localStorage.getItem('helpfulVotes') || '{}';
    const votes = JSON.parse(storedVotes);
    
    if (!votes[reviewId]) {
      votes[reviewId] = {};
    }
    
    const userVoted = !!votes[reviewId][user.email];
    
    if (userVoted) {
      delete votes[reviewId][user.email];
    } else {
      votes[reviewId][user.email] = true;
    }
    
    localStorage.setItem('helpfulVotes', JSON.stringify(votes));
    
    // Update state
    setReviews(prevReviews => 
      prevReviews.map(review => {
        if (review.id === reviewId) {
          return {
            ...review,
            helpfulCount: userVoted 
              ? (review.helpfulCount || 0) - 1 
              : (review.helpfulCount || 0) + 1,
            userVoted: !userVoted
          };
        }
        return review;
      })
    );
  };

  if (loading) {
    return <div className="py-4">Loading reviews...</div>;
  }

  if (reviews.length === 0) {
    return <div className="py-4 text-center text-muted-foreground">No reviews yet. Be the first to leave a review!</div>;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="border rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center mb-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      review.rating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <h4 className="font-medium">{review.userName}</h4>
              <div className="text-xs text-muted-foreground mb-2">
                {formatDate(review.date)}
              </div>
            </div>
          </div>
          
          <p className="my-2">{review.comment}</p>
          
          <div className="flex items-center justify-end mt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleHelpful(review.id)}
              disabled={!user}
              className={`text-xs ${review.userVoted ? 'text-primary' : ''}`}
            >
              <ThumbsUp className={`h-3 w-3 mr-1 ${review.userVoted ? 'fill-primary' : ''}`} />
              Helpful ({review.helpfulCount || 0})
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
