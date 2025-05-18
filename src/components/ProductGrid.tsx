
import { useEffect, useState } from 'react';
import ProductCard, { Product } from './ProductCard';

interface ProductGridProps {
  title?: string;
  products: Product[];
  limit?: number;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  title, 
  products,
  limit 
}) => {
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    if (limit && limit > 0) {
      setDisplayProducts(products.slice(0, limit));
    } else {
      setDisplayProducts(products);
    }
  }, [products, limit]);

  if (displayProducts.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-400">No products available.</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      {title && (
        <h2 className="text-2xl font-semibold mb-6">{title}</h2>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {displayProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
