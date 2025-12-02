import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useSupportCircle = (userId: string | undefined) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: circle, isLoading } = useQuery({
    queryKey: ["support-circle", userId],
    queryFn: async () => {
      if (!userId) return null;
      
      const { data, error } = await supabase
        .from("support_circles")
        .select("*, members:support_circle_members(*)")
        .eq("user_id", userId)
        .single();

      if (error && error.code !== "PGRST116") throw error;
      return data;
    },
    enabled: !!userId,
  });

  const createCircle = useMutation({
    mutationFn: async (name?: string) => {
      if (!userId) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("support_circles")
        .insert({
          user_id: userId,
          name: name || "My Support Circle",
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Support Circle Created!",
        description: "Start inviting your support network.",
      });
      queryClient.invalidateQueries({ queryKey: ["support-circle"] });
    },
  });

  const inviteMember = useMutation({
    mutationFn: async (member: {
      email: string;
      name: string;
      relationship: string;
      permissions: any;
    }) => {
      if (!circle) throw new Error("No circle found");

      const { error } = await supabase
        .from("support_circle_members")
        .insert({
          circle_id: circle.id,
          ...member,
          invite_status: "pending",
        });

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Invitation Sent!",
        description: "Your support person will receive an email invitation.",
      });
      queryClient.invalidateQueries({ queryKey: ["support-circle"] });
    },
  });

  const updatePermissions = useMutation({
    mutationFn: async ({ memberId, permissions }: { memberId: string; permissions: any }) => {
      const { error } = await supabase
        .from("support_circle_members")
        .update(permissions)
        .eq("id", memberId);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Permissions Updated",
        description: "Support circle member permissions have been saved.",
      });
      queryClient.invalidateQueries({ queryKey: ["support-circle"] });
    },
  });

  return {
    circle,
    isLoading,
    createCircle,
    inviteMember,
    updatePermissions,
  };
};
