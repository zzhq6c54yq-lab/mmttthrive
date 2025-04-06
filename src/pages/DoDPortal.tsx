
import React, { useState } from "react";
import Page from "@/components/Page";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Sparkles, Briefcase, Globe, BookOpen, HeartPulse, Calendar, Zap, AlertCircle, Video, FileText, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import useTranslation from "@/hooks/useTranslation";

const DoDPortal: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isSpanish } = useTranslation();
  const [activeTab, setActiveTab] = useState<'resources' | 'community' | 'assessments' | 'workshops'>('resources');
  
  const handleFeatureClick = (feature: string) => {
    toast({
      title: isSpanish ? "Navegando" : "Navigating", 
      description: isSpanish ? "Accediendo a recursos específicos para personal militar" : "Accessing specific resources for military personnel",
      duration: 2000
    });
    
    navigate(`/${feature}`, { 
      state: { 
        fromSpecializedProgram: true, 
        preventTutorial: true 
      }
    });
  };

  const handleTabChange = (tab: 'resources' | 'community' | 'assessments' | 'workshops') => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'resources':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <FeatureCard 
              title={isSpanish ? "Apoyo para PTSD" : "PTSD Support"}
              description={isSpanish 
                ? "Recursos especializados para el manejo del trastorno de estrés postraumático" 
                : "Specialized resources for managing post-traumatic stress disorder"}
              icon={Shield}
              color="bg-blue-600"
              onClick={() => handleFeatureClick("mental-wellness")}
            />
            <FeatureCard
              title={isSpanish ? "Transición a la Vida Civil" : "Transition to Civilian Life"}
              description={isSpanish 
                ? "Apoyo para una transición exitosa a la vida después del servicio militar" 
                : "Support for a successful transition to life after military service"}
              icon={Briefcase}
              color="bg-purple-600"
              onClick={() => handleFeatureClick("resource-library")}
            />
            <FeatureCard
              title={isSpanish ? "Apoyo Familiar" : "Family Support"}
              description={isSpanish 
                ? "Recursos para las familias de personal militar durante el despliegue y después" 
                : "Resources for military families during deployment and beyond"}
              icon={HeartPulse}
              color="bg-emerald-600"
              onClick={() => handleFeatureClick("family-resources")}
            />
            <FeatureCard
              title={isSpanish ? "Manejo del Estrés en Combate" : "Combat Stress Management"}
              description={isSpanish 
                ? "Técnicas y herramientas específicas para el manejo del estrés en situaciones de combate" 
                : "Specific techniques and tools for managing stress in combat situations"}
              icon={Sparkles}
              color="bg-rose-600"
              onClick={() => handleFeatureClick("workshops")}
            />
            <FeatureCard
              title={isSpanish ? "Educación y Entrenamiento" : "Education & Training"}
              description={isSpanish 
                ? "Oportunidades educativas y de entrenamiento para personal militar y veteranos" 
                : "Educational and training opportunities for military personnel and veterans"}
              icon={BookOpen}
              color="bg-cyan-600"
              onClick={() => handleFeatureClick("resource-library")}
            />
            <FeatureCard
              title={isSpanish ? "Crisis y Emergencias" : "Crisis & Emergency"}
              description={isSpanish 
                ? "Recursos de apoyo inmediato para situaciones de crisis emocional" 
                : "Immediate support resources for emotional crisis situations"}
              icon={AlertCircle}
              color="bg-red-600"
              onClick={() => handleFeatureClick("crisis-support")}
            />
          </div>
        );
      case 'community':
        return (
          <div className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-[#141921] border-blue-900/30 hover:border-blue-700/50 transition-colors shadow-lg">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-900/30 rounded-full">
                        <Globe className="h-5 w-5 text-blue-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white">Veteran Community Forums</h3>
                    </div>
                    <p className="text-white/70 mb-4">
                      Connect with other veterans to share experiences, advice, and support in a safe, moderated environment.
                    </p>
                    <Button 
                      className="w-full bg-blue-700 hover:bg-blue-800 text-white"
                      onClick={() => handleFeatureClick("community-support")}
                    >
                      Join Community
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#141921] border-blue-900/30 hover:border-blue-700/50 transition-colors shadow-lg">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-900/30 rounded-full">
                        <Video className="h-5 w-5 text-blue-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white">Virtual Peer Support</h3>
                    </div>
                    <p className="text-white/70 mb-4">
                      Join virtual meetups with fellow service members and veterans for mutual support and shared understanding.
                    </p>
                    <Button 
                      className="w-full bg-blue-700 hover:bg-blue-800 text-white"
                      onClick={() => handleFeatureClick("community-support")}
                    >
                      Find Support Groups
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="bg-[#141921] border-blue-900/30 hover:border-blue-700/50 transition-colors shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-900/30 rounded-full">
                    <Calendar className="h-5 w-5 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Upcoming Community Events</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center bg-blue-900/20 p-4 rounded-lg">
                    <div className="bg-blue-900/20 text-blue-400 p-2 rounded-lg mr-4 text-center min-w-[60px]">
                      <span className="block text-sm">APR</span>
                      <span className="block text-xl font-bold">15</span>
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-medium text-white">Resilience Workshop</h4>
                      <p className="text-sm text-white/70">Virtual | 2:00 PM ET</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-blue-500 text-blue-300 hover:bg-blue-900/50"
                      onClick={() => handleFeatureClick("workshops")}
                    >
                      Register
                    </Button>
                  </div>
                  
                  <div className="flex items-center bg-blue-900/20 p-4 rounded-lg">
                    <div className="bg-blue-900/20 text-blue-400 p-2 rounded-lg mr-4 text-center min-w-[60px]">
                      <span className="block text-sm">APR</span>
                      <span className="block text-xl font-bold">22</span>
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-medium text-white">PTSD Support Group</h4>
                      <p className="text-sm text-white/70">Online | 7:00 PM ET</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-blue-500 text-blue-300 hover:bg-blue-900/50"
                      onClick={() => handleFeatureClick("community-support")}
                    >
                      Register
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case 'assessments':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <Card className="bg-[#141921] border-blue-900/30 hover:border-blue-700/50 transition-colors shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-900/30 rounded-full">
                    <Shield className="h-5 w-5 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">PTSD Screening</h3>
                </div>
                <p className="text-white/70 mb-4">
                  A validated screening tool specifically designed for military personnel to assess symptoms of PTSD.
                </p>
                <div className="flex justify-between text-white/50 text-sm mb-4">
                  <span>5 minutes</span>
                  <span>17 questions</span>
                </div>
                <Button 
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white"
                  onClick={() => handleFeatureClick("mental-wellness/assessments")}
                >
                  Begin Assessment
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-[#141921] border-blue-900/30 hover:border-blue-700/50 transition-colors shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-900/30 rounded-full">
                    <Zap className="h-5 w-5 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Stress Management</h3>
                </div>
                <p className="text-white/70 mb-4">
                  Evaluate your current stress levels and identify triggers specific to military service.
                </p>
                <div className="flex justify-between text-white/50 text-sm mb-4">
                  <span>3 minutes</span>
                  <span>12 questions</span>
                </div>
                <Button 
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white"
                  onClick={() => handleFeatureClick("mental-wellness/assessments")}
                >
                  Begin Assessment
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-[#141921] border-blue-900/30 hover:border-blue-700/50 transition-colors shadow-lg col-span-1 md:col-span-2">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-900/30 rounded-full">
                    <FileText className="h-5 w-5 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">All Assessments</h3>
                </div>
                <p className="text-white/70 mb-4">
                  View our complete library of mental health assessments tailored for military personnel and veterans.
                </p>
                <Button 
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white"
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
            <Card className="bg-[#141921] border-blue-900/30 hover:border-blue-700/50 transition-colors shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-900/30 rounded-full">
                    <Shield className="h-5 w-5 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Combat Stress Workshop</h3>
                </div>
                <p className="text-white/70 mb-4">
                  Learn practical techniques for managing stress reactions specific to combat situations.
                </p>
                <div className="mb-4 p-2 bg-blue-900/20 rounded-lg text-sm text-white/70">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-blue-400" />
                    <span>April 15, 2025 - 2:00 PM ET</span>
                  </div>
                </div>
                <Button 
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white"
                  onClick={() => handleFeatureClick("workshops")}
                >
                  Register Now
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-[#141921] border-blue-900/30 hover:border-blue-700/50 transition-colors shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-900/30 rounded-full">
                    <Award className="h-5 w-5 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Military to Civilian Transition</h3>
                </div>
                <p className="text-white/70 mb-4">
                  Practical guidance for transitioning from military service to civilian life.
                </p>
                <div className="mb-4 p-2 bg-blue-900/20 rounded-lg text-sm text-white/70">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-blue-400" />
                    <span>April 22, 2025 - 6:00 PM ET</span>
                  </div>
                </div>
                <Button 
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white"
                  onClick={() => handleFeatureClick("workshops")}
                >
                  Register Now
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-[#141921] border-blue-900/30 hover:border-blue-700/50 transition-colors shadow-lg col-span-1 md:col-span-2">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-900/30 rounded-full">
                    <FileText className="h-5 w-5 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">All Military Workshops</h3>
                </div>
                <p className="text-white/70 mb-4">
                  Browse our full catalog of workshops specifically designed for military personnel, veterans, and their families.
                </p>
                <Button 
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white"
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
      className="bg-[#141921] border-blue-900/30 hover:border-blue-700/50 transition-colors shadow-lg cursor-pointer hover:shadow-xl"
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
    <Page title={isSpanish ? "Departamento de Defensa" : "Department of Defense"} returnToMain>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-[#0EA5E9]/30 to-[#2563EB]/30 p-6 rounded-xl backdrop-blur-md border border-blue-500/30 shadow-lg">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="p-4 bg-white/10 rounded-full">
              <Shield className="h-10 w-10 text-[#0EA5E9]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {isSpanish ? "Recursos para el Personal Militar y Veteranos" : "Resources for Military Personnel & Veterans"}
              </h2>
              <p className="text-white/80">
                {isSpanish 
                  ? "Recursos especializados de bienestar mental diseñados específicamente para miembros actuales y anteriores de las fuerzas armadas y sus familias."
                  : "Specialized mental wellness resources designed specifically for current and former members of the armed forces and their families."}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#0F1319] border border-blue-900/30 rounded-lg overflow-hidden shadow-lg">
          <div className="flex overflow-x-auto scrollbar-hide">
            <button
              className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                activeTab === 'resources' 
                  ? 'border-blue-500 text-blue-400' 
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
              onClick={() => handleTabChange('resources')}
            >
              Resources
            </button>
            <button
              className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                activeTab === 'community' 
                  ? 'border-blue-500 text-blue-400' 
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
              onClick={() => handleTabChange('community')}
            >
              Community
            </button>
            <button
              className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                activeTab === 'assessments' 
                  ? 'border-blue-500 text-blue-400' 
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
              onClick={() => handleTabChange('assessments')}
            >
              Assessments
            </button>
            <button
              className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                activeTab === 'workshops' 
                  ? 'border-blue-500 text-blue-400' 
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

export default DoDPortal;
