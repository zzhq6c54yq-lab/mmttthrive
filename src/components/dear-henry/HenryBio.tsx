import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Heart, Sparkles } from 'lucide-react';

const HenryBio: React.FC = () => {
  return (
    <Card className="p-8 bg-gradient-to-br from-amber-100 via-white to-orange-100 dark:from-gray-800 dark:to-amber-900/20">
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="flex-shrink-0">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-xl">
            <Heart className="w-16 h-16 text-white fill-white" />
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h3 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2 justify-center md:justify-start">
            Meet Henry
            <Sparkles className="w-6 h-6 text-amber-600" />
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Henry is your compassionate mental health columnist with years of experience in 
            psychology and a heart for helping others find peace and clarity. Through "Dear Henry," 
            he provides thoughtful, trauma-informed guidance to help you navigate life's challenges 
            with hope and resilience.
          </p>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-amber-600 text-amber-700 hover:bg-amber-50">
                Learn More About Henry
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-serif">About Henry</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <p className="text-gray-700 dark:text-gray-300">
                  Henry represents Hope, Empathy, Nurturing, Resilience, and You - the five pillars 
                  that guide every response in this column.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Drawing from evidence-based practices and trauma-informed care, Henry provides 
                  a safe space for anyone seeking guidance on mental health, relationships, 
                  personal growth, and life's challenges.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Every question submitted is treated with respect, compassion, and confidentiality. 
                  While Henry offers supportive guidance, remember that this column is not a 
                  substitute for professional therapy or medical advice.
                </p>
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                    "Your mental wellbeing matters. You deserve support, understanding, and hope." 
                    - Henry
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Card>
  );
};

export default HenryBio;
