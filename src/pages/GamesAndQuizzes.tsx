
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Puzzle, Gamepad2, Brain, Sparkles, ArrowLeft, 
  Trophy, Timer, BarChart4, Heart, Star, ThumbsUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import HomeButton from "@/components/HomeButton";
import WelcomeHeader from "@/components/games-and-quizzes/WelcomeHeader";

// Game interfaces
interface Game {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  timeToComplete: string;
  benefits: string[];
  popular: boolean;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  questionsCount: number;
  timeToComplete: string;
  benefits: string[];
  popular: boolean;
}

const GamesAndQuizzes = () => {
  const [activeTab, setActiveTab] = useState("games");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showPopularOnly, setShowPopularOnly] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [games, setGames] = useState<Game[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Simulated data loading with timeout for animation effect
    const loadData = async () => {
      // Mock game data
      const gamesData: Game[] = [
        {
          id: "memory-match",
          title: "Memory Match",
          description: "Exercise your memory by matching pairs of cards. Great for improving focus and short-term memory.",
          image: "https://images.unsplash.com/photo-1606167068327-eb2cd4a3cf9a?auto=format&fit=crop&w=500&q=80",
          category: "memory",
          difficulty: "medium",
          timeToComplete: "5-10 min",
          benefits: ["Improves memory retention", "Enhances concentration", "Reduces stress"],
          popular: true
        },
        {
          id: "mindful-maze",
          title: "Mindful Maze",
          description: "Navigate through a peaceful maze while practicing mindfulness. Each level becomes more complex as you progress.",
          image: "https://images.unsplash.com/photo-1605106702734-205df224ecce?auto=format&fit=crop&w=500&q=80",
          category: "mindfulness",
          difficulty: "easy",
          timeToComplete: "3-5 min",
          benefits: ["Promotes mindfulness", "Enhances focus", "Helps with anxiety"],
          popular: true
        },
        {
          id: "emotion-sudoku",
          title: "Emotion Sudoku",
          description: "Classic Sudoku with an emotional twist. Complete the puzzle to reveal insights about emotional patterns.",
          image: "https://images.unsplash.com/photo-1566694271453-390536dd1f0d?auto=format&fit=crop&w=500&q=80",
          category: "cognitive",
          difficulty: "hard",
          timeToComplete: "10-15 min",
          benefits: ["Improves logical thinking", "Enhances emotional awareness", "Builds patience"],
          popular: false
        },
        {
          id: "gratitude-garden",
          title: "Gratitude Garden",
          description: "Grow a beautiful garden by listing things you're grateful for. Watch your plants grow with each entry.",
          image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=500&q=80",
          category: "mindfulness",
          difficulty: "easy",
          timeToComplete: "5 min",
          benefits: ["Fosters gratitude practice", "Reduces negative thinking", "Improves mood"],
          popular: true
        },
        {
          id: "breathing-bubbles",
          title: "Breathing Bubbles",
          description: "Pop bubbles in rhythm with guided breathing exercises. A fun way to practice deep breathing techniques.",
          image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=500&q=80",
          category: "mindfulness",
          difficulty: "easy",
          timeToComplete: "3 min",
          benefits: ["Reduces anxiety", "Promotes mindful breathing", "Aids relaxation"],
          popular: false
        },
        {
          id: "mood-tetris",
          title: "Mood Tetris",
          description: "A colorful version of Tetris where blocks represent different emotions. Stack and clear them to create emotional balance.",
          image: "https://images.unsplash.com/photo-1628483233240-45849ee40576?auto=format&fit=crop&w=500&q=80",
          category: "cognitive",
          difficulty: "medium",
          timeToComplete: "10 min",
          benefits: ["Enhances problem solving", "Improves mood regulation", "Develops visual-spatial skills"],
          popular: false
        }
      ];
      
      // Mock quiz data
      const quizzesData: Quiz[] = [
        {
          id: "anxiety-assessment",
          title: "Anxiety Assessment",
          description: "Understand your anxiety levels and get personalized coping strategies based on your results.",
          image: "https://images.unsplash.com/photo-1517837314158-c0af6f92b2d3?auto=format&fit=crop&w=500&q=80",
          category: "mental-health",
          questionsCount: 12,
          timeToComplete: "5-7 min",
          benefits: ["Personalized insights", "Evidence-based assessment", "Practical coping strategies"],
          popular: true
        },
        {
          id: "stress-check",
          title: "Stress Check",
          description: "Quickly assess your current stress levels and identify your main stressors.",
          image: "https://images.unsplash.com/photo-1683734550513-fbcfa87e1380?auto=format&fit=crop&w=500&q=80",
          category: "wellbeing",
          questionsCount: 8,
          timeToComplete: "3-5 min",
          benefits: ["Fast assessment", "Stress trigger identification", "Simple relief techniques"],
          popular: true
        },
        {
          id: "sleep-quality",
          title: "Sleep Quality Index",
          description: "Assess your sleep patterns and get recommendations for improving your sleep hygiene.",
          image: "https://images.unsplash.com/photo-1585645568795-f2d004bff7e8?auto=format&fit=crop&w=500&q=80",
          category: "wellbeing",
          questionsCount: 10,
          timeToComplete: "4-6 min",
          benefits: ["Sleep quality score", "Personalized recommendations", "Sleep tracking insights"],
          popular: false
        },
        {
          id: "resilience-builder",
          title: "Resilience Builder",
          description: "Discover your emotional resilience level and learn how to strengthen it through targeted exercises.",
          image: "https://images.unsplash.com/photo-1584477720014-2ea42a32b969?auto=format&fit=crop&w=500&q=80",
          category: "coping-strategies",
          questionsCount: 15,
          timeToComplete: "7-10 min",
          benefits: ["Resilience score", "Personalized resilience plan", "Regular progress tracking"],
          popular: false
        },
        {
          id: "emotional-intelligence",
          title: "Emotional Intelligence Quiz",
          description: "Evaluate your ability to recognize, understand and manage emotions in yourself and others.",
          image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=500&q=80",
          category: "self-awareness",
          questionsCount: 20,
          timeToComplete: "10-12 min",
          benefits: ["Comprehensive EQ assessment", "Identify strengths & growth areas", "Personalized development plan"],
          popular: true
        },
        {
          id: "relationship-patterns",
          title: "Relationship Patterns",
          description: "Explore your attachment style and relationship patterns to improve connections with others.",
          image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=500&q=80",
          category: "relationships",
          questionsCount: 18,
          timeToComplete: "8-10 min",
          benefits: ["Attachment style identification", "Relationship pattern insights", "Communication improvement tips"],
          popular: false
        }
      ];
      
      setGames(gamesData);
      setQuizzes(quizzesData);
    };
    
    loadData();
  }, []);

  // Filter games based on selected category and popular filter
  const filteredGames = games.filter(game => {
    if (categoryFilter !== "all" && game.category !== categoryFilter) return false;
    if (showPopularOnly && !game.popular) return false;
    return true;
  });

  // Filter quizzes based on selected category and popular filter
  const filteredQuizzes = quizzes.filter(quiz => {
    if (categoryFilter !== "all" && quiz.category !== categoryFilter) return false;
    if (showPopularOnly && !quiz.popular) return false;
    return true;
  });

  const handleStartGame = (game: Game) => {
    setSelectedGame(game);
    toast({
      title: `Starting ${game.title}`,
      description: "Loading your game experience...",
      duration: 1500,
    });
    
    // In a real app, we would navigate to the actual game
    // For this example, we'll just simulate it with a timeout
    setTimeout(() => {
      navigate(`/games/${game.id}`);
    }, 1000);
  };

  const handleStartQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    toast({
      title: `Starting ${quiz.title}`,
      description: "Preparing your assessment...",
      duration: 1500,
    });
    
    // In a real app, we would navigate to the actual quiz
    // For this example, we'll just simulate it with a timeout
    setTimeout(() => {
      navigate(`/quizzes/${quiz.id}`);
    }, 1000);
  };

  const getGameCategories = () => {
    const categories = games.map(game => game.category);
    return ["all", ...new Set(categories)];
  };

  const getQuizCategories = () => {
    const categories = quizzes.map(quiz => quiz.category);
    return ["all", ...new Set(categories)];
  };

  const formatCategory = (category: string) => {
    return category === "all" 
      ? "All Categories" 
      : category.split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
  };

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case "memory":
        return <Brain className="h-4 w-4" />;
      case "mindfulness":
        return <Heart className="h-4 w-4" />;
      case "cognitive":
        return <Trophy className="h-4 w-4" />;
      case "mental-health":
        return <Brain className="h-4 w-4" />;
      case "wellbeing":
        return <Heart className="h-4 w-4" />;
      case "coping-strategies":
        return <ThumbsUp className="h-4 w-4" />;
      case "self-awareness":
        return <Sparkles className="h-4 w-4" />;
      case "relationships":
        return <Heart className="h-4 w-4" />;
      default:
        return <Star className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#eef1f5]">
      <div className="bg-gradient-to-r from-[#1a1a1f] to-[#272730] text-white py-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-full h-full bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2230%22 height=%2230%22 viewBox=%220 0 30 30%22><circle cx=%223%22 cy=%223%22 r=%221%22 fill=%22%23ffffff%22 fill-opacity=%220.05%22/></svg>')] opacity-30"></div>
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-[#9b87f5]/20 to-transparent blur-3xl"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-[#D946EF]/20 to-transparent blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-start justify-between mb-6">
            <Button 
              variant="link" 
              className="text-white hover:text-[#9b87f5] transition-colors p-0 flex items-center"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            <HomeButton />
          </div>
          
          <WelcomeHeader />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <Tabs defaultValue="games" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <TabsList className="h-12">
              <TabsTrigger 
                value="games" 
                className="flex items-center gap-2 px-6 data-[state=active]:bg-[#9b87f5]"
              >
                <Gamepad2 className="h-5 w-5" />
                Games
              </TabsTrigger>
              <TabsTrigger 
                value="quizzes" 
                className="flex items-center gap-2 px-6 data-[state=active]:bg-[#9b87f5]"
              >
                <Brain className="h-5 w-5" />
                Quizzes
              </TabsTrigger>
            </TabsList>
            
            <div className="flex flex-wrap gap-2">
              <div className="flex flex-wrap gap-2">
                {activeTab === "games" ? (
                  getGameCategories().map(category => (
                    <Button
                      key={category}
                      variant={categoryFilter === category ? "default" : "outline"}
                      size="sm"
                      className={`
                        ${categoryFilter === category 
                          ? "bg-[#9b87f5] hover:bg-[#9b87f5]/90" 
                          : "hover:bg-[#9b87f5]/10"}
                      `}
                      onClick={() => setCategoryFilter(category)}
                    >
                      {getCategoryIcon(category)}
                      <span className="ml-1">{formatCategory(category)}</span>
                    </Button>
                  ))
                ) : (
                  getQuizCategories().map(category => (
                    <Button
                      key={category}
                      variant={categoryFilter === category ? "default" : "outline"}
                      size="sm"
                      className={`
                        ${categoryFilter === category 
                          ? "bg-[#9b87f5] hover:bg-[#9b87f5]/90" 
                          : "hover:bg-[#9b87f5]/10"}
                      `}
                      onClick={() => setCategoryFilter(category)}
                    >
                      {getCategoryIcon(category)}
                      <span className="ml-1">{formatCategory(category)}</span>
                    </Button>
                  ))
                )}
              </div>
              
              <Button
                variant={showPopularOnly ? "default" : "outline"}
                size="sm"
                className={`
                  ${showPopularOnly 
                    ? "bg-[#D946EF] hover:bg-[#D946EF]/90" 
                    : "hover:bg-[#D946EF]/10"}
                `}
                onClick={() => setShowPopularOnly(!showPopularOnly)}
              >
                <Star className="h-4 w-4 mr-1" />
                Popular
              </Button>
            </div>
          </div>
          
          <TabsContent value="games" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGames.length > 0 ? (
                filteredGames.map((game, index) => (
                  <motion.div
                    key={game.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group"
                  >
                    <div className="relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all h-full flex flex-col cursor-pointer">
                      {game.popular && (
                        <div className="absolute top-2 right-2 z-10 bg-[#D946EF] text-white text-xs font-medium px-2 py-1 rounded-full flex items-center">
                          <Star className="h-3 w-3 mr-1 fill-white" />
                          Popular
                        </div>
                      )}
                      
                      <div className="relative h-44 overflow-hidden">
                        <img 
                          src={game.image} 
                          alt={game.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <div className="flex justify-between text-white">
                            <div className="flex items-center bg-black/40 backdrop-blur-sm rounded-full px-2 py-1 text-xs">
                              <Timer className="h-3 w-3 mr-1" />
                              {game.timeToComplete}
                            </div>
                            <div className="flex items-center bg-black/40 backdrop-blur-sm rounded-full px-2 py-1 text-xs capitalize">
                              {getCategoryIcon(game.category)}
                              <span className="ml-1">{formatCategory(game.category)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 flex-grow flex flex-col">
                        <h3 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-[#9b87f5] transition-colors">
                          {game.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">{game.description}</p>
                        
                        <div className="mt-auto">
                          <div className="flex items-center justify-between mb-3">
                            <div className="text-sm font-medium text-gray-700">Benefits:</div>
                            <div className="text-xs bg-[#9b87f5]/10 text-[#9b87f5] font-medium px-2 py-0.5 rounded capitalize">
                              {game.difficulty} difficulty
                            </div>
                          </div>
                          <ul className="text-xs text-gray-600 mb-4">
                            {game.benefits.map((benefit, i) => (
                              <li key={i} className="flex items-start mb-1">
                                <div className="text-[#9b87f5] mr-1 mt-0.5">•</div>
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                          
                          <Button 
                            className="w-full bg-[#9b87f5] hover:bg-[#9b87f5]/90 hero-button"
                            onClick={() => handleStartGame(game)}
                          >
                            <Gamepad2 className="mr-2 h-4 w-4" />
                            Play Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <Puzzle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No games found</h3>
                  <p className="text-gray-500 mb-6">Try adjusting your filters or check back later for new games.</p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setCategoryFilter("all");
                      setShowPopularOnly(false);
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="quizzes" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredQuizzes.length > 0 ? (
                filteredQuizzes.map((quiz, index) => (
                  <motion.div
                    key={quiz.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group"
                  >
                    <div className="relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all h-full flex flex-col cursor-pointer">
                      {quiz.popular && (
                        <div className="absolute top-2 right-2 z-10 bg-[#D946EF] text-white text-xs font-medium px-2 py-1 rounded-full flex items-center">
                          <Star className="h-3 w-3 mr-1 fill-white" />
                          Popular
                        </div>
                      )}
                      
                      <div className="relative h-44 overflow-hidden">
                        <img 
                          src={quiz.image} 
                          alt={quiz.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <div className="flex justify-between text-white">
                            <div className="flex items-center bg-black/40 backdrop-blur-sm rounded-full px-2 py-1 text-xs">
                              <BarChart4 className="h-3 w-3 mr-1" />
                              {quiz.questionsCount} questions
                            </div>
                            <div className="flex items-center bg-black/40 backdrop-blur-sm rounded-full px-2 py-1 text-xs capitalize">
                              {getCategoryIcon(quiz.category)}
                              <span className="ml-1">{formatCategory(quiz.category)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 flex-grow flex flex-col">
                        <h3 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-[#9b87f5] transition-colors">
                          {quiz.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">{quiz.description}</p>
                        
                        <div className="mt-auto">
                          <div className="flex items-center justify-between mb-3">
                            <div className="text-sm font-medium text-gray-700">Benefits:</div>
                            <div className="text-xs bg-[#9b87f5]/10 text-[#9b87f5] font-medium px-2 py-0.5 rounded flex items-center">
                              <Timer className="h-3 w-3 mr-1" />
                              {quiz.timeToComplete}
                            </div>
                          </div>
                          <ul className="text-xs text-gray-600 mb-4">
                            {quiz.benefits.map((benefit, i) => (
                              <li key={i} className="flex items-start mb-1">
                                <div className="text-[#9b87f5] mr-1 mt-0.5">•</div>
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                          
                          <Button 
                            className="w-full bg-[#9b87f5] hover:bg-[#9b87f5]/90 hero-button"
                            onClick={() => handleStartQuiz(quiz)}
                          >
                            <Brain className="mr-2 h-4 w-4" />
                            Start Assessment
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <Brain className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No quizzes found</h3>
                  <p className="text-gray-500 mb-6">Try adjusting your filters or check back later for new assessments.</p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setCategoryFilter("all");
                      setShowPopularOnly(false);
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GamesAndQuizzes;
