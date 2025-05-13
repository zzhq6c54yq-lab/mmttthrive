
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

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

  const handleRegister = (e: React.FormEvent, nextScreenSetter: () => void) => {
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
