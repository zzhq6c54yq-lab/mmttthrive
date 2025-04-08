
import React from "react";

const DashboardBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f3e9] via-[#f5efe3] to-[#f2ebdc] text-gray-700 pt-6 pb-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Warm-toned texture and gradient background */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23F6D9A7%22 fill-opacity=%220.15%22/></svg>')] opacity-50"></div>
        <div className="absolute top-[-20%] right-[-10%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-[#E5C5A1]/20 to-transparent blur-3xl"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[80%] h-[80%] rounded-full bg-gradient-to-tr from-[#FFA28A]/20 to-transparent blur-3xl"></div>
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-[#E5C5A1]/15 via-[#FFA28A]/18 to-[#E5C5A1]/15 transform -skew-y-3"></div>
        <div className="absolute top-10 left-0 right-0 h-32 bg-gradient-to-r from-[#FCE2CB]/15 via-[#E5C5A1]/18 to-[#FCE2CB]/15 transform skew-y-2" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-r from-[#E5C5A1]/15 via-[#FFA28A]/18 to-[#E5C5A1]/15 transform -skew-y-2"></div>
      </div>
      {children}
    </div>
  );
};

export default DashboardBackground;
