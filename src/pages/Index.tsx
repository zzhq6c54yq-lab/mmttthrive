import React from "react";
import { Button } from "@/components/ui/button";
import Dashboard from "@/components/dashboard/Dashboard";

export default function Index() {
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
      <Dashboard />
    </div>
  );
}
