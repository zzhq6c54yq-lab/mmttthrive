
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Game } from "@/data/gamesData";
import { useToast } from "@/hooks/use-toast";

interface GameColorMatchProps {
  game: Game;
  onComplete: (score: number) => void;
}

const GameColorMatch: React.FC<GameColorMatchProps> = ({ game, onComplete }) => {
  const { toast } = useToast();
  const [score, setScore] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentWord, setCurrentWord] = useState<{text: string, color: string, match: boolean}>({
    text: "Red",
    color: "text-red-500",
    match: true
  });
  
  const colorOptions = [
    { name: "Red", class: "text-red-500" },
    { name: "Blue", class: "text-blue-500" },
    { name: "Green", class: "text-green-500" },
    { name: "Purple", class: "text-purple-500" },
    { name: "Orange", class: "text-orange-500" },
  ];
  
  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setRounds(0);
    generateNewRound();
    toast({
      title: "Game Started",
      description: "Identify if the word's color matches its meaning!",
    });
  };

  const generateNewRound = () => {
    const wordIndex = Math.floor(Math.random() * colorOptions.length);
    const colorIndex = Math.floor(Math.random() * colorOptions.length);
    const isMatch = Math.random() < 0.5; // 50% chance to be a match
    
    setCurrentWord({
      text: colorOptions[wordIndex].name,
      color: isMatch ? colorOptions[wordIndex].class : colorOptions[colorIndex].class,
      match: isMatch
    });
  };

  const handleAnswer = (isMatch: boolean) => {
    const isCorrect = isMatch === currentWord.match;
    
    if (isCorrect) {
      setScore(score + 10);
      toast({
        title: "Correct!",
        variant: "success"
      });
    } else {
      toast({
        title: "Incorrect!",
        variant: "destructive"
      });
    }
    
    setRounds(rounds + 1);
    
    if (rounds >= 9) { // After 10 rounds
      setTimeout(() => onComplete(score + (isCorrect ? 10 : 0)), 1000);
    } else {
      generateNewRound();
    }
  };

  useEffect(() => {
    // Start a timer to add pressure
    if (gameStarted) {
      const timer = setTimeout(() => {
        setRounds(rounds + 1);
        toast({
          title: "Too slow!",
          description: "Try to answer more quickly!",
          variant: "destructive"
        });
        
        if (rounds >= 9) {
          onComplete(score);
        } else {
          generateNewRound();
        }
      }, 5000); // 5 seconds to answer
      
      return () => clearTimeout(timer);
    }
  }, [currentWord, gameStarted]);

  return (
    <div className="w-full text-center">
      {!gameStarted ? (
        <div className="space-y-4">
          <p className="text-lg font-medium">Test your attention and cognitive processing!</p>
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
            <p className="text-sm text-gray-600 mb-4">Does the word's color match its meaning?</p>
            <p className={`text-4xl font-bold mb-8 ${currentWord.color}`}>
              {currentWord.text}
            </p>
            
            <div className="flex justify-center gap-4">
              <Button 
                variant="outline"
                className="px-8 border-green-500 hover:bg-green-50 text-green-700"
                onClick={() => handleAnswer(true)}
              >
                Yes
              </Button>
              <Button 
                variant="outline"
                className="px-8 border-red-500 hover:bg-red-50 text-red-700"
                onClick={() => handleAnswer(false)}
              >
                No
              </Button>
            </div>
          </div>
          
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500">Score</p>
              <p className="text-lg font-bold">{score}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Round</p>
              <p className="text-lg font-bold">{rounds + 1}/10</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameColorMatch;
