
export type WishlistItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  type: 'motorcycle' | 'part' | 'gear';
  addedAt: string;
};

// Mock wishlist data
export const getMockWishlist = (userEmail: string): WishlistItem[] => {
  return [
    {
      id: 'bike-6',
      name: 'BMW R 1250 GS',
      price: 17500,
      image: 'https://images.unsplash.com/photo-1691527203880-c1d9334c5d98?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      type: 'motorcycle',
      addedAt: '2023-12-10T11:30:00Z'
    },
    {
      id: 'bike-5',
      name: 'Ducati Monster',
      price: 11000,
      image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      type: 'motorcycle',
      addedAt: '2023-12-15T14:20:00Z'
    },
    {
      id: 'part-2',
      name: 'Racing Exhaust System',
      price: 649.99,
      image: 'https://images.unsplash.com/photo-1594787317554-dcc17c53f741?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      type: 'part',
      addedAt: '2023-12-20T09:45:00Z'
    },
    {
      id: '2',
      name: 'Premium Leather Suit',
      price: 1499,
      image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      type: 'gear',
      addedAt: '2024-01-05T16:10:00Z'
    }
  ];
};
