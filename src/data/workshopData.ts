
import { Brain, Heart, ShieldCheck, Zap, Moon, UserPlus, Laugh, PenTool, Compass, BadgeCheck, Sparkles, LucideIcon } from "lucide-react";

interface WorkshopData {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  duration: string;
}

export const workshopData: WorkshopData[] = [
  {
    id: "mindful-communication",
    title: "Mindful Communication",
    description: "Learn effective communication techniques rooted in mindfulness principles to improve personal and professional relationships.",
    icon: Brain,
    color: "bg-[#9b87f5]/10",
    duration: "45 minutes"
  },
  {
    id: "emotional-regulation",
    title: "Emotional Regulation",
    description: "Develop skills to manage difficult emotions and respond rather than react to challenging situations.",
    icon: Heart,
    color: "bg-[#f58787]/10",
    duration: "45 minutes"
  },
  {
    id: "stress-management",
    title: "Stress Management",
    description: "Evidence-based strategies to reduce stress and build resilience in high-pressure environments.",
    icon: ShieldCheck,
    color: "bg-[#87f5c8]/10",
    duration: "45 minutes"
  },
  {
    id: "better-sleep",
    title: "Better Sleep Habits",
    description: "Practical techniques for improving sleep quality and developing a healthy sleep routine.",
    icon: Moon,
    color: "bg-[#5c7de3]/10",
    duration: "45 minutes"
  },
  {
    id: "cognitive-reframing",
    title: "Cognitive Reframing",
    description: "Change your perspective on challenging situations through evidence-based cognitive techniques.",
    icon: Zap,
    color: "bg-[#e3b85c]/10",
    duration: "45 minutes"
  },
  {
    id: "gratitude-practice",
    title: "Gratitude Practice",
    description: "Cultivate a gratitude practice to enhance wellbeing, reduce stress, and improve mood.",
    icon: Sparkles,
    color: "bg-[#5ce39b]/10",
    duration: "45 minutes"
  },
  {
    id: "self-compassion",
    title: "Self-Compassion Skills",
    description: "Develop self-compassion skills to counteract self-criticism and enhance emotional wellbeing.",
    icon: Laugh,
    color: "bg-[#e35c9b]/10",
    duration: "45 minutes"
  },
  {
    id: "social-connection",
    title: "Building Social Connection",
    description: "Strategies for meaningful social connections that support mental health and resilience.",
    icon: UserPlus,
    color: "bg-[#e39b5c]/10",
    duration: "45 minutes"
  },
  {
    id: "anxiety-management",
    title: "Anxiety Management Toolkit",
    description: "Practical tools and techniques for managing anxiety in everyday situations.",
    icon: BadgeCheck,
    color: "bg-[#5ce3e3]/10",
    duration: "45 minutes"
  },
  {
    id: "boundary-setting",
    title: "Healthy Boundary Setting",
    description: "Learn to establish and maintain healthy boundaries in all areas of your life.",
    icon: Compass,
    color: "bg-[#c85ce3]/10",
    duration: "45 minutes"
  },
  {
    id: "values-alignment",
    title: "Living by Your Values",
    description: "Clarify your core values and align your actions and choices with what matters most to you.",
    icon: PenTool,
    color: "bg-[#e3c85c]/10",
    duration: "45 minutes"
  },
  {
    id: "habit-formation",
    title: "Habit Formation Mastery",
    description: "Science-based approaches to building sustainable habits that support your mental wellness goals.",
    icon: Sparkles,
    color: "bg-[#5cc8e3]/10",
    duration: "45 minutes"
  }
];
