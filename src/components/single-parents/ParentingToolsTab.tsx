import React from 'react';
import { useNavigate } from 'react-router-dom';
import FeatureCard from './FeatureCard';
import { Baby, Award, MessageCircle, ArrowRightLeft, Users, Heart } from 'lucide-react';

const ParentingToolsTab: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Age-Appropriate Guidance',
      description: 'Parenting strategies for every developmental stage',
      icon: Baby,
      path: '/resource-library'
    },
    {
      title: 'Positive Discipline Strategies',
      description: 'Effective discipline without burnout',
      icon: Award,
      path: '/workshops'
    },
    {
      title: 'Co-Parenting Communication',
      description: 'Tools for healthy co-parenting relationships',
      icon: MessageCircle,
      path: '/resource-library'
    },
    {
      title: 'Managing Transitions',
      description: 'Help children adjust to family changes',
      icon: ArrowRightLeft,
      path: '/resource-library'
    },
    {
      title: 'Teen Challenges',
      description: 'Navigate adolescence as a single parent',
      icon: Users,
      path: '/resource-library'
    },
    {
      title: 'Special Needs Support',
      description: 'Resources for parents of children with special needs',
      icon: Heart,
      path: '/resource-library'
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

export default ParentingToolsTab;
