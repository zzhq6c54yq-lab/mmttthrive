import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Loader2 } from 'lucide-react';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import useTranslation from '@/hooks/useTranslation';

const emailSchema = z.string().email('Please enter a valid email address');
const passwordSchema = z.string().min(6, 'Password must be at least 6 characters');
const displayNameSchema = z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters');

const SiteAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; displayName?: string }>({});
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isSpanish } = useTranslation();

  useEffect(() => {
    // Check if user is already logged in
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        // Redirect authenticated users to the main app
        window.location.href = 'https://thrive-mental.app/app';
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        window.location.href = 'https://thrive-mental.app/app';
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const validateForm = (isSignUp: boolean): boolean => {
    const newErrors: { email?: string; password?: string; displayName?: string } = {};

    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) {
      newErrors.email = emailResult.error.errors[0].message;
    }

    const passwordResult = passwordSchema.safeParse(password);
    if (!passwordResult.success) {
      newErrors.password = passwordResult.error.errors[0].message;
    }

    if (isSignUp && displayName) {
      const nameResult = displayNameSchema.safeParse(displayName);
      if (!nameResult.success) {
        newErrors.displayName = nameResult.error.errors[0].message;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm(false)) return;

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast({
            title: isSpanish ? 'Error de inicio de sesión' : 'Login Failed',
            description: isSpanish 
              ? 'Correo o contraseña incorrectos. Por favor, verifica tus credenciales.'
              : 'Invalid email or password. Please check your credentials.',
            variant: 'destructive',
          });
        } else {
          toast({
            title: isSpanish ? 'Error' : 'Error',
            description: error.message,
            variant: 'destructive',
          });
        }
      }
    } catch (error) {
      toast({
        title: isSpanish ? 'Error' : 'Error',
        description: isSpanish ? 'Algo salió mal. Intenta de nuevo.' : 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm(true)) return;

    setIsLoading(true);
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            display_name: displayName.trim() || undefined,
          },
        },
      });

      if (error) {
        if (error.message.includes('already registered')) {
          toast({
            title: isSpanish ? 'Cuenta existente' : 'Account Exists',
            description: isSpanish
              ? 'Este correo ya está registrado. Intenta iniciar sesión.'
              : 'This email is already registered. Try signing in instead.',
            variant: 'destructive',
          });
        } else {
          toast({
            title: isSpanish ? 'Error de registro' : 'Sign Up Error',
            description: error.message,
            variant: 'destructive',
          });
        }
      } else {
        toast({
          title: isSpanish ? '¡Cuenta creada!' : 'Account Created!',
          description: isSpanish
            ? 'Revisa tu correo para confirmar tu cuenta.'
            : 'Check your email to confirm your account.',
        });
      }
    } catch (error) {
      toast({
        title: isSpanish ? 'Error' : 'Error',
        description: isSpanish ? 'Algo salió mal. Intenta de nuevo.' : 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 py-12">
      {/* Back button */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 flex items-center gap-2 text-white/60 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="text-sm">{isSpanish ? 'Volver' : 'Back'}</span>
      </Link>

      <Card className="w-full max-w-md bg-slate-800/50 border-[#B87333]/30 backdrop-blur-sm">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-gradient-to-br from-[#B87333]/30 to-[#E5C5A1]/20 border border-[#B87333]/40">
              <img 
                src="/lovable-uploads/c193c078-af43-4eb1-8fa8-bf5a6eb66e3f.png" 
                alt="Thrive MT" 
                className="h-10 w-10"
              />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#B87333] to-[#E5C5A1] bg-clip-text text-transparent">
            {isSpanish ? 'Bienvenido a Thrive MT' : 'Welcome to Thrive MT'}
          </CardTitle>
          <CardDescription className="text-white/60">
            {isSpanish 
              ? 'Tu viaje hacia el bienestar mental comienza aquí'
              : 'Your mental wellness journey starts here'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-slate-700/50">
              <TabsTrigger 
                value="signin" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#B87333] data-[state=active]:to-[#E5C5A1] data-[state=active]:text-white"
              >
                {isSpanish ? 'Iniciar Sesión' : 'Sign In'}
              </TabsTrigger>
              <TabsTrigger 
                value="signup"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#B87333] data-[state=active]:to-[#E5C5A1] data-[state=active]:text-white"
              >
                {isSpanish ? 'Registrarse' : 'Sign Up'}
              </TabsTrigger>
            </TabsList>

            {/* Sign In Tab */}
            <TabsContent value="signin" className="mt-6">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email" className="text-white/80">
                    {isSpanish ? 'Correo electrónico' : 'Email'}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder={isSpanish ? 'tu@email.com' : 'you@email.com'}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-slate-700/50 border-white/10 text-white placeholder:text-white/40 focus:border-[#B87333]"
                    />
                  </div>
                  {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signin-password" className="text-white/80">
                    {isSpanish ? 'Contraseña' : 'Password'}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                    <Input
                      id="signin-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 bg-slate-700/50 border-white/10 text-white placeholder:text-white/40 focus:border-[#B87333]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-400 text-sm">{errors.password}</p>}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-[#B87333] to-[#E5C5A1] hover:from-[#A56625] hover:to-[#D4B48F] text-white font-medium"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    isSpanish ? 'Iniciar Sesión' : 'Sign In'
                  )}
                </Button>
              </form>
            </TabsContent>

            {/* Sign Up Tab */}
            <TabsContent value="signup" className="mt-6">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="text-white/80">
                    {isSpanish ? 'Nombre (opcional)' : 'Name (optional)'}
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder={isSpanish ? 'Tu nombre' : 'Your name'}
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="pl-10 bg-slate-700/50 border-white/10 text-white placeholder:text-white/40 focus:border-[#B87333]"
                    />
                  </div>
                  {errors.displayName && <p className="text-red-400 text-sm">{errors.displayName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-white/80">
                    {isSpanish ? 'Correo electrónico' : 'Email'}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder={isSpanish ? 'tu@email.com' : 'you@email.com'}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-slate-700/50 border-white/10 text-white placeholder:text-white/40 focus:border-[#B87333]"
                    />
                  </div>
                  {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-white/80">
                    {isSpanish ? 'Contraseña' : 'Password'}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                    <Input
                      id="signup-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder={isSpanish ? 'Mínimo 6 caracteres' : 'At least 6 characters'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 bg-slate-700/50 border-white/10 text-white placeholder:text-white/40 focus:border-[#B87333]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-400 text-sm">{errors.password}</p>}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-[#B87333] to-[#E5C5A1] hover:from-[#A56625] hover:to-[#D4B48F] text-white font-medium"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    isSpanish ? 'Crear Cuenta' : 'Create Account'
                  )}
                </Button>

                <p className="text-xs text-white/50 text-center">
                  {isSpanish 
                    ? 'Al registrarte, aceptas nuestros '
                    : 'By signing up, you agree to our '}
                  <Link to="/terms" className="text-[#E5C5A1] hover:underline">
                    {isSpanish ? 'Términos de Servicio' : 'Terms of Service'}
                  </Link>
                  {isSpanish ? ' y ' : ' and '}
                  <Link to="/privacy" className="text-[#E5C5A1] hover:underline">
                    {isSpanish ? 'Política de Privacidad' : 'Privacy Policy'}
                  </Link>
                </p>
              </form>
            </TabsContent>
          </Tabs>

          {/* Demo link */}
          <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <p className="text-sm text-white/50">
              {isSpanish ? '¿Quieres explorar primero?' : 'Want to explore first?'}
            </p>
            <Link 
              to="/demo/try" 
              className="text-sm text-[#E5C5A1] hover:underline"
            >
              {isSpanish ? 'Prueba nuestra demo interactiva' : 'Try our interactive demo'}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteAuth;
