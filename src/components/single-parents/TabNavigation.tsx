import React from 'react';
import { motion } from 'framer-motion';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'wellness', label: 'Parent Wellness' },
    { id: 'parenting', label: 'Parenting Tools' },
    { id: 'resources', label: 'Resources' },
    { id: 'workshops', label: 'Workshops' },
  ];

  return (
    <div className="flex gap-2 border-b border-border mb-6 overflow-x-auto">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors relative ${
            activeTab === tab.id
              ? 'text-rose-600'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {tab.label}
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-600"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
