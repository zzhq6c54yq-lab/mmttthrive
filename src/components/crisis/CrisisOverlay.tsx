
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { useUser } from '@/contexts/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { Phone, Heart, Headphones, MessageCircle, Shield, AlertCircle } from 'lucide-react';

const CrisisOverlay: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [breathingActive, setBreathingActive] = useState(false);
  const { user } = useUser();

  const logCrisisEvent = async (eventType: string, source: string) => {
    if (user) {
      await supabase.from('crisis_events').insert({
        user_id: user.id,
        event_type: eventType,
        source: source
      });
    }
  };

  const handleEmergencyCall = () => {
    logCrisisEvent('emergency_call', 'crisis_overlay');
    window.open('tel:988');
  };

  const handlePanicButton = () => {
    logCrisisEvent('panic_button', 'floating_button');
    setIsOpen(true);
  };

  const startBreathingExercise = () => {
    setBreathingActive(true);
    logCrisisEvent('breathing_exercise', 'crisis_overlay');
    // Simple breathing exercise timer
    setTimeout(() => setBreathingActive(false), 60000); // 1 minute
  };

  return (
    <>
      {/* Floating Crisis Button */}
      <Button
        onClick={handlePanicButton}
        variant="destructive"
        size="icon"
        className="fixed bottom-4 left-4 z-50 h-14 w-14 rounded-full shadow-2xl bg-red-600 hover:bg-red-700 border-2 border-white animate-pulse"
        aria-label="Crisis Support - Click for immediate help"
      >
        <Shield className="h-6 w-6" />
      </Button>

      {/* Crisis Support Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent size="lg" className="bg-gradient-to-br from-blue-50 to-purple-50">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center text-red-700 flex items-center justify-center">
              <AlertCircle className="h-6 w-6 mr-2" />
              Crisis Support Available
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="text-center bg-red-50 p-4 rounded-lg border border-red-200">
              <p className="text-red-800 font-semibold mb-2">
                🚨 If you're in immediate danger, call 911 now
              </p>
              <p className="text-red-700 text-sm">
                Your safety is the most important thing right now.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-red-100 border-red-300">
                <CardContent className="p-4 text-center">
                  <Phone className="h-8 w-8 text-red-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-red-800 mb-2">Crisis Hotline</h3>
                  <p className="text-sm text-red-700 mb-3">
                    24/7 free, confidential support
                  </p>
                  <Button 
                    onClick={handleEmergencyCall}
                    variant="destructive" 
                    className="w-full bg-red-600 hover:bg-red-700"
                  >
                    Call 988
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-blue-100 border-blue-300">
                <CardContent className="p-4 text-center">
                  <MessageCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-blue-800 mb-2">Crisis Text Line</h3>
                  <p className="text-sm text-blue-700 mb-3">
                    Text with a trained counselor
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full border-blue-600 text-blue-700 hover:bg-blue-50"
                    onClick={() => window.open('sms:741741?body=HELLO')}
                  >
                    Text HOME to 741741
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-green-100 border-green-300">
                <CardContent className="p-4 text-center">
                  <Heart className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-green-800 mb-2">Breathing Exercise</h3>
                  <p className="text-sm text-green-700 mb-3">
                    Calm your mind and body
                  </p>
                  <Button 
                    onClick={startBreathingExercise}
                    variant="outline" 
                    className="w-full border-green-600 text-green-700 hover:bg-green-50"
                    disabled={breathingActive}
                  >
                    {breathingActive ? 'Breathing...' : 'Start Breathing'}
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-purple-100 border-purple-300">
                <CardContent className="p-4 text-center">
                  <Headphones className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-purple-800 mb-2">Calming Sounds</h3>
                  <p className="text-sm text-purple-700 mb-3">
                    Binaural beats for relaxation
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full border-purple-600 text-purple-700 hover:bg-purple-50"
                  >
                    Play Sounds
                  </Button>
                </CardContent>
              </Card>
            </div>

            {breathingActive && (
              <Card className="bg-gradient-to-r from-blue-200 to-green-200 border-none">
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <div className="text-6xl animate-pulse">🫁</div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Breathe with me
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Inhale for 4... Hold for 4... Exhale for 6...
                  </p>
                  <div className="text-sm text-gray-600">
                    Focus only on your breathing. You are safe.
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="text-center text-sm text-gray-600">
              <p>Remember: This crisis will pass. You are not alone. Help is available.</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CrisisOverlay;
