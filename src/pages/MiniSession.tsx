import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { MessageSquareHeart, Brain, Users, Heart, AlertTriangle, FileText, ArrowLeft, ArrowRight, Check, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MiniSession: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [step, setStep] = useState(1);
  const [mood, setMood] = useState(5);
  const [anxiety, setAnxiety] = useState(5);
  const [energy, setEnergy] = useState(5);
  const [tags, setTags] = useState<string[]>([]);
  const [focus, setFocus] = useState<string>('');
  const [userTextPrimary, setUserTextPrimary] = useState('');
  const [userTextSecondary, setUserTextSecondary] = useState('');
  const [urgeLevel, setUrgeLevel] = useState(5);
  const [coaching, setCoaching] = useState('');
  const [summary, setSummary] = useState('');
  const [shareWithTherapist, setShareWithTherapist] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCrisisBanner, setShowCrisisBanner] = useState(false);

  const availableTags = ['overwhelmed', 'anxious', 'tired', 'frustrated', 'hopeful', 'grateful', 'lonely', 'energized'];

  const focusAreas = [
    { id: 'racing_thoughts', title: 'Racing Thoughts', icon: Brain, description: 'Mind won\'t slow down' },
    { id: 'conflict', title: 'After a Conflict', icon: Users, description: 'Need to process a disagreement' },
    { id: 'low_mood', title: 'Low Mood', icon: Heart, description: 'Feeling down or heavy' },
    { id: 'urge', title: 'Managing an Urge', icon: AlertTriangle, description: 'Coping with difficult urges' },
    { id: 'process_therapy', title: 'Process Last Session', icon: FileText, description: 'Reflect on therapy insights' },
  ];

  const toggleTag = (tag: string) => {
    setTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const handleNext = () => {
    if (step === 2 && !focus) {
      toast({ title: 'Please select a focus area', variant: 'destructive' });
      return;
    }
    if (step === 3 && !userTextPrimary.trim()) {
      toast({ title: 'Please share your thoughts', variant: 'destructive' });
      return;
    }
    setStep(step + 1);
  };

  const handleGetCoaching = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('mini-session', {
        body: {
          focus,
          mood,
          anxiety,
          energy,
          tags,
          userTextPrimary,
          userTextSecondary,
          urgeLevel: focus === 'urge' ? urgeLevel : null
        }
      });

      if (error) throw error;

      setCoaching(data.coaching);
      setSummary(data.summary);
      setShowCrisisBanner(data.isCrisisDetected || urgeLevel >= 8 || anxiety >= 9);
      setStep(4);
    } catch (error) {
      console.error('Error getting coaching:', error);
      toast({ 
        title: 'Error', 
        description: 'Unable to process your session. Please try again.',
        variant: 'destructive' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase.from('mini_sessions').insert({
        user_id: user.id,
        mood,
        anxiety,
        energy,
        tags,
        focus,
        user_text_primary: userTextPrimary,
        user_text_secondary: userTextSecondary,
        urge_level: focus === 'urge' ? urgeLevel : null,
        coaching,
        summary,
        shared_with_therapist: shareWithTherapist
      });

      if (error) throw error;

      if (showCrisisBanner) {
        await supabase.from('crisis_events').insert({
          user_id: user.id,
          event_type: 'high_risk_mini_session',
          source: 'mini_session'
        });
      }

      toast({ title: 'Session saved', description: 'Your mini-session has been recorded.' });
      navigate('/mini-session/history');
    } catch (error) {
      console.error('Error saving session:', error);
      toast({ 
        title: 'Error saving', 
        description: 'Session completed but couldn\'t save. Please try again.',
        variant: 'destructive' 
      });
    }
  };

  const progressPercent = (step / 5) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <div className="flex items-center gap-3 mb-2">
            <MessageSquareHeart className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Between-Session Support</h1>
          </div>
          <p className="text-muted-foreground">Brief companion between your therapy sessions</p>
          <Progress value={progressPercent} className="mt-4" />
        </div>

        {/* Crisis Banner */}
        {showCrisisBanner && (
          <Card className="mb-6 border-destructive bg-destructive/10">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-destructive mt-1" />
                <div>
                  <h3 className="font-semibold text-destructive mb-1">Crisis Support Available</h3>
                  <p className="text-sm text-foreground mb-2">
                    If you're in crisis or having thoughts of harming yourself, please reach out immediately:
                  </p>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => window.open('tel:988', '_self')}
                  >
                    Call 988 (US Crisis Line)
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Disclaimer */}
        <Card className="mb-6 border-muted">
          <CardContent className="p-4 text-sm text-muted-foreground">
            <strong>Important:</strong> This is support between sessions, not a substitute for therapy or medical care. 
            Always discuss significant concerns with your therapist or provider.
          </CardContent>
        </Card>

        <AnimatePresence mode="wait">
          {/* Step 1: Ground & Scan */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Check In: How are you right now?</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block mb-2 text-sm font-medium">Mood: {mood}/10</label>
                      <Slider value={[mood]} onValueChange={([v]) => setMood(v)} min={1} max={10} step={1} />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium">Anxiety: {anxiety}/10</label>
                      <Slider value={[anxiety]} onValueChange={([v]) => setAnxiety(v)} min={1} max={10} step={1} />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium">Energy: {energy}/10</label>
                      <Slider value={[energy]} onValueChange={([v]) => setEnergy(v)} min={1} max={10} step={1} />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium">Tags (optional)</label>
                      <div className="flex flex-wrap gap-2">
                        {availableTags.map(tag => (
                          <Button
                            key={tag}
                            size="sm"
                            variant={tags.includes(tag) ? 'default' : 'outline'}
                            onClick={() => toggleTag(tag)}
                          >
                            {tag}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Button onClick={handleNext} className="w-full mt-6">
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Focus Selection */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">What brings you here today?</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {focusAreas.map(area => {
                      const Icon = area.icon;
                      return (
                        <Card
                          key={area.id}
                          className={`cursor-pointer transition-all hover:shadow-md ${
                            focus === area.id ? 'border-primary bg-primary/5' : 'border-border'
                          }`}
                          onClick={() => setFocus(area.id)}
                        >
                          <CardContent className="p-4">
                            <Icon className="h-6 w-6 text-primary mb-2" />
                            <h3 className="font-semibold mb-1">{area.title}</h3>
                            <p className="text-sm text-muted-foreground">{area.description}</p>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>

                  <Button onClick={handleNext} className="w-full mt-6" disabled={!focus}>
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 3: Contextual Input */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    {focus === 'racing_thoughts' && 'What\'s racing through your mind?'}
                    {focus === 'conflict' && 'Tell me about the conflict'}
                    {focus === 'low_mood' && 'What\'s weighing on you?'}
                    {focus === 'urge' && 'What\'s happening with the urge?'}
                    {focus === 'process_therapy' && 'What stood out from your last session?'}
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <Textarea
                        placeholder="Share your thoughts..."
                        value={userTextPrimary}
                        onChange={(e) => setUserTextPrimary(e.target.value)}
                        rows={4}
                      />
                    </div>

                    {focus === 'conflict' && (
                      <div>
                        <label className="block mb-2 text-sm font-medium">What do you really need right now?</label>
                        <Textarea
                          placeholder="e.g., to be heard, to feel safe, to have space..."
                          value={userTextSecondary}
                          onChange={(e) => setUserTextSecondary(e.target.value)}
                          rows={2}
                        />
                      </div>
                    )}

                    {focus === 'low_mood' && (
                      <div>
                        <label className="block mb-2 text-sm font-medium">One thing you did well recently (even small)</label>
                        <Textarea
                          placeholder="e.g., got out of bed, called a friend..."
                          value={userTextSecondary}
                          onChange={(e) => setUserTextSecondary(e.target.value)}
                          rows={2}
                        />
                      </div>
                    )}

                    {focus === 'urge' && (
                      <>
                        <div>
                          <label className="block mb-2 text-sm font-medium">Urge intensity: {urgeLevel}/10</label>
                          <Slider value={[urgeLevel]} onValueChange={([v]) => setUrgeLevel(v)} min={1} max={10} step={1} />
                        </div>
                        <div>
                          <label className="block mb-2 text-sm font-medium">Any harm reduction you're doing?</label>
                          <Textarea
                            placeholder="e.g., called someone, used ice, went for a walk..."
                            value={userTextSecondary}
                            onChange={(e) => setUserTextSecondary(e.target.value)}
                            rows={2}
                          />
                        </div>
                      </>
                    )}

                    {focus === 'process_therapy' && (
                      <div>
                        <label className="block mb-2 text-sm font-medium">Question for next session?</label>
                        <Textarea
                          placeholder="Anything you want to explore further..."
                          value={userTextSecondary}
                          onChange={(e) => setUserTextSecondary(e.target.value)}
                          rows={2}
                        />
                      </div>
                    )}
                  </div>

                  <Button onClick={handleGetCoaching} className="w-full mt-6" disabled={loading}>
                    {loading ? 'Processing...' : 'Get Support'}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 4: Coaching */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Support & Reflection</h2>
                  
                  <div className="bg-muted/50 rounded-lg p-4 mb-6 whitespace-pre-wrap">
                    {coaching}
                  </div>

                  <div className="mb-6">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={shareWithTherapist}
                        onChange={(e) => setShareWithTherapist(e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm">Share summary with my therapist</span>
                    </label>
                  </div>

                  <Button onClick={handleFinish} className="w-full">
                    <Check className="mr-2 h-4 w-4" /> Finish Session
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MiniSession;
