
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useRegistrationState = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { toast } = useToast();
  
  // Get language preference
  const preferredLanguage = localStorage.getItem('preferredLanguage') || 'English';
  const isSpanish = preferredLanguage === 'Español';
  const isPortuguese = preferredLanguage === 'Português';

  const handleUserInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent, nextScreenSetter: () => void) => {
    e.preventDefault();
    if (!userInfo.name || !userInfo.email || !userInfo.password) {
      const errorMessages = {
        'English': {
          title: "Registration Error",
          description: "Please fill in all fields to continue."
        },
        'Español': {
          title: "Error de Registro",
          description: "Por favor completa todos los campos para continuar."
        },
        'Português': {
          title: "Erro de Registro",
          description: "Por favor, preencha todos os campos para continuar."
        }
      };
      
      const message = errorMessages[preferredLanguage as keyof typeof errorMessages] || errorMessages['English'];
      
      toast({
        title: message.title,
        description: message.description,
        variant: "destructive"
      });
      return;
    }
    
    try {
      // Attempt to create user account with Supabase
      const { data, error } = await supabase.auth.signUp({
        email: userInfo.email,
        password: userInfo.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: userInfo.name,
            name: userInfo.name,
          }
        }
      });

      if (error) {
        // Handle specific error cases
        let errorMessage = error.message;
        if (error.message.includes('already registered')) {
          errorMessage = isSpanish 
            ? "Este correo ya está registrado. Intenta iniciar sesión."
            : isPortuguese
            ? "Este e-mail já está registrado. Tente fazer login."
            : "This email is already registered. Try logging in.";
        }

        toast({
          title: isSpanish ? "Error de Registro" : isPortuguese ? "Erro de Registro" : "Registration Error",
          description: errorMessage,
          variant: "destructive"
        });
        return;
      }

      if (data.user) {
        const successMessages = {
          'English': {
            title: "Registration Successful",
            description: "Welcome to Thrive MT! Your journey to better mental health begins now."
          },
          'Español': {
            title: "Registro Exitoso",
            description: "¡Bienvenido a Thrive MT! Tu viaje hacia una mejor salud mental comienza ahora."
          },
          'Português': {
            title: "Registro bem-sucedido",
            description: "Bem-vindo ao Thrive MT! Sua jornada para uma melhor saúde mental começa agora."
          }
        };
        
        const message = successMessages[preferredLanguage as keyof typeof successMessages] || successMessages['English'];
        
        toast({
          title: message.title,
          description: message.description,
        });
        
        nextScreenSetter();
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: isSpanish ? "Error de Registro" : isPortuguese ? "Erro de Registro" : "Registration Error",
        description: isSpanish 
          ? "Ocurrió un error durante el registro. Inténtalo de nuevo."
          : isPortuguese
          ? "Ocorreu um erro durante o registro. Tente novamente."
          : "An error occurred during registration. Please try again.",
        variant: "destructive"
      });
    }
  };

  return {
    userInfo,
    isSpanish,
    isPortuguese,
    handleUserInfoChange,
    handleRegister
  };
};

export default useRegistrationState;
