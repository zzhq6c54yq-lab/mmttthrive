import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Heart, Activity, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useTranslation from '@/hooks/useTranslation';

const WellnessRibbon: React.FC = () => {
  const navigate = useNavigate();
  const { isSpanish } = useTranslation();

  const challenges = [
    {
      id: 'meditation',
      title: isSpanish ? 'Meditación' : 'Meditation',
      icon: Brain,
      completed: true,
      progress: 100,
      color: 'from-wellness to-wellness/70',
    },
    {
      id: 'gratitude',
      title: isSpanish ? 'Gratitud' : 'Gratitude',
      icon: Heart,
      completed: false,
      progress: 0,
      color: 'from-community to-community/70',
    },
    {
      id: 'exercise',
      title: isSpanish ? 'Ejercicio' : 'Exercise',
      icon: Activity,
      completed: false,
      progress: 60,
      color: 'from-learning to-learning/70',
    },
    {
      id: 'hydration',
      title: isSpanish ? 'Hidratación' : 'Hydration',
      icon: Activity,
      completed: false,
      progress: 40,
      color: 'from-mental-health to-mental-health/70',
    },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-foreground mb-4">
        {isSpanish ? '✨ Desafíos de Hoy' : '✨ Today\'s Challenges'}
      </h2>
      <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
        {challenges.map((challenge, index) => {
          const Icon = challenge.icon;
          return (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex-shrink-0"
            >
              <motion.button
                onClick={() => navigate('/wellness-challenges')}
                className="relative w-28 h-28 rounded-full bg-white/60 backdrop-blur-md shadow-md overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Progress Ring */}
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle
                    cx="56"
                    cy="56"
                    r="50"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    className="text-muted"
                  />
                  <circle
                    cx="56"
                    cy="56"
                    r="50"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    className={`bg-gradient-to-r ${challenge.color}`}
                    style={{
                      strokeDasharray: `${2 * Math.PI * 50}`,
                      strokeDashoffset: `${2 * Math.PI * 50 * (1 - challenge.progress / 100)}`,
                      transition: 'stroke-dashoffset 0.5s ease',
                    }}
                    strokeLinecap="round"
                  />
                </svg>

                {/* Icon */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Icon className={`h-8 w-8 mb-1 ${challenge.completed ? 'text-wellness' : 'text-foreground/70'}`} />
                  {challenge.completed && (
                    <CheckCircle className="absolute top-2 right-2 h-5 w-5 text-wellness" />
                  )}
                </div>
              </motion.button>
              
              <p className="text-center text-sm font-medium text-foreground mt-2">
                {challenge.title}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default WellnessRibbon;
