import { MirrorAiChat } from "@/components/mirror-ai/MirrorAiChat";

const MirrorAI = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 py-8">
      <div className="container mx-auto">
        <MirrorAiChat />
      </div>
    </div>
  );
};

export default MirrorAI;