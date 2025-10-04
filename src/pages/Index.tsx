
import HeroCarousel from '@/components/HeroCarousel';
import ProductGrid from '@/components/ProductGrid';
import CategorySection from '@/components/CategorySection';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import FloatingIcons from '@/components/FloatingIcons';
import { featuredProducts, products } from '@/data/products';
import DealsSection from '@/components/DealsSection';
import TrendingSection from '@/components/TrendingSection';
import RecommendationSection from '@/components/RecommendationSection';
import BrandsSection from '@/components/BrandsSection';
import ReviewsSection from '@/components/ReviewsSection';
import BannerSection from '@/components/BannerSection';
import FeaturedCategoriesCarousel from '@/components/FeaturedCategoriesCarousel';
import PromoSection from '@/components/PromoSection';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <FloatingIcons />
      <ScrollProgressBar />
      <Navbar />
      
      <main className="flex-grow">
        <HeroCarousel />
        
        <div className="container mx-auto px-4">
          <FeaturedCategoriesCarousel />

          <DealsSection />
          
          <CategorySection />
          
          <ProductGrid 
            title="Featured Products" 
            products={featuredProducts} 
          />

          <BannerSection 
            title="Premium Membership"
            description="Join our premium membership program for exclusive deals and faster shipping!"
            buttonText="Join Now"
            image="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          />

          <TrendingSection />

          <PromoSection />
          
          <RecommendationSection />

          <BrandsSection />

          <ReviewsSection />

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
