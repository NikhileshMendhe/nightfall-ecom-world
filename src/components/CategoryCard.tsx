
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  title: string;
  image: string;
  slug: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, image, slug }) => {
  return (
    <Link 
      to={`/category/${slug}`} 
      className="bg-secondary p-4 rounded-md hover:bg-secondary/70 transition-colors flex flex-col"
    >
      <div className="h-32 overflow-hidden rounded-md mb-3">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="font-medium text-center">{title}</h3>
      <span className="text-xs text-amazon-primary text-center mt-1 block">
        Shop now
      </span>
    </Link>
  );
};

export default CategoryCard;
