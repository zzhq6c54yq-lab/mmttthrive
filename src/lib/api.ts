
/**
 * API client for Supabase Edge Functions (henry-openai-relay and mood logs).
 * All calls are POST, returns Promise with `data` or throws on error.
 */
export async function logMood(value: number, userId: string) {
  const res = await fetch("/functions/v1/henry-openai-relay", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Add `Authorization` header with JWT if using Supabase auth (optional)
    },
    body: JSON.stringify({
      user_id: userId,
      mood: {
        value,
        timestamp: new Date().toISOString(),
      },
    }),
  });
  if (!res.ok) throw new Error("Failed to log mood");
  return res.json();
}

// Example: fetch mood logs for a user (needs Supabase RPC/Edge Function)
// This function would be expanded in a real app.
export async function getMoodLogs(userId: string) {
  const res = await fetch(`/functions/v1/get-mood-logs?user_id=${encodeURIComponent(userId)}`);
  if (!res.ok) throw new Error("Failed to fetch mood logs");
  return res.json();
}
