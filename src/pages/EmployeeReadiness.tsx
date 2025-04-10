
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Page from "@/components/Page";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Users, BookOpen, Brain, Calendar, FileText, Video, HeartPulse, Activity, Clock, Zap, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmployeeReadiness: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'resources' | 'assessments' | 'workshops'>('resources');
  
  // Set active tab based on URL params if they exist
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get('tab');
    if (tab === 'assessments' || tab === 'workshops' || tab === 'resources') {
      setActiveTab(tab);
    }
  }, [location.search]);
  
  const handleTabChange = (tab: 'resources' | 'assessments' | 'workshops') => {
    setActiveTab(tab);
  };

  const handleFeatureClick = (path: string) => {
    toast({
      title: "Navigating",
      description: "Accessing specific resources for employees",
      duration: 2000
    });
    
    // Add directToAssessment flag for assessment-related paths
    const isAssessmentPath = path.includes('assessment') || path === 'mental-wellness';
    
    navigate(`/${path}`, { 
      state: { 
        fromEmployeePortal: true, 
        preventTutorial: true,
        directToAssessment: isAssessmentPath,
        startAssessment: isAssessmentPath
      }
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'resources':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <FeatureCard 
              title="Work-Life Balance"
              description="Strategies for maintaining boundaries between work and personal life"
              icon={Briefcase}
              color="bg-green-600"
              onClick={() => handleFeatureClick("holistic-wellness")}
            />
            <FeatureCard 
              title="Stress Management"
              description="Techniques to identify and reduce workplace stress"
              icon={Brain}
              color="bg-blue-600"
              onClick={() => handleFeatureClick("mental-wellness")}
            />
            <FeatureCard 
              title="Team Wellness"
              description="Building supportive relationships with colleagues"
              icon={Users}
              color="bg-purple-600"
              onClick={() => handleFeatureClick("community-support")}
            />
            <FeatureCard 
              title="Workplace Anxiety"
              description="Tools to manage anxiety and build confidence at work"
              icon={Activity}
              color="bg-pink-600"
              onClick={() => handleFeatureClick("mental-wellness-tools")}
            />
            <FeatureCard 
              title="Physical Health"
              description="Maintaining physical wellbeing to support mental health"
              icon={HeartPulse}
              color="bg-red-600"
              onClick={() => handleFeatureClick("holistic-wellness")}
            />
            <FeatureCard 
              title="Career Development"
              description="Growing professionally while prioritizing mental health"
              icon={BookOpen}
              color="bg-amber-600"
              onClick={() => handleFeatureClick("resource-library")}
            />
          </div>
        );
      case 'assessments':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <Card className="bg-[#101820] border-green-900/30 hover:border-green-700/50 transition-colors shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-900/30 rounded-full">
                    <Activity className="h-5 w-5 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Workplace Stress Assessment</h3>
                </div>
                <p className="text-white/70 mb-4">
                  Evaluate your current stress levels related to your workplace and get personalized recommendations.
                </p>
                <div className="flex justify-between text-white/50 text-sm mb-4">
                  <span>4 minutes</span>
                  <span>15 questions</span>
                </div>
                <Button 
                  className="w-full bg-green-700 hover:bg-green-800 text-white"
                  onClick={() => handleFeatureClick("mental-wellness/assessments/workplace-stress")}
                >
                  Begin Assessment
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-[#101820] border-green-900/30 hover:border-green-700/50 transition-colors shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-900/30 rounded-full">
                    <Clock className="h-5 w-5 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Work-Life Balance</h3>
                </div>
                <p className="text-white/70 mb-4">
                  Assess how well you're balancing work responsibilities with personal life and wellbeing.
                </p>
                <div className="flex justify-between text-white/50 text-sm mb-4">
                  <span>3 minutes</span>
                  <span>12 questions</span>
                </div>
                <Button 
                  className="w-full bg-green-700 hover:bg-green-800 text-white"
                  onClick={() => handleFeatureClick("mental-wellness/assessments/work-life-balance")}
                >
                  Begin Assessment
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-[#101820] border-green-900/30 hover:border-green-700/50 transition-colors shadow-lg col-span-1 md:col-span-2">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-900/30 rounded-full">
                    <FileText className="h-5 w-5 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">All Employee Assessments</h3>
                </div>
                <p className="text-white/70 mb-4">
                  View our complete library of mental health assessments tailored for employees.
                </p>
                <Button 
                  className="w-full bg-green-700 hover:bg-green-800 text-white"
                  onClick={() => handleFeatureClick("mental-wellness/assessments")}
                >
                  View All Assessments
                </Button>
              </CardContent>
            </Card>
          </div>
        );
      case 'workshops':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <Card className="bg-[#101820] border-green-900/30 hover:border-green-700/50 transition-colors shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-900/30 rounded-full">
                    <Brain className="h-5 w-5 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Mindfulness at Work</h3>
                </div>
                <p className="text-white/70 mb-4">
                  Learn practical mindfulness techniques you can use throughout your workday.
                </p>
                <div className="mb-4 p-2 bg-green-900/20 rounded-lg text-sm text-white/70">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-green-400" />
                    <span>April 18, 2025 - 1:00 PM ET</span>
                  </div>
                </div>
                <Button 
                  className="w-full bg-green-700 hover:bg-green-800 text-white"
                  onClick={() => handleFeatureClick("workshops")}
                >
                  Register Now
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-[#101820] border-green-900/30 hover:border-green-700/50 transition-colors shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-900/30 rounded-full">
                    <Zap className="h-5 w-5 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Burnout Prevention</h3>
                </div>
                <p className="text-white/70 mb-4">
                  Identify early signs of burnout and develop preventive strategies.
                </p>
                <div className="mb-4 p-2 bg-green-900/20 rounded-lg text-sm text-white/70">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-green-400" />
                    <span>April 25, 2025 - 3:00 PM ET</span>
                  </div>
                </div>
                <Button 
                  className="w-full bg-green-700 hover:bg-green-800 text-white"
                  onClick={() => handleFeatureClick("workshops")}
                >
                  Register Now
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-[#101820] border-green-900/30 hover:border-green-700/50 transition-colors shadow-lg col-span-1 md:col-span-2">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-900/30 rounded-full">
                    <FileText className="h-5 w-5 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">All Employee Workshops</h3>
                </div>
                <p className="text-white/70 mb-4">
                  Browse our full catalog of workshops specifically designed for workplace wellness.
                </p>
                <Button 
                  className="w-full bg-green-700 hover:bg-green-800 text-white"
                  onClick={() => handleFeatureClick("workshops")}
                >
                  View All Workshops
                </Button>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return null;
    }
  };

  const FeatureCard = ({ title, description, icon: Icon, color, onClick }) => (
    <Card 
      onClick={onClick}
      className="bg-[#101820] border-green-900/30 hover:border-green-700/50 transition-colors shadow-lg cursor-pointer hover:shadow-xl"
    >
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-full ${color} bg-opacity-20`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        <p className="text-white/70 text-sm">{description}</p>
      </CardContent>
    </Card>
  );

  return (
    <Page title="Employee Wellness Portal" returnToMain>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-[#22C55E]/30 to-[#4ADE80]/30 p-6 rounded-xl backdrop-blur-md border border-green-500/30 shadow-lg">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="p-4 bg-white/10 rounded-full">
              <Briefcase className="h-10 w-10 text-[#22C55E]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Employee Mental Wellness Resources
              </h2>
              <p className="text-white/80">
                Specialized resources to support your mental health in the workplace and help you thrive both professionally and personally.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#0B1218] border border-green-900/30 rounded-lg overflow-hidden shadow-lg">
          <div className="flex overflow-x-auto scrollbar-hide">
            <button
              className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                activeTab === 'resources' 
                  ? 'border-green-500 text-green-400' 
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
              onClick={() => handleTabChange('resources')}
            >
              Resources
            </button>
            <button
              className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                activeTab === 'assessments' 
                  ? 'border-green-500 text-green-400' 
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
              onClick={() => handleTabChange('assessments')}
            >
              Assessments
            </button>
            <button
              className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                activeTab === 'workshops' 
                  ? 'border-green-500 text-green-400' 
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
              onClick={() => handleTabChange('workshops')}
            >
              Workshops
            </button>
          </div>
          
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </Page>
  );
};

export default EmployeeReadiness;
