
import React, { useState, useEffect } from 'react';
import { Filter, ShoppingCart, Search, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBrand } from '@/contexts/BrandContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchSuggestions from '@/components/SearchSuggestions';

type GearItem = {
  id: number;
  name: string;
  price: string;
  numericPrice: number;
  rating: number;
  description: string;
  category: string;
  image: string;
  brand: string;
  inStock: boolean;
};

const gearItems: GearItem[] = [
  {
    id: 1,
    name: "Pro Racing Helmet",
    price: "$599",
    numericPrice: 599,
    rating: 4.9,
    description: "Aerodynamic racing helmet with advanced impact protection and ventilation.",
    category: "Helmets",
    image: "https://images.unsplash.com/photo-1583227122027-d2d360c66d3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    brand: "Shoei",
    inStock: true
  },
  {
    id: 2,
    name: "Premium Leather Suit",
    price: "$1,499",
    numericPrice: 1499,
    rating: 4.8,
    description: "Full body racing suit with CE-rated protection and stretch panels for comfort.",
    category: "Racing Suits",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    brand: "Alpinestars",
    inStock: true
  },
  {
    id: 3,
    name: "Carbon Racing Gloves",
    price: "$199",
    numericPrice: 199,
    rating: 4.7,
    description: "Kangaroo leather racing gloves with carbon fiber protection and touchscreen compatibility.",
    category: "Gloves",
    image: "https://images.unsplash.com/photo-1603811413088-8f37698308f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    brand: "Dainese",
    inStock: true
  },
  {
    id: 4,
    name: "Track Racing Boots",
    price: "$349",
    numericPrice: 349,
    rating: 4.8,
    description: "Professional racing boots with replaceable toe sliders and ankle protection.",
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1581175909806-8083f87cf312?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    brand: "Sidi",
    inStock: true
  },
  {
    id: 5,
    name: "CE-Certified Back Protector",
    price: "$149",
    numericPrice: 149,
    rating: 4.9,
    description: "Level 2 CE-certified back protector with multi-layer impact absorption technology.",
    category: "Protection",
    image: "https://images.unsplash.com/photo-1570437226579-5c1f6e48e2c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    brand: "REV'IT!",
    inStock: true
  },
  {
    id: 6,
    name: "Bluetooth Communication System",
    price: "$299",
    numericPrice: 299,
    rating: 4.7,
    description: "Helmet intercom system with 4-way communication, smartphone connectivity, and FM radio.",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    brand: "Cardo",
    inStock: false
  },
  {
    id: 7,
    name: "Waterproof Touring Jacket",
    price: "$429",
    numericPrice: 429,
    rating: 4.6,
    description: "All-season touring jacket with removable thermal liner and waterproof membrane.",
    category: "Jackets",
    image: "https://images.unsplash.com/photo-1551105204-3c8e3effb308?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    brand: "Klim",
    inStock: true
  },
  {
    id: 8,
    name: "Kevlar Riding Jeans",
    price: "$189",
    numericPrice: 189,
    rating: 4.5,
    description: "Stylish jeans with Kevlar lining and removable CE armor for urban riding.",
    category: "Pants",
    image: "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    brand: "Rokker",
    inStock: true
  }
];

// Categories for filtering
const categories = [
  "All Categories",
  "Helmets",
  "Racing Suits",
  "Gloves",
  "Footwear",
  "Protection",
  "Electronics",
  "Jackets",
  "Pants"
];

// Price ranges for filtering
const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under $100", min: 0, max: 100 },
  { label: "$100 - $250", min: 100, max: 250 },
  { label: "$250 - $500", min: 250, max: 500 },
  { label: "Over $500", min: 500, max: Infinity }
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

const GearPage = () => {
  const { currentBrand } = useBrand();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All Prices");
  const [filteredGear, setFilteredGear] = useState<GearItem[]>(gearItems);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  
  const primaryColor = currentBrand ? currentBrand.primaryColor : "#9b87f5";
  const lightPrimaryColor = `${primaryColor}15`;

  // Apply filters when dependencies change
  useEffect(() => {
    let filtered = gearItems;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Filter by price range
    const priceRange = priceRanges.find(range => range.label === selectedPriceRange);
    if (priceRange && selectedPriceRange !== "All Prices") {
      filtered = filtered.filter(item => 
        item.numericPrice >= priceRange.min && item.numericPrice <= priceRange.max
      );
    }

    setFilteredGear(filtered);
  }, [searchQuery, selectedCategory, selectedPriceRange]);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      
      <div className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Motorcycle Gear & Apparel</h1>
            <p className="text-muted-foreground">
              Discover our premium selection of motorcycle gear designed for comfort, protection, and style.
            </p>
          </div>
          
          {/* Search and Filters */}
          <div className="bg-gray-50 rounded-xl p-6 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div>
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
              
              {/* Price Range Filter */}
              <div>
                <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    {priceRanges.map(range => (
                      <SelectItem key={range.label} value={range.label}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {/* No gear message */}
          {filteredGear.length === 0 && (
            <div className="text-center py-12 border rounded-lg">
              <h3 className="text-xl font-medium mb-2">No gear found</h3>
              <p className="text-muted-foreground mb-4">
                Try changing your filters or search query
              </p>
              <Button onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All Categories");
                setSelectedPriceRange("All Prices");
              }}>
                Reset Filters
              </Button>
            </div>
          )}
          
          {/* Gear Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredGear.map(item => (
              <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                  <div 
                    className="absolute top-3 left-3 text-white px-2 py-1 text-xs rounded-full" 
                    style={{ backgroundColor: primaryColor }}
                  >
                    {item.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <span className="font-bold" style={{ color: primaryColor }}>{item.price}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground ml-1">{item.rating}/5</span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-2">{item.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs text-muted-foreground">{item.brand}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${item.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {item.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                  <Button 
                    className="w-full flex items-center justify-center gap-2 text-white"
                    style={{ backgroundColor: primaryColor }}
                    disabled={!item.inStock}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Safety Information */}
          <div className="mt-16 bg-white p-8 rounded-xl shadow-sm border-t-4" style={{ borderTopColor: primaryColor }}>
            <h2 className="text-2xl font-bold mb-4">Gear Safety Information</h2>
            <p className="mb-4 text-muted-foreground">
              Proper motorcycle gear is essential for your safety on the road. All protective gear sold on our website meets or exceeds safety standards.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-bold mb-2" style={{ color: primaryColor }}>Helmet Standards</h3>
                <p className="text-sm text-muted-foreground">Our helmets meet DOT, ECE 22.05, and Snell certifications, ensuring maximum protection in case of impact.</p>
              </div>
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-bold mb-2" style={{ color: primaryColor }}>Protective Clothing</h3>
                <p className="text-sm text-muted-foreground">All jackets and pants feature CE-rated armor at impact zones and abrasion-resistant materials.</p>
              </div>
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-bold mb-2" style={{ color: primaryColor }}>Size Guide</h3>
                <p className="text-sm text-muted-foreground">Properly sized gear is crucial for comfort and protection. Check our detailed size guide before purchase.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default GearPage;
