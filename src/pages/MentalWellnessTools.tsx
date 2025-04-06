import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Brain, Leaf, FileText, Heart, ArrowLeft, BookOpen, 
  Check, BarChart4, Clipboard, Sparkles, Puzzle,
  Smile, MessageSquare, ArrowRight, ChevronRight, Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import HomeButton from "@/components/HomeButton";

// Import sub-components
import AssessmentsTab from "@/components/mental-wellness/AssessmentsTab";
import SelfCareTab from "@/components/mental-wellness/SelfCareTab";
import ResourcesTab from "@/components/mental-wellness/ResourcesTab";

interface LocationState {
  activeTab?: string;
  quizId?: string;
}

const MentalWellnessTools: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState("tools");
  const [currentSkill, setCurrentSkill] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // Access location state for any incoming parameters (like from quizzes)
  useEffect(() => {
    const state = location.state as LocationState | null;
    if (state?.activeTab) {
      setActiveTab(state.activeTab);
    }
    
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [location.state]);
  
  // Daily skill rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSkill((prev) => (prev + 1) % dailySkills.length);
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);
  
  const dailySkills = [
    {
      title: "Deep Breathing",
      description: "Practice 4-7-8 breathing: Inhale for 4 seconds, hold for 7, exhale for 8.",
      icon: <Leaf className="h-5 w-5 text-green-500" />,
      category: "Relaxation"
    },
    {
      title: "Positive Affirmation",
      description: "Repeat to yourself: "I am capable of handling whatever comes my way today."",
      icon: <MessageSquare className="h-5 w-5 text-purple-500" />,
      category: "Positive Thinking"
    },
    {
      title: "Mindful Observation",
      description: "Take 2 minutes to focus on one object. Notice everything about it without judgment.",
      icon: <Sparkles className="h-5 w-5 text-blue-500" />,
      category: "Mindfulness"
    },
    {
      title: "Gratitude Practice",
      description: "Write down three specific things you're grateful for right now.",
      icon: <Heart className="h-5 w-5 text-red-500" />,
      category: "Well-being"
    }
  ];
  
  const quickTools = [
    {
      title: "Breathing Exercise",
      description: "Interactive guided breathing to reduce anxiety in minutes",
      icon: <Leaf className="h-6 w-6 text-green-500" />,
      action: () => navigate("/mental-wellness-tools/breathing"),
      color: "from-green-50 to-emerald-50 border-green-100",
      iconBg: "bg-green-100"
    },
    {
      title: "Thought Reframing",
      description: "Transform negative thoughts with this guided exercise",
      icon: <Brain className="h-6 w-6 text-purple-500" />,
      action: () => navigate("/mental-wellness-tools/reframing"),
      color: "from-purple-50 to-violet-50 border-purple-100",
      iconBg: "bg-purple-100"
    },
    {
      title: "Quick Mood Boost",
      description: "Science-backed activities to lift your spirits in minutes",
      icon: <Smile className="h-6 w-6 text-yellow-500" />,
      action: () => navigate("/mental-wellness-tools/mood-boost"),
      color: "from-yellow-50 to-amber-50 border-yellow-100",
      iconBg: "bg-yellow-100"
    },
    {
      title: "Stress Relief Games",
      description: "Fun interactive games designed to reduce stress",
      icon: <Puzzle className="h-6 w-6 text-blue-500" />,
      action: () => navigate("/games-and-quizzes"),
      color: "from-blue-50 to-sky-50 border-blue-100",
      iconBg: "bg-blue-100"
    }
  ];
  
  const featureCards = [
    {
      title: "Mental Health Tracking",
      description: "Monitor moods, symptoms, and progress over time with visual charts and insights",
      icon: <BarChart4 className="h-6 w-6 text-[#9b87f5]" />,
      path: "/progress-reports"
    },
    {
      title: "Therapy Integration",
      description: "Tools to support your therapy work between sessions",
      icon: <Clipboard className="h-6 w-6 text-blue-500" />,
      path: "/mental-wellness-tools/therapy-support"
    },
    {
      title: "Journal Prompts",
      description: "Guided journaling exercises for reflection and growth",
      icon: <FileText className="h-6 w-6 text-amber-500" />,
      path: "/journaling"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f9fafc] to-[#f3f3f8]">
      {/* Animated background elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-gradient-to-br from-[#9b87f5]/5 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-gradient-to-tr from-[#D946EF]/5 to-transparent blur-3xl"></div>
      </div>
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1a1a1f] to-[#272730] text-white py-12 px-4 relative overflow-hidden">
        <motion.div 
          className="absolute top-[-20%] right-[-10%] w-[40%] h-[70%] rounded-full bg-gradient-to-br from-[#9b87f5]/20 to-transparent blur-3xl"
          animate={{ 
            rotate: [0, 180],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div 
          className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[70%] rounded-full bg-gradient-to-tr from-[#D946EF]/20 to-transparent blur-3xl"
          animate={{ 
            rotate: [0, -180],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", delay: 2 }}
        />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-center justify-between mb-6">
            <Button 
              variant="link" 
              className="text-white hover:text-[#9b87f5] transition-colors p-0 flex items-center"
              onClick={() => navigate("/home")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            <HomeButton />
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-2">
                <Brain className="h-7 w-7 text-[#9b87f5]" />
                Mental Wellness Tools
              </h1>
              <p className="text-gray-300 max-w-xl">
                Interactive tools, assessments, and resources designed to support your mental health journey.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button 
                onClick={() => navigate("/mental-wellness-tools/therapy-support")}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
              >
                <Clipboard className="h-4 w-4 mr-2" />
                Therapy Support
              </Button>
              <Button 
                onClick={() => navigate("/mental-wellness-tools/crisis-resources")}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
              >
                <Heart className="h-4 w-4 mr-2" />
                Crisis Resources
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Daily Skill Card */}
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="-mt-8 mb-8"
        >
          <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div>
                <h3 className="text-sm uppercase text-gray-500 tracking-wider mb-1 flex items-center gap-1">
                  <Activity className="h-4 w-4 text-[#9b87f5]" /> 
                  Daily Mental Wellness Skill
                </h3>
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSkill}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-3 mb-1">
                      <div className="p-2 rounded-full bg-[#9b87f5]/10">
                        {dailySkills[currentSkill].icon}
                      </div>
                      <h2 className="text-xl font-bold">{dailySkills[currentSkill].title}</h2>
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                        {dailySkills[currentSkill].category}
                      </span>
                    </div>
                    <p className="text-gray-600">{dailySkills[currentSkill].description}</p>
                  </motion.div>
                </AnimatePresence>
                
                <div className="flex gap-1 mt-3">
                  {dailySkills.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index === currentSkill ? "bg-[#9b87f5]" : "bg-gray-300"
                      }`}
                      onClick={() => setCurrentSkill(index)}
                    />
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="bg-[#9b87f5] hover:bg-[#8b77e5] text-white">
                  Try This Skill
                </Button>
                <Button variant="outline" className="border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5]/5">
                  View All Daily Skills
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Quick Access Tools */}
      <div className="max-w-6xl mx-auto px-4 mb-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#9b87f5]" />
              Quick Access Tools
            </h2>
            <Button variant="link" className="text-[#9b87f5]" onClick={() => setActiveTab("tools")}>
              View All Tools
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickTools.map((tool, index) => (
              <motion.button
                key={index}
                onClick={tool.action}
                className={`p-4 rounded-lg bg-gradient-to-br ${tool.color} border text-left h-full transition-all hover:shadow-md flex flex-col`}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <div className={`${tool.iconBg} p-2 rounded-full w-fit mb-3`}>
                  {tool.icon}
                </div>
                <h3 className="font-medium text-gray-900 mb-1">{tool.title}</h3>
                <p className="text-sm text-gray-600 flex-grow">{tool.description}</p>
                <div className="flex justify-end mt-3">
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
        
        {/* Features Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10"
        >
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-[#9b87f5]" />
            Featured Resources
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featureCards.map((feature, index) => (
              <motion.div
                key={index}
                className="rounded-lg overflow-hidden border border-gray-200 bg-white transition-all hover:shadow-md"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <div className="h-2 bg-gradient-to-r from-[#9b87f5] to-[#D946EF]"></div>
                <div className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-gray-50 border border-gray-100">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">{feature.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">{feature.description}</p>
                      <Button 
                        variant="link" 
                        className="p-0 h-auto text-[#9b87f5] flex items-center"
                        onClick={() => navigate(feature.path)}
                      >
                        Explore <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Main Tabs Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 relative z-10">
        <Tabs 
          defaultValue={activeTab} 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="w-full"
        >
          <TabsList className="mb-8 max-w-2xl grid grid-cols-3 bg-white/80">
            <TabsTrigger 
              value="tools" 
              className="data-[state=active]:bg-[#9b87f5] data-[state=active]:text-white"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Wellness Tools
            </TabsTrigger>
            <TabsTrigger 
              value="assessments" 
              className="data-[state=active]:bg-[#9b87f5] data-[state=active]:text-white"
            >
              <Clipboard className="h-4 w-4 mr-2" />
              Assessments
            </TabsTrigger>
            <TabsTrigger 
              value="resources" 
              className="data-[state=active]:bg-[#9b87f5] data-[state=active]:text-white"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Resources
            </TabsTrigger>
          </TabsList>
          
          {/* Loading state */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center py-20"
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 border-4 border-t-[#9b87f5] border-r-[#9b87f5]/30 border-b-[#9b87f5]/60 border-l-[#9b87f5]/10 rounded-full animate-spin"></div>
                  <p className="mt-4 text-gray-500">Loading your personalized content...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Tools Tab */}
          <AnimatePresence>
            {!isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <TabsContent value="tools" className="focus:outline-none">
                  <SelfCareTab />
                </TabsContent>
                
                <TabsContent value="assessments" className="focus:outline-none">
                  <AssessmentsTab />
                </TabsContent>
                
                <TabsContent value="resources" className="focus:outline-none">
                  <ResourcesTab />
                </TabsContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Tabs>
      </div>
      
      {/* Get Help Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-10 mb-16 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-[#1a1a1f] to-[#272730] rounded-xl text-white p-8 relative overflow-hidden">
            <motion.div 
              className="absolute top-[-50%] right-[-10%] w-[60%] h-[200%] bg-gradient-to-br from-[#9b87f5]/20 to-transparent rounded-full blur-3xl"
              animate={{ 
                rotate: [0, 180],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
            />
            
            <div className="max-w-3xl relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Need additional support?</h2>
              <p className="text-gray-300 mb-6">
                While these tools can help support your mental wellness journey, they're not a replacement for professional care. 
                If you're experiencing a mental health crisis or need immediate help, please reach out to a qualified professional.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-white text-gray-900 hover:bg-white/90"
                  onClick={() => navigate("/crisis-support")}
                >
                  <Heart className="mr-2 h-4 w-4 text-red-500" />
                  Crisis Resources
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white/50 text-white hover:bg-white/10"
                  onClick={() => navigate("/real-time-therapy")}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Find a Therapist
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Users = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
};

export default MentalWellnessTools;
