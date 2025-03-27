
// Mock playlist data
export const getMoodPlaylists = (mood: string) => {
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
export const getMockAudioUrl = (mood: string) => {
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

// Fallback audio URL for when mood-based audio fails
export const FALLBACK_AUDIO_URL = "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3";

// Helper function to format time in minutes:seconds
export const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};
