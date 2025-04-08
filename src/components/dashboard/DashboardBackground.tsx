
import React from "react";

const DashboardBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0a071a] to-[#0d0915] text-white pt-6 pb-20 px-0 relative overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Enhanced deep texture with more prominent silver and white accents */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23ffffff%22 fill-opacity=%220.07%22/></svg>')] opacity-40"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22><circle cx=%225%22 cy=%225%22 r=%221%22 fill=%22%23c0c0c0%22 fill-opacity=%220.05%22/></svg>')] opacity-30"></div>
        
        {/* Enhanced glowing elements with more prominent silver and gold */}
        <div className="absolute top-[-20%] right-[-10%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-[#c0c0c0]/20 via-[#15091f]/20 to-transparent blur-3xl"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[80%] h-[80%] rounded-full bg-gradient-to-tr from-[#E5C5A1]/20 via-[#15091f]/20 to-transparent blur-3xl"></div>
        
        {/* Brighter gold-silver-white gradient bands with improved flow */}
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-r from-[#B87333]/15 via-[#ffffff]/15 to-[#c0c0c0]/15 transform -skew-y-6 rotate-3 animate-pulse" style={{animationDuration: '12s'}}></div>
        <div className="absolute top-10 left-0 right-0 h-36 bg-gradient-to-r from-[#c0c0c0]/15 via-[#E5C5A1]/15 to-[#ffffff]/15 transform skew-y-4 -rotate-2 animate-pulse" style={{animationDuration: '15s', animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-r from-[#ffffff]/15 via-[#B87333]/15 to-[#c0c0c0]/15 transform -skew-y-5 rotate-1 animate-pulse" style={{animationDuration: '18s'}}></div>
        
        {/* Additional silver highlights */}
        <div className="absolute h-full w-full opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#c0c0c0]/20 via-[#B87333]/15 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#ffffff]/10 to-transparent opacity-25"></div>
        
        {/* Enhanced particle-like elements with brighter white and silver */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div 
              key={i} 
              className={`absolute rounded-full ${i % 3 === 0 ? 'bg-[#E5C5A1]/20' : i % 3 === 1 ? 'bg-[#c0c0c0]/25' : 'bg-[#ffffff]/20'} animate-pulse`}
              style={{
                width: `${Math.random() * 14 + 5}px`,
                height: `${Math.random() * 14 + 5}px`,
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
        
        {/* More elegant diagonal accents with silver and gold */}
        <div className="absolute top-1/4 w-full h-[1px] bg-gradient-to-r from-transparent via-[#c0c0c0]/40 to-transparent transform rotate-[30deg]"></div>
        <div className="absolute bottom-1/3 w-full h-[1px] bg-gradient-to-r from-transparent via-[#ffffff]/30 to-transparent transform -rotate-[25deg]"></div>
        <div className="absolute top-2/3 w-full h-[1px] bg-gradient-to-r from-transparent via-[#E5C5A1]/30 to-transparent transform rotate-[20deg]"></div>
        <div className="absolute top-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#B87333]/25 to-transparent transform -rotate-[15deg]"></div>
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default DashboardBackground;
