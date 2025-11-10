import React from 'react';
import { useNavigate } from 'react-router-dom';
import FeatureCard from './FeatureCard';
import { Brain, Flame, Clock, Heart, Users, AlertCircle } from 'lucide-react';

const ParentWellnessTab: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Stress Management',
      description: 'Tools and techniques to manage single parent stress',
      icon: Brain,
      path: '/mental-wellness'
    },
    {
      title: 'Burnout Prevention',
      description: 'Assessment and strategies to prevent parental burnout',
      icon: Flame,
      path: '/single-parents-assessments/burnout'
    },
    {
      title: 'Self-Care on a Tight Schedule',
      description: 'Quick self-care practices for busy parents',
      icon: Clock,
      path: '/guided-practices'
    },
    {
      title: 'Emotional Resilience',
      description: 'Build strength through challenging times',
      icon: Heart,
      path: '/workshops'
    },
    {
      title: 'Dating & Relationships',
      description: 'Navigate new relationships as a single parent',
      icon: Users,
      path: '/resource-library'
    },
    {
      title: 'Crisis Support',
      description: 'Immediate help when you need it most',
      icon: AlertCircle,
      path: '/crisis-support'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {features.map(feature => (
        <FeatureCard
          key={feature.title}
          title={feature.title}
          description={feature.description}
          icon={feature.icon}
          onClick={() => navigate(feature.path)}
        />
      ))}
    </div>
  );
};

export default ParentWellnessTab;
