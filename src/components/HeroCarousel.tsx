
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const carouselItems = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1661956602153-23384936a1d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    title: 'New Electronics',
    subtitle: 'Save up to 40% on the latest gadgets'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    title: 'Home Essentials',
    subtitle: 'Upgrade your living space'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    title: 'Summer Fashion',
    subtitle: 'Trending styles for the season'
  }
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => 
      prevSlide === carouselItems.length - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => 
      prevSlide === 0 ? carouselItems.length - 1 : prevSlide - 1
    );
  };

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 animated-gradient opacity-20 z-0"></div>
      
      {/* Gradient overlay at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent z-10"></div>
      
      {/* Carousel items */}
      <div className="relative h-full">
        {carouselItems.map((item, index) => (
          <div 
            key={item.id}
            className={`absolute inset-0 transition-all duration-700 ease-out ${
              index === currentSlide 
                ? 'opacity-100 translate-x-0' 
                : index < currentSlide 
                  ? 'opacity-0 -translate-x-full' 
                  : 'opacity-0 translate-x-full'
            }`}
          >
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-full h-full object-cover object-center brightness-75 scale-105"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-start p-8 z-20">
              <h2 className={`text-2xl md:text-4xl font-bold text-white mb-2 transition-all duration-700 delay-200 ${
                index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                {item.title}
              </h2>
              <p className={`text-lg md:text-xl text-gray-200 mb-6 transition-all duration-700 delay-300 ${
                index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                {item.subtitle}
              </p>
              <Button className={`amazon-button transition-all duration-700 delay-400 hover:scale-105 ${
                index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                Shop Now
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <Button 
        variant="ghost" 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 rounded-full bg-black/20 hover:bg-black/40" 
        size="icon"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button 
        variant="ghost" 
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 rounded-full bg-black/20 hover:bg-black/40" 
        size="icon"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
