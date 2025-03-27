
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface MoodResponseProps {
  selectedMood: 'happy' | 'ok' | 'neutral' | 'down' | 'sad' | 'overwhelmed' | null;
  onContinue: () => void;
  onPrevious?: () => void; // Make this optional so it works with both cases
}

const MoodResponse: React.FC<MoodResponseProps> = ({ selectedMood, onContinue, onPrevious }) => {
  // Multiple response messages for each mood
  const moodResponses = {
    happy: [
      {
        title: "That's wonderful!",
        message: "It's great to hear you're feeling happy today. We'll keep the positive energy flowing with resources that match your mood."
      },
      {
        title: "Embracing Joy!",
        message: "Your happiness is contagious! Let's nurture this positive energy and discover ways to share it with others."
      },
      {
        title: "Celebrating Today!",
        message: "Happiness is a beautiful emotion to experience. Let's explore how to extend these wonderful feelings and make them last."
      },
      {
        title: "Riding the Wave of Joy!",
        message: "When we're happy, possibilities seem endless. We'll suggest activities that amplify this positive energy."
      }
    ],
    ok: [
      {
        title: "Doing OK",
        message: "Sometimes 'OK' is perfectly fine. We have some resources that might help elevate your mood a bit more today."
      },
      {
        title: "Steady and Centered",
        message: "Being OK means you have a solid foundation to build on. We'll suggest some activities that might bring more color to your day."
      },
      {
        title: "Finding Balance",
        message: "The middle ground is a place of potential. From here, you can move toward greater joy with just a few simple practices."
      },
      {
        title: "Stability Matters",
        message: "Feeling OK is actually an achievement in this fast-paced world. Let's explore ways to appreciate this moment of steadiness."
      }
    ],
    neutral: [
      {
        title: "Feeling Neutral",
        message: "A neutral day can be a canvas for whatever you want to create. Let's explore some ways to add some positive moments to your day."
      },
      {
        title: "Open to Possibilities",
        message: "Neutral feelings give you the freedom to choose your direction. We can suggest some gentle activities to lift your spirit."
      },
      {
        title: "Middle Ground",
        message: "From this neutral space, you have the power to shape your emotional landscape. What small step might brighten your day?"
      },
      {
        title: "Clear Slate",
        message: "Neutrality can be refreshing – like a clean canvas waiting for color. We have tools to help you add some vibrancy to your day."
      }
    ],
    down: [
      {
        title: "Sorry you're feeling down",
        message: "We all have days where we feel down. Let's focus on some gentle activities that might help lift your spirits a bit."
      },
      {
        title: "This Too Shall Pass",
        message: "Feeling down is part of the human experience. Small acts of self-care can create little islands of relief during difficult times."
      },
      {
        title: "One Step at a Time",
        message: "When we're feeling down, even small steps forward matter. Let's find some gentle ways to care for yourself today."
      },
      {
        title: "Honoring Your Feelings",
        message: "It takes courage to acknowledge when you're feeling down. We have compassionate resources that match where you're at right now."
      }
    ],
    sad: [
      {
        title: "It's OK to feel sad",
        message: "Sadness is a natural emotion. We have resources that can help you process these feelings and find some comfort."
      },
      {
        title: "Finding Comfort",
        message: "Sadness deserves to be acknowledged with gentleness. We'll suggest soothing activities that meet you right where you are."
      },
      {
        title: "Present with Difficult Emotions",
        message: "Your sadness is valid and temporary. We have resources to help you navigate this feeling with self-compassion."
      },
      {
        title: "Gentle Support",
        message: "When sadness visits, it's important to be kind to yourself. Let's explore some gentle ways to hold this feeling with care."
      }
    ],
    overwhelmed: [
      {
        title: "Take a deep breath",
        message: "Feeling overwhelmed is challenging. Let's focus on some calming resources that can help you regain a sense of control."
      },
      {
        title: "One Thing at a Time",
        message: "When everything feels too much, breaking things down into small steps can help. We have tools to help you find solid ground again."
      },
      {
        title: "Finding Anchor Points",
        message: "It's normal to feel overwhelmed sometimes. Simple grounding practices can help you navigate through stormy emotional waters."
      },
      {
        title: "Creating Space",
        message: "When overwhelm takes over, even a moment of calm can make a difference. Let's explore some techniques to create that breathing room."
      }
    ],
    null: [
      {
        title: "Thanks for sharing",
        message: "Your emotional wellbeing matters to us. We've prepared some resources that might be helpful for you today."
      }
    ]
  };

  // State to store the selected response
  const [selectedResponse, setSelectedResponse] = useState<{title: string; message: string} | null>(null);

  // Select a random response when the component mounts or mood changes
  useEffect(() => {
    if (selectedMood) {
      const responses = moodResponses[selectedMood];
      const randomIndex = Math.floor(Math.random() * responses.length);
      setSelectedResponse(responses[randomIndex]);
    } else {
      setSelectedResponse(moodResponses.null[0]);
    }
  }, [selectedMood]);

  if (!selectedResponse) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#334155] text-white">
      <div className="w-full max-w-2xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl font-light mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#22C55E] to-[#4ADE80]">
          {selectedResponse.title}
        </h2>
        
        <p className="text-xl mb-8 text-white/90">
          {selectedResponse.message}
        </p>
        
        <div className="mb-10">
          <p className="text-white/80 italic">
            Based on your mood, we've prepared personalized resources and activities to support your mental wellbeing today.
          </p>
        </div>
        
        <div className="flex justify-between mt-6">
          {onPrevious && (
            <Button 
              onClick={onPrevious}
              className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-8 py-6 h-auto transition-all duration-300 transform hover:scale-105 border border-white/20 rounded-full"
            >
              <ArrowLeft className="mr-2 h-5 w-5" /> Previous
            </Button>
          )}
          <div className={onPrevious ? "" : "mx-auto"}>
            <Button 
              onClick={onContinue}
              className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-8 py-6 h-auto transition-all duration-300 transform hover:scale-105 border border-white/20 rounded-full"
            >
              Continue <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodResponse;
