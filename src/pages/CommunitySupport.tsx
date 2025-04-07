
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  MessagesSquare, Heart, Reply, Flag, UserRound, Clock, 
  Users, ArrowRight, Send, Search, Link2, Calendar, 
  Sparkles, ArrowUpRight, ThumbsUp, CloudRain, Leaf,
  Lightbulb, BadgeHelp, HeartHandshake, Shield, Feather
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import HomeButton from "@/components/HomeButton";
import ChatRoomDialog from "@/components/community/ChatRoomDialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

interface ForumPost {
  id: string;
  title: string;
  author: string;
  date: string;
  content: string;
  replies: number;
  likes: number;
  category: string;
  tags: string[];
  isLiked: boolean;
}

interface ChatGroup {
  id: string;
  name: string;
  description: string;
  members: number;
  category: string;
  nextMeeting?: string;
  tags: string[];
  isJoined: boolean;
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    }
  }
};

const CommunitySupport = () => {
  const [activeTab, setActiveTab] = useState("forums");
  const [searchQuery, setSearchQuery] = useState("");
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([]);
  const [chatGroups, setChatGroups] = useState<ChatGroup[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostTitle, setNewPostTitle] = useState("");
  const [showNewPost, setShowNewPost] = useState(false);
  const [chatRoomOpen, setChatRoomOpen] = useState(false);
  const [activeChatGroup, setActiveChatGroup] = useState<ChatGroup | null>(null);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const categories = [
    { value: "all", label: "All Categories", icon: <Sparkles className="h-4 w-4" /> },
    { value: "anxiety", label: "Anxiety", icon: <CloudRain className="h-4 w-4" /> },
    { value: "depression", label: "Depression", icon: <HeartHandshake className="h-4 w-4" /> },
    { value: "stress", label: "Stress Management", icon: <Leaf className="h-4 w-4" /> },
    { value: "addiction", label: "Addiction Recovery", icon: <Shield className="h-4 w-4" /> },
    { value: "wellness", label: "General Wellness", icon: <Lightbulb className="h-4 w-4" /> }
  ];

  useEffect(() => {
    // Simulate fetching data
    fetchData();
    
    // Auto-dismiss welcome message after 8 seconds
    const timer = setTimeout(() => {
      setShowWelcomeMessage(false);
    }, 8000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const fetchData = () => {
    // Sample forum posts data
    const posts: ForumPost[] = [
      {
        id: "post-1",
        title: "How do you cope with social anxiety?",
        author: "AnxietyWarrior",
        date: "2 hours ago",
        content: "I've been struggling with social anxiety for years, especially in work settings. What strategies have helped you overcome similar challenges?",
        replies: 24,
        likes: 15,
        category: "anxiety",
        tags: ["social-anxiety", "work-stress", "coping-mechanisms"],
        isLiked: false
      },
      {
        id: "post-2",
        title: "Maintaining sobriety during stressful times",
        author: "RecoveryJourney",
        date: "5 hours ago",
        content: "I've been sober for 8 months, but recent family issues are triggering cravings. Could use some support and advice from others who've maintained recovery during difficult periods.",
        replies: 18,
        likes: 32,
        category: "addiction",
        tags: ["sobriety", "triggers", "family-stress"],
        isLiked: true
      },
      {
        id: "post-3",
        title: "Mindfulness techniques that actually work",
        author: "PresentMoment",
        date: "1 day ago",
        content: "I've tried several mindfulness practices but struggle to stick with them. Looking for simple techniques that have made a real difference in your daily life.",
        replies: 36,
        likes: 47,
        category: "stress",
        tags: ["mindfulness", "meditation", "daily-practice"],
        isLiked: false
      },
      {
        id: "post-4",
        title: "Depression and motivation strategies",
        author: "SmallSteps",
        date: "2 days ago",
        content: "When depression hits, even basic tasks feel impossible. What small routines or rewards help you maintain momentum on difficult days?",
        replies: 29,
        likes: 38,
        category: "depression",
        tags: ["motivation", "daily-routines", "self-care"],
        isLiked: false
      },
      {
        id: "post-5",
        title: "Healthy habits that improved your mental health",
        author: "BalancedLife",
        date: "3 days ago",
        content: "I'm looking to build more structure in my life to support my mental health. What habits have made the biggest positive impact for you?",
        replies: 42,
        likes: 56,
        category: "wellness",
        tags: ["habits", "lifestyle", "well-being"],
        isLiked: true
      }
    ];

    // Sample chat groups data
    const groups: ChatGroup[] = [
      {
        id: "group-1",
        name: "Anxiety Support Circle",
        description: "A safe space to discuss anxiety challenges and share coping strategies with others who understand.",
        members: 256,
        category: "anxiety",
        nextMeeting: "Today, 7:00 PM",
        tags: ["panic-attacks", "social-anxiety", "work-stress"],
        isJoined: false
      },
      {
        id: "group-2",
        name: "Recovery Together",
        description: "Supporting each other through addiction recovery with compassion and understanding.",
        members: 189,
        category: "addiction",
        nextMeeting: "Tomorrow, 6:30 PM",
        tags: ["substance-use", "sobriety", "recovery-journey"],
        isJoined: true
      },
      {
        id: "group-3",
        name: "Mindfulness Practitioners",
        description: "Daily check-ins and guided practices for developing mindfulness in everyday life.",
        members: 312,
        category: "stress",
        nextMeeting: "Wednesday, 8:00 PM",
        tags: ["meditation", "present-moment", "stress-reduction"],
        isJoined: false
      },
      {
        id: "group-4",
        name: "Depression Support Network",
        description: "A community for sharing experiences and finding hope during depressive episodes.",
        members: 278,
        category: "depression",
        nextMeeting: "Friday, 7:00 PM",
        tags: ["mood-disorders", "self-care", "coping-strategies"],
        isJoined: false
      },
      {
        id: "group-5",
        name: "Holistic Wellness Community",
        description: "Exploring the connection between physical, mental, and spiritual well-being.",
        members: 205,
        category: "wellness",
        nextMeeting: "Saturday, 10:00 AM",
        tags: ["nutrition", "exercise", "mind-body-connection"],
        isJoined: true
      }
    ];

    setForumPosts(posts);
    setChatGroups(groups);
  };

  // Filter functions
  const filteredForumPosts = forumPosts.filter(post => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const filteredChatGroups = chatGroups.filter(group => {
    const matchesCategory = selectedCategory === "all" || group.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  // Interaction handlers
  const toggleLike = (postId: string) => {
    setForumPosts(posts => 
      posts.map(post => {
        if (post.id === postId) {
          const newIsLiked = !post.isLiked;
          return {
            ...post,
            isLiked: newIsLiked,
            likes: newIsLiked ? post.likes + 1 : post.likes - 1
          };
        }
        return post;
      })
    );
    
    toast({
      title: "Post supported",
      description: "Your support has been added to this post",
      duration: 2000,
    });
  };

  const toggleJoinGroup = (groupId: string) => {
    setChatGroups(groups => 
      groups.map(group => {
        if (group.id === groupId) {
          const newIsJoined = !group.isJoined;
          return {
            ...group,
            isJoined: newIsJoined,
            members: newIsJoined ? group.members + 1 : group.members - 1
          };
        }
        return group;
      })
    );

    const group = chatGroups.find(g => g.id === groupId);
    if (group) {
      toast({
        title: group.isJoined ? "Left group" : "Joined group",
        description: group.isJoined 
          ? `You have left ${group.name}` 
          : `You have joined ${group.name}. Welcome to the community!`,
      });
    }
  };

  const handleSubmitPost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      toast({
        title: "Cannot create post",
        description: "Please provide both a title and content for your post.",
        variant: "destructive"
      });
      return;
    }

    const newPost: ForumPost = {
      id: `post-${Date.now()}`,
      title: newPostTitle,
      author: "You",
      date: "Just now",
      content: newPostContent,
      replies: 0,
      likes: 0,
      category: selectedCategory === "all" ? "wellness" : selectedCategory,
      tags: [],
      isLiked: false
    };

    setForumPosts([newPost, ...forumPosts]);
    setNewPostTitle("");
    setNewPostContent("");
    setShowNewPost(false);

    toast({
      title: "Post created",
      description: "Your post has been published to the community. Thank you for sharing.",
    });
  };

  const openChatRoom = (group: ChatGroup) => {
    if (!group.isJoined) {
      // Auto-join the group if not already joined
      toggleJoinGroup(group.id);
    }
    
    setActiveChatGroup(group);
    setChatRoomOpen(true);
    
    toast({
      title: "Entering Chat Room",
      description: `You've entered the ${group.name} chat room.`,
      duration: 2000,
    });
  };

  const getCategoryIcon = (categoryName: string) => {
    const category = categories.find(cat => cat.value === categoryName);
    return category ? category.icon : <BadgeHelp className="h-4 w-4" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] text-white py-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png')] opacity-5 bg-center"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="flex items-center mb-6"
          >
            <HomeButton />
            <h1 className="text-4xl md:text-5xl font-bold ml-4">Community Support</h1>
          </motion.div>
          <motion.p 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-xl text-purple-100 max-w-2xl"
          >
            Connect with others on similar healing journeys. Share experiences,
            ask questions, and find support in a safe, understanding community.
          </motion.p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Welcome card that appears on first visit */}
        {showWelcomeMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-8"
          >
            <Card className="overflow-hidden border-purple-200 bg-gradient-to-r from-purple-50 to-white">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                    <Feather className="h-8 w-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-purple-800 mb-2">Welcome to Your Community</h2>
                    <p className="text-lg text-gray-700 mb-3">
                      This is a safe space for your mental health journey. Connect with others, share your experiences,
                      and find support from people who understand what you're going through.
                    </p>
                    <p className="text-gray-600">
                      Remember: You're not alone in this journey. Every post and interaction here 
                      is a step toward healing and growth.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Search and filter */}
        <motion.div 
          initial="hidden"
          animate="visible" 
          variants={fadeIn}
          className="flex flex-col md:flex-row gap-4 items-start mb-8"
        >
          <div className="w-full md:w-2/3">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-purple-400" />
              <Input
                className="pl-10 pr-4 py-2 border-purple-200 focus:border-purple-400 focus:ring focus:ring-purple-200"
                placeholder="Search topics, keywords, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full md:w-1/3">
            <select
              className="w-full px-4 py-2 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Tabs for forums and chat groups */}
        <Tabs defaultValue="forums" className="w-full" onValueChange={setActiveTab}>
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <TabsList className="mb-6 w-full max-w-md bg-purple-100">
              <TabsTrigger value="forums" className="flex-1 flex items-center gap-2 data-[state=active]:bg-[#9b87f5] data-[state=active]:text-white">
                <MessagesSquare className="h-4 w-4" />
                Forums
              </TabsTrigger>
              <TabsTrigger value="chat-groups" className="flex-1 flex items-center gap-2 data-[state=active]:bg-[#9b87f5] data-[state=active]:text-white">
                <Users className="h-4 w-4" />
                Chat Groups
              </TabsTrigger>
            </TabsList>
          </motion.div>
          
          {/* Forums Tab Content */}
          <TabsContent value="forums" className="focus:outline-none">
            <motion.div 
              initial="hidden"
              animate="visible" 
              variants={fadeIn}
              className="flex justify-between items-center mb-6"
            >
              <h2 className="text-2xl font-bold text-gray-800">Discussion Forums</h2>
              <Button 
                className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
                onClick={() => setShowNewPost(!showNewPost)}
              >
                {showNewPost ? "Cancel" : "Create New Post"}
              </Button>
            </motion.div>

            {/* Create new post form */}
            {showNewPost && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8"
              >
                <Card className="border-purple-200 shadow-md">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-white pb-2">
                    <CardTitle>Create a New Post</CardTitle>
                    <CardDescription>Share your thoughts, questions, or experiences with the community</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-6">
                    <div>
                      <Input
                        placeholder="Post title"
                        value={newPostTitle}
                        onChange={(e) => setNewPostTitle(e.target.value)}
                        className="mb-4 border-purple-200 focus:border-purple-500"
                      />
                      <Textarea
                        placeholder="Write your post here..."
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        rows={5}
                        className="border-purple-200 focus:border-purple-500"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2 bg-gradient-to-r from-white to-purple-50">
                    <Button variant="outline" onClick={() => setShowNewPost(false)}>
                      Cancel
                    </Button>
                    <Button 
                      className="bg-[#9b87f5] hover:bg-[#7E69AB]"
                      onClick={handleSubmitPost}
                    >
                      Post
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}

            {/* No posts found state */}
            {filteredForumPosts.length === 0 && (
              <motion.div 
                initial="hidden"
                animate="visible" 
                variants={fadeIn}
                className="text-center py-12"
              >
                <MessagesSquare className="h-16 w-16 mx-auto text-purple-300 mb-4" />
                <h3 className="text-2xl font-semibold mb-2 text-gray-700">No posts found</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  Try adjusting your search criteria or be the first to create a post on this topic
                </p>
                <Button 
                  className="bg-[#9b87f5] hover:bg-[#7E69AB]"
                  onClick={() => setShowNewPost(true)}
                >
                  Create New Post
                </Button>
              </motion.div>
            )}

            {/* Posts list */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-6"
            >
              {filteredForumPosts.map((post) => (
                <motion.div key={post.id} variants={fadeIn}>
                  <Card className="hover:shadow-lg transition-all duration-300 border-purple-100 overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-purple-50/50 to-white pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-xl text-gray-800">{post.title}</CardTitle>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.date}
                        </span>
                      </div>
                      <CardDescription className="flex items-center gap-2">
                        <span className="flex items-center gap-1">
                          <UserRound className="h-3 w-3" />
                          Posted by {post.author}
                        </span>
                        <div className="flex items-center">
                          {getCategoryIcon(post.category)}
                          <span className="text-xs ml-1 capitalize">{post.category}</span>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-gray-700 mb-4">{post.content}</p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.map((tag) => (
                          <span 
                            key={tag} 
                            className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full hover:bg-purple-200 cursor-pointer transition-colors"
                          >
                            #{tag.replace(/-/g, ' ')}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between bg-gradient-to-r from-white to-purple-50/50 pt-2">
                      <div className="flex gap-4">
                        <button 
                          className="flex items-center gap-1 text-gray-500 hover:text-purple-600"
                          onClick={() => toggleLike(post.id)}
                        >
                          <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-purple-500 text-purple-500' : ''}`} />
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-1 text-gray-500 hover:text-purple-600">
                          <Reply className="h-4 w-4" />
                          <span>{post.replies}</span>
                        </button>
                        <button className="flex items-center gap-1 text-gray-500 hover:text-red-500">
                          <Flag className="h-4 w-4" />
                          <span>Report</span>
                        </button>
                      </div>
                      <Button 
                        className="bg-purple-100 hover:bg-purple-200 text-purple-700"
                      >
                        View Discussion
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
          
          {/* Chat Groups Tab Content */}
          <TabsContent value="chat-groups" className="focus:outline-none">
            <motion.div 
              initial="hidden"
              animate="visible" 
              variants={fadeIn}
              className="flex justify-between items-center mb-6"
            >
              <h2 className="text-2xl font-bold text-gray-800">Chat Groups</h2>
              <Button 
                className="bg-purple-100 hover:bg-purple-200 text-purple-700"
              >
                <Link2 className="mr-2 h-4 w-4" />
                Find More Groups
              </Button>
            </motion.div>

            {/* No chat groups found state */}
            {filteredChatGroups.length === 0 && (
              <motion.div 
                initial="hidden"
                animate="visible" 
                variants={fadeIn}
                className="text-center py-12"
              >
                <Users className="h-16 w-16 mx-auto text-purple-300 mb-4" />
                <h3 className="text-2xl font-semibold mb-2 text-gray-700">No chat groups found</h3>
                <p className="text-gray-500 mb-4 max-w-md mx-auto">
                  Try adjusting your search criteria or check back later for new groups
                </p>
              </motion.div>
            )}

            {/* Chat groups grid */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {filteredChatGroups.map((group) => (
                <motion.div key={group.id} variants={fadeIn}>
                  <Card className="hover:shadow-lg transition-all duration-300 border-purple-100 overflow-hidden h-full flex flex-col">
                    <CardHeader className="bg-gradient-to-r from-purple-50/50 to-white pb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-full bg-purple-100 text-purple-700">
                          {getCategoryIcon(group.category)}
                        </div>
                        <div>
                          <CardTitle className="text-xl text-gray-800">{group.name}</CardTitle>
                          <CardDescription className="flex items-center gap-2">
                            <Users className="h-3 w-3" />
                            {group.members} members
                            {group.nextMeeting && (
                              <>
                                <span className="mx-1">•</span>
                                <Calendar className="h-3 w-3" />
                                <span>Next: {group.nextMeeting}</span>
                              </>
                            )}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4 flex-grow">
                      <p className="text-gray-700 mb-4">{group.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {group.tags.map((tag) => (
                          <span 
                            key={tag} 
                            className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full"
                          >
                            #{tag.replace(/-/g, ' ')}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between bg-gradient-to-r from-white to-purple-50/50 pt-2">
                      <Button 
                        className={group.isJoined 
                          ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          : "bg-[#9b87f5] hover:bg-[#7E69AB] text-white"}
                        onClick={() => toggleJoinGroup(group.id)}
                      >
                        {group.isJoined ? "Leave Group" : "Join Group"}
                      </Button>
                      <Button 
                        className="bg-purple-100 hover:bg-purple-200 text-purple-700"
                        disabled={!group.isJoined}
                        onClick={() => openChatRoom(group)}
                      >
                        {group.isJoined ? (
                          <>
                            Enter Chat
                            <Send className="ml-2 h-4 w-4" />
                          </>
                        ) : "Join to Chat"}
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
        
        {/* Inspirational quote footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-16 text-center"
        >
          <div className="max-w-3xl mx-auto px-8 py-6 bg-gradient-to-r from-[#9b87f5]/10 to-[#7E69AB]/5 rounded-lg">
            <p className="italic text-gray-700 mb-2">
              "Healing doesn't mean the damage never existed. It means the damage no longer controls your life."
            </p>
            <p className="text-sm text-gray-500">— Community member</p>
          </div>
        </motion.div>
      </div>
      
      {/* Chat Room Dialog */}
      {activeChatGroup && (
        <ChatRoomDialog
          isOpen={chatRoomOpen}
          onOpenChange={setChatRoomOpen}
          groupName={activeChatGroup.name}
          groupId={activeChatGroup.id}
        />
      )}
    </div>
  );
};

export default CommunitySupport;
