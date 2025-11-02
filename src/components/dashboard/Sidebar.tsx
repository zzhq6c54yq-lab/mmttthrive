import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Home, Brain, Gamepad2, Calendar, Briefcase, BarChart3, Settings, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useTranslation from '@/hooks/useTranslation';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { isSpanish } = useTranslation();

  const menuItems = [
    { icon: Home, label: isSpanish ? 'Inicio' : 'Home', path: '/' },
    { icon: Brain, label: isSpanish ? 'Bienestar Mental' : 'Mental Wellness', path: '/mental-wellness' },
    { icon: Gamepad2, label: isSpanish ? 'Juegos y Actividades' : 'Games & Activities', path: '/games-and-quizzes' },
    { icon: Calendar, label: isSpanish ? 'Talleres' : 'Workshops', path: '/workshops' },
    { icon: Briefcase, label: isSpanish ? 'Programas Especializados' : 'Specialized Programs', path: '/specialized' },
    { icon: BarChart3, label: isSpanish ? 'Mi Progreso' : 'My Progress', path: '/progress' },
    { icon: Settings, label: isSpanish ? 'Configuración' : 'Settings', path: '/settings' },
    { icon: HelpCircle, label: isSpanish ? 'Ayuda y Soporte' : 'Help & Support', path: '/help' },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-0 top-0 bottom-0 w-80 bg-card/95 backdrop-blur-xl border-r border-border shadow-2xl z-50"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-2xl font-semibold text-foreground">ThriveMT</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-muted transition-colors"
                >
                  <X className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto py-6">
                <ul className="space-y-2 px-4">
                  {menuItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.li
                        key={item.path}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <button
                          onClick={() => handleNavigate(item.path)}
                          className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-muted transition-all group"
                        >
                          <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                            <Icon className="h-5 w-5" />
                          </div>
                          <span className="text-foreground font-medium">{item.label}</span>
                        </button>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
