
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { getMoodPlaylists } from "./utils/playlistData";
import { useAudioPlayer } from "./hooks/useAudioPlayer";
import NowPlaying from "./NowPlaying";
import PlaylistTracks from "./PlaylistTracks";

interface MoodPlaylistGeneratorProps {
  currentMood: string;
  className?: string;
}

const MoodPlaylistGenerator: React.FC<MoodPlaylistGeneratorProps> = ({ currentMood, className = "" }) => {
  const [currentTrack, setCurrentTrack] = useState<number>(0);
  
  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    audioError,
    setIsPlaying,
    setVolume,
    handlePlayPause,
    playAudio
  } = useAudioPlayer({ currentMood, currentTrack });
  
  // Reset current track when mood changes
  useEffect(() => {
    setCurrentTrack(0);
  }, [currentMood]);
  
  const handleNextTrack = () => {
    const playlist = getMoodPlaylists(currentMood);
    const nextTrack = (currentTrack + 1) % playlist.length;
    setCurrentTrack(nextTrack);
  };
  
  const handleTrackSelect = (index: number) => {
    setCurrentTrack(index);
    setIsPlaying(true);
    // We need to let the useEffect in the hook update the audio source first
    setTimeout(() => playAudio(), 50);
  };
  
  const handleVolumeChange = (values: number[]) => {
    setVolume(values[0]);
  };
  
  const playlist = getMoodPlaylists(currentMood);
  const currentSong = playlist[currentTrack];
  
  return (
    <Card className={`p-4 bg-black/30 backdrop-blur-sm ${className}`}>
      <NowPlaying 
        currentSong={currentSong}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        audioError={audioError}
        onPlayPause={handlePlayPause}
        onNextTrack={handleNextTrack}
        onVolumeChange={handleVolumeChange}
      />
      
      <PlaylistTracks 
        tracks={playlist}
        currentTrack={currentTrack}
        audioError={audioError}
        currentMood={currentMood}
        onTrackSelect={handleTrackSelect}
      />
      
      {audioError && (
        <div className="text-xs text-red-400 mt-1 px-2 py-1 bg-red-500/10 rounded">
          There was an issue playing this track. Try another track or station.
        </div>
      )}
    </Card>
  );
};

export default MoodPlaylistGenerator;
