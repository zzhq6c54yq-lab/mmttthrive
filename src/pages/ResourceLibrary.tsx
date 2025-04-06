
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, Phone, ExternalLink, Download, Bookmark, Search, 
  Clock, ArrowRight, Share2, Info, Book, AlertCircle, 
  Heart, Home, Filter, MessageSquare, Sparkles, ChevronDown 
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import HomeButton from "@/components/HomeButton";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: "article" | "guide" | "hotline" | "tool";
  tags: string[];
  url?: string;
  phone?: string;
  isBookmarked: boolean;
  isFeatured?: boolean;
  availability?: string;
  lastUpdated?: string;
  rating?: number;
  readTime?: string;
}

interface EmergencyContact {
  name: string;
  phone: string;
  description: string;
  hours: string;
  url?: string;
}

const ResourceLibrary: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [resources, setResources] = useState<Resource[]>([]);
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredResource, setHoveredResource] = useState<string | null>(null);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Simulate data fetching with a loading effect
    const timer = setTimeout(() => {
      fetchResourceData();
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Auto-rotate featured resources
  useEffect(() => {
    const timer = setInterval(() => {
      const featuredResources = resources.filter(r => r.isFeatured);
      if (featuredResources.length > 1) {
        setFeaturedIndex(prev => (prev + 1) % featuredResources.length);
      }
    }, 10000); // Change every 10 seconds
    
    return () => clearInterval(timer);
  }, [resources]);

  const fetchResourceData = () => {
    // Sample resources data
    const resourcesData: Resource[] = [
      {
        id: "resource-1",
        title: "Understanding Anxiety: A Comprehensive Guide",
        description: "Learn about the different types of anxiety disorders, symptoms, and evidence-based treatment options.",
        type: "article",
        tags: ["anxiety", "mental-health", "treatment"],
        url: "#",
        isBookmarked: true,
        isFeatured: true,
        lastUpdated: "2 months ago",
        rating: 4.8,
        readTime: "10 min"
      },
      {
        id: "resource-2",
        title: "Depression: Signs, Symptoms, and Support Strategies",
        description: "An in-depth look at depression, its impact on daily life, and ways to find appropriate help and support.",
        type: "article",
        tags: ["depression", "mental-health", "support"],
        url: "#",
        isBookmarked: false,
        lastUpdated: "3 months ago",
        rating: 4.5,
        readTime: "12 min"
      },
      {
        id: "resource-3",
        title: "Suicide Prevention Hotline",
        description: "Immediate support for anyone in suicidal crisis or emotional distress. Available 24/7.",
        type: "hotline",
        tags: ["crisis", "suicide-prevention", "emergency"],
        phone: "988",
        url: "https://988lifeline.org/",
        isBookmarked: true,
        availability: "24/7"
      },
      {
        id: "resource-4",
        title: "Crisis Text Line",
        description: "Free 24/7 mental health support via text. Connect with a trained crisis counselor.",
        type: "hotline",
        tags: ["crisis", "text-support", "counseling"],
        phone: "Text HOME to 741741",
        url: "https://www.crisistextline.org/",
        isBookmarked: false,
        availability: "24/7"
      },
      {
        id: "resource-5",
        title: "Mindfulness Meditation: Beginner's Guide",
        description: "A step-by-step guide to starting a mindfulness meditation practice, with exercises and tips for beginners.",
        type: "guide",
        tags: ["mindfulness", "meditation", "stress-reduction"],
        url: "#",
        isBookmarked: false,
        lastUpdated: "1 month ago",
        rating: 4.7,
        readTime: "15 min"
      },
      {
        id: "resource-6",
        title: "Sleep Hygiene: Improving Your Sleep Quality",
        description: "Practical strategies and habits to develop for better sleep, including environment adjustments and bedtime routines.",
        type: "guide",
        tags: ["sleep", "wellness", "habits"],
        url: "#",
        isBookmarked: false,
        lastUpdated: "4 months ago",
        rating: 4.3,
        readTime: "18 min"
      },
      {
        id: "resource-7",
        title: "Substance Abuse and Mental Health Services Administration (SAMHSA)",
        description: "National helpline providing information, support, and treatment referrals for substance use disorders and mental health issues.",
        type: "hotline",
        tags: ["substance-abuse", "addiction", "referrals"],
        phone: "1-800-662-4357",
        url: "https://www.samhsa.gov/find-help/national-helpline",
        isBookmarked: false,
        availability: "24/7"
      },
      {
        id: "resource-8",
        title: "Coping Skills for Overwhelming Emotions",
        description: "Practical techniques to manage intense emotions, including grounding exercises, distress tolerance, and emotional regulation strategies.",
        type: "guide",
        tags: ["coping-skills", "emotions", "self-help"],
        url: "#",
        isBookmarked: true,
        isFeatured: true,
        lastUpdated: "2 weeks ago",
        rating: 4.9,
        readTime: "20 min"
      },
      {
        id: "resource-9",
        title: "Understanding Trauma and Its Effects",
        description: "Information on how trauma affects the mind and body, and approaches to trauma-informed care and healing.",
        type: "article",
        tags: ["trauma", "ptsd", "healing"],
        url: "#",
        isBookmarked: false,
        lastUpdated: "5 months ago",
        rating: 4.6,
        readTime: "22 min"
      },
      {
        id: "resource-10",
        title: "Mood Tracking Tool",
        description: "A downloadable template to track your daily mood patterns, triggers, and coping strategies over time.",
        type: "tool",
        tags: ["mood-tracking", "self-awareness", "journaling"],
        url: "#",
        isBookmarked: false
      }
    ];

    // Sample emergency contacts
    const contactsData: EmergencyContact[] = [
      {
        name: "National Suicide Prevention Lifeline",
        phone: "988",
        description: "24/7 support for people in distress, prevention and crisis resources for you or loved ones",
        hours: "24/7",
        url: "https://988lifeline.org/"
      },
      {
        name: "Crisis Text Line",
        phone: "Text HOME to 741741",
        description: "Connect with a crisis counselor to receive free support via text message",
        hours: "24/7",
        url: "https://www.crisistextline.org/"
      },
      {
        name: "SAMHSA's National Helpline",
        phone: "1-800-662-4357",
        description: "Treatment referral and information service for individuals facing mental health or substance use disorders",
        hours: "24/7",
        url: "https://www.samhsa.gov/find-help/national-helpline"
      },
      {
        name: "National Domestic Violence Hotline",
        phone: "1-800-799-7233",
        description: "Support, crisis intervention, safety planning, and referrals for survivors of domestic violence",
        hours: "24/7",
        url: "https://www.thehotline.org/"
      },
      {
        name: "Veterans Crisis Line",
        phone: "988, then press 1",
        description: "Connects veterans and their families with qualified responders",
        hours: "24/7",
        url: "https://www.veteranscrisisline.net/"
      }
    ];

    setResources(resourcesData);
    setEmergencyContacts(contactsData);
    setBookmarks(resourcesData.filter(r => r.isBookmarked).map(r => r.id));
  };

  const toggleBookmark = (resourceId: string) => {
    // Update resources with new bookmark status
    setResources(resources.map(resource => {
      if (resource.id === resourceId) {
        return { ...resource, isBookmarked: !resource.isBookmarked };
      }
      return resource;
    }));

    // Update bookmarks list
    const isCurrentlyBookmarked = bookmarks.includes(resourceId);
    if (isCurrentlyBookmarked) {
      setBookmarks(bookmarks.filter(id => id !== resourceId));
      toast({
        title: "Removed from bookmarks",
        description: "This resource has been removed from your bookmarks."
      });
    } else {
      setBookmarks([...bookmarks, resourceId]);
      toast({
        title: "Added to bookmarks",
        description: "This resource has been saved to your bookmarks for easy access."
      });
    }
  };

  const filteredResources = resources.filter(resource => {
    // Filter by tab selection
    if (activeTab === "all") {
      // Show all except for bookmarks tab
    } else if (activeTab === "bookmarks") {
      if (!bookmarks.includes(resource.id)) return false;
    } else if (activeTab === "hotlines") {
      if (resource.type !== "hotline") return false;
    } else if (activeTab === "articles") {
      if (resource.type !== "article") return false;
    } else if (activeTab === "guides") {
      if (resource.type !== "guide") return false;
    }
    
    // Filter by category if selected
    if (selectedCategory && !resource.tags.includes(selectedCategory)) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        resource.title.toLowerCase().includes(query) ||
        resource.description.toLowerCase().includes(query) ||
        resource.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return true;
  });

  // Get unique categories for filtering
  const categories = Array.from(new Set(resources.flatMap(r => r.tags)));
  
  // Get featured resources
  const featuredResources = resources.filter(r => r.isFeatured);

  const ResourceCard = ({ resource, featured = false }: { resource: Resource; featured?: boolean }) => {
    const isBookmarked = bookmarks.includes(resource.id);
    const isHovered = hoveredResource === resource.id;
    
    const getTypeIcon = () => {
      switch (resource.type) {
        case "article":
          return <FileText className="h-5 w-5 text-blue-500" />;
        case "guide":
          return <Book className="h-5 w-5 text-green-500" />;
        case "hotline":
          return <Phone className="h-5 w-5 text-red-500" />;
        case "tool":
          return <Download className="h-5 w-5 text-purple-500" />;
        default:
          return <Info className="h-5 w-5 text-gray-500" />;
      }
    };
    
    const getTypeLabel = () => {
      switch (resource.type) {
        case "article": return "Article";
        case "guide": return "Guide";
        case "hotline": return "Hotline";
        case "tool": return "Tool";
        default: return "Resource";
      }
    };
    
    return (
      <motion.div
        initial={featured ? { opacity: 0, scale: 0.95 } : { opacity: 0, y: 20 }}
        animate={featured ? { opacity: 1, scale: 1 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        onMouseEnter={() => setHoveredResource(resource.id)}
        onMouseLeave={() => setHoveredResource(null)}
        whileHover={{ y: -5 }}
        className="h-full"
      >
        <Card className={`h-full transition-all duration-300 ${featured ? "bg-gradient-to-br from-[#9b87f5]/5 to-[#D946EF]/5 border-[#9b87f5]/30" : "hover:shadow-md"} ${isHovered ? "shadow-md" : ""}`}>
          <CardHeader className={`pb-2 ${featured ? "border-b border-[#9b87f5]/10" : ""}`}>
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                {getTypeIcon()}
                <span className="text-sm font-medium">{getTypeLabel()}</span>
                {resource.isFeatured && (
                  <Badge variant="secondary" className="bg-[#9b87f5]/10 text-[#9b87f5] hover:bg-[#9b87f5]/20">
                    Featured
                  </Badge>
                )}
              </div>
              <button 
                onClick={() => toggleBookmark(resource.id)}
                className={`text-gray-400 hover:text-[#9b87f5] transition-colors ${isBookmarked ? "text-[#9b87f5]" : ""}`}
              >
                <Bookmark className={`h-5 w-5 ${isBookmarked ? "fill-[#9b87f5] text-[#9b87f5]" : ""}`} />
              </button>
            </div>
            <CardTitle className="text-xl">{resource.title}</CardTitle>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              {resource.lastUpdated && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {resource.lastUpdated}
                </span>
              )}
              {resource.readTime && (
                <span className="flex items-center gap-1">
                  <Book className="h-3 w-3" />
                  {resource.readTime}
                </span>
              )}
              {resource.availability && (
                <span className="flex items-center gap-1 text-green-600">
                  <AlertCircle className="h-3 w-3" />
                  {resource.availability}
                </span>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">{resource.description}</p>
            <div className="flex flex-wrap gap-1 mb-2">
              {resource.tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="outline" 
                  className="hover:bg-gray-100 cursor-pointer transition-colors"
                  onClick={() => setSelectedCategory(tag)}
                >
                  {tag.replace(/-/g, ' ')}
                </Badge>
              ))}
            </div>
            {resource.phone && (
              <div className="flex items-center gap-2 text-lg font-semibold text-green-600 mt-4">
                <Phone className="h-5 w-5" />
                {resource.phone}
              </div>
            )}
            {resource.rating && (
              <div className="flex items-center gap-1 mt-2">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Heart 
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(resource.rating) ? "fill-[#9b87f5] text-[#9b87f5]" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-1">{resource.rating.toFixed(1)}</span>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => {
                  toast({
                    title: "Resource shared",
                    description: "A shareable link has been copied to your clipboard."
                  });
                }}
              >
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
            {resource.url && (
              <Button className="bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:from-[#8b77e5] hover:to-[#6E59A5]">
                {resource.type === "hotline" ? "Call Now" : "View Resource"}
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f9f9f9] to-[#f3f3f8]">
      {/* Animated background elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-gradient-to-br from-[#9b87f5]/5 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-gradient-to-tr from-[#D946EF]/5 to-transparent blur-3xl"></div>
      </div>
      
      {/* Header section */}
      <div className="bg-gradient-to-r from-[#1a1a1f] to-[#272730] text-white py-12 px-4 relative overflow-hidden">
        <motion.div 
          className="absolute top-[-20%] right-[-10%] w-[40%] h-[70%] rounded-full bg-gradient-to-br from-[#9b87f5]/20 to-transparent blur-3xl"
          animate={{ 
            rotate: [0, 180],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div 
          className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[70%] rounded-full bg-gradient-to-tr from-[#D946EF]/20 to-transparent blur-3xl"
          animate={{ 
            rotate: [0, -180],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", delay: 2 }}
        />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-center justify-between mb-6">
            <Link to="/home" className="flex items-center text-white/80 hover:text-white transition-colors">
              <ArrowRight className="mr-2 h-5 w-5 rotate-180" />
              <span>Back to Home</span>
            </Link>
            <HomeButton />
          </div>
          
          <div className="max-w-3xl">
            <motion.h1 
              className="text-3xl md:text-4xl font-bold mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Mental Wellness Resource Library
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Discover curated resources to support your mental health journey — from informative articles to 
              interactive tools and crisis support services.
            </motion.p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 relative z-10">
        {/* Emergency Resources Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-100 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-red-800 mb-4 flex items-center gap-2">
              <AlertCircle className="h-6 w-6" />
              Emergency Resources
            </h2>
            <p className="text-red-700 mb-4">
              If you or someone you know is in immediate danger or experiencing a mental health crisis, 
              please contact one of these emergency services:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {emergencyContacts.map((contact, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  whileHover={{ y: -5, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                  className="bg-white p-4 rounded-lg border border-red-100 shadow-sm"
                >
                  <h3 className="font-bold text-lg mb-1">{contact.name}</h3>
                  <div className="text-xl font-bold text-green-600 flex items-center gap-2 mb-2">
                    <Phone className="h-5 w-5" />
                    {contact.phone}
                  </div>
                  <p className="text-gray-700 text-sm mb-2">{contact.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-medium text-gray-500">
                      Available: {contact.hours}
                    </span>
                    {contact.url && (
                      <a 
                        href={contact.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                      >
                        Website
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Featured Resources Carousel */}
        {featuredResources.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-12"
          >
            <div className="bg-gradient-to-r from-[#f5f5ff] to-white rounded-xl shadow-sm border border-purple-100 overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-1 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-[#9b87f5]" />
                  Featured Resources
                </h2>
                <p className="text-gray-600 mb-6">Highlighted resources selected by our mental health experts</p>
                
                <AnimatePresence mode="wait">
                  <div key={featuredIndex} className="max-w-4xl mx-auto">
                    <ResourceCard resource={featuredResources[featuredIndex]} featured={true} />
                  </div>
                </AnimatePresence>
                
                {featuredResources.length > 1 && (
                  <div className="flex justify-center mt-6">
                    {featuredResources.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setFeaturedIndex(idx)}
                        className={`w-3 h-3 rounded-full mx-1 transition-all ${
                          idx === featuredIndex ? "bg-[#9b87f5]" : "bg-gray-300"
                        }`}
                      ></button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                className="pl-10 pr-4 py-2 border-gray-200 focus-visible:ring-[#9b87f5]"
                placeholder="Search resources, topics, or keywords..."
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
                <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                  <h3 className="font-medium mb-3">Filter by category:</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant={selectedCategory === null ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setSelectedCategory(null)}
                    >
                      All Categories
                    </Badge>
                    {categories.map(category => (
                      <Badge
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category.replace(/-/g, ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Main Resources Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="mb-6 w-full max-w-3xl grid grid-cols-5 bg-white/80">
              <TabsTrigger value="all" className="data-[state=active]:bg-[#9b87f5] data-[state=active]:text-white">All Resources</TabsTrigger>
              <TabsTrigger value="articles" className="data-[state=active]:bg-[#9b87f5] data-[state=active]:text-white">Articles</TabsTrigger>
              <TabsTrigger value="guides" className="data-[state=active]:bg-[#9b87f5] data-[state=active]:text-white">Guides</TabsTrigger>
              <TabsTrigger value="hotlines" className="data-[state=active]:bg-[#9b87f5] data-[state=active]:text-white">Hotlines</TabsTrigger>
              <TabsTrigger value="bookmarks" className="data-[state=active]:bg-[#9b87f5] data-[state=active]:text-white">My Bookmarks</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[#9b87f5]" />
                  All Resources
                  <Badge className="ml-2 bg-[#9b87f5]/10 text-[#9b87f5] hover:bg-[#9b87f5]/20">
                    {filteredResources.length}
                  </Badge>
                </h2>
                
                {selectedCategory && (
                  <div className="mb-6 flex items-center">
                    <p className="text-sm text-gray-600">
                      Filtered by: 
                      <Badge 
                        variant="secondary" 
                        className="ml-2 cursor-pointer"
                        onClick={() => setSelectedCategory(null)}
                      >
                        {selectedCategory.replace(/-/g, ' ')}
                        <button className="ml-1">×</button>
                      </Badge>
                    </p>
                  </div>
                )}
                
                {filteredResources.length === 0 ? (
                  <motion.div 
                    className="text-center py-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No resources found</h3>
                    <p className="text-gray-500">Try adjusting your search criteria</p>
                    {selectedCategory && (
                      <Button 
                        variant="outline"
                        className="mt-4"
                        onClick={() => setSelectedCategory(null)}
                      >
                        Clear filter
                      </Button>
                    )}
                  </motion.div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredResources.map((resource, index) => (
                      <motion.div
                        key={resource.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.05 * index }}
                      >
                        <ResourceCard resource={resource} />
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </TabsContent>
            
            {/* The remaining tab content sections follow the same pattern */}
            <TabsContent value="articles">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-500" />
                  Articles
                </h2>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default ResourceLibrary;
