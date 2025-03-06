
import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ToolActionButtonProps {
  label: string;
  toolName: string;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "copper" | "outline_copper" | "bronze" | "animated_bronze" | "animated_copper" | "neutral";
}

const ToolActionButton: React.FC<ToolActionButtonProps> = ({ 
  label, 
  toolName, 
  className = "",
  variant = "copper"
}) => {
  const { toast } = useToast();

  const handleAction = () => {
    // In a real app, this would perform the actual tool action
    toast({
      title: `${toolName} - ${label}`,
      description: "This feature will be available soon. We're working on making this tool fully functional.",
    });
  };

  return (
    <Button
      variant={variant}
      onClick={handleAction}
      className={`hero-button ${className}`}
    >
      {label}
    </Button>
  );
};

export default ToolActionButton;
