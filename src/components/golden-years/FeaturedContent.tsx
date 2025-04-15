
import React from "react";
import { Button } from "@/components/ui/button";
import { Trophy, BookOpen } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";

interface FeaturedContentProps {
  onFeatureClick: (feature: string) => void;
}

const FeaturedContent: React.FC<FeaturedContentProps> = ({ onFeatureClick }) => {
  const { getTranslatedText } = useTranslation();
  
  return (
    <div className="bg-gradient-to-br from-amber-600/40 to-amber-900/40 backdrop-blur-md border-2 border-amber-300/30 rounded-xl p-6 mb-10 shadow-lg relative overflow-hidden">
      {/* Metallic gold background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-200/10 via-yellow-100/5 to-transparent pointer-events-none"></div>
      
      <div className="absolute top-0 right-0 w-32 h-32 -rotate-12 transform translate-x-8 -translate-y-8 opacity-20 bg-gradient-to-br from-yellow-200 to-amber-500 rounded-full blur-md"></div>
      
      <div className="relative z-10">
        <h2 className="text-3xl font-bold mb-4 flex items-center text-amber-100">
          <Trophy className="mr-3 h-7 w-7 text-amber-300" />
          {getTranslatedText('legacyJournal')}
        </h2>
        
        <p className="mb-6 text-amber-50 text-lg leading-relaxed max-w-2xl">
          {getTranslatedText('legacyJournalDesc')}
        </p>
        
        <div className="flex flex-wrap gap-4">
          <Button 
            className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-5 text-lg font-medium shadow-lg flex items-center space-x-2 transform transition-all duration-300 hover:-translate-y-1"
            onClick={() => onFeatureClick("Legacy Journal")}
          >
            <BookOpen className="mr-2" />
            {getTranslatedText('startJournal')}
          </Button>
          <Button 
            variant="outline" 
            className="border-amber-400 text-amber-200 hover:bg-amber-700/50 px-6 py-5 text-lg transform transition-all duration-300 hover:-translate-y-1"
            onClick={() => onFeatureClick("Legacy Journal Guide")}
          >
            {getTranslatedText('learnMore')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedContent;
