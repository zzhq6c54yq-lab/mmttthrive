
import React from "react";

interface Track {
  title: string;
  artist: string;
  duration: string;
}

interface PlaylistTracksProps {
  tracks: Track[];
  currentTrack: number;
  audioError: boolean;
  currentMood: string;
  onTrackSelect: (index: number) => void;
}

const PlaylistTracks: React.FC<PlaylistTracksProps> = ({
  tracks,
  currentTrack,
  audioError,
  currentMood,
  onTrackSelect
}) => {
  return (
    <div className="mt-2">
      <p className="text-xs text-white/70 uppercase tracking-wider mb-2">Playlist: {currentMood}</p>
      <div className="space-y-1">
        {tracks.map((track, index) => (
          <div 
            key={index} 
            className={`text-xs p-2 rounded cursor-pointer flex justify-between items-center ${
              index === currentTrack ? (audioError ? 'bg-red-500/20 text-red-500' : 'bg-primary/20 text-primary') : 'hover:bg-white/10'
            }`}
            onClick={() => onTrackSelect(index)}
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
  );
};

export default PlaylistTracks;
