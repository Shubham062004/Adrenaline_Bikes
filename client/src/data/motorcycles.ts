
export type Motorcycle = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  engine: string;
  power: string;
  weight: string;
  fuelCapacity: string;
  description: string;
  origin: string;
  brand: string;
};

export type Brand = {
  id: string;
  name: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  description: string;
};

export const brands: Brand[] = [
  {
    id: "honda",
    name: "Honda",
    logo: "https://images.unsplash.com/photo-1648826568518-8281d2325bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    primaryColor: "#e12c2c",
    secondaryColor: "#f0f0f0",
    description: "Known for reliability and innovation, Honda offers a diverse range of motorcycles from commuters to high-performance bikes."
  },
  {
    id: "yamaha",
    name: "Yamaha",
    logo: "https://images.unsplash.com/photo-1648826568391-0bfba667e54c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    primaryColor: "#1a17a0",
    secondaryColor: "#0077c8",
    description: "Yamaha combines cutting-edge technology with exceptional performance in their diverse motorcycle lineup."
  },
  {
    id: "kawasaki",
    name: "Kawasaki",
    logo: "https://images.unsplash.com/photo-1601313689738-13c89505b20a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    primaryColor: "#00B259",
    secondaryColor: "#1A1A1A",
    description: "Kawasaki motorcycles feature distinctive styling and powerful engines, known for their performance and aggressive designs."
  },
  {
    id: "suzuki",
    name: "Suzuki",
    logo: "https://images.unsplash.com/photo-1619257533916-c2483fdcc7bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    primaryColor: "#003399",
    secondaryColor: "#ff0000",
    description: "Suzuki produces a wide range of motorcycles known for their reliability, performance, and value."
  },
  {
    id: "ducati",
    name: "Ducati",
    logo: "https://images.unsplash.com/photo-1561211974-8a2808c1a57f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    primaryColor: "#E7222E",
    secondaryColor: "#000000",
    description: "Italian excellence in motorcycle design, Ducati is known for premium sports bikes with distinctive styling and performance."
  },
  {
    id: "bmw",
    name: "BMW",
    logo: "https://images.unsplash.com/photo-1617952486237-647887708e70?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    primaryColor: "#16588E",
    secondaryColor: "#81C4FF",
    description: "BMW Motorrad combines German engineering with innovative technology to create premium motorcycles for all riding styles."
  },
  {
    id: "harley-davidson",
    name: "Harley-Davidson",
    logo: "https://images.unsplash.com/photo-1608505256265-b9a241ad666a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    primaryColor: "#f47920",
    secondaryColor: "#000000",
    description: "American icon known for custom, cruiser, and touring motorcycles with a distinctive sound and loyal following."
  },
  {
    id: "aprilia",
    name: "Aprilia",
    logo: "https://images.unsplash.com/photo-1664575599736-c5197c684172?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    primaryColor: "#000000",
    secondaryColor: "#c80815",
    description: "Italian brand known for high-performance sportbikes and racing pedigree with cutting-edge technology."
  }
];

export const motorcycles: Motorcycle[] = [
  {
    id: "bike-1",
    name: "Honda CB500X",
    price: 7000,
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Adventure",
    engine: "471cc parallel-twin",
    power: "47 HP",
    weight: "199 kg",
    fuelCapacity: "17.7L",
    description: "A lightweight adventure bike with excellent performance and versatility.",
    origin: "Japan",
    brand: "honda"
  },
  {
    id: "bike-2",
    name: "Yamaha MT-07",
    price: 7500,
    image: "https://images.unsplash.com/photo-1577438802465-8c8f71cc1312?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Naked",
    engine: "689cc parallel-twin",
    power: "74 HP",
    weight: "184 kg",
    fuelCapacity: "14L",
    description: "A torque-rich naked bike known for its agility and performance.",
    origin: "Japan",
    brand: "yamaha"
  },
  {
    id: "bike-3",
    name: "Kawasaki Ninja 650",
    price: 7800,
    image: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Sport",
    engine: "649cc parallel-twin",
    power: "68 HP",
    weight: "193 kg",
    fuelCapacity: "15L",
    description: "A sporty and comfortable bike, ideal for both beginners and experienced riders.",
    origin: "Japan",
    brand: "kawasaki"
  },
  {
    id: "bike-4",
    name: "Suzuki GSX-S750",
    price: 8500,
    image: "https://images.unsplash.com/photo-1597157639073-69284dc0fdaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Streetfighter",
    engine: "749cc inline-four",
    power: "114 HP",
    weight: "213 kg",
    fuelCapacity: "16L",
    description: "A streetfighter with a powerful inline-four engine and aggressive styling.",
    origin: "Japan",
    brand: "suzuki"
  },
  {
    id: "bike-5",
    name: "Ducati Monster",
    price: 11000,
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Naked",
    engine: "937cc L-twin",
    power: "111 HP",
    weight: "188 kg",
    fuelCapacity: "14L",
    description: "An iconic naked bike with Italian design and exhilarating performance.",
    origin: "Italy",
    brand: "ducati"
  },
  {
    id: "bike-6",
    name: "BMW R 1250 GS",
    price: 17500,
    image: "https://images.unsplash.com/photo-1691527203880-c1d9334c5d98?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Adventure",
    engine: "1254cc boxer twin",
    power: "136 HP",
    weight: "249 kg",
    fuelCapacity: "20L",
    description: "The ultimate adventure motorcycle, capable of tackling any terrain with comfort and performance.",
    origin: "Germany",
    brand: "bmw"
  },
  {
    id: "bike-7",
    name: "Harley-Davidson Street Glide",
    price: 21900,
    image: "https://images.unsplash.com/photo-1558980394-0a06c4631733?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Touring",
    engine: "1868cc Milwaukee-Eight",
    power: "94 HP",
    weight: "376 kg",
    fuelCapacity: "22.7L",
    description: "A classic American touring motorcycle with distinctive styling and long-distance comfort.",
    origin: "USA",
    brand: "harley-davidson"
  },
  {
    id: "bike-8",
    name: "Aprilia RSV4",
    price: 16999,
    image: "https://images.unsplash.com/photo-1658533600229-efe8dd22d6df?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Sport",
    engine: "1099cc V4",
    power: "217 HP",
    weight: "202 kg",
    fuelCapacity: "18.5L",
    description: "A high-performance superbike with race-derived technology and Italian craftsmanship.",
    origin: "Italy",
    brand: "aprilia"
  },
  {
    id: "bike-9",
    name: "Honda Gold Wing",
    price: 25000,
    image: "https://images.unsplash.com/photo-1574715803946-087ade0f0c22?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Touring",
    engine: "1833cc flat-six",
    power: "126 HP",
    weight: "365 kg",
    fuelCapacity: "21.1L",
    description: "The ultimate luxury touring motorcycle with unmatched comfort and technology features.",
    origin: "Japan",
    brand: "honda"
  },
  {
    id: "bike-10",
    name: "Kawasaki Z900",
    price: 8999,
    image: "https://images.unsplash.com/photo-1608541737042-87a14e4675a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Naked",
    engine: "948cc inline-four",
    power: "125 HP",
    weight: "212 kg",
    fuelCapacity: "17L",
    description: "A muscular naked bike with aggressive styling and impressive power delivery.",
    origin: "Japan",
    brand: "kawasaki"
  }
];
