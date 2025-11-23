import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface EmpathyErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  showHomeButton?: boolean;
}

const EmpathyErrorState: React.FC<EmpathyErrorStateProps> = ({ 
  title = "Something didn't work",
  message = "We're having trouble loading this right now. It's not your fault.",
  onRetry,
  showHomeButton = true,
}) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center"
    >
      {/* Animated icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
        className="mb-6"
      >
        <div className="relative">
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="w-24 h-24 rounded-full bg-red-500/20 flex items-center justify-center"
          >
            <AlertCircle className="w-12 h-12 text-red-400" />
          </motion.div>
          
          {/* Subtle pulse */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
            className="absolute inset-0 rounded-full border-2 border-red-400"
          />
        </div>
      </motion.div>

      {/* Error message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="space-y-4 max-w-md"
      >
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <p className="text-gray-400 leading-relaxed">{message}</p>
      </motion.div>

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex gap-4 mt-8"
      >
        {onRetry && (
          <Button
            onClick={onRetry}
            className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] transition-all duration-300"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Let's try that again
          </Button>
        )}
        
        {showHomeButton && (
          <Button
            onClick={() => navigate('/dashboard')}
            variant="outline"
            className="border-[#D4AF37]/30 hover:bg-[#D4AF37]/10"
          >
            <Home className="w-4 h-4 mr-2" />
            Take me home
          </Button>
        )}
      </motion.div>

      {/* Gentle reassurance */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-sm text-gray-500 mt-8"
      >
        We're here to help. This happens sometimes, and we're working on it.
      </motion.p>
    </motion.div>
  );
};

export default EmpathyErrorState;
