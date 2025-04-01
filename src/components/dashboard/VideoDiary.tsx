
import React, { useState } from "react";
import { Video, Plus, Calendar, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const VideoDiary: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const recentVideos = [
    {
      id: "v1",
      title: "Weekly Reflection",
      date: "April 1, 2025",
      duration: "2:45",
      thumbnail: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "v2",
      title: "Message for Future Self",
      date: "March 28, 2025",
      duration: "4:12",
      thumbnail: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&w=300&q=80"
    }
  ];
  
  const handleCreateNew = () => {
    toast({
      title: "Opening Video Recorder",
      description: "Preparing to record a new video diary entry...",
      duration: 1500
    });
    
    navigate("/video-diary/new");
  };
  
  const handleViewAll = () => {
    navigate("/video-diary");
  };
  
  const handleVideoClick = (id: string) => {
    navigate(`/video-diary/${id}`);
  };
  
  return (
    <div className="mb-12 bg-gradient-to-br from-[#2a2a3c] to-[#1f1f2c] rounded-3xl overflow-hidden shadow-xl">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-5"></div>
        
        <div className="bg-gradient-to-r from-[#F97316]/20 via-[#F59E0B]/20 to-[#F97316]/20 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">Video Diary</h2>
            <Video className="h-6 w-6 text-orange-300" />
          </div>
          
          <p className="text-gray-300 text-sm mb-6">
            Record video messages for yourself or share with family members
          </p>
          
          <button
            onClick={handleCreateNew}
            className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl flex items-center justify-center text-white font-medium mb-6 hover:opacity-90 transition-opacity"
          >
            <Plus className="mr-2 h-5 w-5" />
            Record New Video
          </button>
          
          <div className="space-y-4">
            <h3 className="text-white font-medium flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-orange-300" />
              Recent Recordings
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {recentVideos.map((video) => (
                <div 
                  key={video.id}
                  onClick={() => handleVideoClick(video.id)}
                  className="group cursor-pointer"
                >
                  <div className="relative rounded-lg overflow-hidden mb-2">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-24 object-cover transform transition-transform group-hover:scale-105" 
                    />
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                      {video.duration}
                    </div>
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Video className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h4 className="text-white text-sm font-medium truncate">{video.title}</h4>
                  <p className="text-gray-400 text-xs">{video.date}</p>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={handleViewAll}
            className="mt-6 flex items-center text-orange-300 hover:text-orange-200 text-sm font-medium transition-colors"
          >
            View all recordings
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoDiary;
