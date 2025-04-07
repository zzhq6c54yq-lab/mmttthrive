
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Briefcase, Users, TrendingUp, Brain, HeartPulse, Sparkles } from "lucide-react";
import HomeButton from "@/components/HomeButton";

const SmallBusinessWelcome: React.FC = () => {
  const [screenState, setScreenState] = useState<'welcome' | 'what-to-expect'>('welcome');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleContinue = () => {
    if (screenState === 'welcome') {
      setScreenState('what-to-expect');
      window.scrollTo(0, 0);
    } else {
      toast({
        title: "Entering Small Business Portal",
        description: "Taking you to the Small Business wellness portal",
        duration: 2000,
      });
      
      setTimeout(() => {
        navigate("/small-business-portal", { 
          state: { 
            fromWelcome: true,
            preventTutorial: true,
            returnToMain: true 
          }
        });
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f301a] via-[#164430] to-[#1f5640] text-white py-8 px-4 relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23FFFFFF%22 fill-opacity=%220.05%22/></svg>')] opacity-20"></div>
      
      <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-green-900/30 relative overflow-hidden">
        <div className="absolute top-4 right-4 z-20">
          <HomeButton />
        </div>
        
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-green-700/20 to-transparent rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-green-500/20 to-transparent rounded-full blur-3xl -z-10"></div>
        
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 animate-fade-in">
          {screenState === 'welcome' ? (
            <>
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl"></div>
                <div className="relative p-5 rounded-full bg-gradient-to-br from-green-700 to-green-900 border-2 border-green-400/30 shadow-lg">
                  <Briefcase className="h-12 w-12 text-green-200" />
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-300 to-green-500 tracking-tight">
                Small Business Wellness Solutions
              </h1>
              
              <div className="max-w-2xl mb-10">
                <p className="text-xl mb-4 text-white font-medium">
                  Welcome to specialized mental wellness resources designed for small business owners, entrepreneurs, and their teams.
                </p>
                
                <p className="text-lg text-green-200/90 mb-6">
                  Running a small business comes with unique stressors and challenges. This portal provides tailored 
                  support to help you maintain your mental health while growing your business and supporting your team's wellbeing.
                </p>
                
                <div className="flex flex-wrap justify-center gap-3 mb-6">
                  <div className="flex items-center gap-2 bg-green-900/30 px-3 py-1 rounded-full">
                    <Users className="h-4 w-4 text-green-300" />
                    <span className="text-sm text-green-200">Team Wellness</span>
                  </div>
                  <div className="flex items-center gap-2 bg-green-900/30 px-3 py-1 rounded-full">
                    <TrendingUp className="h-4 w-4 text-green-300" />
                    <span className="text-sm text-green-200">Business Growth</span>
                  </div>
                  <div className="flex items-center gap-2 bg-green-900/30 px-3 py-1 rounded-full">
                    <Brain className="h-4 w-4 text-green-300" />
                    <span className="text-sm text-green-200">Entrepreneur Mindset</span>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={handleContinue}
                className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-6 h-auto transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(0,0,0,0.3)] flex items-center gap-2"
              >
                Continue <ArrowRight className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <>
              <h1 className="text-4xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-300 to-green-500 tracking-tight">
                What You'll Find Here
              </h1>
              
              <div className="max-w-3xl mb-10">
                <div className="bg-gradient-to-r from-green-900/40 to-green-800/40 backdrop-blur-sm rounded-xl p-6 border border-green-700/30 mb-8">
                  <ul className="space-y-5 text-left">
                    <li className="flex items-start rounded-lg p-3 bg-green-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-green-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <span className="text-lg text-white">Specialized resources for managing business stress, decision fatigue, and financial anxiety</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-green-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-green-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <span className="text-lg text-white">Strategies for building a mentally healthy workplace culture that attracts and retains talent</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-green-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-green-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <span className="text-lg text-white">Tools for work-life balance and boundary-setting for business owners who struggle to "switch off"</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-green-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-green-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <span className="text-lg text-white">Access to affordable mental health resources that fit within small business budgets</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-green-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-green-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <span className="text-lg text-white">Peer community with other business owners facing similar mental health challenges</span>
                    </li>
                    
                    <li className="flex items-start rounded-lg p-3 bg-green-900/20 backdrop-blur-sm">
                      <div className="p-1 rounded-full bg-green-700/30 mr-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <span className="text-lg text-white">Expert-led workshops on leadership wellness, preventing burnout, and building resilience</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <Button 
                onClick={handleContinue}
                className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-6 h-auto transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(0,0,0,0.3)] flex items-center gap-2 group"
              >
                Enter Portal <Sparkles className="h-5 w-5 ml-2 group-hover:animate-pulse" />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmallBusinessWelcome;
