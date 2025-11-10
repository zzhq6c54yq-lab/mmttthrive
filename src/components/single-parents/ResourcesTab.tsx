import React from 'react';
import { useNavigate } from 'react-router-dom';
import FeatureCard from './FeatureCard';
import { DollarSign, Scale, Users, BookOpen, Stethoscope, Phone } from 'lucide-react';

const ResourcesTab: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Financial Assistance Programs',
      description: 'Find help with childcare, food, housing, and more',
      icon: DollarSign,
      path: '/resource-library'
    },
    {
      title: 'Legal Resources',
      description: 'Custody, child support, and family law guidance',
      icon: Scale,
      path: '/resource-library'
    },
    {
      title: 'Childcare Solutions',
      description: 'Connect with childcare options and support',
      icon: Users,
      path: '/community-support'
    },
    {
      title: 'Educational Support',
      description: 'Homework help, tutoring, and school resources',
      icon: BookOpen,
      path: '/resource-library'
    },
    {
      title: 'Healthcare Navigation',
      description: 'Access affordable healthcare for your family',
      icon: Stethoscope,
      path: '/resource-library'
    },
    {
      title: 'Emergency Resources',
      description: 'Crisis hotlines and immediate assistance',
      icon: Phone,
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

export default ResourcesTab;
