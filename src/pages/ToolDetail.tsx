import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { toolCategories } from '@/data/toolCategories';
import { Button } from '@/components/ui/button';
import HomeButton from '@/components/HomeButton';

const ToolDetail = () => {
  const { toolId } = useParams<{ toolId: string }>();
  const navigate = useNavigate();
  const [tool, setTool] = useState(null);

  useEffect(() => {
    const foundTool = toolCategories.find(tool => 
      tool.title.toLowerCase().replace(/\s+/g, '-') === toolId
    );
    setTool(foundTool);
  }, [toolId]);

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md">
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
          <h2 className="text-3xl font-light mb-4">Features</h2>
          <ul className="list-disc list-inside text-lg">
            {tool.features.map((feature, index) => (
              <li key={index} className="mb-2">{feature}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-3xl font-light mb-4">How to Use</h2>
          <p className="text-lg">{tool.howToUse}</p>
        </div>
      </div>
    </div>
  );
};

export default ToolDetail;
