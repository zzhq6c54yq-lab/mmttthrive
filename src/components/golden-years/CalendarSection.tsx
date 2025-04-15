
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";

interface CalendarSectionProps {
  onEventClick: (event: string) => void;
  onViewAllClick: () => void;
}

const CalendarSection: React.FC<CalendarSectionProps> = ({ onEventClick, onViewAllClick }) => {
  const { preferredLanguage, isSpanish, isPortuguese } = useTranslation();
  
  const texts = {
    title: {
      'English': 'Upcoming Events',
      'Español': 'Próximos Eventos',
      'Português': 'Próximos Eventos'
    },
    viewAll: {
      'English': 'View All Events',
      'Español': 'Ver Todos los Eventos',
      'Português': 'Ver Todos os Eventos'
    },
    event1: {
      title: {
        'English': 'Virtual Wellness Workshop',
        'Español': 'Taller Virtual de Bienestar',
        'Português': 'Workshop Virtual de Bem-Estar'
      },
      date: {
        'English': 'June 20, 2025 • 2:00 PM',
        'Español': '20 de Junio, 2025 • 2:00 PM',
        'Português': '20 de Junho, 2025 • 14:00'
      },
      description: {
        'English': 'Learn gentle exercises you can do at home to maintain mobility.',
        'Español': 'Aprenda ejercicios suaves que puede hacer en casa para mantener la movilidad.',
        'Português': 'Aprenda exercícios suaves que você pode fazer em casa para manter a mobilidade.'
      }
    },
    event2: {
      title: {
        'English': 'Memory Sharing Circle',
        'Español': 'Círculo de Compartir Memorias',
        'Português': 'Círculo de Compartilhamento de Memórias'
      },
      date: {
        'English': 'June 25, 2025 • 3:30 PM',
        'Español': '25 de Junio, 2025 • 3:30 PM',
        'Português': '25 de Junho, 2025 • 15:30'
      },
      description: {
        'English': 'Join our virtual circle to share stories from your past with peers.',
        'Español': 'Únase a nuestro círculo virtual para compartir historias de su pasado con compañeros.',
        'Português': 'Junte-se ao nosso círculo virtual para compartilhar histórias do seu passado com colegas.'
      }
    }
  };
  
  const title = texts.title[preferredLanguage as keyof typeof texts.title] || texts.title['English'];
  const viewAllText = texts.viewAll[preferredLanguage as keyof typeof texts.viewAll] || texts.viewAll['English'];
  
  const event1Title = texts.event1.title[preferredLanguage as keyof typeof texts.event1.title] || texts.event1.title['English'];
  const event1Date = texts.event1.date[preferredLanguage as keyof typeof texts.event1.date] || texts.event1.date['English'];
  const event1Description = texts.event1.description[preferredLanguage as keyof typeof texts.event1.description] || texts.event1.description['English'];
  
  const event2Title = texts.event2.title[preferredLanguage as keyof typeof texts.event2.title] || texts.event2.title['English'];
  const event2Date = texts.event2.date[preferredLanguage as keyof typeof texts.event2.date] || texts.event2.date['English'];
  const event2Description = texts.event2.description[preferredLanguage as keyof typeof texts.event2.description] || texts.event2.description['English'];

  return (
    <div className="bg-amber-800/30 backdrop-blur-md border border-amber-200/30 rounded-xl p-6 mb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-medium flex items-center">
          <Calendar className="mr-2 h-6 w-6 text-amber-300" />
          {title}
        </h2>
        <Button 
          variant="outline" 
          className="border-amber-400 text-amber-100 hover:bg-amber-700/50"
          onClick={onViewAllClick}
        >
          {viewAllText}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div 
          className="bg-amber-700/30 p-4 rounded-lg cursor-pointer hover:bg-amber-700/40 transition"
          onClick={() => onEventClick("Virtual Wellness Workshop")}
        >
          <p className="text-amber-200 text-sm">{event1Date}</p>
          <h4 className="font-medium mb-1">{event1Title}</h4>
          <p className="text-sm text-amber-100">{event1Description}</p>
        </div>
        
        <div 
          className="bg-amber-700/30 p-4 rounded-lg cursor-pointer hover:bg-amber-700/40 transition"
          onClick={() => onEventClick("Memory Sharing Circle")}
        >
          <p className="text-amber-200 text-sm">{event2Date}</p>
          <h4 className="font-medium mb-1">{event2Title}</h4>
          <p className="text-sm text-amber-100">{event2Description}</p>
        </div>
      </div>
    </div>
  );
};

export default CalendarSection;
