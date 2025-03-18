
// Helper functions for processing messages and generating responses with enhanced theory of mind

// Check if a message contains emergency keywords with more nuanced understanding
export const checkForEmergency = (message: string): boolean => {
  const lowerMessage = message.toLowerCase();
  
  // Direct suicidal statements
  if (lowerMessage.includes("kill myself") || 
      lowerMessage.includes("suicide") || 
      lowerMessage.includes("end my life") ||
      lowerMessage.includes("don't want to live") ||
      lowerMessage.includes("want to die") ||
      lowerMessage.includes("better off dead")) {
    return true;
  }
  
  // Indirect or passive suicidal ideation
  if (lowerMessage.includes("no point in living") ||
      lowerMessage.includes("can't go on") ||
      lowerMessage.includes("tired of life") ||
      lowerMessage.includes("not worth living") ||
      lowerMessage.includes("disappear forever") ||
      lowerMessage.includes("everyone would be better without me")) {
    return true;
  }
  
  // Severe hopelessness that may indicate suicidal risk
  if ((lowerMessage.includes("hopeless") || lowerMessage.includes("no hope")) &&
      (lowerMessage.includes("future") || lowerMessage.includes("anymore") || lowerMessage.includes("can't continue"))) {
    return true;
  }
  
  return false;
};

// Detect the emotional state from a message with enhanced theory of mind understanding
export const checkEmotionalState = (message: string): string | null => {
  const lowerMessage = message.toLowerCase();
  
  // Expanded emotional state detection with more nuance
  
  // Sadness detection with contextual understanding
  if (lowerMessage.includes("sad") || lowerMessage.includes("unhappy") || 
      lowerMessage.includes("down") || lowerMessage.includes("blue") ||
      lowerMessage.includes("heartbroken") || lowerMessage.includes("miserable") ||
      lowerMessage.includes("low mood") || lowerMessage.includes("feeling low")) {
    return "feeling sad";
  }
  
  // Depression detection with contextual understanding
  if (lowerMessage.includes("depress") || 
      (lowerMessage.includes("no energy") && lowerMessage.includes("days")) ||
      (lowerMessage.includes("can't enjoy") && (lowerMessage.includes("anything") || lowerMessage.includes("things"))) ||
      (lowerMessage.includes("empty") && !lowerMessage.includes("empty stomach")) ||
      (lowerMessage.includes("worthless") && !lowerMessage.includes("worthless items"))) {
    return "feeling depressed";
  }
  
  // Anxiety detection with physical and mental symptoms
  if (lowerMessage.includes("anxious") || lowerMessage.includes("anxiety") || 
      lowerMessage.includes("nervous") || lowerMessage.includes("worry") || 
      lowerMessage.includes("stressed") || lowerMessage.includes("panic") ||
      lowerMessage.includes("racing thoughts") || lowerMessage.includes("racing heart") ||
      lowerMessage.includes("can't relax") || 
      (lowerMessage.includes("afraid") && !lowerMessage.includes("not afraid"))) {
    return "feeling anxious";
  }
  
  // Overwhelm detection with contextual understanding
  if (lowerMessage.includes("overwhelm") || lowerMessage.includes("too much") || 
      lowerMessage.includes("can't handle") || lowerMessage.includes("struggling") ||
      lowerMessage.includes("drowning in") || lowerMessage.includes("buried under") ||
      (lowerMessage.includes("pressure") && !lowerMessage.includes("blood pressure"))) {
    return "feeling overwhelmed";
  }
  
  // Anger detection with contextual understanding
  if (lowerMessage.includes("angry") || lowerMessage.includes("mad") || 
      lowerMessage.includes("furious") || lowerMessage.includes("frustrated") ||
      lowerMessage.includes("irritated") || lowerMessage.includes("rage") ||
      lowerMessage.includes("pissed off") || lowerMessage.includes("fed up") ||
      lowerMessage.includes("lost my temper")) {
    return "feeling angry";
  }
  
  // Happiness detection with contextual understanding
  if (lowerMessage.includes("happy") || lowerMessage.includes("good") || 
      lowerMessage.includes("great") || lowerMessage.includes("wonderful") ||
      lowerMessage.includes("joyful") || lowerMessage.includes("excited") ||
      lowerMessage.includes("content") || lowerMessage.includes("pleased") ||
      (lowerMessage.includes("better") && !lowerMessage.includes("better if"))) {
    return "feeling happy";
  }
  
  // Confusion detection with contextual understanding
  if (lowerMessage.includes("confused") || lowerMessage.includes("don't understand") || 
      lowerMessage.includes("unclear") || lowerMessage.includes("lost") ||
      lowerMessage.includes("makes no sense") || lowerMessage.includes("puzzled") ||
      lowerMessage.includes("not sure what") || lowerMessage.includes("can't figure")) {
    return "feeling confused";
  }
  
  // Hopelessness detection with contextual understanding
  if (lowerMessage.includes("hopeless") || lowerMessage.includes("no point") || 
      lowerMessage.includes("giving up") || lowerMessage.includes("what's the use") ||
      lowerMessage.includes("never get better") || lowerMessage.includes("no future") ||
      (lowerMessage.includes("see no") && lowerMessage.includes("hope"))) {
    return "feeling hopeless";
  }
  
  // Numbness/emotional disconnection detection
  if (lowerMessage.includes("numb") || lowerMessage.includes("feel nothing") || 
      lowerMessage.includes("emotionally dead") || lowerMessage.includes("disconnected") ||
      lowerMessage.includes("detached") || lowerMessage.includes("can't feel") ||
      lowerMessage.includes("empty inside")) {
    return "feeling numb";
  }
  
  // Shame detection
  if (lowerMessage.includes("ashamed") || lowerMessage.includes("shame") || 
      lowerMessage.includes("disgusted with myself") || lowerMessage.includes("hate myself") ||
      lowerMessage.includes("not good enough") || 
      (lowerMessage.includes("bad") && lowerMessage.includes("person"))) {
    return "feeling shame";
  }
  
  return null;
};

// Check if a message contains basic conversation keywords with enhanced context awareness
export const checkBasicQuestion = (message: string): string | null => {
  const lowerMessage = message.toLowerCase();
  
  // Expanded greeting detection
  if (lowerMessage.includes("hello") || lowerMessage.includes("hi ") || 
      lowerMessage === "hi" || lowerMessage.includes("hey") ||
      lowerMessage.includes("good morning") || lowerMessage.includes("good afternoon") ||
      lowerMessage.includes("good evening") || lowerMessage === "hey there") {
    return "greeting";
  }
  
  // Check for questions about Henry's wellbeing
  if (lowerMessage.includes("how are you") || lowerMessage.includes("how you doing") ||
      lowerMessage.includes("how's it going") || lowerMessage.includes("how do you feel") ||
      lowerMessage.includes("are you ok")) {
    return "how are you";
  }
  
  // Check for identity questions with more variations
  if (lowerMessage.includes("who are you") || lowerMessage.includes("what are you") ||
      lowerMessage.includes("tell me about yourself") || lowerMessage.includes("your purpose") ||
      lowerMessage.includes("what is your name") || lowerMessage.includes("what do you do")) {
    return "who are you";
  }
  
  // Expanded gratitude detection
  if (lowerMessage.includes("thank you") || lowerMessage.includes("thanks") ||
      lowerMessage.includes("appreciate it") || lowerMessage.includes("grateful") ||
      lowerMessage.includes("that helps") || lowerMessage.includes("helpful")) {
    return "thank you";
  }
  
  // Expanded help request detection
  if (lowerMessage === "help" || lowerMessage.includes("need help") || 
      lowerMessage.includes("can you help") || lowerMessage.includes("please help") ||
      lowerMessage.includes("how can you help") || lowerMessage.includes("assist me") ||
      lowerMessage.includes("looking for support")) {
    return "help";
  }
  
  // Check for self-awareness questions about Henry
  if (lowerMessage.includes("are you real") || lowerMessage.includes("are you human") ||
      lowerMessage.includes("are you ai") || lowerMessage.includes("artificial intelligence") ||
      lowerMessage.includes("are you a bot") || lowerMessage.includes("are you a person") ||
      lowerMessage.includes("can you feel") || lowerMessage.includes("do you understand") ||
      lowerMessage.includes("your limitations")) {
    return "self_awareness";
  }
  
  return null;
};

// Check for specific topics about mental health with enhanced awareness
export const checkMentalHealthTopic = (message: string): string | null => {
  const lowerMessage = message.toLowerCase();
  const topics = [
    "anxiety", "depression", "stress", "therapy", "meditation", 
    "trauma", "self-care", "mindfulness", "boundaries", "grief", 
    "panic attack", "ptsd", "addiction", "insomnia"
  ];
  
  for (const topic of topics) {
    if (lowerMessage.includes(topic)) {
      return topic;
    }
  }
  
  // More specific topic detection with context
  if ((lowerMessage.includes("worry") && lowerMessage.includes("too much")) ||
      (lowerMessage.includes("nervous") && lowerMessage.includes("always"))) {
    return "anxiety";
  }
  
  if ((lowerMessage.includes("sad") && lowerMessage.includes("all the time")) ||
      (lowerMessage.includes("no interest") && lowerMessage.includes("anymore"))) {
    return "depression";
  }
  
  if (lowerMessage.includes("can't sleep") || lowerMessage.includes("trouble sleeping") ||
      lowerMessage.includes("wake up") && lowerMessage.includes("night")) {
    return "insomnia";
  }
  
  if ((lowerMessage.includes("flashback") || lowerMessage.includes("nightmare")) &&
      lowerMessage.includes("trauma")) {
    return "ptsd";
  }
  
  return null;
};

// Detect questions about Henry's capabilities with self-awareness
export const checkCapabilityQuestion = (message: string): boolean => {
  const lowerMessage = message.toLowerCase();
  
  return lowerMessage.includes("what can you do") || 
         lowerMessage.includes("how can you help") ||
         lowerMessage.includes("your capabilities") ||
         lowerMessage.includes("what are you capable of") ||
         lowerMessage.includes("what do you know") ||
         lowerMessage.includes("how do you work");
};
