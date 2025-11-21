import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Heart, 
  Brain, 
  Users, 
  Sparkles, 
  Music, 
  BookOpen, 
  Activity,
  Palette,
  Search,
  ChevronDown,
  ChevronUp,
  Briefcase,
  Dumbbell
} from 'lucide-react';
import { cn } from '@/lib/utils';
import ToolCategoryCard from '../widgets/ToolCategoryCard';
import { useLayoutTracking } from '@/hooks/useLayoutTracking';
import { useUser } from '@/contexts/UserContext';
import { supabase } from '@/integrations/supabase/client';

interface ToolkitSectionProps {
  userGoals: string[];
}

export default function ToolkitSection({ userGoals }: ToolkitSectionProps) {
  const navigate = useNavigate();
  const { user, profile } = useUser();
  const { trackClick } = useLayoutTracking({ 
    sectionId: 'toolkit',
    trackScroll: true,
    trackClicks: true,
    trackTime: true
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  // Unified list of all features/tools
  const allTools = [
    { name: 'Real-Time Therapy', path: '/therapy', description: 'Book sessions with licensed therapists', icon: Heart },
    { name: 'Between-Session Companion', path: '/mini-session', description: 'AI-powered micro-work between sessions', icon: Sparkles },
    { name: 'Therapist Messaging', path: '/messages', description: 'Stay connected with your care team', icon: Users },
    { name: 'Daily Challenges', path: '/wellness-challenges', description: 'Complete challenges, earn rewards', icon: Activity },
    { name: 'Mood Tracking', path: '/mood-tracker', description: 'Track your emotional patterns', icon: Heart },
    { name: 'Journaling', path: '/journaling', description: 'Express your thoughts and feelings', icon: BookOpen },
    { name: 'Gratitude Visualizer', path: '/gratitude', description: 'Visualize what you\'re grateful for', icon: Sparkles },
    { name: 'Mental Health Assessments', path: '/mental-wellness', description: 'PHQ-9, GAD-7, PSS-10 and more', icon: Brain },
    { name: 'Breathing Exercises', path: '/breathing', description: 'Calm your mind and body', icon: Activity },
    { name: 'Meditation Studio', path: '/meditation', description: 'Guided meditation sessions', icon: Brain },
    { name: 'Binaural Beats', path: '/binaural-beats', description: 'Sound therapy for relaxation', icon: Music },
    { name: 'Art Therapy', path: '/art-therapy', description: 'Express yourself through art', icon: Palette },
    { name: 'Music Therapy', path: '/music-therapy', description: 'Healing through music', icon: Music },
    { name: 'Video Diary', path: '/video-diary', description: 'Record your journey', icon: Activity },
    { name: 'Support Wall', path: '/support-wall', description: 'Share and connect with others', icon: Users },
    { name: 'Workshops', path: '/workshops', description: 'Live and recorded workshops', icon: BookOpen },
    { name: 'Dear Henry', path: '/henry', description: 'Anonymous advice and wisdom', icon: Heart },
    { name: 'Resource Library', path: '/resources', description: 'Educational materials', icon: BookOpen },
    { name: 'Games & Quizzes', path: '/games-and-quizzes', description: 'Fun and educational activities', icon: Sparkles },
    { name: 'Career Coaching', path: '/career-coaching', description: 'Professional development', icon: Briefcase },
    { name: 'Sleep Tracker', path: '/sleep-tracker', description: 'Monitor your sleep patterns', icon: Activity },
    { name: 'Alternative Therapies', path: '/alternative-therapies', description: 'Explore holistic options', icon: Heart },
    { name: 'Wellness Challenges', path: '/wellness-challenges', description: 'Physical wellness goals', icon: Dumbbell },
  ];

  const filteredTools = allTools.filter(tool =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="bg-gray-800/40 border-gray-700/50 backdrop-blur-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Your Wellness Toolkit</h2>
          <p className="text-sm text-gray-400">All your mental health resources in one place</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search tools..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500"
        />
      </div>

      {/* Unified Toolkit Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredTools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Card
              key={tool.path}
              onClick={() => {
                trackClick({ toolPath: tool.path });
                navigate(tool.path);
              }}
              className="group cursor-pointer bg-gradient-to-br from-[#D4AF37]/10 to-[#B8941F]/5 border-[#D4AF37]/30 hover:border-[#D4AF37]/60 hover:shadow-lg hover:shadow-[#D4AF37]/20 transition-all duration-300 overflow-hidden"
            >
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-[#D4AF37]/20 to-[#E5C5A1]/10 border border-[#D4AF37]/20 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-white text-base mb-1 group-hover:text-[#D4AF37] transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredTools.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          No tools found matching "{searchQuery}"
        </div>
      )}
    </Card>
  );
}
