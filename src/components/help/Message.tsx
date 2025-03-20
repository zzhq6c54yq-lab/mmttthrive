
import React from "react";

interface MessageProps {
  text: string;
  isUser: boolean;
  timestamp?: string;
}

const Message: React.FC<MessageProps> = ({ text, isUser, timestamp }) => {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className={`max-w-[85%] sm:max-w-[75%] rounded-lg p-2.5 ${
          isUser
            ? "bg-[#B87333] text-white shadow-md"
            : "bg-gray-700 text-white shadow-sm"
        }`}
      >
        {!isUser && (
          <div className="flex items-center mb-1">
            <div className="h-5 w-5 rounded-full overflow-hidden flex items-center justify-center mr-1.5 border border-white/20">
              <img 
                src="/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png" 
                alt="Henry" 
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-xs text-white/70">Henry</span>
            {timestamp && <span className="text-xs text-white/50 ml-1.5">{timestamp}</span>}
          </div>
        )}
        <p className="text-xs sm:text-sm whitespace-pre-wrap">{text}</p>
        {isUser && timestamp && (
          <div className="flex justify-end mt-1">
            <span className="text-[10px] sm:text-xs text-white/50">{timestamp}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
