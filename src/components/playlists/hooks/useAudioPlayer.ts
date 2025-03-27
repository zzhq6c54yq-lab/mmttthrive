
import { useState, useRef, useEffect } from "react";
import { getMockAudioUrl, FALLBACK_AUDIO_URL } from "../utils/playlistData";
import { useToast } from "@/hooks/use-toast";

export interface UseAudioPlayerProps {
  currentMood: string;
  currentTrack: number;
}

export const useAudioPlayer = ({ currentMood, currentTrack }: UseAudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
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
      if (audio.src !== FALLBACK_AUDIO_URL) {
        audio.src = FALLBACK_AUDIO_URL;
        audio.load();
      }
    };
    
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("error", handleError);
    
    // Clean up event listeners
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("error", handleError);
    };
  }, [toast, audioError]);
  
  // When currentMood changes, reset the player
  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
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
      audio.src = moodAudio || FALLBACK_AUDIO_URL;
      audio.load();
      audio.volume = volume / 100;
      
      if (isPlaying) {
        playAudio();
      }
    } catch (error) {
      console.error("Failed to set audio source:", error);
      audio.src = FALLBACK_AUDIO_URL;
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
            audioRef.current.src = FALLBACK_AUDIO_URL;
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
  
  const handleEnded = () => {
    setIsPlaying(false);
  };
  
  // Add the ended event listener
  useEffect(() => {
    if (!audioRef.current) return;
    
    const audio = audioRef.current;
    audio.addEventListener("ended", handleEnded);
    
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);
  
  return {
    isPlaying,
    currentTime,
    duration,
    volume,
    audioError,
    setIsPlaying,
    setVolume,
    handlePlayPause,
    playAudio
  };
};
