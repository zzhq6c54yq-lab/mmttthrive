import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLifeTransitions } from "@/hooks/useLifeTransitions";
import { useNavigate } from "react-router-dom";

interface TransitionProgramCardProps {
  program: any;
  icon: any;
  isEnrolled: boolean;
  currentWeek?: number;
  userId?: string;
}

const TransitionProgramCard = ({ program, icon: Icon, isEnrolled, currentWeek, userId }: TransitionProgramCardProps) => {
  const { enrollInProgram } = useLifeTransitions(userId);
  const navigate = useNavigate();

  return (
    <Card className="p-6 glass-card hover:scale-[1.02] transition-all">
      <Icon className="w-8 h-8 text-primary mb-4" />
      <h3 className="font-semibold text-lg mb-2">{program.name}</h3>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{program.description}</p>
      <div className="flex items-center gap-2 mb-4">
        <Badge variant="outline">{program.duration_weeks} weeks</Badge>
        {isEnrolled && <Badge>Week {currentWeek}</Badge>}
      </div>
      {isEnrolled ? (
        <Button className="w-full" onClick={() => navigate(`/app/life-transitions/${program.slug}`)}>
          Continue Program
        </Button>
      ) : (
        <Button className="w-full" variant="outline" onClick={() => enrollInProgram.mutate(program.id)} disabled={enrollInProgram.isPending}>
          {enrollInProgram.isPending ? "Enrolling..." : "Enroll"}
        </Button>
      )}
    </Card>
  );
};

export default TransitionProgramCard;
