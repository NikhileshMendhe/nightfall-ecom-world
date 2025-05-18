
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import { getProductsByCategory } from '@/data/products';

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const products = getProductsByCategory(slug || '');

  return (
    <div className="flex flex-col min-h-screen bg-green-50">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-gradient-soft rounded-xl p-8 mb-6">
            <h1 className="text-3xl font-bold capitalize mb-2 text-foreground">
              {slug?.replace('-', ' ')}
            </h1>
            <p className="text-muted-foreground">
              Browse our collection of {slug?.replace('-', ' ')} products
            </p>
          </div>
          
          <ProductGrid 
            products={products}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
