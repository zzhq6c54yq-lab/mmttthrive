import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Heart, Sparkles, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useTranslation from '@/hooks/useTranslation';

const CompactAssessments: React.FC = () => {
  const navigate = useNavigate();
  const { isSpanish } = useTranslation();

  const assessments = [
    { id: 'phq9', icon: Brain, color: 'bg-mental-health/20 text-mental-health', label: 'PHQ-9' },
    { id: 'gad7', icon: Heart, color: 'bg-wellness/20 text-wellness', label: 'GAD-7' },
    { id: 'stress', icon: Zap, color: 'bg-urgent/20 text-urgent', label: isSpanish ? 'Estrés' : 'Stress' },
    { id: 'mood', icon: Sparkles, color: 'bg-learning/20 text-learning', label: isSpanish ? 'Ánimo' : 'Mood' },
  ];

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
      className="bg-card rounded-3xl p-6 shadow-md"
    >
      <h3 className="text-xl font-semibold text-foreground mb-4">
        {isSpanish ? '🧠 Evaluaciones Rápidas' : '🧠 Quick Assessments'}
      </h3>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {assessments.map((assessment, index) => {
          const Icon = assessment.icon;
          return (
            <motion.button
              key={assessment.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => navigate('/mental-wellness')}
              className={`${assessment.color} rounded-2xl p-4 hover:scale-105 transition-transform group`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="h-8 w-8 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-medium">{assessment.label}</p>
            </motion.button>
          );
        })}
      </div>

      <button
        onClick={() => navigate('/mental-wellness')}
        className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors text-center"
      >
        {isSpanish ? 'Ver todas →' : 'View all →'}
      </button>
    </motion.div>
  );
};

export default CompactAssessments;
