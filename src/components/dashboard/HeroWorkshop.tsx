import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useTranslation from '@/hooks/useTranslation';

const HeroWorkshop: React.FC = () => {
  const navigate = useNavigate();
  const { isSpanish } = useTranslation();

  const workshop = {
    id: 'mindful-communication',
    title: isSpanish ? 'Comunicación Consciente' : 'Mindful Communication',
    description: isSpanish 
      ? 'Aprende a expresarte auténticamente y conectar profundamente con otros'
      : 'Learn to express yourself authentically and connect deeply with others',
    date: isSpanish ? 'Mañana 6PM' : 'Tomorrow 6PM',
    participants: 12,
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  };

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
      className="relative overflow-hidden rounded-3xl shadow-lg cursor-pointer group"
      onClick={() => navigate(`/workshop/${workshop.id}`)}
    >
      {/* Workshop Image */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={workshop.image}
          alt={workshop.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Live Badge (if applicable) */}
        <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-urgent/90 backdrop-blur-md text-white text-sm font-medium flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          {isSpanish ? 'PRÓXIMAMENTE' : 'UPCOMING'}
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-3xl font-bold text-white mb-2">
            🎯 {workshop.title}
          </h3>
          <p className="text-white/90 text-lg mb-4">
            {workshop.description}
          </p>

          <div className="flex items-center gap-6 text-white/80 mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>{workshop.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span>{workshop.participants} {isSpanish ? 'inscritos' : 'enrolled'}</span>
            </div>
          </div>

          <button className="flex items-center gap-2 bg-white text-foreground px-6 py-3 rounded-full font-medium hover:bg-white/90 transition-colors group-hover:gap-3 group-hover:px-8">
            {isSpanish ? 'Unirse al Taller' : 'Join Workshop'}
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroWorkshop;
