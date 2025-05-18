
import { Link } from 'react-router-dom';
import { Home, Search, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const NotFound = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <AlertCircle className="h-20 w-20 text-amazon-primary" />
          </div>
          
          <h1 className="text-4xl font-bold mb-4">Page not found</h1>
          <p className="text-xl text-gray-300 mb-8">
            We couldn't find the page you're looking for.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-amazon-primary hover:bg-amber-500 text-black">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-gray-600">
              <Link to="/">
                <Search className="mr-2 h-4 w-4" />
                Search products
              </Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
