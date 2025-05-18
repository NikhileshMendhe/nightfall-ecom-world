
import { products } from "@/data/products";
import { Link } from "react-router-dom";

const TrendingSection = () => {
  // Get some random products for trending section
  const trendingProducts = [...products]
    .sort(() => Math.random() - 0.5)
    .slice(0, 5);
  
  return (
    <section className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Trending Now</h2>
        <Link to="/" className="text-amazon-primary hover:underline text-sm">View all</Link>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {trendingProducts.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`} className="group">
            <div className="aspect-square rounded-md overflow-hidden mb-2 bg-secondary/30">
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform"
              />
            </div>
            <h3 className="text-sm font-medium line-clamp-2 group-hover:text-amazon-primary transition-colors">
              {product.title}
            </h3>
            <div className="text-amazon-primary mt-1 font-semibold">
              ${product.price.toFixed(2)}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TrendingSection;
