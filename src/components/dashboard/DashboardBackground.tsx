
import React from "react";

const DashboardBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F6D9A7] via-[#FFFDF7] to-[#F6D9A7] text-gray-700 pt-6 pb-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Warm-toned texture and gradient background */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23F6D9A7%22 fill-opacity=%220.15%22/></svg>')] opacity-50"></div>
        
        {/* Top gold gradient */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#E5C5A1] to-transparent"></div>
        
        {/* Bottom gold gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#E5C5A1] to-transparent"></div>
        
        {/* Middle light area */}
        <div className="absolute top-32 bottom-32 left-0 right-0 bg-gradient-to-b from-[#FFFDF7]/80 via-[#F8F3E9] to-[#FFFDF7]/80"></div>

        {/* Additional decorative elements */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-[#E5C5A1]/30 via-[#FFA28A]/20 to-[#E5C5A1]/30 transform -skew-y-3"></div>
        <div className="absolute top-10 left-0 right-0 h-32 bg-gradient-to-r from-[#FCE2CB]/20 via-[#E5C5A1]/25 to-[#FCE2CB]/20 transform skew-y-2" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-r from-[#E5C5A1]/30 via-[#FFA28A]/20 to-[#E5C5A1]/30 transform -skew-y-2"></div>
        
        {/* Subtle shimmer effects */}
        <div className="absolute top-1/4 right-1/3 w-[40%] h-[30%] rounded-full bg-gradient-to-br from-[#FFD700]/10 to-transparent blur-3xl animate-pulse" style={{animationDuration: '8s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-[40%] h-[30%] rounded-full bg-gradient-to-tr from-[#FFD700]/10 to-transparent blur-3xl animate-pulse" style={{animationDuration: '10s'}}></div>
      </div>
      {children}
    </div>
  );
};

export default DashboardBackground;
