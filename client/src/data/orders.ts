
export type OrderStatus = 'processing' | 'shipped' | 'delivered' | 'cancelled';

export type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  type: 'motorcycle' | 'part' | 'gear';
};

export type Order = {
  id: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: OrderItem[];
  trackingNumber?: string;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  paymentMethod: {
    type: 'credit_card' | 'paypal';
    last4?: string;
  };
};

// Mock user orders data
export const getMockOrders = (userEmail: string): Order[] => {
  return [
    {
      id: 'ORD-12345',
      date: '2023-11-15T10:30:00Z',
      status: 'delivered',
      total: 8599.99,
      items: [
        {
          id: 'bike-2',
          name: 'Yamaha MT-07',
          price: 7500,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1577438802465-8c8f71cc1312?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
          type: 'motorcycle'
        },
        {
          id: 'part-1',
          name: 'Performance Air Filter',
          price: 89.99,
          quantity: 2,
          image: 'https://images.unsplash.com/photo-1578188688082-7c079235d0e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
          type: 'part'
        },
        {
          id: '5',
          name: 'Racing Gloves - Size L',
          price: 159,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1581175909806-8083f87cf312?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
          type: 'gear'
        }
      ],
      trackingNumber: 'TRK783940284',
      shippingAddress: {
        name: 'John Doe',
        street: '123 Main St',
        city: 'San Francisco',
        state: 'CA',
        zip: '94105',
        country: 'USA'
      },
      paymentMethod: {
        type: 'credit_card',
        last4: '4242'
      }
    },
    {
      id: 'ORD-67890',
      date: '2023-12-05T14:45:00Z',
      status: 'shipped',
      total: 1779.98,
      items: [
        {
          id: 'part-2',
          name: 'Racing Exhaust System',
          price: 649.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1594787317554-dcc17c53f741?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
          type: 'part'
        },
        {
          id: '1',
          name: 'Pro Racing Helmet - Size M',
          price: 599,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1583227122027-d2d360c66d3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
          type: 'gear'
        },
        {
          id: 'part-5',
          name: 'Quick Shifter Kit',
          price: 299.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1620726990664-aaef22b75c43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
          type: 'part'
        }
      ],
      trackingNumber: 'TRK492750173',
      shippingAddress: {
        name: 'John Doe',
        street: '123 Main St',
        city: 'San Francisco',
        state: 'CA',
        zip: '94105',
        country: 'USA'
      },
      paymentMethod: {
        type: 'paypal'
      }
    },
    {
      id: 'ORD-23456',
      date: '2024-01-20T09:15:00Z',
      status: 'processing',
      total: 289,
      items: [
        {
          id: '3',
          name: 'Touring Motorcycle Boots - Size 43',
          price: 289,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
          type: 'gear'
        }
      ],
      shippingAddress: {
        name: 'John Doe',
        street: '123 Main St',
        city: 'San Francisco',
        state: 'CA',
        zip: '94105',
        country: 'USA'
      },
      paymentMethod: {
        type: 'credit_card',
        last4: '1234'
      }
    }
  ];
};
