
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Play, Pause, RotateCw, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import HomeButton from "@/components/HomeButton";

interface PracticeStep {
  id: number;
  title: string;
  instruction: string;
  duration: number; // in seconds
}

const GuidedPractice = () => {
  const { therapyId } = useParams();
  const { toast } = useToast();
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // This data would typically come from an API based on the therapyId
  const practices: Record<string, {
    title: string;
    description: string;
    backgroundClass: string;
    steps: PracticeStep[];
  }> = {
    "art-therapy": {
      title: "Emotional Landscape Drawing",
      description: "Express your emotions through color, shape, and texture in this guided art practice.",
      backgroundClass: "from-purple-600 to-indigo-600",
      steps: [
        { 
          id: 1, 
          title: "Preparation", 
          instruction: "Find a quiet space where you won't be disturbed. Gather paper and colored pencils, markers, or any art supplies you have available. Take three deep breaths to center yourself.", 
          duration: 30 
        },
        { 
          id: 2, 
          title: "Emotional Awareness", 
          instruction: "Close your eyes and notice what emotions are present for you right now. Don't judge them, simply observe what's there. Where do you feel these emotions in your body?", 
          duration: 60 
        },
        { 
          id: 3, 
          title: "Color Selection", 
          instruction: "Open your eyes and select colors that represent your emotions. There are no wrong choices - trust your intuition about which colors resonate with how you feel.", 
          duration: 45 
        },
        { 
          id: 4, 
          title: "Begin Drawing", 
          instruction: "Without overthinking, begin to make marks on your paper. Let the shapes, lines, and colors flow naturally as expressions of your emotional state. This is not about creating a perfect image.", 
          duration: 180 
        },
        { 
          id: 5, 
          title: "Reflection", 
          instruction: "Look at your drawing. What do you notice? What surprises you? Write down any insights or thoughts that arise when looking at your emotional landscape.", 
          duration: 90 
        }
      ]
    },
    "music-therapy": {
      title: "Rhythmic Resonance Meditation",
      description: "Experience the healing power of rhythm and sound in this guided music practice.",
      backgroundClass: "from-indigo-600 to-blue-600",
      steps: [
        { 
          id: 1, 
          title: "Find Comfort", 
          instruction: "Sit or lie down in a comfortable position. Close your eyes or soften your gaze. Take three deep breaths, allowing your body to relax with each exhale.", 
          duration: 30 
        },
        { 
          id: 2, 
          title: "Body Awareness", 
          instruction: "Bring attention to the natural rhythm of your breathing. Notice your heartbeat. These are your body's natural rhythms that are always with you.", 
          duration: 45 
        },
        { 
          id: 3, 
          title: "Create Rhythm", 
          instruction: "Begin tapping a gentle rhythm on your leg or chest. Start slow and steady, matching your breath. Feel free to increase or decrease the tempo as feels right.", 
          duration: 60 
        },
        { 
          id: 4, 
          title: "Add Sound", 
          instruction: "If comfortable, add humming or simple sounds to your rhythm. This doesn't need to be a song - just sounds that feel good to make. Notice the vibration in your body.", 
          duration: 90 
        },
        { 
          id: 5, 
          title: "Complete Integration", 
          instruction: "Gradually bring your sounds and rhythms to a close. Sit in silence for a moment, noticing how your body feels. What sensations or emotions are present now?", 
          duration: 60 
        }
      ]
    },
    "yoga-movement": {
      title: "Gentle Yoga Flow for Anxiety",
      description: "A sequence of gentle poses and breathing techniques to calm your nervous system.",
      backgroundClass: "from-blue-600 to-teal-600",
      steps: [
        { 
          id: 1, 
          title: "Grounding Breath", 
          instruction: "Sit comfortably with your spine straight. Place your hands on your knees. Breathe deeply through your nose, filling your belly, then chest. Exhale slowly through your mouth.", 
          duration: 60 
        },
        { 
          id: 2, 
          title: "Gentle Neck Rolls", 
          instruction: "Drop your right ear toward your right shoulder. Slowly roll your chin down to chest, then bring your left ear toward your left shoulder. Continue these gentle half circles 5 times.", 
          duration: 45 
        },
        { 
          id: 3, 
          title: "Seated Twist", 
          instruction: "Inhale and lengthen your spine. Exhale and gently twist to the right, placing your left hand on your right knee. Hold for 3 breaths, then repeat on the other side.", 
          duration: 90 
        },
        { 
          id: 4, 
          title: "Child's Pose", 
          instruction: "Come to hands and knees, then sit back on your heels with arms extended forward or alongside your body. Rest your forehead on the floor or a cushion. Breathe deeply.", 
          duration: 120 
        },
        { 
          id: 5, 
          title: "Corpse Pose", 
          instruction: "Lie on your back with arms slightly away from your body, palms facing up. Allow your feet to fall outward. Close your eyes and focus on your breath, letting your body become heavy.", 
          duration: 180 
        }
      ]
    },
    "mindfulness-meditation": {
      title: "Body Scan Meditation",
      description: "A guided practice to develop awareness of sensations throughout your body.",
      backgroundClass: "from-teal-600 to-green-600",
      steps: [
        { 
          id: 1, 
          title: "Preparation", 
          instruction: "Find a comfortable position lying down or seated. Close your eyes and take three deep breaths, allowing your body to settle into the surface supporting you.", 
          duration: 30 
        },
        { 
          id: 2, 
          title: "Feet & Legs", 
          instruction: "Bring awareness to your feet. Notice any sensations - temperature, pressure, tingling, or nothing at all. Slowly move your attention up through your legs, noticing all sensations.", 
          duration: 60 
        },
        { 
          id: 3, 
          title: "Torso", 
          instruction: "Continue moving awareness through your hips, abdomen, chest, and back. Notice sensations of clothing, air, temperature, and the natural movement of your breath.", 
          duration: 60 
        },
        { 
          id: 4, 
          title: "Arms & Hands", 
          instruction: "Bring awareness to your shoulders, down your arms, to your hands and fingertips. Notice any tension, temperature, or other sensations without trying to change anything.", 
          duration: 60 
        },
        { 
          id: 5, 
          title: "Head & Face", 
          instruction: "Finally, bring attention to your neck, head, and face. Notice sensations around your jaw, eyes, forehead. Allow any tension to soften with each breath.", 
          duration: 60 
        },
        { 
          id: 6, 
          title: "Whole Body", 
          instruction: "Now expand your awareness to feel your entire body as a whole. Notice how the different parts connect and how your breath moves through your whole system.", 
          duration: 60 
        }
      ]
    },
    "nature-therapy": {
      title: "Indoor Nature Connection",
      description: "Connect with the healing power of nature even while indoors.",
      backgroundClass: "from-green-600 to-emerald-600",
      steps: [
        { 
          id: 1, 
          title: "Preparation", 
          instruction: "Find a comfortable seated position. If possible, position yourself near a window with a view of nature, or have a plant or natural object nearby. Take three deep breaths.", 
          duration: 30 
        },
        { 
          id: 2, 
          title: "Nature Visualization", 
          instruction: "Close your eyes and imagine yourself in a natural setting that feels safe and peaceful to you - perhaps a forest, beach, or mountain. Build this image with all your senses.", 
          duration: 90 
        },
        { 
          id: 3, 
          title: "Sensory Exploration", 
          instruction: "In your mind, explore this natural place. What do you see? What sounds do you hear? What can you smell? Can you feel the air, earth, or water on your skin?", 
          duration: 90 
        },
        { 
          id: 4, 
          title: "Natural Connection", 
          instruction: "Imagine yourself as part of this natural setting - not separate from it, but belonging to it. Feel the same life force that flows through nature flowing through you.", 
          duration: 60 
        },
        { 
          id: 5, 
          title: "Grounding Return", 
          instruction: "Begin to bring awareness back to your physical surroundings while maintaining the feeling of connection with nature. Slowly open your eyes when ready.", 
          duration: 60 
        }
      ]
    },
    "virtual-reality-therapy": {
      title: "Mindful VR Breathing",
      description: "A visualization-based breathing practice inspired by VR therapy techniques.",
      backgroundClass: "from-violet-600 to-purple-600",
      steps: [
        { 
          id: 1, 
          title: "Preparation", 
          instruction: "Sit comfortably with your spine straight but not rigid. Rest your hands on your legs. Close your eyes or maintain a soft gaze.", 
          duration: 30 
        },
        { 
          id: 2, 
          title: "Visual Setup", 
          instruction: "Imagine you're wearing a VR headset that places you in a vast, calm space. This could be floating in space among stars, or in a peaceful blue void - whatever feels expansive.", 
          duration: 45 
        },
        { 
          id: 3, 
          title: "Breath Visualization", 
          instruction: "As you breathe in, imagine a soft blue light entering your body, bringing calm energy. As you breathe out, see a gray mist leaving, carrying tension away. Watch this process.", 
          duration: 120 
        },
        { 
          id: 4, 
          title: "Expanded Awareness", 
          instruction: "Now imagine you can see your entire body glowing with this blue light. With each breath, the light grows stronger and more vibrant, expanding around you like a protective field.", 
          duration: 90 
        },
        { 
          id: 5, 
          title: "Integration", 
          instruction: "Begin to let the visualization fade, but maintain awareness of your breathing. Slowly open your eyes, carrying the calm feeling with you.", 
          duration: 45 
        }
      ]
    }
  };

  const practice = therapyId ? practices[therapyId] : null;

  // Set up the current step when practice or step index changes
  useEffect(() => {
    if (!practice) return;
    
    const currentStep = practice.steps[currentStepIndex];
    if (currentStep) {
      setTimeRemaining(currentStep.duration);
    }
  }, [practice, currentStepIndex]);

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isPlaying && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (isPlaying && timeRemaining === 0) {
      // Move to next step or complete the practice
      if (practice && currentStepIndex < practice.steps.length - 1) {
        setCurrentStepIndex(prevIndex => prevIndex + 1);
      } else {
        setCompleted(true);
        setIsPlaying(false);
        toast({
          title: "Practice Completed",
          description: "Great job! You've completed your guided practice session.",
        });
      }
    }
    
    return () => clearInterval(timer);
  }, [isPlaying, timeRemaining, currentStepIndex, practice, toast]);

  // Calculate overall progress
  useEffect(() => {
    if (!practice) return;
    
    const totalDuration = practice.steps.reduce((sum, step) => sum + step.duration, 0);
    const completedDuration = practice.steps
      .slice(0, currentStepIndex)
      .reduce((sum, step) => sum + step.duration, 0);
    const currentProgress = (timeRemaining > 0) 
      ? completedDuration + (practice.steps[currentStepIndex].duration - timeRemaining)
      : completedDuration;
    
    setProgress(Math.round((currentProgress / totalDuration) * 100));
  }, [practice, currentStepIndex, timeRemaining]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const resetPractice = () => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
    setCompleted(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!practice || !therapyId) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Practice Not Found</h1>
          <p className="text-gray-600 mb-6">We couldn't find the guided practice you're looking for.</p>
          <Link to="/alternative-therapies">
            <Button>Return to Alternative Therapies</Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentStep = practice.steps[currentStepIndex];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${practice.backgroundClass} text-white`}>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 80 80%22 width=%2280%22 height=%2280%22><circle cx=%2240%22 cy=%2240%22 r=%2232%22 fill=%22white%22 opacity=%220.05%22/></svg>')] bg-center"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-48"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl -ml-32"></div>
      
      <div className="container px-4 mx-auto py-12 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <Link to="/alternative-therapies" className="inline-flex items-center text-white/90 hover:text-white transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Alternative Therapies
          </Link>
          <HomeButton />
        </div>
        
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-light mb-2">{practice.title}</h1>
          <p className="text-white/80 mb-8">{practice.description}</p>
          
          {/* Progress bar */}
          <div className="mb-10">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span>{progress}% Complete</span>
            </div>
            <Progress value={progress} className="h-2 bg-white/20" />
          </div>
          
          {completed ? (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center mb-8">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-500/20 mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-300" />
              </div>
              <h2 className="text-2xl font-medium mb-4">Practice Complete!</h2>
              <p className="text-white/80 mb-6">
                Congratulations on completing your guided practice. Take a moment to notice how you feel right now.
              </p>
              <Button onClick={resetPractice} variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <RotateCw className="mr-2 h-4 w-4" /> Start Over
              </Button>
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-medium">{currentStep.title}</h3>
                  <p className="text-white/60 text-sm">
                    Step {currentStepIndex + 1} of {practice.steps.length}
                  </p>
                </div>
                <div className="bg-white/20 px-4 py-2 rounded-full font-mono">
                  {formatTime(timeRemaining)}
                </div>
              </div>
              
              <p className="text-white/90 leading-relaxed mb-8">
                {currentStep.instruction}
              </p>
              
              <div className="flex justify-center gap-4">
                <Button 
                  size="lg"
                  className={`${isPlaying 
                    ? 'bg-white/20 hover:bg-white/30' 
                    : 'bg-white text-indigo-700 hover:bg-white/90'
                  } min-w-[140px]`}
                  onClick={togglePlayPause}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="mr-2 h-4 w-4" /> Pause
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" /> {currentStepIndex === 0 && !isPlaying ? 'Begin' : 'Continue'}
                    </>
                  )}
                </Button>
                
                {currentStepIndex > 0 && (
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-white/30 text-white hover:bg-white/10" 
                    onClick={resetPractice}
                  >
                    <RotateCw className="mr-2 h-4 w-4" /> Start Over
                  </Button>
                )}
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <h3 className="text-xl font-medium mb-4">Practice Outline</h3>
            {practice.steps.map((step, index) => (
              <div 
                key={step.id}
                className={`flex items-center p-3 rounded-lg ${
                  index === currentStepIndex 
                    ? 'bg-white/20' 
                    : index < currentStepIndex 
                      ? 'bg-white/10'
                      : 'bg-white/5'
                }`}
              >
                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm mr-3 ${
                  index < currentStepIndex
                    ? 'bg-green-500/20'
                    : 'bg-white/10'
                }`}>
                  {index < currentStepIndex ? (
                    <CheckCircle2 className="h-4 w-4 text-green-300" />
                  ) : (
                    index + 1
                  )}
                </div>
                <div>
                  <p className="font-medium">{step.title}</p>
                  <p className="text-sm text-white/60">{formatTime(step.duration)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidedPractice;
