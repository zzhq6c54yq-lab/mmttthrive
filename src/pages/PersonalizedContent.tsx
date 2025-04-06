
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Heart, Bookmark, Calendar, ArrowLeft, 
  Search, Filter, ThumbsUp, MessageCircle, 
  Share2, Video, Headphones, FileText, Award,
  User, Clock, ChevronDown, ChevronRight, 
  Sparkles, Play, Pause, Repeat, SkipBack, SkipForward 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import HomeButton from "@/components/HomeButton";

// Types
interface ContentItem {
  id: string;
  title: string;
  description: string;
  type: "article" | "video" | "audio" | "exercise";
  thumbnail: string;
  author?: string;
  duration?: string;
  dateAdded: string;
  tags: string[];
  isRecommended: boolean;
  isBookmarked: boolean;
  isFeatured?: boolean;
  progress?: number;
  category: string;
  url: string;
  likes: number;
  commentsCount: number;
}

interface CategoryData {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const PersonalizedContent: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState("recommended");
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAudio, setActiveAudio] = useState<string | null>(null);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  // Fetch content data
  useEffect(() => {
    // Simulated API call
    const fetchData = () => {
      const mockContentItems: ContentItem[] = [
        {
          id: "content-1",
          title: "Understanding Anxiety: Causes and Coping Mechanisms",
          description: "Learn about the root causes of anxiety and discover effective coping mechanisms to manage symptoms in everyday situations.",
          type: "article",
          thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
          author: "Dr. Emma Wilson",
          dateAdded: "2 weeks ago",
          tags: ["anxiety", "coping-strategies", "mental-health"],
          isRecommended: true,
          isBookmarked: true,
          category: "anxiety-management",
          url: "/articles/understanding-anxiety",
          likes: 342,
          commentsCount: 28
        },
        {
          id: "content-2",
          title: "Guided Meditation for Stress Relief",
          description: "A 15-minute guided meditation specifically designed to reduce stress and promote relaxation during difficult moments.",
          type: "audio",
          thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
          author: "Maria Chen, Meditation Guide",
          duration: "15 min",
          dateAdded: "1 month ago",
          tags: ["meditation", "stress-relief", "relaxation"],
          isRecommended: true,
          isBookmarked: false,
          category: "mindfulness",
          progress: 35,
          url: "/audio/guided-meditation-stress",
          likes: 521,
          commentsCount: 47
        },
        {
          id: "content-3",
          title: "Finding Joy in Small Moments",
          description: "Practical techniques for recognizing and appreciating small moments of joy throughout your day to improve overall well-being.",
          type: "article",
          thumbnail: "https://images.unsplash.com/photo-1474418397713-2f1091ea1a2c?auto=format&fit=crop&w=600&q=80",
          author: "Alex Johnson",
          dateAdded: "3 days ago",
          tags: ["happiness", "mindfulness", "daily-practice"],
          isRecommended: true,
          isBookmarked: true,
          isFeatured: true,
          category: "positive-psychology",
          url: "/articles/finding-joy",
          likes: 238,
          commentsCount: 42
        },
        {
          id: "content-4",
          title: "Cognitive Behavioral Therapy Techniques",
          description: "A video walkthrough of core CBT techniques you can apply yourself to challenge negative thought patterns.",
          type: "video",
          thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
          author: "Prof. Sarah Miller, PhD",
          duration: "28 min",
          dateAdded: "2 months ago",
          tags: ["cbt", "therapy", "thought-patterns"],
          isRecommended: false,
          isBookmarked: false,
          category: "therapy-techniques",
          progress: 50,
          url: "/videos/cbt-techniques",
          likes: 765,
          commentsCount: 93
        },
        {
          id: "content-5",
          title: "Progressive Muscle Relaxation",
          description: "Audio guide to progressive muscle relaxation - a technique to release tension throughout your body.",
          type: "audio",
          thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
          author: "Dr. James Roberts",
          duration: "22 min",
          dateAdded: "1 week ago",
          tags: ["relaxation", "stress-management", "body-awareness"],
          isRecommended: true,
          isBookmarked: false,
          category: "stress-management",
          url: "/audio/muscle-relaxation",
          likes: 429,
          commentsCount: 31
        },
        {
          id: "content-6",
          title: "Building Healthy Sleep Habits",
          description: "Learn science-backed strategies to improve your sleep quality and establish consistent sleep patterns.",
          type: "article",
          thumbnail: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80",
          author: "Lisa Chen, Sleep Specialist",
          dateAdded: "3 weeks ago",
          tags: ["sleep", "habits", "health"],
          isRecommended: true,
          isBookmarked: false,
          category: "sleep-improvement",
          url: "/articles/healthy-sleep-habits",
          likes: 612,
          commentsCount: 54
        },
        {
          id: "content-7",
          title: "Understanding Depression: Signs and Support Strategies",
          description: "An informative overview of depression symptoms and how to support yourself or loved ones through depression.",
          type: "video",
          thumbnail: "https://images.unsplash.com/photo-1541199249251-f713e6145474?auto=format&fit=crop&w=600&q=80",
          author: "Dr. Michael Thompson",
          duration: "32 min",
          dateAdded: "2 months ago",
          tags: ["depression", "mental-health", "support"],
          isRecommended: false,
          isBookmarked: true,
          category: "depression-support",
          url: "/videos/understanding-depression",
          likes: 832,
          commentsCount: 127
        },
        {
          id: "content-8",
          title: "5-Minute Calming Breathing Exercise",
          description: "A quick breathing exercise you can do anywhere to immediately reduce anxiety and center yourself.",
          type: "exercise",
          thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
          duration: "5 min",
          dateAdded: "2 weeks ago",
          tags: ["breathing", "quick-relief", "anxiety"],
          isRecommended: true,
          isBookmarked: false,
          category: "anxiety-management",
          url: "/exercises/calming-breathing",
          likes: 347,
          commentsCount: 18
        },
        {
          id: "content-9",
          title: "Setting Healthy Boundaries",
          description: "Learn why boundaries are important for mental health and how to establish them in various relationships.",
          type: "article",
          thumbnail: "https://images.unsplash.com/photo-1573497019236-61e7a0258ab7?auto=format&fit=crop&w=600&q=80",
          author: "Dr. Amanda Williams",
          dateAdded: "1 month ago",
          tags: ["boundaries", "relationships", "self-care"],
          isRecommended: false,
          isBookmarked: false,
          isFeatured: true,
          category: "relationships",
          url: "/articles/healthy-boundaries",
          likes: 529,
          commentsCount: 73
        },
        {
          id: "content-10",
          title: "Morning Gratitude Meditation",
          description: "Start your day with this 10-minute gratitude meditation to foster positivity and mindfulness.",
          type: "audio",
          thumbnail: "https://images.unsplash.com/photo-1519834064978-9e0cf1b84d05?auto=format&fit=crop&w=600&q=80",
          author: "Mindfulness Coach Emily Parker",
          duration: "10 min",
          dateAdded: "2 weeks ago",
          tags: ["gratitude", "meditation", "morning-routine"],
          isRecommended: true,
          isBookmarked: true,
          category: "mindfulness",
          url: "/audio/gratitude-meditation",
          likes: 683,
          commentsCount: 42
        }
      ];
      
      setContentItems(mockContentItems);
      setBookmarks(mockContentItems.filter(item => item.isBookmarked).map(item => item.id));
    };
    
    fetchData();
  }, []);

  // Categories
  const categories: CategoryData[] = [
    {
      id: "anxiety-management",
      name: "Anxiety Management",
      description: "Tools and techniques for managing anxiety",
      icon: <Heart className="h-5 w-5" />,
      color: "bg-blue-500"
    },
    {
      id: "mindfulness",
      name: "Mindfulness & Meditation",
      description: "Practices for staying present and aware",
      icon: <Sparkles className="h-5 w-5" />,
      color: "bg-purple-500"
    },
    {
      id: "stress-management",
      name: "Stress Management",
      description: "Techniques to reduce and cope with stress",
      icon: <Clock className="h-5 w-5" />,
      color: "bg-green-500"
    },
    {
      id: "sleep-improvement",
      name: "Sleep Improvement",
      description: "Resources for better sleep quality",
      icon: <Moon className="h-5 w-5" />,
      color: "bg-indigo-500"
    },
    {
      id: "positive-psychology",
      name: "Positive Psychology",
      description: "Building resilience and finding joy",
      icon: <ThumbsUp className="h-5 w-5" />,
      color: "bg-yellow-500"
    },
    {
      id: "therapy-techniques",
      name: "Therapy Techniques",
      description: "Evidence-based therapeutic approaches",
      icon: <MessageCircle className="h-5 w-5" />,
      color: "bg-red-500"
    },
    {
      id: "depression-support",
      name: "Depression Support",
      description: "Resources for understanding and managing depression",
      icon: <Heart className="h-5 w-5" />,
      color: "bg-teal-500"
    },
    {
      id: "relationships",
      name: "Relationships",
      description: "Building healthy connections with others",
      icon: <Users className="h-5 w-5" />,
      color: "bg-pink-500"
    }
  ];
  
  // Toggle bookmark
  const toggleBookmark = (contentId: string) => {
    // Update content items
    setContentItems(contentItems.map(item => {
      if (item.id === contentId) {
        return { ...item, isBookmarked: !item.isBookmarked };
      }
      return item;
    }));
    
    // Update bookmarks list
    const isCurrentlyBookmarked = bookmarks.includes(contentId);
    if (isCurrentlyBookmarked) {
      setBookmarks(bookmarks.filter(id => id !== contentId));
      toast({
        title: "Removed from bookmarks",
        description: "Item removed from your saved content."
      });
    } else {
      setBookmarks([...bookmarks, contentId]);
      toast({
        title: "Added to bookmarks",
        description: "Item saved to your bookmarks for easy access."
      });
    }
  };
  
  // Handle like
  const handleLike = (contentId: string) => {
    setContentItems(contentItems.map(item => {
      if (item.id === contentId) {
        return { ...item, likes: item.likes + 1 };
      }
      return item;
    }));
    
    toast({
      title: "Content Liked",
      description: "Thank you for your feedback!",
    });
  };
  
  // Filter content
  const filteredContent = contentItems.filter(item => {
    // Filter by tab
    if (activeTab === "recommended" && !item.isRecommended) return false;
    if (activeTab === "bookmarked" && !bookmarks.includes(item.id)) return false;
    if (activeTab === "featured" && !item.isFeatured) return false;
    
    // Filter by category
    if (selectedCategory && item.category !== selectedCategory) return false;
    
    // Filter by type
    if (selectedType && item.type !== selectedType) return false;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return true;
  });
  
  // Play audio
  const togglePlayAudio = (audioId: string) => {
    if (activeAudio === audioId) {
      setIsPlaying(!isPlaying);
    } else {
      setActiveAudio(audioId);
      setIsPlaying(true);
      setCurrentProgress(0);
    }
  };
  
  // Content item component
  const ContentItemCard = ({ item }: { item: ContentItem }) => {
    const isBookmarked = bookmarks.includes(item.id);
    const isHovered = hoveredItem === item.id;
    
    const getTypeIcon = () => {
      switch (item.type) {
        case "article":
          return <FileText className="h-5 w-5 text-blue-500" />;
        case "video":
          return <Video className="h-5 w-5 text-red-500" />;
        case "audio":
          return <Headphones className="h-5 w-5 text-purple-500" />;
        case "exercise":
          return <Award className="h-5 w-5 text-green-500" />;
        default:
          return <FileText className="h-5 w-5 text-gray-500" />;
      }
    };
    
    const getTypeLabel = () => {
      return item.type.charAt(0).toUpperCase() + item.type.slice(1);
    };
    
    const getCategoryData = () => {
      return categories.find(category => category.id === item.category) || categories[0];
    };
    
    const categoryData = getCategoryData();
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        onMouseEnter={() => setHoveredItem(item.id)}
        onMouseLeave={() => setHoveredItem(null)}
        className="h-full"
        whileHover={{ y: -5 }}
      >
        <Card className={`h-full overflow-hidden transition-all duration-300 hover:shadow-md ${
          isHovered ? "border-[#9b87f5]" : ""
        }`}>
          <div className="relative aspect-video overflow-hidden">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="object-cover w-full h-full transition-all duration-500"
            />
            <div className="absolute inset-0 bg-black/30"></div>
            
            {/* Type & Category Badges */}
            <div className="absolute top-2 left-2 flex gap-2">
              <Badge className="bg-white/90 text-gray-800 hover:bg-white/100">
                {getTypeIcon()} <span className="ml-1">{getTypeLabel()}</span>
              </Badge>
              <Badge 
                className={`${categoryData.color}/90 hover:${categoryData.color}/100 text-white`}
                onClick={() => setSelectedCategory(item.category)}
              >
                {categoryData.name}
              </Badge>
            </div>
            
            {/* Duration */}
            {item.duration && (
              <div className="absolute bottom-2 right-2">
                <Badge variant="secondary" className="bg-black/70 text-white hover:bg-black/80">
                  <Clock className="h-3 w-3 mr-1" />
                  {item.duration}
                </Badge>
              </div>
            )}
            
            {/* Play Button for Video/Audio */}
            {(item.type === 'video' || item.type === 'audio') && (
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.button
                  className="h-12 w-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => item.type === 'audio' ? togglePlayAudio(item.id) : navigate(item.url)}
                >
                  <Play className="h-6 w-6 text-gray-800 ml-1" />
                </motion.button>
              </div>
            )}
            
            {/* Progress bar */}
            {item.progress !== undefined && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                <div 
                  className="h-full bg-[#9b87f5]"
                  style={{ width: `${item.progress}%` }}
                ></div>
              </div>
            )}
          </div>
          
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg line-clamp-1">{item.title}</CardTitle>
                {item.author && (
                  <CardDescription className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {item.author}
                  </CardDescription>
                )}
              </div>
              <button
                onClick={() => toggleBookmark(item.id)}
                className={`p-1.5 rounded-full transition-colors ${
                  isBookmarked 
                    ? "text-[#9b87f5] bg-[#9b87f5]/10"
                    : "text-gray-400 hover:bg-gray-100"
                }`}
              >
                <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-[#9b87f5]" : ""}`} />
              </button>
            </div>
          </CardHeader>
          
          <CardContent>
            <p className="text-gray-600 text-sm line-clamp-2 mb-2">{item.description}</p>
            <div className="flex flex-wrap gap-1 mb-1">
              {item.tags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-xs hover:bg-gray-100 cursor-pointer"
                >
                  {tag.replace(/-/g, ' ')}
                </Badge>
              ))}
              {item.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{item.tags.length - 3}
                </Badge>
              )}
            </div>
          </CardContent>
          
          <CardFooter className="flex items-center justify-between pt-0">
            <div className="flex items-center text-sm text-gray-500">
              <button onClick={() => handleLike(item.id)} className="flex items-center mr-3 hover:text-[#9b87f5]">
                <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                {item.likes}
              </button>
              <div className="flex items-center mr-3">
                <MessageCircle className="h-3.5 w-3.5 mr-1" />
                {item.commentsCount}
              </div>
              <div className="text-xs">{item.dateAdded}</div>
            </div>
            
            <Button size="sm" variant="ghost" className="text-[#9b87f5] p-0 h-8 w-8 rounded-full">
              <Share2 className="h-4 w-4" />
            </Button>
          </CardFooter>
          
          {/* Audio Player */}
          {item.type === "audio" && activeAudio === item.id && (
            <div className="px-4 pb-4">
              <div className="border-t border-gray-100 pt-3">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-2">
                    <button onClick={() => togglePlayAudio(item.id)} className="p-1.5 bg-[#9b87f5] rounded-full text-white">
                      {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3 ml-0.5" />}
                    </button>
                    <button className="p-1.5 hover:bg-gray-100 rounded-full">
                      <SkipBack className="h-3 w-3" />
                    </button>
                    <button className="p-1.5 hover:bg-gray-100 rounded-full">
                      <SkipForward className="h-3 w-3" />
                    </button>
                  </div>
                  <button className="p-1.5 hover:bg-gray-100 rounded-full">
                    <Repeat className="h-3 w-3" />
                  </button>
                </div>
                <div className="bg-gray-200 h-1 rounded-full">
                  <div 
                    className="h-full bg-[#9b87f5] rounded-full"
                    style={{ width: `${currentProgress || item.progress || 0}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>
                    {Math.floor((currentProgress || item.progress || 0) * parseInt(item.duration || "0") / 100 / 60)}:
                    {String(Math.floor((currentProgress || item.progress || 0) * parseInt(item.duration || "0") / 100 % 60)).padStart(2, '0')}
                  </span>
                  <span>{item.duration}</span>
                </div>
              </div>
            </div>
          )}
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#f5f5fa]">
      {/* Animated background elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-gradient-to-br from-[#9b87f5]/5 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-gradient-to-tr from-[#D946EF]/5 to-transparent blur-3xl"></div>
      </div>
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1a1a1f] to-[#272730] text-white py-8 px-4 relative overflow-hidden">
        <motion.div 
          className="absolute top-[-20%] right-[-10%] w-[40%] h-[70%] rounded-full bg-gradient-to-br from-[#9b87f5]/20 to-transparent blur-3xl"
          animate={{ 
            rotate: [0, 180],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
        />
      
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Button 
              variant="link" 
              className="text-white hover:text-[#9b87f5] p-0 flex items-center"
              onClick={() => navigate("/home")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            <HomeButton />
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-[#9b87f5]" />
              Your Personalized Content
            </h1>
            <p className="text-gray-300 max-w-3xl">
              Content recommendations tailored to your unique needs, preferences, and wellness journey. 
              Discover resources that resonate with your specific goals and interests.
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 relative z-10">
        {/* Categories Carousel */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Categories</h2>
            <Button variant="ghost" className="text-[#9b87f5] p-1 h-8">
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.slice(0, 8).map((category) => (
              <motion.button
                key={category.id}
                className={cn(
                  "p-4 rounded-lg border transition-all text-left h-full",
                  selectedCategory === category.id
                    ? "border-[#9b87f5] bg-[#9b87f5]/5"
                    : "border-gray-200 bg-white hover:border-[#9b87f5]/50"
                )}
                onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`p-2 rounded-full ${category.color}/10 w-fit mb-2`}>
                  <div className={`${category.color} p-1 rounded-full text-white`}>
                    {category.icon}
                  </div>
                </div>
                <h3 className="font-medium mb-1">{category.name}</h3>
                <p className="text-xs text-gray-500">{category.description}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>
        
        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                className="pl-10 pr-4 py-2 border-gray-200 focus-visible:ring-[#9b87f5]"
                placeholder="Search content by title, topics, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              variant="outline"
              className="border-gray-200 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showFilters ? "rotate-180" : ""}`} />
            </Button>
          </div>
          
          {/* Filter options */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200 space-y-4">
                  {selectedCategory && (
                    <div>
                      <h3 className="font-medium mb-2">Selected Category:</h3>
                      <Badge 
                        className="bg-[#9b87f5] hover:bg-[#8b77e5] text-white cursor-pointer"
                        onClick={() => setSelectedCategory(null)}
                      >
                        {categories.find(c => c.id === selectedCategory)?.name}
                        <span className="ml-1">×</span>
                      </Badge>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="font-medium mb-2">Filter by content type:</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant={selectedType === null ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setSelectedType(null)}
                      >
                        All Types
                      </Badge>
                      {["article", "video", "audio", "exercise"].map(type => (
                        <Badge
                          key={type}
                          variant={selectedType === type ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => setSelectedType(selectedType === type ? null : type)}
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Content Tabs */}
        <Tabs 
          defaultValue="recommended" 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="w-full"
        >
          <TabsList className="mb-6 max-w-3xl grid grid-cols-3 bg-white/80">
            <TabsTrigger 
              value="recommended" 
              className="data-[state=active]:bg-[#9b87f5] data-[state=active]:text-white"
            >
              Recommended For You
            </TabsTrigger>
            <TabsTrigger 
              value="featured" 
              className="data-[state=active]:bg-[#9b87f5] data-[state=active]:text-white"
            >
              Featured Content
            </TabsTrigger>
            <TabsTrigger 
              value="bookmarked" 
              className="data-[state=active]:bg-[#9b87f5] data-[state=active]:text-white"
            >
              Your Bookmarks
            </TabsTrigger>
          </TabsList>
          
          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filteredContent.length === 0 ? (
                <div className="text-center py-12 bg-white/50 backdrop-blur-sm rounded-lg border border-gray-200">
                  <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No content found</h3>
                  <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory(null);
                      setSelectedType(null);
                      setShowFilters(false);
                    }}
                  >
                    Clear all filters
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      {activeTab === "recommended" && (
                        <>
                          <Sparkles className="h-5 w-5 text-[#9b87f5]" />
                          Recommended For You
                        </>
                      )}
                      {activeTab === "featured" && (
                        <>
                          <Award className="h-5 w-5 text-[#9b87f5]" />
                          Featured Content
                        </>
                      )}
                      {activeTab === "bookmarked" && (
                        <>
                          <Bookmark className="h-5 w-5 text-[#9b87f5]" />
                          Your Bookmarked Content
                        </>
                      )}
                      <Badge className="ml-2 bg-[#9b87f5]/10 text-[#9b87f5] hover:bg-[#9b87f5]/20">
                        {filteredContent.length}
                      </Badge>
                    </h2>
                    
                    {selectedCategory && (
                      <Badge 
                        variant="outline"
                        className="cursor-pointer"
                        onClick={() => setSelectedCategory(null)}
                      >
                        {categories.find(c => c.id === selectedCategory)?.name}
                        <span className="ml-1">×</span>
                      </Badge>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredContent.map((item) => (
                      <ContentItemCard key={item.id} item={item} />
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </Tabs>
        
        {/* "Get More Recommendations" Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-[#9b87f5]/10 to-[#D946EF]/10 p-8 rounded-lg border border-[#9b87f5]/30 relative overflow-hidden">
            <motion.div 
              className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-gradient-to-br from-[#9b87f5]/10 to-transparent blur-2xl"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 10, 0],
              }}
              transition={{ duration: 10, repeat: Infinity }}
            />
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-[#9b87f5]" />
                  Get More Personalized Recommendations
                </h3>
                <p className="text-gray-600 max-w-2xl">
                  Complete a quick assessment to help us understand your needs better. 
                  We'll use your responses to tailor content specifically for your mental wellness journey.
                </p>
              </div>
              
              <Button 
                className="bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:from-[#8b77e5] hover:to-[#6E59A5] text-white text-lg px-6 py-6 h-auto"
                onClick={() => {
                  toast({
                    title: "Assessment Starting",
                    description: "Preparing your personalized content assessment...",
                    duration: 3000,
                  });
                  
                  setTimeout(() => {
                    navigate("/mental-wellness-tools", { state: { activeTab: "assessments" } });
                  }, 500);
                }}
              >
                Take Content Assessment
              </Button>
            </div>
          </div>
        </motion.div>
        
        {/* Recently Viewed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Clock className="h-5 w-5 text-[#9b87f5]" />
              Recently Viewed
            </h2>
            <Button variant="link" className="text-[#9b87f5] p-1">
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contentItems.filter(item => item.progress !== undefined).slice(0, 3).map((item) => (
              <ContentItemCard key={item.id} item={item} />
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="bg-[#1a1a1f] text-white py-8 mt-16"
      >
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400 mb-4">
            Our content recommendations are created by mental health professionals and updated regularly to ensure you receive the most helpful resources.
          </p>
          
          <div className="flex justify-center gap-4">
            <Button variant="link" className="text-[#9b87f5] hover:text-[#8b77e5]">
              Content Preferences
            </Button>
            <Button variant="link" className="text-[#9b87f5] hover:text-[#8b77e5]">
              Suggest Content
            </Button>
            <Button variant="link" className="text-[#9b87f5] hover:text-[#8b77e5]">
              Privacy Settings
            </Button>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

// Missing components for the imports
const Users = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
};

const Moon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
};

export default PersonalizedContent;
