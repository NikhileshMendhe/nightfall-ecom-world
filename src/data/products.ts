
import { Product } from '../components/ProductCard';

export const products: Product[] = [
  {
    id: 1,
    title: 'Wireless Noise Cancelling Headphones',
    price: 249.99,
    oldPrice: 299.99,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'electronics',
    description: 'Premium noise cancelling headphones with up to 30 hours of battery life and crystal-clear audio quality.'
  },
  {
    id: 2,
    title: 'Smart Watch with Fitness Tracking',
    price: 179.99,
    oldPrice: 199.99,
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
    category: 'electronics',
    description: 'Track your fitness goals, receive notifications, and more with this versatile smart watch.'
  },
  {
    id: 3,
    title: 'Portable Bluetooth Speaker',
    price: 59.99,
    oldPrice: 79.99,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'electronics',
    description: 'Waterproof portable speaker with impressive sound quality and 10-hour battery life.'
  },
  {
    id: 4,
    title: 'Ultra HD 4K Smart TV (55-inch)',
    price: 499.99,
    oldPrice: 649.99,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'electronics',
    description: 'Crystal clear 4K resolution smart TV with built-in streaming services and voice control.'
  },
  {
    id: 5,
    title: 'Men\'s Casual Button-Down Shirt',
    price: 39.99,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80',
    category: 'clothing',
    description: 'Comfortable and stylish button-down shirt perfect for casual occasions.'
  },
  {
    id: 6,
    title: 'Women\'s Running Shoes',
    price: 89.99,
    oldPrice: 109.99,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'clothing',
    description: 'Lightweight, supportive running shoes with breathable mesh and responsive cushioning.'
  },
  {
    id: 7,
    title: 'Stainless Steel Kitchen Knife Set',
    price: 79.99,
    oldPrice: 99.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80',
    category: 'home',
    description: 'Premium 6-piece knife set with ergonomic handles and razor-sharp blades.'
  },
  {
    id: 8,
    title: 'Best-Selling Novel - Fantasy Edition',
    price: 14.99,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80',
    category: 'books',
    description: 'The latest best-selling fantasy novel that\'s captivating readers worldwide.'
  },
  {
    id: 9,
    title: 'Professional Hair Dryer',
    price: 49.99,
    rating: 4.0,
    image: 'https://images.unsplash.com/photo-1522338140262-f46f5913618a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80',
    category: 'home',
    description: 'Salon-quality hair dryer with multiple heat settings and ionic technology.'
  },
  {
    id: 10,
    title: 'Indoor Plant Collection (Set of 3)',
    price: 34.99,
    oldPrice: 44.99,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1531891570158-e71b35a485bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
    category: 'home',
    description: 'Set of 3 easy-care indoor plants in decorative pots to brighten up your space.'
  }
];

export const featuredProducts = products.filter(product => product.id <= 5);

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getRelatedProducts = (product: Product, limit: number = 4): Product[] => {
  return products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
};
