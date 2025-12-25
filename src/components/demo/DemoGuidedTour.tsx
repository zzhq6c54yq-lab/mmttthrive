import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, X } from 'lucide-react';
import { demoTourSteps } from '@/data/demoTourData';
import useTranslation from '@/hooks/useTranslation';
import { useNavigate } from 'react-router-dom';

interface DemoGuidedTourProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemoGuidedTour: React.FC<DemoGuidedTourProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { isSpanish } = useTranslation();
  const navigate = useNavigate();
  
  const step = demoTourSteps[currentStep];
  const Icon = step.icon;
  const isLastStep = currentStep === demoTourSteps.length - 1;
  const isFirstStep = currentStep === 0;

  const handleNext = () => {
    if (isLastStep) {
      onClose();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSignUp = () => {
    onClose();
    navigate('/auth');
  };

  const title = isSpanish ? step.titleEs : step.title;
  const description = isSpanish ? step.descriptionEs : step.description;
  const highlights = isSpanish ? step.highlightsEs : step.highlights;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-[#B87333]/30 text-white p-0 overflow-hidden">
        {/* Header with close button */}
        <div className="absolute top-3 right-3 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white/60 hover:text-white hover:bg-white/10 h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Demo badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-2 py-1 bg-[#B87333]/20 border border-[#B87333]/40 rounded-full text-xs text-[#E5C5A1] font-medium">
            {isSpanish ? 'Modo Demo' : 'Demo Mode'}
          </span>
        </div>

        {/* Content */}
        <div className="pt-14 px-6 pb-6">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-gradient-to-br from-[#B87333]/30 to-[#E5C5A1]/20 border border-[#B87333]/40">
              <Icon className="h-10 w-10 text-[#E5C5A1]" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-center mb-3 bg-gradient-to-r from-[#B87333] to-[#E5C5A1] bg-clip-text text-transparent">
            {title}
          </h2>

          {/* Description */}
          <p className="text-white/80 text-center mb-5 leading-relaxed">
            {description}
          </p>

          {/* Highlights */}
          {highlights && highlights.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {highlights.map((highlight, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white/70"
                >
                  {highlight}
                </span>
              ))}
            </div>
          )}

          {/* Step indicators */}
          <div className="flex justify-center gap-2 mb-6">
            {demoTourSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? 'w-8 bg-gradient-to-r from-[#B87333] to-[#E5C5A1]'
                    : 'w-2 bg-white/20 hover:bg-white/30'
                }`}
              />
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex gap-3">
            {!isFirstStep && (
              <Button
                variant="outline"
                onClick={handlePrevious}
                className="flex-1 border-white/20 text-white/80 hover:bg-white/10 hover:text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                {isSpanish ? 'Anterior' : 'Previous'}
              </Button>
            )}
            
            {isLastStep ? (
              <Button
                onClick={handleSignUp}
                className="flex-1 bg-gradient-to-r from-[#B87333] to-[#E5C5A1] hover:from-[#A56625] hover:to-[#D4B48F] text-white font-medium"
              >
                {isSpanish ? 'Registrarse Ahora' : 'Sign Up Now'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="flex-1 bg-gradient-to-r from-[#B87333] to-[#E5C5A1] hover:from-[#A56625] hover:to-[#D4B48F] text-white font-medium"
              >
                {isSpanish ? 'Siguiente' : 'Next'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Skip link */}
          {!isLastStep && (
            <button
              onClick={onClose}
              className="w-full mt-3 text-center text-sm text-white/50 hover:text-white/70 transition-colors"
            >
              {isSpanish ? 'Omitir tour' : 'Skip tour'}
            </button>
          )}

          {/* Explore button on last step */}
          {isLastStep && (
            <button
              onClick={onClose}
              className="w-full mt-3 text-center text-sm text-white/50 hover:text-white/70 transition-colors"
            >
              {isSpanish ? 'Continuar explorando la demo' : 'Continue exploring demo'}
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DemoGuidedTour;
