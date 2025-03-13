
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Game } from "@/data/gamesData";
import { useToast } from "@/hooks/use-toast";

interface GameMemoryMatchProps {
  game: Game;
  onComplete: (score: number) => void;
}

const GameMemoryMatch: React.FC<GameMemoryMatchProps> = ({ game, onComplete }) => {
  const { toast } = useToast();
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  
  // This is a simplified placeholder. In a real implementation, the game would have more logic.
  const startGame = () => {
    setGameStarted(true);
    toast({
      title: "Game Started",
      description: "Match the cards by flipping them to reveal their contents!",
    });
  };

  const completeGame = () => {
    onComplete(score);
  };

  return (
    <div className="w-full text-center">
      {!gameStarted ? (
        <div className="space-y-4">
          <p className="text-lg font-medium">Ready to test your memory?</p>
          <Button 
            onClick={startGame}
            style={{ backgroundColor: game.color, color: "#fff" }}
          >
            Start Game
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">This is a placeholder for the Memory Match game.</p>
            <p className="text-sm text-gray-600">In a full implementation, cards would appear here for you to match.</p>
          </div>
          
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500">Moves</p>
              <p className="text-lg font-bold">{moves}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Score</p>
              <p className="text-lg font-bold">{score}</p>
            </div>
          </div>
          
          <Button 
            onClick={completeGame}
            style={{ backgroundColor: game.color, color: "#fff" }}
          >
            Complete Game (Demo)
          </Button>
        </div>
      )}
    </div>
  );
};

export default GameMemoryMatch;
