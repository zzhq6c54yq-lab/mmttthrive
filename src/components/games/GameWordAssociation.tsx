
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Game } from "@/data/gamesData";
import { useToast } from "@/hooks/use-toast";

interface GameWordAssociationProps {
  game: Game;
  onComplete: (score: number) => void;
}

const GameWordAssociation: React.FC<GameWordAssociationProps> = ({ game, onComplete }) => {
  const { toast } = useToast();
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentWord, setCurrentWord] = useState("Health");
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  
  const wordOptions = [
    {text: "Wellness", isCorrect: true},
    {text: "Medicine", isCorrect: true},
    {text: "Computer", isCorrect: false},
    {text: "Doctor", isCorrect: true},
    {text: "Bicycle", isCorrect: false},
    {text: "Exercise", isCorrect: true},
  ];
  
  const startGame = () => {
    setGameStarted(true);
    toast({
      title: "Game Started",
      description: "Select all words that are associated with the main word.",
    });
  };

  const toggleWordSelection = (word: string, isCorrect: boolean) => {
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter(w => w !== word));
    } else {
      setSelectedWords([...selectedWords, word]);
    }
  };

  const submitAnswer = () => {
    // Check if the selection is correct
    const correctAnswers = wordOptions.filter(word => word.isCorrect).map(word => word.text);
    const allCorrectSelected = correctAnswers.every(word => selectedWords.includes(word));
    const noIncorrectSelected = selectedWords.every(word => correctAnswers.includes(word));
    
    if (allCorrectSelected && noIncorrectSelected) {
      // Perfect score
      setScore(score + 20);
      toast({
        title: "Perfect!",
        description: "You found all the correct associations!",
        variant: "success"
      });
    } else if (allCorrectSelected || noIncorrectSelected) {
      // Partial score - either got all correct ones but also some wrong ones
      // or didn't select all correct ones but didn't select any wrong ones
      setScore(score + 10);
      toast({
        title: "Good!",
        description: "You got some of the associations right.",
      });
    } else {
      // Poor score - missed some correct ones and selected some wrong ones
      setScore(score + 5);
      toast({
        title: "Try Again",
        description: "You missed some associations and selected some incorrect ones.",
        variant: "destructive"
      });
    }
    
    // End the game after this demo round
    setTimeout(() => onComplete(score + (allCorrectSelected && noIncorrectSelected ? 20 : allCorrectSelected || noIncorrectSelected ? 10 : 5)), 1500);
  };

  return (
    <div className="w-full text-center">
      {!gameStarted ? (
        <div className="space-y-4">
          <p className="text-lg font-medium">Test your word association skills!</p>
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
            <p className="text-sm text-gray-600 mb-2">Select all words associated with:</p>
            <p className="text-2xl font-bold mb-6">{currentWord}</p>
            
            <div className="grid grid-cols-2 gap-3">
              {wordOptions.map(word => (
                <Button
                  key={word.text}
                  variant={selectedWords.includes(word.text) ? "default" : "outline"}
                  className={selectedWords.includes(word.text) ? "bg-blue-500" : ""}
                  onClick={() => toggleWordSelection(word.text, word.isCorrect)}
                >
                  {word.text}
                </Button>
              ))}
            </div>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Score</p>
            <p className="text-lg font-bold">{score}</p>
          </div>
          
          <Button 
            onClick={submitAnswer}
            style={{ backgroundColor: game.color, color: "#fff" }}
            disabled={selectedWords.length === 0}
          >
            Submit Answer
          </Button>
        </div>
      )}
    </div>
  );
};

export default GameWordAssociation;
