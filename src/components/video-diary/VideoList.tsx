
import React, { useState } from "react";
import { Video, BookOpen, Heart, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { VideoEntry } from "@/types/video-diary";
import VideoListItem from "./VideoListItem";
import FamilyVideoFeed from "./FamilyVideoFeed";
import { Button } from "@/components/ui/button";

interface VideoListProps {
  personalVideoEntries: VideoEntry[];
  lovedOnesVideoEntries: VideoEntry[];
  onShareVideo: (video: VideoEntry) => void;
  onRecordNew: () => void;
}

const VideoList: React.FC<VideoListProps> = ({ 
  personalVideoEntries, 
  lovedOnesVideoEntries, 
  onShareVideo,
  onRecordNew
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'personal' | 'loved-ones' | 'family-feed'>('personal');

  const handleViewVideo = (videoId: string) => {
    navigate(`/video-diary/${videoId}`);
  };

  const getActiveVideos = () => {
    return activeTab === 'personal' ? personalVideoEntries : lovedOnesVideoEntries;
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="bg-[#2a2a3c]/50 backdrop-blur-md rounded-xl p-6 mb-8">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-indigo-500/20 rounded-lg">
            <Video className="h-6 w-6 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Express, Reflect, Connect</h2>
            <p className="text-gray-300">
              Your Video Diary is a powerful tool for self-expression and emotional processing. 
              Record private video reflections for your personal journey or create meaningful 
              messages for loved ones and family members. Studies show that verbally expressing thoughts and feelings 
              can significantly reduce stress and provide clarity during mental health challenges.
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={() => setActiveTab('personal')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeTab === 'personal'
              ? 'bg-indigo-500 text-white'
              : 'bg-[#3a3a4c]/50 text-gray-300 hover:bg-[#3a3a4c]'
          }`}
        >
          <BookOpen className="h-4 w-4 inline mr-2" />
          Personal Reflections
        </button>
        <button
          onClick={() => setActiveTab('loved-ones')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeTab === 'loved-ones'
              ? 'bg-pink-500 text-white'
              : 'bg-[#3a3a4c]/50 text-gray-300 hover:bg-[#3a3a4c]'
          }`}
        >
          <Heart className="h-4 w-4 inline mr-2" />
          For My Loved Ones
        </button>
        <button
          onClick={() => setActiveTab('family-feed')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeTab === 'family-feed'
              ? 'bg-amber-500 text-white'
              : 'bg-[#3a3a4c]/50 text-gray-300 hover:bg-[#3a3a4c]'
          }`}
        >
          <Users className="h-4 w-4 inline mr-2" />
          Family Feed
        </button>
      </div>
      
      <Button
        onClick={onRecordNew}
        className="mb-10 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl flex items-center text-white font-medium hover:opacity-90 transition-opacity"
      >
        <Video className="mr-2 h-5 w-5" />
        Record New Video Entry
      </Button>
      
      {activeTab === 'family-feed' ? (
        <div className="mb-8">
          <FamilyVideoFeed onWatchVideo={handleViewVideo} />
        </div>
      ) : activeTab === 'loved-ones' ? (
        <div className="bg-[#2a2a3c]/30 backdrop-blur-sm rounded-xl p-5 mb-8">
          <div className="flex items-center mb-3">
            <Users className="h-5 w-5 mr-2 text-pink-400" />
            <h3 className="text-xl font-semibold text-white">Messages for Loved Ones</h3>
          </div>
          <p className="text-gray-300 text-sm">
            Create heartfelt video messages for family members, friends, or support groups to express 
            gratitude, share your journey, or maintain connection during your recovery process. 
            These messages can strengthen your support network and provide emotional comfort during challenging times.
          </p>
          <p className="text-gray-300 text-sm mt-3">
            Research shows that expressing gratitude and appreciation to others not only benefits them but also
            significantly improves your own mental well-being. The act of creating and sharing these messages
            activates the brain's reward centers and releases dopamine and serotonin, promoting feelings of happiness and connection.
          </p>
        </div>
      ) : null}
      
      {activeTab !== 'family-feed' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getActiveVideos().map((entry) => (
            <VideoListItem
              key={entry.id}
              entry={entry}
              onView={handleViewVideo}
              onShare={onShareVideo}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoList;
