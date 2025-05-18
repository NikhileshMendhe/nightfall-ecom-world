
import { Card, CardContent } from "@/components/ui/card";
import { products } from "@/data/products";

const DealsSection = () => {
  // Filter some products to show as deals
  const dealProducts = products
    .filter(product => product.oldPrice)
    .slice(0, 4);
  
  return (
    <section className="py-8">
      <h2 className="text-2xl font-semibold mb-6">Deals of the Day</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {dealProducts.map((product) => {
          const discountPercentage = product.oldPrice 
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) 
            : 0;
            
          return (
            <Card key={product.id} className="overflow-hidden border-amazon-primary/20 hover:border-amazon-primary transition-colors">
              <div className="aspect-square overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform"
                />
              </div>
              <CardContent className="p-4">
                <div className="bg-red-600 text-white text-xs font-bold px-2 py-1 inline-block rounded mb-2">
                  {discountPercentage}% OFF
                </div>
                <h3 className="font-medium text-sm line-clamp-2 mb-2">{product.title}</h3>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-bold">${product.price.toFixed(2)}</span>
                    {product.oldPrice && (
                      <span className="text-gray-400 line-through text-xs ml-2">
                        ${product.oldPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default DealsSection;
