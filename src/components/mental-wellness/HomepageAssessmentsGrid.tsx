import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Star, ArrowRight } from 'lucide-react';
import { mentalHealthAssessments, MentalHealthAssessment } from '@/data/mentalHealthAssessments';
import useTranslation from '@/hooks/useTranslation';
import { useNavigate } from 'react-router-dom';
import AssessmentModal from './AssessmentModal';

const HomepageAssessmentsGrid: React.FC = () => {
  const { isSpanish } = useTranslation();
  const navigate = useNavigate();
  const [selectedAssessment, setSelectedAssessment] = useState<MentalHealthAssessment | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Get the first 6 assessments for homepage display with updated cover images
  const featuredAssessments = mentalHealthAssessments.slice(0, 6).map((assessment, index) => {
    const coverImages = [
      'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop', // woman on bed with laptop
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop', // woman with laptop
      'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&h=600&fit=crop', // blue starry night
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop', // foggy mountain
      'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=600&fit=crop', // mountain view
      'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop'  // living room
    ];
    
    return {
      ...assessment,
      coverImage: coverImages[index] || assessment.coverImage
    };
  });

  const handleAssessmentClick = (assessment: MentalHealthAssessment) => {
    setSelectedAssessment(assessment);
    setModalOpen(true);
  };

  const handleViewAllAssessments = () => {
    navigate('/mental-wellness-assessments');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
      case 'principiante':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
      case 'intermedio':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
      case 'avanzado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const translations = {
    title: isSpanish ? 'Evaluaciones de Salud Mental' : 'Mental Health Quiz and Assessments',
    takeAssessment: isSpanish ? 'Comenzar Evaluación' : 'Start Assessment',
    takeQuiz: isSpanish ? 'Comenzar Quiz' : 'Start Quiz',
    viewAllAssessments: isSpanish ? 'Ver Todas las Evaluaciones' : 'View All Assessments'
  };

  return (
    <div className="space-y-6">
      {/* Assessments Grid - 2 rows of 3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredAssessments.map((assessment) => (
          <Card 
            key={assessment.id} 
            className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer group"
            onClick={() => handleAssessmentClick(assessment)}
          >
            <CardHeader className="pb-4">
              {/* Cover Image */}
              <div className="w-full h-32 mb-3 rounded-lg overflow-hidden">
                <img
                  src={assessment.coverImage}
                  alt={isSpanish ? assessment.titleSpanish : assessment.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <CardTitle className="text-white text-lg line-clamp-2">
                {isSpanish ? assessment.titleSpanish : assessment.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Description */}
              <p className="text-white/80 text-sm line-clamp-2">
                {isSpanish ? assessment.descriptionSpanish : assessment.description}
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <Badge className={getDifficultyColor(assessment.difficulty)}>
                  {isSpanish ? assessment.difficultySpanish : assessment.difficulty}
                </Badge>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  {isSpanish ? assessment.categorySpanish : assessment.category}
                </Badge>
              </div>

              {/* Meta Information */}
              <div className="flex items-center justify-between text-white/60 text-sm">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {isSpanish ? assessment.durationSpanish : assessment.duration}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span className="truncate">
                    {isSpanish ? assessment.targetAudienceSpanish : assessment.targetAudience}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <Button
                className="w-full mt-4 bg-primary hover:bg-primary/80 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAssessmentClick(assessment);
                }}
              >
                <Star className="h-4 w-4 mr-2" />
                {assessment.category.toLowerCase().includes('quiz') 
                  ? translations.takeQuiz 
                  : translations.takeAssessment
                }
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View All Assessments Button */}
      <div className="text-center pt-4">
        <Button
          onClick={handleViewAllAssessments}
          variant="outline"
          className="bg-white/10 border-white/30 text-white hover:bg-white/20 px-8 py-3"
          size="lg"
        >
          {translations.viewAllAssessments}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      {/* Assessment Modal */}
      <AssessmentModal
        assessment={selectedAssessment}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
};

export default HomepageAssessmentsGrid;