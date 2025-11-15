import React, { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Auth: React.FC = () => {
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/");
    });
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        // Defer async operations to prevent deadlock
        setTimeout(() => {
          supabase
            .from("profiles")
            .select("is_therapist")
            .eq("id", session.user.id)
            .single()
            .then(({ data: profile }) => {
              if (profile?.is_therapist) {
                navigate("/therapist-dashboard");
              } else {
                navigate("/");
              }
            });
        }, 0);
      }
    });
    return () => authListener.subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/5">
      <Card className="w-full max-w-md shadow-xl border-border/50 backdrop-blur-sm bg-card/95">
        <CardHeader className="space-y-2 text-center pb-4">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Therapist Portal
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Enter your access code to continue
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <p className="text-center text-sm text-muted-foreground">
            This portal is for licensed therapists only. Please use the staff access on the main page.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
