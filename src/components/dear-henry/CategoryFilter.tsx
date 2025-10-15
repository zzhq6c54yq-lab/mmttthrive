import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface CategoryFilterProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const categories = [
  { value: null, label: 'All Topics', emoji: '🌟' },
  { value: 'anxiety', label: 'Anxiety', emoji: '😰' },
  { value: 'relationships', label: 'Relationships', emoji: '💑' },
  { value: 'self-esteem', label: 'Self-Esteem', emoji: '💪' },
  { value: 'depression', label: 'Depression', emoji: '😔' },
  { value: 'purpose', label: 'Purpose', emoji: '🎯' },
  { value: 'trauma', label: 'Trauma', emoji: '🩹' },
  { value: 'motivation', label: 'Motivation', emoji: '🚀' },
];

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Browse by Topic
      </h3>
      <div className="flex flex-wrap gap-3">
        {categories.map((category, index) => (
          <motion.div
            key={category.value || 'all'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Button
              variant={selectedCategory === category.value ? 'default' : 'outline'}
              onClick={() => onSelectCategory(category.value)}
              className={`rounded-full ${
                selectedCategory === category.value
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700'
                  : 'hover:border-amber-500'
              }`}
            >
              <span className="mr-2">{category.emoji}</span>
              {category.label}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
