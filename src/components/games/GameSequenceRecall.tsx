
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Game } from "@/data/gamesData";
import { useToast } from "@/hooks/use-toast";

interface GameSequenceRecallProps {
  game: Game;
  onComplete: (score: number) => void;
}

const GameSequenceRecall: React.FC<GameSequenceRecallProps> = ({ game, onComplete }) => {
  const { toast } = useToast();
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [sequence, setSequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [playingSequence, setPlayingSequence] = useState(false);
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [level, setLevel] = useState(1);
  
  const buttonColors = [
    { base: "bg-red-200", active: "bg-red-500" },
    { base: "bg-blue-200", active: "bg-blue-500" },
    { base: "bg-green-200", active: "bg-green-500" },
    { base: "bg-yellow-200", active: "bg-yellow-500" }
  ];
  
  const startGame = () => {
    setGameStarted(true);
    setLevel(1);
    setScore(0);
    generateSequence(level);
    toast({
      title: "Game Started",
      description: "Watch the sequence, then repeat it by clicking the buttons in the same order.",
    });
  };

  const generateSequence = (level: number) => {
    const newSequence = [];
    for (let i = 0; i < level + 2; i++) {
      newSequence.push(Math.floor(Math.random() * 4));
    }
    setSequence(newSequence);
    setUserSequence([]);
    playSequence(newSequence);
  };

  const playSequence = (seq: number[]) => {
    setPlayingSequence(true);
    let i = 0;
    
    const interval = setInterval(() => {
      if (i < seq.length) {
        setActiveButton(seq[i]);
        setTimeout(() => setActiveButton(null), 500);
        i++;
      } else {
        clearInterval(interval);
        setPlayingSequence(false);
      }
    }, 800);
  };

  const handleButtonClick = (buttonIndex: number) => {
    if (playingSequence) return;
    
    // Highlight button briefly
    setActiveButton(buttonIndex);
    setTimeout(() => setActiveButton(null), 200);
    
    const newUserSequence = [...userSequence, buttonIndex];
    setUserSequence(newUserSequence);
    
    // Check if the sequence is correct so far
    if (buttonIndex !== sequence[userSequence.length]) {
      // Wrong input
      toast({
        title: "Incorrect!",
        description: "That's not the right sequence.",
        variant: "destructive"
      });
      setTimeout(() => onComplete(score), 1000);
      return;
    }
    
    // Check if the sequence is complete
    if (newUserSequence.length === sequence.length) {
      // Correct sequence
      const newScore = score + (level * 10);
      setScore(newScore);
      
      toast({
        title: "Correct!",
        description: "You remembered the sequence!",
        variant: "success"
      });
      
      // Move to next level or end game
      if (level >= 3) {
        setTimeout(() => onComplete(newScore), 1000);
      } else {
        setLevel(level + 1);
        setTimeout(() => generateSequence(level + 1), 1000);
      }
    }
  };

  return (
    <div className="w-full text-center">
      {!gameStarted ? (
        <div className="space-y-4">
          <p className="text-lg font-medium">Test your sequence memory!</p>
          <Button 
            onClick={startGame}
            style={{ backgroundColor: game.color, color: "#fff" }}
          >
            Start Game
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="p-4">
            <p className="text-sm text-gray-600 mb-4">
              {playingSequence 
                ? "Watch the sequence..." 
                : "Now repeat the sequence by clicking the buttons in order."}
            </p>
            
            <div className="grid grid-cols-2 gap-4 max-w-[240px] mx-auto">
              {buttonColors.map((color, index) => (
                <button
                  key={index}
                  className={`w-24 h-24 rounded-lg transition-colors duration-200 ${
                    activeButton === index ? color.active : color.base
                  }`}
                  onClick={() => handleButtonClick(index)}
                  disabled={playingSequence}
                />
              ))}
            </div>
          </div>
          
          <div className="flex justify-between items-center px-4">
            <div>
              <p className="text-sm text-gray-500">Level</p>
              <p className="text-lg font-bold">{level}/3</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Score</p>
              <p className="text-lg font-bold">{score}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Sequence</p>
              <p className="text-lg font-bold">{userSequence.length}/{sequence.length}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameSequenceRecall;
