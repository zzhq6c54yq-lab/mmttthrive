
import React from "react";

const DashboardBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#090611] to-[#0d0915] text-white pt-6 pb-20 px-0 relative overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Enhanced deep texture and gradient background */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23a78bfa%22 fill-opacity=%220.04%22/></svg>')] opacity-30"></div>
        
        {/* Enhanced glowing elements with deeper colors */}
        <div className="absolute top-[-20%] right-[-10%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-[#15091f]/30 to-transparent blur-3xl"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[80%] h-[80%] rounded-full bg-gradient-to-tr from-[#15091f]/30 to-transparent blur-3xl"></div>
        
        {/* Gold-purple gradient bands with improved flow - rotated angles for freshness */}
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-r from-[#B87333]/10 via-[#E5C5A1]/15 to-[#B87333]/10 transform -skew-y-6 rotate-3 animate-pulse" style={{animationDuration: '12s'}}></div>
        <div className="absolute top-10 left-0 right-0 h-36 bg-gradient-to-r from-[#E5C5A1]/10 via-[#B87333]/15 to-[#E5C5A1]/10 transform skew-y-4 -rotate-2 animate-pulse" style={{animationDuration: '15s', animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-r from-[#B87333]/10 via-[#E5C5A1]/15 to-[#B87333]/10 transform -skew-y-5 rotate-1 animate-pulse" style={{animationDuration: '18s'}}></div>
        
        {/* Additional subtle details */}
        <div className="absolute h-full w-full opacity-15 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#B87333]/15 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#B87333]/5 to-transparent opacity-20"></div>
        
        {/* Enhanced particle-like elements */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div 
              key={i} 
              className="absolute rounded-full bg-[#E5C5A1]/15 animate-pulse"
              style={{
                width: `${Math.random() * 12 + 5}px`,
                height: `${Math.random() * 12 + 5}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 5 + 2}s`,
                animationDelay: `${Math.random() * 5}s`,
                filter: 'blur(1px)',
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            ></div>
          ))}
        </div>
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default DashboardBackground;
