
import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const JournalForm: React.FC<{ userId: string; onEntrySaved?: () => void }> = ({ userId, onEntrySaved }) => {
  const [mood, setMood] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!mood.trim()) {
      toast({ title: "Please enter your mood.", variant: "destructive" });
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("journal_entries").insert({
      user_id: userId,
      mood,
      notes
    });

    if (error) {
      toast({ title: "Submission failed", description: error.message, variant: "destructive" });
    } else {
      setMood("");
      setNotes("");
      toast({ title: "Entry submitted!" });
      if (onEntrySaved) onEntrySaved();
    }
    setLoading(false);
  };

  return (
    <form className="space-y-4 mb-6" onSubmit={submit}>
      <Input
        placeholder="Mood (e.g. happy, anxious)"
        value={mood}
        onChange={e => setMood(e.target.value)}
        required
      />
      <Textarea
        placeholder="Any thoughts?"
        value={notes}
        onChange={e => setNotes(e.target.value)}
        rows={4}
      />
      <Button type="submit" className="w-full" disabled={loading}>
        Submit Entry
      </Button>
    </form>
  );
};

export default JournalForm;
