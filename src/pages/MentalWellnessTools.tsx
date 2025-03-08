import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { 
  ArrowLeft, 
  BarChart4, 
  Brain, 
  MessageCircle, 
  AlertTriangle, 
  BookOpen, 
  Users,
  Moon,
  Dumbbell,
  LeafyGreen,
  ListChecks,
  FlameKindling,
  HandHeart,
  Flower,
  Heart,
  HeartPulse,
  Landmark,
  Pencil,
  HeartHandshake,
  ScrollText
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { toolCategories } from "@/data/toolCategories";
import HomeButton from "@/components/HomeButton";

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

  const filteredTools = toolCategories.filter(tool => {
    const matchesSearch = tool.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || recommendations.includes(tool.title);
    
    return matchesSearch && (categoryFilter === "recommended" ? recommendations.includes(tool.title) : true);
  });

  const categories = [
    { id: "all", label: "All Tools" },
    { id: "recommended", label: "Recommended For You" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#1a1a1f] text-white py-12 relative overflow-hidden">
        <div className="floating-bg animate-pulse"></div>
        <div className="container px-4 max-w-6xl mx-auto relative z-10">
          <div className="flex justify-between items-center mb-6">
            <Link to="/" className="inline-flex items-center text-[#B87333] hover:text-[#B87333]/80 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <HomeButton />
          </div>
          <h1 className="text-4xl md:text-5xl font-light mb-4 gradient-heading">Mental Wellness Tools</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Evidence-based resources and exercises to support your mental health journey.
          </p>
        </div>
      </div>

      <div className="container px-4 py-12 max-w-6xl mx-auto">
        <div className="mb-10 bg-[#F1F0FB] rounded-xl p-8 text-center">
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
          <div className="mb-10 bg-[#F1F0FB] rounded-xl p-8 animate-fade-up">
            <h2 className="text-3xl font-light mb-6 text-center">Your Personalized Recommendations</h2>
            <p className="text-lg mb-8 text-center">
              Based on your vision board selections, we recommend these tools for your wellness journey:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendations.map((toolTitle, index) => {
                const tool = toolCategories.find(t => t.title === toolTitle);
                if (!tool) return null;
                
                return (
                  <Card key={index} className="feature-card border-[#B87333]/30 bg-white/80 hover:shadow-md transition-all">
                    <CardHeader className="pb-2">
                      <div className="rounded-full bg-[#B87333]/10 w-10 h-10 flex items-center justify-center mb-3">
                        <tool.icon className="h-5 w-5 text-[#B87333]" />
                      </div>
                      <CardTitle className="text-xl">{tool.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm mb-4">{tool.description}</p>
                      <Button 
                        className="w-full bg-[#B87333] hover:bg-[#B87333]/90 text-sm hero-button"
                        onClick={() => handleToolSelect(tool.title)}
                      >
                        {tool.cta}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search tools..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B87333]/50"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTools.map((category, index) => (
            <Card key={index} 
              className={`feature-card overflow-hidden border-border/50 hover:border-[#B87333]/50 transition-all hover:shadow-md ${
                recommendations.includes(category.title) ? "ring-2 ring-[#B87333]/30" : ""
              }`}
            >
              <CardHeader className="pb-4">
                <div className="rounded-full bg-[#B87333]/10 w-12 h-12 flex items-center justify-center mb-4">
                  <category.icon className="h-6 w-6 text-[#B87333]" />
                </div>
                <CardTitle className="text-2xl">{category.title}</CardTitle>
                <CardDescription className="text-base">{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {category.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <span className="text-[#B87333] mr-2">•</span>
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
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">No matching tools found. Try adjusting your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentalWellnessTools;
