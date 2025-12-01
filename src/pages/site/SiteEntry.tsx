import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import thriveTextLogo from "@/assets/thrivemt-text-logo.png";
import thriveOutlineLogo from "@/assets/thrivemt-outline-logo.png";

const SiteEntry = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 500),    // ThriveMT text fades in
      setTimeout(() => setStage(2), 5000),   // Logo fades in
      setTimeout(() => setStage(3), 9500),   // "Build the Best You" fades in
      setTimeout(() => setStage(4), 13000),  // Button appears with light sweep
    ];
    
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="min-h-screen bg-[#000000] relative overflow-hidden flex items-center justify-center">

      {/* Stacked vertical layout - all elements fade in smoothly */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-8 px-6">
        
        {/* ThriveMT Text Logo - Fades in at stage 1 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: stage >= 1 ? 1 : 0 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        >
          <img 
            src={thriveTextLogo} 
            alt="ThriveMT" 
            className="w-96 h-auto"
            style={{ 
              filter: 'drop-shadow(0 0 30px rgba(255,180,100,0.6))'
            }}
          />
        </motion.div>

        {/* Outline Head Logo - Fades in at stage 2 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: stage >= 2 ? 1 : 0 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        >
          <img 
            src={thriveOutlineLogo} 
            alt="ThriveMT Logo" 
            className="w-64 h-64"
          />
        </motion.div>

        {/* "Build the Best You" Headline - Fades in at stage 3 */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: stage >= 3 ? 1 : 0 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          className="text-6xl md:text-7xl font-bold text-center leading-tight"
          style={{
            background: 'linear-gradient(135deg, #FFE4C4 0%, #FFB347 40%, #FF8C00 70%, #CD853F 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Build the Best You
        </motion.h1>

        {/* ENTER Button with Light Sweep - Fades in at stage 4 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: stage >= 4 ? 1 : 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <Button
            size="xl"
            onClick={() => navigate("/site/home")}
            className="relative overflow-hidden text-black font-bold text-xl px-20 py-8 rounded-lg"
            style={{
              background: 'linear-gradient(90deg, #CD853F 0%, #FFB347 25%, #FFFFFF 50%, #FFB347 75%, #CD853F 100%)',
              backgroundSize: '200% 100%',
              animation: 'light-sweep 2s ease-in-out infinite',
            }}
          >
            ENTER
          </Button>
        </motion.div>
      </div>

      {/* CSS Animation for Light Sweep */}
      <style>{`
        @keyframes light-sweep {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
      `}</style>
    </div>
  );
};

export default SiteEntry;
