
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";

export interface Product {
  id: number;
  title: string;
  price: number;
  oldPrice?: number;
  rating: number;
  image: string;
  category: string;
  description?: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, title, price, oldPrice, rating, image } = product;
  
  const displayRating = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star 
          key={i}
          className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`}
        />
      );
    }
    return stars;
  };
  
  const handleAddToCart = () => {
    // In a real app, we would dispatch an action to add to cart
    toast.success(`${title} added to cart`);
  };

  const discountPercentage = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

  return (
    <div className="product-card flex flex-col h-full">
      <Link to={`/product/${id}`} className="block h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-contain bg-white/5 p-4 hover:scale-105 transition-transform"
        />
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/product/${id}`} className="block">
          <h3 className="font-medium text-lg line-clamp-2 hover:text-amazon-primary transition-colors">
            {title}
          </h3>
        </Link>
        
        <div className="flex items-center my-2">
          {displayRating()}
          <span className="text-sm text-gray-400 ml-1">({rating.toFixed(1)})</span>
        </div>
        
        <div className="mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold">${price.toFixed(2)}</span>
            {oldPrice && (
              <span className="text-sm text-gray-400 line-through">${oldPrice.toFixed(2)}</span>
            )}
            {discountPercentage > 0 && (
              <span className="text-xs bg-amazon-primary text-black px-1.5 py-0.5 rounded-sm">
                Save {discountPercentage}%
              </span>
            )}
          </div>
          
          <Button 
            onClick={handleAddToCart}
            className="w-full mt-3 bg-amazon-primary hover:bg-amazon-primary/80 text-black"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
