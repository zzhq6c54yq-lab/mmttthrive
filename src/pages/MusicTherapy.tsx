import React, { useState, useEffect, useRef } from "react";
import * as Tone from "tone";
import Page from "@/components/Page";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Pause, 
  Square, 
  Volume2, 
  Mic, 
  Download,
  Music,
  Brain,
  Heart,
  Waves,
  RotateCcw,
  Settings
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import musicTherapyCover from "@/assets/music-therapy-cover.png";

interface RecordedTrack {
  id: string;
  name: string;
  buffer: Tone.Player;
  instrument: string;
  timestamp: Date;
}

interface AudioEffect {
  id: string;
  name: string;
  type: 'reverb' | 'delay' | 'filter' | 'distortion';
  enabled: boolean;
  settings: Record<string, number>;
}

const MusicTherapy = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [volume, setVolume] = useState(-20);
  const [currentInstrument, setCurrentInstrument] = useState("synth");
  const [activeNotes, setActiveNotes] = useState<Set<string>>(new Set());
  const [recordedTracks, setRecordedTracks] = useState<RecordedTrack[]>([]);
  const [currentBPM, setBPM] = useState(120);
  const [effects, setEffects] = useState<AudioEffect[]>([
    { id: 'reverb', name: 'Reverb', type: 'reverb', enabled: false, settings: { roomSize: 0.8, decay: 2 } },
    { id: 'delay', name: 'Delay', type: 'delay', enabled: false, settings: { time: 0.25, feedback: 0.3 } },
    { id: 'filter', name: 'Filter', type: 'filter', enabled: false, settings: { frequency: 1000, Q: 1 } }
  ]);

  const synthRef = useRef<Tone.PolySynth | null>(null);
  const reverbRef = useRef<Tone.Reverb | null>(null);
  const delayRef = useRef<Tone.FeedbackDelay | null>(null);
  const filterRef = useRef<Tone.Filter | null>(null);
  const recorderRef = useRef<Tone.Recorder | null>(null);

  const notes = ["C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4", "C5"];
  const drumPads = ["kick", "snare", "hihat", "clap", "openhat", "crash", "ride", "tom"];

  const instruments = [
    { value: "synth", label: "Synthesizer", color: "bg-blue-500" },
    { value: "piano", label: "Piano", color: "bg-purple-500" },
    { value: "violin", label: "Violin", color: "bg-green-500" },
    { value: "guitar", label: "Guitar", color: "bg-orange-500" },
    { value: "drums", label: "Drums", color: "bg-red-500" }
  ];

  useEffect(() => {
    setupAudio();
    return () => {
      cleanupAudio();
    };
  }, []);

  useEffect(() => {
    if (synthRef.current) {
      Tone.Destination.volume.value = volume;
    }
  }, [volume]);

  const setupAudio = async () => {
    await Tone.start();
    
    // Setup synthesis chain
    synthRef.current = new Tone.PolySynth().toDestination();
    reverbRef.current = new Tone.Reverb(2).toDestination();
    delayRef.current = new Tone.FeedbackDelay("8n", 0.3).toDestination();
    filterRef.current = new Tone.Filter(1000, "lowpass").toDestination();
    recorderRef.current = new Tone.Recorder();

    // Connect effects chain
    synthRef.current.connect(reverbRef.current);
    synthRef.current.connect(delayRef.current);
    synthRef.current.connect(filterRef.current);
    synthRef.current.connect(recorderRef.current);

    Tone.Transport.bpm.value = currentBPM;
  };

  const cleanupAudio = () => {
    synthRef.current?.dispose();
    reverbRef.current?.dispose();
    delayRef.current?.dispose();
    filterRef.current?.dispose();
    recorderRef.current?.dispose();
  };

  const playNote = async (note: string, duration = "8n") => {
    if (!synthRef.current) return;

    await Tone.start();
    
    try {
      if (currentInstrument === "synth") {
        synthRef.current.triggerAttackRelease(note, duration);
      } else if (currentInstrument === "piano") {
        const synth = new Tone.Synth({
          oscillator: { type: "sine" },
          envelope: { attack: 0.005, decay: 0.1, sustain: 0.3, release: 1 }
        }).toDestination();
        synth.triggerAttackRelease(note, duration);
      } else if (currentInstrument === "drums") {
        const drumSynth = new Tone.MembraneSynth().toDestination();
        drumSynth.triggerAttackRelease(note, duration);
      }

      setActiveNotes(prev => new Set([...prev, note]));
      setTimeout(() => {
        setActiveNotes(prev => {
          const newSet = new Set(prev);
          newSet.delete(note);
          return newSet;
        });
      }, Tone.Time(duration).toMilliseconds());

    } catch (error) {
      console.error("Error playing note:", error);
      toast.error("Failed to play note");
    }
  };

  const playDrum = async (drumType: string) => {
    await Tone.start();
    
    try {
      let synth;
      
      switch (drumType) {
        case "kick":
          synth = new Tone.MembraneSynth().toDestination();
          synth.triggerAttackRelease("C1", "8n");
          break;
        case "snare":
          synth = new Tone.NoiseSynth().toDestination();
          synth.triggerAttackRelease("8n");
          break;
        case "hihat":
          synth = new Tone.NoiseSynth({
            noise: { type: "white" },
            envelope: { attack: 0.005, decay: 0.1, sustain: 0 }
          }).toDestination();
          synth.triggerAttackRelease("32n");
          break;
        case "clap":
          synth = new Tone.NoiseSynth().toDestination();
          synth.triggerAttackRelease("16n");
          break;
        default:
          synth = new Tone.Synth().toDestination();
          synth.triggerAttackRelease("C4", "8n");
      }
    } catch (error) {
      console.error("Error playing drum:", error);
      toast.error("Failed to play drum");
    }
  };

  const startRecording = async () => {
    if (!recorderRef.current) return;
    
    try {
      setIsRecording(true);
      recorderRef.current.start();
      toast.success("Recording started");
    } catch (error) {
      console.error("Recording error:", error);
      toast.error("Failed to start recording");
      setIsRecording(false);
    }
  };

  const stopRecording = async () => {
    if (!recorderRef.current || !isRecording) return;
    
    try {
      const recording = await recorderRef.current.stop();
      const url = URL.createObjectURL(recording);
      const buffer = new Tone.Player(url);
      
      const newTrack: RecordedTrack = {
        id: Date.now().toString(),
        name: `Track ${recordedTracks.length + 1}`,
        buffer,
        instrument: currentInstrument,
        timestamp: new Date()
      };
      
      setRecordedTracks(prev => [...prev, newTrack]);
      setIsRecording(false);
      toast.success("Recording saved");
    } catch (error) {
      console.error("Error stopping recording:", error);
      toast.error("Failed to save recording");
      setIsRecording(false);
    }
  };

  const playTrack = (track: RecordedTrack) => {
    track.buffer.start();
    setIsPlaying(true);
    
    track.buffer.onstop = () => setIsPlaying(false);
  };

  const toggleEffect = (effectId: string) => {
    setEffects(prev => prev.map(effect => 
      effect.id === effectId 
        ? { ...effect, enabled: !effect.enabled }
        : effect
    ));

    // Apply effects to audio chain
    const effect = effects.find(e => e.id === effectId);
    if (!effect) return;

    switch (effect.type) {
      case 'reverb':
        if (reverbRef.current) {
          reverbRef.current.wet.value = effect.enabled ? 0 : 0.3;
        }
        break;
      case 'delay':
        if (delayRef.current) {
          delayRef.current.wet.value = effect.enabled ? 0 : 0.2;
        }
        break;
      case 'filter':
        if (filterRef.current) {
          filterRef.current.frequency.value = effect.enabled ? 20000 : effect.settings.frequency;
        }
        break;
    }
  };

  const downloadTrack = (track: RecordedTrack) => {
    // This would typically convert the buffer to a downloadable format
    toast.success(`Downloading ${track.name}`);
  };

  return (
    <Page 
      title="Music Therapy Studio" 
      showBackButton
    >
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-xl">
            <img 
              src={musicTherapyCover} 
              alt="Music Therapy" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-4xl font-bold mb-2">ThriveSound Studio</h1>
              <p className="text-lg opacity-90">Therapeutic Music Creation & Healing</p>
            </div>
          </div>
        </motion.div>

        {/* Control Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Studio Controls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Instrument Selector */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Instrument</label>
                <Select value={currentInstrument} onValueChange={setCurrentInstrument}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {instruments.map(instrument => (
                      <SelectItem key={instrument.value} value={instrument.value}>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${instrument.color}`} />
                          {instrument.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Volume Control */}
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Volume2 className="w-4 h-4" />
                  Volume: {volume} dB
                </label>
                <Slider
                  value={[volume]}
                  onValueChange={(value) => setVolume(value[0])}
                  min={-60}
                  max={0}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* BPM Control */}
              <div className="space-y-2">
                <label className="text-sm font-medium">BPM: {currentBPM}</label>
                <Slider
                  value={[currentBPM]}
                  onValueChange={(value) => {
                    setBPM(value[0]);
                    Tone.Transport.bpm.value = value[0];
                  }}
                  min={60}
                  max={180}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Recording Controls */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Recording</label>
                <div className="flex gap-2">
                  <Button
                    variant={isRecording ? "destructive" : "default"}
                    size="sm"
                    onClick={isRecording ? stopRecording : startRecording}
                    className="flex-1"
                  >
                    {isRecording ? <Square className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="keyboard" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="keyboard">Keyboard</TabsTrigger>
            <TabsTrigger value="drums">Drums</TabsTrigger>
            <TabsTrigger value="effects">Effects</TabsTrigger>
            <TabsTrigger value="tracks">Recordings</TabsTrigger>
          </TabsList>

          {/* Piano Keyboard */}
          <TabsContent value="keyboard">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Music className="w-5 h-5" />
                  Virtual Keyboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-13 gap-1 max-w-4xl mx-auto">
                  {notes.map((note, index) => {
                    const isSharp = note.includes("#");
                    const isActive = activeNotes.has(note);
                    
                    return (
                      <motion.button
                        key={note}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => playNote(note)}
                        className={`
                          relative h-32 rounded-lg font-medium text-sm transition-all duration-150
                          ${isSharp 
                            ? `bg-gray-800 text-white h-20 -mx-2 z-10 ${isActive ? 'bg-purple-600' : 'hover:bg-gray-700'}`
                            : `bg-white border-2 border-gray-200 text-gray-800 ${isActive ? 'bg-blue-100 border-blue-400' : 'hover:bg-gray-50'}`
                          }
                        `}
                      >
                        {note}
                      </motion.button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Drum Pads */}
          <TabsContent value="drums">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Waves className="w-5 h-5" />
                  Drum Pads
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
                  {drumPads.map((drum) => (
                    <motion.button
                      key={drum}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => playDrum(drum)}
                      className="aspect-square bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-bold text-lg shadow-lg transition-all duration-150"
                    >
                      {drum.toUpperCase()}
                    </motion.button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Effects Panel */}
          <TabsContent value="effects">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Audio Effects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {effects.map((effect) => (
                    <div key={effect.id} className="space-y-4 p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{effect.name}</h4>
                        <Button
                          variant={effect.enabled ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleEffect(effect.id)}
                        >
                          {effect.enabled ? "ON" : "OFF"}
                        </Button>
                      </div>
                      {effect.enabled && (
                        <div className="space-y-2">
                          {Object.entries(effect.settings).map(([key, value]) => (
                            <div key={key}>
                              <label className="text-xs text-muted-foreground">{key}</label>
                              <Slider
                                value={[value]}
                                onValueChange={(newValue) => {
                                  setEffects(prev => prev.map(e => 
                                    e.id === effect.id 
                                      ? { ...e, settings: { ...e.settings, [key]: newValue[0] } }
                                      : e
                                  ));
                                }}
                                min={0}
                                max={key === 'frequency' ? 5000 : 2}
                                step={0.1}
                                className="w-full"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Recorded Tracks */}
          <TabsContent value="tracks">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Your Recordings
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recordedTracks.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Mic className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No recordings yet. Start creating!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recordedTracks.map((track) => (
                      <div key={track.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{track.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {track.instrument} • {track.timestamp.toLocaleString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => playTrack(track)}>
                            <Play className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => downloadTrack(track)}>
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Therapeutic Benefits */}
        <Card>
          <CardHeader>
            <CardTitle>Therapeutic Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center space-y-2">
                <Brain className="w-8 h-8 mx-auto text-blue-600" />
                <h4 className="font-medium">Cognitive Enhancement</h4>
                <p className="text-sm text-muted-foreground">Improve memory, focus, and mental clarity through musical expression</p>
              </div>
              <div className="text-center space-y-2">
                <Heart className="w-8 h-8 mx-auto text-red-500" />
                <h4 className="font-medium">Emotional Regulation</h4>
                <p className="text-sm text-muted-foreground">Process emotions and reduce stress through creative musical outlets</p>
              </div>
              <div className="text-center space-y-2">
                <Waves className="w-8 h-8 mx-auto text-green-600" />
                <h4 className="font-medium">Relaxation & Healing</h4>
                <p className="text-sm text-muted-foreground">Promote relaxation and healing through guided musical therapy</p>
              </div>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </Page>
  );
};

export default MusicTherapy;