
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Headphones, Music, ArrowLeft, Play, Pause, SkipForward, 
  SkipBack, Repeat, VolumeX, Volume1, Volume2, ChevronDown,
  Brain, Heart, Moon, Sparkles, Timer, Save, Star, HeartPulse, Laugh, ZoomIn
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import HomeButton from "@/components/HomeButton";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BinauralTrack {
  id: string;
  title: string;
  description: string;
  category: "meditation" | "sleep" | "focus" | "relax" | "healing" | "chakra" | "anxiety";
  duration: string;
  imageUrl: string;
  audioUrl: string;
  baseFrequency: number;
  targetFrequency: number;
  popular: boolean;
  effects: string[];
}

const BinauralBeats = () => {
  const [activeCategory, setActiveCategory] = useState<string>("meditation");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState<BinauralTrack | null>(null);
  const [tracks, setTracks] = useState<BinauralTrack[]>([]);
  const [volume, setVolume] = useState<number>(80);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showMoreInfo, setShowMoreInfo] = useState<boolean>(false);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [timerDuration, setTimerDuration] = useState<number>(30); // minutes
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Mock data
    const tracksData: BinauralTrack[] = [
      {
        id: "alpha-waves",
        title: "Alpha Waves",
        description: "Promotes relaxation and reduces stress by generating alpha brain waves, ideal for light meditation.",
        category: "meditation",
        duration: "15:00",
        imageUrl: "https://images.unsplash.com/photo-1520473378652-85d9c4aee6cf?auto=format&fit=crop&w=500&q=80",
        audioUrl: "https://example.com/alpha-waves.mp3", // Mock URL
        baseFrequency: 200,
        targetFrequency: 210,
        popular: true,
        effects: ["Reduces stress", "Promotes relaxation", "Enhances creativity", "Improves mood"]
      },
      {
        id: "deep-sleep",
        title: "Deep Sleep Delta",
        description: "Helps you fall into deep sleep with delta waves that calm the mind and body.",
        category: "sleep",
        duration: "45:00",
        imageUrl: "https://images.unsplash.com/photo-1617644910775-77d4eacedb3a?auto=format&fit=crop&w=500&q=80",
        audioUrl: "https://example.com/deep-sleep.mp3", // Mock URL
        baseFrequency: 100,
        targetFrequency: 104,
        popular: true,
        effects: ["Induces deep sleep", "Reduces insomnia", "Promotes neurogenesis", "Calms racing thoughts"]
      },
      {
        id: "gamma-focus",
        title: "Gamma Focus",
        description: "Enhances concentration and mental clarity with gamma frequencies for deep focus.",
        category: "focus",
        duration: "30:00",
        imageUrl: "https://images.unsplash.com/photo-1589409514187-c21d14df0d04?auto=format&fit=crop&w=500&q=80",
        audioUrl: "https://example.com/gamma-focus.mp3", // Mock URL
        baseFrequency: 315,
        targetFrequency: 355,
        popular: false,
        effects: ["Enhances focus", "Improves cognitive function", "Increases mental clarity", "Boosts productivity"]
      },
      {
        id: "anxiety-relief",
        title: "Anxiety Relief",
        description: "Calms anxiety with theta waves that slow racing thoughts and promote tranquility.",
        category: "anxiety",
        duration: "20:00",
        imageUrl: "https://images.unsplash.com/photo-1528495612343-9ca9f4a9f67c?auto=format&fit=crop&w=500&q=80",
        audioUrl: "https://example.com/anxiety-relief.mp3", // Mock URL
        baseFrequency: 160,
        targetFrequency: 167,
        popular: true,
        effects: ["Reduces anxiety", "Calms nervous system", "Alleviates panic", "Promotes relaxation"]
      },
      {
        id: "heart-chakra",
        title: "Heart Chakra Healing",
        description: "Balances the heart chakra with 639 Hz frequency to promote love and compassion.",
        category: "chakra",
        duration: "25:00",
        imageUrl: "https://images.unsplash.com/photo-1531171673193-f23ac4024c0d?auto=format&fit=crop&w=500&q=80",
        audioUrl: "https://example.com/heart-chakra.mp3", // Mock URL
        baseFrequency: 639,
        targetFrequency: 649,
        popular: false,
        effects: ["Balances heart chakra", "Increases compassion", "Enhances loving energy", "Emotional healing"]
      },
      {
        id: "theta-healing",
        title: "Theta Healing",
        description: "Accesses the theta brainwave state for deep relaxation and emotional healing.",
        category: "healing",
        duration: "35:00",
        imageUrl: "https://images.unsplash.com/photo-1603398921780-8e8537dc720c?auto=format&fit=crop&w=500&q=80",
        audioUrl: "https://example.com/theta-healing.mp3", // Mock URL
        baseFrequency: 180,
        targetFrequency: 185,
        popular: false,
        effects: ["Emotional healing", "Subconscious reprogramming", "Deep relaxation", "Intuition enhancement"]
      },
      {
        id: "evening-relax",
        title: "Evening Relaxation",
        description: "Wind down in the evening with gentle frequencies that prepare your mind for sleep.",
        category: "relax",
        duration: "20:00",
        imageUrl: "https://images.unsplash.com/photo-1455218873509-8097305ee378?auto=format&fit=crop&w=500&q=80",
        audioUrl: "https://example.com/evening-relax.mp3", // Mock URL
        baseFrequency: 136,
        targetFrequency: 142,
        popular: true,
        effects: ["Evening wind-down", "Stress reduction", "Mental decompression", "Prepares for sleep"]
      }
    ];
    
    setTracks(tracksData);
    
    // Load user favorites from localStorage
    const savedFavorites = localStorage.getItem('binaural-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    
    // Create audio element
    audioRef.current = new Audio();
    audioRef.current.volume = volume / 100;
    
    // Set up event listeners
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', updateProgress);
      audioRef.current.addEventListener('loadedmetadata', onLoadedMetadata);
      audioRef.current.addEventListener('ended', handleTrackEnd);
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('timeupdate', updateProgress);
        audioRef.current.removeEventListener('loadedmetadata', onLoadedMetadata);
        audioRef.current.removeEventListener('ended', handleTrackEnd);
      }
    };
  }, []);

  // Handle track selection
  const handleTrackSelect = (track: BinauralTrack) => {
    if (currentTrack?.id === track.id) {
      // Toggle play/pause if it's the same track
      togglePlay();
      return;
    }
    
    // Load new track
    setCurrentTrack(track);
    setIsPlaying(true);
    
    if (audioRef.current) {
      audioRef.current.src = track.audioUrl;
      audioRef.current.load();
      audioRef.current.play().catch(error => {
        // In a real app, handle the case where audio can't play due to browser restrictions
        console.error('Could not play audio:', error);
        setIsPlaying(false);
        toast({
          title: "Playback Error",
          description: "Could not play audio. Please try again or use headphones for best experience.",
          variant: "destructive",
        });
      });
    }
    
    toast({
      title: `Now Playing: ${track.title}`,
      description: `${track.description.substring(0, 60)}...`,
      duration: 3000,
    });
  };

  // Audio control functions
  const togglePlay = () => {
    if (!currentTrack) return;
    
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play().catch(() => {
        toast({
          title: "Playback Error",
          description: "Could not play audio. Please try again.",
          variant: "destructive",
        });
      });
    }
    
    setIsPlaying(!isPlaying);
  };

  const updateProgress = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleTrackEnd = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const handleNextTrack = () => {
    // Find next track in current category
    if (!currentTrack) return;
    
    const categoryTracks = tracks.filter(t => t.category === activeCategory);
    const currentIndex = categoryTracks.findIndex(t => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % categoryTracks.length;
    
    handleTrackSelect(categoryTracks[nextIndex]);
  };

  const handlePrevTrack = () => {
    // Find previous track in current category
    if (!currentTrack) return;
    
    const categoryTracks = tracks.filter(t => t.category === activeCategory);
    const currentIndex = categoryTracks.findIndex(t => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + categoryTracks.length) % categoryTracks.length;
    
    handleTrackSelect(categoryTracks[prevIndex]);
  };

  const toggleFavorite = (trackId: string) => {
    let newFavorites;
    
    if (favorites.includes(trackId)) {
      newFavorites = favorites.filter(id => id !== trackId);
      toast({
        title: "Removed from Favorites",
        description: "Track removed from your favorites",
        duration: 2000,
      });
    } else {
      newFavorites = [...favorites, trackId];
      toast({
        title: "Added to Favorites",
        description: "Track added to your favorites",
        duration: 2000,
      });
    }
    
    setFavorites(newFavorites);
    localStorage.setItem('binaural-favorites', JSON.stringify(newFavorites));
  };

  // Filter tracks by category or favorites
  const filteredTracks = tracks.filter(track => {
    if (showFavorites) {
      return favorites.includes(track.id);
    }
    return track.category === activeCategory;
  });

  // Format time for display
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Get icon for category
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case "meditation":
        return <Brain className="h-5 w-5" />;
      case "sleep":
        return <Moon className="h-5 w-5" />;
      case "focus":
        return <ZoomIn className="h-5 w-5" />;
      case "relax":
        return <Laugh className="h-5 w-5" />;
      case "healing":
        return <Heart className="h-5 w-5" />;
      case "chakra":
        return <Sparkles className="h-5 w-5" />;
      case "anxiety":
        return <HeartPulse className="h-5 w-5" />;
      default:
        return <Music className="h-5 w-5" />;
    }
  };

  // Start sleep timer
  const startTimer = () => {
    if (timerActive) {
      setTimerActive(false);
      toast({
        title: "Sleep Timer Cancelled",
        description: "The sleep timer has been cancelled.",
        duration: 2000,
      });
      return;
    }
    
    setTimerActive(true);
    toast({
      title: "Sleep Timer Started",
      description: `Playback will stop in ${timerDuration} minutes.`,
      duration: 3000,
    });
    
    setTimeout(() => {
      if (audioRef.current && isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        toast({
          title: "Sleep Timer Ended",
          description: "Playback has been stopped by the timer.",
          duration: 3000,
        });
      }
      setTimerActive(false);
    }, timerDuration * 60 * 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#121826] via-[#1e293b] to-[#0f172a]">
      <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] text-white py-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-full h-full bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23ffffff%22 fill-opacity=%220.05%22/></svg>')] opacity-20"></div>
          
          {/* Animated sound waves */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full max-w-md h-24 flex items-center justify-center gap-1 opacity-10">
              {[...Array(40)].map((_, i) => (
                <motion.div
                  key={i}
                  className="h-8 w-1 bg-white rounded-full"
                  animate={{
                    height: [8, Math.random() * 30 + 10, 8],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.05,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </div>
          
          <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-[#8B5CF6]/20 to-transparent blur-3xl"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-tr from-[#3B82F6]/20 to-transparent blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-start justify-between mb-8">
            <Button 
              variant="link" 
              className="text-white hover:text-[#8B5CF6] transition-colors p-0 flex items-center"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            <HomeButton />
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="relative">
                  <div className="absolute -inset-1 bg-[#8B5CF6] rounded-full blur opacity-60"></div>
                  <div className="relative">
                    <Headphones className="h-10 w-10 text-white" />
                  </div>
                </div>
                <h1 className="text-4xl font-bold">Binaural Beats Therapy</h1>
              </div>
              <p className="text-xl text-gray-300">
                Enhance your mental state with scientifically designed audio frequencies
              </p>
            </div>
            
            <Badge 
              variant="outline" 
              className="px-4 py-2 bg-white/10 backdrop-blur-sm border-[#8B5CF6]/50 text-[#A78BFA]"
            >
              <Headphones className="h-4 w-4 mr-2" />
              Use headphones for best results
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
              <TabsList className="h-12 gap-1">
                <TabsTrigger 
                  value="meditation" 
                  className="flex items-center gap-1.5 data-[state=active]:bg-[#8B5CF6] min-w-[110px]"
                >
                  <Brain className="h-4 w-4" />
                  Meditation
                </TabsTrigger>
                <TabsTrigger 
                  value="sleep" 
                  className="flex items-center gap-1.5 data-[state=active]:bg-[#8B5CF6] min-w-[110px]"
                >
                  <Moon className="h-4 w-4" />
                  Sleep
                </TabsTrigger>
                <TabsTrigger 
                  value="focus" 
                  className="flex items-center gap-1.5 data-[state=active]:bg-[#8B5CF6] min-w-[110px]"
                >
                  <ZoomIn className="h-4 w-4" />
                  Focus
                </TabsTrigger>
                <TabsTrigger 
                  value="relax" 
                  className="flex items-center gap-1.5 data-[state=active]:bg-[#8B5CF6] min-w-[110px]"
                >
                  <Laugh className="h-4 w-4" />
                  Relax
                </TabsTrigger>
                <TabsTrigger 
                  value="anxiety" 
                  className="flex items-center gap-1.5 data-[state=active]:bg-[#8B5CF6] min-w-[110px]"
                >
                  <HeartPulse className="h-4 w-4" />
                  Anxiety
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <Button
              variant={showFavorites ? "default" : "outline"}
              size="sm"
              className={`
                ${showFavorites 
                  ? "bg-[#8B5CF6]" 
                  : "text-[#8B5CF6] border-[#8B5CF6]/50"}
              `}
              onClick={() => setShowFavorites(!showFavorites)}
            >
              <Star className={`h-4 w-4 mr-1.5 ${showFavorites ? "fill-white" : ""}`} />
              {showFavorites ? "All Tracks" : "My Favorites"}
            </Button>
          </div>
          
          {/* Tracks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTracks.length > 0 ? (
              filteredTracks.map((track, index) => (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group"
                >
                  <Card className={`overflow-hidden h-full flex flex-col border-[#1e293b] bg-[#1e293b]/50 backdrop-blur-sm hover:bg-[#1e293b]/80 transition-all ${
                    currentTrack?.id === track.id ? "ring-2 ring-[#8B5CF6]" : ""
                  }`}>
                    <div className="relative h-40 overflow-hidden">
                      <img 
                        src={track.imageUrl} 
                        alt={track.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 to-transparent"></div>
                      
                      <div className="absolute top-2 right-2 z-10">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 bg-black/40 backdrop-blur-sm text-white hover:bg-black/60"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(track.id);
                          }}
                        >
                          <Star className={`h-4 w-4 ${favorites.includes(track.id) ? "fill-[#8B5CF6] text-[#8B5CF6]" : ""}`} />
                        </Button>
                      </div>
                      
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-16 w-16 rounded-full bg-[#8B5CF6]/80 text-white hover:bg-[#8B5CF6] backdrop-blur-sm"
                            onClick={() => handleTrackSelect(track)}
                          >
                            {currentTrack?.id === track.id && isPlaying ? (
                              <Pause className="h-8 w-8" />
                            ) : (
                              <Play className="h-8 w-8 ml-1" />
                            )}
                          </Button>
                        </motion.div>
                      </div>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-[#8B5CF6]/70 backdrop-blur-sm text-white">
                            {track.duration}
                          </Badge>
                          
                          <Badge className="bg-black/40 backdrop-blur-sm text-white capitalize">
                            {track.category}
                          </Badge>
                          
                          {track.popular && (
                            <Badge className="bg-[#3B82F6]/70 backdrop-blur-sm text-white">
                              Popular
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <CardHeader className="py-4">
                      <CardTitle className="text-xl font-semibold text-white group-hover:text-[#A78BFA] transition-colors">
                        {track.title}
                      </CardTitle>
                      <CardDescription className="text-gray-300">
                        {track.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="pt-0 pb-4 flex-grow">
                      <div className="space-y-2">
                        <div className="text-sm text-gray-400">
                          <span className="font-medium text-gray-300">Frequency: </span>
                          {track.baseFrequency} Hz ↔ {track.targetFrequency} Hz
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mt-3">
                          {track.effects.map((effect, i) => (
                            <Badge key={i} variant="outline" className="bg-[#1e293b] text-gray-300 border-gray-700">
                              {effect}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="pt-2 border-t border-gray-800">
                      <Button 
                        className="w-full gap-2 bg-[#8B5CF6]/20 hover:bg-[#8B5CF6]/30 text-[#A78BFA]"
                        onClick={() => handleTrackSelect(track)}
                      >
                        {currentTrack?.id === track.id && isPlaying ? (
                          <>
                            <Pause className="h-4 w-4" />
                            Pause
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4" />
                            Play
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <Music className="h-16 w-16 text-gray-700 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No tracks found</h3>
                <p className="text-gray-400 mb-6">
                  {showFavorites 
                    ? "You haven't added any favorites yet. Browse categories and star the tracks you like."
                    : "No tracks found in this category. Try a different category or check back later."}
                </p>
                {showFavorites && (
                  <Button 
                    variant="outline" 
                    onClick={() => setShowFavorites(false)}
                  >
                    Browse All Tracks
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Music Player Fixed at Bottom */}
      <div className={`fixed bottom-0 left-0 right-0 backdrop-blur-lg transition-all duration-500 ease-in-out z-20 ${
        currentTrack ? "translate-y-0" : "translate-y-full"
      }`}>
        <div className="bg-[#1e293b]/90 border-t border-gray-800 text-white p-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-4">
              {/* Track Info */}
              <div className="flex items-center flex-grow gap-4">
                {currentTrack && (
                  <>
                    <div className="relative h-16 w-16 rounded-md overflow-hidden">
                      <img 
                        src={currentTrack.imageUrl} 
                        alt={currentTrack.title}
                        className="h-full w-full object-cover"
                      />
                      {isPlaying && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                          <div className="flex items-center gap-1">
                            {[...Array(3)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="h-8 w-1 bg-[#8B5CF6] rounded-full"
                                animate={{
                                  height: [8, 16, 8],
                                }}
                                transition={{
                                  duration: 0.6,
                                  repeat: Infinity,
                                  delay: i * 0.2,
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-white flex items-center gap-2">
                        {currentTrack.title}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 rounded-full"
                          onClick={() => toggleFavorite(currentTrack.id)}
                        >
                          <Star className={`h-4 w-4 ${favorites.includes(currentTrack.id) ? "fill-[#8B5CF6] text-[#8B5CF6]" : "text-gray-400"}`} />
                        </Button>
                      </h3>
                      <p className="text-sm text-gray-400 flex items-center gap-2">
                        {getCategoryIcon(currentTrack.category)}
                        <span className="capitalize">{currentTrack.category}</span>
                        <span className="text-gray-500">•</span>
                        <span>{currentTrack.duration}</span>
                      </p>
                    </div>
                  </>
                )}
              </div>
              
              {/* Controls */}
              <div className="flex-grow max-w-xl">
                <div className="flex items-center justify-center gap-4 mb-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8 text-gray-400 hover:text-white"
                    onClick={handlePrevTrack}
                  >
                    <SkipBack className="h-5 w-5" />
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-12 w-12 rounded-full bg-[#8B5CF6] text-white hover:bg-[#A78BFA]"
                    onClick={togglePlay}
                  >
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8 text-gray-400 hover:text-white"
                    onClick={handleNextTrack}
                  >
                    <SkipForward className="h-5 w-5" />
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className={`h-8 w-8 ${timerActive ? "text-[#8B5CF6]" : "text-gray-400 hover:text-white"}`}
                    onClick={startTimer}
                  >
                    <Timer className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 w-10 text-right">
                    {formatTime(currentTime)}
                  </span>
                  
                  <Slider
                    value={[currentTime]}
                    max={duration || 100}
                    step={1}
                    className="flex-grow"
                    onValueChange={handleSeek}
                  />
                  
                  <span className="text-xs text-gray-400 w-10">
                    {formatTime(duration)}
                  </span>
                </div>
              </div>
              
              {/* Volume */}
              <div className="flex items-center gap-2 w-full md:w-auto">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-8 w-8 text-gray-400 hover:text-white"
                >
                  {volume === 0 ? (
                    <VolumeX className="h-5 w-5" />
                  ) : volume < 50 ? (
                    <Volume1 className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </Button>
                
                <Slider
                  value={[volume]}
                  max={100}
                  step={1}
                  className="w-24"
                  onValueChange={handleVolumeChange}
                />
                
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-8 w-8 text-gray-400 hover:text-white"
                  onClick={() => setShowMoreInfo(!showMoreInfo)}
                >
                  <ChevronDown className={`h-5 w-5 transition-transform ${showMoreInfo ? "rotate-180" : ""}`} />
                </Button>
              </div>
            </div>
            
            {/* Expanded Info */}
            {showMoreInfo && currentTrack && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="mt-4 pt-4 border-t border-gray-800"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-2">About This Frequency</h4>
                    <p className="text-sm text-gray-400">{currentTrack.description}</p>
                    
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Benefits</h4>
                      <ul className="text-sm text-gray-400 space-y-1">
                        {currentTrack.effects.map((effect, i) => (
                          <li key={i} className="flex items-start">
                            <div className="text-[#8B5CF6] mr-2">•</div>
                            <span>{effect}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Sleep Timer</h4>
                      <div className="flex items-center gap-3">
                        <Slider
                          value={[timerDuration]}
                          min={5}
                          max={120}
                          step={5}
                          className="flex-grow"
                          onValueChange={(value) => setTimerDuration(value[0])}
                          disabled={timerActive}
                        />
                        <span className="text-sm text-gray-400 w-16">
                          {timerDuration} min
                        </span>
                        <Button 
                          variant={timerActive ? "default" : "outline"}
                          size="sm"
                          className={timerActive ? "bg-[#8B5CF6]" : ""}
                          onClick={startTimer}
                        >
                          {timerActive ? "Cancel" : "Start"}
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Pro Tips</h4>
                      <div className="bg-[#0f172a] rounded-md p-3 space-y-2">
                        <p className="text-sm text-gray-400 flex items-start">
                          <Headphones className="h-4 w-4 mr-2 mt-0.5 text-[#8B5CF6]" />
                          <span>Use stereo headphones for optimal binaural effect</span>
                        </p>
                        <p className="text-sm text-gray-400 flex items-start">
                          <Moon className="h-4 w-4 mr-2 mt-0.5 text-[#8B5CF6]" />
                          <span>Dimming lights enhances the relaxation experience</span>
                        </p>
                        <p className="text-sm text-gray-400 flex items-start">
                          <Repeat className="h-4 w-4 mr-2 mt-0.5 text-[#8B5CF6]" />
                          <span>Regular practice yields better long-term benefits</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BinauralBeats;
