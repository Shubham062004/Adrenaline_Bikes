
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BrandProvider } from "@/contexts/BrandContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { ComparisonProvider } from "@/contexts/ComparisonContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import BrandsPage from "./pages/BrandsPage";
import BrandPage from "./pages/BrandPage";
import PartsPage from "./pages/PartsPage";
import GearPage from "./pages/GearPage";
import ComparePage from "./pages/ComparePage";
import CartPage from "./pages/CartPage";
import MotorcycleDetail from "./pages/MotorcycleDetail";
import PartDetail from "./pages/PartDetail";
import GearDetail from "./pages/GearDetail";
import ProfilePage from "./pages/ProfilePage";
import OrdersPage from "./pages/OrdersPage";
import WishlistPage from "./pages/WishlistPage";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import NotFound from "./pages/NotFound";

// Create a client with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <BrandProvider>
            <CartProvider>
              <ComparisonProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/brands" element={<BrandsPage />} />
                    <Route path="/brands/:brandId" element={<BrandPage />} />
                    <Route path="/parts" element={<PartsPage />} />
                    <Route path="/gear" element={<GearPage />} />
                    <Route path="/compare" element={<ComparePage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/motorcycle/:id" element={<MotorcycleDetail />} />
                    <Route path="/part/:id" element={<PartDetail />} />
                    <Route path="/gear/:id" element={<GearDetail />} />
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    {/* Protected routes */}
                    <Route path="/profile" element={
                      <ProtectedRoute>
                        <ProfilePage />
                      </ProtectedRoute>
                    } />
                    <Route path="/orders" element={
                      <ProtectedRoute>
                        <OrdersPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/wishlist" element={
                      <ProtectedRoute>
                        <WishlistPage />
                      </ProtectedRoute>
                    } />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </ComparisonProvider>
            </CartProvider>
          </BrandProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
