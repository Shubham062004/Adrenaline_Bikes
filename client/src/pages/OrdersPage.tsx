
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, Calendar, Clock, Search, ChevronRight, ShoppingBag } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getMockOrders, Order, OrderStatus } from '@/data/orders';

const OrdersPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all');
  
  if (!user) {
    navigate('/sign-in');
    return null;
  }
  
  const orders = getMockOrders(user.email);
  
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const filteredOrders = orders.filter(order => {
    const matchesSearch = searchTerm.trim() === '' || 
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || order.status === filter;
    return matchesSearch && matchesFilter;
  });
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleViewOrderDetails = (orderId: string) => {
    // In a real app, this would navigate to order detail page
    // For now, we'll just log it
    console.log(`Viewing order: ${orderId}`);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">My Orders</h1>
            <Button asChild className="bg-purple-600 hover:bg-purple-700">
              <a href="/parts">Continue Shopping</a>
            </Button>
          </div>
          
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search by order ID" 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Tabs 
                defaultValue="all" 
                className="w-full md:w-auto"
                onValueChange={(value) => setFilter(value as OrderStatus | 'all')}
              >
                <TabsList className="grid grid-cols-4 md:grid-cols-5 w-full md:w-auto">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="processing">Processing</TabsTrigger>
                  <TabsTrigger value="shipped">Shipped</TabsTrigger>
                  <TabsTrigger value="delivered">Delivered</TabsTrigger>
                  <TabsTrigger value="cancelled" className="hidden md:block">Cancelled</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            {filteredOrders.length === 0 ? (
              <Card className="text-center py-16">
                <CardContent>
                  <div className="flex flex-col items-center">
                    <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium mb-2">No Orders Found</h3>
                    <p className="text-muted-foreground mb-6">
                      {searchTerm.trim() !== '' || filter !== 'all' ? 
                        "No orders match your search criteria. Try adjusting your filters." : 
                        "You haven't placed any orders yet."}
                    </p>
                    <Button asChild className="bg-purple-600 hover:bg-purple-700">
                      <a href="/motorcycles">Start Shopping</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {filteredOrders.map((order) => (
                  <Card key={order.id} className="overflow-hidden">
                    <CardHeader className="bg-gray-50 py-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <CardTitle className="text-lg flex items-center">
                            <span>Order {order.id}</span>
                            <Badge className={`ml-3 ${getStatusColor(order.status)}`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </Badge>
                          </CardTitle>
                          <CardDescription className="flex flex-col md:flex-row md:items-center mt-1 gap-2 md:gap-6">
                            <span className="flex items-center">
                              <Calendar className="h-3.5 w-3.5 mr-1.5" />
                              {formatDate(order.date)}
                            </span>
                            {order.trackingNumber && (
                              <span className="flex items-center">
                                <Package className="h-3.5 w-3.5 mr-1.5" />
                                Tracking: {order.trackingNumber}
                              </span>
                            )}
                          </CardDescription>
                        </div>
                        <div className="flex items-center justify-between md:justify-end gap-4">
                          <div className="text-right">
                            <div className="text-sm font-medium">${order.total.toFixed(2)}</div>
                            <div className="text-xs text-muted-foreground">{order.items.length} {order.items.length === 1 ? 'item' : 'items'}</div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleViewOrderDetails(order.id)}
                          >
                            <ChevronRight className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-0">
                      <div className="divide-y">
                        {order.items.slice(0, 2).map((item) => (
                          <div key={item.id} className="flex items-center p-4 gap-4">
                            <div className="h-16 w-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium truncate">{item.name}</h4>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <span>Qty: {item.quantity}</span>
                                <span className="mx-2">•</span>
                                <span> ₹{item.price.toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {order.items.length > 2 && (
                          <div className="p-4 text-center text-sm">
                            <Button 
                              variant="link" 
                              className="text-purple-600 hover:text-purple-700"
                              onClick={() => handleViewOrderDetails(order.id)}
                            >
                              +{order.items.length - 2} more items
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrdersPage;
