
import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface MessageProps {
  text: string;
  isUser: boolean;
  timestamp?: Date;
  sender?: string;
  avatar?: string;
}

interface MessageListProps {
  messages: MessageProps[];
  className?: string;
  style?: React.CSSProperties;
  showTypingIndicator?: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ 
  messages, 
  className = "", 
  style = {},
  showTypingIndicator = false
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  return (
    <div 
      className={cn(
        "flex flex-col space-y-4 py-3 overflow-y-auto max-h-[400px] scrollbar-thin scrollbar-thumb-[#B87333]/20 scrollbar-track-transparent pr-2",
        className
      )}
      style={style}
    >
      {messages.map((message, index) => (
        <div 
          key={index} 
          className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
        >
          <div 
            className={`max-w-[80%] px-4 py-2 rounded-2xl ${
              message.isUser 
                ? 'bg-[#B87333] text-white rounded-tr-none' 
                : 'bg-[#2A2A2A] text-white rounded-tl-none'
            }`}
          >
            {!message.isUser && message.sender && (
              <div className="flex items-center mb-1">
                {message.avatar && (
                  <div className="h-5 w-5 rounded-full overflow-hidden mr-2">
                    <img 
                      src={message.avatar} 
                      alt={message.sender} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <span className="text-xs text-white/70">{message.sender}</span>
              </div>
            )}
            <p className="text-sm">{message.text}</p>
            {message.timestamp && (
              <p className="text-xs opacity-70 mt-1 text-right">
                {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </p>
            )}
          </div>
        </div>
      ))}

      {showTypingIndicator && (
        <div className="flex justify-start">
          <div className="bg-[#2A2A2A] text-white px-4 py-2 rounded-2xl rounded-tl-none max-w-[80%]">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-[#B87333]/70 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
              <div className="w-2 h-2 bg-[#B87333]/70 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
              <div className="w-2 h-2 bg-[#B87333]/70 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
            </div>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
