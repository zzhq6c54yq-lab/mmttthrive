
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gamepad, HelpCircle, Sparkles, Home } from "lucide-react";
import { gamesData, quizzesData, Game, Quiz } from "@/data/gamesData";
import Header from "@/components/layout/Header";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HomeButton from "@/components/HomeButton";

// Import refactored components
import SearchHeader from "@/components/games-and-quizzes/SearchHeader";
import GamesSection from "@/components/games-and-quizzes/GamesSection";
import QuizzesSection from "@/components/games-and-quizzes/QuizzesSection";
import GameInstructionsDialog from "@/components/games-and-quizzes/GameInstructionsDialog";
import GamePlayDialog from "@/components/games-and-quizzes/GamePlayDialog";
import WelcomeHeader from "@/components/games-and-quizzes/WelcomeHeader";
import GameComponentSelector from "@/components/games-and-quizzes/GameComponentSelector";

const GamesAndQuizzes = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [showGameInstructions, setShowGameInstructions] = useState(false);
  const [selectedGameComponent, setSelectedGameComponent] = useState<React.ReactNode | null>(null);

  // Show the first 5 games and quizzes
  const featuredGames = gamesData.slice(0, 5);
  const featuredQuizzes = quizzesData.slice(0, 5);

  const filteredGames = gamesData.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         game.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = difficultyFilter === "" || difficultyFilter === "all" ? true : game.difficulty === difficultyFilter;
    const matchesType = typeFilter === "" || typeFilter === "all" ? true : game.type === typeFilter;
    
    return matchesSearch && matchesDifficulty && matchesType;
  });

  const filteredQuizzes = quizzesData.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         quiz.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "" || categoryFilter === "all" ? true : quiz.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const handleStartGame = (game: Game) => {
    setActiveGame(game);
    setShowGameInstructions(true);
  };

  const handleStartQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    toast({
      title: "Quiz Starting",
      description: "This functionality is coming soon!",
    });
  };

  const handlePlayGame = () => {
    if (!activeGame) return;
    
    setShowGameInstructions(false);
    setSelectedGameComponent(
      <GameComponentSelector 
        activeGame={activeGame} 
        onComplete={handleGameComplete} 
      />
    );
  };

  const handleGameComplete = (score: number) => {
    toast({
      title: "Game Complete!",
      description: `You've completed ${activeGame?.title} with a score of ${score}!`,
    });
    setSelectedGameComponent(null);
    setActiveGame(null);
  };

  const handleCloseGame = () => {
    setSelectedGameComponent(null);
    setActiveGame(null);
  };

  const handleMainMenu = () => {
    navigate("/", { state: { screenState: 'main' } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0f4f8] via-[#e6eef5] to-[#dde8f3]">
      <Header />
      
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <WelcomeHeader />
        
        {/* Main Menu button */}
        <div className="flex justify-end mb-4">
          <Button 
            onClick={handleMainMenu}
            className="bg-gradient-to-r from-[#9b87f5] to-[#D946EF] text-white flex items-center gap-2"
          >
            <Home size={18} />
            Main Menu
          </Button>
        </div>
        
        <SearchHeader 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
        />
        
        <Tabs defaultValue="games" className="mb-8">
          <TabsList className="mb-6 mx-auto w-[80%] max-w-md bg-white/50 backdrop-blur h-14 p-1">
            <TabsTrigger value="games" className="flex items-center gap-2 h-12 text-base">
              <Gamepad className="h-5 w-5" />
              <span>Therapeutic Games</span>
            </TabsTrigger>
            <TabsTrigger value="quizzes" className="flex items-center gap-2 h-12 text-base">
              <HelpCircle className="h-5 w-5" />
              <span>Mental Health Quizzes</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="games" className="animate-fade-in">
            <GamesSection 
              filteredGames={searchTerm || difficultyFilter || typeFilter ? filteredGames : featuredGames}
              difficultyFilter={difficultyFilter}
              typeFilter={typeFilter}
              setDifficultyFilter={setDifficultyFilter}
              setTypeFilter={setTypeFilter}
              onStartGame={handleStartGame}
            />
          </TabsContent>
          
          <TabsContent value="quizzes" className="animate-fade-in">
            <QuizzesSection 
              filteredQuizzes={searchTerm || categoryFilter ? filteredQuizzes : featuredQuizzes}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              onStartQuiz={handleStartQuiz}
            />
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Game Instructions Dialog */}
      <GameInstructionsDialog 
        open={showGameInstructions}
        onOpenChange={setShowGameInstructions}
        activeGame={activeGame}
        onPlayGame={handlePlayGame}
      />
      
      {/* Active Game Dialog */}
      <GamePlayDialog 
        open={!!selectedGameComponent}
        onOpenChange={(open) => !open && handleCloseGame()}
        activeGame={activeGame}
        onClose={handleCloseGame}
        gameComponent={selectedGameComponent}
      />
    </div>
  );
};

export default GamesAndQuizzes;
