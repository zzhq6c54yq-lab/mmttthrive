
import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { 
  Play, Pause, Volume2, Volume, VolumeX, 
  Moon, Brain, Heart, Music, Leaf, Cloud, 
  Headphones, SkipBack, SkipForward
} from "lucide-react";
import { cn } from "@/lib/utils";
import Page from "@/components/Page";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";

// Define the beats categories and their tracks
const beatCategories = [
  {
    id: "chakra",
    name: "Chakra Balancing",
    icon: Brain,
    color: "from-purple-600 to-indigo-600",
    tracks: [
      { id: "root", name: "Root Chakra (396 Hz)", frequency: 396, duration: 20 },
      { id: "sacral", name: "Sacral Chakra (417 Hz)", frequency: 417, duration: 20 },
      { id: "solar", name: "Solar Plexus (528 Hz)", frequency: 528, duration: 20 },
      { id: "heart", name: "Heart Chakra (639 Hz)", frequency: 639, duration: 20 },
      { id: "throat", name: "Throat Chakra (741 Hz)", frequency: 741, duration: 20 },
      { id: "third-eye", name: "Third Eye (852 Hz)", frequency: 852, duration: 20 },
      { id: "crown", name: "Crown Chakra (963 Hz)", frequency: 963, duration: 20 },
    ]
  },
  {
    id: "stress",
    name: "Stress Relief",
    icon: Leaf,
    color: "from-green-600 to-emerald-500",
    tracks: [
      { id: "calm-mind", name: "Calm Mind (432 Hz)", frequency: 432, duration: 30 },
      { id: "anxiety-relief", name: "Anxiety Relief (63 Hz)", frequency: 63, duration: 25 },
      { id: "deep-relaxation", name: "Deep Relaxation (8 Hz)", frequency: 8, duration: 30 },
      { id: "stress-release", name: "Stress Release (174 Hz)", frequency: 174, duration: 25 },
    ]
  },
  {
    id: "sleep",
    name: "Sleep & Relaxation",
    icon: Moon,
    color: "from-blue-600 to-indigo-800",
    tracks: [
      { id: "deep-sleep", name: "Deep Sleep (3 Hz)", frequency: 3, duration: 480 }, // 8 hours
      { id: "gentle-sleep", name: "Gentle Sleep (6 Hz)", frequency: 6, duration: 480 }, // 8 hours
      { id: "bedtime-relaxation", name: "Bedtime Relaxation (4 Hz)", frequency: 4, duration: 60 },
      { id: "night-calm", name: "Night Calm (2 Hz)", frequency: 2, duration: 480 }, // 8 hours
    ]
  },
  {
    id: "meditation",
    name: "Meditation",
    icon: Cloud,
    color: "from-cyan-500 to-blue-500",
    tracks: [
      { id: "mindfulness", name: "Mindfulness (7.83 Hz)", frequency: 7.83, duration: 30 },
      { id: "theta-meditation", name: "Theta Meditation (6 Hz)", frequency: 6, duration: 45 },
      { id: "zen-focus", name: "Zen Focus (10 Hz)", frequency: 10, duration: 40 },
      { id: "transcendental", name: "Transcendental (7 Hz)", frequency: 7, duration: 60 },
    ]
  },
  {
    id: "depression",
    name: "Depression Relief",
    icon: Heart,
    color: "from-pink-500 to-rose-500",
    tracks: [
      { id: "mood-lift", name: "Mood Lift (10 Hz)", frequency: 10, duration: 30 },
      { id: "happiness-boost", name: "Happiness Boost (8.4 Hz)", frequency: 8.4, duration: 25 },
      { id: "joy-inducer", name: "Joy Inducer (7.5 Hz)", frequency: 7.5, duration: 30 },
      { id: "serotonin-boost", name: "Serotonin Boost (10.5 Hz)", frequency: 10.5, duration: 25 },
    ]
  }
];

const BinauralBeats: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const trackParam = searchParams.get("track");
  
  const [activeCategory, setActiveCategory] = useState<string>(categoryParam || "chakra");
  const [activeTrack, setActiveTrack] = useState<string>(trackParam || "root");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(50);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const leftOscillatorRef = useRef<OscillatorNode | null>(null);
  const rightOscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const { toast } = useToast();

  // Update search params when category or track changes
  useEffect(() => {
    setSearchParams({ category: activeCategory, track: activeTrack });
  }, [activeCategory, activeTrack, setSearchParams]);

  // Get current track data
  const getCurrentCategory = () => beatCategories.find(cat => cat.id === activeCategory) || beatCategories[0];
  const getCurrentTrack = () => {
    const category = getCurrentCategory();
    return category.tracks.find(track => track.id === activeTrack) || category.tracks[0];
  };

  // Create binaural beat
  const setupAudio = () => {
    // Clean up existing audio
    cleanup();

    // Create new audio context
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    const audioContext = new AudioContext();
    audioContextRef.current = audioContext;

    // Get current track frequencies
    const track = getCurrentTrack();
    const baseFrequency = track.frequency;
    const beatFrequency = 5; // 5 Hz binaural beat
    
    // Create oscillators
    const leftOscillator = audioContext.createOscillator();
    const rightOscillator = audioContext.createOscillator();
    
    leftOscillator.type = 'sine';
    rightOscillator.type = 'sine';
    
    leftOscillator.frequency.value = baseFrequency;
    rightOscillator.frequency.value = baseFrequency + beatFrequency;
    
    leftOscillatorRef.current = leftOscillator;
    rightOscillatorRef.current = rightOscillator;
    
    // Create gain node for volume control
    const gainNode = audioContext.createGain();
    gainNode.gain.value = volume / 100;
    gainNodeRef.current = gainNode;
    
    // Create stereo panner for left and right channels
    const leftPanner = audioContext.createStereoPanner();
    leftPanner.pan.value = -1; // Far left
    
    const rightPanner = audioContext.createStereoPanner();
    rightPanner.pan.value = 1; // Far right
    
    // Connect nodes
    leftOscillator.connect(leftPanner);
    rightOscillator.connect(rightPanner);
    
    leftPanner.connect(gainNode);
    rightPanner.connect(gainNode);
    
    gainNode.connect(audioContext.destination);
    
    // Start oscillators
    leftOscillator.start();
    rightOscillator.start();
    
    startTimeRef.current = audioContext.currentTime;
    setDuration(track.duration * 60); // Convert minutes to seconds
    
    // Start time tracking
    updateTime();
  };

  // Clean up audio resources
  const cleanup = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    if (leftOscillatorRef.current) {
      try {
        leftOscillatorRef.current.stop();
        leftOscillatorRef.current.disconnect();
      } catch (e) {
        console.log("Error stopping left oscillator", e);
      }
    }
    
    if (rightOscillatorRef.current) {
      try {
        rightOscillatorRef.current.stop();
        rightOscillatorRef.current.disconnect();
      } catch (e) {
        console.log("Error stopping right oscillator", e);
      }
    }
    
    if (audioContextRef.current) {
      try {
        audioContextRef.current.close();
      } catch (e) {
        console.log("Error closing audio context", e);
      }
    }
    
    leftOscillatorRef.current = null;
    rightOscillatorRef.current = null;
    gainNodeRef.current = null;
    audioContextRef.current = null;
  };

  // Update time display
  const updateTime = () => {
    if (!audioContextRef.current || !isPlaying) return;
    
    const currentTime = audioContextRef.current.currentTime - startTimeRef.current;
    setCurrentTime(currentTime);
    
    // Stop at end of duration
    if (currentTime >= duration) {
      handleStop();
      return;
    }
    
    animationFrameRef.current = requestAnimationFrame(updateTime);
  };

  // Format time for display (MM:SS)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle play/pause
  const handlePlayPause = () => {
    if (isPlaying) {
      if (audioContextRef.current) {
        audioContextRef.current.suspend();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    } else {
      if (audioContextRef.current) {
        audioContextRef.current.resume();
        updateTime();
      } else {
        setupAudio();
      }
      
      const track = getCurrentTrack();
      toast({
        title: "Now Playing",
        description: `${track.name} - ${getCurrentCategory().name}`,
        duration: 3000,
      });
    }
    
    setIsPlaying(!isPlaying);
  };

  // Handle stop
  const handleStop = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    cleanup();
  };

  // Handle category change
  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === activeCategory) return;
    
    const category = beatCategories.find(cat => cat.id === categoryId);
    if (!category) return;
    
    setActiveCategory(categoryId);
    setActiveTrack(category.tracks[0].id);
    
    if (isPlaying) {
      handleStop();
      // Small timeout to allow audio to stop before starting new track
      setTimeout(() => {
        setIsPlaying(true);
        setupAudio();
      }, 100);
    }
  };

  // Handle track change
  const handleTrackChange = (trackId: string) => {
    if (trackId === activeTrack) return;
    
    setActiveTrack(trackId);
    
    if (isPlaying) {
      handleStop();
      // Small timeout to allow audio to stop before starting new track
      setTimeout(() => {
        setIsPlaying(true);
        setupAudio();
      }, 100);
    }
  };

  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
    
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = newVolume / 100;
    }
  };

  // Handle mute toggle
  const handleMuteToggle = () => {
    if (gainNodeRef.current) {
      if (isMuted) {
        gainNodeRef.current.gain.value = volume / 100;
      } else {
        gainNodeRef.current.gain.value = 0;
      }
    }
    
    setIsMuted(!isMuted);
  };

  // Handle previous track
  const handlePreviousTrack = () => {
    const category = getCurrentCategory();
    const currentIndex = category.tracks.findIndex(track => track.id === activeTrack);
    const newIndex = currentIndex <= 0 ? category.tracks.length - 1 : currentIndex - 1;
    handleTrackChange(category.tracks[newIndex].id);
  };

  // Handle next track
  const handleNextTrack = () => {
    const category = getCurrentCategory();
    const currentIndex = category.tracks.findIndex(track => track.id === activeTrack);
    const newIndex = currentIndex >= category.tracks.length - 1 ? 0 : currentIndex + 1;
    handleTrackChange(category.tracks[newIndex].id);
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, []);

  const currentCategory = getCurrentCategory();
  const currentTrack = getCurrentTrack();

  return (
    <Page>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Binaural Beats Therapy</h1>
          <p className="text-gray-500 mb-6">
            Experience the healing power of binaural beats to reduce stress, improve focus, enhance meditation, and promote better sleep.
          </p>
          
          {/* Categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {beatCategories.map((category) => {
              const Icon = category.icon;
              const isActive = category.id === activeCategory;
              
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={cn(
                    "rounded-xl p-4 transition-all duration-300 flex flex-col items-center justify-center text-center h-32 shadow-md hover:shadow-lg",
                    isActive 
                      ? `bg-gradient-to-br ${category.color} text-white` 
                      : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                  )}
                >
                  <Icon className={cn("h-10 w-10 mb-2", isActive ? "text-white" : "text-gray-500")} />
                  <h3 className="font-medium text-sm">{category.name}</h3>
                </button>
              );
            })}
          </div>
          
          {/* Tracks */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">{currentCategory.name} Tracks</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {currentCategory.tracks.map((track) => (
                <button
                  key={track.id}
                  onClick={() => handleTrackChange(track.id)}
                  className={cn(
                    "p-4 rounded-lg transition-all duration-200 text-left",
                    track.id === activeTrack
                      ? `bg-gradient-to-r ${currentCategory.color} text-white`
                      : "bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  )}
                >
                  <div className="flex items-center">
                    <Music className="h-5 w-5 mr-2" />
                    <div>
                      <h3 className="font-medium text-sm">{track.name}</h3>
                      <p className="text-xs opacity-80">{track.duration} min</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Player */}
          <div className={`bg-gradient-to-r ${currentCategory.color} text-white rounded-xl p-6 shadow-md`}>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center mb-4">
                <Headphones className="h-12 w-12" />
              </div>
              
              <h3 className="text-xl font-bold mb-1">{currentTrack.name}</h3>
              <p className="text-sm opacity-80 mb-6">{currentCategory.name}</p>
              
              {/* Progress bar */}
              <div className="w-full max-w-md mb-4">
                <div className="flex justify-between mb-1 text-sm">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  />
                </div>
              </div>
              
              {/* Controls */}
              <div className="flex items-center space-x-4 mb-8">
                <Button 
                  size="icon"
                  variant="secondary"
                  className="rounded-full bg-white/20 hover:bg-white/30 text-white"
                  onClick={handlePreviousTrack}
                >
                  <SkipBack className="h-5 w-5" />
                </Button>
                
                <Button
                  size="icon"
                  variant="secondary"
                  className="rounded-full w-14 h-14 bg-white/20 hover:bg-white/30 text-white"
                  onClick={handlePlayPause}
                >
                  {isPlaying ? <Pause className="h-7 w-7" /> : <Play className="h-7 w-7" />}
                </Button>
                
                <Button 
                  size="icon"
                  variant="secondary"
                  className="rounded-full bg-white/20 hover:bg-white/30 text-white"
                  onClick={handleNextTrack}
                >
                  <SkipForward className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Volume control */}
              <div className="flex items-center space-x-2 w-full max-w-xs">
                <Button
                  size="icon"
                  variant="secondary"
                  className="rounded-full bg-white/20 hover:bg-white/30 text-white h-8 w-8"
                  onClick={handleMuteToggle}
                >
                  {isMuted ? (
                    <VolumeX className="h-4 w-4" />
                  ) : volume > 50 ? (
                    <Volume2 className="h-4 w-4" />
                  ) : (
                    <Volume className="h-4 w-4" />
                  )}
                </Button>
                
                <Slider
                  value={[isMuted ? 0 : volume]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={handleVolumeChange}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Information section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-bold mb-4">What are Binaural Beats?</h2>
            <p className="mb-4">
              Binaural beats occur when two slightly different frequencies are played separately to each ear,
              causing the brain to perceive a third "beat" frequency equal to the difference between the two tones.
            </p>
            <p>
              For example, if a 420 Hz tone is played in your left ear and a 430 Hz tone in your right ear,
              your brain perceives a 10 Hz binaural beat. This can help induce specific brainwave states
              associated with relaxation, focus, creativity, or sleep.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-bold mb-4">How to Use</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Headphones className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                <span>Use stereo headphones for the best experience</span>
              </li>
              <li className="flex items-start">
                <Moon className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                <span>Find a quiet, comfortable place with minimal distractions</span>
              </li>
              <li className="flex items-start">
                <Brain className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                <span>Start with short sessions (15-30 minutes) and gradually increase duration</span>
              </li>
              <li className="flex items-start">
                <Heart className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                <span>Be consistent for best results - regular practice enhances benefits</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default BinauralBeats;
