
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ChevronRight, Minus, Plus, ShoppingCart, Heart, Package, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import { getProductById, getRelatedProducts } from '@/data/products';

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  
  const product = id ? getProductById(parseInt(id)) : undefined;
  const relatedProducts = product ? getRelatedProducts(product) : [];

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
            <p className="mb-6">Sorry, the product you're looking for doesn't exist.</p>
            <Link to="/" className="amazon-button inline-block">
              Return to Homepage
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleQuantityIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    toast.success(`${quantity} x ${product.title} added to cart`);
  };

  const handleAddToWishlist = () => {
    toast.success(`${product.title} added to wishlist`);
  };

  const displayRating = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star 
          key={i}
          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`}
        />
      );
    }
    return stars;
  };

  const discountPercentage = product.oldPrice 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) 
    : 0;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm mb-6 text-gray-400">
          <Link to="/" className="hover:text-amazon-primary">Home</Link>
          <ChevronRight className="h-3 w-3 mx-2" />
          <Link to={`/category/${product.category}`} className="hover:text-amazon-primary capitalize">
            {product.category}
          </Link>
          <ChevronRight className="h-3 w-3 mx-2" />
          <span className="text-gray-200 truncate">{product.title}</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="bg-white/5 p-4 rounded-lg flex items-center justify-center">
            <img 
              src={product.image} 
              alt={product.title} 
              className="max-w-full max-h-96 object-contain"
            />
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="text-2xl font-semibold mb-2">{product.title}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex mr-3">
                {displayRating()}
              </div>
              <span className="text-gray-400">{product.rating.toFixed(1)} ({Math.floor(product.rating * 50)} reviews)</span>
            </div>
            
            <div className="mb-4 pb-4 border-b border-gray-700">
              <div className="flex items-baseline">
                <span className="text-3xl font-semibold">${product.price.toFixed(2)}</span>
                {product.oldPrice && (
                  <>
                    <span className="text-gray-400 line-through ml-3">${product.oldPrice.toFixed(2)}</span>
                    <span className="ml-3 bg-amazon-primary text-black text-sm px-2 py-1 rounded-md">
                      Save {discountPercentage}%
                    </span>
                  </>
                )}
              </div>
            </div>
            
            {/* Description */}
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-2">Description</h2>
              <p className="text-gray-300">{product.description}</p>
            </div>
            
            {/* Add to Cart Section */}
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <span className="mr-3">Quantity:</span>
                <div className="flex items-center border border-gray-600 rounded-md overflow-hidden">
                  <button 
                    onClick={handleQuantityDecrease}
                    className="p-2 hover:bg-gray-700 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4">{quantity}</span>
                  <button 
                    onClick={handleQuantityIncrease}
                    className="p-2 hover:bg-gray-700 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={handleAddToCart} 
                  className="bg-amazon-primary hover:bg-amber-500 text-black flex-grow"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                <Button 
                  onClick={handleAddToWishlist}
                  variant="outline"
                  className="border-gray-600"
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Add to Wishlist
                </Button>
              </div>
            </div>
            
            {/* Shipping Info */}
            <div className="bg-secondary p-4 rounded-md">
              <div className="flex mb-2">
                <Package className="h-5 w-5 mr-2 text-amazon-primary" />
                <span>In Stock - Ready to ship</span>
              </div>
              <div className="flex">
                <Truck className="h-5 w-5 mr-2 text-amazon-primary" />
                <span>Free delivery on orders over $35</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <ProductGrid 
            title="You might also like" 
            products={relatedProducts} 
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
