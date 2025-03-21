
import React, { useRef, useEffect } from "react";

interface Message {
  text: string;
  isUser: boolean;
  timestamp?: Date;
}

interface MessageListProps {
  messages: Message[];
  className?: string;
  style?: React.CSSProperties;
}

const MessageList: React.FC<MessageListProps> = ({ messages, className = "", style = {} }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  return (
    <div 
      className={`flex flex-col space-y-4 py-3 overflow-y-auto max-h-[400px] scrollbar-thin scrollbar-thumb-[#B87333]/20 scrollbar-track-transparent pr-2 ${className}`}
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
            <p className="text-sm">{message.text}</p>
            {message.timestamp && (
              <p className="text-xs opacity-70 mt-1 text-right">
                {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </p>
            )}
          </div>
        </div>
      ))}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
