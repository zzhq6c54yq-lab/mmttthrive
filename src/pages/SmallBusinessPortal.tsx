
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Briefcase, Users, FileText, Calendar, ArrowRight, Wallet, Building, Brain, Handshake, HelpCircle, ChartBar } from "lucide-react";
import Page from "@/components/Page";
import useTranslation from "@/hooks/useTranslation";

const SmallBusinessPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'business' | 'employee' | 'resources' | 'workshops'>('business');
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { isSpanish } = useTranslation();

  // Set active tab based on URL params if they exist
  React.useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get('tab');
    if (tab === 'employee') {
      setActiveTab('employee');
    }
  }, [location.search]);

  const handleTabChange = (tab: 'business' | 'employee' | 'resources' | 'workshops') => {
    setActiveTab(tab);
  };

  const handleFeatureClick = (path: string) => {
    toast({
      title: isSpanish ? "Navegando" : "Navigating",
      description: isSpanish ? "Accediendo a recursos específicos" : "Accessing specific resources",
      duration: 2000
    });
    
    navigate(`/${path}`, { 
      state: { 
        fromSpecializedProgram: true, 
        preventTutorial: true 
      }
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'business':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <FeatureCard 
              title={isSpanish ? "Manejo del Estrés" : "Stress Management"}
              description={isSpanish 
                ? "Técnicas específicas para manejar el estrés de dirigir un negocio" 
                : "Specific techniques for managing the stress of running a business"}
              icon={Brain}
              color="bg-amber-600"
              onClick={() => handleFeatureClick("mental-wellness")}
            />
            <FeatureCard 
              title={isSpanish ? "Salud Financiera" : "Financial Wellness"}
              description={isSpanish 
                ? "Recursos para reducir la ansiedad relacionada con las finanzas empresariales" 
                : "Resources for reducing anxiety related to business finances"}
              icon={Wallet}
              color="bg-green-600"
              onClick={() => handleFeatureClick("resource-library")}
            />
            <FeatureCard 
              title={isSpanish ? "Liderazgo Saludable" : "Healthy Leadership"}
              description={isSpanish 
                ? "Crear una cultura de trabajo que priorice el bienestar mental" 
                : "Building a workplace culture that prioritizes mental wellbeing"}
              icon={Building}
              color="bg-blue-600"
              onClick={() => handleFeatureClick("workshops")}
            />
            <FeatureCard 
              title={isSpanish ? "Equilibrio Trabajo-Vida" : "Work-Life Balance"}
              description={isSpanish 
                ? "Estrategias para equilibrar las demandas empresariales y la vida personal" 
                : "Strategies for balancing business demands and personal life"}
              icon={ChartBar}
              color="bg-purple-600"
              onClick={() => handleFeatureClick("holistic-wellness")}
            />
            <FeatureCard 
              title={isSpanish ? "Redes de Apoyo" : "Support Networks"}
              description={isSpanish 
                ? "Conéctate con otros emprendedores que entienden tus desafíos" 
                : "Connect with other entrepreneurs who understand your challenges"}
              icon={Handshake}
              color="bg-pink-600"
              onClick={() => handleFeatureClick("community-support")}
            />
            <FeatureCard 
              title={isSpanish ? "Crisis y Soporte" : "Crisis & Support"}
              description={isSpanish 
                ? "Recursos para cuando los desafíos empresariales afectan severamente la salud mental" 
                : "Resources for when business challenges severely impact mental health"}
              icon={HelpCircle}
              color="bg-red-600"
              onClick={() => handleFeatureClick("crisis-support")}
            />
          </div>
        );
      case 'employee':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <FeatureCard 
              title={isSpanish ? "Bienestar en el Trabajo" : "Workplace Wellness"}
              description={isSpanish 
                ? "Recursos para mantener el bienestar mental en un entorno de pequeña empresa" 
                : "Resources for maintaining mental wellbeing in a small business environment"}
              icon={Building}
              color="bg-emerald-600"
              onClick={() => handleFeatureClick("employee-readiness")}
            />
            <FeatureCard 
              title={isSpanish ? "Equilibrio Trabajo-Vida" : "Work-Life Balance"}
              description={isSpanish 
                ? "Estrategias para mantener límites saludables entre el trabajo y la vida personal" 
                : "Strategies for maintaining healthy boundaries between work and personal life"}
              icon={ChartBar}
              color="bg-indigo-600"
              onClick={() => handleFeatureClick("wellness-challenges")}
            />
            <FeatureCard 
              title={isSpanish ? "Manejo del Estrés" : "Stress Management"}
              description={isSpanish 
                ? "Técnicas para manejar el estrés específico de trabajar en una pequeña empresa" 
                : "Techniques for managing stress specific to working in a small business"}
              icon={Brain}
              color="bg-purple-600"
              onClick={() => handleFeatureClick("mental-wellness")}
            />
            <FeatureCard 
              title={isSpanish ? "Desarrollo de Carrera" : "Career Development"}
              description={isSpanish 
                ? "Recursos para el crecimiento profesional mientras cuidas tu salud mental" 
                : "Resources for professional growth while caring for your mental health"}
              icon={ChartBar}
              color="bg-cyan-600"
              onClick={() => handleFeatureClick("resource-library")}
            />
            <FeatureCard 
              title={isSpanish ? "Comunidad de Apoyo" : "Support Community"}
              description={isSpanish 
                ? "Conéctate con otros empleados que enfrentan desafíos similares" 
                : "Connect with other employees facing similar challenges"}
              icon={Users}
              color="bg-pink-600"
              onClick={() => handleFeatureClick("community-support")}
            />
            <FeatureCard 
              title={isSpanish ? "Evaluaciones de Bienestar" : "Wellness Assessments"}
              description={isSpanish 
                ? "Evaluaciones personalizadas para empleados de pequeñas empresas" 
                : "Personalized assessments for small business employees"}
              icon={FileText}
              color="bg-amber-600"
              onClick={() => handleFeatureClick("mental-wellness/assessments")}
            />
          </div>
        );
      case 'resources':
        return (
          <div className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-[#1F1B15] border-amber-900/30 hover:border-amber-700/50 transition-colors shadow-lg">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-amber-900/30 rounded-full">
                        <FileText className="h-5 w-5 text-amber-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white">Small Business Resource Library</h3>
                    </div>
                    <p className="text-white/70 mb-4">
                      Access articles, guides, and tools specifically created for small business mental wellness.
                    </p>
                    <Button 
                      className="w-full bg-amber-700 hover:bg-amber-800 text-white"
                      onClick={() => handleFeatureClick("resource-library")}
                    >
                      Browse Resources
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#1F1B15] border-amber-900/30 hover:border-amber-700/50 transition-colors shadow-lg">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-amber-900/30 rounded-full">
                        <Brain className="h-5 w-5 text-amber-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white">Mental Health Toolkit</h3>
                    </div>
                    <p className="text-white/70 mb-4">
                      Essential tools and strategies to promote mental wellness in small business environments.
                    </p>
                    <Button 
                      className="w-full bg-amber-700 hover:bg-amber-800 text-white"
                      onClick={() => handleFeatureClick("mental-wellness-tools")}
                    >
                      Access Toolkit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case 'workshops':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <Card className="bg-[#1F1B15] border-amber-900/30 hover:border-amber-700/50 transition-colors shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-amber-900/30 rounded-full">
                    <Building className="h-5 w-5 text-amber-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Entrepreneurial Resilience</h3>
                </div>
                <p className="text-white/70 mb-4">
                  Build mental toughness and resilience for the unique challenges of small business ownership.
                </p>
                <div className="mb-4 p-2 bg-amber-900/20 rounded-lg text-sm text-white/70">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-amber-400" />
                    <span>April 19, 2025 - 2:00 PM ET</span>
                  </div>
                </div>
                <Button 
                  className="w-full bg-amber-700 hover:bg-amber-800 text-white"
                  onClick={() => handleFeatureClick("workshops")}
                >
                  Register Now
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-[#1F1B15] border-amber-900/30 hover:border-amber-700/50 transition-colors shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-amber-900/30 rounded-full">
                    <Users className="h-5 w-5 text-amber-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Building a Wellness-Focused Team</h3>
                </div>
                <p className="text-white/70 mb-4">
                  Learn how to create a workplace culture that supports mental health for all team members.
                </p>
                <div className="mb-4 p-2 bg-amber-900/20 rounded-lg text-sm text-white/70">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-amber-400" />
                    <span>April 26, 2025 - 1:00 PM ET</span>
                  </div>
                </div>
                <Button 
                  className="w-full bg-amber-700 hover:bg-amber-800 text-white"
                  onClick={() => handleFeatureClick("workshops")}
                >
                  Register Now
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-[#1F1B15] border-amber-900/30 hover:border-amber-700/50 transition-colors shadow-lg col-span-1 md:col-span-2">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-amber-900/30 rounded-full">
                    <FileText className="h-5 w-5 text-amber-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">All Small Business Workshops</h3>
                </div>
                <p className="text-white/70 mb-4">
                  Browse our full catalog of workshops specifically designed for small business owners and employees.
                </p>
                <Button 
                  className="w-full bg-amber-700 hover:bg-amber-800 text-white"
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
      className="bg-[#1F1B15] border-amber-900/30 hover:border-amber-700/50 transition-colors shadow-lg cursor-pointer hover:shadow-xl"
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
    <Page title={isSpanish ? "Portal de Pequeñas Empresas" : "Small Business Portal"} returnToMain>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-[#F97316]/30 to-[#FB923C]/30 p-6 rounded-xl backdrop-blur-md border border-amber-500/30 shadow-lg">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="p-4 bg-white/10 rounded-full">
              <Briefcase className="h-10 w-10 text-[#F97316]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {isSpanish ? "Recursos de Bienestar Mental para Pequeñas Empresas" : "Small Business Mental Wellness Resources"}
              </h2>
              <p className="text-white/80">
                {isSpanish 
                  ? "Recursos especializados para apoyar la salud mental de emprendedores y empleados de pequeñas empresas."
                  : "Specialized resources to support the mental health of entrepreneurs and small business employees."}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#1A1811] border border-amber-900/30 rounded-lg overflow-hidden shadow-lg">
          <div className="flex overflow-x-auto scrollbar-hide">
            <button
              className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                activeTab === 'business' 
                  ? 'border-amber-500 text-amber-400' 
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
              onClick={() => handleTabChange('business')}
            >
              For Business Owners
            </button>
            <button
              className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                activeTab === 'employee' 
                  ? 'border-amber-500 text-amber-400' 
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
              onClick={() => handleTabChange('employee')}
            >
              For Employees
            </button>
            <button
              className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                activeTab === 'resources' 
                  ? 'border-amber-500 text-amber-400' 
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
              onClick={() => handleTabChange('resources')}
            >
              Resources
            </button>
            <button
              className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
                activeTab === 'workshops' 
                  ? 'border-amber-500 text-amber-400' 
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

export default SmallBusinessPortal;
