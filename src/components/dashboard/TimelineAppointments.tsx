import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Video, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useTranslation from '@/hooks/useTranslation';

const TimelineAppointments: React.FC = () => {
  const navigate = useNavigate();
  const { isSpanish } = useTranslation();

  const appointments = [
    {
      id: 1,
      title: isSpanish ? 'Dr. Johnson' : 'Dr. Johnson',
      time: '2:30 PM',
      date: isSpanish ? 'Mañana' : 'Tomorrow',
      type: 'video',
      color: 'from-mental-health to-mental-health/70',
    },
    {
      id: 2,
      title: isSpanish ? 'Taller de Grupo' : 'Group Workshop',
      time: '4:00 PM',
      date: isSpanish ? 'Viernes' : 'Friday',
      type: 'group',
      color: 'from-learning to-learning/70',
    },
  ];

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
      className="bg-card rounded-3xl p-6 shadow-md"
    >
      <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
        <Calendar className="h-5 w-5" />
        {isSpanish ? '📅 Próximas Sesiones' : '📅 Upcoming Sessions'}
      </h3>

      <div className="space-y-4 relative pl-6">
        {/* Timeline Line */}
        <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-mental-health via-learning to-transparent" />

        {appointments.map((appointment, index) => (
          <motion.div
            key={appointment.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            {/* Timeline Dot */}
            <div className={`absolute -left-6 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gradient-to-r ${appointment.color} border-4 border-card`} />

            <div className="bg-gradient-to-r from-muted/50 to-transparent rounded-2xl p-4 hover:from-muted/70 transition-all cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {appointment.type === 'video' ? (
                      <Video className="h-4 w-4 text-mental-health" />
                    ) : (
                      <Users className="h-4 w-4 text-learning" />
                    )}
                    <h4 className="font-medium text-foreground">{appointment.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {appointment.date} • {appointment.time}
                  </p>
                </div>
                <button
                  onClick={() => navigate('/scheduling')}
                  className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
                >
                  {isSpanish ? 'Unirse' : 'Join'}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <button
        onClick={() => navigate('/scheduling')}
        className="w-full mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors text-center"
      >
        {isSpanish ? 'Ver todas las citas →' : 'View all appointments →'}
      </button>
    </motion.div>
  );
};

export default TimelineAppointments;
