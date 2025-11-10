import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { MessageSquareHeart, ArrowLeft, Calendar, Share2 } from 'lucide-react';
import { format } from 'date-fns';

interface MiniSession {
  id: string;
  created_at: string;
  mood: number;
  anxiety: number;
  energy: number;
  focus: string;
  summary: string;
  coaching: string;
  shared_with_therapist: boolean;
  urge_level: number | null;
}

const MiniSessionHistory: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sessions, setSessions] = useState<MiniSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('mini_sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSessions(data || []);
    } catch (error) {
      console.error('Error fetching sessions:', error);
      toast({ title: 'Error loading history', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const toggleShare = async (sessionId: string, currentValue: boolean) => {
    try {
      const { error } = await supabase
        .from('mini_sessions')
        .update({ shared_with_therapist: !currentValue })
        .eq('id', sessionId);

      if (error) throw error;

      setSessions(prev =>
        prev.map(s => s.id === sessionId ? { ...s, shared_with_therapist: !currentValue } : s)
      );

      toast({ 
        title: !currentValue ? 'Marked for sharing' : 'Unmarked',
        description: !currentValue ? 'This session will be available to share with your therapist' : 'Session unmarked'
      });
    } catch (error) {
      console.error('Error updating share status:', error);
      toast({ title: 'Error updating', variant: 'destructive' });
    }
  };

  const getFocusLabel = (focus: string) => {
    const labels: Record<string, string> = {
      racing_thoughts: 'Racing Thoughts',
      conflict: 'After Conflict',
      low_mood: 'Low Mood',
      urge: 'Managing Urge',
      process_therapy: 'Process Therapy',
    };
    return labels[focus] || focus;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center">
        <p className="text-muted-foreground">Loading history...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate('/dashboard')} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Button>
          <div className="flex items-center gap-3 mb-2">
            <MessageSquareHeart className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Session History</h1>
          </div>
          <p className="text-muted-foreground">Your between-session support log</p>
        </div>

        <Button onClick={() => navigate('/mini-session')} className="w-full mb-6">
          Start New Mini-Session
        </Button>

        {sessions.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No sessions yet. Start your first mini-session above.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {sessions.map(session => (
              <Card key={session.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                          {getFocusLabel(session.focus)}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {format(new Date(session.created_at), 'MMM d, yyyy h:mm a')}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{session.summary}</p>
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        <span>Mood: {session.mood}/10</span>
                        <span>Anxiety: {session.anxiety}/10</span>
                        <span>Energy: {session.energy}/10</span>
                        {session.urge_level && <span>Urge: {session.urge_level}/10</span>}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant={session.shared_with_therapist ? 'default' : 'outline'}
                      onClick={() => toggleShare(session.id, session.shared_with_therapist)}
                    >
                      <Share2 className="h-4 w-4 mr-1" />
                      {session.shared_with_therapist ? 'Shared' : 'Share'}
                    </Button>
                  </div>

                  <details className="mt-4">
                    <summary className="cursor-pointer text-sm font-medium text-primary hover:underline">
                      View full coaching
                    </summary>
                    <div className="mt-3 p-4 bg-muted/50 rounded-lg text-sm whitespace-pre-wrap">
                      {session.coaching}
                    </div>
                  </details>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MiniSessionHistory;
