
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
  
  // Convert USD to INR (approximate conversion rate)
  const priceInRupees = Math.round(price * 83);
  const oldPriceInRupees = oldPrice ? Math.round(oldPrice * 83) : undefined;
  
  const displayRating = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star 
          key={i}
          className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-primary fill-primary' : 'text-gray-400'}`}
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
    <div className="product-card flex flex-col h-full hover-lift group">
      <Link to={`/product/${id}`} className="block h-48 overflow-hidden rounded-t-lg">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-contain bg-gradient-soft p-4 group-hover:scale-110 transition-transform duration-500"
        />
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/product/${id}`} className="block">
          <h3 className="font-medium text-lg line-clamp-2 hover:text-primary transition-colors">
            {title}
          </h3>
        </Link>
        
        <div className="flex items-center my-2">
          {displayRating()}
          <span className="text-sm text-muted-foreground ml-1">({rating.toFixed(1)})</span>
        </div>
        
        <div className="mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold">₹{priceInRupees.toLocaleString()}</span>
            {oldPriceInRupees && (
              <span className="text-sm text-muted-foreground line-through">₹{oldPriceInRupees.toLocaleString()}</span>
            )}
            {discountPercentage > 0 && (
              <span className="text-xs bg-primary text-white px-1.5 py-0.5 rounded-sm">
                Save {discountPercentage}%
              </span>
            )}
          </div>
          
          <Button 
            onClick={handleAddToCart}
            className="w-full mt-3 group-hover:translate-y-0 translate-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
