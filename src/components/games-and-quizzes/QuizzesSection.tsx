
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Filter, Brain, Star, ArrowRight, BookOpen } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Quiz {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  questionsCount: number;
  timeToComplete: string;
  benefits: string[];
  popular: boolean;
}

interface QuizzesSectionProps {
  quizzes: Quiz[];
  onStartQuiz: (quiz: Quiz) => void;
}

const QuizzesSection: React.FC<QuizzesSectionProps> = ({ 
  quizzes,
  onStartQuiz
}) => {
  const { toast } = useToast();
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  const handleViewMoreAssessments = () => {
    toast({
      title: "Coming Soon",
      description: "More assessments will be available in the near future!",
      duration: 3000,
    });
  };

  return (
    <>
      <div className="mb-6 flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center bg-white/50 p-4 rounded-xl backdrop-blur shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <div className="p-2 rounded-full bg-gradient-to-r from-[#D946EF]/20 to-[#9b87f5]/20">
            <Brain className="h-5 w-5 text-[#D946EF]" />
          </div>
          <span>Mental Health Assessments</span>
        </h2>
      </div>
      
      {quizzes.length === 0 ? (
        <div className="text-center py-10">
          <div className="mx-auto bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
            <BookOpen className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800">No quizzes found</h3>
          <p className="text-gray-500 mt-1">Try adjusting your search or filters</p>
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {quizzes.map((quiz, index) => (
            <motion.div
              key={quiz.id}
              variants={item}
              className="group"
            >
              <div className="relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all h-full flex flex-col cursor-pointer">
                {quiz.popular && (
                  <div className="absolute top-2 right-2 z-10 bg-[#D946EF] text-white text-xs font-medium px-2 py-1 rounded-full flex items-center">
                    <Star className="h-3 w-3 mr-1 fill-white" />
                    Popular
                  </div>
                )}
                
                <div className="relative h-44 overflow-hidden">
                  <img 
                    src={quiz.image} 
                    alt={quiz.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex justify-between text-white">
                      <div className="flex items-center bg-black/40 backdrop-blur-sm rounded-full px-2 py-1 text-xs">
                        <Brain className="h-3 w-3 mr-1" />
                        {quiz.questionsCount} questions
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 flex-grow flex flex-col">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-[#D946EF] transition-colors">
                    {quiz.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{quiz.description}</p>
                  
                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-sm font-medium text-gray-700">Benefits:</div>
                      <div className="text-xs bg-[#D946EF]/10 text-[#D946EF] font-medium px-2 py-0.5 rounded flex items-center">
                        {quiz.timeToComplete}
                      </div>
                    </div>
                    <ul className="text-xs text-gray-600 mb-4">
                      {quiz.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start mb-1">
                          <div className="text-[#D946EF] mr-1 mt-0.5">•</div>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className="w-full bg-[#D946EF] hover:bg-[#D946EF]/90"
                      onClick={() => onStartQuiz(quiz)}
                    >
                      <Brain className="mr-2 h-4 w-4" />
                      Start Assessment
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      <div className="mt-12 text-center">
        <div className="relative inline-block">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D946EF] to-[#9b87f5] rounded-full blur"></div>
          <Button 
            className="relative bg-white text-[#D946EF] hover:bg-[#D946EF]/10 border border-[#D946EF]/20 shadow-sm px-6"
            onClick={handleViewMoreAssessments}
          >
            <Star className="h-4 w-4 mr-2" />
            View more assessments
          </Button>
        </div>
      </div>
    </>
  );
};

export default QuizzesSection;
