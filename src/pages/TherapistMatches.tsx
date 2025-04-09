
import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, Calendar, MessageCircle, Star, Award, Clock, 
  Check, Shield, Medal, ThumbsUp, Heart, Sparkles, Leaf,
  Brain, HeartHandshake, CloudRain, Smile, BookOpen, Lightbulb
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import HomeButton from "@/components/HomeButton";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Therapist {
  id: number;
  name: string;
  specialty: string;
  approach: string;
  bio: string;
  image: string;
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    }
  }
};

const TherapistMatches = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("best-matches");
  const [showIntro, setShowIntro] = useState(true);
  
  // Get data from location state
  const { answers, personalAnswers, matches, fromMilitary } = location.state as { 
    answers: Record<string, string | string[]>,
    personalAnswers: Record<string, string | string[]>,
    matches: Therapist[],
    fromMilitary: boolean
  } || { 
    answers: {}, 
    personalAnswers: {},
    matches: [],
    fromMilitary: false
  };

  useEffect(() => {
    // Auto-hide intro after 6 seconds
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 6000);
    
    return () => clearTimeout(timer);
  }, []);

  // Redirect if no matches
  if (!matches || matches.length === 0) {
    navigate("/therapist-questionnaire");
    return null;
  }

  const handleSchedule = (therapistId: number, therapistName: string) => {
    toast({
      title: "Consultation Scheduled",
      description: `Your initial consultation with ${therapistName} is being arranged. We'll confirm via email shortly.`,
      duration: 3000
    });
  };

  const handleSendMessage = (therapistId: number, therapistName: string) => {
    toast({
      title: "Message Sent",
      description: `Your message has been sent to ${therapistName}. They typically respond within 24-48 hours.`,
      duration: 3000
    });
  };

  const handleViewProfile = (therapistId: number) => {
    toast({
      title: "Viewing Full Profile",
      description: "Loading complete therapist information and availability.",
      duration: 2000
    });
  };

  // Determine return path
  const returnPath = fromMilitary ? "/department-of-defense" : "/real-time-therapy";
  const returnLabel = fromMilitary ? "Back to Military Portal" : "Back to Real-Time Therapy";

  // Get appropriate icon for category
  const getTherapyIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "anxiety":
        return <CloudRain className="h-4 w-4" />;
      case "depression":
        return <Heart className="h-4 w-4" />;
      case "trauma":
        return <Shield className="h-4 w-4" />;
      case "relationships":
        return <HeartHandshake className="h-4 w-4" />;
      case "self-esteem":
        return <Smile className="h-4 w-4" />;
      case "stress":
        return <Leaf className="h-4 w-4" />;
      case "grief":
        return <BookOpen className="h-4 w-4" />;
      case "life-changes":
        return <Sparkles className="h-4 w-4" />;
      default:
        return <Lightbulb className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f9f9fb] to-white">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png')] opacity-5 bg-center"></div>
        <div className="container px-4 max-w-6xl mx-auto relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="flex justify-between items-center mb-6"
          >
            <Link to={returnPath} className="inline-flex items-center text-white hover:text-purple-200 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {returnLabel}
            </Link>
            <HomeButton />
          </motion.div>
          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-4xl md:text-5xl font-light mb-4"
          >
            Your Therapist Matches
          </motion.h1>
          <motion.p 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-xl text-purple-100 max-w-3xl"
          >
            We've found therapists who specialize in your areas of concern and match your personal preferences. Your journey to healing begins with the right connection.
          </motion.p>
        </div>
      </div>

      <div className="container px-4 py-8 max-w-5xl mx-auto">
        {/* Introduction Card */}
        {showIntro && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-8"
          >
            <Card className="bg-gradient-to-r from-purple-50 to-white border-purple-200 overflow-hidden">
              <div className="p-6">
                <div className="flex gap-4 items-start">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Brain className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-medium mb-2 text-purple-800">Beginning Your Healing Journey</h2>
                    <p className="text-gray-700 mb-2">
                      Finding the right therapist is a crucial step in your mental health journey. We've carefully matched you with professionals based on your specific needs and preferences.
                    </p>
                    <p className="text-gray-600 text-sm">
                      Take your time exploring these matches — finding someone you feel comfortable with is important. Remember, you can always schedule consultations with multiple therapists to find the best fit.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Preference Summary */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-8"
        >
          <Card className="bg-gradient-to-r from-purple-50/70 to-white border-purple-200">
            <div className="p-6">
              <h2 className="text-xl font-medium flex items-center gap-2 mb-4 text-purple-800">
                <Sparkles className="h-5 w-5 text-purple-600" /> 
                What You're Looking For in a Therapist
              </h2>
              <div className="space-y-4">
                {Object.entries(personalAnswers).length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2 text-gray-700">Your personal preferences:</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {personalAnswers['conversation-style'] && (
                        <Badge className="bg-purple-100 hover:bg-purple-200 text-purple-800 border-none">
                          {personalAnswers['conversation-style'] === 'listener' && "Prefers a therapist who listens"}
                          {personalAnswers['conversation-style'] === 'interactive' && "Prefers interactive dialogue"}
                          {personalAnswers['conversation-style'] === 'directive' && "Prefers clear guidance"}
                          {personalAnswers['conversation-style'] === 'challenging' && "Welcomes being challenged"}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
                {Array.isArray(answers['therapy-goals']) && answers['therapy-goals'].length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2 text-gray-700">Your therapy goals:</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {(answers['therapy-goals'] as string[]).map(goal => (
                        <TooltipProvider key={goal}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge className="bg-purple-100 hover:bg-purple-200 text-purple-800 border-none flex items-center gap-1">
                                {getTherapyIcon(goal)}
                                {goal === 'anxiety' && "Managing anxiety"}
                                {goal === 'depression' && "Coping with depression"}
                                {goal === 'trauma' && "Processing trauma"}
                                {goal === 'relationships' && "Improving relationships"}
                                {goal === 'self-esteem' && "Building self-esteem"}
                                {goal === 'stress' && "Reducing stress"}
                                {goal === 'grief' && "Processing grief"}
                                {goal === 'life-changes' && "Navigating changes"}
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Matched with therapists experienced in this area</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ))}
                    </div>
                  </div>
                )}
                {answers['therapy-style'] && (
                  <div>
                    <p className="text-sm font-medium mb-2 text-gray-700">Your preferred therapy style:</p>
                    <Badge className="bg-purple-100 hover:bg-purple-200 text-purple-800 border-none">
                      {answers['therapy-style'] === 'cbt' && "Cognitive Behavioral Therapy"}
                      {answers['therapy-style'] === 'psychodynamic' && "Psychodynamic Approach"}
                      {answers['therapy-style'] === 'humanistic' && "Humanistic Approach"}
                      {answers['therapy-style'] === 'mindfulness' && "Mindfulness-based"}
                      {answers['therapy-style'] === 'integrative' && "Integrative Approach"}
                      {answers['therapy-style'] === 'not-sure' && "Open to suggestions"}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
        
        {/* Tabs */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-8"
        >
          <Tabs defaultValue="best-matches" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 bg-purple-100">
              <TabsTrigger 
                value="best-matches" 
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                Best Matches
              </TabsTrigger>
              <TabsTrigger 
                value="all-therapists" 
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                All Available Therapists
              </TabsTrigger>
            </TabsList>
            <TabsContent value="best-matches" className="pt-6">
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="space-y-6"
              >
                {matches.slice(0, 3).map((therapist) => (
                  <motion.div key={therapist.id} variants={fadeIn}>
                    <TherapistCard 
                      therapist={therapist} 
                      onSchedule={handleSchedule}
                      onMessage={handleSendMessage}
                      onViewProfile={handleViewProfile}
                      isTopMatch={therapist.id === 1}
                      fromMilitary={fromMilitary}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
            <TabsContent value="all-therapists" className="pt-6">
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="space-y-6"
              >
                {matches.map((therapist) => (
                  <motion.div key={therapist.id} variants={fadeIn}>
                    <TherapistCard 
                      therapist={therapist} 
                      onSchedule={handleSchedule}
                      onMessage={handleSendMessage}
                      onViewProfile={handleViewProfile}
                      isTopMatch={false}
                      fromMilitary={fromMilitary}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.6 }}
          className="mt-10 text-center"
        >
          <div className="max-w-lg mx-auto bg-gradient-to-r from-purple-50 to-white p-6 rounded-lg mb-8 border border-purple-100">
            <p className="text-gray-700 mb-3">Haven't found the right match? We can help you refine your search.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => navigate("/therapist-questionnaire")}
                className="border-purple-200 text-purple-700 hover:bg-purple-50"
              >
                Retake Questionnaire
              </Button>
              <Button 
                onClick={() => navigate("/real-time-therapy")}
                className="bg-[#9b87f5] hover:bg-[#7E69AB]"
              >
                Explore More Options
              </Button>
            </div>
          </div>
          
          {/* Testimonial */}
          <div className="max-w-3xl mx-auto mt-16">
            <div className="flex items-center justify-center mb-4">
              {Array(5).fill(0).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              ))}
            </div>
            <p className="text-gray-600 italic text-lg max-w-2xl mx-auto">
              "Finding my therapist through this platform was a turning point in my healing journey. 
              The matching process helped me connect with someone who truly understood my needs."
            </p>
            <div className="mt-4 flex items-center justify-center">
              <Avatar className="h-10 w-10 mr-2">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" />
                <AvatarFallback>S</AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="font-medium text-gray-800">Sarah K.</p>
                <p className="text-sm text-gray-500">Member since 2023</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

interface TherapistCardProps {
  therapist: Therapist;
  onSchedule: (id: number, name: string) => void;
  onMessage: (id: number, name: string) => void;
  onViewProfile: (id: number) => void;
  isTopMatch: boolean;
  fromMilitary: boolean;
}

const TherapistCard: React.FC<TherapistCardProps> = ({ 
  therapist, onSchedule, onMessage, onViewProfile, isTopMatch, fromMilitary 
}) => {
  return (
    <Card className={`hover:shadow-lg transition-shadow relative overflow-hidden ${isTopMatch ? 'border-purple-300' : 'border-gray-200'}`}>
      {isTopMatch && (
        <div className="absolute -top-3 left-6 bg-gradient-to-r from-purple-600 to-[#7E69AB] text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1 shadow-md">
          <Award className="h-3 w-3" /> Top Match
        </div>
      )}
      {fromMilitary && therapist.id === 4 && (
        <div className="absolute -top-3 right-6 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1 shadow-md">
          <Shield className="h-3 w-3" /> Military Experience
        </div>
      )}
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <div className="overflow-hidden rounded-md border-2 border-purple-100">
              <img 
                src={therapist.image} 
                alt={therapist.name}
                className="w-full md:w-40 h-40 object-cover transition-transform hover:scale-105 duration-300"
              />
            </div>
            <div className="mt-3 flex items-center gap-1 justify-center">
              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              <span className="text-sm text-gray-600 ml-1">(48)</span>
            </div>
          </div>
          <div className="flex-grow">
            <h3 className="text-2xl font-medium mb-3 text-gray-800">{therapist.name}</h3>
            
            <div className="mb-4 flex flex-wrap gap-2">
              {therapist.specialty.split(", ").map((spec, i) => (
                <Badge key={i} className="bg-purple-100 hover:bg-purple-200 text-purple-800 border-none">
                  {spec}
                </Badge>
              ))}
            </div>
            
            <p className="text-gray-600 mb-4">
              <span className="font-semibold text-gray-800">Approach:</span> {therapist.approach}
            </p>
            
            <p className="mb-6 text-gray-700">{therapist.bio}</p>
            
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Check className="h-4 w-4 text-green-500" />
                <span>Available for new clients</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Clock className="h-4 w-4 text-gray-400" />
                <span>Responds within 24hrs</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <ThumbsUp className="h-4 w-4 text-blue-500" />
                <span>98% recommendation rate</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button 
                className="bg-[#9b87f5] hover:bg-[#7E69AB]"
                onClick={() => onSchedule(therapist.id, therapist.name)}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Consultation
              </Button>
              <Button 
                variant="outline"
                className="border-purple-200 text-purple-800 hover:bg-purple-50"
                onClick={() => onMessage(therapist.id, therapist.name)}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Separator className="my-0" />
      <div className="flex justify-between items-center p-6 bg-gradient-to-r from-purple-50/30 to-white">
        <div>
          <span className="text-gray-600">Available for: </span>
          <span className="text-gray-800">Video sessions, Phone calls, In-person</span>
        </div>
        <Button
          variant="link" 
          className="text-purple-700 hover:text-purple-900"
          onClick={() => onViewProfile(therapist.id)}
        >
          View Full Profile
        </Button>
      </div>
    </Card>
  );
};

export default TherapistMatches;
