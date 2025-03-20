
import React from "react";

interface MessageProps {
  text: string;
  isUser: boolean;
}

const Message: React.FC<MessageProps> = ({ text, isUser }) => {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-[80%] rounded-lg p-3 ${
          isUser
            ? "bg-[#B87333] text-white"
            : "bg-gray-700 text-white"
        }`}
      >
        {!isUser && (
          <div className="flex items-center mb-1">
            <div className="h-6 w-6 rounded-full overflow-hidden flex items-center justify-center mr-2">
              <img 
                src="/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png" 
                alt="Henry" 
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-xs text-white/70">Henry</span>
          </div>
        )}
        <p className="text-sm">{text}</p>
      </div>
    </div>
  );
};

export default Message;
