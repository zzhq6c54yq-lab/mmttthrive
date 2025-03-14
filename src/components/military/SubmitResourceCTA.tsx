
import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const SubmitResourceCTA = () => {
  const { toast } = useToast();
  
  const handleSubmitResource = () => {
    toast({
      title: "Resource Submission",
      description: "Thank you for your interest. The submission form will be available soon.",
    });
  };
  
  return (
    <div className="mt-16 bg-gradient-to-r from-[#B87333]/20 to-transparent p-8 rounded-lg border border-[#B87333]/30">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">Have a Resource to Share?</h3>
          <p className="text-gray-300">
            If you know of helpful resources for military mental health, we welcome your suggestions.
          </p>
        </div>
        
        <Button variant="gold" size="lg" onClick={handleSubmitResource}>
          Submit Resource
        </Button>
      </div>
    </div>
  );
};

export default SubmitResourceCTA;
