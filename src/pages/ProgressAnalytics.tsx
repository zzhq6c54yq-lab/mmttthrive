
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, LineChart, BarChart, PieChart, Calendar, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import HomeButton from "@/components/HomeButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart as RechartsLineChart, Line, BarChart as RechartsBarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProgressAnalytics = () => {
  // Sample data for charts
  const moodData = [
    { name: 'Week 1', mood: 5 },
    { name: 'Week 2', mood: 4 },
    { name: 'Week 3', mood: 6 },
    { name: 'Week 4', mood: 7 },
    { name: 'Week 5', mood: 6 },
    { name: 'Week 6', mood: 8 },
    { name: 'Week 7', mood: 7 },
    { name: 'Week 8', mood: 9 },
  ];

  const activityData = [
    { name: 'Mon', minutes: 20 },
    { name: 'Tue', minutes: 30 },
    { name: 'Wed', minutes: 15 },
    { name: 'Thu', minutes: 40 },
    { name: 'Fri', minutes: 25 },
    { name: 'Sat', minutes: 35 },
    { name: 'Sun', minutes: 45 },
  ];

  const wellnessData = [
    { name: 'Sleep', value: 30 },
    { name: 'Exercise', value: 25 },
    { name: 'Nutrition', value: 20 },
    { name: 'Mindfulness', value: 15 },
    { name: 'Social', value: 10 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#eef1f5]">
      <div className="bg-gradient-to-r from-[#1a1a1f] to-[#212124] text-white py-12 relative">
        <div className="container px-4 max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Link 
              to="/" 
              state={{ screenState: 'main', returnToMain: true }}
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Main Dashboard
            </Link>
            <HomeButton />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-light mb-4">Progress Analytics</h1>
          <p className="text-xl text-gray-300 max-w-3xl">Track your mental health journey with detailed insights and analytics.</p>
        </div>
      </div>

      <div className="container px-4 py-12 max-w-6xl mx-auto">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="h-5 w-5 text-blue-500" />
                    Mood Tracker
                  </CardTitle>
                  <CardDescription>
                    Your mood progression over the past 8 weeks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart
                        data={moodData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 10]} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="mood" stroke="#8884d8" activeDot={{ r: 8 }} />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-green-500" />
                    Activity Tracking
                  </CardTitle>
                  <CardDescription>
                    Minutes spent on wellness activities this week
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={activityData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="minutes" fill="#82ca9d" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-purple-500" />
                  Wellness Components
                </CardTitle>
                <CardDescription>
                  Distribution of different aspects of your wellness routine
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={wellnessData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {wellnessData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Long-Term Progress</CardTitle>
                <CardDescription>
                  View your mental health metrics over different time periods
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3 mb-4">
                  <Button variant="outline" size="sm">Last 30 Days</Button>
                  <Button variant="outline" size="sm">Last 3 Months</Button>
                  <Button variant="outline" size="sm">Last 6 Months</Button>
                  <Button variant="outline" size="sm">Last Year</Button>
                  <Button variant="outline" size="sm">Custom Range</Button>
                </div>
                <div className="text-center text-gray-500 py-16">
                  Select a time period to view detailed trend analysis
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Compare your progress with previous periods or with your goals.
                  </p>
                  <Button className="w-full">View Comparisons</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Patterns</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Identify recurring patterns and triggers in your mental health journey.
                  </p>
                  <Button className="w-full">Analyze Patterns</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Correlations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Discover relationships between different aspects of your wellness.
                  </p>
                  <Button className="w-full">Explore Correlations</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Generated Reports</CardTitle>
                <CardDescription>
                  Detailed reports of your mental health progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Monthly Progress Summary</h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>Generated on {new Date().toLocaleDateString()}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      PDF
                    </Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Therapy Session Insights</h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>Generated on {new Date().toLocaleDateString()}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      PDF
                    </Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Wellness Activity Impact</h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>Generated on {new Date().toLocaleDateString()}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      PDF
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Generate New Report</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Share with Your Care Team</CardTitle>
                <CardDescription>
                  Securely share your progress with therapists or other healthcare providers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Select which reports you'd like to share and who you'd like to share them with.
                  All sharing is secure and complies with privacy regulations.
                </p>
                <Button className="w-full">Manage Sharing</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProgressAnalytics;
