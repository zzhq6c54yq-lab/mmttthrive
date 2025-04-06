
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Page from "@/components/Page";
import { Game, gamesData } from "@/data/gamesData";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, Star, Clock, Heart, Trophy } from "lucide-react";
import GameComponentSelector from "@/components/games-and-quizzes/GameComponentSelector";

const GamePage = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [gameCompleted, setGameCompleted] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    if (gameId) {
      const foundGame = gamesData.find(g => g.id === gameId);
      
      if (foundGame) {
        setGame(foundGame);
      } else {
        toast({
          title: "Game Not Found",
          description: "The game you're looking for doesn't exist",
          variant: "destructive"
        });
        navigate("/games-and-quizzes");
      }
    }
  }, [gameId, navigate, toast]);
  
  const handleGameComplete = (finalScore: number) => {
    setScore(finalScore);
    setGameCompleted(true);
    
    toast({
      title: "Game Completed!",
      description: `You scored ${finalScore} points`,
      duration: 3000,
    });
  };
  
  const handlePlayAgain = () => {
    setGameCompleted(false);
    setScore(null);
    
    toast({
      title: "Starting New Game",
      description: `Get ready for ${game?.title}!`,
      duration: 1500,
    });
  };
  
  if (!game) {
    return (
      <Page title="Loading Game..." showBackButton={true}>
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </Page>
    );
  }

  return (
    <Page title={game.title} showBackButton={true}>
      <div 
        className="w-full h-40 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${game.coverImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <Button 
            variant="ghost" 
            className="text-white hover:text-white hover:bg-black/20"
            onClick={() => navigate('/games-and-quizzes')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Games
          </Button>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div 
              className="p-3 rounded-lg"
              style={{ backgroundColor: `${game.color}20` }}
            >
              <game.icon className="h-6 w-6" style={{ color: game.color }} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{game.title}</h1>
              <p className="text-gray-600">{game.description}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            <div className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
              <game.icon className="h-4 w-4 mr-1 text-gray-600" />
              <span className="capitalize">{game.type}</span>
            </div>
            <div className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
              <Clock className="h-4 w-4 mr-1 text-gray-600" />
              <span>{game.timeToComplete}</span>
            </div>
            <div className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
              <Star className="h-4 w-4 mr-1 text-amber-500" />
              <span>4.8 rating</span>
            </div>
          </div>
        </div>
        
        {gameCompleted ? (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8 text-center">
            <div className="mb-4">
              <Trophy className="h-12 w-12 text-amber-500 mx-auto mb-2" />
              <h2 className="text-2xl font-bold mb-1">Game Complete!</h2>
              <p className="text-gray-600">Great job completing this challenge</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6 inline-block">
              <div className="text-sm text-gray-500 mb-1">Your Score</div>
              <div className="text-4xl font-bold" style={{ color: game.color }}>{score}</div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
              <Button 
                onClick={handlePlayAgain}
                style={{ backgroundColor: game.color, color: "#fff" }}
              >
                <Star className="h-4 w-4 mr-2" />
                Play Again
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/games-and-quizzes')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Games
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">Play Game</h2>
            <GameComponentSelector 
              activeGame={game} 
              onComplete={handleGameComplete} 
            />
          </div>
        )}
        
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Heart className="h-5 w-5 text-rose-500" />
            How This Game Helps
          </h2>
          
          <div className="bg-white shadow-sm rounded-xl p-6">
            <h3 className="font-medium mb-3">Benefits</h3>
            <ul className="space-y-2 mb-4">
              {game.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            
            <h3 className="font-medium mb-2 mt-6">How to Play</h3>
            <p className="text-gray-700">{game.instructions}</p>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Button 
            onClick={() => navigate('/games-and-quizzes')}
            variant="outline"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Explore More Games
          </Button>
        </div>
      </div>
    </Page>
  );
};

export default GamePage;
