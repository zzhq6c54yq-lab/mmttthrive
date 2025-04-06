
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
import { Game, gamesData } from "@/data/gamesData";
import GamesSection from "@/components/games-and-quizzes/GamesSection";
import QuizzesSection from "@/components/games-and-quizzes/QuizzesSection";
import GameInstructionsDialog from "@/components/games-and-quizzes/GameInstructionsDialog";
import GamePlayDialog from "@/components/games-and-quizzes/GamePlayDialog";
import GameComponentSelector from "@/components/games-and-quizzes/GameComponentSelector";

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
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [gameInstructionsOpen, setGameInstructionsOpen] = useState(false);
  const [gamePlayOpen, setGamePlayOpen] = useState(false);
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    let filtered = [...gamesData];
    
    if (difficultyFilter !== "all") {
      filtered = filtered.filter(game => game.difficulty === difficultyFilter);
    }
    
    if (typeFilter !== "all") {
      filtered = filtered.filter(game => game.type === typeFilter);
    }
    
    setFilteredGames(filtered);
  }, [difficultyFilter, typeFilter]);

  useEffect(() => {
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
    
    setQuizzes(quizzesData);
    setFilteredGames(gamesData);
  }, []);

  const handleStartGame = (game: Game) => {
    setActiveGame(game);
    setGameInstructionsOpen(true);
  };

  const handleStartQuiz = (quiz: Quiz) => {
    toast({
      title: `Starting ${quiz.title}`,
      description: "Preparing your assessment...",
      duration: 1500,
    });
    
    setTimeout(() => {
      toast({
        title: "Assessment Feature",
        description: "This feature is coming soon!",
        duration: 3000,
      });
    }, 1500);
  };
  
  const handlePlayGame = () => {
    setGameInstructionsOpen(false);
    setGamePlayOpen(true);
  };
  
  const handleGameComplete = (score: number) => {
    setGamePlayOpen(false);
    
    if (activeGame) {
      toast({
        title: "Game Completed!",
        description: `You scored ${score} points in ${activeGame.title}`,
        duration: 3000,
      });
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
              onClick={() => navigate("/home")}
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
          </div>
          
          <TabsContent value="games" className="mt-0">
            <GamesSection 
              filteredGames={filteredGames}
              difficultyFilter={difficultyFilter}
              typeFilter={typeFilter}
              setDifficultyFilter={setDifficultyFilter}
              setTypeFilter={setTypeFilter}
              onStartGame={handleStartGame}
            />
          </TabsContent>
          
          <TabsContent value="quizzes" className="mt-0">
            <QuizzesSection 
              quizzes={quizzes} 
              onStartQuiz={handleStartQuiz}
            />
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Game Instructions Dialog */}
      <GameInstructionsDialog
        open={gameInstructionsOpen}
        onOpenChange={setGameInstructionsOpen}
        activeGame={activeGame}
        onPlayGame={handlePlayGame}
      />
      
      {/* Game Play Dialog */}
      <GamePlayDialog
        open={gamePlayOpen}
        onOpenChange={setGamePlayOpen}
        activeGame={activeGame}
        onClose={() => setGamePlayOpen(false)}
        gameComponent={
          activeGame ? (
            <GameComponentSelector 
              activeGame={activeGame} 
              onComplete={handleGameComplete} 
            />
          ) : null
        }
      />
    </div>
  );
};

export default GamesAndQuizzes;
