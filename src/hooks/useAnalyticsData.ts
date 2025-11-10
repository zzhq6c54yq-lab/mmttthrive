import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useAnalyticsData = () => {
  // Fetch mood data
  const { data: moodData = [] } = useQuery({
    queryKey: ["mood-analytics"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("mood_entries")
        .select("*")
        .order("created_at", { ascending: true })
        .limit(50);
      
      if (error) throw error;
      
      // Group by week
      const groupedData: Record<string, { total: number; count: number }> = {};
      
      data.forEach((entry) => {
        const date = new Date(entry.created_at);
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        const weekKey = `Week ${Math.floor((date.getTime() - weekStart.getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1}`;
        
        if (!groupedData[weekKey]) {
          groupedData[weekKey] = { total: 0, count: 0 };
        }
        
        groupedData[weekKey].total += entry.mood_score;
        groupedData[weekKey].count += 1;
      });
      
      return Object.entries(groupedData).map(([name, { total, count }]) => ({
        name,
        mood: Math.round(total / count)
      }));
    }
  });

  // Fetch activity data
  const { data: activityData = [] } = useQuery({
    queryKey: ["activity-analytics"],
    queryFn: async () => {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const { data, error } = await supabase
        .from("user_activities")
        .select("*")
        .gte("completed_at", sevenDaysAgo.toISOString())
        .order("completed_at", { ascending: true });
      
      if (error) throw error;
      
      // Group by day of week
      const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const groupedData: Record<string, number> = {};
      
      daysOfWeek.forEach(day => {
        groupedData[day] = 0;
      });
      
      data.forEach((activity) => {
        const day = daysOfWeek[new Date(activity.completed_at).getDay()];
        groupedData[day] += activity.duration_minutes || 0;
      });
      
      return Object.entries(groupedData).map(([name, minutes]) => ({
        name,
        minutes
      }));
    }
  });

  // Fetch wellness metrics
  const { data: wellnessData = [] } = useQuery({
    queryKey: ["wellness-analytics"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("wellness_metrics")
        .select("*")
        .order("recorded_at", { ascending: false })
        .limit(100);
      
      if (error) throw error;
      
      // Group by metric type
      const groupedData: Record<string, number> = {};
      
      data.forEach((metric) => {
        if (!groupedData[metric.metric_type]) {
          groupedData[metric.metric_type] = 0;
        }
        groupedData[metric.metric_type] += Number(metric.metric_value);
      });
      
      return Object.entries(groupedData).map(([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value: Math.round(value)
      }));
    }
  });

  return {
    moodData,
    activityData,
    wellnessData
  };
};
