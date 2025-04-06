
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
import RealTimeTherapy from "@/pages/RealTimeTherapy";
import HolisticWellness from "@/pages/HolisticWellness";
import AlternativeTherapies from "@/pages/AlternativeTherapies";
import CommunitySupport from "@/pages/CommunitySupport";
import BinauralBeats from "@/pages/BinauralBeats";
import Journaling from "@/pages/Journaling";
import MindfulnessSleep from "@/pages/MindfulnessSleep";
import VideoDiary from "@/pages/VideoDiary";
import ResourceLibrary from "@/pages/ResourceLibrary";
import WellnessChallenges from "@/pages/WellnessChallenges";
import MySponsor from "@/pages/MySponsor";
import Workshops from "@/pages/Workshops";
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
        <Route path="/family-resources" element={<FamilyResources />} />
        <Route path="/games-and-quizzes" element={<GamesAndQuizzes />} />
        <Route path="/game-play/:gameId" element={<GamePage />} />
        <Route path="/small-business-portal" element={<SmallBusinessExperience />} />
        <Route path="/employee-welcome" element={<EmployeeWelcome />} />
        <Route path="/employee-readiness" element={<EmployeeReadiness />} />
        
        {/* Restored Routes */}
        <Route path="/real-time-therapy" element={<RealTimeTherapy />} />
        <Route path="/holistic-wellness" element={<HolisticWellness />} />
        <Route path="/alternative-therapies" element={<AlternativeTherapies />} />
        <Route path="/community-support" element={<CommunitySupport />} />
        <Route path="/binaural-beats" element={<BinauralBeats />} />
        <Route path="/journaling" element={<Journaling />} />
        <Route path="/mindfulness-sleep" element={<MindfulnessSleep />} />
        <Route path="/video-diary" element={<VideoDiary />} />
        <Route path="/resource-library" element={<ResourceLibrary />} />
        <Route path="/wellness-challenges" element={<WellnessChallenges />} />
        <Route path="/my-sponsor" element={<MySponsor />} />
        <Route path="/workshops" element={<Workshops />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
