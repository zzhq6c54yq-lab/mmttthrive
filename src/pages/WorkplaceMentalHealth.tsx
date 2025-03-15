
import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import { Building, BookOpen, Briefcase, PencilRuler, Brain, Calendar, Presentation, Heart, Users, Key, Lightbulb, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Page from "@/components/Page";
import HomeButton from "@/components/HomeButton";
import WorkplaceCrisisBar from "@/components/workplace/WorkplaceCrisisBar";
import SubmitWorkplaceResource from "@/components/workplace/SubmitWorkplaceResource";
import WorkplaceWorkshopCard from "@/components/workplace/WorkplaceWorkshopCard";
import WorkplaceGameCard from "@/components/workplace/WorkplaceGameCard";
import { useToast } from "@/hooks/use-toast";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const WorkplaceMentalHealth = () => {
  const { toast } = useToast();
  const [categories] = useState({
    Overview: [],
    Workshops: [],
    Activities: [],
    Resources: []
  });

  // Sample workplace principles
  const workplacePrinciples = [
    {
      title: "Open Communication",
      description: "Create channels for honest dialogue about mental health challenges",
      icon: Brain
    },
    {
      title: "Work-Life Balance",
      description: "Promote healthy boundaries between professional and personal time",
      icon: Calendar
    },
    {
      title: "Leadership Training",
      description: "Equip managers with mental health awareness and supportive skills",
      icon: Presentation
    },
    {
      title: "Peer Support",
      description: "Develop community-based approaches to mental wellness",
      icon: Users
    },
    {
      title: "Self-Care Practices",
      description: "Integrate stress management and resilience techniques",
      icon: Heart
    },
    {
      title: "Mindful Workplace",
      description: "Create physical and digital environments that support wellbeing",
      icon: Lightbulb
    },
  ];

  // Sample employer benefits
  const employerBenefits = [
    {
      title: "Reduced Absenteeism",
      description: "Decrease sick days and mental health leaves",
      icon: Key
    },
    {
      title: "Increased Productivity",
      description: "Mentally healthy employees are more focused and efficient",
      icon: Briefcase
    },
    {
      title: "Retention & Attraction",
      description: "Become an employer of choice for top talent",
      icon: Award
    }
  ];

  const handleResourceDownload = (resourceName: string) => {
    toast({
      title: "Resource Downloaded",
      description: `${resourceName} has been downloaded.`,
    });
  };

  return (
    <Page title="Workplace Mental Health Portal">
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
        <div className="relative">
          <div className="absolute top-4 left-4 z-50">
            <HomeButton />
          </div>
          
          <WorkplaceCrisisBar />
          
          <div className="container mx-auto px-4 py-10">
            <div className="flex flex-col items-center justify-center mb-10 text-center">
              <div className="bg-purple-600/10 p-4 rounded-full mb-4">
                <Building className="h-12 w-12 text-purple-600" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Workplace Mental Health Portal</h1>
              <p className="text-xl text-gray-600 max-w-2xl">
                Supporting employee wellbeing with interactive resources, workshops, and tools
              </p>
            </div>
            
            <div className="w-full max-w-5xl mx-auto">
              <Tab.Group>
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <Tab.List className="flex p-1 bg-purple-600/10 rounded-t-xl">
                    {Object.keys(categories).map((category) => (
                      <Tab
                        key={category}
                        className={({ selected }) =>
                          classNames(
                            'w-full py-3 text-sm font-medium rounded-lg focus:outline-none',
                            selected
                              ? 'bg-white text-purple-700 shadow'
                              : 'text-gray-700 hover:text-purple-700 hover:bg-white/[0.5]'
                          )
                        }
                      >
                        <div className="flex items-center justify-center">
                          {category === "Overview" && <BookOpen className="w-4 h-4 mr-2" />}
                          {category === "Workshops" && <Calendar className="w-4 h-4 mr-2" />}
                          {category === "Activities" && <PencilRuler className="w-4 h-4 mr-2" />}
                          {category === "Resources" && <Briefcase className="w-4 h-4 mr-2" />}
                          {category}
                        </div>
                      </Tab>
                    ))}
                  </Tab.List>
                  <Tab.Panels className="p-4">
                    <Tab.Panel>
                      <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                            <h2 className="text-2xl font-bold text-purple-800 mb-4">Workplace Mental Health Matters</h2>
                            <p className="text-gray-700 mb-4">
                              Mental health challenges at work affect productivity, engagement, and overall quality of life. Our portal provides tools, resources, and support systems to help both employees and employers create healthier work environments.
                            </p>
                            <Button 
                              variant="default" 
                              className="bg-purple-600 hover:bg-purple-700"
                              onClick={() => toast({
                                title: "Getting Started",
                                description: "Take our workplace mental health assessment to begin your journey."
                              })}
                            >
                              Take Workplace Assessment
                            </Button>
                          </div>
                          
                          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                            <h2 className="text-2xl font-bold text-blue-800 mb-4">Benefits for Organizations</h2>
                            <ul className="space-y-3">
                              {employerBenefits.map((benefit, index) => (
                                <li key={index} className="flex items-start">
                                  <div className="mt-1 bg-blue-100 p-1 rounded-full">
                                    <benefit.icon className="h-4 w-4 text-blue-600" />
                                  </div>
                                  <div className="ml-3">
                                    <p className="font-medium text-blue-800">{benefit.title}</p>
                                    <p className="text-sm text-gray-600">{benefit.description}</p>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div>
                          <h2 className="text-2xl font-bold text-gray-800 mb-4">Workplace Mental Health Principles</h2>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {workplacePrinciples.map((principle, index) => (
                              <Card key={index} className="border-purple-200 hover:shadow-md transition-shadow">
                                <CardHeader className="pb-2">
                                  <div className="bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center mb-2">
                                    <principle.icon className="h-5 w-5 text-purple-600" />
                                  </div>
                                  <CardTitle className="text-lg">{principle.title}</CardTitle>
                                  <CardDescription>{principle.description}</CardDescription>
                                </CardHeader>
                              </Card>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Tab.Panel>
                    
                    <Tab.Panel>
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Workplace Wellness Workshops</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {[
                            {
                              id: "workshop-1",
                              title: "Managing Workplace Stress",
                              description: "Learn practical techniques to identify and manage stress in professional settings",
                              date: "June 15, 2023",
                              duration: "90 minutes",
                              level: "Beginner",
                              tags: ["Stress Management", "Productivity", "Wellbeing"],
                              image: "https://source.unsplash.com/random/300x200/?stress"
                            },
                            {
                              id: "workshop-2",
                              title: "Building Resilient Teams",
                              description: "Strategies for managers to foster mental health awareness and support within teams",
                              date: "June 22, 2023",
                              duration: "2 hours",
                              level: "Intermediate",
                              tags: ["Leadership", "Team Building", "Resilience"],
                              image: "https://source.unsplash.com/random/300x200/?team"
                            },
                            {
                              id: "workshop-3",
                              title: "Work-Life Integration",
                              description: "Create sustainable boundaries while thriving in both professional and personal realms",
                              date: "July 5, 2023",
                              duration: "60 minutes",
                              level: "All Levels",
                              tags: ["Balance", "Boundaries", "Self-Care"],
                              image: "https://source.unsplash.com/random/300x200/?balance"
                            },
                            {
                              id: "workshop-4",
                              title: "Mindfulness at Work",
                              description: "Practical mindfulness techniques to improve focus and reduce workplace anxiety",
                              date: "July 12, 2023",
                              duration: "90 minutes",
                              level: "Beginner",
                              tags: ["Mindfulness", "Focus", "Anxiety"],
                              image: "https://source.unsplash.com/random/300x200/?mindfulness"
                            }
                          ].map((workshop) => (
                            <WorkplaceWorkshopCard 
                              key={workshop.id}
                              id={workshop.id}
                              title={workshop.title}
                              description={workshop.description}
                              date={workshop.date}
                              duration={workshop.duration}
                              level={workshop.level}
                              tags={workshop.tags}
                              image={workshop.image}
                            />
                          ))}
                        </div>
                      </div>
                    </Tab.Panel>
                    
                    <Tab.Panel>
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Interactive Activities</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {[
                            {
                              id: "game-1",
                              title: "Stress Buster Challenge",
                              description: "Quick mini-games designed to reduce stress and boost mood during work breaks",
                              duration: "5-10 minutes",
                              difficulty: "Easy",
                              color: "bg-teal-100",
                              colorText: "text-teal-600",
                              icon: Brain
                            },
                            {
                              id: "game-2",
                              title: "Team Resilience Quest",
                              description: "Collaborative activities that strengthen team bonds and communication",
                              duration: "15-20 minutes",
                              difficulty: "Medium",
                              color: "bg-blue-100",
                              colorText: "text-blue-600",
                              icon: Users
                            },
                            {
                              id: "game-3",
                              title: "Workplace Focus Trainer",
                              description: "Brain games to improve concentration and reduce distractions",
                              duration: "5-15 minutes",
                              difficulty: "Varies",
                              color: "bg-purple-100",
                              colorText: "text-purple-600",
                              icon: Lightbulb
                            }
                          ].map((game) => (
                            <WorkplaceGameCard 
                              key={game.id}
                              id={game.id}
                              title={game.title}
                              description={game.description}
                              duration={game.duration}
                              difficulty={game.difficulty}
                              color={game.color}
                              colorText={game.colorText}
                              icon={game.icon}
                            />
                          ))}
                        </div>
                      </div>
                    </Tab.Panel>
                    
                    <Tab.Panel>
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Workplace Resources</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <Card className="border-purple-200 hover:shadow-md transition-shadow">
                            <CardHeader>
                              <CardTitle>For Employees</CardTitle>
                              <CardDescription>Resources to support your mental wellbeing at work</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-3">
                                <li className="p-3 bg-gray-50 rounded-lg">
                                  <div className="flex justify-between items-center">
                                    <div>
                                      <p className="font-medium">Mental Health Self-Assessment</p>
                                      <p className="text-sm text-gray-500">Evaluate your current workplace mental health</p>
                                    </div>
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => handleResourceDownload("Mental Health Self-Assessment")}
                                    >
                                      Download
                                    </Button>
                                  </div>
                                </li>
                                <li className="p-3 bg-gray-50 rounded-lg">
                                  <div className="flex justify-between items-center">
                                    <div>
                                      <p className="font-medium">Workplace Stress Toolkit</p>
                                      <p className="text-sm text-gray-500">Practical tools to manage daily work stress</p>
                                    </div>
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => handleResourceDownload("Workplace Stress Toolkit")}
                                    >
                                      Download
                                    </Button>
                                  </div>
                                </li>
                                <li className="p-3 bg-gray-50 rounded-lg">
                                  <div className="flex justify-between items-center">
                                    <div>
                                      <p className="font-medium">Communication Guide</p>
                                      <p className="text-sm text-gray-500">How to talk about mental health with colleagues</p>
                                    </div>
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => handleResourceDownload("Communication Guide")}
                                    >
                                      Download
                                    </Button>
                                  </div>
                                </li>
                              </ul>
                            </CardContent>
                          </Card>
                          
                          <Card className="border-purple-200 hover:shadow-md transition-shadow">
                            <CardHeader>
                              <CardTitle>For Employers & Managers</CardTitle>
                              <CardDescription>Tools to create mentally healthy work environments</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-3">
                                <li className="p-3 bg-gray-50 rounded-lg">
                                  <div className="flex justify-between items-center">
                                    <div>
                                      <p className="font-medium">Workplace Wellness Policy Template</p>
                                      <p className="text-sm text-gray-500">Framework for developing mental health policies</p>
                                    </div>
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => handleResourceDownload("Workplace Wellness Policy Template")}
                                    >
                                      Download
                                    </Button>
                                  </div>
                                </li>
                                <li className="p-3 bg-gray-50 rounded-lg">
                                  <div className="flex justify-between items-center">
                                    <div>
                                      <p className="font-medium">Manager's Mental Health Guide</p>
                                      <p className="text-sm text-gray-500">Supporting team members through challenges</p>
                                    </div>
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => handleResourceDownload("Manager's Mental Health Guide")}
                                    >
                                      Download
                                    </Button>
                                  </div>
                                </li>
                                <li className="p-3 bg-gray-50 rounded-lg">
                                  <div className="flex justify-between items-center">
                                    <div>
                                      <p className="font-medium">ROI of Workplace Wellness</p>
                                      <p className="text-sm text-gray-500">Business case for mental health initiatives</p>
                                    </div>
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => handleResourceDownload("ROI of Workplace Wellness")}
                                    >
                                      Download
                                    </Button>
                                  </div>
                                </li>
                              </ul>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </Tab.Panel>
                  </Tab.Panels>
                </div>
              </Tab.Group>
            </div>
            
            <SubmitWorkplaceResource />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default WorkplaceMentalHealth;
