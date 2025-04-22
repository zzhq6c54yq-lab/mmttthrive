
import React, { useState } from "react";
import { Video, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const GenerativeVideoCreator = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt) {
      toast({
        title: "Please enter a prompt",
        description: "Describe what you'd like to generate",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    toast({
      title: "Starting video generation",
      description: "This is a placeholder. Please connect to a video generation API.",
    });

    // Placeholder for API integration
    // This is where you would make the actual API call to generate the video
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedVideoUrl("https://assets.mixkit.co/videos/preview/mixkit-man-under-multicolored-lights-32715-large.mp4");
      toast({
        title: "Video generated",
        description: "This is a placeholder video. Connect to a real API for actual generation.",
      });
    }, 2000);
  };

  return (
    <Card className="bg-black/40 border-white/10">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Video className="h-5 w-5 text-indigo-400" />
          Generate AI Video
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Input
              placeholder="Describe the video you want to generate..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="bg-black/20 border-white/10 text-white"
            />
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500"
          >
            {isGenerating ? (
              "Generating..."
            ) : (
              <>
                <Video className="mr-2 h-4 w-4" />
                Generate Video
              </>
            )}
          </Button>

          {generatedVideoUrl && (
            <div className="mt-4">
              <video
                src={generatedVideoUrl}
                controls
                className="w-full rounded-lg"
                autoPlay
                loop
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GenerativeVideoCreator;
