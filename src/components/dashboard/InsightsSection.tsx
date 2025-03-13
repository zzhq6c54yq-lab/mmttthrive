
import React from "react";
import { Brain, TrendingUp, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const InsightsSection = () => {
  // Mock data for insights
  const moodData = {
    average: 7.2,
    improvement: "+12%",
    triggers: ["Work stress", "Poor sleep"],
    patterns: [
      { day: "Mon", value: 45 },
      { day: "Tue", value: 65 },
      { day: "Wed", value: 60 },
      { day: "Thu", value: 80 },
      { day: "Fri", value: 75 },
      { day: "Sat", value: 85 },
      { day: "Sun", value: 90 },
    ],
  };

  return (
    <Card className="border-[#B87333]/20 hover:border-[#B87333]/40 transition-all duration-300 shadow-sm hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Brain className="h-5 w-5 text-[#B87333]" />
          Mood Insights
        </CardTitle>
        <CardDescription>Patterns and trends in your mood entries</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-muted-foreground">Average Mood</span>
              <div className="text-2xl font-bold">{moodData.average}/10</div>
            </div>
            <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full text-xs">
              <TrendingUp className="h-3 w-3" />
              {moodData.improvement}
            </div>
          </div>

          <div>
            <span className="text-sm text-muted-foreground">Weekly Trend</span>
            <div className="mt-2 flex items-end space-x-1">
              {moodData.patterns.map((day) => (
                <div key={day.day} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-[#B87333]/20 rounded-t-sm" 
                    style={{ height: `${day.value}px` }} 
                  />
                  <span className="text-xs mt-1">{day.day}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className="text-sm text-muted-foreground">Potential Triggers</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {moodData.triggers.map((trigger, index) => (
                <span 
                  key={index} 
                  className="px-2 py-1 bg-[#B87333]/10 text-[#B87333] rounded-full text-xs flex items-center gap-1"
                >
                  <AlertCircle className="h-3 w-3" />
                  {trigger}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-3 text-center">
          <a 
            href="/progress-reports" 
            className="text-sm text-[#B87333] hover:text-[#A56625] underline-offset-4 hover:underline"
          >
            View Detailed Reports
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightsSection;
