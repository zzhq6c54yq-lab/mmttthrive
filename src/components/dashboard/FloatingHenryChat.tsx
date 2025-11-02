import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import useTranslation from '@/hooks/useTranslation';

const FloatingHenryChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isSpanish } = useTranslation();

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-mental-health to-wellness shadow-lg flex items-center justify-center text-white"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          boxShadow: isOpen 
            ? '0 8px 30px rgba(0,0,0,0.2)' 
            : ['0 8px 30px rgba(168, 197, 163, 0.4)', '0 8px 40px rgba(195, 181, 229, 0.5)', '0 8px 30px rgba(168, 197, 163, 0.4)']
        }}
        transition={{ 
          boxShadow: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-40 w-80 md:w-96 bg-card rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-mental-health to-wellness p-4">
              <h3 className="text-white font-semibold text-lg">
                {isSpanish ? '💬 Habla con Henry' : '💬 Chat with Henry'}
              </h3>
              <p className="text-white/80 text-sm">
                {isSpanish ? 'Tu asistente de bienestar' : 'Your wellness assistant'}
              </p>
            </div>
            <div className="p-6 h-96 flex items-center justify-center">
              <p className="text-muted-foreground text-center">
                {isSpanish 
                  ? 'La función de chat se integrará pronto...' 
                  : 'Chat feature coming soon...'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingHenryChat;
