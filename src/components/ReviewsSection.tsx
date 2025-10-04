
import { Card } from "@/components/ui/card";
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import AnimatedSectionTitle from './AnimatedSectionTitle';

const reviews = [
  {
    id: 1,
    author: "Alex M.",
    rating: 5,
    text: "Excellent product quality and super fast shipping!",
    productName: "Wireless Noise Cancelling Headphones"
  },
  {
    id: 2,
    author: "Jamie T.",
    rating: 4,
    text: "Really happy with my purchase. Would highly recommend.",
    productName: "Smart Watch with Fitness Tracking"
  },
  {
    id: 3,
    author: "Casey R.",
    rating: 5,
    text: "Exceeded my expectations. This is exactly what I was looking for.",
    productName: "Portable Bluetooth Speaker"
  }
];

const ReviewsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className="py-8">
      <AnimatedSectionTitle>Customer Reviews</AnimatedSectionTitle>
      
      <div className="relative max-w-4xl mx-auto">
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {reviews.map((review) => (
              <div key={review.id} className="w-full flex-shrink-0 px-4">
                <Card className="p-6 md:p-8 border-primary/20 shadow-lg hover-lift">
                  <div className="flex items-center justify-center mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i}
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`w-6 h-6 ${i < review.rating ? 'text-yellow-400' : 'text-gray-400'}`} 
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <h3 className="font-bold text-lg text-center mb-3">{review.productName}</h3>
                  <p className="text-base text-center italic mb-4">"{review.text}"</p>
                  <p className="text-sm text-center text-muted-foreground">- {review.author}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <Button
          onClick={prevReview}
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 rounded-full shadow-lg z-10"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          onClick={nextReview}
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 rounded-full shadow-lg z-10"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        <div className="flex justify-center gap-2 mt-6">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-primary w-8' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
