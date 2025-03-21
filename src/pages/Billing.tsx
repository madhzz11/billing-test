import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Check, CreditCard, Search, ShoppingCart, Calendar, Printer, Menu } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useIsMobile } from '@/hooks/use-mobile';

import CategorySelector from '@/components/CategorySelector';
import MenuItems from '@/components/MenuItems';
import ItemList from '@/components/ItemList';
import PaymentOptions from '@/components/PaymentOptions';
import AddProductForm from '@/components/AddProductForm';

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
  const [showMobileCart, setShowMobileCart] = useState(false);
  const isMobile = useIsMobile();
  
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

  const handleAddProduct = (product: MenuItem) => {
    setMenuItems(prevItems => [...prevItems, product]);
  };

  const filteredItems = searchQuery
    ? menuItems.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : menuItems;

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

    toast({
      title: "Item added",
      description: `${item.name} has been added to the cart.`,
      duration: 1500,
    });
  };

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

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

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
      <header className="bg-white shadow-sm border-b border-purple-100 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-md bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center shadow-md">
              <ShoppingCart size={isMobile ? 16 : 20} className="text-white" />
            </div>
            <h1 className="text-xl font-semibold bg-gradient-to-r from-purple-700 via-pink-600 to-violet-700 bg-clip-text text-transparent">
              {isMobile ? "Billing" : "Elegant Billing"}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            {isMobile && (
              <Button
                size="sm"
                variant="outline"
                className="border-purple-200 hover:bg-purple-50"
                onClick={() => setShowMobileCart(!showMobileCart)}
              >
                <ShoppingCart size={16} className="text-purple-500" />
                {cartItems.length > 0 && (
                  <span className="ml-1 text-xs bg-pink-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Button>
            )}
            
            {!isMobile && (
              <>
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
              </>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`${isMobile && showMobileCart ? 'hidden' : 'block'} lg:col-span-2 space-y-6`}>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search size={18} className="text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search menu..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-purple-100 focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <AddProductForm 
              categories={categories} 
              onAddProduct={handleAddProduct}
            />
          </div>

          <div className="animate-slide-in" style={{ animationDelay: '100ms' }}>
            <CategorySelector
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>

          <div className="animate-slide-in" style={{ animationDelay: '200ms' }}>
            <MenuItems
              items={filteredItems}
              categoryId={selectedCategory}
              onAddItem={handleAddItem}
            />
          </div>
        </div>

        <div className={`${isMobile && !showMobileCart ? 'hidden' : 'block'} bg-white rounded-2xl shadow-lg border border-purple-100 overflow-hidden glass-card animate-slide-in-right ${isMobile ? 'fixed inset-0 z-20 m-3 overflow-y-auto' : ''}`}>
          {isMobile && (
            <div className="sticky top-0 left-0 right-0 bg-white p-4 border-b border-purple-100 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-purple-800">Your Cart</h2>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowMobileCart(false)}
              >
                <Menu size={18} />
              </Button>
            </div>
          )}
          
          <div className="billing-header p-4">
            {!isMobile && <h2 className="text-lg font-semibold mb-2 text-purple-800">Order Summary</h2>}
            <div className="grid grid-cols-3 text-sm text-muted-foreground">
              <div>ITEMS</div>
              <div className="text-center">QTY</div>
              <div className="text-right">PRICE</div>
            </div>
          </div>

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

          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-t border-purple-100">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium">Total</span>
              <span className="text-xl font-bold text-purple-800">{total.toFixed(2)}</span>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium text-purple-700">Payment Method</h3>
              <PaymentOptions
                selectedOption={paymentMethod}
                onSelectOption={setPaymentMethod}
              />
              
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
                  
                  setCartItems([]);
                  if (isMobile) {
                    setShowMobileCart(false);
                  }
                }}
              >
                <Check size={16} className="mr-2" />
                Complete
              </Button>
            </div>

            {isMobile && (
              <Button
                variant="ghost"
                className="w-full mt-4 text-purple-700"
                onClick={() => setShowMobileCart(false)}
              >
                Back to Menu
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
