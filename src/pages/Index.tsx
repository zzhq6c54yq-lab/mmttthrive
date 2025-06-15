
import React from "react";
import { Button } from "@/components/ui/button";
import DashboardContent from "@/components/dashboard/DashboardContent";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();

  // Provide minimal required props to DashboardContent
  return (
    <div>
      <div className="mb-6 flex justify-center">
        <Button 
          asChild 
          className="bg-gradient-to-r from-blue-700 to-indigo-400 text-white rounded-lg shadow-lg"
        >
          <a href="/all-workshops">
            View All Workshops
          </a>
        </Button>
      </div>
      <DashboardContent 
        navigate={navigate}
        onWorkshopClick={() => {}}
        selectedQualities={[]}
        selectedGoals={[]}
      />
    </div>
  );
}
