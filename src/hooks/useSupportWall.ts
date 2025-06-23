
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@/contexts/UserContext";

interface SupportPost {
  id: string;
  content: string;
  hearts: number;
  created_at: string;
  user_has_hearted?: boolean;
}

export const useSupportWall = () => {
  const [posts, setPosts] = useState<SupportPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  const fetchPosts = async () => {
    try {
      const { data: postsData, error } = await supabase
        .from("support_wall")
        .select("*")
        .eq("is_flagged", false)
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) throw error;

      // Check which posts the current user has hearted
      let postsWithHeartStatus = postsData || [];
      
      if (user) {
        const { data: heartsData } = await supabase
          .from("support_wall_hearts")
          .select("post_id")
          .eq("user_id", user.id);

        const heartedPostIds = heartsData?.map(h => h.post_id) || [];
        
        postsWithHeartStatus = postsData?.map(post => ({
          ...post,
          user_has_hearted: heartedPostIds.includes(post.id)
        })) || [];
      }

      setPosts(postsWithHeartStatus);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [user]);

  const postMessage = async (content: string) => {
    if (!user) return;

    try {
      const { error } = await supabase.from("support_wall").insert({
        user_id: user.id,
        content: content.trim(),
      });

      if (error) throw error;
      
      // Refresh posts
      fetchPosts();
    } catch (error) {
      console.error("Error posting message:", error);
    }
  };

  const toggleHeart = async (postId: string) => {
    if (!user) return;

    try {
      // Check if user has already hearted this post
      const { data: existingHeart } = await supabase
        .from("support_wall_hearts")
        .select("id")
        .eq("post_id", postId)
        .eq("user_id", user.id)
        .single();

      if (existingHeart) {
        // Remove heart
        await supabase
          .from("support_wall_hearts")
          .delete()
          .eq("post_id", postId)
          .eq("user_id", user.id);

        // Decrease heart count
        await supabase.rpc('decrement_hearts', { post_id: postId });
      } else {
        // Add heart
        await supabase
          .from("support_wall_hearts")
          .insert({
            post_id: postId,
            user_id: user.id,
          });

        // Increase heart count
        await supabase.rpc('increment_hearts', { post_id: postId });
      }

      // Refresh posts
      fetchPosts();
    } catch (error) {
      console.error("Error toggling heart:", error);
    }
  };

  return { posts, postMessage, toggleHeart, loading, refetch: fetchPosts };
};
