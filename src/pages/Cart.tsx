
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, CreditCard, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

// Sample cart data - in a real app this would come from a context or state management
const sampleCartItems: CartItem[] = [
  {
    id: 1,
    title: 'Wireless Noise Cancelling Headphones',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    quantity: 1
  },
  {
    id: 3,
    title: 'Portable Bluetooth Speaker',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    quantity: 2
  }
];

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(sampleCartItems);
  
  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;
  
  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  const handleRemoveItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    toast.success("Item removed from cart");
  };
  
  const handleCheckout = () => {
    toast.success("Proceeding to checkout...");
    // In a real app, redirect to checkout page
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center py-12">
            <ShoppingCart className="h-20 w-20 mx-auto mb-6 text-gray-400" />
            <h1 className="text-2xl font-semibold mb-4">Your cart is empty</h1>
            <p className="text-gray-400 mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Button asChild className="bg-amazon-primary hover:bg-amber-500 text-black">
              <Link to="/">Continue Shopping</Link>
            </Button>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {cartItems.map(item => (
              <div key={item.id} className="flex flex-col sm:flex-row gap-4 p-4 mb-4 bg-secondary rounded-lg">
                <div className="w-24 h-24 bg-white/5 rounded-md flex items-center justify-center">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                
                <div className="flex-grow">
                  <Link to={`/product/${item.id}`} className="font-medium hover:text-amazon-primary">
                    {item.title}
                  </Link>
                  <p className="text-amazon-primary font-semibold mt-1">${item.price.toFixed(2)}</p>
                  <p className="text-sm text-green-500 mt-1">In Stock</p>
                  
                  <div className="flex flex-wrap gap-4 mt-3 items-center">
                    <div className="flex items-center">
                      <span className="mr-2">Qty:</span>
                      <select
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                        className="bg-amazon-dark border border-gray-600 rounded-md p-1"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                      </select>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-gray-400 hover:text-white hover:bg-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                </div>
                
                <div className="text-right">
                  <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            ))}
            
            <div className="text-right text-lg mt-4">
              Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items):
              <span className="font-bold ml-2">${subtotal.toFixed(2)}</span>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-secondary p-6 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-500">Free</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-700 pt-2 mt-2">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={handleCheckout}
                className="w-full bg-amazon-primary hover:bg-amber-500 text-black"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Proceed to Checkout
              </Button>
              
              <div className="mt-4 text-sm text-gray-400">
                <p className="flex items-center mb-1">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Free shipping on orders over $100
                </p>
                <p className="flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  30-day return policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
