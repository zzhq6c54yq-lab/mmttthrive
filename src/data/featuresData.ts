
import {
  Brain, Library, Users, Heart, GraduationCap, CalendarRange, LeafyGreen,
  Moon, HandHeart, ListChecks, FlameKindling, Footprints, Sparkles, Star, 
  Lightbulb, Target, Zap, Bird, Leaf, Smile, Coffee, Puzzle, HeartHandshake,
  Headphones
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface FeatureItem {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
}

const keyFeatures: FeatureItem[] = [
  {
    title: "Personalized Content",
    description: "Content tailored to your mental health journey and cultural background",
    icon: Brain,
    path: "/personalized-content"
  },
  {
    title: "Games & Quizzes",
    description: "Fun and therapeutic games and quizzes to boost mental wellbeing",
    icon: Puzzle,
    path: "/games-and-quizzes"
  },
  {
    title: "Binaural Beats",
    description: "Sound therapy to improve sleep, focus, and mental wellbeing",
    icon: Headphones,
    path: "/binaural-beats"
  },
  {
    title: "Resource Library",
    description: "Comprehensive mental health resources and educational content",
    icon: Library,
    path: "/resource-library"
  },
  {
    title: "Community Support",
    description: "Connect with others and access culturally sensitive resources",
    icon: Users,
    path: "/community-support"
  },
  {
    title: "My N.A/A.A Sponsor",
    description: "Access your digital sponsor and recovery support resources",
    icon: HeartHandshake,
    path: "/my-sponsor"
  },
  {
    title: "Lifestyle Integration",
    description: "Seamlessly blend mental wellness practices into your daily routine",
    icon: Coffee,
    path: "/lifestyle-integration"
  },
  {
    title: "Mental Wellness Tools",
    description: "Track nutrition, sleep, exercise, and mental wellbeing",
    icon: LeafyGreen,
    path: "/mental-wellness-tools"
  },
  {
    title: "Progress Tracking",
    description: "Monitor your mental health journey over time",
    icon: ListChecks,
    path: "/progress-reports"
  },
  {
    title: "Family Resources",
    description: "Support tools for families and caregivers",
    icon: HandHeart,
    path: "/family-support"
  },
  {
    title: "Alternative Therapies",
    description: "Explore art, music, and nature-based healing approaches",
    icon: FlameKindling,
    path: "/alternative-therapies"
  },
  {
    title: "Mindfulness & Sleep",
    description: "Diverse meditation practices and sleep tracking",
    icon: Moon,
    path: "/mindfulness"
  },
  {
    title: "Therapy Options",
    description: "Connect with licensed therapists",
    icon: GraduationCap,
    path: "/therapist-matches"
  },
  {
    title: "Workshops",
    description: "Interactive learning experiences",
    icon: CalendarRange,
    path: "/workshops"
  },
  {
    title: "Self-Help Resources",
    description: "Articles, videos, and tips on various mental health topics",
    icon: Library,
    path: "/self-help-resources"
  },
  {
    title: "Journaling",
    description: "Space for personal reflections and emotional expression",
    icon: Heart,
    path: "/journaling"
  },
  {
    title: "Crisis Support",
    description: "Immediate resources and hotlines for when you need help",
    icon: Heart,
    path: "/crisis-support"
  },
  {
    title: "Progress Analytics",
    description: "Track and analyze your mental wellness journey",
    icon: ListChecks,
    path: "/progress-analytics"
  },
  {
    title: "Holistic Wellness",
    description: "Comprehensive approach to physical, mental, and spiritual wellbeing",
    icon: LeafyGreen,
    path: "/holistic-wellness"
  }
];

export default keyFeatures;
