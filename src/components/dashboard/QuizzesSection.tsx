
import React from "react";
import { HelpCircle, Lightbulb, CheckCircle, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const QuizzesSection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Mock data for quizzes
  const quizzes = [
    {
      id: 1,
      title: "Mental Health Basics",
      description: "Test your knowledge about fundamental mental health concepts",
      completionRate: 75,
      questions: 10,
      timeEstimate: "5 min",
    },
    {
      id: 2,
      title: "Stress Management",
      description: "Learn about effective stress reduction techniques",
      completionRate: 0,
      questions: 8,
      timeEstimate: "4 min",
    },
  ];

  const handleStartQuiz = (quizId: number) => {
    toast({
      title: "Quiz Starting",
      description: "Taking you to the selected quiz...",
      duration: 1500,
    });
    
    // Navigate to games-and-quizzes with optional quiz ID
    navigate("/games-and-quizzes", {
      state: { 
        activeTab: "quizzes",
        selectedQuizId: quizId
      }
    });
  };
  
  const handleExploreQuizzes = () => {
    toast({
      title: "Exploring Quizzes",
      description: "Taking you to all available quizzes",
      duration: 1500,
    });
    
    navigate("/games-and-quizzes", {
      state: { activeTab: "quizzes" }
    });
  };

  return (
    <Card className="border-[#B87333]/20 hover:border-[#B87333]/40 transition-all duration-300 shadow-sm hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-[#B87333]" />
          Mental Health Quizzes
        </CardTitle>
        <CardDescription>Fun and educational quizzes to enhance your knowledge</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {quizzes.map((quiz) => (
            <div 
              key={quiz.id} 
              className="p-3 border border-border rounded-md bg-background hover:bg-accent/5 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    {quiz.title}
                    {quiz.completionRate > 0 && (
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        In progress
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">{quiz.description}</p>
                </div>
                <Button
                  size="sm"
                  className="h-7 rounded-full bg-[#B87333] hover:bg-[#A56625] text-white"
                  onClick={() => handleStartQuiz(quiz.id)}
                >
                  {quiz.completionRate > 0 ? "Continue" : "Start"}
                </Button>
              </div>
              
              {quiz.completionRate > 0 && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Progress</span>
                    <span>{quiz.completionRate}%</span>
                  </div>
                  <Progress value={quiz.completionRate} className="h-1.5" />
                </div>
              )}
              
              <div className="mt-2 flex items-center text-xs text-muted-foreground">
                <Lightbulb className="h-3 w-3 mr-1" />
                <span>{quiz.questions} questions</span>
                <span className="mx-2">•</span>
                <span>{quiz.timeEstimate}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-center">
          <Button 
            variant="outline" 
            size="sm"
            className="text-[#B87333] border-[#B87333]/30 hover:bg-[#B87333]/5 hover:border-[#B87333]"
            onClick={handleExploreQuizzes}
          >
            Explore More Quizzes
            <ArrowRight className="ml-2 h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizzesSection;
