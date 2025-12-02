import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Badge {
  id: string;
  name: string;
  description: string | null;
  icon_name: string | null;
  category: string;
  points_value: number;
  requirements: any;
  image_url: string | null;
  created_at: string;
}

export interface EarnedBadge {
  id: string;
  user_id: string;
  badge_id: string;
  earned_at: string;
  metadata: any;
  badge: Badge;
}

export function useUserBadges(userId: string | undefined) {
  return useQuery({
    queryKey: ["user-badges", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID required");

      // Fetch all badges
      const { data: allBadges, error: badgesError } = await supabase
        .from("user_badges")
        .select("*")
        .order("points_value", { ascending: true });

      if (badgesError) throw badgesError;

      // Fetch user's earned badges
      const { data: earnedBadges, error: earnedError } = await supabase
        .from("user_earned_badges")
        .select(`
          *,
          badge:user_badges(*)
        `)
        .eq("user_id", userId);

      if (earnedError) throw earnedError;

      // Calculate total points
      const totalPoints = earnedBadges?.reduce(
        (sum, eb: any) => sum + (eb.badge?.points_value || 0),
        0
      ) || 0;

      const earnedBadgeIds = new Set(earnedBadges?.map(eb => eb.badge_id) || []);

      return {
        allBadges: allBadges || [],
        earnedBadges: earnedBadges || [],
        totalPoints,
        earnedCount: earnedBadges?.length || 0,
        totalCount: allBadges?.length || 0,
        lockedBadges: allBadges?.filter(b => !earnedBadgeIds.has(b.id)) || [],
      };
    },
    enabled: !!userId,
  });
}