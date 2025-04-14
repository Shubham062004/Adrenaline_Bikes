
export type Part = {
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

export const parts: Part[] = [
  {
    id: "part-1",
    name: "Performance Air Filter",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1578188688082-7c079235d0e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    brand: "K&N",
    category: "Air Intake",
    compatibility: ["honda", "yamaha", "kawasaki"],
    description: "High-flow air filter for improved performance and throttle response. Designed to increase horsepower while providing excellent filtration. Washable and reusable design for long service life and reduced maintenance costs.",
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
    description: "Titanium racing exhaust system for maximum power gains and weight reduction. Handcrafted from high-grade titanium with carbon fiber endcaps. Includes removable dB killer for track days.",
    rating: 4.9,
    inStock: true
  },
  {
    id: "part-3",
    name: "LED Headlight Conversion Kit",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1605584272006-f9ba707d8bea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    brand: "JW Speaker",
    category: "Lighting",
    compatibility: ["honda", "yamaha", "suzuki", "kawasaki", "harley-davidson"],
    description: "Upgrade your visibility with this plug-and-play LED headlight conversion. 300% brighter than stock with pure white light pattern for improved night riding safety.",
    rating: 4.7,
    inStock: true
  },
  {
    id: "part-4",
    name: "Performance Brake Pads",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1617952486237-647887708e70?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    brand: "Brembo",
    category: "Brakes",
    compatibility: ["honda", "yamaha", "suzuki", "kawasaki", "ducati", "bmw"],
    description: "High-performance sintered brake pads for improved stopping power and fade resistance. Ideal for sport riding and track days while maintaining good street manners.",
    rating: 4.9,
    inStock: true
  },
  {
    id: "part-5",
    name: "Quick Shifter Kit",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1620726990664-aaef22b75c43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    brand: "Dynojet",
    category: "Electronics",
    compatibility: ["yamaha", "kawasaki", "suzuki", "bmw"],
    description: "Clutchless up and down shifting for faster lap times and smoother riding experience. Easy installation with plug-and-play harness designed specifically for your motorcycle model.",
    rating: 4.6,
    inStock: true
  },
  {
    id: "part-6",
    name: "Chain and Sprocket Kit",
    price: 189.99,
    image: "https://images.unsplash.com/photo-1635073908681-644fcd6e5df0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    brand: "DID",
    category: "Drivetrain",
    compatibility: ["honda", "yamaha", "suzuki", "kawasaki"],
    description: "Complete kit including high-strength chain and lightweight sprockets. Offers improved acceleration and durability compared to stock components. Available in various gearing ratios.",
    rating: 4.8,
    inStock: false
  }
];

export const getPart = (id: string): Part | undefined => {
  return parts.find(p => p.id === id);
};
