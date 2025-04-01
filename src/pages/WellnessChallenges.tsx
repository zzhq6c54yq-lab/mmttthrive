import React, { useState, useEffect } from "react";
import { Calendar, ArrowLeft, Brain, Heart, Activity, CheckCircle } from "lucide-react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Page from "@/components/Page";
import { useToast } from "@/hooks/use-toast";

const WellnessChallenges: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'wellness' | 'mental' | 'completed'>('wellness');
  
  // Initialize active tab from route state if available
  useEffect(() => {
    if (location.state && location.state.initialTab) {
      setActiveTab(location.state.initialTab);
    }
  }, [location.state]);
  
  const wellnessChallenges = [
    {
      id: "meditation",
      title: "10-Minute Mindful Meditation",
      description: "Take a moment to center yourself with a guided meditation",
      icon: Brain,
      completed: true,
      category: "Mindfulness",
      points: 20
    },
    {
      id: "gratitude",
      title: "Gratitude Journaling",
      description: "Write down three things you're grateful for today",
      icon: Heart,
      completed: false,
      category: "Emotional Wellbeing",
      points: 15
    },
    {
      id: "hydration",
      title: "Hydration Tracker",
      description: "Drink 8 glasses of water throughout the day",
      icon: Activity,
      completed: false,
      category: "Physical Health",
      points: 10
    },
    {
      id: "stretching",
      title: "Morning Stretching Routine",
      description: "Complete a 5-minute stretching routine when you wake up",
      icon: Activity,
      completed: false,
      category: "Physical Health",
      points: 15
    },
    {
      id: "nutrition",
      title: "Balanced Meal Planning",
      description: "Plan three balanced meals for tomorrow",
      icon: Activity,
      completed: false,
      category: "Physical Health",
      points: 25
    },
    {
      id: "digital-detox",
      title: "Digital Detox Hour",
      description: "Spend one hour away from all screens",
      icon: Brain,
      completed: false,
      category: "Mindfulness",
      points: 20
    }
  ];
  
  const mentalHealthChallenges = [
    {
      id: "affirmations",
      title: "Positive Affirmations",
      description: "Repeat 5 positive affirmations to yourself",
      icon: Heart,
      completed: false,
      category: "Emotional Wellbeing",
      points: 15
    },
    {
      id: "stress-relief",
      title: "Stress-Relief Exercise",
      description: "Practice 5 minutes of deep breathing",
      icon: Brain,
      completed: true,
      category: "Mindfulness",
      points: 20
    },
    {
      id: "mindful-walk",
      title: "Mindful Walk",
      description: "Take a 15-minute walk focusing on your surroundings",
      icon: Activity,
      completed: false,
      category: "Physical Health",
      points: 20
    },
    {
      id: "negative-thought",
      title: "Challenge Negative Thoughts",
      description: "Identify and reframe one negative thought pattern",
      icon: Brain,
      completed: false,
      category: "Cognitive Health",
      points: 25
    },
    {
      id: "boundary-setting",
      title: "Practice Boundary Setting",
      description: "Identify one boundary you need to establish and plan how to communicate it",
      icon: Heart,
      completed: false,
      category: "Social Health",
      points: 30
    },
    {
      id: "emotional-awareness",
      title: "Emotional Awareness Check-in",
      description: "Take 5 minutes to identify and name the emotions you're experiencing right now",
      icon: Heart,
      completed: false,
      category: "Emotional Wellbeing",
      points: 15
    }
  ];
  
  const completedChallenges = [
    ...wellnessChallenges.filter(c => c.completed),
    ...mentalHealthChallenges.filter(c => c.completed)
  ];
  
  const getActiveChallenges = () => {
    switch(activeTab) {
      case 'wellness':
        return wellnessChallenges;
      case 'mental':
        return mentalHealthChallenges;
      case 'completed':
        return completedChallenges;
      default:
        return wellnessChallenges;
    }
  };
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const toggleChallengeCompletion = (id: string) => {
    toast({
      title: "Challenge Status Updated",
      description: "Your progress has been saved",
      duration: 1500
    });
    // In a real app, this would update state and persist the changes
    console.log(`Toggling completion for challenge: ${id}`);
  };
  
  // If we have a specific challenge ID, render a details view
  if (id) {
    // Find the challenge from either wellness or mental health categories
    const challenge = [...wellnessChallenges, ...mentalHealthChallenges].find(c => c.id === id);
    
    if (!challenge) {
      return (
        <Page title="Challenge Not Found">
          <div className="p-6">
            <p className="text-gray-300">The requested challenge could not be found.</p>
          </div>
        </Page>
      );
    }
    
    return (
      <Page title={`${challenge.title} - Challenge`}>
        <div className="px-4 py-8">
          <div className="bg-[#2a2a3c]/80 rounded-xl p-6 mb-6">
            <div className="flex items-start mb-6">
              <div className={`p-4 rounded-lg mr-4 ${challenge.completed ? 'bg-green-500/20' : 'bg-indigo-500/20'}`}>
                <challenge.icon className={`h-8 w-8 ${challenge.completed ? 'text-green-400' : 'text-indigo-400'}`} />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">{challenge.title}</h2>
                <span className="inline-block bg-[#3a3a4c] text-xs text-gray-300 px-2 py-1 rounded">
                  {challenge.category}
                </span>
                <p className="text-gray-300 mt-3">{challenge.description}</p>
              </div>
            </div>
            
            <div className="bg-[#1e1e2c] rounded-lg p-5">
              <h3 className="text-lg font-medium text-white mb-3">How to Complete This Challenge</h3>
              <ol className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="inline-block bg-indigo-500/20 text-indigo-300 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">1</span>
                  <span>Set aside dedicated time in your day for this activity</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-indigo-500/20 text-indigo-300 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">2</span>
                  <span>Find a quiet, comfortable space where you won't be interrupted</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-indigo-500/20 text-indigo-300 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">3</span>
                  <span>Follow the activity instructions and be present during the exercise</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-indigo-500/20 text-indigo-300 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">4</span>
                  <span>Mark the challenge as complete once you've finished</span>
                </li>
              </ol>
            </div>
            
            <div className="mt-6 flex justify-between items-center">
              <div>
                <span className="text-amber-400 text-lg font-medium">+{challenge.points} points</span>
                <p className="text-sm text-gray-400">Complete this challenge to earn points</p>
              </div>
              
              <button 
                onClick={() => toggleChallengeCompletion(challenge.id)}
                className={`px-5 py-3 rounded-xl flex items-center ${
                  challenge.completed 
                    ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' 
                    : 'bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30'
                } transition-colors`}
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                {challenge.completed ? 'Completed' : 'Mark as Complete'}
              </button>
            </div>
          </div>
        </div>
      </Page>
    );
  }
  
  // Otherwise, render the challenges list
  return (
    <Page title="Daily Wellness Challenges">
      <div className="min-h-screen bg-gradient-to-b from-[#1a1a20] via-[#252535] to-[#2d2d3d] text-white pb-16">
        <div className="container mx-auto max-w-6xl px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Daily Challenges</h1>
          
          <p className="text-gray-300 mb-8">
            Complete daily challenges to improve your mental and physical wellbeing. Track your progress and earn points to unlock rewards.
          </p>
          
          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={() => setActiveTab('wellness')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'wellness'
                  ? 'bg-indigo-500 text-white'
                  : 'bg-[#3a3a4c]/50 text-gray-300 hover:bg-[#3a3a4c]'
              }`}
            >
              Wellness Challenges
            </button>
            <button
              onClick={() => setActiveTab('mental')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'mental'
                  ? 'bg-purple-500 text-white'
                  : 'bg-[#3a3a4c]/50 text-gray-300 hover:bg-[#3a3a4c]'
              }`}
            >
              Mental Health
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'completed'
                  ? 'bg-green-500 text-white'
                  : 'bg-[#3a3a4c]/50 text-gray-300 hover:bg-[#3a3a4c]'
              }`}
            >
              Completed ({completedChallenges.length})
            </button>
          </div>
          
          <div className="bg-[#2a2a3c]/80 rounded-2xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getActiveChallenges().map((challenge) => (
                <div 
                  key={challenge.id}
                  className="bg-[#1e1e2c] rounded-xl p-5 hover:bg-[#262638] transition-colors cursor-pointer"
                  onClick={() => navigate(`/wellness-challenges/${challenge.id}`)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <div className={`p-3 rounded-lg mr-4 ${challenge.completed ? 'bg-green-500/20' : 'bg-indigo-500/20'}`}>
                        <challenge.icon className={`h-6 w-6 ${challenge.completed ? 'text-green-400' : 'text-indigo-400'}`} />
                      </div>
                      
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium text-lg text-white">{challenge.title}</h3>
                        </div>
                        <span className="inline-block bg-[#3a3a4c] text-xs text-gray-300 px-2 py-1 rounded mt-1">
                          {challenge.category}
                        </span>
                        <p className="text-gray-400 mt-2">{challenge.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <span className="text-amber-400 font-medium">+{challenge.points} pts</span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleChallengeCompletion(challenge.id);
                        }}
                        className={`mt-4 p-2 rounded-full ${
                          challenge.completed 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700 hover:text-white'
                        } transition-colors`}
                      >
                        <CheckCircle className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {getActiveChallenges().length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-400">No challenges in this category</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </Page>
  );
};

export default WellnessChallenges;
