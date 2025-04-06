
import React from "react";
import Page from "@/components/Page";
import MainDashboard from "@/components/home/MainDashboard";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const userName = "User";
  const selectedQualities = location.state?.qualities || [];
  const selectedGoals = location.state?.goals || [];
  
  const navigateToFeature = (path: string) => {
    window.location.href = path;
  };

  return (
    <Page title="Home" showBackButton={false}>
      <MainDashboard 
        userName={userName}
        showHenry={false}
        onHenryToggle={() => {}}
        selectedQualities={selectedQualities}
        selectedGoals={selectedGoals}
        navigateToFeature={navigateToFeature}
      />
    </Page>
  );
};

export default Home;
