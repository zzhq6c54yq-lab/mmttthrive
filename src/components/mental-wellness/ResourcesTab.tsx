
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Download } from "lucide-react";

const ResourcesTab: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleDownloadResource = (resourceName: string) => {
    toast({
      title: "Resource Downloaded",
      description: `Your ${resourceName} is being prepared for download.`,
      duration: 2000
    });
    
    // Simulating download completion
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: `${resourceName} has been downloaded successfully.`,
        duration: 3000
      });
    }, 2000);
  };

  const handleSubscriptionView = () => {
    navigate("/subscription-plans");
    toast({
      title: "Subscription Options",
      description: "Exploring premium resource access options.",
      duration: 2000
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#F8F9FA] rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Downloadable Resources</h2>
        <p className="text-gray-600 mb-6">
          Access these free resources to support your mental wellness journey offline.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border border-[#B87333]/20 hover:border-[#B87333]/50 transition-all">
            <CardHeader className="pb-2">
              <div className="bg-[#B87333]/10 rounded-lg p-3 inline-block mb-2">
                <Download className="h-5 w-5 text-[#B87333]" />
              </div>
              <CardTitle className="text-lg">Mindfulness Workbook</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">A comprehensive guide to mindfulness practices with exercises.</p>
              <Button 
                onClick={() => handleDownloadResource("Mindfulness Workbook")}
                className="w-full bg-[#B87333] hover:bg-[#B87333]/90"
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border border-[#B87333]/20 hover:border-[#B87333]/50 transition-all">
            <CardHeader className="pb-2">
              <div className="bg-[#B87333]/10 rounded-lg p-3 inline-block mb-2">
                <Download className="h-5 w-5 text-[#B87333]" />
              </div>
              <CardTitle className="text-lg">Anxiety Toolkit</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">Practical strategies and exercises to manage anxiety and stress.</p>
              <Button 
                onClick={() => handleDownloadResource("Anxiety Toolkit")}
                className="w-full bg-[#B87333] hover:bg-[#B87333]/90"
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border border-[#B87333]/20 hover:border-[#B87333]/50 transition-all">
            <CardHeader className="pb-2">
              <div className="bg-[#B87333]/10 rounded-lg p-3 inline-block mb-2">
                <Download className="h-5 w-5 text-[#B87333]" />
              </div>
              <CardTitle className="text-lg">Sleep Improvement Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">Better sleep hygiene habits and relaxation techniques for restful nights.</p>
              <Button 
                onClick={() => handleDownloadResource("Sleep Improvement Guide")}
                className="w-full bg-[#B87333] hover:bg-[#B87333]/90"
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-[#1E1E2D]/90 to-[#2D2D3D]/90 backdrop-blur-sm rounded-xl p-6 border border-[#9b87f5]/20 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-60 h-60 bg-gradient-to-br from-[#9b87f5]/20 to-transparent rounded-full blur-3xl -z-10"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-medium mb-4 text-white">Subscribe for Premium Resources</h2>
          <p className="text-white/80 mb-6 max-w-3xl mx-auto">
            Get access to our complete library of premium resources, including extended worksheets, guided audio sessions, and expert-led videos.
          </p>
          <Button 
            onClick={handleSubscriptionView}
            className="bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:from-[#8b77e5] hover:to-[#6E59A5] text-white px-8"
          >
            View Subscription Options
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default ResourcesTab;
