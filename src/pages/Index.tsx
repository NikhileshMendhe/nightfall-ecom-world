
import HeroCarousel from '@/components/HeroCarousel';
import ProductGrid from '@/components/ProductGrid';
import CategorySection from '@/components/CategorySection';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { featuredProducts } from '@/data/products';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <HeroCarousel />
        
        <div className="container mx-auto px-4">
          <CategorySection />
          
          <ProductGrid 
            title="Featured Products" 
            products={featuredProducts} 
          />

          <section className="py-8">
            <div className="bg-amazon-primary/10 border border-amazon-primary/20 rounded-lg p-6 text-center">
              <h2 className="text-xl font-semibold mb-2">Join Our Newsletter</h2>
              <p className="text-gray-300 mb-4">Stay updated on new products and special offers</p>
              <div className="flex max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow rounded-l-md border-0 bg-background p-2"
                />
                <button 
                  className="amazon-button rounded-l-none"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
