
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipForward, Volume2, Music } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock playlist data
const getMoodPlaylists = (mood: string) => {
  const playlists = {
    happy: [
      { title: "Walking on Sunshine", artist: "Katrina & The Waves", duration: "3:45" },
      { title: "Happy", artist: "Pharrell Williams", duration: "3:53" },
      { title: "Good Vibrations", artist: "The Beach Boys", duration: "3:36" },
    ],
    sad: [
      { title: "Someone Like You", artist: "Adele", duration: "4:45" },
      { title: "Hurt", artist: "Johnny Cash", duration: "3:38" },
      { title: "Fix You", artist: "Coldplay", duration: "4:55" },
    ],
    neutral: [
      { title: "Weightless", artist: "Marconi Union", duration: "8:10" },
      { title: "Gymnopédie No.1", artist: "Erik Satie", duration: "3:05" },
      { title: "Watermark", artist: "Enya", duration: "2:26" },
    ],
    overwhelmed: [
      { title: "Breathe", artist: "Télépopmusik", duration: "4:40" },
      { title: "Teardrop", artist: "Massive Attack", duration: "5:30" },
      { title: "Everything In Its Right Place", artist: "Radiohead", duration: "4:11" },
    ],
    focus: [
      { title: "Brain Waves Alpha", artist: "Meditation Music", duration: "10:15" },
      { title: "Deep Focus", artist: "Study Music", duration: "8:30" },
      { title: "Concentration", artist: "Focus Lab", duration: "9:45" },
    ],
    relaxation: [
      { title: "Ocean Waves", artist: "Nature Sounds", duration: "12:20" },
      { title: "Sunset Meditation", artist: "Relaxation Masters", duration: "8:15" },
      { title: "Gentle Rain", artist: "Nature Therapy", duration: "15:30" },
    ],
    uplift: [
      { title: "Walking on Sunshine", artist: "Katrina & The Waves", duration: "3:45" },
      { title: "Happy", artist: "Pharrell Williams", duration: "3:53" },
      { title: "Dancing Queen", artist: "ABBA", duration: "3:51" },
    ],
    sleep: [
      { title: "Dream State", artist: "Sleep Sounds", duration: "45:00" },
      { title: "Night Forest", artist: "Sleep Well", duration: "60:00" },
      { title: "Lullaby", artist: "Sleep Therapy", duration: "30:00" },
    ]
  };
  
  // Return the playlist for the requested mood or a default one
  return playlists[mood as keyof typeof playlists] || playlists.neutral;
};

// Mock audio URLs
const getMockAudioUrl = (mood: string) => {
  const audioFiles: Record<string, string> = {
    happy: "https://cdn.freesound.org/previews/648/648899_13686955-lq.mp3",
    sad: "https://cdn.freesound.org/previews/612/612095_5674468-lq.mp3",
    neutral: "https://cdn.freesound.org/previews/452/452593_9098894-lq.mp3",
    overwhelmed: "https://cdn.freesound.org/previews/417/417486_5121236-lq.mp3",
    focus: "https://cdn.freesound.org/previews/571/571324_7493294-lq.mp3",
    relaxation: "https://cdn.freesound.org/previews/649/649109_5674468-lq.mp3",
    uplift: "https://cdn.freesound.org/previews/353/353925_5450487-lq.mp3",
    sleep: "https://cdn.freesound.org/previews/453/453483_9098894-lq.mp3"
  };
  
  return audioFiles[mood] || audioFiles.neutral;
};

interface MoodPlaylistGeneratorProps {
  currentMood: string;
  className?: string;
}

const MoodPlaylistGenerator: React.FC<MoodPlaylistGeneratorProps> = ({ currentMood, className = "" }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState<number>(0);
  const [volume, setVolume] = useState<number>(80);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [audioError, setAudioError] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();
  
  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.crossOrigin = "anonymous"; // Help with CORS issues
    }
    
    return () => {
      // Clean up audio on unmount
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, []);
  
  // Set up audio event listeners
  useEffect(() => {
    if (!audioRef.current) return;
    
    const audio = audioRef.current;
    
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };
    
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setAudioError(false);
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
      handleNextTrack();
    };
    
    const handleError = (e: Event) => {
      console.error("Error playing audio:", e);
      setIsPlaying(false);
      setAudioError(true);
      
      // Only show toast once per error to avoid repetitive notifications
      if (!audioError) {
        toast({
          title: "Playback Error",
          description: "Unable to play this track. Using fallback audio.",
          variant: "destructive",
        });
      }
      
      // Try using a fallback audio source
      if (audio.src !== "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3") {
        audio.src = "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3";
        audio.load();
      }
    };
    
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);
    
    // Clean up event listeners
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, [toast, audioError]);
  
  // When currentMood changes, reset the player
  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
    setCurrentTrack(0);
    setAudioError(false);
  }, [currentMood, isPlaying]);
  
  // Update audio source when currentTrack changes
  useEffect(() => {
    if (!audioRef.current) return;
    
    setAudioError(false);
    const audio = audioRef.current;
    
    // Try to use the actual mood-based audio or fallback to the reliable source
    try {
      const moodAudio = getMockAudioUrl(currentMood);
      audio.src = moodAudio || "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3";
      audio.load();
      audio.volume = volume / 100;
      
      if (isPlaying) {
        playAudio();
      }
    } catch (error) {
      console.error("Failed to set audio source:", error);
      audio.src = "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3";
      audio.load();
    }
  }, [currentTrack, currentMood, isPlaying, volume]);
  
  // Handle volume change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);
  
  const playAudio = () => {
    if (!audioRef.current) return;
    
    const playPromise = audioRef.current.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setAudioError(false);
        })
        .catch(error => {
          console.error("Playback error:", error);
          setIsPlaying(false);
          setAudioError(true);
          
          // Try fallback audio source
          if (audioRef.current) {
            audioRef.current.src = "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3";
            audioRef.current.load();
            
            // Try to play fallback audio
            const fallbackPlayPromise = audioRef.current.play();
            if (fallbackPlayPromise !== undefined) {
              fallbackPlayPromise
                .then(() => {
                  setIsPlaying(true);
                  setAudioError(false);
                })
                .catch(fallbackError => {
                  console.error("Fallback playback error:", fallbackError);
                  // Don't show repeated errors
                  if (!audioError) {
                    toast({
                      title: "Audio Playback Issue",
                      description: "Please click the play button again or try another station.",
                      variant: "destructive",
                    });
                  }
                });
            }
          }
        });
    }
  };
  
  const handlePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      playAudio();
    }
  };
  
  const handleNextTrack = () => {
    const playlist = getMoodPlaylists(currentMood);
    const nextTrack = (currentTrack + 1) % playlist.length;
    setCurrentTrack(nextTrack);
    setAudioError(false);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const playlist = getMoodPlaylists(currentMood);
  const currentSong = playlist[currentTrack];
  
  return (
    <Card className={`p-4 bg-black/30 backdrop-blur-sm ${className}`}>
      <div className="flex flex-col space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Music className="h-5 w-5 mr-2 text-primary" />
            <div>
              <p className="font-medium text-white">{currentSong.title}</p>
              <p className="text-xs text-white/70">{currentSong.artist}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className={`h-8 w-8 rounded-full ${audioError ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' : 'bg-primary/20 text-primary hover:bg-primary/30'}`}
              onClick={handlePlayPause}
              title={audioError ? "Error - try again" : isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20"
              onClick={handleNextTrack}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="space-y-1">
          <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <div 
              className={`h-full ${audioError ? 'bg-red-500' : 'bg-primary'} transition-all duration-100`}
              style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-white/70">
            <span>{formatTime(currentTime)}</span>
            <span>{currentSong.duration}</span>
          </div>
        </div>
        
        {/* Volume control */}
        <div className="flex items-center space-x-2">
          <Volume2 className="h-4 w-4 text-white/70" />
          <Slider
            value={[volume]}
            max={100}
            step={1}
            onValueChange={(values) => setVolume(values[0])}
            className="w-20 md:w-28"
          />
        </div>
        
        {/* Playlist */}
        <div className="mt-2">
          <p className="text-xs text-white/70 uppercase tracking-wider mb-2">Playlist: {currentMood}</p>
          <div className="space-y-1">
            {playlist.map((track, index) => (
              <div 
                key={index} 
                className={`text-xs p-2 rounded cursor-pointer flex justify-between items-center ${
                  index === currentTrack ? (audioError ? 'bg-red-500/20 text-red-500' : 'bg-primary/20 text-primary') : 'hover:bg-white/10'
                }`}
                onClick={() => {
                  setCurrentTrack(index);
                  setAudioError(false);
                  setIsPlaying(true);
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-4 text-center">{index + 1}</span>
                  <span>{track.title}</span>
                </div>
                <span>{track.duration}</span>
              </div>
            ))}
          </div>
        </div>
        
        {audioError && (
          <div className="text-xs text-red-400 mt-1 px-2 py-1 bg-red-500/10 rounded">
            There was an issue playing this track. Try another track or station.
          </div>
        )}
      </div>
    </Card>
  );
};

export default MoodPlaylistGenerator;
