import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Target, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function WeeklyGoals() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#1a1510] to-gray-900">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6 text-gray-400 hover:text-white"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to Dashboard
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
            Weekly Goals
          </h1>
          <p className="text-gray-400">Track and manage your weekly wellness goals</p>
        </div>

        <Card className="bg-gray-800/40 border-gray-700/50 backdrop-blur-sm p-8">
          <div className="text-center py-12">
            <Target className="w-16 h-16 text-[#D4AF37] mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-white mb-2">
              Weekly Goals Coming Soon
            </h2>
            <p className="text-gray-400 max-w-md mx-auto">
              Set and track weekly wellness goals to stay on track with your mental health journey.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
