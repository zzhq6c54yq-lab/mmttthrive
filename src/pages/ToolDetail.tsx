
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { toolCategories } from '@/data/toolCategories';
import { Button } from '@/components/ui/button';
import HomeButton from '@/components/HomeButton';
import InteractiveToolContent from '@/components/InteractiveToolContent';
import { useToast } from '@/hooks/use-toast';

const ToolDetail = () => {
  const { toolId } = useParams<{ toolId: string }>();
  const navigate = useNavigate();
  const [tool, setTool] = useState(null);
  const [showInteractive, setShowInteractive] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const foundTool = toolCategories.find(tool => 
      tool.title.toLowerCase().replace(/\s+/g, '-') === toolId
    );
    setTool(foundTool);
  }, [toolId]);

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Tool Not Found</h2>
          <p className="text-gray-700 mb-4">
            The requested tool could not be found. Please check the URL or return to the tools directory.
          </p>
          <Button onClick={() => navigate("/mental-wellness-tools")}>
            Back to Mental Wellness Tools
          </Button>
        </div>
      </div>
    );
  }

  const howToUseContent = {
    "Mood Tracking": "Track your mood daily by selecting how you feel and noting factors that may have influenced your emotions. Review your patterns weekly to identify triggers and trends.",
    "Meditation & Mindfulness": "Begin with 5-minute sessions in a quiet space. Focus on your breath, and when your mind wanders, gently bring attention back to breathing. Gradually increase duration as you become more comfortable.",
    "CBT Techniques": "Identify negative thoughts, challenge their accuracy, and replace them with more balanced perspectives. Use the provided worksheets to track your thought patterns and practice reframing.",
    "Anxiety Management": "When feeling anxious, use the 5-4-3-2-1 grounding technique: acknowledge 5 things you see, 4 things you feel, 3 things you hear, 2 things you smell, and 1 thing you taste.",
    "Sleep Improvement": "Create a consistent sleep schedule, avoid screens 1 hour before bed, keep your bedroom cool and dark, and practice the provided relaxation exercises if you have trouble falling asleep.",
    "Community Support": "Join discussion forums relevant to your experiences, share your journey when comfortable, and offer support to others. Attend weekly check-ins to build connections with peers.",
    "Self-Help Resources": "Browse the curated articles and videos, bookmark content relevant to your needs, and set aside 15 minutes daily to engage with these materials. Apply one new idea each week.",
    "Therapist Connection": "Complete your profile with your concerns and preferences, browse matched therapists, and schedule a consultation. Prepare for sessions using the session prep template.",
    "Journaling": "Write for 10 minutes daily without judgment or editing. Use the provided prompts when you need inspiration, and review entries monthly to observe patterns in your thoughts and feelings.",
    "Crisis Support": "Save emergency contacts to your profile. If experiencing a crisis, use the guided breathing tool while the app connects you with appropriate resources or hotlines.",
    "Exercise & Fitness": "Start with the beginner-friendly 10-minute routines designed specifically to boost mood and reduce stress. Track your mood before and after each session to notice improvements.",
    "Nutrition & Mental Health": "Use the food-mood tracker to identify connections between what you eat and how you feel. Gradually incorporate the suggested brain-supporting foods into your meals.",
    "Goal Setting": "Select one small, achievable goal to focus on this week. Break it into daily actions, track your progress, and celebrate each step forward. Reassess and adjust weekly.",
    "Stress Management": "Identify your stress triggers and select techniques from our library that work best for you. Practice the 2-minute stress reset whenever you feel overwhelmed.",
    "Relationship Support": "Use the communication templates to prepare for difficult conversations. Practice active listening skills daily and set healthy boundaries using the boundary-setting framework.",
    "Grief & Loss Support": "Move through exercises at your own pace, honoring your feelings without judgment. Access guided meditations specifically designed for different stages of grief.",
    "Self-Compassion": "Practice speaking to yourself as you would to a good friend. Use the daily self-compassion check-in to notice and reframe your inner critic's negative messages.",
    "Coping Strategies": "Identify your emotional triggers and early warning signs. Select 3-5 strategies from our toolkit to create your personal coping plan for challenging situations.",
    "Psychoeducation": "Read one article daily to better understand your mental health experiences. Take notes on insights and discuss these with your support network or healthcare provider.",
    "Virtual Classes & Meetings": "Browse the schedule of upcoming sessions, set reminders for classes that interest you, and join virtual rooms 5 minutes early to settle in before sessions begin."
  };

  const handleStartTool = () => {
    setShowInteractive(true);
    toast({
      title: `${tool.title} Activated`,
      description: "Interactive session started. Follow the prompts to explore this tool.",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#1a1a1f] text-white py-12 relative overflow-hidden">
        <div className="floating-bg animate-pulse"></div>
        <div className="container px-4 max-w-6xl mx-auto relative z-10">
          <div className="flex justify-between items-center mb-6">
            <Link to="/mental-wellness-tools" className="inline-flex items-center text-[#B87333] hover:text-[#B87333]/80 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tools
            </Link>
            <HomeButton />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-light mb-4 gradient-heading">{tool.title}</h1>
          <p className="text-xl text-gray-300 max-w-3xl">{tool.description}</p>
        </div>
      </div>

      <div className="container px-4 py-12 max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-light mb-4">Features</h2>
          <ul className="list-disc list-inside text-lg space-y-2">
            {tool.features.map((feature, index) => (
              <li key={index} className="ml-4">{feature}</li>
            ))}
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-light mb-4">How to Use</h2>
          <p className="text-lg">{howToUseContent[tool.title] || "Start by exploring the features and finding what works best for you. Consistent practice will help you get the most benefit."}</p>
        </div>

        {!showInteractive ? (
          <div className="mt-10">
            <Button
              variant="copper"
              size="lg"
              className="w-full md:w-auto hero-button"
              onClick={handleStartTool}
            >
              {tool.cta}
            </Button>
          </div>
        ) : (
          <InteractiveToolContent toolName={tool.title} />
        )}
      </div>
    </div>
  );
};

export default ToolDetail;
