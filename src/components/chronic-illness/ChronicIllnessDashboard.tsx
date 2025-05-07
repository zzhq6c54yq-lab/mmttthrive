
import React from "react";
import { BookOpen, Heart, Activity, Users, Headphones, Stethoscope, Dumbbell, Target, User, BarChart2, MessageSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useFeatureActions from "@/hooks/useFeatureActions";

const ChronicIllnessDashboard: React.FC = () => {
  const { handleActionClick } = useFeatureActions();
  
  const sections = [
    {
      id: "understanding",
      title: "Understanding Chronic Illness",
      description: "Educational resources and personal stories",
      icon: BookOpen,
      color: "bg-purple-500",
      actions: [
        { type: "workshop" as const, id: "chronic101", title: "Chronic Illness 101", path: "/chronic-illness/education" },
        { type: "other" as const, title: "Personal Stories", path: "/chronic-illness/stories" }
      ]
    },
    {
      id: "emotional-support",
      title: "Emotional Support & Coping",
      description: "Track your mood and learn coping strategies",
      icon: Heart,
      color: "bg-purple-600",
      actions: [
        { type: "assessment" as const, id: "mood-tracking", title: "Mood Tracker", path: "/chronic-illness/mood" },
        { type: "practice" as const, id: "coping", title: "Coping Techniques", path: "/chronic-illness/coping" }
      ]
    },
    {
      id: "daily-management",
      title: "Daily Management Tools",
      description: "Track symptoms, medications, and appointments",
      icon: Activity,
      color: "bg-purple-500",
      actions: [
        { type: "other" as const, title: "Symptom Tracker", path: "/chronic-illness/symptoms" },
        { type: "other" as const, title: "Medication Reminders", path: "/chronic-illness/medications" }
      ]
    },
    {
      id: "community",
      title: "Community Support",
      description: "Connect with others on similar journeys",
      icon: Users,
      color: "bg-purple-400",
      actions: [
        { type: "discussion" as const, title: "Community Forums", path: "/chronic-illness/community" },
        { type: "join" as const, title: "Support Groups", path: "/chronic-illness/groups" }
      ]
    },
    {
      id: "professionals",
      title: "Access to Professionals",
      description: "Connect with specialists and find resources",
      icon: Headphones,
      color: "bg-purple-600",
      actions: [
        { type: "other" as const, title: "Teletherapy Options", path: "/chronic-illness/teletherapy" },
        { type: "other" as const, title: "Resource Directory", path: "/chronic-illness/resources" }
      ]
    },
    {
      id: "mindfulness",
      title: "Mindfulness & Relaxation",
      description: "Guided practices for pain and stress management",
      icon: Dumbbell,
      color: "bg-purple-500",
      actions: [
        { type: "practice" as const, id: "meditation", title: "Guided Meditations", path: "/chronic-illness/meditations" },
        { type: "practice" as const, id: "movement", title: "Gentle Movement", path: "/chronic-illness/movement" }
      ]
    },
    {
      id: "goals",
      title: "Goal Setting & Motivation",
      description: "Set personalized health goals and track progress",
      icon: Target,
      color: "bg-purple-400",
      actions: [
        { type: "other" as const, title: "Set Health Goals", path: "/chronic-illness/goals" },
        { type: "other" as const, title: "Track Progress", path: "/chronic-illness/progress" }
      ]
    },
    {
      id: "caregivers",
      title: "Family & Caregiver Resources",
      description: "Support for those who support you",
      icon: User,
      color: "bg-purple-500",
      actions: [
        { type: "workshop" as const, id: "caregiver", title: "Caregiver Support", path: "/chronic-illness/caregivers" },
        { type: "other" as const, title: "Communication Tools", path: "/chronic-illness/communication" }
      ]
    },
    {
      id: "integration",
      title: "Health App Integration",
      description: "Connect your health tracking apps",
      icon: BarChart2,
      color: "bg-purple-600",
      actions: [
        { type: "other" as const, title: "Connect Devices", path: "/chronic-illness/connect" },
        { type: "other" as const, title: "View Health Data", path: "/chronic-illness/health-data" }
      ]
    },
    {
      id: "feedback",
      title: "Feedback & Improvements",
      description: "Help us better support your needs",
      icon: MessageSquare,
      color: "bg-purple-500",
      actions: [
        { type: "other" as const, title: "Share Feedback", path: "/chronic-illness/feedback" },
        { type: "assessment" as const, id: "needs", title: "Needs Assessment", path: "/chronic-illness/assess-needs" }
      ]
    }
  ];
  
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Chronic Illness Support Portal</h1>
        <p className="text-lg max-w-3xl mx-auto">
          Tools and resources to support your mental and emotional wellbeing while managing chronic health conditions.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <Card key={section.id} className="transition-all hover:shadow-lg dark:bg-gray-800/50 backdrop-blur-sm border border-purple-200 dark:border-purple-900/50">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className={`p-2 rounded-full ${section.color}`}>
                <section.icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle>{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                {section.actions.map((action, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    className="justify-start hover:bg-purple-50 dark:hover:bg-purple-900/20"
                    onClick={() => handleActionClick(action)}
                  >
                    {action.title}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ChronicIllnessDashboard;
