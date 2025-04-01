
import React, { useState } from "react";
import { Video, ArrowLeft, Calendar, Clock, Upload, Trash2, Heart, Users, BookOpen } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Page from "@/components/Page";

const VideoDiary: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'personal' | 'loved-ones'>('personal');
  
  const personalVideoEntries = [
    {
      id: "v1",
      title: "Weekly Reflection",
      date: "April 1, 2025",
      duration: "2:45",
      description: "Reflecting on my progress this week and setting goals for next week. This helps me track my journey and stay accountable to myself.",
      thumbnail: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-under-multicolored-lights-32715-large.mp4"
    },
    {
      id: "v2",
      title: "Message for Future Self",
      date: "March 28, 2025",
      duration: "4:12",
      description: "A reminder of my goals and aspirations to watch in six months. These time capsule messages help me see my growth over time.",
      thumbnail: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&w=300&q=80",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-sitting-on-the-floor-and-meditating-42424-large.mp4"
    },
    {
      id: "v3",
      title: "Gratitude Message",
      date: "March 25, 2025",
      duration: "3:30",
      description: "Expressing gratitude for the support I've received from family and friends. Focusing on gratitude improves my mental well-being.",
      thumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-meditating-in-a-fitness-studio-42113-large.mp4"
    },
    {
      id: "v4",
      title: "Therapy Session Thoughts",
      date: "March 20, 2025",
      duration: "5:15",
      description: "Processing my thoughts after today's therapy session. These reflections help me integrate insights from therapy into daily life.",
      thumbnail: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-exercising-in-a-park-with-a-jumping-rope-42526-large.mp4"
    }
  ];
  
  const lovedOnesVideoEntries = [
    {
      id: "v5",
      title: "Birthday Message for Mom",
      date: "March 30, 2025",
      duration: "3:20",
      description: "A special birthday message for my mom to let her know how much I appreciate her support through my mental health journey.",
      thumbnail: "https://images.unsplash.com/photo-1581579438747-104c53633e4d?auto=format&fit=crop&w=300&q=80",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-mother-with-her-little-daughter-eating-a-marshmallow-in-nature-39764-large.mp4"
    },
    {
      id: "v6",
      title: "Anniversary Message",
      date: "March 15, 2025",
      duration: "4:45",
      description: "Sharing my feelings with my partner on our anniversary, expressing gratitude for their support in my recovery.",
      thumbnail: "https://images.unsplash.com/photo-1515552726023-7125c8d07fb1?auto=format&fit=crop&w=300&q=80",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-a-happy-couple-in-love-hugging-each-other-4909-large.mp4"
    },
    {
      id: "v7",
      title: "Update for Support Group",
      date: "March 10, 2025",
      duration: "6:10",
      description: "Sharing my progress and insights with my support group members who have been there through difficult times.",
      thumbnail: "https://images.unsplash.com/photo-1573167243872-43c6433b9d40?auto=format&fit=crop&w=300&q=80",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-group-of-friends-partying-happily-4640-large.mp4"
    }
  ];
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const handleCreateNew = () => {
    toast({
      title: "Video recorder opening",
      description: "Preparing to record a new video entry...",
      duration: 1500
    });
    navigate("/video-diary/new");
  };
  
  const handleViewVideo = (videoId: string) => {
    // In a real app, this would load the specific video
    toast({
      title: "Opening video",
      description: "Loading your video diary entry...",
      duration: 1500
    });
    navigate(`/video-diary/${videoId}`);
  };

  const getActiveVideos = () => {
    return activeTab === 'personal' ? personalVideoEntries : lovedOnesVideoEntries;
  };

  const renderVideoDetail = () => {
    if (id) {
      // Find the video from either personal or loved ones entries
      const video = [...personalVideoEntries, ...lovedOnesVideoEntries].find(v => v.id === id);
      
      if (!video) {
        return (
          <div className="container mx-auto max-w-6xl px-4 py-8">
            <div className="flex items-center mb-6">
              <button onClick={handleBack} className="mr-4 text-gray-400 hover:text-white">
                <ArrowLeft className="h-6 w-6" />
              </button>
              <h1 className="text-3xl font-bold">Video Not Found</h1>
            </div>
            <p className="text-gray-300">The requested video could not be found.</p>
          </div>
        );
      }
      
      return (
        <div className="container mx-auto max-w-6xl px-4 py-8">
          <div className="flex items-center mb-6">
            <button onClick={handleBack} className="mr-4 text-gray-400 hover:text-white">
              <ArrowLeft className="h-6 w-6" />
            </button>
            <h1 className="text-3xl font-bold">{video.title}</h1>
          </div>
          
          <div className="bg-[#2a2a3c]/80 rounded-xl overflow-hidden shadow-xl mb-8">
            <video 
              src={video.videoUrl} 
              controls 
              className="w-full aspect-video"
              poster={video.thumbnail}
            />
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-indigo-400" />
                  <span className="text-gray-300">{video.date}</span>
                  <Clock className="h-5 w-5 ml-4 mr-2 text-indigo-400" />
                  <span className="text-gray-300">{video.duration}</span>
                </div>
                
                <div className="flex space-x-4">
                  <button className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center">
                    <Upload className="h-5 w-5 mr-2" />
                    Share
                  </button>
                  <button className="text-red-400 hover:text-red-300 transition-colors flex items-center">
                    <Trash2 className="h-5 w-5 mr-2" />
                    Delete
                  </button>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3">Description</h3>
              <p className="text-gray-300">{video.description}</p>
            </div>
          </div>
        </div>
      );
    }
    
    return renderVideoList();
  };

  const renderVideoList = () => {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-center mb-6">
          <button onClick={handleBack} className="mr-4 text-gray-400 hover:text-white">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-3xl font-bold">Video Diary</h1>
        </div>
        
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
                messages for loved ones. Studies show that verbally expressing thoughts and feelings 
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
        </div>
        
        <button
          onClick={handleCreateNew}
          className="mb-10 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl flex items-center text-white font-medium hover:opacity-90 transition-opacity"
        >
          <Video className="mr-2 h-5 w-5" />
          Record New Video Entry
        </button>
        
        {activeTab === 'loved-ones' && (
          <div className="bg-[#2a2a3c]/30 backdrop-blur-sm rounded-xl p-5 mb-8">
            <div className="flex items-center mb-3">
              <Users className="h-5 w-5 mr-2 text-pink-400" />
              <h3 className="text-xl font-semibold text-white">Messages for Loved Ones</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Create heartfelt video messages for family members, friends, or support groups to express 
              gratitude, share your journey, or maintain connection during your recovery process. 
              These messages can be shared directly or saved for meaningful occasions.
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getActiveVideos().map((entry) => (
            <div 
              key={entry.id}
              className="bg-[#2a2a3c]/80 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
            >
              <div 
                className="relative cursor-pointer" 
                onClick={() => handleViewVideo(entry.id)}
              >
                <img 
                  src={entry.thumbnail}
                  alt={entry.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <Video className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {entry.duration}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-xl font-semibold text-white">{entry.title}</h3>
                <div className="flex items-center mt-2 mb-3 text-gray-400 text-sm">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{entry.date}</span>
                </div>
                <p className="text-gray-300 text-sm">{entry.description}</p>
                
                <div className="flex mt-4 pt-4 border-t border-gray-700/50 justify-between">
                  <button className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center text-sm">
                    <Upload className="h-4 w-4 mr-1" />
                    Share
                  </button>
                  <button className="text-red-400 hover:text-red-300 transition-colors flex items-center text-sm">
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Page title="Video Diary">
      <div className="min-h-screen bg-gradient-to-b from-[#1a1a20] via-[#252535] to-[#2d2d3d] text-white pb-16">
        {id ? renderVideoDetail() : renderVideoList()}
      </div>
    </Page>
  );
};

export default VideoDiary;
