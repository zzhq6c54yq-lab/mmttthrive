
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "@/components/Page";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Activity, TrendingUp, Calendar, Award, CheckCircle, ArrowRight, BarChart, Battery, Brain } from "lucide-react";

// Progress tracking data
const weeklyProgress = [
  { day: "Mon", value: 70 },
  { day: "Tue", value: 85 },
  { day: "Wed", value: 60 },
  { day: "Thu", value: 90 },
  { day: "Fri", value: 75 },
  { day: "Sat", value: 80 },
  { day: "Sun", value: 95 },
];

const affirmations = [
  "You're making excellent progress on your journey!",
  "Your dedication to mental wellness is admirable.",
  "Every step you take brings you closer to your goals.",
  "You've shown remarkable growth this week.",
  "Your consistency is building a foundation for lasting change.",
  "Remember to celebrate these wins, no matter how small they seem.",
  "Your efforts today are creating a better tomorrow.",
  "The progress you're making is truly inspiring."
];

const achievements = [
  { 
    title: "Consistent Meditation", 
    description: "Completed meditation sessions 5 days in a row", 
    date: "3 days ago",
    icon: Brain,
    color: "bg-[#9b87f5]/20 text-[#9b87f5]"
  },
  { 
    title: "Journaling Master", 
    description: "Recorded thoughts and feelings for 7 consecutive days", 
    date: "1 week ago",
    icon: CheckCircle,
    color: "bg-[#0EA5E9]/20 text-[#0EA5E9]"
  },
  { 
    title: "Mindfulness Explorer", 
    description: "Tried 3 different mindfulness exercises", 
    date: "2 weeks ago",
    icon: Award,
    color: "bg-[#F97316]/20 text-[#F97316]"
  }
];

const ProgressReports = () => {
  const navigate = useNavigate();
  const [selectedAffirmation, setSelectedAffirmation] = useState(() => {
    // Select a random affirmation
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    return affirmations[randomIndex];
  });

  const handleBack = () => {
    navigate("/");
  };

  return (
    <Page title="Progress & Insights" showBackButton={true} onBackClick={handleBack}>
      <div className="space-y-6 max-w-6xl mx-auto">
        {/* Daily Affirmation Card */}
        <Card className="border-[#B87333]/30 bg-gradient-to-r from-[#FEF7CD]/50 to-white">
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle className="text-[#B87333]">Today's Affirmation</CardTitle>
              <Button variant="ghost" size="sm" className="text-[#B87333]" onClick={() => {
                const nextIndex = (affirmations.indexOf(selectedAffirmation) + 1) % affirmations.length;
                setSelectedAffirmation(affirmations[nextIndex]);
              }}>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-xl italic text-center py-4 text-[#B87333]">"{selectedAffirmation}"</p>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Weekly Mood Chart */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-[#9b87f5]" />
                    <CardTitle className="text-lg">Weekly Mood Tracker</CardTitle>
                  </div>
                  <CardDescription>Your emotional wellness over the past week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 w-full">
                    <div className="flex h-48 items-end justify-between">
                      {weeklyProgress.map((day, index) => (
                        <div key={index} className="flex flex-col items-center w-1/7">
                          <div 
                            className="w-full max-w-[30px] rounded-t-sm transition-all hover:opacity-80" 
                            style={{ 
                              height: `${day.value}%`, 
                              background: `linear-gradient(to top, #9b87f5 0%, #7E69AB 100%)` 
                            }}
                          ></div>
                          <span className="text-xs mt-2 text-gray-600">{day.day}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Progress Metrics */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-[#F97316]" />
                    <CardTitle className="text-lg">Progress Metrics</CardTitle>
                  </div>
                  <CardDescription>Key wellness indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Stress Management</span>
                        <span className="text-sm text-gray-500">75%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#F97316] rounded-full" style={{ width: "75%" }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Mindfulness</span>
                        <span className="text-sm text-gray-500">60%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#0EA5E9] rounded-full" style={{ width: "60%" }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Emotional Regulation</span>
                        <span className="text-sm text-gray-500">85%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#9b87f5] rounded-full" style={{ width: "85%" }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Overall Wellbeing</span>
                        <span className="text-sm text-gray-500">80%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#B87333] rounded-full" style={{ width: "80%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-[#B87333]" />
                  <CardTitle>Your Recent Achievements</CardTitle>
                </div>
                <CardDescription>
                  Milestones you've reached on your wellness journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                      <div className={`p-2 rounded-full ${achievement.color}`}>
                        <achievement.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{achievement.title}</h4>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                        <p className="text-xs text-gray-400 mt-1">{achievement.date}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                        <Award className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Achievements</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Insights Tab */}
          <TabsContent value="insights">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-[#9b87f5]" />
                    <CardTitle className="text-lg">Personalized Insights</CardTitle>
                  </div>
                  <CardDescription>Based on your recent activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-sm">
                    <div className="p-3 bg-[#9b87f5]/10 rounded-lg">
                      <p>Your meditation consistency is impressive. Consider trying a longer session on days when you have more time.</p>
                    </div>
                    <div className="p-3 bg-[#0EA5E9]/10 rounded-lg">
                      <p>You seem to experience lower stress levels on days when you journal in the morning. This might be a pattern worth exploring.</p>
                    </div>
                    <div className="p-3 bg-[#F97316]/10 rounded-lg">
                      <p>The breathing exercises appear to have a positive impact on your reported mood. Consider making them a daily habit.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-[#F97316]" />
                    <CardTitle className="text-lg">Weekly Summary</CardTitle>
                  </div>
                  <CardDescription>Your wellness journey at a glance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border-b">
                      <span className="font-medium">Activities Completed</span>
                      <span className="text-[#9b87f5] font-semibold">12</span>
                    </div>
                    <div className="flex items-center justify-between p-3 border-b">
                      <span className="font-medium">Workshop Minutes</span>
                      <span className="text-[#0EA5E9] font-semibold">85</span>
                    </div>
                    <div className="flex items-center justify-between p-3 border-b">
                      <span className="font-medium">Average Mood Rating</span>
                      <span className="text-[#F97316] font-semibold">8.2/10</span>
                    </div>
                    <div className="flex items-center justify-between p-3">
                      <span className="font-medium">Streak Days</span>
                      <span className="text-[#B87333] font-semibold">7 days</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View Full Report</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Page>
  );
};

export default ProgressReports;
