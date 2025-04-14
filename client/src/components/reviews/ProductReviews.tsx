
import React, { useState } from 'react';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProductReviewsProps {
  productId: string;
  productType: 'motorcycle' | 'part' | 'gear';
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId, productType }) => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleReviewSubmitted = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
      
      <Tabs defaultValue="reviews">
        <TabsList className="mb-4">
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="write">Write a Review</TabsTrigger>
        </TabsList>
        
        <TabsContent value="reviews">
          <ReviewList 
            productId={productId} 
            productType={productType} 
            refreshTrigger={refreshTrigger}
          />
        </TabsContent>
        
        <TabsContent value="write">
          <ReviewForm 
            productId={productId} 
            productType={productType} 
            onReviewSubmitted={handleReviewSubmitted}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductReviews;
