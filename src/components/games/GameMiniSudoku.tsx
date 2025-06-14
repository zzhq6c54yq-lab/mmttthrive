
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Game } from "@/data/gamesData";
import { useToast } from "@/hooks/use-toast";

const PUZZLE = [
  [0, 2, 0, 4],
  [3, 0, 0, 0],
  [0, 0, 3, 1],
  [1, 0, 4, 0],
];
const SOLUTION = [
  [4, 2, 1, 3],
  [3, 1, 2, 4],
  [2, 4, 3, 1],
  [1, 3, 4, 2],
];

interface GameMiniSudokuProps {
  game?: Game;
  onComplete?: (score: number) => void;
}

const GameMiniSudoku: React.FC<GameMiniSudokuProps> = ({ game, onComplete }) => {
  const { toast } = useToast();
  const [grid, setGrid] = useState(PUZZLE.map(row => [...row]));
  const [completed, setCompleted] = useState(false);
  const [wrong, setWrong] = useState(false);

  const handleInput = (row: number, col: number, value: number) => {
    if (PUZZLE[row][col] !== 0) return; // original clue
    const newGrid = grid.map(arr => [...arr]);
    newGrid[row][col] = value;
    setGrid(newGrid);
    setWrong(false);
  };

  const checkSolution = () => {
    // flatten and compare
    if (JSON.stringify(grid) === JSON.stringify(SOLUTION)) {
      setCompleted(true);
      if (onComplete) onComplete(40);
      toast({ title: "🎉 Completed!", description: "You finished the mini Sudoku!", duration: 2200 });
    } else {
      setWrong(true);
      toast({ title: "❌ Not Quite!", description: "There's a mistake. Try again?", duration: 1800 });
    }
  };

  const handleRestart = () => {
    setGrid(PUZZLE.map(row => [...row]));
    setCompleted(false);
    setWrong(false);
  };

  return (
    <div className="max-w-sm mx-auto flex flex-col items-center pt-2 pb-8">
      <h2 className="text-lg font-bold mb-2 text-[#B87333]">Mini Sudoku</h2>
      <p className="text-zinc-700 text-xs mb-2 text-center">Fill the grid so each row and column has 1–4. You cannot change orange cells.</p>
      <div className="grid grid-cols-4 gap-1 mb-4">
        {grid.map((row, rowIdx) =>
          row.map((cell, colIdx) => (
            <input
              key={rowIdx + "-" + colIdx}
              type="number"
              min={1}
              max={4}
              value={cell === 0 ? "" : cell}
              onChange={e => handleInput(rowIdx, colIdx, Number(e.target.value))}
              disabled={PUZZLE[rowIdx][colIdx] !== 0 || completed}
              className={`w-12 h-12 text-center border rounded 
                ${PUZZLE[rowIdx][colIdx] !== 0 ? "bg-orange-100 font-bold border-orange-400 text-orange-700" : "bg-white border-zinc-300"}
                text-lg mx-auto focus:outline-[#B87333]
              `}
            />
          ))
        )}
      </div>
      {wrong && <div className="text-red-600 mb-2">Something is incorrect.</div>}
      {completed ? (
        <>
          <div className="text-green-700 font-semibold mb-2">Sudoku solved! 🥳</div>
          <Button className="bg-gradient-to-r from-[#B87333] to-[#E5C5A1] text-white mt-1" onClick={handleRestart}>
            Play Again
          </Button>
        </>
      ) : (
        <Button className="bg-gradient-to-r from-[#B87333] to-[#E5C5A1] text-white w-full" onClick={checkSolution}>
          Check Solution
        </Button>
      )}
    </div>
  );
};

export default GameMiniSudoku;
