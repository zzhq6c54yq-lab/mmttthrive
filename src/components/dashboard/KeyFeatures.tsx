
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Activity, BookOpen, Dumbbell, Heart, Users, HandHeart, 
  Brain, BarChart3, Video, Calendar, Headphones, BookText, 
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";

interface KeyFeaturesProps {
  navigateToFeature: (path: string) => void;
  selectedQualities?: string[];
  selectedGoals?: string[];
}

const KeyFeatures: React.FC<KeyFeaturesProps> = ({ 
  navigateToFeature,
  selectedQualities = [],
  selectedGoals = []
}) => {
  // Helper to check if a feature should be highlighted based on user's qualities and goals
  const isRecommended = (feature: string) => {
    // Map features to relevant qualities and goals
    const featureMap: { [key: string]: string[] } = {
      "progress-reports": ["consistency", "data-driven", "reflective", "goal-oriented"],
      "family-resources": ["supportive", "family-oriented", "compassionate", "community"],
      "mental-wellness": ["mindful", "balanced", "wellness-focused", "creative"],
      "games": ["curious", "analytical", "intellectual", "playful"],
      "physical-wellness": ["active", "energetic", "disciplined", "health-conscious"],
      "community-support": ["social", "collaborative", "communicative", "empathetic"],
      "video-diary": ["reflective", "expressive", "authentic", "introspective"],
      "wellness-challenges": ["motivated", "disciplined", "competitive", "growth-focused"],
      "resource-library": ["curious", "informed", "analytical", "studious"],
      "sponsor-alternative": ["supportive", "recovery-focused", "accountable", "healing"],
      "binaural-beats": ["mindful", "experimental", "relaxation-focused", "open-minded"],
      "workshops": ["engaged", "learning-oriented", "growth-focused", "curious"],
      "journaling": ["reflective", "expressive", "creative", "introspective"]
    };
    
    // Check if any of the user's qualities match the feature's relevant qualities
    const qualityMatch = selectedQualities.some(quality => 
      featureMap[feature] && featureMap[feature].includes(quality.toLowerCase())
    );
    
    // Check if any of the user's goals match the feature
    const goalMatch = selectedGoals.some(goal => 
      goal.toLowerCase().includes(feature.replace('-', ' '))
    );
    
    return qualityMatch || goalMatch;
  };
  
  const handleNavigate = (path: string) => {
    // Pass fromMainMenu flag to new pages for proper back navigation
    navigateToFeature(path);
  };
  
  // Container animation
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Item animation
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="mt-8">
      <h2 className="text-lg md:text-xl font-medium mb-5 flex items-center gap-2">
        <span className="p-1 rounded-full bg-[#9b87f5]/10">
          <Heart className="h-5 w-5 text-[#9b87f5]" />
        </span>
        Key Features
      </h2>
      
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3" 
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Original Features */}
        <motion.div variants={item} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-2 p-4 group border-[#9b87f5]/10 ${
              isRecommended("progress-reports")
                ? "bg-gradient-to-br from-[#9b87f5]/20 to-[#6C85DD]/10"
                : "bg-white/5"
            }`}
            onClick={() => handleNavigate('/progress-reports')}
          >
            <div className="p-2 rounded-full bg-white/10 group-hover:bg-[#9b87f5]/20 transition-colors">
              <BarChart3 className="h-5 w-5 text-[#9b87f5]" />
            </div>
            <span className="text-sm font-medium">Progress Reports</span>
            {isRecommended("progress-reports") && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#9b87f5] text-white">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        <motion.div variants={item} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-2 p-4 group border-[#D946EF]/10 ${
              isRecommended("family-resources")
                ? "bg-gradient-to-br from-[#D946EF]/20 to-[#8D65C5]/10"
                : "bg-white/5"
            }`}
            onClick={() => handleNavigate('/family-resources')}
          >
            <div className="p-2 rounded-full bg-white/10 group-hover:bg-[#D946EF]/20 transition-colors">
              <HandHeart className="h-5 w-5 text-[#D946EF]" />
            </div>
            <span className="text-sm font-medium">Family Resources</span>
            {isRecommended("family-resources") && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#D946EF] text-white">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        <motion.div variants={item} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-2 p-4 group border-[#6C85DD]/10 ${
              isRecommended("mental-wellness")
                ? "bg-gradient-to-br from-[#6C85DD]/20 to-[#9b87f5]/10"
                : "bg-white/5"
            }`}
            onClick={() => handleNavigate('/mental-wellness')}
          >
            <div className="p-2 rounded-full bg-white/10 group-hover:bg-[#6C85DD]/20 transition-colors">
              <BookOpen className="h-5 w-5 text-[#6C85DD]" />
            </div>
            <span className="text-sm font-medium">Mental Wellness</span>
            {isRecommended("mental-wellness") && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#6C85DD] text-white">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        <motion.div variants={item} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-2 p-4 group border-[#FF8364]/10 ${
              isRecommended("games")
                ? "bg-gradient-to-br from-[#FF8364]/20 to-[#FF97A1]/10"
                : "bg-white/5"
            }`}
            onClick={() => handleNavigate('/games-and-quizzes')}
          >
            <div className="p-2 rounded-full bg-white/10 group-hover:bg-[#FF8364]/20 transition-colors">
              <Brain className="h-5 w-5 text-[#FF8364]" />
            </div>
            <span className="text-sm font-medium">Brain Games</span>
            {isRecommended("games") && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#FF8364] text-white">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        {/* New Features - Video Diary */}
        <motion.div variants={item} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-2 p-4 group border-[#F59E0B]/10 ${
              isRecommended("video-diary")
                ? "bg-gradient-to-br from-[#F59E0B]/20 to-[#FBBF24]/10"
                : "bg-white/5"
            }`}
            onClick={() => handleNavigate('/video-diary')}
          >
            <div className="p-2 rounded-full bg-white/10 group-hover:bg-[#F59E0B]/20 transition-colors">
              <Video className="h-5 w-5 text-[#F59E0B]" />
            </div>
            <span className="text-sm font-medium">Video Diary</span>
            {isRecommended("video-diary") && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#F59E0B] text-white">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        {/* Wellness Challenges */}
        <motion.div variants={item} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-2 p-4 group border-[#10B981]/10 ${
              isRecommended("wellness-challenges")
                ? "bg-gradient-to-br from-[#10B981]/20 to-[#6EE7B7]/10"
                : "bg-white/5"
            }`}
            onClick={() => handleNavigate('/wellness-challenges')}
          >
            <div className="p-2 rounded-full bg-white/10 group-hover:bg-[#10B981]/20 transition-colors">
              <Activity className="h-5 w-5 text-[#10B981]" />
            </div>
            <span className="text-sm font-medium">Wellness Challenges</span>
            {isRecommended("wellness-challenges") && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#10B981] text-white">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        {/* Resource Library */}
        <motion.div variants={item} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-2 p-4 group border-[#3B82F6]/10 ${
              isRecommended("resource-library")
                ? "bg-gradient-to-br from-[#3B82F6]/20 to-[#93C5FD]/10"
                : "bg-white/5"
            }`}
            onClick={() => handleNavigate('/resource-library')}
          >
            <div className="p-2 rounded-full bg-white/10 group-hover:bg-[#3B82F6]/20 transition-colors">
              <BookOpen className="h-5 w-5 text-[#3B82F6]" />
            </div>
            <span className="text-sm font-medium">Resource Library</span>
            {isRecommended("resource-library") && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#3B82F6] text-white">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        {/* My Sponsor (NA/AA alternative) */}
        <motion.div variants={item} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-2 p-4 group border-[#EC4899]/10 ${
              isRecommended("sponsor-alternative")
                ? "bg-gradient-to-br from-[#EC4899]/20 to-[#F9A8D4]/10"
                : "bg-white/5"
            }`}
            onClick={() => handleNavigate('/my-sponsor')}
          >
            <div className="p-2 rounded-full bg-white/10 group-hover:bg-[#EC4899]/20 transition-colors">
              <Users className="h-5 w-5 text-[#EC4899]" />
            </div>
            <span className="text-sm font-medium">My Sponsor</span>
            {isRecommended("sponsor-alternative") && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#EC4899] text-white">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        {/* Binaural Beats */}
        <motion.div variants={item} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-2 p-4 group border-[#8B5CF6]/10 ${
              isRecommended("binaural-beats")
                ? "bg-gradient-to-br from-[#8B5CF6]/20 to-[#C4B5FD]/10"
                : "bg-white/5"
            }`}
            onClick={() => handleNavigate('/binaural-beats')}
          >
            <div className="p-2 rounded-full bg-white/10 group-hover:bg-[#8B5CF6]/20 transition-colors">
              <Headphones className="h-5 w-5 text-[#8B5CF6]" />
            </div>
            <span className="text-sm font-medium">Binaural Beats</span>
            {isRecommended("binaural-beats") && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#8B5CF6] text-white">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        {/* Workshops */}
        <motion.div variants={item} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-2 p-4 group border-[#059669]/10 ${
              isRecommended("workshops")
                ? "bg-gradient-to-br from-[#059669]/20 to-[#34D399]/10"
                : "bg-white/5"
            }`}
            onClick={() => handleNavigate('/workshops')}
          >
            <div className="p-2 rounded-full bg-white/10 group-hover:bg-[#059669]/20 transition-colors">
              <Calendar className="h-5 w-5 text-[#059669]" />
            </div>
            <span className="text-sm font-medium">Workshops</span>
            {isRecommended("workshops") && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#059669] text-white">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        {/* Journaling */}
        <motion.div variants={item} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-2 p-4 group border-[#0284C7]/10 ${
              isRecommended("journaling")
                ? "bg-gradient-to-br from-[#0284C7]/20 to-[#38BDF8]/10"
                : "bg-white/5"
            }`}
            onClick={() => handleNavigate('/journaling')}
          >
            <div className="p-2 rounded-full bg-white/10 group-hover:bg-[#0284C7]/20 transition-colors">
              <BookText className="h-5 w-5 text-[#0284C7]" />
            </div>
            <span className="text-sm font-medium">Journaling</span>
            {isRecommended("journaling") && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#0284C7] text-white">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        {/* Sleep Therapy */}
        <motion.div variants={item} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-2 p-4 group border-[#7C3AED]/10 ${
              isRecommended("mindfulness")
                ? "bg-gradient-to-br from-[#7C3AED]/20 to-[#A78BFA]/10"
                : "bg-white/5"
            }`}
            onClick={() => handleNavigate('/mindfulness-sleep')}
          >
            <div className="p-2 rounded-full bg-white/10 group-hover:bg-[#7C3AED]/20 transition-colors">
              <Sparkles className="h-5 w-5 text-[#7C3AED]" />
            </div>
            <span className="text-sm font-medium">Mindfulness & Sleep</span>
            {isRecommended("mindfulness") && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#7C3AED] text-white">Recommended</span>
            )}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default KeyFeatures;
