
import React from 'react';
import { useCart, CartItem } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const CartPage = () => {
  const { items, removeItem, updateQuantity, clearCart, total } = useCart();
  const navigate = useNavigate();

  const handleUpdateQuantity = (item: CartItem, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(item.id, newQuantity);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-20 min-h-[60vh]">
        <div className="flex justify-between items-center mb-8">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Your Shopping Cart</h1>
          {items.length > 0 && (
            <Button variant="outline" className="text-destructive" onClick={clearCart}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Cart
            </Button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <div className="flex justify-center mb-4">
              <ShoppingCart className="h-16 w-16 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button className="bg-purple-600 hover:bg-purple-700" asChild>
              <Link to="/brands">Browse Motorcycles</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold">Cart Items ({items.length})</h2>
                </div>

                {items.map((item) => (
                  <div key={item.id} className="p-6 border-b flex items-center gap-4">
                    <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-purple-600 font-semibold"> ₹{item.price.toLocaleString()}</p>
                      <div className="text-sm text-muted-foreground">
                        Type: {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </div>
                    </div>
                    <div className="flex items-center border rounded-md">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 rounded-r-none"
                        onClick={() => handleUpdateQuantity(item, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <div className="w-10 text-center">{item.quantity}</div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 rounded-l-none"
                        onClick={() => handleUpdateQuantity(item, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-destructive h-8 w-8"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden h-fit">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">Order Summary</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="border-t pt-4 mt-4 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toLocaleString()}</span>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 mt-6">
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
