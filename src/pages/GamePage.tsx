
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Page from "@/components/Page";
import { Game, gamesData } from "@/data/gamesData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, ArrowLeft, Brain, Timer, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import GameComponentSelector from "@/components/games-and-quizzes/GameComponentSelector";

const GamePage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { gameId } = useParams();
  
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [gameComplete, setGameComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [startTime, setStartTime] = useState(0);
  
  // Load game data based on URL parameter
  useEffect(() => {
    const foundGame = gamesData.find(g => g.id === gameId);
    if (foundGame) {
      setGame(foundGame);
      setStartTime(Date.now());
    } else {
      toast({
        title: "Game not found",
        description: "We couldn't find the game you were looking for.",
        variant: "destructive"
      });
    }
    setLoading(false);
  }, [gameId, toast]);
  
  // Handle back button click
  const handleBackClick = () => {
    navigate("/games-and-quizzes");
  };
  
  // Handle game completion
  const handleGameComplete = (finalScore: number) => {
    const endTime = Date.now();
    const timeElapsed = Math.floor((endTime - startTime) / 1000);
    
    setScore(finalScore);
    setTimeSpent(timeElapsed);
    setGameComplete(true);
    
    toast({
      title: "Game Complete!",
      description: `You scored ${finalScore} points in ${timeElapsed} seconds`,
    });
  };
  
  // Handle play again
  const handlePlayAgain = () => {
    setGameComplete(false);
    setStartTime(Date.now());
  };
  
  // Handle return to games list
  const handleReturnToGames = () => {
    navigate("/games-and-quizzes");
  };

  if (loading) {
    return (
      <Page title="Loading Game..." showBackButton={true} onBackClick={handleBackClick}>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#9b87f5]"></div>
        </div>
      </Page>
    );
  }

  if (!game) {
    return (
      <Page title="Game Not Found" showBackButton={true} onBackClick={handleBackClick}>
        <div className="max-w-4xl mx-auto px-4 text-center py-16">
          <Brain className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold mb-4">Game Not Found</h2>
          <p className="text-gray-600 mb-8">Sorry, we couldn't find the game you were looking for.</p>
          <Button onClick={handleBackClick}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Games
          </Button>
        </div>
      </Page>
    );
  }

  return (
    <Page 
      title={game.title} 
      showBackButton={true} 
      onBackClick={handleBackClick}
    >
      <div className="max-w-5xl mx-auto px-4 py-6">
        {gameComplete ? (
          <Card className="border border-[#9b87f5]/30 bg-gradient-to-br from-[#9b87f5]/10 to-white shadow-lg">
            <CardHeader className="text-center pb-2">
              <CardTitle className="flex justify-center items-center gap-2 text-2xl md:text-3xl">
                <Trophy className="h-8 w-8 text-amber-500" />
                Game Complete!
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 pb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                  <p className="text-gray-600 text-sm uppercase font-medium mb-1">Your Score</p>
                  <p className="text-4xl font-bold text-[#9b87f5]">{score}</p>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                  <p className="text-gray-600 text-sm uppercase font-medium mb-1">Time Spent</p>
                  <p className="text-4xl font-bold text-[#9b87f5]">{timeSpent} seconds</p>
                </div>
              </div>
              
              <div className="bg-[#9b87f5]/10 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-medium mb-3">Benefits You've Gained</h3>
                <ul className="space-y-2">
                  {game.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 text-green-500 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={handlePlayAgain} 
                  style={{ backgroundColor: game.color }}
                  className="flex-1 text-white"
                >
                  Play Again
                </Button>
                <Button 
                  onClick={handleReturnToGames}
                  variant="outline"
                  className="flex-1 border-[#9b87f5]"
                >
                  More Games
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div 
                    className="p-1.5 rounded-md"
                    style={{ backgroundColor: `${game.color}30` }}
                  >
                    <game.icon className="h-5 w-5" style={{ color: game.color }} />
                  </div>
                  <h2 className="text-xl font-bold">{game.title}</h2>
                </div>
                <p className="text-gray-600 text-sm">{game.description}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                  <Timer className="h-4 w-4 text-gray-600 mr-1" />
                  <span className="text-xs font-medium">{game.timeToComplete}</span>
                </div>
                <div 
                  className="flex items-center px-3 py-1 rounded-full capitalize text-xs font-medium"
                  style={{ 
                    backgroundColor: `${game.color}20`,
                    color: game.color 
                  }}
                >
                  {game.difficulty}
                </div>
              </div>
            </div>
            
            <Card className="mb-8 border border-[#9b87f5]/30">
              <CardHeader className="pb-2 border-b">
                <CardTitle className="text-lg">How to Play</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p>{game.instructions}</p>
              </CardContent>
            </Card>
            
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <GameComponentSelector
                activeGame={game}
                onComplete={handleGameComplete}
              />
            </div>
          </div>
        )}
      </div>
    </Page>
  );
};

export default GamePage;
