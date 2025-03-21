
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Check, CreditCard, Search, ShoppingCart, Calendar, Printer } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

import CategorySelector from '@/components/CategorySelector';
import MenuItems from '@/components/MenuItems';
import ItemList from '@/components/ItemList';
import PaymentOptions from '@/components/PaymentOptions';
import AddProductForm from '@/components/AddProductForm';

// Define types
interface MenuItem {
  id: string;
  name: string;
  categoryId: string;
  price: number;
}

interface Category {
  id: string;
  name: string;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const Billing = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [isLoyalty, setIsLoyalty] = useState(false);
  const [isFeedback, setIsFeedback] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: uuidv4(), name: '65 Biryani', categoryId: 'biryani', price: 240.00 },
    { id: uuidv4(), name: 'Chicken Combo', categoryId: 'chicken', price: 220.00 },
    { id: uuidv4(), name: 'Chicken Kothu Parotta', categoryId: 'kothu', price: 180.00 },
    { id: uuidv4(), name: 'Egg Kothu Parotta', categoryId: 'egg', price: 150.00 },
    { id: uuidv4(), name: 'Plain Veechu Parotta', categoryId: 'plain', price: 60.00 },
    { id: uuidv4(), name: 'Parotta (Set)', categoryId: 'parotta', price: 60.00 },
    { id: uuidv4(), name: 'Veechu Egg Parotta', categoryId: 'veechu', price: 110.00 },
    { id: uuidv4(), name: 'Chapati (PCS)', categoryId: 'parotta', price: 35.00 },
    { id: uuidv4(), name: 'Chapati (Set)', categoryId: 'parotta', price: 60.00 },
    { id: uuidv4(), name: 'Chicken Dosai', categoryId: 'chicken', price: 150.00 },
    { id: uuidv4(), name: 'Extra Paneer', categoryId: 'plain', price: 25.00 },
    { id: uuidv4(), name: 'Idly', categoryId: 'plain', price: 25.00 },
  ]);

  // Sample data
  const categories: Category[] = [
    { id: 'all', name: 'All Items' },
    { id: 'biryani', name: '65 Biryani' },
    { id: 'chicken', name: 'Chicken Combo' },
    { id: 'kothu', name: 'Chicken Kothu' },
    { id: 'egg', name: 'Egg Kothu' },
    { id: 'plain', name: 'Plain Veechu' },
    { id: 'parotta', name: 'Parotta' },
    { id: 'veechu', name: 'Veechu Egg' },
  ];

  // Handle adding a new product
  const handleAddProduct = (product: MenuItem) => {
    setMenuItems(prevItems => [...prevItems, product]);
  };

  // Filter menu items based on search query
  const filteredItems = searchQuery
    ? menuItems.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : menuItems;

  // Handle adding an item to the cart
  const handleAddItem = (item: MenuItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      
      if (existingItem) {
        return prevItems.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });

    // Show toast
    toast({
      title: "Item added",
      description: `${item.name} has been added to the cart.`,
      duration: 1500,
    });
  };

  // Handle changing item quantity
  const handleQuantityChange = (id: string, newQuantity: number) => {
    setCartItems(prevItems => {
      if (newQuantity === 0) {
        return prevItems.filter(item => item.id !== id);
      }
      
      return prevItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  // Calculate total
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Animation delay for components
  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelectorAll('.content-appear').forEach((el, i) => {
        (el as HTMLElement).style.animationDelay = `${i * 50}ms`;
      });
    }, 100);
    
    return () => clearTimeout(timer);
  }, [selectedCategory, cartItems]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-purple-100">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-md bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center shadow-md">
              <ShoppingCart size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-semibold bg-gradient-to-r from-purple-700 via-pink-600 to-violet-700 bg-clip-text text-transparent">
              Elegant Billing
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              size="sm"
              variant="outline"
              className="border-purple-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-300"
            >
              <Calendar size={16} className="mr-2 text-purple-500" />
              <span>New Order</span>
            </Button>
            
            <div className="rounded-full bg-pink-100 text-pink-600 px-4 py-1 text-sm font-medium animate-pulse-soft">
              Call for Support: 1800-123-4567
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Menu & Categories */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search and Add Product Row */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
            {/* Search Bar */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search size={18} className="text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search menu items..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-purple-100 focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Add Product Button */}
            <AddProductForm 
              categories={categories} 
              onAddProduct={handleAddProduct}
            />
          </div>

          {/* Category Selector */}
          <div className="animate-slide-in" style={{ animationDelay: '100ms' }}>
            <CategorySelector
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>

          {/* Menu Items Grid */}
          <div className="animate-slide-in" style={{ animationDelay: '200ms' }}>
            <MenuItems
              items={filteredItems}
              categoryId={selectedCategory}
              onAddItem={handleAddItem}
            />
          </div>
        </div>

        {/* Right Column - Cart & Payment */}
        <div className="bg-white rounded-2xl shadow-lg border border-purple-100 overflow-hidden glass-card animate-slide-in-right">
          {/* Cart Header */}
          <div className="billing-header p-4">
            <h2 className="text-lg font-semibold mb-2 text-purple-800">Order Summary</h2>
            <div className="grid grid-cols-3 text-sm text-muted-foreground">
              <div>ITEMS</div>
              <div className="text-center">QUANTITY</div>
              <div className="text-right">PRICE</div>
            </div>
          </div>

          {/* Cart Items */}
          <div className="p-4 max-h-[40vh] overflow-y-auto">
            {cartItems.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                Cart is empty. Add items from the menu.
              </div>
            ) : (
              <ItemList
                items={cartItems}
                onQuantityChange={handleQuantityChange}
              />
            )}
          </div>

          {/* Cart Footer */}
          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-t border-purple-100">
            {/* Total */}
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium">Total</span>
              <span className="text-xl font-bold text-purple-800">{total.toFixed(2)}</span>
            </div>

            {/* Payment Options */}
            <div className="space-y-3">
              <h3 className="font-medium text-purple-700">Payment Method</h3>
              <PaymentOptions
                selectedOption={paymentMethod}
                onSelectOption={setPaymentMethod}
              />
              
              {/* Options */}
              <div className="flex gap-4 mt-4 content-appear" style={{ '--delay': 6 } as React.CSSProperties}>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isLoyalty}
                    onChange={() => setIsLoyalty(!isLoyalty)}
                    className="rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm">Loyalty</span>
                </label>
                
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeedback}
                    onChange={() => setIsFeedback(!isFeedback)}
                    className="rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm">Send Feedback SMS</span>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 mt-6 content-appear" style={{ '--delay': 7 } as React.CSSProperties}>
              <Button
                variant="outline"
                className="border-purple-200 hover:bg-purple-50 transition-all duration-300 btn-hover"
                onClick={() => {
                  toast({
                    title: "Receipt printed",
                    description: "Your receipt has been sent to the printer.",
                  });
                }}
              >
                <Printer size={16} className="mr-2" />
                Print
              </Button>
              
              <Button
                className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white shadow-md hover:shadow-lg transition-all duration-300 btn-hover"
                onClick={() => {
                  if (cartItems.length === 0) {
                    toast({
                      title: "Empty cart",
                      description: "Please add items to your cart first.",
                      variant: "destructive",
                    });
                    return;
                  }
                  
                  toast({
                    title: "Order completed!",
                    description: `Total amount: ${total.toFixed(2)}`,
                  });
                  
                  // Reset the cart
                  setCartItems([]);
                }}
              >
                <Check size={16} className="mr-2" />
                Complete Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
