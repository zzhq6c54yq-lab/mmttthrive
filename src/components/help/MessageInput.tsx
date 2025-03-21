
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Send, Mic } from "lucide-react";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isProcessing: boolean;
  isEmergencyMode?: boolean;
  onResize?: (height: number) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ 
  onSendMessage, 
  isProcessing, 
  isEmergencyMode = false,
  onResize
}) => {
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  
  // Adjust textarea height based on content
  useEffect(() => {
    if (textAreaRef.current) {
      // Reset height to measure the scrollHeight correctly
      textAreaRef.current.style.height = "auto";
      const scrollHeight = textAreaRef.current.scrollHeight;
      textAreaRef.current.style.height = `${scrollHeight}px`;
      
      if (onResize) {
        onResize(scrollHeight);
      }
    }
  }, [message, onResize]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  const handleSend = () => {
    if (message.trim() && !isProcessing) {
      onSendMessage(message);
      setMessage("");
      
      // Reset height after clearing
      if (textAreaRef.current) {
        textAreaRef.current.style.height = "auto";
        if (onResize) {
          onResize(40); // Default height
        }
      }
    }
  };
  
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Voice recognition not supported in your browser. Try typing instead.");
      return;
    }
    
    setIsListening(true);
    
    // @ts-ignore - WebkitSpeechRecognition is not in the TypeScript types
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setMessage(transcript);
      setIsListening(false);
      
      // Submit automatically after a short delay
      setTimeout(() => {
        onSendMessage(transcript);
        setMessage("");
      }, 500);
    };
    
    recognition.onerror = () => {
      setIsListening(false);
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
    
    recognition.start();
  };
  
  return (
    <div className="flex items-end gap-2 mt-2">
      <textarea
        ref={textAreaRef}
        value={message}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        className={`flex-1 bg-[#2A2A2A] text-white border-none rounded-md p-3 focus:ring-2 ${
          isEmergencyMode 
            ? 'focus:ring-red-500/50 border border-red-500/50' 
            : 'focus:ring-[#B87333]/50'
        } resize-none max-h-20 min-h-[40px]`}
        rows={1}
        disabled={isProcessing || isListening}
      />
      <div className="flex gap-1">
        <Button
          type="button"
          onClick={startListening}
          disabled={isProcessing || isListening}
          className={`rounded-full w-10 h-10 flex items-center justify-center ${
            isListening 
              ? 'bg-red-500 animate-pulse' 
              : isEmergencyMode 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-[#B87333] hover:bg-[#A56625]'
          }`}
          size="icon"
        >
          <Mic className="h-5 w-5" />
        </Button>
        <Button
          type="button"
          onClick={handleSend}
          disabled={!message.trim() || isProcessing}
          className={`rounded-full w-10 h-10 flex items-center justify-center ${
            isEmergencyMode 
              ? 'bg-red-600 hover:bg-red-700' 
              : 'bg-[#B87333] hover:bg-[#A56625]'
          }`}
          size="icon"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
