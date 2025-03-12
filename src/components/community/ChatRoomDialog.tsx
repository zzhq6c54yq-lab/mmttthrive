
import React, { useState, useEffect, useRef } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, UserRound } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  author: string;
  avatar?: string;
  isCurrentUser: boolean;
  content: string;
  timestamp: string;
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
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messageEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Generate some example messages when the chat room opens
  useEffect(() => {
    if (isOpen) {
      const exampleMessages: Message[] = [
        {
          id: "1",
          author: "HenrySupport",
          avatar: "",
          isCurrentUser: false,
          content: `Welcome to the ${groupName} chat room! Feel free to share your thoughts and experiences with the group.`,
          timestamp: "Just now"
        },
        {
          id: "2",
          author: "RecoveryJourney",
          avatar: "",
          isCurrentUser: false,
          content: "Hello everyone! I'm excited to be part of this supportive community.",
          timestamp: "Just now"
        },
        {
          id: "3",
          author: "MindfulnessSeeker",
          avatar: "",
          isCurrentUser: false,
          content: "Does anyone have recommendations for good mindfulness practices that helped them?",
          timestamp: "Just now"
        }
      ];
      
      setMessages(exampleMessages);
    }
  }, [isOpen, groupName]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const newMsg: Message = {
      id: Date.now().toString(),
      author: "You",
      isCurrentUser: true,
      content: newMessage,
      timestamp: "Just now"
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage("");
    
    // Simulate a reply after a short delay
    setTimeout(() => {
      const replyMsg: Message = {
        id: (Date.now() + 1).toString(),
        author: getRandomMember(),
        isCurrentUser: false,
        content: getRandomReply(groupId),
        timestamp: "Just now"
      };
      
      setMessages(prev => [...prev, replyMsg]);
    }, 2000 + Math.random() * 3000);
  };
  
  const getRandomMember = () => {
    const members = ["MindfulMoment", "RecoveryPath", "AnxietyWarrior", "GratitudeDaily", "HealingJourney"];
    return members[Math.floor(Math.random() * members.length)];
  };
  
  const getRandomReply = (groupId: string) => {
    const replies: Record<string, string[]> = {
      "group-1": [
        "I've found deep breathing exercises to be really helpful for my anxiety.",
        "Has anyone tried progressive muscle relaxation? It's been a game-changer for me.",
        "Thanks for sharing that. It's nice to know I'm not alone in this experience.",
        "My therapist recommended journaling about anxiety triggers, and it's helped me identify patterns.",
        "Does anyone have suggestions for managing work-related anxiety?"
      ],
      "group-2": [
        "Day 45 of sobriety here. The urges still come but they're getting easier to manage.",
        "I found that replacing my drinking habit with evening walks has been really effective.",
        "My recovery group has been such a crucial support system for me.",
        "It's important to celebrate the small victories in recovery. Every day counts!",
        "Has anyone tried meditation as part of their recovery process?"
      ],
      "group-3": [
        "I've been practicing mindfulness for 10 minutes each morning and it's changed my whole day.",
        "The Headspace app has some great guided meditations for beginners.",
        "I struggle with staying present during meditation. Any advice?",
        "Mindful walking has been more effective for me than sitting meditation.",
        "I find that mindfulness helps me catch negative thought patterns before they spiral."
      ],
      "group-4": [
        "On my bad days, I try to just accomplish one small task. Sometimes that's enough.",
        "Has anyone found certain foods or supplements that help with mood?",
        "I've been tracking my mood daily and it's helping me see patterns.",
        "It's hard to explain depression to people who haven't experienced it.",
        "Remember that it's okay to have bad days. Recovery isn't linear."
      ],
      "group-5": [
        "I've found that regular exercise has improved both my physical and mental health.",
        "Has anyone tried incorporating more plant-based foods into their diet for mental wellness?",
        "Sleep hygiene has been crucial for my overall wellbeing.",
        "I'm working on reducing screen time before bed. It's tough but making a difference.",
        "The mind-body connection is so important. When I neglect one, the other suffers too."
      ]
    };
    
    const defaultReplies = [
      "Thanks for sharing your perspective.",
      "I can relate to what you're saying.",
      "That's a really good point.",
      "I appreciate everyone's support here.",
      "This community has been so helpful for my journey."
    ];
    
    const groupReplies = replies[groupId] || defaultReplies;
    return groupReplies[Math.floor(Math.random() * groupReplies.length)];
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{groupName}</DialogTitle>
          <DialogDescription>
            Connect with others in this supportive community chat
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="flex-1 py-4 h-[50vh]">
          <div className="space-y-4 px-1">
            {messages.map((message) => (
              <div 
                key={message.id}
                className={`flex ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex ${message.isCurrentUser ? 'flex-row-reverse' : 'flex-row'} items-start gap-2 max-w-[80%]`}>
                  <Avatar className="h-8 w-8">
                    {message.avatar ? (
                      <AvatarImage src={message.avatar} alt={message.author} />
                    ) : (
                      <AvatarFallback className={`${message.isCurrentUser ? 'bg-[#B87333]' : 'bg-gray-500'} text-white`}>
                        {message.author.charAt(0)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  
                  <div>
                    <div className={`rounded-lg p-3 ${
                      message.isCurrentUser 
                        ? 'bg-[#B87333] text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <div className={`text-xs text-gray-500 mt-1 ${message.isCurrentUser ? 'text-right' : 'text-left'}`}>
                      <span className="font-medium">{message.author}</span> · {message.timestamp}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>
        </ScrollArea>
        
        <DialogFooter className="flex-shrink-0">
          <div className="flex w-full items-center gap-2">
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarFallback className="bg-[#B87333] text-white">
                <UserRound className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 relative">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                className="pr-12"
              />
              <Button 
                size="sm" 
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#B87333] hover:bg-[#B87333]/90 p-1 h-auto"
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChatRoomDialog;
