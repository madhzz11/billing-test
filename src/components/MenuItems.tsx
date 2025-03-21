
import React from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  const filteredItems = categoryId === 'all' 
    ? items 
    : items.filter(item => item.categoryId === categoryId);

  return (
    <div className={cn(
      "grid gap-3 mt-4",
      isMobile ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2 md:grid-cols-3"
    )}>
      {filteredItems.map((item, index) => (
        <button
          key={item.id}
          className="glass-card p-4 rounded-xl text-left transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] content-appear"
          style={{ '--delay': index } as React.CSSProperties}
          onClick={() => onAddItem(item)}
        >
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-sm mb-1">{item.name}</h3>
            <span className="text-[9px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">
              {item.id.substring(0, 6)}
            </span>
          </div>
          <p className="text-accent font-semibold">{item.price.toFixed(2)}</p>
        </button>
      ))}
    </div>
  );
};

export default MenuItems;
