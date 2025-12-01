import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import thriveLogoImage from "@/assets/thrivemt-logo.png";

const SiteEntry = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <img 
            src={thriveLogoImage} 
            alt="ThriveMT Logo" 
            className="w-32 h-32 mx-auto mb-6"
          />
          <div className="text-3xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#B8941F] bg-clip-text text-transparent">
            ThriveMT
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] bg-clip-text text-transparent leading-tight"
        >
          Build the Best You
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-xl md:text-2xl text-white/80 mb-16 max-w-2xl mx-auto"
        >
          A sanctuary to heal, grow, and become yourself
        </motion.p>

        {/* Enter Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <Button
            size="xl"
            onClick={() => navigate("/site/home")}
            className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#E5C350] hover:to-[#C9A430] text-black font-bold text-xl px-20 py-8 rounded-lg transition-all hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
          >
            ENTER
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default SiteEntry;
