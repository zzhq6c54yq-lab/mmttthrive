
import { knowledgeBase } from "./knowledgeBase";
import { checkForEmergency, checkEmotionalState, checkBasicQuestion } from "./messageHelpers";

// Generate a personalized response based on the emotional state
export const generateTheoryOfMindResponse = (emotionalState: string, userName?: string): string => {
  const name = userName ? `, ${userName}` : "";
  
  // Personalized responses with theory of mind (understanding the user's mental state)
  if (emotionalState === "feeling depressed") {
    return `I understand you're feeling depressed${name}. That's a heavy burden to carry, and you don't have to face it alone. Depression can make everything feel overwhelming and hopeless, but there are ways through this. Would you like me to set up a therapy appointment for you? In the meantime, I can show you some exercises that might help lift that cloud of depression. How does that sound?`;
  }
  
  if (emotionalState === "feeling sad") {
    return `I notice you're feeling sad${name}. It's completely normal to experience sadness sometimes. Would you like to talk about what's bringing you down, or would you prefer some suggestions for activities that might help improve your mood?`;
  }
  
  if (emotionalState === "feeling anxious") {
    return `I can tell you're feeling anxious${name}. Anxiety can be really challenging to deal with. Let's take a moment together - could you try taking a slow, deep breath with me? In through your nose for 4 counts, hold for 1, and out through your mouth for 6. Would you like to try a quick grounding exercise, or would you prefer to explore our anxiety management resources?`;
  }
  
  if (emotionalState === "feeling overwhelmed") {
    return `I can sense that things are feeling too much for you right now${name}. When we're overwhelmed, everything can seem impossible to handle. Let's try to break things down into smaller, more manageable pieces. Would it help to talk about what's contributing to this feeling, or would you prefer some immediate coping strategies?`;
  }
  
  if (emotionalState === "feeling angry") {
    return `I notice you're feeling angry${name}. Anger is often a signal that something important to us has been violated or threatened. It's a perfectly valid emotion. Would you like to explore some healthy ways to express this anger, or would it help to talk about the situation that's causing these feelings?`;
  }
  
  if (emotionalState === "feeling happy") {
    return `I'm glad to hear you're feeling happy${name}! Positive emotions are worth celebrating and savoring. What's contributing to your good mood today? Would you like some suggestions for activities that might help extend these positive feelings?`;
  }
  
  if (emotionalState === "feeling confused") {
    return `I can tell you're feeling confused${name}. That can be an uncomfortable place to be. Let's see if we can bring some clarity to the situation. What specific aspects are you finding difficult to understand? I'm here to help you make sense of things.`;
  }
  
  if (emotionalState === "feeling hopeless") {
    return `I understand you're feeling hopeless right now${name}. That's an incredibly difficult feeling to carry. While I know it may not feel like it at the moment, perspectives can change and difficult periods do pass. What's one small thing that's helped you get through difficult times before? Perhaps we could focus on that as a starting point.`;
  }
  
  return knowledgeBase[emotionalState];
};

// Generate a response based on the message content
export const generateResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  // Check for emergency
  if (checkForEmergency(message)) {
    return "I'm concerned about what you're sharing. If you're having thoughts of harming yourself, please call the National Suicide Prevention Lifeline at 988 right away. These feelings can be overwhelming, but crisis counselors are available 24/7 to help you through this difficult time. Would you like me to help you find additional crisis resources?";
  }
  
  // Check for emotional states (theory of mind)
  const emotionalState = checkEmotionalState(message);
  if (emotionalState) {
    return generateTheoryOfMindResponse(emotionalState);
  }
  
  // Check for basic questions
  const basicQuestion = checkBasicQuestion(message);
  if (basicQuestion) {
    return knowledgeBase[basicQuestion];
  }
  
  // Check knowledge base for mental health topics
  for (const [key, value] of Object.entries(knowledgeBase)) {
    if (lowerMessage.includes(key)) {
      return value;
    }
  }
  
  // Check for complex inquiries that need theory of mind understanding
  if (lowerMessage.includes("understand me") || lowerMessage.includes("know how i feel")) {
    return "I aim to understand how you're feeling by carefully considering your words and the emotions behind them. While I don't experience emotions myself, I'm designed to recognize patterns in how people express their feelings and respond with empathy. Would you like to tell me more about what you're experiencing right now?";
  }
  
  if (lowerMessage.includes("mind reading") || lowerMessage.includes("read minds")) {
    return "I can't read minds, but I do try to understand your perspective based on what you share with me. This is similar to how humans develop 'theory of mind' - the ability to understand that others have their own thoughts, feelings, and perspectives. The more you share with me, the better I can understand your unique situation.";
  }
  
  // Navigation requests
  if (lowerMessage.includes("workshops") || lowerMessage.includes("workshop")) {
    return "I can help you explore our workshops! We have sessions on managing anxiety, depression, stress resilience, and more. Would you like me to navigate you to the Workshops page?";
  }
  
  if (lowerMessage.includes("community") || lowerMessage.includes("support group")) {
    return "Our Community Support section is a great place to connect with others who may be experiencing similar challenges. Sharing your journey can provide validation and new perspectives. Would you like me to take you there?";
  }
  
  // Default responses if no matches, with theory of mind approach
  const defaultResponses = [
    "I'm here to support your mental wellness journey. I notice you're reaching out, which takes courage. Could you tell me more about what you're looking for or experiencing?",
    "Thank you for sharing that with me. I'm trying to understand your perspective. How can I best support you right now?",
    "I appreciate you trusting me with your thoughts. Everyone's experience is unique, and I'd like to understand yours better. Could you tell me more about what you're feeling?",
    "I notice you're looking for information. To help you most effectively, could you share a bit more about what you're hoping to find?",
    "I'm listening and trying to understand your situation. Mental health journeys are deeply personal. What specific areas would you like guidance with today?"
  ];
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};
