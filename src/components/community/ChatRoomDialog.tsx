
import React, { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Send, X, Users, MessagesSquare, Info, ThumbsUp, Heart, 
  Video, PhoneCall, Paperclip, Smile, Image, Gift, Calendar, 
  Clock, Shield, Sparkles, User, FileText, HelpCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  timestamp: string;
  reactions?: {
    type: string;
    count: number;
    userReacted: boolean;
  }[];
}

interface ChatRoomDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  groupName: string;
  groupId: string;
}

const ChatRoomDialog: React.FC<ChatRoomDialogProps> = ({
  isOpen,
  onOpenChange,
  groupName,
  groupId
}) => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [activeUsers, setActiveUsers] = useState<{id: string, name: string, avatar?: string}[]>([]);
  const [showInfo, setShowInfo] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("chat");
  const { toast } = useToast();
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isOpen) {
      const mockMessages: ChatMessage[] = [
        {
          id: "msg1",
          userId: "user1",
          userName: "AlexTherapist",
          userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
          content: "Welcome everyone to our Anxiety Support Circle! I'm Alex, a licensed therapist specializing in anxiety disorders. This is a safe space for all of us to share experiences and support each other.",
          timestamp: "10:00 AM",
          reactions: [
            { type: "❤️", count: 5, userReacted: false },
            { type: "👍", count: 3, userReacted: false }
          ]
        },
        {
          id: "msg2",
          userId: "user2",
          userName: "Sarah",
          userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
          content: "Thanks for having this group. I've been struggling with social anxiety for years, and it's been getting worse since starting my new job. Looking forward to connecting with others who understand.",
          timestamp: "10:05 AM",
          reactions: [
            { type: "❤️", count: 4, userReacted: false },
            { type: "🤗", count: 2, userReacted: false }
          ]
        },
        {
          id: "msg3",
          userId: "user3",
          userName: "Michael",
          userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
          content: "Hi everyone. I've been dealing with panic attacks for about 2 years now. Recently started meditation which helps sometimes, but still struggling during work meetings. Anyone else experience this?",
          timestamp: "10:08 AM"
        },
        {
          id: "msg4",
          userId: "user1",
          userName: "AlexTherapist",
          userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
          content: "Michael, many people experience anxiety in professional settings. Would you mind sharing what types of meditation you've been trying? Certain techniques can be especially helpful for anticipatory anxiety.",
          timestamp: "10:12 AM"
        },
        {
          id: "msg5",
          userId: "user4",
          userName: "Jamie",
          userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie",
          content: "Just joined. I've found breathing exercises really helpful before stressful situations. The 4-7-8 method has been a game changer for me (inhale for 4, hold for 7, exhale for 8).",
          timestamp: "10:15 AM",
          reactions: [
            { type: "👍", count: 6, userReacted: false }
          ]
        }
      ];
      
      const mockActiveUsers = [
        { id: "user1", name: "AlexTherapist", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" },
        { id: "user2", name: "Sarah", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
        { id: "user3", name: "Michael", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael" },
        { id: "user4", name: "Jamie", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie" },
        { id: "user5", name: "Taylor", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor" },
        { id: "user6", name: "Jordan", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan" }
      ];
      
      setChatMessages(mockMessages);
      setActiveUsers(mockActiveUsers);

      const typingTimer = setTimeout(() => {
        setIsTyping(true);
        
        const messageTimer = setTimeout(() => {
          setIsTyping(false);
          
          const newIncomingMessage: ChatMessage = {
            id: `msg${mockMessages.length + 1}`,
            userId: "user5",
            userName: "Taylor",
            userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor",
            content: "Hello everyone! First time here. I've been dealing with anxiety during public speaking. Has anyone found effective techniques for managing that specific situation?",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
          
          setChatMessages(prev => [...prev, newIncomingMessage]);
        }, 2000);
        
        return () => clearTimeout(messageTimer);
      }, 3000);
      
      return () => clearTimeout(typingTimer);
    }
  }, [isOpen, groupId]);
  
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, isTyping]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    const newChatMessage: ChatMessage = {
      id: `msg${chatMessages.length + 1}`,
      userId: "currentUser",
      userName: "You",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setChatMessages([...chatMessages, newChatMessage]);
    setNewMessage("");

    setTimeout(() => {
      setIsTyping(true);
      
      setTimeout(() => {
        setIsTyping(false);
        
        let responseContent = "Thanks for sharing that with the group. How has everyone else been dealing with similar situations?";
        
        if (newMessage.toLowerCase().includes("anxiety") || newMessage.toLowerCase().includes("anxious")) {
          responseContent = "Anxiety can be really challenging. Have you tried any grounding techniques when you feel anxious?";
        } else if (newMessage.toLowerCase().includes("meditation") || newMessage.toLowerCase().includes("breathing")) {
          responseContent = "Meditation has been shown to be very effective for many people. The key is consistency - even 5 minutes daily can make a difference.";
        }
        
        const responseMessage: ChatMessage = {
          id: `msg${chatMessages.length + 2}`,
          userId: "user1",
          userName: "AlexTherapist",
          userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
          content: responseContent,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        
        setChatMessages(prev => [...prev, responseMessage]);
      }, 3000);
    }, 1500);
  };
  
  const handleReaction = (messageId: string, reactionType: string) => {
    setChatMessages(messages => 
      messages.map(message => {
        if (message.id === messageId) {
          if (message.reactions) {
            const existingReactionIndex = message.reactions.findIndex(r => r.type === reactionType);
            
            if (existingReactionIndex !== -1) {
              const reaction = message.reactions[existingReactionIndex];
              const newReaction = {
                ...reaction,
                userReacted: !reaction.userReacted,
                count: reaction.userReacted ? reaction.count - 1 : reaction.count + 1
              };
              
              const newReactions = [...message.reactions];
              newReactions[existingReactionIndex] = newReaction;
              
              return { ...message, reactions: newReactions };
            } else {
              return {
                ...message,
                reactions: [...message.reactions, { type: reactionType, count: 1, userReacted: true }]
              };
            }
          } else {
            return {
              ...message,
              reactions: [{ type: reactionType, count: 1, userReacted: true }]
            };
          }
        }
        return message;
      })
    );

    toast({
      title: "Reaction added",
      description: `You reacted with ${reactionType}`,
      duration: 1500,
    });
  };

  const handleCallAction = () => {
    toast({
      title: "Video call initiated",
      description: "Starting a video call with the group...",
      duration: 3000,
    });
  };

  const handleAttachmentAction = () => {
    toast({
      title: "Attachment feature",
      description: "File attachment feature coming soon!",
      duration: 3000,
    });
  };

  const resources = [
    {
      title: "Understanding Anxiety",
      type: "Article",
      author: "Dr. Maria Chen",
      icon: <FileText className="h-5 w-5 text-purple-500" />
    },
    {
      title: "5-Minute Calming Exercise",
      type: "Audio",
      author: "Mindfulness Center",
      icon: <FileText className="h-5 w-5 text-purple-500" />
    },
    {
      title: "Cognitive Behavioral Techniques",
      type: "PDF Guide",
      author: "American Psychological Association",
      icon: <FileText className="h-5 w-5 text-purple-500" />
    },
    {
      title: "Workplace Anxiety Management",
      type: "Video",
      author: "Career Wellness Institute",
      icon: <FileText className="h-5 w-5 text-purple-500" />
    }
  ];
  
  const upcomingEvents = [
    {
      title: "Guided Meditation Session",
      datetime: "Tomorrow, 6:00 PM",
      host: "AlexTherapist"
    },
    {
      title: "Managing Social Anxiety Workshop",
      datetime: "Saturday, 11:00 AM",
      host: "Dr. Rachel Kim"
    },
    {
      title: "Weekly Check-in & Support Circle",
      datetime: "Monday, 7:30 PM",
      host: "Group Facilitators"
    }
  ];
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[85vh] p-0 flex flex-col overflow-hidden bg-gradient-to-b from-white to-purple-50/30">
        <DialogHeader className="px-6 py-4 border-b flex-shrink-0 bg-gradient-to-r from-[#9b87f5]/10 to-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-full">
                <Users className="h-5 w-5 text-purple-700" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold text-gray-800">{groupName}</DialogTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="bg-purple-100 border-none text-purple-700">
                    <Users className="h-3 w-3 mr-1" />
                    {activeUsers.length} online
                  </Badge>
                  <Badge variant="outline" className="bg-green-100 border-none text-green-700">
                    <Shield className="h-3 w-3 mr-1" />
                    Safe Space
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-9 w-9 rounded-full hover:bg-purple-100 text-purple-700"
                onClick={handleCallAction}
              >
                <Video className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn(
                  "h-9 w-9 rounded-full hover:bg-purple-100 text-purple-700",
                  showInfo && "bg-purple-100"
                )}
                onClick={() => setShowInfo(!showInfo)}
              >
                <Info className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-9 w-9 rounded-full hover:bg-purple-100 text-gray-700"
                onClick={() => onOpenChange(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex flex-grow overflow-hidden">
          {/* Main chat area */}
          <div className="flex-grow flex flex-col overflow-hidden">
            <Tabs defaultValue="chat" className="flex flex-col h-full" onValueChange={setActiveTab}>
              <div className="px-4 border-b border-gray-200">
                <TabsList className="bg-transparent h-10 p-0">
                  <TabsTrigger 
                    value="chat"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-purple-600 data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-purple-700"
                  >
                    <MessagesSquare className="h-4 w-4 mr-2" />
                    Chat
                  </TabsTrigger>
                  <TabsTrigger 
                    value="resources" 
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-purple-600 data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-purple-700"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Resources
                  </TabsTrigger>
                  <TabsTrigger 
                    value="events" 
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-purple-600 data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-purple-700"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Events
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="chat" className="flex-grow flex flex-col p-0 m-0 data-[state=active]:flex-grow overflow-hidden">
                <ScrollArea className="flex-grow p-4">
                  <div className="space-y-4 pb-2">
                    {/* Day divider */}
                    <div className="flex items-center justify-center my-4">
                      <div className="bg-purple-100 text-purple-800 text-xs rounded-full px-3 py-1 font-medium">
                        Today
                      </div>
                    </div>
                    
                    {/* Chat messages */}
                    {chatMessages.map((message) => (
                      <motion.div 
                        key={message.id} 
                        className={`flex ${message.userId === "currentUser" ? "justify-end" : "justify-start"}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className={`flex ${message.userId === "currentUser" ? "flex-row-reverse" : "flex-row"} gap-3 max-w-[85%]`}>
                          {message.userId !== "currentUser" && (
                            <Avatar className="h-10 w-10">
                              {message.userAvatar ? (
                                <AvatarImage src={message.userAvatar} />
                              ) : (
                                <AvatarFallback className="bg-purple-200 text-purple-700">
                                  {message.userName[0]}
                                </AvatarFallback>
                              )}
                            </Avatar>
                          )}
                          
                          <div>
                            <div className={`flex items-center gap-2 mb-1 ${message.userId === "currentUser" ? "justify-end" : "justify-start"}`}>
                              {message.userId !== "currentUser" && (
                                <span className="font-medium text-sm text-gray-800">
                                  {message.userName}
                                  {message.userId === "user1" && (
                                    <Badge className="ml-1 bg-purple-100 text-purple-800 border-none text-[10px] py-0">
                                      Therapist
                                    </Badge>
                                  )}
                                </span>
                              )}
                              <span className="text-xs text-gray-500">
                                {message.timestamp}
                              </span>
                            </div>
                            
                            <div 
                              className={`rounded-2xl py-3 px-4 ${
                                message.userId === "currentUser"
                                  ? "bg-purple-600 text-white"
                                  : message.userId === "user1" 
                                  ? "bg-purple-100 text-gray-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              <p className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">
                                {message.content}
                              </p>
                            </div>
                            
                            {/* Reactions */}
                            {message.reactions && message.reactions.length > 0 && (
                              <div className={`flex mt-1 gap-1 ${message.userId === "currentUser" ? "justify-end" : "justify-start"}`}>
                                {message.reactions.map((reaction, index) => (
                                  <button
                                    key={index}
                                    className={`rounded-full px-2 py-0.5 text-xs flex items-center gap-1 ${
                                      reaction.userReacted 
                                        ? "bg-purple-100 text-purple-800" 
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                    onClick={() => handleReaction(message.id, reaction.type)}
                                  >
                                    <span>{reaction.type}</span>
                                    <span>{reaction.count}</span>
                                  </button>
                                ))}
                              </div>
                            )}
                            
                            {/* Reaction buttons */}
                            <div className={`mt-1 flex gap-2 ${message.userId === "currentUser" ? "justify-end" : "justify-start"} opacity-0 hover:opacity-100 focus-within:opacity-100 transition-opacity`}>
                              <button
                                className="text-gray-400 hover:text-purple-600"
                                onClick={() => handleReaction(message.id, "❤️")}
                              >
                                <Heart className="h-3 w-3" />
                              </button>
                              <button
                                className="text-gray-400 hover:text-purple-600"
                                onClick={() => handleReaction(message.id, "👍")}
                              >
                                <ThumbsUp className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    
                    {/* Typing indicator */}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="flex gap-3 max-w-[85%]">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" />
                            <AvatarFallback className="bg-purple-200 text-purple-700">A</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-sm text-gray-800">
                                AlexTherapist
                                <Badge className="ml-1 bg-purple-100 text-purple-800 border-none text-[10px] py-0">
                                  Therapist
                                </Badge>
                              </span>
                            </div>
                            <div className="rounded-2xl py-3 px-4 bg-purple-100">
                              <div className="flex space-x-1 items-center h-5">
                                <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                                <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                                <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "600ms" }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Scroll anchor */}
                    <div ref={chatEndRef} />
                  </div>
                </ScrollArea>
                
                <form onSubmit={handleSendMessage} className="p-4 border-t bg-white flex items-center gap-2">
                  <Button 
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-9 w-9 flex-shrink-0 text-gray-500 hover:text-purple-600 hover:bg-purple-100"
                    onClick={handleAttachmentAction}
                  >
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <div className="relative flex-grow">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message here..."
                      className="pr-10 border-gray-200 focus:border-purple-300 rounded-full"
                    />
                    <Button 
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full text-gray-500 hover:text-purple-600 hover:bg-purple-100"
                    >
                      <Smile className="h-5 w-5" />
                    </Button>
                  </div>
                  <Button 
                    type="submit"
                    className="rounded-full h-10 w-10 p-0 bg-purple-600 hover:bg-purple-700 flex-shrink-0"
                    disabled={!newMessage.trim()}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="resources" className="flex-grow p-0 m-0 data-[state=active]:block overflow-auto">
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
                      <FileText className="h-5 w-5 text-purple-600" />
                      Helpful Resources
                    </h3>
                    <p className="text-gray-600 mb-4">
                      These resources have been selected by our therapists to help support your journey.
                    </p>
                    
                    <div className="space-y-3">
                      {resources.map((resource, index) => (
                        <div 
                          key={index}
                          className="p-4 border border-purple-100 rounded-lg hover:bg-purple-50/50 transition-colors cursor-pointer flex items-start gap-3"
                        >
                          {resource.icon}
                          <div>
                            <h4 className="font-medium text-gray-800">{resource.title}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                                {resource.type}
                              </Badge>
                              <span className="text-sm text-gray-600">By {resource.author}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
                      <HelpCircle className="h-5 w-5 text-purple-600" />
                      Additional Support
                    </h3>
                    <div className="p-4 border border-purple-100 rounded-lg bg-gradient-to-r from-purple-50/50 to-white">
                      <h4 className="font-medium text-gray-800 mb-2">Need immediate help?</h4>
                      <p className="text-gray-600 mb-4">
                        If you're experiencing a crisis or need immediate assistance, please reach out to one of these resources:
                      </p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex gap-2">
                          <span className="text-purple-600">•</span>
                          <span>National Crisis Helpline: <span className="font-medium">1-800-273-8255</span> (24/7)</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-purple-600">•</span>
                          <span>Text HOME to <span className="font-medium">741741</span> to reach a Crisis Counselor</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-purple-600">•</span>
                          <span>For emergencies, call <span className="font-medium">911</span> or go to your nearest emergency room</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="events" className="flex-grow p-0 m-0 data-[state=active]:block overflow-auto">
                <div className="p-6">
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
                      <Calendar className="h-5 w-5 text-purple-600" />
                      Upcoming Events
                    </h3>
                    
                    {upcomingEvents.map((event, index) => (
                      <div 
                        key={index}
                        className="mb-4 p-4 border border-purple-100 rounded-lg hover:bg-purple-50/50 transition-colors"
                      >
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-gray-800">{event.title}</h4>
                          <Badge className="bg-purple-100 text-purple-700 border-none">
                            {event.datetime}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 mt-2 text-sm text-gray-600">
                          <User className="h-3 w-3" />
                          <span>Host: {event.host}</span>
                        </div>
                        <div className="mt-3">
                          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                            Add to Calendar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">Suggest an Event</h3>
                    <p className="text-gray-600 mb-4">
                      Have an idea for a group session or activity? Share it with the community.
                    </p>
                    <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                      Submit Event Suggestion
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar (show when info button is clicked) */}
          {showInfo && (
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "320px", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="border-l border-gray-200 flex-shrink-0 bg-white overflow-y-auto"
            >
              <div className="p-4">
                <h3 className="font-semibold mb-4 text-gray-800">Group Members ({activeUsers.length})</h3>
                <div className="space-y-1">
                  {activeUsers.map((user) => (
                    <div key={user.id} className="flex items-center p-2 hover:bg-gray-50 rounded-md">
                      <Avatar className="h-8 w-8 mr-3">
                        {user.avatar ? (
                          <AvatarImage src={user.avatar} />
                        ) : (
                          <AvatarFallback className="bg-purple-200 text-purple-700">
                            {user.name[0]}
                          </AvatarFallback>
                        )}
                        <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 border border-white"></span>
                      </Avatar>
                      <div>
                        <span className="text-sm font-medium text-gray-800">{user.name}</span>
                        {user.id === "user1" && (
                          <Badge className="ml-2 bg-purple-100 text-purple-800 border-none text-[10px] py-0">
                            Therapist
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-6" />
                
                <div>
                  <h3 className="font-semibold mb-4 text-gray-800">About This Group</h3>
                  <div className="space-y-4 text-sm text-gray-600">
                    <div className="flex items-start gap-3">
                      <div className="bg-purple-100 p-1.5 rounded-full mt-0.5">
                        <Sparkles className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-1">Purpose</h4>
                        <p>A safe space to discuss anxiety challenges and share coping strategies.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-purple-100 p-1.5 rounded-full mt-0.5">
                        <Clock className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-1">Schedule</h4>
                        <p>Live discussions every Tuesday and Thursday at 7:00 PM ET.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-purple-100 p-1.5 rounded-full mt-0.5">
                        <Shield className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-1">Guidelines</h4>
                        <p>Be respectful, maintain confidentiality, and offer support rather than advice.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatRoomDialog;
