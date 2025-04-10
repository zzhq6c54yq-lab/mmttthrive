
import { useNavigate } from "react-router-dom";

export const useFeatureNavigation = () => {
  const navigate = useNavigate();
  
  const handleNavigate = (path: string) => {
    // Add directToAssessment flag for assessment-related features
    const isAssessmentRelated = 
      path === "/mental-wellness" || 
      path === "/games-and-quizzes" ||
      path.includes("assessment");
    
    if (isAssessmentRelated) {
      navigate(path, {
        state: {
          preventTutorial: true,
          directToAssessment: true,
          activeTab: "assessments",
          startAssessment: true
        }
      });
    } else {
      navigate(path, { 
        state: { 
          fromMainMenu: true,
          preventTutorial: true
        } 
      });
    }
  };

  return { handleNavigate };
};
