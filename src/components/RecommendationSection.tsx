
import ProductCard from "./ProductCard";
import { products } from "@/data/products";
import { ScrollArea } from "@/components/ui/scroll-area";

const RecommendationSection = () => {
  // Get some random products for recommendations
  const recommendedProducts = [...products]
    .sort(() => Math.random() - 0.5)
    .slice(0, 8);

  return (
    <section className="py-8">
      <h2 className="text-2xl font-semibold mb-6">Recommended For You</h2>
      <ScrollArea className="whitespace-nowrap pb-4">
        <div className="flex space-x-4">
          {recommendedProducts.map(product => (
            <div key={product.id} className="w-[280px] shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </ScrollArea>
    </section>
  );
};

export default RecommendationSection;
