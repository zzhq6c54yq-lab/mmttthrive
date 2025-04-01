
import React, { useState } from "react";
import { Calendar, CheckCircle, ArrowRight, Brain, Heart, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const DailyWellnessChallenges: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'wellness' | 'mental'>('wellness');
  
  const wellnessChallenges = [
    {
      id: "meditation",
      title: "10-Minute Mindful Meditation",
      description: "Take a moment to center yourself with a guided meditation",
      icon: Brain,
      completed: true
    },
    {
      id: "gratitude",
      title: "Gratitude Journaling",
      description: "Write down three things you're grateful for today",
      icon: Heart,
      completed: false
    },
    {
      id: "hydration",
      title: "Hydration Tracker",
      description: "Drink 8 glasses of water throughout the day",
      icon: Activity,
      completed: false
    }
  ];
  
  const mentalHealthChallenges = [
    {
      id: "affirmations",
      title: "Positive Affirmations",
      description: "Repeat 5 positive affirmations to yourself",
      icon: Heart,
      completed: false
    },
    {
      id: "stress-relief",
      title: "Stress-Relief Exercise",
      description: "Practice 5 minutes of deep breathing",
      icon: Brain,
      completed: true
    },
    {
      id: "mindful-walk",
      title: "Mindful Walk",
      description: "Take a 15-minute walk focusing on your surroundings",
      icon: Activity,
      completed: false
    }
  ];
  
  const activeChallenges = activeTab === 'wellness' ? wellnessChallenges : mentalHealthChallenges;
  
  const handleViewAll = () => {
    // Pass the active tab to the WellnessChallenges page
    navigate("/wellness-challenges", { state: { initialTab: activeTab } });
  };
  
  const handleChallengeClick = (id: string) => {
    toast({
      title: "Challenge Selected",
      description: "Opening challenge details...",
      duration: 1500
    });
    navigate(`/wellness-challenges/${id}`);
  };
  
  return (
    <div className="mb-12 bg-gradient-to-br from-[#2a2a3c] to-[#1f1f2c] rounded-3xl overflow-hidden shadow-xl">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-5"></div>
        
        <div className="bg-gradient-to-r from-[#8D65C5]/20 via-[#E96DED]/20 to-[#6C85DD]/20 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">Daily Challenges</h2>
            <Calendar className="h-6 w-6 text-indigo-300" />
          </div>
          
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab('wellness')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'wellness'
                  ? 'bg-indigo-500 text-white'
                  : 'bg-[#3a3a4c]/50 text-gray-300 hover:bg-[#3a3a4c]'
              }`}
            >
              Wellness Challenges
            </button>
            <button
              onClick={() => setActiveTab('mental')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'mental'
                  ? 'bg-purple-500 text-white'
                  : 'bg-[#3a3a4c]/50 text-gray-300 hover:bg-[#3a3a4c]'
              }`}
            >
              Mental Health
            </button>
          </div>
          
          <div className="space-y-4">
            {activeChallenges.map((challenge) => (
              <div 
                key={challenge.id}
                className="bg-[#2a2a3c]/80 backdrop-blur-sm rounded-xl p-4 flex items-start hover:bg-[#2a2a3c] transition-all cursor-pointer"
                onClick={() => handleChallengeClick(challenge.id)}
              >
                <div className={`p-2 rounded-lg mr-3 ${challenge.completed ? 'bg-green-500/20' : 'bg-indigo-500/20'}`}>
                  <challenge.icon className={`h-5 w-5 ${challenge.completed ? 'text-green-400' : 'text-indigo-400'}`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-white">{challenge.title}</h3>
                    {challenge.completed && (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    )}
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{challenge.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            onClick={handleViewAll}
            className="mt-6 flex items-center text-indigo-300 hover:text-indigo-200 text-sm font-medium transition-colors"
          >
            View all challenges
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DailyWellnessChallenges;
