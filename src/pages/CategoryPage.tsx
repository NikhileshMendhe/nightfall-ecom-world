
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import { getProductsByCategory } from '@/data/products';

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const products = getProductsByCategory(slug || '');

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold capitalize mb-6">
            {slug?.replace('-', ' ')}
          </h1>
          
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
