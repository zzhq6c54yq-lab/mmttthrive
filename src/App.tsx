
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Index from "@/pages/Index";
import Home from "@/pages/Home";
import ProgressReports from "@/pages/ProgressReports";
import MentalWellnessTools from "@/pages/MentalWellnessTools"; // Changed from MentalWellness
import GamesAndQuizzes from "@/pages/GamesAndQuizzes";
import GamePage from "@/pages/GamePage"; // Changed from GamePlay
import SmallBusinessExperience from "@/pages/SmallBusinessExperience";
import EmployeeWelcome from "@/pages/EmployeeWelcome";
import EmployeeReadiness from "@/pages/EmployeeReadiness";
import FamilyResources from "@/pages/FamilyResources";
import HenryIconButton from "@/components/HenryIconButton";

function App() {
  return (
    <>
      <HenryIconButton />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<Home />} />
        <Route path="/progress-reports" element={<ProgressReports />} />
        <Route path="/mental-wellness" element={<MentalWellnessTools />} />
        <Route path="/family-resources" element={<FamilyResources />} /> {/* New route */}
        <Route path="/games-and-quizzes" element={<GamesAndQuizzes />} />
        <Route path="/game-play/:gameId" element={<GamePage />} />
        <Route path="/small-business-portal" element={<SmallBusinessExperience />} />
        <Route path="/employee-welcome" element={<EmployeeWelcome />} />
        <Route path="/employee-readiness" element={<EmployeeReadiness />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
