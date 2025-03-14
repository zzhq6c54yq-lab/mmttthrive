
import React from "react";
import { Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const CrisisResourcesBar = () => {
  return (
    <div className="bg-[#B87333]/10 border-b border-[#B87333]/20">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#B87333] mb-2 flex items-center">
              <Phone className="mr-2 h-5 w-5" />
              Crisis Resources - Available 24/7
            </h2>
            <p className="text-gray-300">
              If you're experiencing a mental health crisis, help is available right now.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button variant="gold">
              <Phone className="mr-2 h-4 w-4" />
              Call 988 (Press 1)
            </Button>
            
            <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">
              <MessageSquare className="mr-2 h-4 w-4" />
              Text 838255
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrisisResourcesBar;
