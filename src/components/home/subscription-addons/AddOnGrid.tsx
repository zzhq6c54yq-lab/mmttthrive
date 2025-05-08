
import React from 'react';
import { motion } from 'framer-motion';
import { containerVariants, cardVariants } from './AnimationVariants';
import AddOnCard from './AddOnCard';
import { AddOn } from './types';

interface AddOnGridProps {
  addOns: AddOn[];
  selectedAddOns: string[];
  expandedAddon: string | null;
  billingCycle: 'monthly' | 'yearly';
  onToggleExpand: (id: string) => void;
  onToggle: (id: string) => void;
  getPriceDisplayWithStrikethrough: (addOn: AddOn) => React.ReactNode;
  getPriceDisplay: (addOn: AddOn) => string;
}

const AddOnGrid: React.FC<AddOnGridProps> = ({
  addOns,
  selectedAddOns,
  expandedAddon,
  billingCycle,
  onToggleExpand,
  onToggle,
  getPriceDisplayWithStrikethrough,
  getPriceDisplay
}) => {
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {addOns.map((addOn) => (
        <motion.div key={addOn.id} variants={cardVariants}>
          <AddOnCard
            addOn={addOn}
            isSelected={selectedAddOns.includes(addOn.id)}
            expandedAddon={expandedAddon}
            priceDisplay={billingCycle === 'yearly' ? getPriceDisplayWithStrikethrough(addOn) : getPriceDisplay(addOn)}
            onToggleExpand={onToggleExpand}
            onToggle={onToggle}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AddOnGrid;
