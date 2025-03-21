
import React from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface Category {
  id: string;
  name: string;
}

interface CategorySelectorProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategory,
  onSelectCategory
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={cn(
      "flex gap-2 overflow-x-auto pb-3 scrollbar-none snap-x",
      isMobile && "px-1"
    )}>
      {categories.map((category, index) => (
        <button
          key={category.id}
          className={cn(
            "category-button whitespace-nowrap snap-start content-appear",
            selectedCategory === category.id && "category-button-active",
            isMobile && "text-sm py-1.5 px-3"
          )}
          style={{ '--delay': index } as React.CSSProperties}
          onClick={() => onSelectCategory(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;
