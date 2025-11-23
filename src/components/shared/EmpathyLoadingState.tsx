import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface EmpathyLoadingStateProps {
  message?: string;
}

const loadingMessages = [
  "Preparing your personalized insights...",
  "Connecting you with support...",
  "Creating your safe space...",
  "Getting everything ready for you...",
  "Just a moment while we set things up...",
  "Almost there...",
];

const EmpathyLoadingState: React.FC<EmpathyLoadingStateProps> = ({ message }) => {
  const [currentMessage, setCurrentMessage] = React.useState(message || loadingMessages[0]);

  React.useEffect(() => {
    if (message) return;

    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % loadingMessages.length;
      setCurrentMessage(loadingMessages[index]);
    }, 3000);

    return () => clearInterval(interval);
  }, [message]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      {/* Breathing loader */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative mb-8"
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E5C5A1] to-[#D4AF37] flex items-center justify-center">
          <Loader2 className="w-10 h-10 text-white animate-spin" />
        </div>
        
        {/* Pulsing rings */}
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
          className="absolute inset-0 rounded-full border-2 border-[#D4AF37]"
        />
        <motion.div
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.5,
          }}
          className="absolute inset-0 rounded-full border-2 border-[#E5C5A1]"
        />
      </motion.div>

      {/* Rotating messages */}
      <motion.p
        key={currentMessage}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
        className="text-lg text-gray-300 text-center max-w-md"
      >
        {currentMessage}
      </motion.p>

      {/* Subtle encouragement */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="text-sm text-gray-500 text-center mt-4"
      >
        Thank you for your patience
      </motion.p>
    </div>
  );
};

export default EmpathyLoadingState;
