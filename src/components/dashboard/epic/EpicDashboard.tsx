import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTodayDashboard } from '@/hooks/useTodayDashboard';
import { useDashboardState } from '@/hooks/useDashboardState';
import { useUser } from '@/contexts/UserContext';
import DashboardNavigation from './DashboardNavigation';
import { StatusChips } from './StatusChips';
import { NewYourDaySection } from './sections/NewYourDaySection';
import { MoodPulseWidget, StreakProtectorWidget, ProgressRingWidget, QuickNotesWidget } from './widgets/SmartWidgets';
import ToolkitSection from './sections/ToolkitSection';
import SafetyStrip from '../today/SafetyStrip';
import QuickActions from './QuickActions';
import CommandPalette from './CommandPalette';
import AIContextualHelper from './AIContextualHelper';
import LayoutControls from './LayoutControls';
import HenryDialog from '@/components/henry/HenryDialog';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import EmpathyLoadingState from '@/components/shared/EmpathyLoadingState';
import EmpathyErrorState from '@/components/shared/EmpathyErrorState';

export default function EpicDashboard() {
  const navigate = useNavigate();
  const { user, profile, loading: userLoading } = useUser();
  const { dashboardData, loading: dashboardLoading, refetch } = useTodayDashboard();
  const { state: dashboardState } = useDashboardState(dashboardData);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [showHenryDialog, setShowHenryDialog] = useState(false);
  const [showOpeningRitual, setShowOpeningRitual] = useState(true);

  // Setup keyboard shortcuts
  useKeyboardShortcuts({
    onCommandPalette: () => setIsCommandPaletteOpen(true)
  });

  // Redirect to auth if not authenticated
  useEffect(() => {
    if (!userLoading && !user) {
      navigate('/auth');
    }
  }, [user, userLoading, navigate]);

  const loading = userLoading || dashboardLoading;

  // Render status chips into navigation header
  useEffect(() => {
    if (!loading && dashboardData) {
      const container = document.getElementById('status-chips-container');
      if (container) {
        createPortal(
          <StatusChips dashboardData={dashboardData} />,
          container
        );
      }
    }
  }, [loading, dashboardData]);

  // Opening ritual
  useEffect(() => {
    if (!loading && dashboardData) {
      const timer = setTimeout(() => setShowOpeningRitual(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [loading, dashboardData]);

  // Loading state with empathy
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#1a1a1a] to-gray-900">
        <EmpathyLoadingState />
      </div>
    );
  }

  // Error state with empathy
  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#1a1a1a] to-gray-900 flex items-center justify-center p-4">
        <EmpathyErrorState
          title={!user ? 'Please log in' : "Let's finish setting up"}
          message={!user 
            ? "We need you to log in so we can personalize your experience." 
            : "Your profile isn't complete yet. Let's take a moment to finish it together."}
          onRetry={() => navigate(!user ? '/auth' : '/onboarding')}
          showHomeButton={false}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#1a1a1a] to-gray-900 pb-24 relative overflow-hidden">
      {/* Ambient background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#D4AF37]/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Opening Ritual */}
      <AnimatePresence>
        {showOpeningRitual && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 bg-gradient-to-br from-gray-900 via-[#1a1a1a] to-gray-900 flex flex-col items-center justify-center"
          >
            {/* Breathing animation */}
            <motion.div
              animate={{
                scale: [0.9, 1.1, 0.9],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: 0,
              }}
              className="text-center"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-2xl text-gray-300 mb-8"
              >
                Welcome back, {profile?.display_name || 'friend'}
              </motion.p>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B8941F] flex items-center justify-center"
              >
                <span className="text-3xl">✨</span>
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-lg text-gray-400 mt-8"
              >
                Let's take a breath together
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <DashboardNavigation userName={profile?.display_name || 'there'} />
      </motion.div>

      {/* Main Content with staggered animations */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="container mx-auto max-w-7xl px-4 space-y-6 mt-6 relative z-10"
      >
        <NewYourDaySection
          dashboardData={dashboardData}
          onCheckInComplete={refetch}
        />

        <div className="grid md:grid-cols-2 gap-6">
          <MoodPulseWidget moodData={dashboardData.weeklyStats.moodTrend} />
          <StreakProtectorWidget streak={dashboardData.checkInStreak} />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <ProgressRingWidget completed={0} total={dashboardData.todaysPlan.length} />
          <QuickNotesWidget />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <ToolkitSection userGoals={profile?.goals || []} />
        </motion.div>
        
        <QuickActions />
        <LayoutControls />
        <AIContextualHelper />
      </motion.div>

      {/* Safety Strip */}
      <SafetyStrip />

      {/* AI-Powered Enhancements */}
      <LayoutControls />
      <QuickActions />
      <AIContextualHelper />
      <CommandPalette 
        isOpen={isCommandPaletteOpen} 
        onClose={() => setIsCommandPaletteOpen(false)} 
      />

      {/* Henry Dialog */}
      <HenryDialog 
        isOpen={showHenryDialog} 
        onOpenChange={setShowHenryDialog}
        userName={profile?.display_name || 'there'}
      />

      {/* Hidden trigger button for YourDaySection */}
      <button
        id="henry-dialog-trigger"
        className="hidden"
        onClick={() => setShowHenryDialog(true)}
      />
    </div>
  );
}
