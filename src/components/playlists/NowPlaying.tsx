
import React from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipForward, Volume2, Music } from "lucide-react";
import { formatTime } from "./utils/playlistData";

interface NowPlayingProps {
  currentSong: { title: string; artist: string; duration: string };
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  audioError: boolean;
  onPlayPause: () => void;
  onNextTrack: () => void;
  onVolumeChange: (value: number[]) => void;
}

const NowPlaying: React.FC<NowPlayingProps> = ({
  currentSong,
  isPlaying,
  currentTime,
  duration,
  volume,
  audioError,
  onPlayPause,
  onNextTrack,
  onVolumeChange
}) => {
  return (
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
            onClick={onPlayPause}
            title={audioError ? "Error - try again" : isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20"
            onClick={onNextTrack}
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
          onValueChange={onVolumeChange}
          className="w-20 md:w-28"
        />
      </div>
    </div>
  );
};

export default NowPlaying;
