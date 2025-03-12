
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Smile, Meh, Frown, HeartCrack, Angry, Annoyed } from "lucide-react";

interface MoodResponseProps {
  selectedMood: 'happy' | 'ok' | 'neutral' | 'down' | 'sad' | 'overwhelmed' | null;
  onContinue: () => void;
  onPrevious: () => void;
}

const MoodResponse: React.FC<MoodResponseProps> = ({ selectedMood, onContinue, onPrevious }) => {
  const renderMoodContent = () => {
    switch (selectedMood) {
      case 'happy':
        return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#F2FCE2] to-[#F2FCE2]/70 animate-fade-in relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23B87333%22 fill-opacity=%220.05%22/></svg>')] opacity-30"></div>
            <div className="text-center max-w-2xl mx-auto px-4 z-10">
              <Smile className="w-20 h-20 mx-auto mb-8 text-[#B87333] filter drop-shadow-lg animate-pulse" />
              <h2 className="text-3xl md:text-4xl mb-8 gradient-heading">Positive Affirmations</h2>
              <div className="space-y-4 mb-10">
                {["You are capable of amazing things.",
                  "Every day is a new opportunity.",
                  "You are strong, resilient, and worthy of happiness.",
                  "Your potential is limitless.",
                  "Small steps lead to big changes."].map((affirmation, index) => (
                  <p key={index} className="text-xl md:text-2xl font-light transition-all duration-300 hover:scale-105" style={{
                    animationDelay: `${index * 0.2}s`,
                    animation: 'fadeInText 1s ease-out forwards',
                    opacity: 0
                  }}>
                    {affirmation}
                  </p>
                ))}
              </div>
              <div className="flex gap-4 justify-center">
                <Button 
                  className="group hero-button bg-[#B87333] hover:bg-[#B87333]/90"
                  onClick={onContinue}
                >
                  Continue to Register
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button 
                  className="group bg-[#B87333]/20 hover:bg-[#B87333]/30 flex items-center gap-2"
                  onClick={onPrevious}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </Button>
              </div>
            </div>
          </div>
        );
      case 'ok':
        return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#F9F9F2] to-[#F9F9F2]/70 animate-fade-in relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23B87333%22 fill-opacity=%220.05%22/></svg>')] opacity-30"></div>
            <div className="text-center max-w-2xl mx-auto px-4 z-10">
              <Annoyed className="w-20 h-20 mx-auto mb-8 text-[#B87333] filter drop-shadow-lg animate-pulse" />
              <h2 className="text-3xl md:text-4xl mb-8 gradient-heading">Finding Balance</h2>
              <div className="space-y-4 mb-10">
                {["It's okay to have ordinary days.",
                  "Small moments of joy can brighten your perspective.",
                  "Being content with where you are is a form of happiness.",
                  "Today is a chance to find better balance.",
                  "Every emotion has value in your journey."].map((message, index) => (
                  <p key={index} className="text-xl md:text-2xl font-light transition-all duration-300 hover:scale-105" style={{
                    animationDelay: `${index * 0.2}s`,
                    animation: 'fadeInText 1s ease-out forwards',
                    opacity: 0
                  }}>
                    {message}
                  </p>
                ))}
              </div>
              <div className="flex gap-4 justify-center">
                <Button 
                  className="group hero-button bg-[#B87333] hover:bg-[#B87333]/90"
                  onClick={onContinue}
                >
                  Continue to Register
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button 
                  className="group bg-[#B87333]/20 hover:bg-[#B87333]/30 flex items-center gap-2"
                  onClick={onPrevious}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </Button>
              </div>
            </div>
          </div>
        );
      case 'neutral':
        return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#F7F7F7] to-[#F7F7F7]/70 animate-fade-in relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23B87333%22 fill-opacity=%220.05%22/></svg>')] opacity-30"></div>
            <div className="text-center max-w-2xl mx-auto px-4 z-10">
              <Meh className="w-20 h-20 mx-auto mb-8 text-[#B87333] filter drop-shadow-lg animate-pulse" />
              <h2 className="text-3xl md:text-4xl mb-8 gradient-heading">Mindful Reflection</h2>
              <div className="space-y-4 mb-10">
                {["Neutrality can be a peaceful state of mind.",
                  "This is a good time to check in with yourself.",
                  "What small thing might bring you joy today?",
                  "Neutral moments are perfect for mindfulness practice.",
                  "Your emotions are valid, whatever they may be."].map((message, index) => (
                  <p key={index} className="text-xl md:text-2xl font-light transition-all duration-300 hover:scale-105" style={{
                    animationDelay: `${index * 0.2}s`,
                    animation: 'fadeInText 1s ease-out forwards',
                    opacity: 0
                  }}>
                    {message}
                  </p>
                ))}
              </div>
              <div className="flex gap-4 justify-center">
                <Button 
                  className="group hero-button bg-[#B87333] hover:bg-[#B87333]/90"
                  onClick={onContinue}
                >
                  Continue to Register
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button 
                  className="group bg-[#B87333]/20 hover:bg-[#B87333]/30 flex items-center gap-2"
                  onClick={onPrevious}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </Button>
              </div>
            </div>
          </div>
        );
      case 'down':
        return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#F2F2F7] to-[#F2F2F7]/70 animate-fade-in relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23B87333%22 fill-opacity=%220.05%22/></svg>')] opacity-30"></div>
            <div className="text-center max-w-2xl mx-auto px-4 z-10">
              <HeartCrack className="w-20 h-20 mx-auto mb-8 text-[#B87333] filter drop-shadow-lg animate-pulse" />
              <h2 className="text-3xl md:text-4xl mb-8 gradient-heading">Gentle Reminders</h2>
              <div className="space-y-4 mb-10">
                {["It's okay to not feel okay sometimes.",
                  "Your feelings are valid and worthy of compassion.",
                  "This moment is temporary, and things will shift.",
                  "Be gentle with yourself today.",
                  "Small acts of self-care can make a difference."].map((message, index) => (
                  <p key={index} className="text-xl md:text-2xl font-light transition-all duration-300 hover:scale-105" style={{
                    animationDelay: `${index * 0.2}s`,
                    animation: 'fadeInText 1s ease-out forwards',
                    opacity: 0
                  }}>
                    {message}
                  </p>
                ))}
              </div>
              <div className="flex gap-4 justify-center">
                <Button 
                  className="group hero-button bg-[#B87333] hover:bg-[#B87333]/90"
                  onClick={onContinue}
                >
                  Continue to Register
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button 
                  className="group bg-[#B87333]/20 hover:bg-[#B87333]/30 flex items-center gap-2"
                  onClick={onPrevious}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </Button>
              </div>
            </div>
          </div>
        );
      case 'sad':
        return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#F0F4F8] to-[#F0F4F8]/70 animate-fade-in relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23B87333%22 fill-opacity=%220.05%22/></svg>')] opacity-30"></div>
            <div className="text-center max-w-2xl mx-auto px-4 z-10">
              <Frown className="w-20 h-20 mx-auto mb-8 text-[#B87333] filter drop-shadow-lg animate-pulse" />
              <h2 className="text-3xl md:text-4xl mb-8 gradient-heading">Holding Space for Sadness</h2>
              <div className="space-y-4 mb-10">
                {["Your sadness is a part of you, but it is not all of you.",
                  "It takes courage to acknowledge difficult feelings.",
                  "Reaching out is a sign of strength, not weakness.",
                  "Healing isn't linear, and that's perfectly normal.",
                  "We're here to support you through this."].map((message, index) => (
                  <p key={index} className="text-xl md:text-2xl font-light transition-all duration-300 hover:scale-105" style={{
                    animationDelay: `${index * 0.2}s`,
                    animation: 'fadeInText 1s ease-out forwards',
                    opacity: 0
                  }}>
                    {message}
                  </p>
                ))}
              </div>
              <div className="flex gap-4 justify-center">
                <Button 
                  className="group hero-button bg-[#B87333] hover:bg-[#B87333]/90"
                  onClick={onContinue}
                >
                  Continue to Register
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button 
                  className="group bg-[#B87333]/20 hover:bg-[#B87333]/30 flex items-center gap-2"
                  onClick={onPrevious}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </Button>
              </div>
            </div>
          </div>
        );
      case 'overwhelmed':
        return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#F0EDF6] to-[#F0EDF6]/70 animate-fade-in relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23B87333%22 fill-opacity=%220.05%22/></svg>')] opacity-30"></div>
            <div className="text-center max-w-2xl mx-auto px-4 z-10">
              <Angry className="w-20 h-20 mx-auto mb-8 text-[#B87333] filter drop-shadow-lg animate-pulse" />
              <h2 className="text-3xl md:text-4xl mb-8 gradient-heading">Finding Calm in the Storm</h2>
              <div className="space-y-4 mb-10">
                {["Take a deep breath - you don't have to handle everything at once.",
                  "It's okay to set boundaries and prioritize your wellbeing.",
                  "One moment, one task, one breath at a time.",
                  "Your feelings are signals, not sentences.",
                  "We all need support sometimes - you're not alone in this."].map((message, index) => (
                  <p key={index} className="text-xl md:text-2xl font-light transition-all duration-300 hover:scale-105" style={{
                    animationDelay: `${index * 0.2}s`,
                    animation: 'fadeInText 1s ease-out forwards',
                    opacity: 0
                  }}>
                    {message}
                  </p>
                ))}
              </div>
              <div className="flex gap-4 justify-center">
                <Button 
                  className="group hero-button bg-[#B87333] hover:bg-[#B87333]/90"
                  onClick={onContinue}
                >
                  Continue to Register
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button 
                  className="group bg-[#B87333]/20 hover:bg-[#B87333]/30 flex items-center gap-2"
                  onClick={onPrevious}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </Button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return renderMoodContent();
};

export default MoodResponse;
