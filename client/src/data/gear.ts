
export type GearItem = {
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
  features: string[];
  sizes?: string[];
};

export const gearItems: GearItem[] = [
  {
    id: 1,
    name: "Pro Racing Helmet",
    price: "₹599",
    numericPrice: 599,
    rating: 4.9,
    description: "Aerodynamic racing helmet with advanced impact protection and ventilation. Features multi-density EPS liner, emergency release cheek pads, and anti-fog visor system. Meets or exceeds DOT and ECE 22.05 safety standards.",
    category: "Helmets",
    image: "https://images.unsplash.com/photo-1583227122027-d2d360c66d3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    brand: "Shoei",
    inStock: true,
    features: [
      "Lightweight composite shell",
      "Multiple air intakes and exhausts",
      "Integrated emergency quick-release system",
      "Anti-fog double lens visor",
      "Removable and washable liner"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 2,
    name: "Premium Leather Suit",
    price: "₹1,499",
    numericPrice: 1499,
    rating: 4.8,
    description: "Full body racing suit with CE-rated protection and stretch panels for comfort. Crafted from premium cowhide leather with strategically placed stretch panels for optimal fit and flexibility during aggressive riding positions.",
    category: "Racing Suits",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    brand: "Alpinestars",
    inStock: true,
    features: [
      "1.3mm premium cowhide leather construction",
      "CE level 2 armor at shoulders, elbows, and knees",
      "Aerodynamic speed hump",
      "Multiple stretch panels for mobility",
      "Perforated panels for ventilation"
    ],
    sizes: ["48", "50", "52", "54", "56", "58"]
  },
  {
    id: 3,
    name: "Touring Motorcycle Boots",
    price: "₹289",
    numericPrice: 289,
    rating: 4.7,
    description: "Waterproof touring boots with ankle protection and comfortable walking sole. Perfect for long-distance rides in various weather conditions.",
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    brand: "Dainese",
    inStock: true,
    features: [
      "Full-grain leather upper",
      "Gore-Tex waterproof membrane",
      "Impact-absorbing ankle protectors",
      "Reflective detailing for nighttime visibility",
      "Rubber sole with touring profile"
    ],
    sizes: ["39", "40", "41", "42", "43", "44", "45", "46"]
  },
  {
    id: 4,
    name: "All-Season Riding Jacket",
    price: "₹399",
    numericPrice: 399,
    rating: 4.8,
    description: "Versatile all-season riding jacket with removable thermal and waterproof liners. Equipped with CE-certified armor and multiple ventilation options.",
    category: "Jackets",
    image: "https://images.unsplash.com/photo-1551105204-3c8e3effb308?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    brand: "Klim",
    inStock: true,
    features: [
      "Abrasion-resistant cordura construction",
      "Removable waterproof liner",
      "CE level 2 armor at shoulders and elbows",
      "Adjustable ventilation panels",
      "3M reflective elements"
    ],
    sizes: ["S", "M", "L", "XL", "XXL", "3XL"]
  },
  {
    id: 5,
    name: "Racing Gloves",
    price: "₹159",
    numericPrice: 159,
    rating: 4.6,
    description: "Premium leather racing gloves with carbon fiber knuckle protection and palm sliders. Designed for track days and sport riding.",
    category: "Gloves",
    image: "https://images.unsplash.com/photo-1581175909806-8083f87cf312?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    brand: "Rev'it",
    inStock: true,
    features: [
      "Full-grain cowhide construction",
      "Carbon fiber knuckle protectors",
      "TPU palm sliders",
      "Finger bridge prevents finger roll",
      "Pre-curved fingers for reduced fatigue"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 6,
    name: "Bluetooth Communication System",
    price: "₹249",
    numericPrice: 249,
    rating: 4.9,
    description: "Advanced helmet-mounted communication system with Bluetooth connectivity, voice commands, and mesh intercom technology.",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1574715803946-087ade0f0c22?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    brand: "Sena",
    inStock: false,
    features: [
      "Bluetooth 5.0 technology",
      "Mesh intercom with 1-mile range",
      "Voice command activation",
      "Built-in FM radio",
      "13 hours talk time battery life"
    ]
  }
];

export const getGearItem = (id: string): GearItem | undefined => {
  return gearItems.find(g => g.id.toString() === id);
};
