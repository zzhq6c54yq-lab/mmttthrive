
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LightbulbIcon } from "lucide-react";

interface InsightsSectionProps {
  selectedQualities?: string[];
  selectedGoals?: string[];
}

const InsightsSection: React.FC<InsightsSectionProps> = ({ 
  selectedQualities = [], 
  selectedGoals = [] 
}) => {
  // Map quality IDs to display names
  const qualityMap: Record<string, string> = {
    'mindful': 'Mindfulness',
    'resilient': 'Resilience',
    'calm': 'Calmness',
    'focused': 'Focus',
    'empathetic': 'Empathy',
    'creative': 'Creativity',
    'confident': 'Confidence',
    'grateful': 'Gratitude',
    'patient': 'Patience',
    'balanced': 'Balance',
    'adaptable': 'Adaptability',
    'disciplined': 'Discipline'
  };

  // Map goal IDs to display names
  const goalMap: Record<string, string> = {
    'reduce-stress': 'Reduce Stress',
    'improve-sleep': 'Improve Sleep',
    'manage-anxiety': 'Manage Anxiety',
    'build-relationships': 'Build Relationships',
    'work-life-balance': 'Work-Life Balance',
    'personal-growth': 'Personal Growth',
    'healthy-habits': 'Develop Healthy Habits',
    'emotional-regulation': 'Emotional Regulation',
    'increase-productivity': 'Increase Productivity',
    'find-purpose': 'Find Purpose',
    'improve-focus': 'Improve Focus',
    'overcome-challenges': 'Overcome Challenges'
  };

  // Convert IDs to display names
  const displayQualities = selectedQualities.map(id => qualityMap[id] || id);
  const displayGoals = selectedGoals.map(id => goalMap[id] || id);

  // Generate insights based on selections
  let insights = [];
  
  if (displayQualities.includes('Mindfulness') && displayGoals.includes('Reduce Stress')) {
    insights.push("Try guided meditation sessions to practice mindfulness and reduce stress levels.");
  }
  
  if (displayQualities.includes('Resilience') && displayGoals.includes('Overcome Challenges')) {
    insights.push("Building resilience is key to overcoming challenges. Consider journaling about past obstacles you've overcome.");
  }
  
  if (displayGoals.includes('Improve Sleep')) {
    insights.push("Establish a consistent sleep schedule and create a bedtime routine to improve sleep quality.");
  }
  
  if (displayQualities.includes('Empathy') && displayGoals.includes('Build Relationships')) {
    insights.push("Practice active listening to strengthen your empathy and build deeper connections in relationships.");
  }
  
  if (displayGoals.includes('Improve Focus')) {
    insights.push("Try the Pomodoro technique: 25 minutes of focused work followed by a 5-minute break.");
  }
  
  if (displayQualities.includes('Discipline') && displayGoals.includes('Develop Healthy Habits')) {
    insights.push("Start with small, consistent actions to build discipline and develop lasting healthy habits.");
  }
  
  // Default insights if none match the selections
  if (insights.length === 0) {
    insights = [
      "Consider starting a gratitude journal to reflect on positive aspects of your life.",
      "Schedule short mindfulness breaks throughout your day to reset and refocus.",
      "Physical activity can significantly improve mental well-being. Try a 10-minute walk daily."
    ];
  }

  return (
    <Card className="mb-6 overflow-hidden bg-[#252535] border-[#3d3d5c]">
      <div className="h-1.5 w-full bg-gradient-to-r from-[#B87333] to-[#E5C5A1]"></div>
      <CardHeader className="flex flex-row items-center gap-2 pb-2">
        <LightbulbIcon className="h-5 w-5 text-[#E5C5A1]" />
        <CardTitle className="text-lg">Personal Insights</CardTitle>
      </CardHeader>
      <CardContent>
        {insights.map((insight, index) => (
          <div key={index} className="mb-4 last:mb-0">
            <p className="text-sm text-gray-300">{insight}</p>
          </div>
        ))}
        
        {(selectedQualities.length > 0 || selectedGoals.length > 0) && (
          <div className="mt-4 pt-4 border-t border-gray-700">
            {selectedQualities.length > 0 && (
              <div className="mb-3">
                <h4 className="text-xs uppercase text-gray-500 mb-2">Your Top Qualities</h4>
                <div className="flex flex-wrap gap-2">
                  {displayQualities.map((quality) => (
                    <Badge key={quality} variant="outline" className="bg-[#2a2a40] border-[#3d3d5c] text-[#E5C5A1]">
                      {quality}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {selectedGoals.length > 0 && (
              <div>
                <h4 className="text-xs uppercase text-gray-500 mb-2">Your Goals</h4>
                <div className="flex flex-wrap gap-2">
                  {displayGoals.map((goal) => (
                    <Badge key={goal} variant="outline" className="bg-[#2a2a40] border-[#3d3d5c] text-[#E5C5A1]">
                      {goal}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InsightsSection;
