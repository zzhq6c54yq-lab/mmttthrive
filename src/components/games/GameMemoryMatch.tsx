
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

type CardType = {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
};

const SYMBOLS = ["🦄", "🌟", "🍀", "🌈", "🔥", "🎩"];

function shuffle(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const generateCards = (): CardType[] => {
  const allSymbols = [...SYMBOLS, ...SYMBOLS];
  return shuffle(allSymbols).map((symbol, idx) => ({
    id: idx,
    symbol,
    isFlipped: false,
    isMatched: false
  }));
};

interface GameMemoryMatchProps {
  onComplete?: (score: number) => void;
}

const GameMemoryMatch: React.FC<GameMemoryMatchProps> = ({ onComplete }) => {
  const [cards, setCards] = useState<CardType[]>(generateCards());
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matchedCount, setMatchedCount] = useState(0);
  const [moves, setMoves] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (flipped.length === 2) {
      const [firstIdx, secondIdx] = flipped;
      if (cards[firstIdx].symbol === cards[secondIdx].symbol) {
        setTimeout(() => {
          setCards(prev =>
            prev.map((card, idx) =>
              idx === firstIdx || idx === secondIdx
                ? { ...card, isMatched: true }
                : card
            )
          );
          setMatchedCount(count => count + 1);
          setFlipped([]);
        }, 700);
      } else {
        setTimeout(() => {
          setCards(prev =>
            prev.map((card, idx) =>
              idx === firstIdx || idx === secondIdx
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlipped([]);
        }, 900);
      }
      setMoves(m => m + 1);
    }
  }, [flipped, cards]);

  useEffect(() => {
    if (matchedCount === SYMBOLS.length) {
      setFinished(true);
      if (onComplete) {
        // Lower moves is higher score (simple scoring logic)
        onComplete(Math.max(0, 100 - moves * 5));
      }
    }
  }, [matchedCount, moves, onComplete]);

  const handleFlip = (idx: number) => {
    if (flipped.length === 2 || cards[idx].isFlipped || cards[idx].isMatched) return;
    setCards(prev => prev.map((card, i) => i === idx ? { ...card, isFlipped: true } : card));
    setFlipped(prev => [...prev, idx]);
  };

  const handleRestart = () => {
    setCards(generateCards());
    setFlipped([]);
    setMatchedCount(0);
    setMoves(0);
    setFinished(false);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-lg font-semibold mb-4">Memory Match</h2>
      <div className="grid grid-cols-4 gap-4 mb-4">
        {cards.map((card, idx) => (
          <button
            key={card.id}
            className={`w-16 h-20 text-2xl rounded shadow-md transition bg-white
              ${card.isMatched ? "bg-green-200 text-green-700" : ""}
              ${card.isFlipped && !card.isMatched ? "bg-blue-100" : ""}
              `}
            onClick={() => handleFlip(idx)}
            disabled={card.isMatched || card.isFlipped || finished || flipped.length === 2}
            aria-label={card.isFlipped || card.isMatched ? card.symbol : "Hidden card"}
          >
            {card.isFlipped || card.isMatched ? card.symbol : "❓"}
          </button>
        ))}
      </div>
      <div className="mb-2">Moves: <span className="font-bold">{moves}</span></div>
      {finished && (
        <div className="mb-4 text-green-600 font-bold">You win! 🎉</div>
      )}
      <Button onClick={handleRestart} className="bg-gradient-to-r from-[#B87333] to-[#E5C5A1] text-white">
        {finished ? "Play Again" : "Restart"}
      </Button>
    </div>
  );
};

export default GameMemoryMatch;

