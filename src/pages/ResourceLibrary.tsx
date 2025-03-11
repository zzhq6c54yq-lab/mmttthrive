
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Phone, ExternalLink, Download, Bookmark, Search, Clock, ArrowRight, Share2, Info, Book, AlertCircle, Heart, Home } from "lucide-react";
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
}

interface EmergencyContact {
  name: string;
  phone: string;
  description: string;
  hours: string;
  url?: string;
}

const ResourceLibrary = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [resources, setResources] = useState<Resource[]>([]);
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Simulating data fetch
    const fetchData = () => {
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
          lastUpdated: "2 months ago"
        },
        {
          id: "resource-2",
          title: "Depression: Signs, Symptoms, and Support Strategies",
          description: "An in-depth look at depression, its impact on daily life, and ways to find appropriate help and support.",
          type: "article",
          tags: ["depression", "mental-health", "support"],
          url: "#",
          isBookmarked: false,
          lastUpdated: "3 months ago"
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
          lastUpdated: "1 month ago"
        },
        {
          id: "resource-6",
          title: "Sleep Hygiene: Improving Your Sleep Quality",
          description: "Practical strategies and habits to develop for better sleep, including environment adjustments and bedtime routines.",
          type: "guide",
          tags: ["sleep", "wellness", "habits"],
          url: "#",
          isBookmarked: false,
          lastUpdated: "4 months ago"
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
          lastUpdated: "2 weeks ago"
        },
        {
          id: "resource-9",
          title: "Understanding Trauma and Its Effects",
          description: "Information on how trauma affects the mind and body, and approaches to trauma-informed care and healing.",
          type: "article",
          tags: ["trauma", "ptsd", "healing"],
          url: "#",
          isBookmarked: false,
          lastUpdated: "5 months ago"
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

    fetchData();
  }, []);

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

  const ResourceCard = ({ resource }: { resource: Resource }) => {
    const isBookmarked = bookmarks.includes(resource.id);
    
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
      <Card className="hover:shadow-md transition-all duration-300">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              {getTypeIcon()}
              <span className="text-sm font-medium">{getTypeLabel()}</span>
              {resource.isFeatured && (
                <span className="px-2 py-0.5 bg-[#B87333]/10 text-[#B87333] text-xs rounded-full">
                  Featured
                </span>
              )}
            </div>
            <button 
              onClick={() => toggleBookmark(resource.id)}
              className="text-gray-400 hover:text-[#B87333]"
            >
              <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-[#B87333] text-[#B87333]' : ''}`} />
            </button>
          </div>
          <CardTitle className="text-xl">{resource.title}</CardTitle>
          {resource.lastUpdated && (
            <CardDescription className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Updated {resource.lastUpdated}
            </CardDescription>
          )}
          {resource.availability && (
            <CardDescription className="flex items-center gap-1 text-green-600">
              <AlertCircle className="h-3 w-3" />
              Available {resource.availability}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">{resource.description}</p>
          <div className="flex flex-wrap gap-1 mb-2">
            {resource.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                {tag.replace(/-/g, ' ')}
              </span>
            ))}
          </div>
          {resource.phone && (
            <div className="flex items-center gap-2 text-lg font-semibold text-green-600 mt-4">
              <Phone className="h-5 w-5" />
              {resource.phone}
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
            <Button className="bg-[#B87333] hover:bg-[#B87333]/90">
              {resource.type === "hotline" ? "Call Now" : "View Resource"}
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      <div className="bg-gradient-to-r from-[#1a1a1f] to-[#272730] text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-6">
            <HomeButton />
            <h1 className="text-3xl md:text-4xl font-bold ml-4">Resource Library</h1>
          </div>
          <p className="text-lg text-gray-300 max-w-2xl">
            Access a wealth of mental health resources including articles, guides, hotlines, 
            and tools to support your wellness journey.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-red-800 mb-4 flex items-center gap-2">
            <AlertCircle className="h-6 w-6" />
            Emergency Resources
          </h2>
          <p className="text-red-700 mb-4">
            If you or someone you know is in immediate danger or experiencing a mental health crisis, 
            please contact one of these emergency services:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border border-red-100 shadow-sm">
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
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              className="pl-10 pr-4 py-2"
              placeholder="Search resources, topics, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-6 w-full max-w-3xl grid grid-cols-5">
            <TabsTrigger value="all" className="flex-1">All Resources</TabsTrigger>
            <TabsTrigger value="articles" className="flex-1">Articles</TabsTrigger>
            <TabsTrigger value="guides" className="flex-1">Guides</TabsTrigger>
            <TabsTrigger value="hotlines" className="flex-1">Hotlines</TabsTrigger>
            <TabsTrigger value="bookmarks" className="flex-1">My Bookmarks</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <h2 className="text-2xl font-bold mb-6">All Resources</h2>
            {filteredResources.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No resources found</h3>
                <p className="text-gray-500">Try adjusting your search criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredResources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="articles">
            <h2 className="text-2xl font-bold mb-6">Articles</h2>
            {filteredResources.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                <p className="text-gray-500">Try adjusting your search criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredResources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="guides">
            <h2 className="text-2xl font-bold mb-6">Guides</h2>
            {filteredResources.length === 0 ? (
              <div className="text-center py-12">
                <Book className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No guides found</h3>
                <p className="text-gray-500">Try adjusting your search criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredResources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="hotlines">
            <h2 className="text-2xl font-bold mb-6">Hotlines & Crisis Support</h2>
            {filteredResources.length === 0 ? (
              <div className="text-center py-12">
                <Phone className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No hotlines found</h3>
                <p className="text-gray-500">Try adjusting your search criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredResources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="bookmarks">
            <h2 className="text-2xl font-bold mb-6">My Bookmarked Resources</h2>
            {filteredResources.length === 0 ? (
              <div className="text-center py-12">
                <Bookmark className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No bookmarked resources</h3>
                <p className="text-gray-500 mb-4">Save resources for quick access by clicking the bookmark icon</p>
                <Button 
                  onClick={() => setActiveTab("all")}
                  className="bg-[#B87333] hover:bg-[#B87333]/90"
                >
                  Browse All Resources
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredResources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ResourceLibrary;
