import { motion } from "framer-motion";

interface HeadOutlineSVGProps {
  isAnimating: boolean;
  className?: string;
}

export const HeadOutlineSVG = ({ isAnimating, className = "" }: HeadOutlineSVGProps) => {
  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 300 300"
        className={`w-full h-full ${isAnimating ? 'logo-stroke-pulse' : ''}`}
        style={{
          filter: isAnimating
            ? 'drop-shadow(0 0 6px #c9895b) drop-shadow(0 0 12px #c9895b)'
            : 'none',
        }}
      >
        {/* Combined outline of head + arrows + heart */}
        <motion.path
          d="M 110 250 L 110 200 C 110 140 150 120 190 120 C 225 120 250 145 250 180 C 250 215 225 245 190 245 L 150 245 C 120 245 110 275 110 250 Z M 190 140 C 160 140 140 160 140 185 C 140 210 160 230 190 230 C 220 230 240 210 240 185 C 240 160 220 140 190 140 Z M 175 180 C 175 170 185 165 190 175 C 195 165 205 170 205 180 C 205 200 190 205 190 205 C 190 205 175 200 175 180 Z M 160 165 L 150 155 M 220 165 L 230 155"
          fill="none"
          stroke="#c9895b"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: isAnimating ? 1 : 0,
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
          }}
        />
      </svg>

      <style>{`
        @keyframes logo-stroke-pulse {
          0%, 100% { 
            filter: drop-shadow(0 0 6px #c9895b) drop-shadow(0 0 12px #c9895b);
          }
          50% { 
            filter: drop-shadow(0 0 12px #dba77d) drop-shadow(0 0 22px #dba77d);
          }
        }

        .logo-stroke-pulse {
          animation: logo-stroke-pulse 2s ease-in-out infinite;
          animation-delay: 3s;
        }
      `}</style>
    </div>
  );
};
