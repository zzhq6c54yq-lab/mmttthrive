
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music } from "lucide-react";

interface MoodPlaylistGeneratorProps {
  mood?: string;
  onClose?: () => void;
}

const MoodPlaylistGenerator: React.FC<MoodPlaylistGeneratorProps> = ({ mood = "calm", onClose }) => {
  return (
    <Card className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-500/20">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Music className="mr-2 h-5 w-5 text-purple-400" />
          Mood-Based Playlist
        </CardTitle>
        <CardDescription>
          Music tailored to your current mood
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-2">
          <p className="mb-4">Generate a playlist based on your {mood} mood</p>
          {onClose && (
            <Button 
              variant="outline" 
              onClick={onClose}
              className="mt-2"
            >
              Close
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodPlaylistGenerator;
