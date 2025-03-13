
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Game } from "@/data/gamesData";
import { useToast } from "@/hooks/use-toast";

interface GameMiniSudokuProps {
  game: Game;
  onComplete: (score: number) => void;
}

const GameMiniSudoku: React.FC<GameMiniSudokuProps> = ({ game, onComplete }) => {
  const { toast } = useToast();
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  
  // Simple 4x4 sudoku board for demo purposes
  const [board, setBoard] = useState([
    [0, 1, 0, 3],
    [3, 0, 0, 1],
    [0, 3, 0, 0],
    [2, 0, 1, 0]
  ]);
  
  const [selectedCell, setSelectedCell] = useState<{row: number, col: number} | null>(null);
  
  const startGame = () => {
    setGameStarted(true);
    toast({
      title: "Game Started",
      description: "Fill in the sudoku grid so every row, column, and 2x2 box contains numbers 1-4 without repetition.",
    });
  };

  const handleCellClick = (row: number, col: number) => {
    if (board[row][col] === 0 || selectedCell?.row === row && selectedCell?.col === col) {
      setSelectedCell({ row, col });
    }
  };

  const handleNumberInput = (num: number) => {
    if (!selectedCell) return;
    
    const newBoard = [...board];
    newBoard[selectedCell.row][selectedCell.col] = num;
    setBoard(newBoard);
    
    // Check if the board is now complete and valid
    if (isBoardComplete(newBoard) && isBoardValid(newBoard)) {
      setTimeout(() => {
        toast({
          title: "Sudoku Complete!",
          description: "Great job solving the puzzle!",
          variant: "success"
        });
        onComplete(100); // Give full score for completing the sudoku
      }, 500);
    }
  };

  const isBoardComplete = (board: number[][]) => {
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (board[row][col] === 0) {
          return false;
        }
      }
    }
    return true;
  };

  const isBoardValid = (board: number[][]) => {
    // This is a simplified validation for demo purposes
    // A real implementation would check rows, columns, and 2x2 boxes for duplicates
    return true;
  };

  const completeGame = () => {
    onComplete(score);
  };

  return (
    <div className="w-full text-center">
      {!gameStarted ? (
        <div className="space-y-4">
          <p className="text-lg font-medium">Ready for a Mini Sudoku challenge?</p>
          <Button 
            onClick={startGame}
            style={{ backgroundColor: game.color, color: "#fff" }}
          >
            Start Game
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="max-w-[250px] mx-auto">
            <div className="grid grid-cols-4 gap-1 border-2 border-gray-800 p-1">
              {board.map((row, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  {row.map((cell, colIndex) => (
                    <div 
                      key={`${rowIndex}-${colIndex}`}
                      className={`
                        w-12 h-12 flex items-center justify-center font-bold text-xl cursor-pointer border
                        ${rowIndex % 2 === 0 && colIndex % 2 === 0 ? 'bg-gray-100' : ''}
                        ${rowIndex % 2 === 1 && colIndex % 2 === 1 ? 'bg-gray-100' : ''}
                        ${selectedCell?.row === rowIndex && selectedCell?.col === colIndex ? 'bg-blue-200 border-blue-500' : 'border-gray-300'}
                        ${cell !== 0 ? 'text-gray-800' : 'text-transparent'}
                      `}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                    >
                      {cell !== 0 ? cell : '.'}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
            
            <div className="flex justify-center gap-2 mt-4">
              {[1, 2, 3, 4].map(num => (
                <button
                  key={num}
                  className="w-10 h-10 flex items-center justify-center font-bold text-lg bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
                  onClick={() => handleNumberInput(num)}
                  disabled={!selectedCell}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
          
          <Button 
            onClick={completeGame}
            style={{ backgroundColor: game.color, color: "#fff" }}
          >
            Give Up (Demo)
          </Button>
        </div>
      )}
    </div>
  );
};

export default GameMiniSudoku;
