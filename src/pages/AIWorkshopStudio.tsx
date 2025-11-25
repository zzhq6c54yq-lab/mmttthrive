import React, { useState } from 'react';
import Page from '@/components/Page';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Play } from 'lucide-react';
import AIWorkshopPlayer from '@/components/workshop/AIWorkshopPlayer';

const AIWorkshopStudio = () => {
  const [selectedWorkshop, setSelectedWorkshop] = useState<string | null>(null);

  const workshops = [
    {
      id: 'mindful-communication',
      title: 'Mindful Communication',
      subtitle: 'Developing presence and intention in your interactions',
      description: 'Learn to communicate with clarity, compassion, and presence.',
      imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&q=80',
    },
    {
      id: 'emotional-regulation',
      title: 'Emotional Regulation',
      subtitle: 'Tools for understanding and managing your emotions',
      description: 'Develop skills to recognize, understand, and manage your emotions.',
      imageUrl: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=500&q=80',
    },
    {
      id: 'stress-management',
      title: 'Stress Management',
      subtitle: 'Practical techniques for managing stress',
      description: 'Build a personalized toolkit for handling life pressures.',
      imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&q=80',
    },
  ];

  // Workshop content data (from worksheetUtils.ts structure)
  const workshopContent: Record<string, any> = {
    'mindful-communication': {
      title: "Mindful Communication Workshop",
      subtitle: "Developing presence and intention in your interactions",
      introduction: "This workshop will help you develop more mindful communication habits.",
      sections: [
        {
          title: "Communication Awareness",
          description: "Before changing communication patterns, it is important to become aware of your current habits. Notice how you typically communicate when you are feeling stressed or rushed. Pay attention to situations where you find communication most challenging.",
          exercises: [
            {
              title: "Communication Self-Assessment",
              instructions: "Reflect on your typical communication patterns in different contexts.",
              prompts: [
                "How do you typically communicate when you are feeling stressed or rushed?",
                "In what situations do you find communication most challenging?",
                "How do you think others perceive your communication style?"
              ]
            }
          ]
        },
        {
          title: "Active Listening Practice",
          description: "Active listening is a cornerstone of mindful communication. It means truly focusing on what others are saying without mentally preparing your reply. This practice can transform your relationships and help you connect more deeply with others.",
          exercises: [
            {
              title: "Listening Without Planning Your Response",
              instructions: "Practice truly focusing on what others are saying without mentally preparing your reply.",
              prompts: [
                "What makes it difficult for you to listen fully without planning your response?",
                "How does the conversation feel different when you focus entirely on listening?",
                "What did you notice about your conversation partner when you practiced active listening?"
              ]
            }
          ]
        }
      ]
    },
    'emotional-regulation': {
      title: "Emotional Regulation Workshop",
      subtitle: "Tools for understanding and managing your emotions",
      introduction: "This workshop provides a framework for developing your emotional regulation skills.",
      sections: [
        {
          title: "Emotion Awareness",
          description: "Recognizing and naming emotions is the first step toward regulating them effectively. When we can identify what we are feeling, we gain power over our emotional responses. Practice identifying your emotions throughout the day.",
          exercises: [
            {
              title: "Emotion Tracking",
              instructions: "Practice identifying your emotions throughout the day.",
              prompts: [
                "What emotions do you experience most frequently?",
                "Where do you feel different emotions in your body?",
                "How quickly do your emotions tend to change or intensify?"
              ]
            }
          ]
        },
        {
          title: "Regulation Strategies",
          description: "Different situations call for different emotion regulation approaches. Building a personalized toolkit of strategies helps you respond to emotions in healthier ways. Some strategies work better for certain emotions or situations.",
          exercises: [
            {
              title: "Creating Your Regulation Toolkit",
              instructions: "Develop a personalized set of strategies for managing difficult emotions.",
              prompts: [
                "What helps you calm down when you are feeling overwhelmed?",
                "Which mindfulness techniques work best for you in emotional situations?",
                "How can you create space between feeling an emotion and acting on it?"
              ]
            }
          ]
        }
      ]
    },
    'stress-management': {
      title: "Stress Management Workshop",
      subtitle: "Practical techniques for managing stress",
      introduction: "This workshop will help you develop effective strategies for managing stress in your daily life.",
      sections: [
        {
          title: "Stress Awareness",
          description: "Understanding your stress patterns is essential for effective management. Notice what situations, people, or thoughts trigger stress for you. Pay attention to how your body responds when you are under stress.",
          exercises: [
            {
              title: "Stress Inventory",
              instructions: "Identify your major sources of stress and how they affect you.",
              prompts: [
                "What situations, people, or thoughts trigger stress for you?",
                "How does your body respond when you are under stress?",
                "What patterns do you notice in how you typically cope with stress?"
              ]
            }
          ]
        },
        {
          title: "Stress Reduction Techniques",
          description: "Different techniques work for different people and situations. Build your personal stress management plan by identifying what works best for you. Some techniques provide quick relief, while others build long-term resilience.",
          exercises: [
            {
              title: "Building Your Stress Management Plan",
              instructions: "Create a practical plan for managing stress in various situations.",
              prompts: [
                "Which quick stress-relief techniques work best for you in the moment?",
                "What longer-term practices could you incorporate into your routine?",
                "How will you remind yourself to use these techniques when stress arises?"
              ]
            }
          ]
        }
      ]
    }
  };

  if (selectedWorkshop) {
    const content = workshopContent[selectedWorkshop];
    return (
      <Page title="AI Workshop Studio" showBackButton={true}>
        <div className="container mx-auto px-4 py-8">
          <Button
            variant="ghost"
            onClick={() => setSelectedWorkshop(null)}
            className="mb-6"
          >
            ← Back to Workshops
          </Button>
          <AIWorkshopPlayer
            workshopId={selectedWorkshop}
            title={content.title}
            subtitle={content.subtitle}
            introduction={content.introduction}
            sections={content.sections}
          />
        </div>
      </Page>
    );
  }

  return (
    <Page title="AI Workshop Studio" showBackButton={true}>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-foreground" style={{ textShadow: '0 2px 10px rgba(212, 175, 55, 0.3)' }}>
            AI Workshop Studio
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience interactive workshops with AI narration, guided exercises, and downloadable materials
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workshops.map((workshop) => (
            <Card
              key={workshop.id}
              className="group hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border-primary/20"
              onClick={() => setSelectedWorkshop(workshop.id)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={workshop.imageUrl}
                  alt={workshop.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-foreground" style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)' }}>
                    {workshop.title}
                  </h3>
                </div>
              </div>
              
              <CardHeader>
                <CardDescription className="text-base">
                  {workshop.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Button className="w-full gap-2 bg-primary hover:bg-primary/90">
                  <Play className="h-4 w-4" />
                  Start Workshop
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 p-6 bg-card/50 backdrop-blur-sm rounded-lg border border-border">
          <div className="flex items-start gap-4">
            <BookOpen className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">How It Works</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong>AI Narration:</strong> Professional voice guides you through each section</li>
                <li>• <strong>Interactive Exercises:</strong> Pause points for reflection and practice</li>
                <li>• <strong>Customizable Experience:</strong> Adjust playback speed and voice selection</li>
                <li>• <strong>Downloadable Worksheets:</strong> Take your learning offline with PDF materials</li>
                <li>• <strong>100% Free:</strong> Uses your browser's built-in speech synthesis</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default AIWorkshopStudio;
