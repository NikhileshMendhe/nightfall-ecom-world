
import { Link } from 'react-router-dom';
import { ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="w-full mt-auto">
      <Button 
        onClick={scrollToTop} 
        className="w-full bg-amazon-light hover:bg-amazon-light/90 rounded-none py-3"
      >
        <ChevronUp className="h-4 w-4 mr-2" />
        Back to top
      </Button>
      
      <div className="animated-gradient py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-3">Get to Know Us</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="text-gray-400 hover:text-gray-200">About Us</Link></li>
                <li><Link to="/careers" className="text-gray-400 hover:text-gray-200">Careers</Link></li>
                <li><Link to="/blog" className="text-gray-400 hover:text-gray-200">Press Releases</Link></li>
                <li><Link to="/community" className="text-gray-400 hover:text-gray-200">Community</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-3">Make Money with Us</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/sell" className="text-gray-400 hover:text-gray-200">Sell products</Link></li>
                <li><Link to="/affiliate" className="text-gray-400 hover:text-gray-200">Affiliate Program</Link></li>
                <li><Link to="/advertise" className="text-gray-400 hover:text-gray-200">Advertise Products</Link></li>
                <li><Link to="/publish" className="text-gray-400 hover:text-gray-200">Self-Publish</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-3">Payment Products</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/card" className="text-gray-400 hover:text-gray-200">Credit Card</Link></li>
                <li><Link to="/reload" className="text-gray-400 hover:text-gray-200">Reload Your Balance</Link></li>
                <li><Link to="/currency" className="text-gray-400 hover:text-gray-200">Currency Converter</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-3">Let Us Help You</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/account" className="text-gray-400 hover:text-gray-200">Your Account</Link></li>
                <li><Link to="/orders" className="text-gray-400 hover:text-gray-200">Your Orders</Link></li>
                <li><Link to="/shipping" className="text-gray-400 hover:text-gray-200">Shipping Rates</Link></li>
                <li><Link to="/help" className="text-gray-400 hover:text-gray-200">Help Center</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-700 text-center">
            <Link to="/" className="text-amazon-primary font-bold text-2xl mb-4 block">
              NightCart
            </Link>
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} NightCart. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
