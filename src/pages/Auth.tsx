
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Auth: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/");
    });
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) navigate("/");
    });
    return () => authListener.subscription.unsubscribe();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      toast({ title: "Missing credentials", description: "Please enter both email and password.", variant: "destructive" });
      setLoading(false);
      return;
    }

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        toast({ title: "Login failed", description: error.message, variant: "destructive" });
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email, password,
        options: { emailRedirectTo: `${window.location.origin}/` }
      });
      if (error) {
        toast({ title: "Sign up failed", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Sign up successful!", description: "Check your email for confirmation." });
        setIsLogin(true);
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      <Card className="w-full max-w-md shadow-xl border-2 border-indigo-200">
        <CardHeader>
          <CardTitle className="text-2xl">{isLogin ? "Log In" : "Sign Up"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleAuth}>
            <div>
              <label className="block mb-1">Email</label>
              <Input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Password</label>
              <Input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {isLogin ? "Log In" : "Sign Up"}
            </Button>
          </form>
          <Button
            variant="link"
            className="w-full mt-2"
            onClick={() => setIsLogin(l => !l)}
            disabled={loading}
          >
            {isLogin
              ? "Need an account? Sign up"
              : "Already have an account? Log in"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
