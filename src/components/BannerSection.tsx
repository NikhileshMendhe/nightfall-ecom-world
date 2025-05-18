
import { Button } from "@/components/ui/button";

interface BannerSectionProps {
  title: string;
  description: string;
  buttonText: string;
  image: string;
}

const BannerSection: React.FC<BannerSectionProps> = ({
  title,
  description,
  buttonText,
  image
}) => {
  return (
    <section className="py-8">
      <div className="relative h-[200px] md:h-[300px] rounded-lg overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-amazon-darker/80 to-transparent flex flex-col justify-center p-8">
          <h2 className="text-xl md:text-3xl font-bold text-white mb-2">{title}</h2>
          <p className="text-white/80 mb-4 max-w-md">{description}</p>
          <div>
            <Button className="amazon-button">{buttonText}</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
