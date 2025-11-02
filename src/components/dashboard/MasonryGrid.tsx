import React from 'react';
import { motion } from 'framer-motion';

interface MasonryGridProps {
  children: React.ReactNode;
}

const MasonryGrid: React.FC<MasonryGridProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
      {children}
    </div>
  );
};

export const MasonryLeft: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div 
    className="lg:col-span-3 space-y-6"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.2 }}
  >
    {children}
  </motion.div>
);

export const MasonryRight: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div 
    className="lg:col-span-2 space-y-6"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.3 }}
  >
    {children}
  </motion.div>
);

export default MasonryGrid;
