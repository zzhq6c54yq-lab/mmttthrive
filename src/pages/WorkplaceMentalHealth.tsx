
import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import Page from "@/components/Page";
import WorkplaceCrisisBar from "@/components/workplace/WorkplaceCrisisBar";
import WorkplaceGameCard from "@/components/workplace/WorkplaceGameCard";
import WorkplaceWorkshopCard from "@/components/workplace/WorkplaceWorkshopCard";
import SubmitWorkplaceResource from "@/components/workplace/SubmitWorkplaceResource";
import { Briefcase, Book, PenTool, Lightbulb, Users, Activity } from "lucide-react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const WorkplaceMentalHealth = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  
  const tabCategories = [
    { name: "Overview", icon: Briefcase },
    { name: "Workshops", icon: Users },
    { name: "Activities", icon: Activity },
    { name: "Resources", icon: Book },
  ];
  
  // Workplace workshop data (simplified version - would normally come from an API or data file)
  const workshops = [
    {
      id: "workplace-stress-management",
      title: "Workplace Stress Management",
      description: "Learn practical techniques to manage stress in high-pressure work environments",
      host: "Dr. Jennifer Liu",
      date: "Next Session: October 12, 2023",
      attendees: 24,
      duration: "60 minutes",
      level: "Beginner",
      tags: ["Stress", "Productivity", "Work-Life Balance"]
    },
    {
      id: "digital-wellness",
      title: "Digital Wellness at Work",
      description: "Strategies to maintain mental health while using digital tools throughout the workday",
      host: "Marco Sanchez, Digital Wellness Coach",
      date: "Next Session: October 15, 2023",
      attendees: 18,
      duration: "45 minutes",
      level: "Intermediate",
      tags: ["Digital Health", "Boundaries", "Focus"]
    },
    {
      id: "conflict-resolution",
      title: "Workplace Conflict Resolution",
      description: "Develop skills to address and resolve conflicts with colleagues constructively",
      host: "Dr. Tamika Johnson",
      date: "Next Session: October 20, 2023",
      attendees: 30,
      duration: "90 minutes",
      level: "Advanced",
      tags: ["Communication", "Relationships", "Teamwork"]
    }
  ];
  
  // Workplace games and activities
  const games = [
    {
      id: "mindful-moments",
      title: "Mindful Moments",
      description: "Quick mindfulness exercises designed for busy professionals to reduce stress during the workday",
      icon: PenTool,
      type: "individual-activity",
      playerCount: "1 player",
      timeToComplete: "5 minutes",
      benefits: ["Stress reduction", "Improved focus", "Emotional regulation"],
      color: "#4C6EF5"
    },
    {
      id: "team-appreciation",
      title: "Team Appreciation Circle",
      description: "A structured group activity where team members express appreciation for each other's contributions",
      icon: Users,
      type: "team-building",
      playerCount: "3-10 players",
      timeToComplete: "15-20 minutes",
      benefits: ["Team bonding", "Positive culture", "Motivation"],
      color: "#12B886"
    },
    {
      id: "work-life-balance",
      title: "Work-Life Balance Challenge",
      description: "A 7-day challenge with daily prompts to improve work-life balance and boundary setting",
      icon: Activity,
      type: "challenge",
      playerCount: "Any number",
      timeToComplete: "7 days",
      benefits: ["Boundary setting", "Self-care", "Productivity"],
      color: "#FA5252"
    },
    {
      id: "creativity-boost",
      title: "Creativity Boost",
      description: "Quick creative thinking exercises to stimulate innovation and break through mental blocks",
      icon: Lightbulb,
      type: "creativity-exercise",
      playerCount: "1-5 players",
      timeToComplete: "10-15 minutes",
      benefits: ["Innovation", "Problem-solving", "Mental flexibility"],
      color: "#FD7E14"
    }
  ];
  
  return (
    <Page>
      <WorkplaceCrisisBar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Workplace Mental Health Portal</h1>
            <p className="text-xl text-gray-600">Tools, resources and support for maintaining mental wellbeing at work</p>
          </div>
          
          <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
            <Tab.List className="flex p-1 space-x-1 bg-gray-100 rounded-xl mb-8">
              {tabCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <Tab
                    key={index}
                    className={({ selected }) =>
                      classNames(
                        'w-full rounded-lg py-3 text-sm font-medium leading-5 flex items-center justify-center',
                        'focus:outline-none transition-all duration-200',
                        selected
                          ? 'bg-white shadow text-[#6E59A5]'
                          : 'text-gray-600 hover:bg-white/30 hover:text-[#6E59A5]'
                      )
                    }
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {category.name}
                  </Tab>
                );
              })}
            </Tab.List>
            
            <Tab.Panels className="mt-2">
              {/* Overview Panel */}
              <Tab.Panel className="rounded-xl p-3">
                <div className="grid gap-8">
                  <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Supporting Mental Health in the Workplace</h2>
                    <p className="text-gray-600 mb-6">
                      Our Workplace Mental Health Portal provides resources, workshops, and activities designed to support 
                      employee wellbeing, reduce stigma around mental health issues, and create a more supportive work environment.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-purple-50 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-[#6E59A5] mb-2">For Employees</h3>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#6E59A5] mr-2"></div>
                            Self-care activities for the workday
                          </li>
                          <li className="flex items-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#6E59A5] mr-2"></div>
                            Stress management techniques
                          </li>
                          <li className="flex items-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#6E59A5] mr-2"></div>
                            Work-life balance strategies
                          </li>
                          <li className="flex items-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#6E59A5] mr-2"></div>
                            Crisis support resources
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-purple-50 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-[#6E59A5] mb-2">For Teams & Leaders</h3>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#6E59A5] mr-2"></div>
                            Creating psychologically safe teams
                          </li>
                          <li className="flex items-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#6E59A5] mr-2"></div>
                            Supporting team members in distress
                          </li>
                          <li className="flex items-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#6E59A5] mr-2"></div>
                            Mental health conversation starters
                          </li>
                          <li className="flex items-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#6E59A5] mr-2"></div>
                            Team building activities
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Featured Resources</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <h4 className="font-medium text-[#6E59A5]">Mental Health First Aid</h4>
                        <p className="text-sm text-gray-600">Training for recognizing signs of mental health challenges</p>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <h4 className="font-medium text-[#6E59A5]">Burnout Prevention Guide</h4>
                        <p className="text-sm text-gray-600">Strategies to identify and prevent workplace burnout</p>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <h4 className="font-medium text-[#6E59A5]">Wellbeing Check-in Tool</h4>
                        <p className="text-sm text-gray-600">Simple assessment to monitor your workplace wellbeing</p>
                      </div>
                    </div>
                  </div>
                  
                  <SubmitWorkplaceResource />
                </div>
              </Tab.Panel>
              
              {/* Workshops Panel */}
              <Tab.Panel className="rounded-xl p-3">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Workplace Wellness Workshops</h2>
                  <p className="text-gray-600">
                    Join interactive sessions focused on improving mental health and wellbeing in professional environments.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {workshops.map((workshop) => (
                    <WorkplaceWorkshopCard 
                      key={workshop.id}
                      id={workshop.id}
                      title={workshop.title}
                      description={workshop.description}
                      host={workshop.host}
                      date={workshop.date}
                      attendees={workshop.attendees}
                      duration={workshop.duration}
                      level={workshop.level}
                      tags={workshop.tags}
                    />
                  ))}
                </div>
                
                <SubmitWorkplaceResource />
              </Tab.Panel>
              
              {/* Activities Panel */}
              <Tab.Panel className="rounded-xl p-3">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Workplace Wellbeing Activities</h2>
                  <p className="text-gray-600">
                    Interactive exercises and games designed to improve mental health, team cohesion, and workplace satisfaction.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {games.map((game) => (
                    <WorkplaceGameCard 
                      key={game.id}
                      id={game.id}
                      title={game.title}
                      description={game.description}
                      icon={game.icon}
                      type={game.type}
                      playerCount={game.playerCount}
                      timeToComplete={game.timeToComplete}
                      benefits={game.benefits}
                      color={game.color}
                    />
                  ))}
                </div>
                
                <SubmitWorkplaceResource />
              </Tab.Panel>
              
              {/* Resources Panel */}
              <Tab.Panel className="rounded-xl p-3">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Workplace Mental Health Resources</h2>
                  <p className="text-gray-600">
                    Articles, guides, and tools to support mental wellbeing in professional settings.
                  </p>
                </div>
                
                <div className="grid gap-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Mental Health Policies & Guidelines</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 border border-gray-200 rounded-lg hover:border-[#6E59A5]/40 transition-colors">
                        <h4 className="font-medium text-[#6E59A5]">Sample Mental Health Policy</h4>
                        <p className="text-sm text-gray-600 mt-1">Template for organizations to develop their own mental health policies</p>
                      </div>
                      <div className="p-4 border border-gray-200 rounded-lg hover:border-[#6E59A5]/40 transition-colors">
                        <h4 className="font-medium text-[#6E59A5]">Manager's Guide to Supporting Employee Mental Health</h4>
                        <p className="text-sm text-gray-600 mt-1">Best practices for team leaders and managers</p>
                      </div>
                      <div className="p-4 border border-gray-200 rounded-lg hover:border-[#6E59A5]/40 transition-colors">
                        <h4 className="font-medium text-[#6E59A5]">Return-to-Work After Mental Health Leave</h4>
                        <p className="text-sm text-gray-600 mt-1">Framework for supporting employees transitioning back to work</p>
                      </div>
                      <div className="p-4 border border-gray-200 rounded-lg hover:border-[#6E59A5]/40 transition-colors">
                        <h4 className="font-medium text-[#6E59A5]">Mental Health Reasonable Accommodations</h4>
                        <p className="text-sm text-gray-600 mt-1">Guide to workplace accommodations for mental health conditions</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Self-Help Resources</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-4 border border-gray-200 rounded-lg hover:border-[#6E59A5]/40 transition-colors">
                        <h4 className="font-medium text-[#6E59A5]">Desk Exercises for Anxiety</h4>
                        <p className="text-sm text-gray-600 mt-1">Quick techniques to manage workplace anxiety</p>
                      </div>
                      <div className="p-4 border border-gray-200 rounded-lg hover:border-[#6E59A5]/40 transition-colors">
                        <h4 className="font-medium text-[#6E59A5]">Work-Life Balance Assessment</h4>
                        <p className="text-sm text-gray-600 mt-1">Tool to evaluate and improve your work-life integration</p>
                      </div>
                      <div className="p-4 border border-gray-200 rounded-lg hover:border-[#6E59A5]/40 transition-colors">
                        <h4 className="font-medium text-[#6E59A5]">Burnout Self-Check</h4>
                        <p className="text-sm text-gray-600 mt-1">Questionnaire to identify signs of workplace burnout</p>
                      </div>
                      <div className="p-4 border border-gray-200 rounded-lg hover:border-[#6E59A5]/40 transition-colors">
                        <h4 className="font-medium text-[#6E59A5]">Workplace Mindfulness Guide</h4>
                        <p className="text-sm text-gray-600 mt-1">Techniques for staying present and focused at work</p>
                      </div>
                      <div className="p-4 border border-gray-200 rounded-lg hover:border-[#6E59A5]/40 transition-colors">
                        <h4 className="font-medium text-[#6E59A5]">Stress Tracking Journal</h4>
                        <p className="text-sm text-gray-600 mt-1">Template for identifying workplace stressors and patterns</p>
                      </div>
                      <div className="p-4 border border-gray-200 rounded-lg hover:border-[#6E59A5]/40 transition-colors">
                        <h4 className="font-medium text-[#6E59A5]">Mental Health Emergency Plan</h4>
                        <p className="text-sm text-gray-600 mt-1">Personalized guide for handling mental health crises at work</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <SubmitWorkplaceResource />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </Page>
  );
};

export default WorkplaceMentalHealth;
