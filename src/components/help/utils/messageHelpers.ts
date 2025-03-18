
// Helper functions for processing messages and generating responses

// Check if a message contains emergency keywords
export const checkForEmergency = (message: string): boolean => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes("kill myself") || 
      lowerMessage.includes("suicide") || 
      lowerMessage.includes("end my life") ||
      lowerMessage.includes("don't want to live") ||
      lowerMessage.includes("want to die")) {
    return true;
  }
  
  return false;
};

// Detect the emotional state from a message
export const checkEmotionalState = (message: string): string | null => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes("sad") || lowerMessage.includes("unhappy") || lowerMessage.includes("down") || lowerMessage.includes("blue")) {
    return "feeling sad";
  }
  
  if (lowerMessage.includes("depress")) {
    return "feeling depressed";
  }
  
  if (lowerMessage.includes("anxious") || lowerMessage.includes("anxiety") || lowerMessage.includes("nervous") || lowerMessage.includes("worry") || lowerMessage.includes("stressed")) {
    return "feeling anxious";
  }
  
  if (lowerMessage.includes("overwhelm") || lowerMessage.includes("too much") || lowerMessage.includes("can't handle") || lowerMessage.includes("struggling")) {
    return "feeling overwhelmed";
  }
  
  if (lowerMessage.includes("angry") || lowerMessage.includes("mad") || lowerMessage.includes("furious") || lowerMessage.includes("frustrated")) {
    return "feeling angry";
  }
  
  if (lowerMessage.includes("happy") || lowerMessage.includes("good") || lowerMessage.includes("great") || lowerMessage.includes("wonderful")) {
    return "feeling happy";
  }
  
  if (lowerMessage.includes("confused") || lowerMessage.includes("don't understand") || lowerMessage.includes("unclear")) {
    return "feeling confused";
  }
  
  if (lowerMessage.includes("hopeless") || lowerMessage.includes("no point") || lowerMessage.includes("giving up")) {
    return "feeling hopeless";
  }
  
  return null;
};

// Check if a message contains basic conversation keywords
export const checkBasicQuestion = (message: string): string | null => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes("hello") || lowerMessage.includes("hi ") || lowerMessage === "hi" || lowerMessage.includes("hey")) {
    return "greeting";
  }
  
  if (lowerMessage.includes("how are you")) {
    return "how are you";
  }
  
  if (lowerMessage.includes("who are you") || lowerMessage.includes("what are you")) {
    return "who are you";
  }
  
  if (lowerMessage.includes("thank you") || lowerMessage.includes("thanks")) {
    return "thank you";
  }
  
  if (lowerMessage === "help" || lowerMessage.includes("need help") || lowerMessage.includes("can you help")) {
    return "help";
  }
  
  return null;
};
