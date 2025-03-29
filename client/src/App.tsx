import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BrandProvider } from "@/contexts/BrandContext";
import HomePage from "./pages/HomePage";
import BrandsPage from "./pages/BrandsPage";
import BrandPage from "./pages/BrandPage";
import PartsPage from "./pages/PartsPage";
import GearPage from "./pages/GearPage";
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
        <BrandProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/brands" element={<BrandsPage />} />
              <Route path="/brands/:brandId" element={<BrandPage />} />
              <Route path="/parts" element={<PartsPage />} />
              <Route path="/gear" element={<GearPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </BrandProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
