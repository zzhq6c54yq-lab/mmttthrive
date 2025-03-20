import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Search, 
  Brain, 
  BookOpen,
  Heart,
  Puzzle,
  Smile,
  Moon, 
  Dumbbell,
  MessageCircle, 
  Calendar,
  Sparkles,
  ListChecks,
  ArrowLeft,
  Filter,
  HandHeart,
  IceCream,
  Star,
  Zap,
  Cake
} from "lucide-react";
import { toolCategories } from "@/data/toolCategories";
import Header from "@/components/layout/Header";
import HomeButton from "@/components/HomeButton";
import { useToast } from "@/hooks/use-toast";

const MentalWellnessTools = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedQualities, setSelectedQualities] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [showPersonalized, setShowPersonalized] = useState<boolean>(false);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [showIcingGame, setShowIcingGame] = useState<boolean>(false);
  const [icingColor, setIcingColor] = useState<string>("#FF88B7");
  const [icingPoints, setIcingPoints] = useState<{x: number, y: number}[]>([]);
  const [completedIcing, setCompletedIcing] = useState<boolean>(false);

  useEffect(() => {
    if (location.state) {
      const { qualities, goals } = location.state as { qualities?: string[], goals?: string[] };
      if (qualities) setSelectedQualities(qualities);
      if (goals) setSelectedGoals(goals);
    }
  }, [location]);

  const generateRecommendations = () => {
    const allSelections = [...selectedQualities, ...selectedGoals];
    if (allSelections.length === 0) {
      return ["Meditation & Mindfulness", "Mood Tracking", "Self-Help Resources"];
    }

    const toolScores = toolCategories.map(tool => {
      const matchCount = tool.keywords.filter(keyword => 
        allSelections.includes(keyword)
      ).length;
      return { title: tool.title, score: matchCount };
    });

    const topTools = toolScores
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(tool => tool.title);

    return topTools;
  };

  const handleGetPersonalizedRecs = () => {
    setRecommendations(generateRecommendations());
    setShowPersonalized(true);
    
    toast({
      title: "Recommendations Ready",
      description: "We've selected tools that match your profile",
    });
  };

  const handleToolSelect = (toolTitle: string) => {
    const toolSlug = toolTitle.toLowerCase().replace(/\s+/g, '-');
    navigate(`/mental-wellness-tools/${toolSlug}`);
    
    toast({
      title: `${toolTitle} Selected`,
      description: "Loading detailed resources and tools...",
    });
  };

  const handleCategorySelect = (categoryId: string) => {
    setActiveCategory(categoryId === activeCategory ? null : categoryId);
    
    if (categoryId !== activeCategory) {
      setCategoryFilter("category");
      setSearchTerm("");
    } else {
      setCategoryFilter("all");
    }
  };

  const handleStartIcingGame = () => {
    setShowIcingGame(true);
    setIcingPoints([]);
    setCompletedIcing(false);
    
    toast({
      title: "Icing Game Started!",
      description: "Decorate the cake by clicking and dragging! Have fun!",
      duration: 5000,
    });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!showIcingGame || completedIcing) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIcingPoints(prev => [...prev, {x, y}]);
    
    if (icingPoints.length > 25) {
      setCompletedIcing(true);
      toast({
        title: "Cake Decorated!",
        description: "Beautiful job! Your cake looks delicious!",
        duration: 3000,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!showIcingGame || completedIcing || e.buttons !== 1) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const lastPoint = icingPoints[icingPoints.length - 1];
    if (lastPoint) {
      const distance = Math.sqrt(Math.pow(x - lastPoint.x, 2) + Math.pow(y - lastPoint.y, 2));
      if (distance > 5) {
        setIcingPoints(prev => [...prev, {x, y}]);
      }
    } else {
      setIcingPoints(prev => [...prev, {x, y}]);
    }
  };

  const filteredTools = toolCategories.filter(tool => {
    const matchesSearch = tool.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeCategory) {
      const matchesCategory = categoryMapping[activeCategory] && 
                             categoryMapping[activeCategory].some(keyword => 
                               tool.keywords.includes(keyword));
      
      const matchesRecommended = categoryFilter !== "recommended" || recommendations.includes(tool.title);
      
      return matchesSearch && matchesCategory && (categoryFilter !== "recommended" || matchesRecommended);
    }
    
    return matchesSearch;
  });

  const categories = [
    { id: "all", label: "All Tools" },
    { id: "recommended", label: "Recommended For You" }
  ];

  const wellnessCategories = [
    { id: "mindfulness", name: "Mindfulness & Meditation", icon: Brain },
    { id: "anxiety-relief", name: "Anxiety Relief", icon: Heart },
    { id: "sleep", name: "Better Sleep", icon: Moon },
    { id: "relationships", name: "Healthy Relationships", icon: MessageCircle },
    { id: "daily-practices", name: "Daily Wellness Practices", icon: Calendar },
    { id: "self-discovery", name: "Self-Discovery", icon: Sparkles }
  ];

  const categoryMapping: Record<string, string[]> = {
    "mindfulness": ["peaceful", "mindful", "present", "focused"],
    "anxiety-relief": ["reducing-anxiety", "managing-stress", "emotional-regulation"],
    "sleep": ["improving-sleep", "peaceful", "balanced"],
    "relationships": ["better-relationships", "setting-boundaries", "empathetic"],
    "daily-practices": ["health-wellness", "balanced", "joyful", "grateful"],
    "self-discovery": ["finding-purpose", "building-confidence", "creative", "resilient"]
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#e9ecef]">
      <Header />
      
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center mb-2">
              <Link to="/" className="text-gray-500 hover:text-gray-700 mr-2">
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <h1 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-[#B87333] to-[#9b87f5] bg-clip-text text-transparent">
                Mental Wellness Tools
              </h1>
            </div>
            <p className="text-gray-600 mt-1">
              Engaging activities to improve your mental wellbeing while having fun
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                type="text" 
                placeholder="Search tools..." 
                className="pl-9 pr-4 w-full md:w-60" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {!showIcingGame && (
              <Button 
                onClick={handleStartIcingGame}
                className="bg-gradient-to-r from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700 gap-1"
              >
                <IceCream className="h-4 w-4" />
                <span>Fun Zone</span>
              </Button>
            )}
          </div>
        </div>

        {showIcingGame && (
          <motion.div 
            className="mb-12 relative overflow-hidden rounded-xl bg-gradient-to-r from-[#F9F5F3] to-[#F5EAE5] p-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white p-6 rounded-lg shadow-md text-center mb-4">
              <h2 className="text-2xl font-bold mb-2 text-gray-800">Cake Decoration Fun!</h2>
              <p className="text-gray-600 mb-4">
                Taking care of your mental health can be fun! Decorate this cake by clicking and dragging to add icing.
              </p>
              <div className="flex justify-center gap-4 mb-4">
                <Button 
                  className="bg-[#FF88B7] hover:bg-[#FF67A0] h-10 w-10 rounded-full p-0"
                  onClick={() => setIcingColor("#FF88B7")}
                  variant={icingColor === "#FF88B7" ? "default" : "outline"}
                />
                <Button 
                  className="bg-[#88B7FF] hover:bg-[#67A0FF] h-10 w-10 rounded-full p-0"
                  onClick={() => setIcingColor("#88B7FF")}
                  variant={icingColor === "#88B7FF" ? "default" : "outline"}
                />
                <Button 
                  className="bg-[#B7FF88] hover:bg-[#A0FF67] h-10 w-10 rounded-full p-0"
                  onClick={() => setIcingColor("#B7FF88")}
                  variant={icingColor === "#B7FF88" ? "default" : "outline"}
                />
                <Button 
                  className="bg-[#FFDD88] hover:bg-[#FFCC67] h-10 w-10 rounded-full p-0"
                  onClick={() => setIcingColor("#FFDD88")}
                  variant={icingColor === "#FFDD88" ? "default" : "outline"}
                />
                <Button 
                  className="bg-[#D088FF] hover:bg-[#C067FF] h-10 w-10 rounded-full p-0"
                  onClick={() => setIcingColor("#D088FF")}
                  variant={icingColor === "#D088FF" ? "default" : "outline"}
                />
              </div>
            </div>
            
            <div 
              className="relative h-[400px] bg-gradient-to-b from-[#FCEEF2] to-[#F9F5F3] rounded-xl shadow-xl overflow-hidden cursor-pointer"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
            >
              <div className="absolute left-1/2 bottom-20 transform -translate-x-1/2 w-[300px] h-[200px] bg-[#F7D3A5] rounded-xl shadow-md">
                <div className="absolute top-0 left-0 right-0 h-[15px] bg-[#FFEAD5] rounded-t-xl"></div>
              </div>
              
              <div className="absolute left-1/2 bottom-[170px] transform -translate-x-1/2 w-[250px] h-[100px] bg-[#F7D3A5] rounded-xl shadow-md">
                <div className="absolute top-0 left-0 right-0 h-[10px] bg-[#FFEAD5] rounded-t-xl"></div>
              </div>
              
              <div className="absolute left-1/2 bottom-[260px] transform -translate-x-1/2 w-[30px] h-[30px] bg-[#FF9B9B] rounded-full shadow-md flex items-center justify-center">
                <Cake className="h-5 w-5 text-white" />
              </div>
              
              {icingPoints.map((point, index) => (
                <motion.div 
                  key={index}
                  className="absolute rounded-full"
                  style={{ 
                    left: point.x, 
                    top: point.y, 
                    backgroundColor: icingColor,
                    width: Math.random() * 10 + 10, 
                    height: Math.random() * 10 + 10,
                    zIndex: 10
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                />
              ))}
              
              {completedIcing && (
                <motion.div 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-xl text-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <div className="mb-2 flex justify-center">
                    <Star className="h-16 w-16 text-yellow-500 animate-pulse" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-800">Wonderful Job!</h3>
                  <p className="text-gray-600 mb-4">Your decorated cake looks amazing! Just like with this fun activity, mental wellness tools can bring joy and satisfaction into your life.</p>
                  <Button 
                    onClick={() => {
                      setShowIcingGame(false);
                      toast({
                        title: "You did great!",
                        description: "Now let's explore our mental wellness tools!"
                      });
                    }}
                    className="bg-gradient-to-r from-[#B87333] to-[#9b87f5] hover:from-[#A76323] hover:to-[#8b77e5]"
                  >
                    Explore Wellness Tools
                  </Button>
                </motion.div>
              )}
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-md mt-4">
              <p className="text-gray-600 text-center">
                <span className="font-medium">Mental wellness can be fun and creative!</span> Just like decorating this cake, 
                taking small, enjoyable steps each day can build toward better mental health.
              </p>
              
              <div className="flex justify-center mt-4">
                <Button 
                  onClick={() => setShowIcingGame(false)}
                  variant="outline"
                  className="mr-2"
                >
                  Close Fun Zone
                </Button>
                <Button 
                  onClick={() => {
                    setIcingPoints([]);
                    setCompletedIcing(false);
                    toast({
                      title: "Fresh Canvas",
                      description: "Start decorating your cake again!"
                    });
                  }}
                  className="bg-[#9b87f5] hover:bg-[#8b77e5]"
                >
                  Reset Decoration
                </Button>
              </div>
            </div>
          </motion.div>
        )}
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-[#1a1a1f] flex items-center">
            <Heart className="w-6 h-6 mr-2 text-[#B87333]" />
            Wellness Categories
          </h2>
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {wellnessCategories.map(category => (
              <motion.div
                key={category.id}
                variants={itemVariants}
              >
                <Button
                  variant="outline"
                  className={`h-auto py-6 w-full flex flex-col items-center justify-center border transition-all duration-300 ${
                    activeCategory === category.id 
                      ? 'border-[#B87333] bg-[#B87333]/5 transform scale-105' 
                      : 'hover:border-[#B87333]/50 hover:scale-105'
                  }`}
                  onClick={() => handleCategorySelect(category.id)}
                >
                  <category.icon className={`h-8 w-8 mb-2 ${
                    activeCategory === category.id ? 'text-[#B87333]' : 'text-gray-600'
                  }`} />
                  <span className="text-center text-sm">{category.name}</span>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="mb-10 bg-gradient-to-r from-[#F1F0FB] to-[#F8E8DD] rounded-xl p-8 text-center">
          <h2 className="text-3xl font-light mb-4">Your Personalized Wellness Journey</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
            Based on your vision board selections, we can recommend tools that align with your goals and desired qualities.
          </p>
          <Button 
            className="bg-[#B87333] hover:bg-[#B87333]/90 px-8 hero-button"
            onClick={handleGetPersonalizedRecs}
          >
            Get Personalized Recommendations
          </Button>
        </div>

        {showPersonalized && (
          <motion.div 
            className="mb-10 bg-[#F1F0FB] rounded-xl p-8 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#B87333]/10 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#9b87f5]/10 to-transparent rounded-full blur-3xl"></div>
            
            <h2 className="text-3xl font-light mb-6 text-center bg-gradient-to-r from-[#B87333] to-[#9b87f5] bg-clip-text text-transparent">
              Your Personalized Recommendations
            </h2>
            <p className="text-lg mb-8 text-center">
              Based on your vision board selections, we recommend these tools for your wellness journey:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendations.map((toolTitle, index) => {
                const tool = toolCategories.find(t => t.title === toolTitle);
                if (!tool) return null;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <Card className="feature-card border-[#B87333]/30 bg-white/80 hover:shadow-md transition-all h-full flex flex-col">
                      <CardHeader className="pb-2">
                        <div className="rounded-full bg-[#B87333]/10 w-10 h-10 flex items-center justify-center mb-3">
                          <tool.icon className="h-5 w-5 text-[#B87333]" />
                        </div>
                        <CardTitle className="text-xl">{tool.title}</CardTitle>
                        <CardDescription className="text-gray-600">{tool.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <ul className="space-y-1 text-sm text-gray-600">
                          {tool.features.slice(0, 2).map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-1">
                              <Zap className="h-3 w-3 mt-1 text-[#B87333]" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button 
                          className="w-full bg-[#B87333] hover:bg-[#B87333]/90 text-sm hero-button"
                          onClick={() => handleToolSelect(tool.title)}
                        >
                          {tool.cta}
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search tools..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B87333]/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setCategoryFilter(category.id)}
                variant={categoryFilter === category.id ? "default" : "outline"}
                className={categoryFilter === category.id ? "bg-[#B87333] hover:bg-[#B87333]/90" : ""}
                disabled={category.id === "recommended" && recommendations.length === 0}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredTools.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              onMouseEnter={() => setHoveredCardId(category.title)}
              onMouseLeave={() => setHoveredCardId(null)}
              whileHover={{ y: -5 }}
            >
              <Card 
                className={`feature-card overflow-hidden border-border/50 hover:border-[#B87333]/50 transition-all hover:shadow-lg ${
                  recommendations.includes(category.title) ? "ring-2 ring-[#B87333]/30" : ""
                }`}
              >
                <CardHeader className={`pb-4 transition-colors duration-500 ${
                  hoveredCardId === category.title ? 'bg-gradient-to-r from-white to-[#B87333]/5' : ''
                }`}>
                  <div className="rounded-full bg-[#B87333]/10 w-12 h-12 flex items-center justify-center mb-4">
                    <category.icon className={`h-6 w-6 text-[#B87333] ${
                      hoveredCardId === category.title ? 'animate-bounce' : ''
                    }`} />
                  </div>
                  <CardTitle className="text-2xl">{category.title}</CardTitle>
                  <CardDescription className="text-base">{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {category.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <span className="text-[#B87333] mr-2 text-lg">•</span>
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full bg-[#B87333] hover:bg-[#B87333]/90 hero-button"
                    onClick={() => handleToolSelect(category.title)}
                  >
                    {category.cta}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filteredTools.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">No matching tools found. Try adjusting your search.</p>
          </div>
        )}
        
        <div className="mt-20 bg-gradient-to-r from-[#1E1E2D]/90 to-[#2D2D3D]/90 backdrop-blur-sm rounded-xl p-6 border border-[#9b87f5]/20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-60 h-60 bg-gradient-to-br from-[#9b87f5]/20 to-transparent rounded-full blur-3xl -z-10"></div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl font-medium mb-4 text-white">See Your Personalized Recommendations</h2>
            <p className="text-white/80 mb-6 max-w-3xl mx-auto">
              Visit your Personalized Content section to discover mental wellness tools and resources specifically tailored to your preferences and goals.
            </p>
            <Button 
              onClick={() => navigate("/personalized-content", { 
                state: { 
                  qualities: selectedQualities, 
                  goals: selectedGoals 
                } 
              })}
              className="bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:from-[#8b77e5] hover:to-[#6E59A5] text-white px-8"
            >
              View Personalized Content
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MentalWellnessTools;
