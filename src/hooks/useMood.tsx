
import { useState, useCallback } from "react";
import { logMood, getMoodLogs } from "@/lib/api";

// Mood type
export interface MoodLog {
  value: number;
  timestamp: string;
}

export function useMood(userId: string) {
  const [moodLogs, setMoodLogs] = useState<MoodLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMoodLogs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMoodLogs(userId);
      setMoodLogs(data.logs || []);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const submitMood = useCallback(
    async (value: number) => {
      setLoading(true);
      setError(null);
      try {
        await logMood(value, userId);
        await fetchMoodLogs(); // refresh logs after submit
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    },
    [userId, fetchMoodLogs]
  );

  return {
    moodLogs,
    loading,
    error,
    fetchMoodLogs,
    submitMood,
  };
}
