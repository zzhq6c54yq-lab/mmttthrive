
import React from "react";

const BackgroundEffect: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#1E1E2D]/50 to-[#2D2D3D]/50 rounded-3xl overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-[#B87333]/20 via-[#E5C5A1]/30 to-[#B87333]/20 transform -skew-y-3"></div>
        <div className="absolute top-40 left-0 right-0 h-32 bg-gradient-to-r from-[#8B5CF6]/20 via-[#D946EF]/30 to-[#8B5CF6]/20 transform skew-y-3"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-r from-[#0EA5E9]/20 via-[#2563EB]/30 to-[#0EA5E9]/20 transform -skew-y-3"></div>
      </div>
      <div className="absolute inset-0 backdrop-blur-[2px]"></div>
    </div>
  );
};

export default BackgroundEffect;
