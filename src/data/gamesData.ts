
import { Brain, Puzzle, Gamepad, Lightbulb, MoveHorizontal, Zap, Shapes, Sparkles, Timer, Layers } from "lucide-react";

export interface Game {
  id: string;
  title: string;
  description: string;
  icon: any;
  type: "memory" | "puzzle" | "reaction" | "cognitive" | "word" | "math" | "visual" | "creativity" | "mindfulness" | "strategy";
  difficulty: "easy" | "medium" | "hard";
  timeToComplete: string;
  benefits: string[];
  instructions: string;
  color: string;
}

export const gamesData: Game[] = [
  {
    id: "memory-match",
    title: "Memory Match",
    description: "Test and improve your memory by matching pairs of cards",
    icon: Brain,
    type: "memory",
    difficulty: "easy",
    timeToComplete: "3-5 min",
    benefits: ["Improves memory", "Enhances concentration", "Reduces stress"],
    instructions: "Flip cards to find matching pairs. Remember the locations and match all pairs to complete the game.",
    color: "#9b87f5"
  },
  {
    id: "word-scramble",
    title: "Word Unscramble",
    description: "Rearrange letters to form meaningful words",
    icon: Puzzle,
    type: "word",
    difficulty: "medium",
    timeToComplete: "2-4 min",
    benefits: ["Enhances vocabulary", "Improves cognitive flexibility", "Boosts problem-solving skills"],
    instructions: "Rearrange the scrambled letters to form a valid word. Type your answer and submit.",
    color: "#D946EF"
  },
  {
    id: "reaction-time",
    title: "Quick Reflex",
    description: "Test your reaction time and improve focus",
    icon: Zap,
    type: "reaction",
    difficulty: "easy",
    timeToComplete: "1-2 min",
    benefits: ["Improves reflexes", "Enhances focus", "Develops attention"],
    instructions: "Wait for the screen to turn green, then click or tap as quickly as possible.",
    color: "#F97316"
  },
  {
    id: "pattern-recognition",
    title: "Pattern Finder",
    description: "Identify patterns and sequences to improve cognitive skills",
    icon: Shapes,
    type: "cognitive",
    difficulty: "medium",
    timeToComplete: "3-6 min",
    benefits: ["Enhances pattern recognition", "Improves logical thinking", "Boosts memory"],
    instructions: "Identify the pattern in the sequence and select the next item that should appear in the sequence.",
    color: "#0EA5E9"
  },
  {
    id: "math-challenge",
    title: "Mental Math",
    description: "Solve math problems quickly to improve numerical abilities",
    icon: Lightbulb,
    type: "math",
    difficulty: "medium",
    timeToComplete: "3-5 min",
    benefits: ["Improves numerical skills", "Enhances mental calculation", "Boosts confidence"],
    instructions: "Solve the presented math problems as quickly as possible. Type your answer and press enter.",
    color: "#1EAEDB"
  },
  {
    id: "color-match",
    title: "Color Match",
    description: "Test your attention by matching colors and words",
    icon: Sparkles,
    type: "visual",
    difficulty: "hard",
    timeToComplete: "2-4 min",
    benefits: ["Improves focus", "Enhances cognitive processing", "Develops attention to detail"],
    instructions: "Identify if the color of the text matches the word itself. Press Yes or No accordingly.",
    color: "#33C3F0"
  },
  {
    id: "sudoku-mini",
    title: "Mini Sudoku",
    description: "Solve number puzzles to improve logical thinking",
    icon: Layers,
    type: "puzzle",
    difficulty: "hard",
    timeToComplete: "5-10 min",
    benefits: ["Enhances logical thinking", "Improves problem-solving", "Boosts concentration"],
    instructions: "Fill the grid so that every row, column, and 2x2 box contains the numbers 1-4.",
    color: "#6E59A5"
  },
  {
    id: "word-association",
    title: "Word Association",
    description: "Connect words that are related to each other",
    icon: MoveHorizontal,
    type: "word",
    difficulty: "medium",
    timeToComplete: "2-4 min",
    benefits: ["Expands vocabulary", "Improves verbal reasoning", "Enhances creativity"],
    instructions: "Select words that are associated with the given word. Choose all correct associations.",
    color: "#7E69AB"
  },
  {
    id: "memory-sequence",
    title: "Sequence Recall",
    description: "Remember and reproduce sequences to improve short-term memory",
    icon: Timer,
    type: "memory",
    difficulty: "medium",
    timeToComplete: "3-5 min",
    benefits: ["Boosts short-term memory", "Improves attention span", "Enhances visualization skills"],
    instructions: "Watch the sequence of lights and sounds, then reproduce it in the correct order.",
    color: "#8B5CF6"
  },
  {
    id: "shape-fit",
    title: "Shape Fit",
    description: "Rotate and place shapes correctly to fill the board",
    icon: Gamepad,
    type: "puzzle",
    difficulty: "hard",
    timeToComplete: "4-8 min",
    benefits: ["Improves spatial awareness", "Enhances problem-solving", "Develops strategic thinking"],
    instructions: "Rotate and place the provided shapes to fill the board completely.",
    color: "#D6BCFA"
  }
];

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: "mental-health" | "wellbeing" | "coping-strategies" | "self-awareness" | "relationships";
  questions: number;
  timeEstimate: string;
  completionRate?: number;
}

export const quizzesData: Quiz[] = [
  {
    id: "mental-health-basics",
    title: "Mental Health Basics",
    description: "Test your knowledge about fundamental mental health concepts",
    category: "mental-health",
    questions: 10,
    timeEstimate: "5 min",
    completionRate: 75
  },
  {
    id: "stress-management",
    title: "Stress Management",
    description: "Learn about effective stress reduction techniques",
    category: "coping-strategies",
    questions: 8,
    timeEstimate: "4 min",
    completionRate: 0
  },
  {
    id: "emotional-intelligence",
    title: "Emotional Intelligence",
    description: "Assess your ability to recognize and manage emotions",
    category: "self-awareness",
    questions: 12,
    timeEstimate: "6 min",
    completionRate: 30
  },
  {
    id: "relationship-health",
    title: "Relationship Health",
    description: "Evaluate the health of your relationships and communication styles",
    category: "relationships",
    questions: 10,
    timeEstimate: "5 min",
    completionRate: 0
  },
  {
    id: "sleep-wellbeing",
    title: "Sleep & Wellbeing",
    description: "Learn how sleep affects your mental health",
    category: "wellbeing",
    questions: 8,
    timeEstimate: "4 min",
    completionRate: 0
  },
  {
    id: "anxiety-awareness",
    title: "Anxiety Awareness",
    description: "Understand different types of anxiety and coping mechanisms",
    category: "mental-health",
    questions: 10,
    timeEstimate: "5 min",
    completionRate: 40
  },
  {
    id: "mindfulness-practice",
    title: "Mindfulness Practice",
    description: "Test your understanding of mindfulness techniques",
    category: "coping-strategies",
    questions: 8,
    timeEstimate: "4 min",
    completionRate: 0
  },
  {
    id: "gratitude-attitude",
    title: "Gratitude Attitude",
    description: "Explore how gratitude can improve mental wellbeing",
    category: "wellbeing",
    questions: 6,
    timeEstimate: "3 min",
    completionRate: 0
  }
];
