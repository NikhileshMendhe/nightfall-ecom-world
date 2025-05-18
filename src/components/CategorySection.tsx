
import CategoryCard from './CategoryCard';

const categories = [
  {
    id: 1,
    title: 'Electronics',
    slug: 'electronics',
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1057&q=80'
  },
  {
    id: 2,
    title: 'Clothing',
    slug: 'clothing',
    image: 'https://images.unsplash.com/photo-1589902860314-e910697dea18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80'
  },
  {
    id: 3,
    title: 'Home & Kitchen',
    slug: 'home',
    image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80'
  },
  {
    id: 4,
    title: 'Books',
    slug: 'books',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80'
  }
];

const CategorySection = () => {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-semibold mb-6">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map(category => (
          <CategoryCard 
            key={category.id} 
            title={category.title} 
            image={category.image} 
            slug={category.slug}
          />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
