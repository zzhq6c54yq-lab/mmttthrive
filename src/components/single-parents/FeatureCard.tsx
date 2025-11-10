import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon: Icon, onClick }) => {
  return (
    <Card 
      onClick={onClick}
      className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-rose-200/30 hover:border-rose-400/50"
    >
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-full bg-rose-100 dark:bg-rose-900/30">
            <Icon className="h-5 w-5 text-rose-600" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
