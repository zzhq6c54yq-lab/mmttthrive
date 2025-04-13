import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import HomeButton from "@/components/HomeButton";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useFeatureActions, ActionButtonConfig } from "@/hooks/useFeatureActions";
import { Book, Gamepad2, Film, HeartHandshake, MessagesSquare, BookOpen, PenTool, BrainCircuit, Heart, Music, Sparkles, Play, Star, Rocket, Cookie, Smile, ToyBrick, PartyPopper, Puzzle, PawPrint } from "lucide-react";
import CakeDecorationGame from "@/components/mental-wellness/CakeDecorationGame";

const AdolescentPortal: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { handleActionClick } = useFeatureActions();
  const [ageGroup, setAgeGroup] = useState<string>("early-childhood");
  const [activeTab, setActiveTab] = useState<string>("resources");
  const [showFunGame, setShowFunGame] = useState<boolean>(false);
  const [showMascot, setShowMascot] = useState<boolean>(true);

  useEffect(() => {
    if (location.state && location.state.ageGroup) {
      setAgeGroup(location.state.ageGroup);
    }
    
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [location]);

  const getAgeSpecificContent = () => {
    switch (ageGroup) {
      case "early-childhood":
        return earlyChildhoodContent;
      case "middle-childhood":
        return middleChildhoodContent;
      case "adolescence":
        return adolescenceContent;
      default:
        return earlyChildhoodContent;
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`?tab=${value}`, { replace: true });
  };

  const earlyChildhoodContent = {
    title: "Early Childhood Portal",
    ageRange: "Ages 2-7",
    description: "Playful resources designed to help young children understand emotions through stories, games, and creative activities.",
    gradient: "from-pink-400 to-purple-500",
    mascot: {
      name: "Buddy",
      greeting: "Hi friend! Let's play and learn together!",
      image: "/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png"
    },
    resources: [
      {
        title: "Emotion Stories",
        description: "Illustrated stories that help children recognize and name different feelings",
        icon: <Book className="h-6 w-6 text-pink-500" />,
        tag: "Reading",
        color: "bg-pink-100 text-pink-800 border-pink-200",
        action: {
          type: 'workshop' as const,
          id: 'emotion-stories',
          title: 'Emotion Stories'
        },
        stars: 3
      },
      {
        title: "Feelings Friends",
        description: "Colorful characters that each represent different emotions children experience",
        icon: <Heart className="h-6 w-6 text-purple-500" />,
        tag: "Interactive",
        color: "bg-purple-100 text-purple-800 border-purple-200",
        action: {
          type: 'workshop' as const,
          id: 'feelings-friends',
          title: 'Feelings Friends'
        },
        stars: 4
      },
      {
        title: "Calm Down Corner",
        description: "Guided activities to help children manage big emotions and find calm",
        icon: <Sparkles className="h-6 w-6 text-blue-500" />,
        tag: "Self-Regulation",
        color: "bg-blue-100 text-blue-800 border-blue-200",
        action: {
          type: 'practice' as const,
          id: 'calm-corner',
          title: 'Calm Down Corner'
        },
        stars: 5
      },
      {
        title: "Music & Movement",
        description: "Songs and movement activities that help express emotions through the body",
        icon: <Music className="h-6 w-6 text-green-500" />,
        tag: "Activity",
        color: "bg-green-100 text-green-800 border-green-200",
        action: {
          type: 'practice' as const,
          id: 'music-movement',
          title: 'Music & Movement'
        },
        stars: 4
      }
    ],
    games: [
      {
        title: "Emotion Matching",
        description: "Match facial expressions to feeling words in this simple game",
        icon: <Smile className="h-6 w-6 text-orange-500" />,
        tag: "Game",
        color: "bg-orange-100 text-orange-800 border-orange-200",
        action: {
          type: 'other' as const,
          path: '/games/emotion-matching',
          title: 'Emotion Matching Game'
        },
        stars: 5
      },
      {
        title: "Feeling Bubbles",
        description: "Pop bubbles that match how you're feeling today",
        icon: <Play className="h-6 w-6 text-teal-500" />,
        tag: "Interactive",
        color: "bg-teal-100 text-teal-800 border-teal-200",
        action: {
          type: 'other' as const,
          path: '/games/feeling-bubbles',
          title: 'Feeling Bubbles Game'
        },
        stars: 4
      },
      {
        title: "Color Your Mood",
        description: "Interactive coloring activities based on different emotions",
        icon: <PenTool className="h-6 w-6 text-indigo-500" />,
        tag: "Creative",
        color: "bg-indigo-100 text-indigo-800 border-indigo-200",
        action: {
          type: 'other' as const,
          path: '/games/color-mood',
          title: 'Color Your Mood'
        },
        stars: 3
      },
      {
        title: "Building Blocks",
        description: "Build towers and structures while learning about emotional building blocks",
        icon: <ToyBrick className="h-6 w-6 text-yellow-500" />,
        tag: "Build",
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        action: {
          type: 'other' as const,
          path: '/games/building-blocks',
          title: 'Building Blocks Game'
        },
        stars: 5
      },
      {
        title: "Animal Friends",
        description: "Learn about emotions through friendly animal characters",
        icon: <PawPrint className="h-6 w-6 text-amber-500" />,
        tag: "Friends",
        color: "bg-amber-100 text-amber-800 border-amber-200",
        action: {
          type: 'other' as const,
          path: '/games/animal-friends',
          title: 'Animal Friends Game'
        },
        stars: 4
      },
      {
        title: "Cookie Counting",
        description: "Count cookies and learn numbers while exploring feelings",
        icon: <Cookie className="h-6 w-6 text-red-500" />,
        tag: "Numbers",
        color: "bg-red-100 text-red-800 border-red-200",
        action: {
          type: 'other' as const,
          path: '/games/cookie-counting',
          title: 'Cookie Counting Game'
        },
        stars: 3
      }
    ],
    videos: [
      {
        title: "Calm Breathing",
        description: "Simple animated breathing exercises for young children",
        icon: <Film className="h-6 w-6 text-red-500" />,
        tag: "Video",
        color: "bg-red-100 text-red-800 border-red-200",
        action: {
          type: 'other' as const,
          path: '/videos/calm-breathing',
          title: 'Calm Breathing Videos'
        },
        stars: 4
      },
      {
        title: "Emotion Stories",
        description: "Animated stories about different feelings and how to manage them",
        icon: <Film className="h-6 w-6 text-yellow-500" />,
        tag: "Video",
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        action: {
          type: 'other' as const,
          path: '/videos/emotion-stories',
          title: 'Emotion Stories Videos'
        },
        stars: 5
      },
      {
        title: "Puppet Shows",
        description: "Fun puppet shows teaching children about emotions and friendship",
        icon: <Film className="h-6 w-6 text-purple-500" />,
        tag: "Video",
        color: "bg-purple-100 text-purple-800 border-purple-200",
        action: {
          type: 'other' as const,
          path: '/videos/puppet-shows',
          title: 'Puppet Shows Videos'
        },
        stars: 4
      }
    ],
    support: [
      {
        title: "Parent Corner",
        description: "Resources for parents to support emotional development at this age",
        icon: <HeartHandshake className="h-6 w-6 text-emerald-500" />,
        tag: "For Parents",
        color: "bg-emerald-100 text-emerald-800 border-emerald-200",
        action: {
          type: 'other' as const,
          path: '/parent-resources/early-childhood',
          title: 'Parent Corner'
        },
        stars: 5
      },
      {
        title: "Ask an Expert",
        description: "Common questions about emotional development for ages 2-7",
        icon: <MessagesSquare className="h-6 w-6 text-cyan-500" />,
        tag: "Q&A",
        color: "bg-cyan-100 text-cyan-800 border-cyan-200", 
        action: {
          type: 'other' as const,
          path: '/expert-advice/early-childhood',
          title: 'Ask an Expert'
        },
        stars: 4
      }
    ]
  };

  const middleChildhoodContent = {
    title: "Middle Childhood Portal",
    ageRange: "Ages 8-13",
    description: "Interactive tools and resources to help school-age children build social skills, emotional awareness, and healthy coping strategies.",
    gradient: "from-purple-500 to-indigo-500",
    resources: [
      {
        title: "Feelings Journal",
        description: "Interactive digital journal with prompts for emotional expression",
        icon: <BookOpen className="h-6 w-6" />,
        tag: "Self-Expression",
        color: "bg-purple-100 text-purple-800 border-purple-200",
        action: {
          type: 'other' as const,
          path: '/journaling',
          title: 'Feelings Journal'
        }
      },
      {
        title: "Friendship Workshop",
        description: "Activities to help navigate social situations and build strong friendships",
        icon: <HeartHandshake className="h-6 w-6" />,
        tag: "Social Skills",
        color: "bg-blue-100 text-blue-800 border-blue-200",
        action: {
          type: 'workshop' as const,
          id: 'friendship-workshop',
          title: 'Friendship Workshop'
        }
      },
      {
        title: "Worry Warriors",
        description: "Tools and techniques to help manage anxiety and build courage",
        icon: <BrainCircuit className="h-6 w-6" />,
        tag: "Anxiety",
        color: "bg-teal-100 text-teal-800 border-teal-200",
        action: {
          type: 'practice' as const,
          id: 'worry-warriors',
          title: 'Worry Warriors'
        }
      },
      {
        title: "Body Confidence",
        description: "Activities promoting positive body image and self-acceptance",
        icon: <Heart className="h-6 w-6" />,
        tag: "Self-Esteem",
        color: "bg-pink-100 text-pink-800 border-pink-200",
        action: {
          type: 'workshop' as const,
          id: 'body-confidence',
          title: 'Body Confidence'
        }
      }
    ],
    games: [
      {
        title: "Emotion Detective",
        description: "Solve mysteries by identifying emotions in different scenarios",
        icon: <Gamepad2 className="h-6 w-6" />,
        tag: "Game",
        color: "bg-amber-100 text-amber-800 border-amber-200",
        action: {
          type: 'other' as const,
          path: '/games/emotion-detective',
          title: 'Emotion Detective Game'
        }
      },
      {
        title: "Mindfulness Quest",
        description: "A game-based journey through mindfulness techniques and challenges",
        icon: <Gamepad2 className="h-6 w-6" />,
        tag: "Interactive",
        color: "bg-emerald-100 text-emerald-800 border-emerald-200",
        action: {
          type: 'other' as const,
          path: '/games/mindfulness-quest',
          title: 'Mindfulness Quest'
        }
      },
      {
        title: "Social Skills Builder",
        description: "Practice social scenarios and communication in a safe environment",
        icon: <Gamepad2 className="h-6 w-6" />,
        tag: "Social",
        color: "bg-indigo-100 text-indigo-800 border-indigo-200",
        action: {
          type: 'other' as const,
          path: '/games/social-skills',
          title: 'Social Skills Builder'
        }
      }
    ],
    videos: [
      {
        title: "Coping Strategies",
        description: "Videos showing practical coping techniques for common challenges",
        icon: <Film className="h-6 w-6" />,
        tag: "Video",
        color: "bg-red-100 text-red-800 border-red-200",
        action: {
          type: 'other' as const,
          path: '/videos/coping-strategies',
          title: 'Coping Strategies Videos'
        }
      },
      {
        title: "Kid Stories",
        description: "Real children sharing their experiences with emotions and challenges",
        icon: <Film className="h-6 w-6" />,
        tag: "Video",
        color: "bg-orange-100 text-orange-800 border-orange-200",
        action: {
          type: 'other' as const,
          path: '/videos/kid-stories',
          title: 'Kid Stories Videos'
        }
      }
    ],
    support: [
      {
        title: "Family Resources",
        description: "Tools for families to support social-emotional learning at home",
        icon: <HeartHandshake className="h-6 w-6" />,
        tag: "For Families",
        color: "bg-cyan-100 text-cyan-800 border-cyan-200",
        action: {
          type: 'other' as const,
          path: '/family-resources/middle-childhood',
          title: 'Family Resources'
        }
      },
      {
        title: "School Connection",
        description: "Resources that connect with school-based social emotional learning",
        icon: <BookOpen className="h-6 w-6" />,
        tag: "Education",
        color: "bg-violet-100 text-violet-800 border-violet-200",
        action: {
          type: 'other' as const,
          path: '/school-resources',
          title: 'School Connection'
        }
      }
    ]
  };

  const adolescenceContent = {
    title: "Adolescent Portal",
    ageRange: "Ages 14+",
    description: "Resources designed to support teenagers through the challenges of adolescence, identity development, and increasing independence.",
    gradient: "from-blue-500 to-cyan-500",
    resources: [
      {
        title: "Identity & Self",
        description: "Explore questions of identity and self-discovery in a supportive space",
        icon: <Heart className="h-6 w-6" />,
        tag: "Self-Development",
        color: "bg-blue-100 text-blue-800 border-blue-200",
        action: {
          type: 'workshop' as const,
          id: 'identity-self',
          title: 'Identity & Self'
        }
      },
      {
        title: "Stress Management",
        description: "Practical techniques for managing academic, social, and emotional stress",
        icon: <BrainCircuit className="h-6 w-6" />,
        tag: "Mental Health",
        color: "bg-teal-100 text-teal-800 border-teal-200",
        action: {
          type: 'practice' as const,
          id: 'stress-management',
          title: 'Stress Management'
        }
      },
      {
        title: "Relationship Skills",
        description: "Navigate friendships, romantic relationships, and family dynamics",
        icon: <HeartHandshake className="h-6 w-6" />,
        tag: "Social",
        color: "bg-purple-100 text-purple-800 border-purple-200",
        action: {
          type: 'workshop' as const,
          id: 'relationship-skills',
          title: 'Relationship Skills'
        }
      },
      {
        title: "Future Planning",
        description: "Tools for thinking about the future while managing current pressures",
        icon: <Sparkles className="h-6 w-6" />,
        tag: "Planning",
        color: "bg-indigo-100 text-indigo-800 border-indigo-200",
        action: {
          type: 'workshop' as const,
          id: 'future-planning',
          title: 'Future Planning'
        }
      }
    ],
    games: [
      {
        title: "Decision Maker",
        description: "Interactive scenarios to practice decision-making skills",
        icon: <Gamepad2 className="h-6 w-6" />,
        tag: "Game",
        color: "bg-emerald-100 text-emerald-800 border-emerald-200",
        action: {
          type: 'other' as const,
          path: '/games/decision-maker',
          title: 'Decision Maker Game'
        }
      },
      {
        title: "Mood Tracker",
        description: "Game-based mood tracking with insights and suggestions",
        icon: <Gamepad2 className="h-6 w-6" />,
        tag: "Interactive",
        color: "bg-amber-100 text-amber-800 border-amber-200",
        action: {
          type: 'other' as const,
          path: '/games/mood-tracker',
          title: 'Mood Tracker Game'
        }
      },
      {
        title: "Mindfulness Challenge",
        description: "Daily mindfulness challenges designed specifically for teens",
        icon: <BrainCircuit className="h-6 w-6" />,
        tag: "Challenge",
        color: "bg-cyan-100 text-cyan-800 border-cyan-200",
        action: {
          type: 'other' as const,
          path: '/games/mindfulness-challenge',
          title: 'Mindfulness Challenge'
        }
      }
    ],
    videos: [
      {
        title: "Teen Talks",
        description: "Teens sharing their experiences with mental health and wellbeing",
        icon: <Film className="h-6 w-6" />,
        tag: "Video",
        color: "bg-red-100 text-red-800 border-red-200",
        action: {
          type: 'other' as const,
          path: '/videos/teen-talks',
          title: 'Teen Talks Videos'
        }
      },
      {
        title: "Expert Insights",
        description: "Mental health professionals discuss common teen challenges",
        icon: <Film className="h-6 w-6" />,
        tag: "Video",
        color: "bg-violet-100 text-violet-800 border-violet-200",
        action: {
          type: 'other' as const,
          path: '/videos/expert-insights',
          title: 'Expert Insights Videos'
        }
      }
    ],
    support: [
      {
        title: "Crisis Resources",
        description: "Immediate support resources for teens in crisis",
        icon: <HeartHandshake className="h-6 w-6" />,
        tag: "Support",
        color: "bg-pink-100 text-pink-800 border-pink-200",
        action: {
          type: 'other' as const,
          path: '/crisis-support',
          title: 'Crisis Resources'
        }
      },
      {
        title: "Teen Community",
        description: "Moderated forum for teens to connect and support each other",
        icon: <MessagesSquare className="h-6 w-6" />,
        tag: "Community",
        color: "bg-orange-100 text-orange-800 border-orange-200",
        action: {
          type: 'discussion' as const,
          id: 'teen-community',
          title: 'Teen Community'
        }
      }
    ]
  };

  const content = getAgeSpecificContent();

  const handleResourceClick = (config: ActionButtonConfig) => {
    handleActionClick(config);
  };

  const renderStars = (count: number) => {
    return (
      <div className="flex">
        {[...Array(count)].map((_, i) => (
          <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff6fa] via-[#f8f6ff] to-[#f5faff] pb-20">
      {ageGroup === "early-childhood" ? (
        <div className="w-full bg-gradient-to-r from-pink-400 to-purple-500 py-8 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23FFFFFF%22 fill-opacity=%220.1%22/></svg>')] opacity-20"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-yellow-300 rounded-tl-full opacity-20"></div>
          <div className="absolute top-0 left-0 w-20 h-20 bg-blue-300 rounded-br-full opacity-20"></div>
          
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-comic">
                {content.title}
              </h1>
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="outline" className="bg-white/10 text-white border-white/20 backdrop-blur-sm py-1.5 rounded-full px-4 text-sm">
                  {content.ageRange}
                </Badge>
                <Badge variant="outline" className="bg-yellow-400/80 text-white border-yellow-500 backdrop-blur-sm py-1.5 rounded-full px-4 text-sm animate-bounce">
                  <Star className="h-4 w-4 mr-1 inline" /> Fun Zone!
                </Badge>
              </div>
              <p className="text-white/90 text-lg max-w-3xl mb-6 rounded-lg bg-white/10 p-3 backdrop-blur-sm">
                {content.description}
              </p>
              
              <Button 
                className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-bold rounded-full px-6 py-6 h-auto text-lg shadow-lg transition-transform hover:scale-105"
                onClick={() => setShowFunGame(!showFunGame)}
              >
                <PartyPopper className="mr-2 h-5 w-5" /> 
                {showFunGame ? "Hide Fun Activity" : "Play a Fun Activity!"}
              </Button>
            </div>
            
            {showMascot && (
              <div className="md:ml-8 mt-4 md:mt-0 p-4 bg-white/20 backdrop-blur-sm rounded-2xl border-2 border-white/30 shadow-lg">
                <div className="flex items-center">
                  <div className="w-24 h-24 rounded-full bg-yellow-200 border-4 border-white flex items-center justify-center overflow-hidden shadow-md">
                    <Smile className="h-16 w-16 text-yellow-500" />
                  </div>
                  <div className="ml-4 relative">
                    <div className="bg-white rounded-2xl p-3 shadow-md relative">
                      <div className="absolute left-[-10px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-r-[12px] border-r-white border-b-[8px] border-b-transparent"></div>
                      <p className="text-purple-800 font-bold">{content.mascot.greeting}</p>
                    </div>
                    <h3 className="text-white font-bold mt-2 text-center">Buddy</h3>
                  </div>
                </div>
              </div>
            )}
            
            <div className="absolute top-2 right-2 md:static md:mt-0 ml-auto">
              <HomeButton />
            </div>
          </div>
        </div>
      ) : (
        <div className={`w-full bg-gradient-to-r ${content.gradient} py-12 px-4 relative overflow-hidden`}>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23FFFFFF%22 fill-opacity=%220.1%22/></svg>')] opacity-20"></div>
          
          <div className="max-w-5xl mx-auto flex items-start">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {content.title}
              </h1>
              <div className="flex items-center gap-3 mb-6">
                <Badge variant="outline" className="bg-white/10 text-white border-white/20 backdrop-blur-sm py-1.5">
                  {content.ageRange}
                </Badge>
              </div>
              <p className="text-white/80 text-lg max-w-3xl">
                {content.description}
              </p>
            </div>
            <div className="mt-2">
              <HomeButton />
            </div>
          </div>
        </div>
      )}
      
      {showFunGame && ageGroup === "early-childhood" && (
        <div className="max-w-5xl mx-auto px-4 mt-8">
          <CakeDecorationGame onClose={() => setShowFunGame(false)} />
        </div>
      )}
      
      <div className="max-w-6xl mx-auto px-4 mt-6">
        {ageGroup === "early-childhood" ? (
          <Tabs 
            defaultValue={activeTab} 
            className="w-full" 
            onValueChange={handleTabChange}
          >
            <TabsList className="grid grid-cols-4 mb-8 bg-purple-100 p-1 rounded-full">
              <TabsTrigger value="resources" className="data-[state=active]:bg-purple-500 rounded-full">
                <BookOpen className="h-4 w-4 mr-2" /> Resources
              </TabsTrigger>
              <TabsTrigger value="games" className="data-[state=active]:bg-purple-500 rounded-full">
                <Gamepad2 className="h-4 w-4 mr-2" /> Fun Games
              </TabsTrigger>
              <TabsTrigger value="videos" className="data-[state=active]:bg-purple-500 rounded-full">
                <Film className="h-4 w-4 mr-2" /> Videos
              </TabsTrigger>
              <TabsTrigger value="support" className="data-[state=active]:bg-purple-500 rounded-full">
                <HeartHandshake className="h-4 w-4 mr-2" /> Support
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="resources" className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-purple-800 mb-4 flex items-center">
                  <Rocket className="h-6 w-6 mr-2 text-purple-500" />
                  <span>Fun Resources</span>
                </h2>
                <div className="bg-yellow-100 px-4 py-2 rounded-full flex items-center text-yellow-800 animate-pulse">
                  <PartyPopper className="h-5 w-5 mr-2" /> Collect stars by exploring!
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {content.resources.map((resource, index) => (
                  <Card key={index} className="bg-white rounded-xl shadow-lg border-2 border-purple-200 hover:border-purple-400 transition overflow-hidden group">
                    <div className="bg-gradient-to-r from-pink-200 to-purple-200 h-4"></div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className={`p-3 rounded-lg ${resource.color} transform group-hover:scale-110 transition-transform`}>
                          {resource.icon}
                        </div>
                        <Badge variant="outline" className={`${resource.color} rounded-full px-3`}>
                          {resource.tag}
                        </Badge>
                      </div>
                      <CardTitle className="text-purple-800 mt-4 text-xl">{resource.title}</CardTitle>
                      <CardDescription className="text-gray-600">
                        {resource.description}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex flex-col gap-2">
                      {renderStars(resource.stars)}
                      <Button 
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-full mt-2 py-5 h-auto font-bold text-lg transform hover:scale-105 transition"
                        onClick={() => handleResourceClick(resource.action)}
                      >
                        Explore Resource
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="games" className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-purple-800 mb-4 flex items-center">
                  <Gamepad2 className="h-6 w-6 mr-2 text-purple-500" />
                  <span>Fun Games</span>
                </h2>
                <div className="bg-green-100 px-4 py-2 rounded-full flex items-center text-green-800">
                  <Puzzle className="h-5 w-5 mr-2" /> Games help us learn!
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {content.games.map((game, index) => (
                  <Card key={index} className="bg-white rounded-xl shadow-lg border-2 border-pink-200 hover:border-pink-400 transition overflow-hidden group">
                    <div className="bg-gradient-to-r from-yellow-200 to-orange-200 h-4"></div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className={`p-3 rounded-lg ${game.color} transform group-hover:scale-110 transition-transform`}>
                          {game.icon}
                        </div>
                        <Badge variant="outline" className={`${game.color} rounded-full px-3`}>
                          {game.tag}
                        </Badge>
                      </div>
                      <CardTitle className="text-purple-800 mt-4 text-xl">{game.title}</CardTitle>
                      <CardDescription className="text-gray-600">
                        {game.description}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex flex-col gap-2">
                      {renderStars(game.stars)}
                      <Button 
                        className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white rounded-full mt-2 py-5 h-auto font-bold text-lg transform hover:scale-105 transition"
                        onClick={() => handleResourceClick(game.action)}
                      >
                        <Gamepad2 className="mr-2 h-5 w-5" /> Play Game
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="videos" className="space-y-8">
              <div className="flex items-center">
                <h2 className="text-2xl font-bold text-purple-800 mb-4 flex items-center">
                  <Film className="h-6 w-6 mr-2 text-purple-500" />
                  <span>Fun Videos</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {content.videos.map((video, index) => (
                  <Card key={index} className="bg-white rounded-xl shadow-lg border-2 border-blue-200 hover:border-blue-400 transition overflow-hidden group">
                    <div className="bg-gradient-to-r from-blue-200 to-cyan-200 h-4"></div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className={`p-3 rounded-lg ${video.color} transform group-hover:scale-110 transition-transform`}>
                          {video.icon}
                        </div>
                        <Badge variant="outline" className={`${video.color} rounded-full px-3`}>
                          {video.tag}
                        </Badge>
                      </div>
                      <CardTitle className="text-purple-800 mt-4 text-xl">{video.title}</CardTitle>
                      <CardDescription className="text-gray-600">
                        {video.description}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex flex-col gap-2">
                      {renderStars(video.stars)}
                      <Button 
                        className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white rounded-full mt-2 py-5 h-auto font-bold text-lg transform hover:scale-105 transition"
                        onClick={() => handleResourceClick(video.action)}
                      >
                        <Film className="mr-2 h-5 w-5" /> Watch Videos
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="support" className="space-y-8">
              <div className="flex items-center">
                <h2 className="text-2xl font-bold text-purple-800 mb-4 flex items-center">
                  <HeartHandshake className="h-6 w-6 mr-2 text-purple-500" />
                  <span>Parent Resources</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {content.support.map((item, index) => (
                  <Card key={index} className="bg-white rounded-xl shadow-lg border-2 border-green-200 hover:border-green-400 transition overflow-hidden group">
                    <div className="bg-gradient-to-r from-green-200 to-teal-200 h-4"></div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className={`p-3 rounded-lg ${item.color} transform group-hover:scale-110 transition-transform`}>
                          {item.icon}
                        </div>
                        <Badge variant="outline" className={`${item.color} rounded-full px-3`}>
                          {item.tag}
                        </Badge>
                      </div>
                      <CardTitle className="text-purple-800 mt-4 text-xl">{item.title}</CardTitle>
                      <CardDescription className="text-gray-600">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex flex-col gap-2">
                      {renderStars(item.stars)}
                      <Button 
                        className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white rounded-full mt-2 py-5 h-auto font-bold text-lg transform hover:scale-105 transition"
                        onClick={() => handleResourceClick(item.action)}
                      >
                        <HeartHandshake className="mr-2 h-5 w-5" /> Access Support
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <Tabs 
            defaultValue={activeTab} 
            className="w-full" 
            onValueChange={handleTabChange}
          >
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="games">Interactive Games</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="support">Support</TabsTrigger>
            </TabsList>
            
            <TabsContent value="resources" className="space-y-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Featured Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {content.resources.map((resource, index) => (
                  <Card key={index} className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className={`p-2 rounded-md ${resource.color}`}>
                          {resource.icon}
                        </div>
                        <Badge variant="outline" className={resource.color}>
                          {resource.tag}
                        </Badge>
                      </div>
                      <CardTitle className="text-white mt-4">{resource.title}</CardTitle>
                      <CardDescription className="text-gray-300">
                        {resource.description}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button 
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                        onClick={() => handleResourceClick(resource.action)}
                      >
                        Explore Resource
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="games" className="space-y-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Interactive Games</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {content.games.map((game, index) => (
                  <Card key={index} className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className={`p-2 rounded-md ${game.color}`}>
                          {game.icon}
                        </div>
                        <Badge variant="outline" className={game.color}>
                          {game.tag}
                        </Badge>
                      </div>
                      <CardTitle className="text-white mt-4">{game.title}</CardTitle>
                      <CardDescription className="text-gray-300">
                        {game.description}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button 
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                        onClick={() => handleResourceClick(game.action)}
                      >
                        Play Game
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="videos" className="space-y-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Video Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {content.videos.map((video, index) => (
                  <Card key={index} className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className={`p-2 rounded-md ${video.color}`}>
                          {video.icon}
                        </div>
                        <Badge variant="outline" className={video.color}>
                          {video.tag}
                        </Badge>
                      </div>
                      <CardTitle className="text-white mt-4">{video.title}</CardTitle>
                      <CardDescription className="text-gray-300">
                        {video.description}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button 
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                        onClick={() => handleResourceClick(video.action)}
                      >
                        Watch Videos
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="support" className="space-y-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Support Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {content.support.map((item, index) => (
                  <Card key={index} className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className={`p-2 rounded-md ${item.color}`}>
                          {item.icon}
                        </div>
                        <Badge variant="outline" className={item.color}>
                          {item.tag}
                        </Badge>
                      </div>
                      <CardTitle className="text-white mt-4">{item.title}</CardTitle>
                      <CardDescription className="text-gray-300">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button 
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                        onClick={() => handleResourceClick(item.action)}
                      >
                        Access Support
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default AdolescentPortal;
