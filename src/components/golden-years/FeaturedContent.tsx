
import React from "react";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";

interface FeaturedContentProps {
  onFeatureClick: (feature: string) => void;
}

const FeaturedContent: React.FC<FeaturedContentProps> = ({ onFeatureClick }) => {
  const { getTranslatedText } = useTranslation();
  
  return (
    <div className="bg-amber-900/30 backdrop-blur-md border border-amber-200/30 rounded-xl p-6 mb-10">
      <h2 className="text-2xl font-medium mb-4 flex items-center">
        <Trophy className="mr-2 h-6 w-6 text-amber-300" />
        {getTranslatedText('legacyJournal')}
      </h2>
      <p className="mb-6 text-amber-50">
        {getTranslatedText('legacyJournalDesc')}
      </p>
      <Button 
        className="bg-amber-500 hover:bg-amber-600 text-white px-6"
        onClick={() => onFeatureClick("Legacy Journal")}
      >
        {getTranslatedText('startJournal')}
      </Button>
    </div>
  );
};

export default FeaturedContent;
