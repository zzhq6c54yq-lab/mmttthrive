
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Game } from "@/data/gamesData";
import { useToast } from "@/hooks/use-toast";

interface GameMentalMathProps {
  game: Game;
  onComplete: (score: number) => void;
}

const GameMentalMath: React.FC<GameMentalMathProps> = ({ game, onComplete }) => {
  const { toast } = useToast();
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [answer, setAnswer] = useState("");
  const [problem, setProblem] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(0);
  
  const startGame = () => {
    setGameStarted(true);
    generateProblem();
    toast({
      title: "Game Started",
      description: "Solve the math problems as quickly as you can!",
    });
  };

  const generateProblem = () => {
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    const operators = ["+", "-", "×"];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    
    let result = 0;
    switch (operator) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        // Ensure positive results for simplicity
        if (num1 >= num2) {
          result = num1 - num2;
        } else {
          result = num2 - num1;
          setProblem(`${num2} ${operator} ${num1} = ?`);
          setCorrectAnswer(result);
          return;
        }
        break;
      case "×":
        result = num1 * num2;
        break;
    }
    
    setProblem(`${num1} ${operator} ${num2} = ?`);
    setCorrectAnswer(result);
  };

  const submitAnswer = () => {
    const userAnswer = parseInt(answer, 10);
    
    if (userAnswer === correctAnswer) {
      setScore(score + 10);
      toast({
        title: "Correct!",
        description: "Good job!",
        variant: "success"
      });
    } else {
      toast({
        title: "Incorrect",
        description: `The correct answer was ${correctAnswer}.`,
        variant: "destructive"
      });
    }
    
    setAnswer("");
    
    // After 5 correct answers, end the game, otherwise generate a new problem
    if (score >= 40) { // 4 correct answers already, this would be the 5th
      if (userAnswer === correctAnswer) {
        setTimeout(() => onComplete(score + 10), 1000);
      } else {
        setTimeout(() => onComplete(score), 1000);
      }
    } else {
      generateProblem();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      submitAnswer();
    }
  };

  return (
    <div className="w-full text-center">
      {!gameStarted ? (
        <div className="space-y-4">
          <p className="text-lg font-medium">Ready to exercise your brain?</p>
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
            <p className="text-lg font-bold mb-6">{problem}</p>
            
            <div className="flex gap-3">
              <Input 
                type="number" 
                value={answer} 
                onChange={(e) => setAnswer(e.target.value)} 
                onKeyDown={handleKeyDown}
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
            <p className="text-xs text-gray-500 mt-1">Solve 5 problems to complete the game</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameMentalMath;
