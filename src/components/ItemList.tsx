
import React from 'react';
import { cn } from '@/lib/utils';
import { Check, Plus, Minus } from 'lucide-react';

interface Item {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface ItemListProps {
  items: Item[];
  onQuantityChange: (id: string, newQuantity: number) => void;
  onRemoveItem?: (id: string) => void;
}

const ItemList: React.FC<ItemListProps> = ({ 
  items, 
  onQuantityChange,
  onRemoveItem
}) => {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div 
          key={item.id}
          className="flex items-center justify-between py-2 border-b border-border last:border-0 content-appear"
          style={{ '--delay': index } as React.CSSProperties}
        >
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
              <Check size={12} className="text-accent" />
            </div>
            <span className="font-medium">{item.name}</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <button 
                className="quantity-control"
                onClick={() => onQuantityChange(item.id, Math.max(0, item.quantity - 1))}
                aria-label="Decrease quantity"
              >
                <Minus size={14} />
              </button>
              
              <span className="w-8 text-center font-medium">{item.quantity}</span>
              
              <button 
                className="quantity-control"
                onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                aria-label="Increase quantity"
              >
                <Plus size={14} />
              </button>
            </div>
            
            <div className="w-24 text-right">
              <span className="font-semibold">
                {item.price.toFixed(2)}
              </span>
              <div className="text-xs text-muted-foreground">
                {(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
