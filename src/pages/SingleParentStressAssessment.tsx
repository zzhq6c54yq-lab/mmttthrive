import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Heart, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SingleParentStressAssessment: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const questions = [
    {
      text: "How often do you feel overwhelmed by your responsibilities?",
      options: ["Rarely", "Sometimes", "Often", "Almost Always"]
    },
    {
      text: "How would you rate your current level of financial stress?",
      options: ["Low", "Moderate", "High", "Severe"]
    },
    {
      text: "How often do you feel you have enough time for yourself?",
      options: ["Often", "Sometimes", "Rarely", "Never"]
    },
    {
      text: "How challenging is managing work and parenting?",
      options: ["Not challenging", "Somewhat challenging", "Very challenging", "Extremely challenging"]
    },
    {
      text: "How would you describe your co-parenting situation (if applicable)?",
      options: ["Supportive", "Manageable", "Difficult", "Very conflictual"]
    },
    {
      text: "How often do you feel socially isolated?",
      options: ["Rarely", "Sometimes", "Often", "Almost Always"]
    },
    {
      text: "How adequate is your support system?",
      options: ["Very adequate", "Adequate", "Limited", "Non-existent"]
    },
    {
      text: "How often do you worry about your children's wellbeing?",
      options: ["Occasionally", "Sometimes", "Frequently", "Constantly"]
    }
  ];

  const handleAnswer = (value: number) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const handleNext = () => {
    if (answers[currentQuestion] === undefined) {
      toast({ title: "Please select an answer", variant: "destructive" });
      return;
    }
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
    const maxScore = questions.length * 3;
    const percentage = (totalScore / maxScore) * 100;

    let level = "Low";
    let message = "You're managing stress well. Keep up your self-care practices.";
    
    if (percentage > 70) {
      level = "High";
      message = "Your stress levels are high. Consider reaching out for support and prioritizing self-care.";
    } else if (percentage > 40) {
      level = "Moderate";
      message = "You're experiencing moderate stress. Exploring stress management tools could be helpful.";
    }

    toast({
      title: `Stress Level: ${level}`,
      description: message,
      duration: 5000
    });

    setTimeout(() => navigate('/single-parents-portal'), 2000);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-rose-500/5 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <div className="flex items-center gap-3 mb-6">
          <Heart className="h-8 w-8 text-rose-600" />
          <h1 className="text-3xl font-bold text-foreground">Single Parent Stress Assessment</h1>
        </div>

        <Progress value={progress} className="mb-6" />

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-6">
              Question {currentQuestion + 1} of {questions.length}
            </h2>

            <p className="text-lg mb-6">{questions[currentQuestion].text}</p>

            <RadioGroup
              value={answers[currentQuestion]?.toString()}
              onValueChange={(value) => handleAnswer(parseInt(value))}
            >
              {questions[currentQuestion].options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 mb-3">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <Button onClick={handleNext} className="w-full mt-6">
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'Complete Assessment'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SingleParentStressAssessment;
