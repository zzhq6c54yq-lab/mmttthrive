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

const toolCategories = [
  {
    title: "Mood Tracking",
    description: "Log and track your daily moods, emotions, and triggers to identify patterns.",
    icon: BarChart4,
    features: [
      "Daily mood check-ins",
      "Emotion pattern analysis",
      "Trigger identification",
      "Progress visualization",
      "Customizable mood scales"
    ],
    cta: "Start Tracking",
    keywords: ["emotional-regulation", "reducing-anxiety", "managing-stress", "mindful", "present", "balanced"]
  },
  {
    title: "Meditation & Mindfulness",
    description: "Guided sessions and exercises to help reduce stress and improve focus.",
    icon: Brain,
    features: [
      "Guided meditation sessions",
      "Breathing exercises",
      "Body scan practices",
      "Present-moment awareness",
      "Mindful movement guides"
    ],
    cta: "Begin Practice",
    keywords: ["peaceful", "managing-stress", "focused", "improving-sleep", "present", "mindful", "balanced"]
  },
  {
    title: "CBT Techniques",
    description: "Cognitive Behavioral Therapy tools to identify and reframe negative thoughts.",
    icon: ScrollText,
    features: [
      "Thought records",
      "Cognitive restructuring exercises",
      "Behavioral activation",
      "Core belief worksheets",
      "Cognitive distortion guides"
    ],
    cta: "Start Reframing",
    keywords: ["emotional-regulation", "reducing-anxiety", "building-confidence", "resilient"]
  },
  {
    title: "Anxiety Management",
    description: "Practical tools and techniques to manage anxiety symptoms.",
    icon: HeartPulse,
    features: [
      "Panic attack guides",
      "Grounding techniques",
      "Worry postponement",
      "Exposure planning",
      "Safety behaviors recognition"
    ],
    cta: "Manage Anxiety",
    keywords: ["reducing-anxiety", "managing-stress", "focused", "present", "balanced"]
  },
  {
    title: "Sleep Improvement",
    description: "Resources and routines to enhance sleep quality and overcome insomnia.",
    icon: Moon,
    features: [
      "Sleep hygiene assessment",
      "Bedtime routine builder",
      "Sleep stories and sounds",
      "Sleep restriction therapy",
      "Relaxation techniques"
    ],
    cta: "Better Sleep",
    keywords: ["improving-sleep", "balanced", "health-wellness", "peaceful"]
  },
  {
    title: "Community Support",
    description: "Forums and groups where you can share experiences and support others.",
    icon: Users,
    features: [
      "Moderated discussion forums",
      "Peer support groups",
      "Topic-based communities",
      "Live group sessions",
      "Success story sharing"
    ],
    cta: "Join Community",
    keywords: ["better-relationships", "grateful", "empathetic", "joyful", "resilient"]
  },
  {
    title: "Self-Help Resources",
    description: "Articles, videos, and tips on various mental health topics.",
    icon: BookOpen,
    features: [
      "Educational articles",
      "Video courses",
      "Recommended reading",
      "Mental health podcasts",
      "Self-assessment tools"
    ],
    cta: "Explore Resources",
    keywords: ["career-growth", "health-wellness", "setting-boundaries", "work-life-balance", "building-confidence"]
  },
  {
    title: "Therapist Connection",
    description: "Connect with licensed professionals for virtual sessions tailored to your needs.",
    icon: MessageCircle,
    features: [
      "Licensed therapist matching",
      "Secure video sessions",
      "Text therapy options",
      "Specialized treatment approaches",
      "Progress tracking with your therapist"
    ],
    cta: "Find a Therapist",
    keywords: ["overcoming-trauma", "emotional-regulation", "reducing-anxiety", "better-relationships"]
  },
  {
    title: "Journaling",
    description: "Space for personal reflections and emotional expression.",
    icon: Pencil,
    features: [
      "Guided journal prompts",
      "Mood-based journaling",
      "Gratitude practice",
      "Dream journaling",
      "Therapy preparation notes"
    ],
    cta: "Start Writing",
    keywords: ["emotional-regulation", "mindful", "creative", "balanced", "grateful"]
  },
  {
    title: "Crisis Support",
    description: "Immediate resources and hotlines for when you need help right away.",
    icon: AlertTriangle,
    features: [
      "24/7 crisis hotlines",
      "Emergency contact management",
      "Crisis text services",
      "Safety planning tools",
      "Local emergency resources"
    ],
    cta: "Access Support",
    keywords: ["reducing-anxiety", "emotional-regulation", "resilient", "empathetic"]
  },
  {
    title: "Exercise & Fitness",
    description: "Physical activity guides specially designed to support mental health.",
    icon: Dumbbell,
    features: [
      "Mood-boosting workouts",
      "Stress-reducing exercises",
      "Anxiety-relieving routines",
      "Mind-body connection activities",
      "Movement tracking"
    ],
    cta: "Get Moving",
    keywords: ["health-wellness", "managing-stress", "balanced", "energetic"]
  },
  {
    title: "Nutrition & Mental Health",
    description: "Guidance on how diet affects mood and mental well-being.",
    icon: LeafyGreen,
    features: [
      "Mood-food connections",
      "Brain-healthy recipes",
      "Nutritional guidance",
      "Meal planning tools",
      "Hydration tracking"
    ],
    cta: "Eat Well",
    keywords: ["health-wellness", "balanced", "energetic", "focused"]
  },
  {
    title: "Goal Setting",
    description: "Tools to set and track personal mental health and wellness goals.",
    icon: ListChecks,
    features: [
      "SMART goal templates",
      "Progress tracking",
      "Habit formation tools",
      "Accountability features",
      "Celebration prompts"
    ],
    cta: "Set Goals",
    keywords: ["career-growth", "building-confidence", "resilient", "focused"]
  },
  {
    title: "Stress Management",
    description: "Comprehensive techniques to deal with stress effectively.",
    icon: FlameKindling,
    features: [
      "Stress assessment",
      "Quick relief techniques",
      "Long-term stress reduction",
      "Burnout prevention",
      "Work-life balance strategies"
    ],
    cta: "Reduce Stress",
    keywords: ["managing-stress", "work-life-balance", "setting-boundaries", "peaceful"]
  },
  {
    title: "Relationship Support",
    description: "Advice and resources for improving personal and professional relationships.",
    icon: HandHeart,
    features: [
      "Communication exercises",
      "Boundary setting guides",
      "Conflict resolution tools",
      "Active listening practice",
      "Empathy building activities"
    ],
    cta: "Improve Connections",
    keywords: ["better-relationships", "setting-boundaries", "empathetic", "joyful"]
  },
  {
    title: "Grief & Loss Support",
    description: "Resources for coping with grief, loss, and bereavement.",
    icon: HeartHandshake,
    features: [
      "Grief education",
      "Coping strategies",
      "Memorial activities",
      "Support finding",
      "Healing rituals"
    ],
    cta: "Find Comfort",
    keywords: ["overcoming-trauma", "resilient", "empathetic", "emotional-regulation"]
  },
  {
    title: "Self-Compassion",
    description: "Practices to cultivate kindness and understanding toward yourself.",
    icon: Heart,
    features: [
      "Self-compassion meditations",
      "Inner critic work",
      "Self-forgiveness exercises",
      "Shame resilience",
      "Self-care planning"
    ],
    cta: "Be Kind to Yourself",
    keywords: ["building-confidence", "peaceful", "grateful", "balanced"]
  },
  {
    title: "Coping Strategies",
    description: "Practical techniques for managing daily challenges and difficulties.",
    icon: Flower,
    features: [
      "Distress tolerance skills",
      "Emotion regulation tools",
      "Problem-solving frameworks",
      "Resilience building",
      "Adaptive coping methods"
    ],
    cta: "Build Resilience",
    keywords: ["resilient", "managing-stress", "reducing-anxiety", "balanced"]
  },
  {
    title: "Psychoeducation",
    description: "Educational resources about mental health conditions and treatments.",
    icon: Landmark,
    features: [
      "Condition information",
      "Treatment explanations",
      "Medication guides",
      "Therapy approaches",
      "Recovery stories"
    ],
    cta: "Learn More",
    keywords: ["health-wellness", "finding-purpose", "resilient", "focused"]
  },
];

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
          <Link to="/" className="inline-flex items-center text-[#B87333] hover:text-[#B87333]/80 mb-6 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-light mb-4 gradient-heading">Mental Wellness Tools</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Evidence-based resources and exercises to support your mental health journey.
          </p>
        </div>
      </div>

      <div className="container px-4 py-12 max-w-6xl mx-auto">
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

        {showPersonalized && (
          <div className="mb-16 bg-[#F1F0FB] rounded-xl p-8 animate-fade-up">
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

        <div className="mt-16 bg-[#F1F0FB] rounded-xl p-8 text-center">
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
      </div>
    </div>
  );
};

export default MentalWellnessTools;
