import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  
  const showLogoutMessage = searchParams.get("logged_out") === "true";

  // Redirect if already logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        // Check if therapist
        supabase
          .from("profiles")
          .select("is_therapist")
          .eq("id", data.session.user.id)
          .single()
          .then(({ data: profile }) => {
            if (profile?.is_therapist) {
              navigate("/app/therapist-dashboard");
            } else {
              navigate("/app/dashboard");
            }
          });
      } else {
        setCheckingSession(false);
      }
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
                navigate("/app/therapist-dashboard");
              } else {
                navigate("/app/dashboard");
              }
            });
        }, 0);
      }
    });
    return () => authListener.subscription.unsubscribe();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/app/dashboard`,
          },
        });
        if (error) throw error;
        toast({
          title: "Account created!",
          description: "Please check your email to confirm your account.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Authentication Error",
        description: error.message || "An error occurred during authentication.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-[#1a1a1a] to-gray-900">
        <Loader2 className="h-8 w-8 animate-spin text-[#B87333]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-[#1a1a1a] to-gray-900">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <img 
            src="/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png"
            alt="ThriveMT Logo"
            className="h-24 w-24 mx-auto object-contain filter drop-shadow-[0_0_12px_rgba(184,115,51,0.6)]"
          />
          
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-white">
              Thrive<span className="text-[#B87333]">MT</span>
            </h1>
            {showLogoutMessage ? (
              <p className="text-white/60 text-lg">
                You've been logged out successfully
              </p>
            ) : (
              <p className="text-white/60 text-lg">
                {isLogin ? "Welcome back" : "Create your account"}
              </p>
            )}
          </div>
        </div>

        <form onSubmit={handleAuth} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/80">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/80">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          <Button 
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#B87333] to-[#E5C5A1] hover:opacity-90 text-white py-3"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                {isLogin ? "Sign In" : "Create Account"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        <div className="text-center space-y-4">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#B87333] hover:text-[#E5C5A1] transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
          
          <div className="pt-4">
            <Button 
              variant="ghost"
              onClick={() => navigate("/app/dashboard")}
              className="text-white/60 hover:text-white hover:bg-white/10"
            >
              Continue as Guest
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
