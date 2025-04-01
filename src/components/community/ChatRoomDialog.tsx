
import React, { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Send, X, Users, MessagesSquare, Info, 
  ThumbsUp, Heart, Video, PhoneCall, Paperclip, Smile
} from "lucide-react";

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
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Simulate fetching chat history when dialog opens
    if (isOpen) {
      // Mock data for demonstration
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
    }
  }, [isOpen, groupId]);
  
  useEffect(() => {
    // Scroll to bottom when messages change
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    const newChatMessage: ChatMessage = {
      id: `msg${chatMessages.length + 1}`,
      userId: "currentUser", // Simulating current user
      userName: "You",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setChatMessages([...chatMessages, newChatMessage]);
    setNewMessage("");
  };
  
  const handleReaction = (messageId: string, reactionType: string) => {
    setChatMessages(messages => 
      messages.map(message => {
        if (message.id === messageId) {
          // If message already has reactions
          if (message.reactions) {
            // If this reaction type already exists
            const existingReactionIndex = message.reactions.findIndex(r => r.type === reactionType);
            
            if (existingReactionIndex !== -1) {
              // Toggle user's reaction
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
              // Add new reaction type
              return {
                ...message,
                reactions: [...message.reactions, { type: reactionType, count: 1, userReacted: true }]
              };
            }
          } else {
            // Add first reaction to this message
            return {
              ...message,
              reactions: [{ type: reactionType, count: 1, userReacted: true }]
            };
          }
        }
        return message;
      })
    );
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[80vh] p-0 flex flex-col overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b flex-shrink-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <DialogTitle className="text-xl font-bold">{groupName}</DialogTitle>
              <Badge variant="outline" className="bg-[#B87333]/10 text-[#B87333] border-[#B87333]/30">
                <Users className="h-3 w-3 mr-1" />
                {activeUsers.length} online
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-9 w-9 rounded-full hover:bg-gray-100"
                onClick={() => setShowInfo(!showInfo)}
              >
                <Info className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-9 w-9 rounded-full hover:bg-gray-100"
                onClick={() => onOpenChange(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex flex-grow overflow-hidden">
          {/* Chat messages area */}
          <div className="flex-grow overflow-y-auto p-6">
            <div className="space-y-4">
              {chatMessages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.userId === "currentUser" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex ${message.userId === "currentUser" ? "flex-row-reverse" : "flex-row"} gap-3 max-w-[80%]`}>
                    {message.userId !== "currentUser" && (
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={message.userAvatar} />
                        <AvatarFallback>{message.userName[0]}</AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div>
                      <div className={`flex items-center gap-2 mb-1 ${message.userId === "currentUser" ? "justify-end" : "justify-start"}`}>
                        {message.userId !== "currentUser" && (
                          <span className="font-medium text-sm">
                            {message.userName}
                          </span>
                        )}
                        <span className="text-xs text-gray-500">
                          {message.timestamp}
                        </span>
                      </div>
                      
                      <div 
                        className={`rounded-2xl py-3 px-4 ${
                          message.userId === "currentUser"
                            ? "bg-[#B87333] text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      </div>
                      
                      {message.reactions && message.reactions.length > 0 && (
                        <div className={`flex gap-1 mt-1 ${message.userId === "currentUser" ? "justify-end" : "justify-start"}`}>
                          {message.reactions.map((reaction, index) => (
                            <button
                              key={index}
                              className={`text-xs inline-flex items-center gap-1 px-2 py-1 rounded-full ${
                                reaction.userReacted 
                                  ? "bg-[#B87333]/10 text-[#B87333]" 
                                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                              }`}
                              onClick={() => handleReaction(message.id, reaction.type)}
                            >
                              <span>{reaction.type}</span>
                              <span>{reaction.count}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef}></div>
            </div>
          </div>
          
          {/* Side panel (conditionally rendered) */}
          {showInfo && (
            <div className="w-72 border-l overflow-y-auto p-4 flex-shrink-0 bg-gray-50">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-[#B87333]" />
                Group Members
              </h3>
              
              <div className="space-y-3 mb-6">
                {activeUsers.map((user) => (
                  <div key={user.id} className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white"></div>
                    </div>
                    <span className="text-sm font-medium">{user.name}</span>
                  </div>
                ))}
              </div>
              
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Info className="h-5 w-5 text-[#B87333]" />
                About This Group
              </h3>
              
              <div className="text-sm text-gray-600 space-y-3">
                <p>
                  This support circle meets virtually every Tuesday and Thursday at 7:00 PM EST for guided discussions on anxiety management strategies.
                </p>
                <p>
                  All members are expected to maintain confidentiality and treat each other with respect and empathy.
                </p>
                <p>
                  <span className="font-medium text-[#B87333]">Next meeting:</span> Tuesday, 7:00 PM EST
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Message input area */}
        <DialogFooter className="p-4 border-t flex-shrink-0">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2 w-full">
            <div className="flex gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              >
                <Paperclip className="h-5 w-5" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              >
                <Smile className="h-5 w-5" />
              </Button>
            </div>
            
            <Input
              className="flex-grow"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            
            <Button 
              type="submit" 
              className="bg-[#B87333] hover:bg-[#B87333]/90"
              disabled={!newMessage.trim()}
            >
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChatRoomDialog;
