
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Game } from "@/data/gamesData";
import { useToast } from "@/hooks/use-toast";

interface GameWordUnscrambleProps {
  game: Game;
  onComplete: (score: number) => void;
}

const GameWordUnscramble: React.FC<GameWordUnscrambleProps> = ({ game, onComplete }) => {
  const { toast } = useToast();
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  
  // Placeholder scrambled word
  const scrambledWord = "TALNEM";
  const correctWord = "MENTAL";
  
  const startGame = () => {
    setGameStarted(true);
    toast({
      title: "Game Started",
      description: "Unscramble the letters to form a meaningful word!",
    });
  };

  const submitAnswer = () => {
    if (answer.toLowerCase() === correctWord.toLowerCase()) {
      toast({
        title: "Correct!",
        description: "That's the right word!",
        variant: "success"
      });
      setScore(score + 10);
    } else {
      toast({
        title: "Incorrect",
        description: `The correct word was "${correctWord}".`,
        variant: "destructive"
      });
    }
    
    // In a real game, we'd show a new word, but for this demo, we'll just complete the game
    setTimeout(() => {
      onComplete(score + (answer.toLowerCase() === correctWord.toLowerCase() ? 10 : 0));
    }, 1500);
  };

  return (
    <div className="w-full text-center">
      {!gameStarted ? (
        <div className="space-y-4">
          <p className="text-lg font-medium">Ready to unscramble some words?</p>
          <Button 
            onClick={startGame}
            style={{ backgroundColor: game.color, color: "#fff" }}
          >
            Start Game
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="p-6 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-4">Unscramble the letters to form a word:</p>
            <div className="flex justify-center gap-2 mb-6">
              {scrambledWord.split("").map((letter, index) => (
                <div 
                  key={index} 
                  className="w-10 h-10 flex items-center justify-center font-bold text-lg bg-white border-2 rounded-md shadow-sm"
                  style={{ borderColor: game.color }}
                >
                  {letter}
                </div>
              ))}
            </div>
            
            <div className="flex gap-3">
              <Input 
                type="text" 
                value={answer} 
                onChange={(e) => setAnswer(e.target.value)} 
                placeholder="Your answer"
                className="text-center"
              />
              <Button 
                onClick={submitAnswer}
                style={{ backgroundColor: game.color, color: "#fff" }}
              >
                Submit
              </Button>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Score</p>
            <p className="text-lg font-bold">{score}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameWordUnscramble;
