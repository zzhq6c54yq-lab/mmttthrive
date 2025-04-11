
import { useNavigate, useLocation } from "react-router-dom";

export const useFeatureNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleNavigate = (path: string) => {
    // Add directToAssessment flag for assessment-related features
    const isAssessmentRelated = 
      path === "/mental-wellness" || 
      path === "/games-and-quizzes" ||
      path.includes("assessment");
      
    // Preserve any relevant state from the current location
    const currentState = location.state || {};
    
    // Get the current screen state if we're on the index page
    const currentScreenState = currentState.screenState || 'main';
    
    if (isAssessmentRelated) {
      navigate(path, {
        state: {
          ...currentState,
          preventTutorial: true,
          directToAssessment: true,
          activeTab: "assessments",
          startAssessment: true,
          fromMainMenu: true,
          returnToMain: true
        }
      });
    } else {
      // For non-assessment features
      navigate(path, { 
        state: { 
          ...currentState,
          fromMainMenu: true,
          screenState: currentScreenState,
          preventTutorial: true,
          returnToMain: true
        } 
      });
    }
  };

  return { handleNavigate };
};
