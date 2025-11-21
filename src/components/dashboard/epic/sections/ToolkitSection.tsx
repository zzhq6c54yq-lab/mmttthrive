import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
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
  Briefcase,
  Dumbbell
} from 'lucide-react';
import { useLayoutTracking } from '@/hooks/useLayoutTracking';
import { useUser } from '@/contexts/UserContext';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
          <p className="text-sm text-gray-400">Swipe to explore all features</p>
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

      {/* Horizontal Carousel */}
      {filteredTools.length > 0 ? (
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {filteredTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <CarouselItem key={tool.path} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <Card
                    onClick={() => {
                      trackClick({ toolPath: tool.path });
                      navigate(tool.path);
                    }}
                    className="group cursor-pointer overflow-hidden border-[#D4AF37]/30 hover:border-[#D4AF37]/60 transition-all duration-300 h-[400px] relative"
                  >
                    {/* Cover Image with Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 via-gray-900/80 to-gray-900/95">
                      <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity">
                        <Icon className="w-32 h-32 text-[#D4AF37]" />
                      </div>
                    </div>
                    
                    {/* Content Overlay */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-between">
                      {/* Top - Icon */}
                      <div className="flex justify-start">
                        <div className="p-3 rounded-xl bg-[#D4AF37]/20 backdrop-blur-sm border border-[#D4AF37]/30">
                          <Icon className="w-6 h-6 text-[#D4AF37]" />
                        </div>
                      </div>
                      
                      {/* Bottom - Title & Description */}
                      <div className="space-y-2">
                        <h3 className="font-bold text-white text-xl group-hover:text-[#D4AF37] transition-colors">
                          {tool.name}
                        </h3>
                        <p className="text-sm text-gray-300 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {tool.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-4 bg-gray-900/90 border-[#D4AF37]/30 text-[#D4AF37] hover:bg-gray-800 hover:border-[#D4AF37]/60" />
          <CarouselNext className="hidden md:flex -right-4 bg-gray-900/90 border-[#D4AF37]/30 text-[#D4AF37] hover:bg-gray-800 hover:border-[#D4AF37]/60" />
        </Carousel>
      ) : (
        <div className="text-center py-12 text-gray-400">
          No tools found matching "{searchQuery}"
        </div>
      )}
    </Card>
  );
}
