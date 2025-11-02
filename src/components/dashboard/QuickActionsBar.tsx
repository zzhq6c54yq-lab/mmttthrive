import React from 'react';
import { motion } from 'framer-motion';
import { Coins, Star, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useTranslation from '@/hooks/useTranslation';

const QuickActionsBar: React.FC = () => {
  const navigate = useNavigate();
  const { isSpanish } = useTranslation();

  const actions = [
    { 
      icon: Coins, 
      label: isSpanish ? 'Créditos: 125' : 'Credits: 125', 
      color: 'from-amber-400 to-yellow-500',
      onClick: () => navigate('/omni-credits')
    },
    { 
      icon: Star, 
      label: isSpanish ? 'Mejorar' : 'Upgrade', 
      color: 'from-purple-400 to-pink-500',
      onClick: () => navigate('/upgrade')
    },
    { 
      icon: RefreshCw, 
      label: isSpanish ? 'Intercambio' : 'Barter', 
      color: 'from-emerald-400 to-teal-500',
      onClick: () => navigate('/barter')
    },
  ];

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
      {actions.map((action, index) => {
        const Icon = action.icon;
        return (
          <motion.button
            key={action.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={action.onClick}
            className={`flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r ${action.color} text-white shadow-md hover:shadow-lg transition-all whitespace-nowrap`}
          >
            <Icon className="h-5 w-5" />
            <span className="font-medium">{action.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default QuickActionsBar;
