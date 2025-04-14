
import React from 'react';
import { Link } from 'react-router-dom';
import { brands } from '@/data/motorcycles';
import logo from '../assests/logo.png'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2a2438] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-8">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="flex  mb-6">
              <img src={logo} alt="" className='h-10 w-100 m-2' />
              <span className="text-2xl font-display font-bold text-white mt-4">
                Adrenaline Bikes
              </span>
            </div>
            <p className="text-gray-400 mb-6 max-w-xs">
              Engineering excellence, inspired design, and the relentless pursuit of performance perfection.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#9b87f5] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 5.8a8.49 8.49 0 0 1-2.36.64 4.13 4.13 0 0 0 1.81-2.27 8.21 8.21 0 0 1-2.61 1 4.1 4.1 0 0 0-7 3.74 11.64 11.64 0 0 1-8.45-4.29 4.16 4.16 0 0 0-.55 2.07 4.09 4.09 0 0 0 1.82 3.41 4.05 4.05 0 0 1-1.86-.51v.05a4.1 4.1 0 0 0 3.3 4 3.93 3.93 0 0 1-1.85.07 4.11 4.11 0 0 0 3.83 2.85A8.22 8.22 0 0 1 2 18.28a11.57 11.57 0 0 0 6.29 1.85A11.59 11.59 0 0 0 20 8.45v-.53A8.43 8.43 0 0 0 22 5.8" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#9b87f5] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.12 5.32H17V2.14A26.11 26.11 0 0 0 14.26 2c-2.72 0-4.58 1.66-4.58 4.7v2.62H6.61v3.56h3.07V22h3.68v-9.12h3.06l.46-3.56h-3.52V7.05c0-1.05.28-1.73 1.76-1.73Z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#9b87f5] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85 0 3.2-.01 3.58-.07 4.85-.05 1.17-.25 1.8-.41 2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07c-1.3.06-2.18.27-2.95.57-.8.31-1.48.72-2.16 1.4-.68.68-1.09 1.36-1.4 2.16-.3.77-.51 1.66-.57 2.95C0 8.33 0 8.74 0 12c0 3.26.01 3.67.07 4.95.06 1.3.27 2.18.57 2.95.31.8.72 1.48 1.4 2.16a5.88 5.88 0 0 0 2.16 1.4c.77.3 1.66.51 2.95.57 1.28.06 1.7.07 4.95.07 3.26 0 3.67-.01 4.95-.07 1.3-.06 2.18-.27 2.95-.57.8-.31 1.48-.72 2.16-1.4.68-.68 1.09-1.36 1.4-2.16.3-.77.51-1.66.57-2.95.06-1.28.07-1.7.07-4.95 0-3.26-.01-3.67-.07-4.95-.06-1.3-.27-2.18-.57-2.95a5.88 5.88 0 0 0-1.4-2.16 5.88 5.88 0 0 0-2.16-1.4c-.77-.3-1.66-.51-2.95-.57C15.67.01 15.26 0 12 0m0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32M12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8m6.4-11.8a1.44 1.44 0 1 0-2.88 0 1.44 1.44 0 0 0 2.88 0" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#9b87f5] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21.593 7.203a2.506 2.506 0 0 0-1.762-1.766c-1.566-.43-7.83-.437-7.83-.437s-6.255-.006-7.831.404a2.549 2.549 0 0 0-1.771 1.778c-.413 1.566-.417 4.814-.417 4.814s-.004 3.264.406 4.814c.23.857.906 1.534 1.763 1.765 1.582.43 7.83.437 7.83.437s6.265.007 7.831-.403a2.548 2.548 0 0 0 1.767-1.763c.414-1.565.417-4.812.417-4.812s.02-3.265-.396-4.831zM9.996 15.005l.005-6 5.207 3.005-5.212 2.995z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="text-lg font-medium mb-6 text-[#9b87f5]">Brands</h3>
            <ul className="space-y-4">
              {brands.slice(0, 5).map((brand) => (
                <li key={brand.id}>
                  <Link
                    to={`/brands/${brand.id}`}
                    className="text-gray-400 hover:text-[#9b87f5] transition-colors"
                  >
                    {brand.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/brands"
                  className="text-gray-400 hover:text-[#9b87f5] transition-colors"
                >
                  View All Brands
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-6 text-[#9b87f5]">Support</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-[#9b87f5] transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#9b87f5] transition-colors">FAQs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#9b87f5] transition-colors">Find a Dealer</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#9b87f5] transition-colors">Warranty Information</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#9b87f5] transition-colors">Service Manuals</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-6 text-[#9b87f5]">Company</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-[#9b87f5] transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#9b87f5] transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#9b87f5] transition-colors">News</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#9b87f5] transition-colors">Racing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#9b87f5] transition-colors">Sustainability</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            © {currentYear} Adrenaline Bikes. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-[#9b87f5] text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-[#9b87f5] text-sm">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-[#9b87f5] text-sm">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
