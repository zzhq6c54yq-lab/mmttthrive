import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import thriveOutlineLogo from "@/assets/thrivemt-outline-logo.png";

const SiteEntry = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 500),    // "Thrive" text fades in
      setTimeout(() => setStage(2), 2000),   // "MT" ignites with glow
      setTimeout(() => setStage(3), 3500),   // Light beam shoots down
      setTimeout(() => setStage(4), 4500),   // Logo illuminates & pulses
      setTimeout(() => setStage(5), 5500),   // "Build the Best You" fades in
      setTimeout(() => setStage(6), 8000),   // Button appears with light sweep
    ];
    
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="min-h-screen bg-[#000000] relative overflow-hidden flex items-center justify-center">

      {/* Stacked vertical layout - cinematic animation sequence */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-8 px-6">
        
        {/* ThriveMT Text Logo - Split into "Thrive" and "MT" */}
        <div className="relative flex items-baseline gap-0">
          {/* "Thrive" Text - Fades in at stage 1 */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: stage >= 1 ? 1 : 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-8xl md:text-9xl font-bold tracking-tight"
            style={{ color: '#FFFFFF' }}
          >
            Thrive
          </motion.span>

          {/* "MT" Text - Ignites with glow at stage 2 */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: stage >= 2 ? 1 : 0,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`text-8xl md:text-9xl font-bold tracking-tight ${stage >= 2 ? 'mt-glow' : ''}`}
            style={{
              background: stage >= 2 ? 'linear-gradient(135deg, #B87333 0%, #D4A574 50%, #D4AF37 100%)' : '#FFFFFF',
              WebkitBackgroundClip: stage >= 2 ? 'text' : 'unset',
              WebkitTextFillColor: stage >= 2 ? 'transparent' : '#FFFFFF',
              backgroundClip: stage >= 2 ? 'text' : 'unset',
              position: 'relative',
            }}
          >
            MT
            {/* Light burst behind MT letters */}
            {stage >= 2 && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute inset-0 -z-10"
                style={{
                  background: 'radial-gradient(circle, rgba(212, 165, 116, 0.8) 0%, rgba(212, 165, 116, 0.4) 50%, transparent 70%)',
                  filter: 'blur(20px)',
                }}
              />
            )}
          </motion.span>
        </div>

        {/* Light Beam shooting down from MT to Logo - Stage 3 */}
        {stage >= 3 && stage < 4 && (
          <motion.div
            initial={{ y: -100, scaleY: 0.5, opacity: 0 }}
            animate={{ y: 100, scaleY: 1, opacity: [0, 1, 0] }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute w-2 h-32 z-20"
            style={{
              background: 'linear-gradient(180deg, #D4AF37 0%, #D4A574 50%, transparent 100%)',
              filter: 'blur(4px)',
              top: '35%',
            }}
          />
        )}

        {/* Outline Head Logo - Illuminates at stage 4 and pulses continuously */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: stage >= 4 ? 1 : 0,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`relative ${stage >= 4 ? 'logo-pulse' : ''}`}
        >
          <img 
            src={thriveOutlineLogo} 
            alt="ThriveMT Logo" 
            className="w-64 h-64"
            style={{
              filter: stage >= 4 ? 'drop-shadow(0 0 30px #D4A574) brightness(1.2)' : 'none',
            }}
          />
        </motion.div>

        {/* "Build the Best You" Headline - Fades in at stage 5 */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: stage >= 5 ? 1 : 0 }}
          transition={{ duration: 3, ease: "easeInOut" }}
          className="text-6xl md:text-7xl font-bold text-center leading-tight"
          style={{
            background: 'linear-gradient(135deg, #FFFFFF 0%, #E8D4C0 30%, #D4A574 60%, #B87333 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Build the Best You
        </motion.h1>

        {/* ENTER Button with Light Sweep - Fades in at stage 6 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: stage >= 6 ? 1 : 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <Button
            size="xl"
            onClick={() => navigate("/home")}
            className="relative overflow-hidden text-black font-bold text-xl px-20 py-8 rounded-lg"
            style={{
              background: 'linear-gradient(90deg, #B87333 0%, #D4A574 15%, #FFFFFF 40%, #FFFFFF 60%, #D4A574 85%, #B87333 100%)',
              backgroundSize: '300% 100%',
              animation: 'light-sweep 4s ease-in-out infinite',
            }}
          >
            ENTER
          </Button>
        </motion.div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes light-sweep {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        .mt-glow {
          animation: mt-glow-pulse 2s ease-in-out infinite;
        }

        @keyframes mt-glow-pulse {
          0%, 100% { 
            text-shadow: 0 0 20px #B87333, 0 0 40px #D4A574;
            filter: brightness(1);
          }
          50% { 
            text-shadow: 0 0 40px #D4AF37, 0 0 80px #D4A574, 0 0 120px #B87333;
            filter: brightness(1.2);
          }
        }

        .logo-pulse {
          animation: logo-pulse 2s ease-in-out infinite;
        }

        @keyframes logo-pulse {
          0%, 100% { 
            filter: drop-shadow(0 0 30px #D4A574) brightness(1.2);
            transform: scale(1);
          }
          50% { 
            filter: drop-shadow(0 0 60px #D4AF37) drop-shadow(0 0 100px #B87333) brightness(1.5);
            transform: scale(1.03);
          }
        }
      `}</style>
    </div>
  );
};

export default SiteEntry;
