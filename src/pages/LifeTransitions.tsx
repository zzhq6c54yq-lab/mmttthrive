import { useUser } from "@/contexts/UserContext";
import { useLifeTransitions } from "@/hooks/useLifeTransitions";
import { useProgramImageGeneration } from "@/hooks/useProgramImageGeneration";
import TransitionProgramCard from "@/components/transitions/TransitionProgramCard";
import { TransitionHeroImage } from "@/components/transitions/TransitionHeroImage";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Heart, Book, Briefcase, Baby, Home, Stethoscope, Sun, ArrowLeft, Sparkles, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const iconMap: Record<string, any> = {
  "navigating-divorce": Heart,
  "job-loss-recovery": Briefcase,
  "new-parent-journey": Baby,
  "empty-nest-transition": Home,
  "grief-and-loss": Heart,
  "retirement-preparation": Sun,
  "major-relocation": Home,
  "health-diagnosis": Stethoscope,
};

const LifeTransitions = () => {
  const { user } = useUser();
  const { programs, enrollments, isLoading } = useLifeTransitions(user?.id);
  const { generatedImages, isGenerating, progress, generateAllImages, generateSingleImage } = useProgramImageGeneration();
  const navigate = useNavigate();
  const [regeneratingSlug, setRegeneratingSlug] = useState<string | null>(null);

  const enrolledProgramIds = enrollments?.map(e => e.program_id) || [];

  const handleRegenerateImage = async (slug: string) => {
    setRegeneratingSlug(slug);
    try {
      // Clear cache for this slug first
      localStorage.removeItem(`ai-program-image-${slug}`);
      await generateSingleImage(slug);
    } finally {
      setRegeneratingSlug(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground">Loading life transition programs...</div>
      </div>
    );
  }

  const progressPercent = progress ? (progress.current / progress.total) * 100 : 0;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/app/dashboard')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        {/* AI-Generated Hero Image */}
        <TransitionHeroImage />

        {/* Generate AI Images Button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Button
            onClick={generateAllImages}
            disabled={isGenerating}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate AI Images
              </>
            )}
          </Button>
          
          {isGenerating && progress && (
            <div className="flex-1 max-w-xs space-y-1">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Generating {progress.current} of {progress.total}</span>
                <span>{Math.round(progressPercent)}%</span>
              </div>
              <Progress value={progressPercent} className="h-2" />
            </div>
          )}
        </div>

        {/* Enrolled Programs */}
        {enrollments && enrollments.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">My Programs</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrollments.map((enrollment) => (
                <TransitionProgramCard
                  key={enrollment.id}
                  program={enrollment.program}
                  icon={iconMap[enrollment.program.slug] || Book}
                  isEnrolled={true}
                  currentWeek={enrollment.current_week}
                  userId={user?.id}
                  generatedImageUrl={generatedImages[enrollment.program.slug]}
                  onRegenerateImage={handleRegenerateImage}
                  isRegenerating={regeneratingSlug === enrollment.program.slug}
                />
              ))}
            </div>
          </div>
        )}

        {/* All Programs */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            {enrollments && enrollments.length > 0 ? "Other Programs" : "All Programs"}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs
              ?.filter(p => !enrolledProgramIds.includes(p.id))
              .map((program) => (
                <TransitionProgramCard
                  key={program.id}
                  program={program}
                  icon={iconMap[program.slug] || Book}
                  isEnrolled={false}
                  userId={user?.id}
                  generatedImageUrl={generatedImages[program.slug]}
                  onRegenerateImage={handleRegenerateImage}
                  isRegenerating={regeneratingSlug === program.slug}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LifeTransitions;
