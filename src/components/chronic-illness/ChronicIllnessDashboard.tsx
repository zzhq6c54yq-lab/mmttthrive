
import React from "react";
import { BookOpen, Heart, Activity, Users, HeadphonesIcon, MedkitIcon, Yoga, TargetIcon, Family, BarChart2, Feedback } from "lucide-react";
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
      color: "bg-blue-500",
      actions: [
        { type: "workshop", id: "chronic101", title: "Chronic Illness 101", path: "/chronic-illness/education" },
        { type: "other", title: "Personal Stories", path: "/chronic-illness/stories" }
      ]
    },
    {
      id: "emotional-support",
      title: "Emotional Support & Coping",
      description: "Track your mood and learn coping strategies",
      icon: Heart,
      color: "bg-pink-500",
      actions: [
        { type: "assessment", id: "mood-tracking", title: "Mood Tracker", path: "/chronic-illness/mood" },
        { type: "practice", id: "coping", title: "Coping Techniques", path: "/chronic-illness/coping" }
      ]
    },
    {
      id: "daily-management",
      title: "Daily Management Tools",
      description: "Track symptoms, medications, and appointments",
      icon: Activity,
      color: "bg-purple-500",
      actions: [
        { type: "other", title: "Symptom Tracker", path: "/chronic-illness/symptoms" },
        { type: "other", title: "Medication Reminders", path: "/chronic-illness/medications" }
      ]
    },
    {
      id: "community",
      title: "Community Support",
      description: "Connect with others on similar journeys",
      icon: Users,
      color: "bg-yellow-500",
      actions: [
        { type: "discussion", title: "Community Forums", path: "/chronic-illness/community" },
        { type: "join", title: "Support Groups", path: "/chronic-illness/groups" }
      ]
    },
    {
      id: "professionals",
      title: "Access to Professionals",
      description: "Connect with specialists and find resources",
      icon: HeadphonesIcon,
      color: "bg-indigo-500",
      actions: [
        { type: "other", title: "Teletherapy Options", path: "/chronic-illness/teletherapy" },
        { type: "other", title: "Resource Directory", path: "/chronic-illness/resources" }
      ]
    },
    {
      id: "mindfulness",
      title: "Mindfulness & Relaxation",
      description: "Guided practices for pain and stress management",
      icon: Yoga,
      color: "bg-teal-500",
      actions: [
        { type: "practice", id: "meditation", title: "Guided Meditations", path: "/chronic-illness/meditations" },
        { type: "practice", id: "movement", title: "Gentle Movement", path: "/chronic-illness/movement" }
      ]
    },
    {
      id: "goals",
      title: "Goal Setting & Motivation",
      description: "Set personalized health goals and track progress",
      icon: TargetIcon,
      color: "bg-orange-500",
      actions: [
        { type: "other", title: "Set Health Goals", path: "/chronic-illness/goals" },
        { type: "other", title: "Track Progress", path: "/chronic-illness/progress" }
      ]
    },
    {
      id: "caregivers",
      title: "Family & Caregiver Resources",
      description: "Support for those who support you",
      icon: Family,
      color: "bg-green-500",
      actions: [
        { type: "workshop", id: "caregiver", title: "Caregiver Support", path: "/chronic-illness/caregivers" },
        { type: "other", title: "Communication Tools", path: "/chronic-illness/communication" }
      ]
    },
    {
      id: "integration",
      title: "Health App Integration",
      description: "Connect your health tracking apps",
      icon: BarChart2,
      color: "bg-cyan-500",
      actions: [
        { type: "other", title: "Connect Devices", path: "/chronic-illness/connect" },
        { type: "other", title: "View Health Data", path: "/chronic-illness/health-data" }
      ]
    },
    {
      id: "feedback",
      title: "Feedback & Improvements",
      description: "Help us better support your needs",
      icon: Feedback,
      color: "bg-rose-500",
      actions: [
        { type: "other", title: "Share Feedback", path: "/chronic-illness/feedback" },
        { type: "assessment", id: "needs", title: "Needs Assessment", path: "/chronic-illness/assess-needs" }
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
          <Card key={section.id} className="transition-all hover:shadow-lg dark:bg-gray-800/50 backdrop-blur-sm border border-emerald-200 dark:border-emerald-900/50">
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
                    className="justify-start"
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
