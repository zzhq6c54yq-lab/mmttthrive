
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { VirtualClass } from "@/data/toolCategories";

interface FeaturedWorkshopsProps {
  workshops: VirtualClass[];
}

const FeaturedWorkshops: React.FC<FeaturedWorkshopsProps> = ({ workshops }) => {
  const navigate = useNavigate();

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Self-Paced Workshops</h2>
        <Link to="/virtual-classes" className="text-[#B87333] flex items-center hover:underline">
          View All <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {workshops.map((workshop, index) => (
          <Card key={index} className="bg-[#2a2a30] border-[#3a3a40] overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg text-white">{workshop.title}</h3>
                <Badge variant="outline" className="text-[#B87333] border-[#B87333]">
                  {workshop.type.replace('_', ' ')}
                </Badge>
              </div>
              
              <p className="text-gray-300 text-sm mb-4">{workshop.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-400">
                  <User className="h-4 w-4 mr-1" /> 
                  <span>{workshop.facilitator}</span>
                </div>
                <Button variant="outline_copper" size="sm" className="ml-auto" onClick={() => navigate("/virtual-classes")}>
                  Start Now
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturedWorkshops;
