
import React from "react";
import { cn } from "@/lib/utils";

interface TabNavigationProps {
  activeTab: 'patients' | 'caregivers' | 'resources' | 'communities' | 'remembrance' | 'children';
  onTabChange: (tab: 'patients' | 'caregivers' | 'resources' | 'communities' | 'remembrance' | 'children') => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'patients', label: 'For Patients' },
    { id: 'caregivers', label: 'For Caregivers' },
    { id: 'children', label: 'For Children & Parents' },
    { id: 'resources', label: 'Resources' },
    { id: 'communities', label: 'Communities' },
    { id: 'remembrance', label: 'Remembrance' },
  ];

  return (
    <div className="flex overflow-x-auto bg-rose-50/70 dark:bg-rose-900/20 p-1 rounded-t-lg">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id as any)}
          className={cn(
            "px-4 py-3 text-sm font-medium rounded-md whitespace-nowrap transition-colors",
            activeTab === tab.id
              ? "bg-rose-500 text-white shadow-sm"
              : "text-gray-700 dark:text-gray-200 hover:bg-rose-400/30 dark:hover:bg-rose-800/30"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
