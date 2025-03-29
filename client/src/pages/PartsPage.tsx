
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Search, ShoppingCart, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBrand } from '@/contexts/BrandContext';
import { brands } from '@/data/motorcycles';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchSuggestions from '@/components/SearchSuggestions';

type Part = {
  id: string;
  name: string;
  price: number;
  image: string;
  brand: string;
  category: string;
  compatibility: string[];
  description: string;
  rating: number;
  inStock: boolean;
};

// Sample parts data
const bikeParts: Part[] = [
  {
    id: "part-1",
    name: "Performance Air Filter",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1578188688082-7c079235d0e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    brand: "K&N",
    category: "Air Intake",
    compatibility: ["honda", "yamaha", "kawasaki"],
    description: "High-flow air filter for improved performance and throttle response.",
    rating: 4.8,
    inStock: true
  },
  {
    id: "part-2",
    name: "Racing Exhaust System",
    price: 649.99,
    image: "https://images.unsplash.com/photo-1594787317554-dcc17c53f741?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    brand: "Akrapovic",
    category: "Exhaust",
    compatibility: ["ducati", "bmw", "aprilia"],
    description: "Titanium racing exhaust system for maximum power gains and weight reduction.",
    rating: 4.9,
    inStock: true
  },
  {
    id: "part-3",
    name: "Chain and Sprocket Kit",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    brand: "DID",
    category: "Drivetrain",
    compatibility: ["honda", "yamaha", "suzuki", "kawasaki"],
    description: "Heavy-duty chain and sprocket kit for enhanced durability and performance.",
    rating: 4.7,
    inStock: true
  },
  {
    id: "part-4",
    name: "Brembo Front Brake Calipers",
    price: 799.99,
    image: "https://images.unsplash.com/photo-1615028456268-7be7b40c985f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    brand: "Brembo",
    category: "Brakes",
    compatibility: ["ducati", "bmw", "aprilia", "harley-davidson"],
    description: "High-performance front brake calipers for superior stopping power.",
    rating: 4.9,
    inStock: false
  },
  {
    id: "part-5",
    name: "Öhlins Rear Suspension",
    price: 1249.99,
    image: "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    brand: "Öhlins",
    category: "Suspension",
    compatibility: ["kawasaki", "bmw", "ducati"],
    description: "Premium rear shock absorber with adjustable compression and rebound.",
    rating: 4.8,
    inStock: true
  },
  {
    id: "part-6",
    name: "LED Headlight Kit",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1580341289255-5b47c98a59dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    brand: "Denali",
    category: "Electrical",
    compatibility: ["honda", "yamaha", "harley-davidson", "suzuki"],
    description: "Ultra-bright LED headlight conversion kit for improved visibility.",
    rating: 4.6,
    inStock: true
  },
  {
    id: "part-7",
    name: "Carbon Fiber Tank Cover",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1511310273127-7847afd95493?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    brand: "Puig",
    category: "Body",
    compatibility: ["kawasaki", "yamaha", "suzuki"],
    description: "Lightweight carbon fiber tank cover for enhanced aesthetics and protection.",
    rating: 4.5,
    inStock: true
  },
  {
    id: "part-8",
    name: "Quick Shifter",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1578474005126-89e0ac32725c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    brand: "Dynojet",
    category: "Electronics",
    compatibility: ["bmw", "ducati", "aprilia"],
    description: "Seamless clutchless shifting for faster, smoother gear changes.",
    rating: 4.7,
    inStock: true
  }
];

// Categories for filtering
const categories = [
  "All Categories",
  "Air Intake",
  "Exhaust",
  "Drivetrain",
  "Brakes",
  "Suspension",
  "Electrical",
  "Body",
  "Electronics"
];

const searchSuggestions = [
  "Helmets...",
  "Racing Suits...",
  "Gloves...",
  "Footwear...",
  "Protection...",
  "Electronics...",
  "Jackets...",
  "Pants..."
];

const PartsPage = () => {
  const { currentBrand, setCurrentBrand } = useBrand();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [filteredParts, setFilteredParts] = useState<Part[]>(bikeParts);
  const [selectedBrand, setSelectedBrand] = useState<string>(currentBrand?.id || "all-brands");
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);

  const primaryColor = currentBrand ? currentBrand.primaryColor : "#9b87f5";
  const lightPrimaryColor = `${primaryColor}15`;

  // Apply filters when dependencies change
  useEffect(() => {
    let filtered = bikeParts;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(part => 
        part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        part.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter(part => part.category === selectedCategory);
    }

    // Filter by brand compatibility
    if (selectedBrand && selectedBrand !== "all-brands") {
      filtered = filtered.filter(part => part.compatibility.includes(selectedBrand));
    }

    setFilteredParts(filtered);
  }, [searchQuery, selectedCategory, selectedBrand]);

  // Update brand when selection changes
  useEffect(() => {
    if (selectedBrand && selectedBrand !== "all-brands") {
      const brand = brands.find(b => b.id === selectedBrand);
      if (brand) {
        setCurrentBrand(brand);
      }
    }
  }, [selectedBrand, setCurrentBrand]);

  // Reset the brand if coming to this page directly
  useEffect(() => {
    if (currentBrand) {
      setSelectedBrand(currentBrand.id);
    }
  }, [currentBrand]);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      
      <div className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Motorcycle Parts & Accessories</h1>
            <p className="text-muted-foreground">
              Find premium quality parts for your motorcycle to enhance performance, style, and functionality.
            </p>
          </div>
          
          {/* Search and Filter Section */}
          <div className="bg-gray-50 rounded-xl p-6 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="col-span-1 md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search for"
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setShowSearchSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSearchSuggestions(false), 200)}
                  />
                  {showSearchSuggestions && searchQuery === "" && (
                    <SearchSuggestions 
                      suggestions={searchSuggestions} 
                      className="absolute left-[120px] top-1/2 -translate-y-1/2 text-gray-400"
                    />
                  )}
                </div>
              </div>
              
              {/* Brand Filter */}
              <div>
                <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-brands">All Brands</SelectItem>
                    {brands.map(brand => (
                      <SelectItem key={brand.id} value={brand.id}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Category Filter */}
              <div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {/* No parts message */}
          {filteredParts.length === 0 && (
            <div className="text-center py-12 border rounded-lg">
              <h3 className="text-xl font-medium mb-2">No parts found</h3>
              <p className="text-muted-foreground mb-4">
                Try changing your filters or search query
              </p>
              <Button onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All Categories");
                setSelectedBrand("all-brands");
              }}>
                Reset Filters
              </Button>
            </div>
          )}
          
          {/* Parts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredParts.map(part => (
              <div key={part.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={part.image} 
                    alt={part.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold">{part.name}</h3>
                    <span className="font-bold" style={{ color: primaryColor }}>${part.price}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 fill-current text-yellow-400" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground ml-1">{part.rating}/5</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 truncate">
                    {part.description}
                  </p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                      {part.category}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${part.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {part.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                  <Button 
                    className="w-full flex items-center justify-center gap-2"
                    style={{ backgroundColor: primaryColor }}
                    disabled={!part.inStock}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Compatibility Notice */}
          <div className="bg-white rounded-lg shadow-sm p-6 mt-12 border-t-4" style={{ borderTopColor: primaryColor }}>
            <h3 className="text-lg font-bold mb-2">Compatibility Guide</h3>
            <p className="text-muted-foreground mb-4">
              Please make sure to select the correct bike brand and model to ensure parts compatibility.
              If you're unsure about compatibility, contact our technical support team for assistance.
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {brands.map(brand => (
                <Button 
                  key={brand.id}
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedBrand(brand.id)}
                  className={selectedBrand === brand.id ? 'border-2' : ''}
                  style={selectedBrand === brand.id ? { borderColor: brand.primaryColor, color: brand.primaryColor } : {}}
                >
                  {brand.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PartsPage;
