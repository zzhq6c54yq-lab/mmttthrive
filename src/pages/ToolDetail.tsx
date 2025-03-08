
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { toolCategories, ToolCategory } from '@/data/toolCategories';
import { Button } from '@/components/ui/button';
import HomeButton from '@/components/HomeButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const ToolDetail = () => {
  const { toolId } = useParams<{ toolId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tool, setTool] = useState<ToolCategory | null>(null);

  useEffect(() => {
    if (toolId) {
      const foundTool = toolCategories.find(tool => 
        tool.title.toLowerCase().replace(/\s+/g, '-') === toolId
      );
      
      setTool(foundTool || null);
      
      if (!foundTool) {
        toast({
          title: "Tool Not Found",
          description: "The requested resource could not be found.",
          variant: "destructive"
        });
      }
    }
  }, [toolId, toast]);

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
          <h2 className="text-2xl font-semibold mb-4">Tool Not Found</h2>
          <p className="text-gray-700 mb-4">
            The requested tool could not be found. Please check the URL or return to the tools directory.
          </p>
          <Button onClick={() => navigate("/mental-wellness-tools")}>
            Back to Mental Wellness Tools
          </Button>
        </div>
      </div>
    );
  }

  const handleToolInteraction = () => {
    toast({
      title: `${tool.title} Activated`,
      description: "Starting your wellness activity...",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#1a1a1f] text-white py-12 relative overflow-hidden">
        <div className="floating-bg animate-pulse"></div>
        <div className="container px-4 max-w-6xl mx-auto relative z-10">
          <div className="flex justify-between items-center mb-6">
            <Link to="/mental-wellness-tools" className="inline-flex items-center text-[#B87333] hover:text-[#B87333]/80 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tools
            </Link>
            <HomeButton />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-light mb-4 gradient-heading">{tool.title}</h1>
          <p className="text-xl text-gray-300 max-w-3xl">{tool.description}</p>
        </div>
      </div>

      <div className="container px-4 py-12 max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-light mb-6">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tool.features.map((feature, index) => (
              <Card key={index} className="border-[#B87333]/30 bg-white/80 hover:shadow-md transition-all">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">{feature}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-center">
          <p className="text-lg mb-6 text-center max-w-2xl">
            Ready to start your {tool.title.toLowerCase()} journey? Click the button below to begin.
          </p>
          <Button 
            className="bg-[#B87333] hover:bg-[#B87333]/90 px-8 py-6 text-lg hero-button"
            onClick={handleToolInteraction}
          >
            {tool.cta}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ToolDetail;
