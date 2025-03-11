
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "@/components/Page";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Activity, 
  ArrowUpRight, 
  Award, 
  BarChart3, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Star 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample progress data
const progressData = {
  lastWeek: [
    { day: "Mon", value: 65 },
    { day: "Tue", value: 72 },
    { day: "Wed", value: 80 },
    { day: "Thu", value: 78 },
    { day: "Fri", value: 85 },
    { day: "Sat", value: 82 },
    { day: "Sun", value: 88 },
  ],
  achievements: [
    { title: "First Workshop", description: "Completed your first workshop", date: "2 days ago", completed: true },
    { title: "Weekly Streak", description: "Logged in for 7 days in a row", date: "Yesterday", completed: true },
    { title: "Mindfulness Master", description: "Complete 5 mindfulness exercises", date: "In progress", completed: false },
    { title: "Journaling Journey", description: "Record 10 journal entries", date: "In progress", completed: false },
  ],
  insights: [
    "Your mood has been improving steadily over the past week.",
    "You tend to feel most calm after completing breathing exercises.",
    "Morning seems to be your most productive time for wellness activities.",
    "Your sleep quality has improved by 15% since starting meditation.",
  ],
  affirmations: [
    "You're making excellent progress on your wellness journey.",
    "Each step you take is bringing you closer to your goals.",
    "Your commitment to mental health is inspiring.",
    "Remember that progress isn't always linear, and that's okay.",
  ]
};

const ProgressReports = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  
  const handleBack = () => {
    navigate("/");
  };

  return (
    <Page title="Your Progress & Insights" showBackButton={true} onBackClick={handleBack}>
      <div className="max-w-5xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl">Progress Dashboard</CardTitle>
                <CardDescription>
                  Track your mental wellness journey and see how far you've come
                </CardDescription>
              </div>
              <Activity className="h-8 w-8 text-[#B87333]" />
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
                <TabsTrigger value="affirmations">Affirmations</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-[#B87333]" />
                      Weekly Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-end justify-between">
                      {progressData.lastWeek.map((day, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div 
                            className="w-10 bg-[#B87333] rounded-t-md transition-all duration-500" 
                            style={{ height: `${day.value * 2}px` }}
                          ></div>
                          <span className="mt-2 text-sm">{day.day}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="text-sm text-gray-500 flex justify-between">
                    <span>Overall trend: Improving</span>
                    <Button variant="link" className="p-0 h-auto">
                      See details
                      <ArrowUpRight className="ml-1 h-3 w-3" />
                    </Button>
                  </CardFooter>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        Completed Activities
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">12</p>
                      <p className="text-sm text-gray-500">+3 from last week</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-500" />
                        Time Invested
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">4.5 hrs</p>
                      <p className="text-sm text-gray-500">This week</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-purple-500" />
                        Current Streak
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">7 days</p>
                      <p className="text-sm text-gray-500">Keep it going!</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="achievements">
                <div className="space-y-4">
                  {progressData.achievements.map((achievement, index) => (
                    <Card key={index} className={achievement.completed ? "border-green-200" : "border-gray-200"}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-base flex items-center gap-2">
                            {achievement.completed ? (
                              <Award className="h-5 w-5 text-green-500" />
                            ) : (
                              <Award className="h-5 w-5 text-gray-400" />
                            )}
                            {achievement.title}
                          </CardTitle>
                          <span className="text-sm text-gray-500">{achievement.date}</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="insights">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-[#B87333]" />
                      Personalized Insights
                    </CardTitle>
                    <CardDescription>
                      Based on your activity patterns and progress
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {progressData.insights.map((insight, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-md">
                        <p className="text-gray-700">{insight}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="affirmations">
                <div className="space-y-4">
                  {progressData.affirmations.map((affirmation, index) => (
                    <Card key={index} className="border-[#B87333]/30 hover:border-[#B87333] transition-all duration-300">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-3">
                          <Star className="h-5 w-5 text-[#B87333] shrink-0 mt-1" />
                          <p className="text-lg italic">{affirmation}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Your Wellness Journey</CardTitle>
            <CardDescription>
              A summary of your progress since you started with Thrive MT
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#B87333]/10 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-[#B87333]" />
                </div>
                <div>
                  <p className="font-medium">Joined Thrive MT</p>
                  <p className="text-sm text-gray-500">2 weeks ago</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#B87333]/10 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-[#B87333]" />
                </div>
                <div>
                  <p className="font-medium">Completed First Workshop</p>
                  <p className="text-sm text-gray-500">10 days ago</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#B87333]/10 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-[#B87333]" />
                </div>
                <div>
                  <p className="font-medium">First 7-Day Streak</p>
                  <p className="text-sm text-gray-500">3 days ago</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Activity className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Current Progress</p>
                  <p className="text-sm text-green-600">On track with your goals</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-[#B87333] hover:bg-[#B87333]/90">
              Download Progress Report
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Page>
  );
};

export default ProgressReports;
