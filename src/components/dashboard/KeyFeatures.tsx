
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Activity, BookOpen, Dumbbell, Heart, Users, HandHeart, 
  Brain, BarChart3, Video, Calendar, Headphones, BookText, 
  Sparkles, MessageCircle, Leaf, Rocket, Globe
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
      "journaling": ["reflective", "expressive", "creative", "introspective"],
      "real-time-therapy": ["communicative", "open", "healing-focused", "expressive"],
      "holistic-wellness": ["balanced", "holistic", "natural", "wellness-focused"],
      "alternative-therapies": ["experimental", "open-minded", "holistic", "healing-focused"]
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
      <h2 className="text-xl md:text-2xl font-semibold mb-5 flex items-center gap-2 text-white">
        <span className="p-1 rounded-full bg-[#9b87f5]/20">
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
        {/* Progress Reports */}
        <motion.div variants={item} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-2 p-4 group border-transparent ${
              isRecommended("progress-reports")
                ? "bg-gradient-to-br from-[#9b87f5] to-[#6C85DD]"
                : "bg-gradient-to-br from-[#9b87f5]/80 to-[#6C85DD]/80"
            }`}
            onClick={() => handleNavigate('/progress-reports')}
          >
            <div className="p-2 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <span className="text-sm font-medium text-white">Progress Reports</span>
            {isRecommended("progress-reports") && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/30 text-white">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        {/* Family Resources */}
        <motion.div variants={item} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-2 p-4 group border-transparent ${
              isRecommended("family-resources")
                ? "bg-gradient-to-br from-[#D946EF] to-[#8D65C5]"
                : "bg-gradient-to-br from-[#D946EF]/80 to-[#8D65C5]/80"
            }`}
            onClick={() => handleNavigate('/family-resources')}
          >
            <div className="p-2 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
              <HandHeart className="h-5 w-5 text-white" />
            </div>
            <span className="text-sm font-medium text-white">Family Resources</span>
            {isRecommended("family-resources") && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/30 text-white">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        {/* Mental Wellness */}
        <motion.div variants={item} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-2 p-4 group border-transparent ${
              isRecommended("mental-wellness")
                ? "bg-gradient-to-br from-[#6C85DD] to-[#6366F1]"
                : "bg-gradient-to-br from-[#6C85DD]/80 to-[#6366F1]/80"
            }`}
            onClick={() => handleNavigate('/mental-wellness')}
          >
            <div className="p-2 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="text-sm font-medium text-white">Mental Wellness</span>
            {isRecommended("mental-wellness") && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/30 text-white">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        {/* Brain Games */}
        <motion.div variants={item} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-2 p-4 group border-transparent ${
              isRecommended("games")
                ? "bg-gradient-to-br from-[#FF8364] to-[#FF97A1]"
                : "bg-gradient-to-br from-[#FF8364]/80 to-[#FF97A1]/80"
            }`}
            onClick={() => handleNavigate('/games-and-quizzes')}
          >
            <div className="p-2 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="text-sm font-medium text-white">Brain Games</span>
            {isRecommended("games") && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/30 text-white">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        {/* Video Diary */}
        <motion.div variants={item} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-2 p-4 group border-transparent ${
              isRecommended("video-diary")
                ? "bg-gradient-to-br from-[#F59E0B] to-[#FBBF24]"
                : "bg-gradient-to-br from-[#F59E0B]/80 to-[#FBBF24]/80"
            }`}
            onClick={() => handleNavigate('/video-diary')}
          >
            <div className="p-2 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
              <Video className="h-5 w-5 text-white" />
            </div>
            <span className="text-sm font-medium text-white">Video Diary</span>
            {isRecommended("video-diary") && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/30 text-white">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        {/* Wellness Challenges */}
        <motion.div variants={item} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-2 p-4 group border-transparent ${
              isRecommended("wellness-challenges")
                ? "bg-gradient-to-br from-[#10B981] to-[#6EE7B7]"
                : "bg-gradient-to-br from-[#10B981]/80 to-[#6EE7B7]/80"
            }`}
            onClick={() => handleNavigate('/wellness-challenges')}
          >
            <div className="p-2 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <span className="text-sm font-medium text-white">Wellness Challenges</span>
            {isRecommended("wellness-challenges") && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/30 text-white">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        {/* Resource Library */}
        <motion.div variants={item} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-2 p-4 group border-transparent ${
              isRecommended("resource-library")
                ? "bg-gradient-to-br from-[#3B82F6] to-[#93C5FD]"
                : "bg-gradient-to-br from-[#3B82F6]/80 to-[#93C5FD]/80"
            }`}
            onClick={() => handleNavigate('/resource-library')}
          >
            <div className="p-2 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
              <BookText className="h-5 w-5 text-white" />
            </div>
            <span className="text-sm font-medium text-white">Resource Library</span>
            {isRecommended("resource-library") && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/30 text-white">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        {/* My Sponsor (NA/AA alternative) */}
        <motion.div variants={item} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-2 p-4 group border-transparent ${
              isRecommended("sponsor-alternative")
                ? "bg-gradient-to-br from-[#EC4899] to-[#F9A8D4]"
                : "bg-gradient-to-br from-[#EC4899]/80 to-[#F9A8D4]/80"
            }`}
            onClick={() => handleNavigate('/my-sponsor')}
          >
            <div className="p-2 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
              <Users className="h-5 w-5 text-white" />
            </div>
            <span className="text-sm font-medium text-white">My Sponsor</span>
            {isRecommended("sponsor-alternative") && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/30 text-white">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        {/* Binaural Beats */}
        <motion.div variants={item} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-2 p-4 group border-transparent ${
              isRecommended("binaural-beats")
                ? "bg-gradient-to-br from-[#8B5CF6] to-[#C4B5FD]"
                : "bg-gradient-to-br from-[#8B5CF6]/80 to-[#C4B5FD]/80"
            }`}
            onClick={() => handleNavigate('/binaural-beats')}
          >
            <div className="p-2 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
              <Headphones className="h-5 w-5 text-white" />
            </div>
            <span className="text-sm font-medium text-white">Binaural Beats</span>
            {isRecommended("binaural-beats") && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/30 text-white">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        {/* Workshops */}
        <motion.div variants={item} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-2 p-4 group border-transparent ${
              isRecommended("workshops")
                ? "bg-gradient-to-br from-[#059669] to-[#34D399]"
                : "bg-gradient-to-br from-[#059669]/80 to-[#34D399]/80"
            }`}
            onClick={() => handleNavigate('/workshops')}
          >
            <div className="p-2 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <span className="text-sm font-medium text-white">Workshops</span>
            {isRecommended("workshops") && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/30 text-white">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        {/* Journaling */}
        <motion.div variants={item} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-2 p-4 group border-transparent ${
              isRecommended("journaling")
                ? "bg-gradient-to-br from-[#0284C7] to-[#38BDF8]"
                : "bg-gradient-to-br from-[#0284C7]/80 to-[#38BDF8]/80"
            }`}
            onClick={() => handleNavigate('/journaling')}
          >
            <div className="p-2 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
              <BookText className="h-5 w-5 text-white" />
            </div>
            <span className="text-sm font-medium text-white">Journaling</span>
            {isRecommended("journaling") && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/30 text-white">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        {/* Mindfulness & Sleep */}
        <motion.div variants={item} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-2 p-4 group border-transparent ${
              isRecommended("mindfulness")
                ? "bg-gradient-to-br from-[#7C3AED] to-[#A78BFA]"
                : "bg-gradient-to-br from-[#7C3AED]/80 to-[#A78BFA]/80"
            }`}
            onClick={() => handleNavigate('/mindfulness-sleep')}
          >
            <div className="p-2 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-sm font-medium text-white">Mindfulness & Sleep</span>
            {isRecommended("mindfulness") && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/30 text-white">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        {/* Real-Time Therapy */}
        <motion.div variants={item} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-2 p-4 group border-transparent ${
              isRecommended("real-time-therapy")
                ? "bg-gradient-to-br from-[#E11D48] to-[#FB7185]"
                : "bg-gradient-to-br from-[#E11D48]/80 to-[#FB7185]/80"
            }`}
            onClick={() => handleNavigate('/real-time-therapy')}
          >
            <div className="p-2 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
              <MessageCircle className="h-5 w-5 text-white" />
            </div>
            <span className="text-sm font-medium text-white">Real-Time Therapy</span>
            {isRecommended("real-time-therapy") && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/30 text-white">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        {/* Holistic Wellness */}
        <motion.div variants={item} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-2 p-4 group border-transparent ${
              isRecommended("holistic-wellness")
                ? "bg-gradient-to-br from-[#65A30D] to-[#A3E635]"
                : "bg-gradient-to-br from-[#65A30D]/80 to-[#A3E635]/80"
            }`}
            onClick={() => handleNavigate('/holistic-wellness')}
          >
            <div className="p-2 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <span className="text-sm font-medium text-white">Holistic Wellness</span>
            {isRecommended("holistic-wellness") && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/30 text-white">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        {/* Alternative Therapies */}
        <motion.div variants={item} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-2 p-4 group border-transparent ${
              isRecommended("alternative-therapies")
                ? "bg-gradient-to-br from-[#0D9488] to-[#5EEAD4]"
                : "bg-gradient-to-br from-[#0D9488]/80 to-[#5EEAD4]/80"
            }`}
            onClick={() => handleNavigate('/alternative-therapies')}
          >
            <div className="p-2 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
              <Rocket className="h-5 w-5 text-white" />
            </div>
            <span className="text-sm font-medium text-white">Alternative Therapies</span>
            {isRecommended("alternative-therapies") && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/30 text-white">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        {/* Community Support */}
        <motion.div variants={item} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-2 p-4 group border-transparent ${
              isRecommended("community-support")
                ? "bg-gradient-to-br from-[#2563EB] to-[#60A5FA]"
                : "bg-gradient-to-br from-[#2563EB]/80 to-[#60A5FA]/80"
            }`}
            onClick={() => handleNavigate('/community-support')}
          >
            <div className="p-2 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
              <Globe className="h-5 w-5 text-white" />
            </div>
            <span className="text-sm font-medium text-white">Community Support</span>
            {isRecommended("community-support") && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/30 text-white">Recommended</span>
            )}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default KeyFeatures;
