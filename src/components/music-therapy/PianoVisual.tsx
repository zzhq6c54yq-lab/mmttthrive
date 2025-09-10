import React from 'react';

interface PianoVisualProps {
  activeNotes: Set<string>;
  onNotePress: (note: string, isKeyDown: boolean) => void;
  octave: number;
}

const PianoVisual: React.FC<PianoVisualProps> = ({ activeNotes, onNotePress, octave }) => {
  const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const blackKeys = ['C#', 'D#', null, 'F#', 'G#', 'A#', null];

  const getNoteName = (key: string) => `${key}${octave}`;

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Piano body */}
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-t-lg p-4 shadow-2xl">
        <div className="relative h-48">
          {/* White keys */}
          <div className="flex h-full gap-1">
            {whiteKeys.map((key, index) => {
              const noteName = getNoteName(key);
              const isActive = activeNotes.has(noteName);
              
              return (
                <button
                  key={key}
                  className={`flex-1 h-full rounded-b-lg border-2 transition-all duration-150 ${
                    isActive 
                      ? 'bg-primary/60 border-primary transform scale-95 shadow-inner' 
                      : 'bg-white border-gray-300 hover:bg-gray-50 shadow-lg'
                  }`}
                  onMouseDown={() => onNotePress(noteName, true)}
                  onMouseUp={() => onNotePress(noteName, false)}
                  onMouseLeave={() => onNotePress(noteName, false)}
                  onTouchStart={() => onNotePress(noteName, true)}
                  onTouchEnd={() => onNotePress(noteName, false)}
                >
                  <span className={`block mt-auto mb-4 text-sm font-mono ${
                    isActive ? 'text-white' : 'text-gray-800'
                  }`}>
                    {key}
                  </span>
                </button>
              );
            })}
          </div>
          
          {/* Black keys */}
          <div className="absolute top-0 left-0 right-0 flex h-32">
            {blackKeys.map((key, index) => {
              if (!key) {
                return <div key={index} className="flex-1" />;
              }
              
              const noteName = getNoteName(key);
              const isActive = activeNotes.has(noteName);
              
              return (
                <div key={index} className="flex-1 relative">
                  <button
                    className={`absolute left-1/2 transform -translate-x-1/2 w-8 h-full rounded-b-md transition-all duration-150 ${
                      isActive 
                        ? 'bg-primary/80 shadow-inner transform scale-95' 
                        : 'bg-gray-900 hover:bg-gray-800 shadow-md'
                    }`}
                    onMouseDown={() => onNotePress(noteName, true)}
                    onMouseUp={() => onNotePress(noteName, false)}
                    onMouseLeave={() => onNotePress(noteName, false)}
                    onTouchStart={() => onNotePress(noteName, true)}
                    onTouchEnd={() => onNotePress(noteName, false)}
                  >
                    <span className="block mt-auto mb-4 text-xs font-mono text-white">
                      {key.replace('#', '♯')}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Piano legs */}
      <div className="flex justify-between px-8">
        <div className="w-4 h-8 bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-md"></div>
        <div className="w-4 h-8 bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-md"></div>
      </div>
    </div>
  );
};

export default PianoVisual;