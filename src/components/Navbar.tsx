
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  Package, 
  Home,
  ChevronDown
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const cartCount = 0; // Will be dynamic when cart functionality is added

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search for:", searchQuery);
    // In a real app, we would redirect to search results page
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-amazon-darker sticky top-0 z-50 w-full">
      {/* Top Navbar */}
      <div className="container mx-auto py-3 px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-amazon-primary font-bold text-2xl md:text-3xl">
          NightCart
        </Link>

        {/* Search bar - hide on mobile */}
        {!isMobile && (
          <form onSubmit={handleSearch} className="flex-1 mx-6 max-w-2xl">
            <div className="flex">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border-none bg-white/10 text-white"
              />
              <Button type="submit" className="ml-2 bg-amazon-primary hover:bg-amber-500" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>
        )}

        {/* Account & Cart */}
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex flex-col items-center">
                <User className="h-5 w-5" />
                <span className="text-xs hidden md:block">Account</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-amazon-light border-gray-700 w-48">
              <DropdownMenuItem>
                <Link to="/login" className="w-full">Sign In</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/register" className="w-full">Register</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/account" className="w-full">My Account</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/orders" className="w-full">My Orders</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Link to="/cart">
            <Button variant="ghost" className="flex flex-col items-center relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="text-xs hidden md:block">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amazon-primary text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>

          {/* Mobile menu button */}
          {isMobile && (
            <Button variant="ghost" onClick={toggleMenu} className="md:hidden" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>

      {/* Search bar - mobile only */}
      {isMobile && (
        <form onSubmit={handleSearch} className="px-4 pb-3">
          <div className="flex">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border-none bg-white/10 text-white"
            />
            <Button type="submit" className="ml-2 bg-amazon-primary hover:bg-amber-500" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </form>
      )}

      {/* Bottom navbar with categories */}
      <nav className="bg-amazon-light py-2 px-4 overflow-x-auto whitespace-nowrap">
        <div className="container mx-auto flex gap-4 items-center">
          <Button variant="ghost" className="flex items-center text-foreground hover:text-amazon-primary" size="sm">
            <Menu className="h-4 w-4 mr-1" />
            All
          </Button>
          <Link to="/category/electronics" className="text-foreground hover:text-amazon-primary font-medium">Electronics</Link>
          <Link to="/category/clothing" className="text-foreground hover:text-amazon-primary font-medium">Clothing</Link>
          <Link to="/category/home" className="text-foreground hover:text-amazon-primary font-medium">Home & Kitchen</Link>
          <Link to="/category/books" className="text-foreground hover:text-amazon-primary font-medium">Books</Link>
          <Link to="/category/toys" className="text-foreground hover:text-amazon-primary font-medium">Toys & Games</Link>
          <Link to="/deals" className="text-amazon-primary font-medium hover:text-amber-400">Today's Deals</Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
