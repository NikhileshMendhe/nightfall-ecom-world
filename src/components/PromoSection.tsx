
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const promos = [
  {
    id: 1,
    title: "Free Shipping",
    description: "On orders over $50",
    icon: "📦"
  },
  {
    id: 2,
    title: "24/7 Support",
    description: "Contact us anytime",
    icon: "🛎️"
  },
  {
    id: 3,
    title: "Secure Payment",
    description: "100% secure checkout",
    icon: "🔒"
  },
  {
    id: 4,
    title: "Easy Returns",
    description: "30 day return policy",
    icon: "↩️"
  }
];

const PromoSection = () => {
  return (
    <section className="py-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {promos.map((promo) => (
          <Card key={promo.id} className="border-amazon-primary/20">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="text-3xl mb-2">{promo.icon}</div>
              <h3 className="font-semibold">{promo.title}</h3>
              <p className="text-sm text-gray-400">{promo.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default PromoSection;
