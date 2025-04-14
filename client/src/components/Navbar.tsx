
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, X, ChevronDown, Bike, Search, ShoppingCart, GitCompare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { brands } from '@/data/motorcycles';
import { useBrand } from '@/contexts/BrandContext';
import SearchSuggestions from './SearchSuggestions';
import AuthButtons from './AuthButtons';
import { useComparison } from '@/contexts/ComparisonContext';
import { useCart } from '@/contexts/CartContext';
import logo from '../assests/logo.png';

const searchSuggestions = [
  "Search motorcycles...",
  "Search parts...",
  "Search gear...",
  "Search brands..."
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();
  const { currentBrand } = useBrand();
  const { items: comparisonItems } = useComparison();
  const { itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const primaryColor = "#9b87f5"; // Purple theme

  return (
    <header
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
        }`}
      style={currentBrand ? {
        backgroundColor: scrolled ? '#ffffff' : 'transparent',
        borderBottom: scrolled ? `1px solid ${currentBrand.primaryColor}20` : 'none'
      } : {}}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="logo" className="h-8 w-8 mr-2" style={{ color: currentBrand ? currentBrand.primaryColor : primaryColor }} />
          <span className="text-xl font-bold" style={{ color: primaryColor }}>Adrenaline Bikes</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className={`font-medium ${location.pathname === '/' ? 'text-primary' : 'hover:text-purple-600'}`}
            style={currentBrand ?
              (location.pathname === '/' ? { color: currentBrand.primaryColor } : {}) :
              (location.pathname === '/' ? { color: primaryColor } : {})
            }
          >
            Home
          </Link>

          <Link
            to="/gear"
            className={`font-medium ${location.pathname === '/gear' ? 'text-primary' : 'hover:text-purple-600'}`}
            style={currentBrand ?
              (location.pathname === '/gear' ? { color: currentBrand.primaryColor } : {}) :
              (location.pathname === '/gear' ? { color: primaryColor } : {})
            }
          >
            Gear
          </Link>

          <Link
            to="/parts"
            className={`font-medium ${location.pathname === '/parts' ? 'text-primary' : 'hover:text-purple-600'}`}
            style={currentBrand ?
              (location.pathname === '/parts' ? { color: currentBrand.primaryColor } : {}) :
              (location.pathname === '/parts' ? { color: primaryColor } : {})
            }
          >
            Parts
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  style={currentBrand ?
                    { color: location.pathname.includes('/brands') ? currentBrand.primaryColor : 'inherit' } :
                    { color: location.pathname.includes('/brands') ? primaryColor : 'inherit' }
                  }
                >
                  Brands
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-4 min-w-[400px]">
                  <div className="grid grid-cols-2 gap-3">
                    {brands.map((brand) => (
                      <Link
                        key={brand.id}
                        to={`/brands/${brand.id}`}
                        className="flex items-center p-3 rounded-md hover:bg-secondary"
                      >
                        <div className="w-10 h-10 mr-3 rounded-full bg-white flex items-center justify-center overflow-hidden">
                          <img src={brand.logo} alt={brand.name} className="w-8 h-8 object-contain" />
                        </div>
                        <span className="font-medium">{brand.name}</span>
                      </Link>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="hidden md:flex items-center space-x-3">
          {/* <div className="relative">
            {showSearch ? (
              <div className="flex items-center bg-white rounded-full border border-purple-200 pl-3 overflow-hidden transition-all duration-300">
                <Search className="h-4 w-4 text-purple-400" /> 
                <Input 
                  type="text" 
                  placeholder="Search motorcycles, parts, gear..." 
                  className="border-none focus-visible:ring-0 w-[300px]"
                />
                <SearchSuggestions 
                  suggestions={searchSuggestions} 
                  className="absolute left-[120px] top-1/2 -translate-y-1/2 text-gray-400"
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => setShowSearch(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button 
                variant="ghost"
                size="icon"
                aria-label="Search"
                onClick={() => setShowSearch(true)}
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
          </div> */}

          <Link to="/compare" className="relative">
            <Button variant="ghost" size="icon" aria-label="Compare">
              <GitCompare className="h-5 w-5" />
              {comparisonItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {comparisonItems.length}
                </span>
              )}
            </Button>
          </Link>

          <Link to="/cart">
            <Button variant="ghost" size="icon" aria-label="Cart">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>
          </Link>

          <AuthButtons />
        </div>

        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {isOpen && (
        <nav className="md:hidden bg-white border-t">
          <div className="px-6 py-4 space-y-4">
            <div className="relative flex items-center bg-gray-100 rounded-lg pl-3 overflow-hidden">
              <Search className="h-4 w-4 text-purple-500" />
              <Input
                type="text"
                placeholder="Search motorcycles, parts, gear..."
                className="border-none bg-transparent focus-visible:ring-0"
              />
              <SearchSuggestions
                suggestions={searchSuggestions}
                className="absolute left-[120px] top-1/2 -translate-y-1/2 text-gray-500"
              />
            </div>

            <Link
              to="/"
              className="block font-medium py-2"
              style={currentBrand && location.pathname === '/' ? { color: currentBrand.primaryColor } :
                location.pathname === '/' ? { color: primaryColor } : {}}
            >
              Home
            </Link>

            <Link
              to="/gear"
              className="block font-medium py-2"
              style={currentBrand && location.pathname === '/gear' ? { color: currentBrand.primaryColor } :
                location.pathname === '/gear' ? { color: primaryColor } : {}}
            >
              Gear
            </Link>

            <Link
              to="/parts"
              className="block font-medium py-2"
              style={currentBrand && location.pathname === '/parts' ? { color: currentBrand.primaryColor } :
                location.pathname === '/parts' ? { color: primaryColor } : {}}
            >
              Parts
            </Link>

            <div className="py-2">
              <div className="flex items-center justify-between font-medium mb-2">
                <span>Brands</span>
                <ChevronDown className="h-4 w-4" />
              </div>
              <div className="ml-4 space-y-2 mt-2">
                {brands.map((brand) => (
                  <Link
                    key={brand.id}
                    to={`/brands/${brand.id}`}
                    className="flex items-center py-1"
                  >
                    <div
                      className="w-3 h-3 mr-2 rounded-full"
                      style={{ backgroundColor: brand.primaryColor }}
                    ></div>
                    <span>{brand.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex space-x-3 mb-2">
              <Link to="/compare" className="flex items-center gap-1 text-sm">
                <GitCompare className="h-5 w-5" />
                Compare ({comparisonItems.length})
              </Link>
              <Link to="/cart" className="flex items-center gap-1 text-sm">
                <ShoppingCart className="h-5 w-5" />
                Cart ({itemCount})
              </Link>
            </div>

            <AuthButtons />
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
