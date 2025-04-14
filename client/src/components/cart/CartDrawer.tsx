
import React from 'react';
import { useCart, CartItem } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, X, Trash2, Plus, Minus } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const CartDrawer = () => {
  const { items, removeItem, updateQuantity, clearCart, itemCount, total } = useCart();

  const CartItemComponent = ({ item }: { item: CartItem }) => (
    <div className="flex items-center gap-4 py-4 border-b">
      <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
        <img 
          src={item.image} 
          alt={item.name} 
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex-1">
        <h4 className="font-medium">{item.name}</h4>
        <p className="text-sm text-muted-foreground"> ₹{item.price.toLocaleString()}</p>
      </div>
      <div className="flex items-center">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8 rounded-r-none"
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <div className="h-8 px-2 flex items-center border-y">
          {item.quantity}
        </div>
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8 rounded-l-none"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8 text-destructive"
        onClick={() => removeItem(item.id)}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col h-full w-full sm:max-w-md">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="flex justify-between items-center">
            Your Cart
            {items.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-destructive"
                onClick={clearCart}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex-grow overflow-auto py-4">
          {items.length > 0 ? (
            items.map(item => (
              <CartItemComponent key={item.id} item={item} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="font-medium text-lg">Your cart is empty</h3>
              <p className="text-muted-foreground">Explore our products and add some items to your cart.</p>
            </div>
          )}
        </div>
        
        {items.length > 0 && (
          <div className="border-t py-4 flex-shrink-0">
            <div className="flex justify-between text-lg font-medium mb-4">
              <span>Total</span>
              <span>${total.toLocaleString()}</span>
            </div>
            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              Checkout
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
