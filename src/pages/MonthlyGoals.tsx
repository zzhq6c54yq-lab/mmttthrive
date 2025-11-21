import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MonthlyGoals() {
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
            Monthly Goals
          </h1>
          <p className="text-gray-400">Track and manage your monthly wellness goals</p>
        </div>

        <Card className="bg-gray-800/40 border-gray-700/50 backdrop-blur-sm p-8">
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-[#D4AF37] mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-white mb-2">
              Monthly Goals Coming Soon
            </h2>
            <p className="text-gray-400 max-w-md mx-auto">
              Set long-term monthly goals to achieve lasting progress in your wellness journey.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
