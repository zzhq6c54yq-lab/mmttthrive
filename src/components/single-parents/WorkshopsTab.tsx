import React from 'react';
import { useNavigate } from 'react-router-dom';
import FeatureCard from './FeatureCard';
import { Briefcase, Users, DollarSign, Heart, Sparkles, Calendar } from 'lucide-react';

const WorkshopsTab: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Work-Life Integration',
      description: 'Balance career and parenting successfully',
      icon: Briefcase,
      path: '/workshops'
    },
    {
      title: 'Building Your Support Network',
      description: 'Create your village of support',
      icon: Users,
      path: '/community-support'
    },
    {
      title: 'Financial Planning for Single Parents',
      description: 'Budgeting and financial wellness strategies',
      icon: DollarSign,
      path: '/workshops'
    },
    {
      title: 'Self-Compassion for Parents',
      description: 'Practice kindness toward yourself',
      icon: Heart,
      path: '/workshops'
    },
    {
      title: 'Managing Parenting Guilt',
      description: 'Let go of guilt and embrace your journey',
      icon: Sparkles,
      path: '/workshops'
    },
    {
      title: 'Upcoming Live Events',
      description: 'Join live workshops and support groups',
      icon: Calendar,
      path: '/virtual-meetings'
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

export default WorkshopsTab;
