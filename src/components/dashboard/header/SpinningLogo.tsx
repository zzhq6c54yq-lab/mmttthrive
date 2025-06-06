
import React from "react";
import { motion } from "framer-motion";

const SpinningLogo: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Main spinning circle with better size for mobile */}
      <motion.div
        className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full flex items-center justify-center"
        style={{
          background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3), transparent 50%), radial-gradient(circle at 70% 70%, rgba(184, 115, 51, 0.4), transparent 50%), linear-gradient(135deg, #B87333 0%, #E5C5A1 35%, #F5E6D3 65%, #B87333 100%)",
          boxShadow: "0 0 40px rgba(184, 115, 51, 0.6), inset 0 0 30px rgba(255, 255, 255, 0.2)"
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* Inner glow effect */}
        <div 
          className="absolute inset-2 rounded-full"
          style={{
            background: "radial-gradient(circle at center, rgba(255, 255, 255, 0.3) 0%, rgba(184, 115, 51, 0.2) 40%, transparent 70%)",
          }}
        />
        
        {/* Bronze head outline with heart - just the outline, no background */}
        <motion.div
          className="relative z-10 flex items-center justify-center"
          animate={{ rotate: -360 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {/* Head outline with heart using the uploaded image concept */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center">
            {/* Head outline */}
            <svg 
              className="w-full h-full" 
              viewBox="0 0 100 100" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Head outline path */}
              <path
                d="M20 75 Q20 20 50 20 Q80 20 80 75 Q80 85 70 85 L30 85 Q20 85 20 75 Z"
                stroke="#B87333"
                strokeWidth="3"
                fill="none"
                className="drop-shadow-lg"
              />
              {/* Circular refresh arrows around the heart */}
              <path
                d="M35 45 Q35 35 50 35 Q65 35 65 45"
                stroke="#E5C5A1"
                strokeWidth="2"
                fill="none"
                className="opacity-80"
              />
              <path
                d="M65 55 Q65 65 50 65 Q35 65 35 55"
                stroke="#E5C5A1"
                strokeWidth="2"
                fill="none"
                className="opacity-80"
              />
              {/* Arrow indicators */}
              <polygon points="63,47 67,45 63,43" fill="#E5C5A1" className="opacity-80" />
              <polygon points="37,53 33,55 37,57" fill="#E5C5A1" className="opacity-80" />
              
              {/* Heart in center */}
              <path
                d="M50 42 C46 38, 38 38, 38 46 C38 54, 50 62, 50 62 C50 62, 62 54, 62 46 C62 38, 54 38, 50 42 Z"
                fill="#B87333"
                className="drop-shadow-md"
              />
            </svg>
          </div>
        </motion.div>
        
        {/* Orbital elements */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full"
            style={{
              background: "linear-gradient(45deg, #E5C5A1, #B87333)",
              boxShadow: "0 0 10px rgba(184, 115, 51, 0.8)",
              transformOrigin: `${40 + i * 15}px center`,
              left: "50%",
              top: "50%",
              marginLeft: "-6px",
              marginTop: "-6px"
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </motion.div>
      
      {/* Ambient glow effect */}
      <div 
        className="absolute inset-0 rounded-full opacity-50 animate-pulse"
        style={{
          background: "radial-gradient(circle, rgba(184, 115, 51, 0.3) 0%, transparent 70%)",
          filter: "blur(20px)"
        }}
      />
    </div>
  );
};

export default SpinningLogo;
