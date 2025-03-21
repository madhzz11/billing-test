
import React from 'react';
import { cn } from '@/lib/utils';

interface MenuItem {
  id: string;
  name: string;
  categoryId: string;
  price: number;
}

interface MenuItemsProps {
  items: MenuItem[];
  categoryId: string;
  onAddItem: (item: MenuItem) => void;
}

const MenuItems: React.FC<MenuItemsProps> = ({
  items,
  categoryId,
  onAddItem
}) => {
  const filteredItems = categoryId === 'all' 
    ? items 
    : items.filter(item => item.categoryId === categoryId);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
      {filteredItems.map((item, index) => (
        <button
          key={item.id}
          className="glass-card p-4 rounded-xl text-left transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] content-appear"
          style={{ '--delay': index } as React.CSSProperties}
          onClick={() => onAddItem(item)}
        >
          <h3 className="font-medium text-sm mb-1">{item.name}</h3>
          <p className="text-accent font-semibold">{item.price.toFixed(2)}</p>
        </button>
      ))}
    </div>
  );
};

export default MenuItems;
