
import React from 'react';
import { cn } from '@/lib/utils';

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
  return (
    <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none snap-x">
      {categories.map((category, index) => (
        <button
          key={category.id}
          className={cn(
            "category-button whitespace-nowrap snap-start content-appear",
            selectedCategory === category.id && "category-button-active"
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
