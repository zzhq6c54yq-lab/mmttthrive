
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  Gamepad, 
  HelpCircle, 
  BookOpen, 
  Clock, 
  Award, 
  BarChart,
  Filter,
  CheckCircle
} from "lucide-react";
import { gamesData, quizzesData, Game, Quiz } from "@/data/gamesData";
import Header from "@/components/layout/Header";
import GameMemoryMatch from "@/components/games/GameMemoryMatch";
import GameWordUnscramble from "@/components/games/GameWordUnscramble";
import GameReactionTime from "@/components/games/GameReactionTime";
import GamePatternFinder from "@/components/games/GamePatternFinder";
import GameMentalMath from "@/components/games/GameMentalMath";
import GameColorMatch from "@/components/games/GameColorMatch";
import GameMiniSudoku from "@/components/games/GameMiniSudoku";
import GameWordAssociation from "@/components/games/GameWordAssociation";
import GameSequenceRecall from "@/components/games/GameSequenceRecall";
import GameShapeFit from "@/components/games/GameShapeFit";
import { useToast } from "@/hooks/use-toast";

const GamesAndQuizzes = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [showGameInstructions, setShowGameInstructions] = useState(false);
  const [selectedGameComponent, setSelectedGameComponent] = useState<React.ReactNode | null>(null);

  const filteredGames = gamesData.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         game.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = difficultyFilter ? game.difficulty === difficultyFilter : true;
    const matchesType = typeFilter ? game.type === typeFilter : true;
    
    return matchesSearch && matchesDifficulty && matchesType;
  });

  const filteredQuizzes = quizzesData.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         quiz.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? quiz.category === categoryFilter : true;
    
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
    
    // Choose the correct game component based on the game ID
    switch (activeGame.id) {
      case "memory-match":
        setSelectedGameComponent(<GameMemoryMatch game={activeGame} onComplete={handleGameComplete} />);
        break;
      case "word-scramble":
        setSelectedGameComponent(<GameWordUnscramble game={activeGame} onComplete={handleGameComplete} />);
        break;
      case "reaction-time":
        setSelectedGameComponent(<GameReactionTime game={activeGame} onComplete={handleGameComplete} />);
        break;
      case "pattern-recognition":
        setSelectedGameComponent(<GamePatternFinder game={activeGame} onComplete={handleGameComplete} />);
        break;
      case "math-challenge":
        setSelectedGameComponent(<GameMentalMath game={activeGame} onComplete={handleGameComplete} />);
        break;
      case "color-match":
        setSelectedGameComponent(<GameColorMatch game={activeGame} onComplete={handleGameComplete} />);
        break;
      case "sudoku-mini":
        setSelectedGameComponent(<GameMiniSudoku game={activeGame} onComplete={handleGameComplete} />);
        break;
      case "word-association":
        setSelectedGameComponent(<GameWordAssociation game={activeGame} onComplete={handleGameComplete} />);
        break;
      case "memory-sequence":
        setSelectedGameComponent(<GameSequenceRecall game={activeGame} onComplete={handleGameComplete} />);
        break;
      case "shape-fit":
        setSelectedGameComponent(<GameShapeFit game={activeGame} onComplete={handleGameComplete} />);
        break;
      default:
        setSelectedGameComponent(null);
    }
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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "text-green-500";
      case "medium": return "text-yellow-500";
      case "hard": return "text-red-500";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0f4f8] via-[#e6eef5] to-[#dde8f3]">
      <Header />
      
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Games & Quizzes</h1>
            <p className="text-gray-600 mt-1">
              Engaging activities to improve your mental wellbeing while having fun
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                type="text" 
                placeholder="Search games and quizzes..." 
                className="pl-9 pr-4 w-full md:w-60" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="games" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="games" className="flex items-center gap-2">
              <Gamepad className="h-4 w-4" />
              <span>Therapeutic Games</span>
            </TabsTrigger>
            <TabsTrigger value="quizzes" className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              <span>Mental Health Quizzes</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="games">
            <div className="mb-4 flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center bg-white/50 p-3 rounded-lg backdrop-blur">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Gamepad className="h-5 w-5 text-[#9b87f5]" />
                <span>Mental Wellness Games</span>
              </h2>
              
              <div className="flex flex-wrap gap-2">
                <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                  <SelectTrigger className="w-[130px] h-9">
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Difficulties</SelectItem>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[130px] h-9">
                    <SelectValue placeholder="Game Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Types</SelectItem>
                    <SelectItem value="memory">Memory</SelectItem>
                    <SelectItem value="puzzle">Puzzle</SelectItem>
                    <SelectItem value="reaction">Reaction</SelectItem>
                    <SelectItem value="cognitive">Cognitive</SelectItem>
                    <SelectItem value="word">Word</SelectItem>
                    <SelectItem value="math">Math</SelectItem>
                    <SelectItem value="visual">Visual</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button 
                  variant="outline" 
                  className="h-9 px-3" 
                  onClick={() => {
                    setDifficultyFilter("");
                    setTypeFilter("");
                  }}
                >
                  <Filter className="h-4 w-4 mr-1" />
                  Reset
                </Button>
              </div>
            </div>
            
            {filteredGames.length === 0 ? (
              <div className="text-center py-10">
                <div className="mx-auto bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Gamepad className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-800">No games found</h3>
                <p className="text-gray-500 mt-1">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGames.map((game) => (
                  <motion.div
                    key={game.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="group h-full flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 border-[1px] border-[color:var(--border-color)]" 
                          style={{ "--border-color": `${game.color}40` } as React.CSSProperties}>
                      <CardHeader 
                        className="pb-2 relative"
                        style={{ backgroundColor: `${game.color}10` }}
                      >
                        <div className="absolute right-4 top-4">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7 rounded-full bg-white/80 hover:bg-white"
                            onClick={() => {
                              setActiveGame(game);
                              setShowGameInstructions(true);
                            }}
                          >
                            <HelpCircle className="h-4 w-4 text-gray-500" />
                          </Button>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div 
                            className="rounded-md p-2"
                            style={{ backgroundColor: `${game.color}30` }}
                          >
                            <game.icon className="h-5 w-5" style={{ color: game.color }} />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{game.title}</CardTitle>
                            <CardDescription>{game.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow py-4">
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          <div className="text-sm bg-gray-50 p-2 rounded flex flex-col items-center justify-center">
                            <span className="text-gray-500 text-xs">Difficulty</span>
                            <span className={`font-medium ${getDifficultyColor(game.difficulty)}`}>
                              {game.difficulty.charAt(0).toUpperCase() + game.difficulty.slice(1)}
                            </span>
                          </div>
                          <div className="text-sm bg-gray-50 p-2 rounded flex flex-col items-center justify-center">
                            <span className="text-gray-500 text-xs">Time</span>
                            <span className="font-medium text-gray-700 flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {game.timeToComplete}
                            </span>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                            <Award className="h-4 w-4" style={{ color: game.color }} />
                            <span>Benefits</span>
                          </h4>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {game.benefits.map((benefit, index) => (
                              <li key={index} className="flex items-start">
                                <CheckCircle className="h-3 w-3 mr-1 mt-0.5 text-green-500" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button 
                          className="w-full"
                          onClick={() => handleStartGame(game)}
                          style={{ 
                            backgroundColor: game.color,
                            color: "#fff"
                          }}
                        >
                          Play Game
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="quizzes">
            <div className="mb-4 flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center bg-white/50 p-3 rounded-lg backdrop-blur">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-[#9b87f5]" />
                <span>Mental Health Quizzes</span>
              </h2>
              
              <div className="flex flex-wrap gap-2">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[140px] h-9">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    <SelectItem value="mental-health">Mental Health</SelectItem>
                    <SelectItem value="wellbeing">Wellbeing</SelectItem>
                    <SelectItem value="coping-strategies">Coping Strategies</SelectItem>
                    <SelectItem value="self-awareness">Self Awareness</SelectItem>
                    <SelectItem value="relationships">Relationships</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button 
                  variant="outline" 
                  className="h-9 px-3" 
                  onClick={() => setCategoryFilter("")}
                >
                  <Filter className="h-4 w-4 mr-1" />
                  Reset
                </Button>
              </div>
            </div>
            
            {filteredQuizzes.length === 0 ? (
              <div className="text-center py-10">
                <div className="mx-auto bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <BookOpen className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-800">No quizzes found</h3>
                <p className="text-gray-500 mt-1">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredQuizzes.map((quiz) => (
                  <Card key={quiz.id} className="hover:shadow-md transition-all duration-300">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-semibold flex items-center gap-2">
                        {quiz.title}
                        {quiz.completionRate && quiz.completionRate > 0 ? (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            In progress
                          </span>
                        ) : null}
                      </CardTitle>
                      <CardDescription>{quiz.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <HelpCircle className="h-4 w-4 mr-1 text-[#9b87f5]" />
                          <span>{quiz.questions} questions</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1 text-[#9b87f5]" />
                          <span>{quiz.timeEstimate}</span>
                        </div>
                      </div>
                      
                      {quiz.completionRate && quiz.completionRate > 0 ? (
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Progress</span>
                            <span>{quiz.completionRate}%</span>
                          </div>
                          <Progress value={quiz.completionRate} className="h-2" />
                        </div>
                      ) : null}
                      
                      <div className="mt-4">
                        <Button 
                          onClick={() => handleStartQuiz(quiz)} 
                          className="w-full bg-[#9b87f5] hover:bg-[#8B5CF6]"
                        >
                          {quiz.completionRate && quiz.completionRate > 0 ? "Continue Quiz" : "Start Quiz"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Game Instructions Dialog */}
      <Dialog open={showGameInstructions} onOpenChange={setShowGameInstructions}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {activeGame && (
                <>
                  <activeGame.icon className="h-5 w-5" style={{ color: activeGame.color }} />
                  <span>{activeGame.title}</span>
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {activeGame?.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">How to Play</h3>
              <p className="text-sm text-gray-600">{activeGame?.instructions}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 p-3 rounded-md">
                <h4 className="text-xs text-gray-500 mb-1">Difficulty</h4>
                <p className={`text-sm font-medium ${activeGame ? getDifficultyColor(activeGame.difficulty) : ""}`}>
                  {activeGame?.difficulty.charAt(0).toUpperCase()}{activeGame?.difficulty.slice(1)}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <h4 className="text-xs text-gray-500 mb-1">Estimated Time</h4>
                <p className="text-sm font-medium text-gray-700">{activeGame?.timeToComplete}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Benefits</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                {activeGame?.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-1 mt-0.5 text-green-500 shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <DialogFooter className="gap-2 sm:gap-0">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button 
              onClick={handlePlayGame}
              style={{ 
                backgroundColor: activeGame?.color,
                color: "#fff"
              }}
            >
              Play Game
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Active Game Dialog */}
      <Dialog open={!!selectedGameComponent} onOpenChange={(open) => !open && handleCloseGame()}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {activeGame && (
                <>
                  <activeGame.icon className="h-5 w-5" style={{ color: activeGame.color }} />
                  <span>{activeGame.title}</span>
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          
          <div className="min-h-[300px] flex items-center justify-center">
            {selectedGameComponent}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseGame}>
              Exit Game
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GamesAndQuizzes;
