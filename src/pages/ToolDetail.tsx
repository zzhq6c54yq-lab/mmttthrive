
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  BarChart4, 
  Brain, 
  MessageCircle, 
  AlertTriangle, 
  BookOpen, 
  Users,
  Moon,
  Dumbbell,
  LeafyGreen,
  ListChecks,
  FlameKindling,
  HandHeart,
  Flower,
  Heart,
  HeartPulse,
  Landmark,
  Pencil,
  HeartHandshake,
  ScrollText,
  Download,
  Play,
  BookOpen as BookIcon,
  ExternalLink,
  Clock,
  Calendar,
  ChevronRight,
  BadgeCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

// Import tool categories
import { toolCategories } from "@/data/toolCategories";

// Tool resource type definitions
interface Resource {
  title: string;
  type: "article" | "video" | "audio" | "exercise" | "assessment" | "worksheet" | "guide";
  description: string;
  url?: string;
  duration?: string;
  author?: string;
  isPremium?: boolean;
}

interface FAQ {
  question: string;
  answer: string;
}

// Define detailed content for each tool
const toolDetails: Record<string, {
  introduction: string;
  benefits: string[];
  howItWorks: string;
  resources: Resource[];
  faqs: FAQ[];
  quotes: { text: string; author: string }[];
  recommendations?: string[];
  exercises?: { title: string; steps: string[]; duration: string }[];
}> = {
  "mood-tracking": {
    introduction: "Mood tracking is a powerful technique that helps you understand your emotional patterns over time. By consistently monitoring your moods, you can identify triggers, recognize patterns, and develop strategies to enhance your emotional well-being.",
    benefits: [
      "Identify emotional patterns and triggers",
      "Increase emotional self-awareness",
      "Support therapy progress",
      "Track treatment effectiveness",
      "Improve communication about feelings"
    ],
    howItWorks: "Our mood tracking tool allows you to log daily emotions, add notes about significant events, and view trends over time through intuitive visualizations. You can record multiple mood entries per day, add context, and track correlations with sleep, exercise, medication, and other factors.",
    resources: [
      {
        title: "Getting Started with Mood Tracking",
        type: "guide",
        description: "A comprehensive guide to effective mood tracking and how to interpret your results.",
        duration: "10 min read"
      },
      {
        title: "The Science Behind Mood Tracking",
        type: "article",
        description: "Research-based overview of how tracking emotions improves mental health outcomes.",
        author: "Dr. Sarah Johnson",
        duration: "15 min read"
      },
      {
        title: "Daily Mood Check-in Exercise",
        type: "exercise",
        description: "A structured exercise to check in with your emotions throughout the day.",
        duration: "5 mins daily"
      },
      {
        title: "Identifying Your Emotional Triggers",
        type: "worksheet",
        description: "Interactive worksheet to help you identify what triggers specific emotional responses.",
        url: "#"
      },
      {
        title: "Mood Patterns Analysis Tutorial",
        type: "video",
        description: "Learn how to analyze your mood data to gain actionable insights.",
        duration: "12 min"
      }
    ],
    faqs: [
      {
        question: "How often should I track my mood?",
        answer: "For best results, try to track your mood at least once daily. Some people benefit from tracking 2-3 times throughout the day, especially when first starting. Consistency is more important than frequency."
      },
      {
        question: "Will mood tracking make me overthink my emotions?",
        answer: "While some people may initially become more focused on their emotions, most find that over time, mood tracking actually reduces rumination by providing clarity and context to feelings."
      },
      {
        question: "How long until I see patterns in my mood?",
        answer: "Most people begin to notice meaningful patterns after 2-3 weeks of consistent tracking. However, some obvious triggers may become apparent much sooner."
      }
    ],
    quotes: [
      {
        text: "Tracking my mood daily has helped me identify that my anxiety peaks on Sunday evenings before the work week. Now I can prepare coping strategies in advance.",
        author: "Michael, 34"
      },
      {
        text: "I didn't realize how much my diet was affecting my mood until I started tracking both. The correlation was eye-opening.",
        author: "Emma, 29"
      }
    ],
    exercises: [
      {
        title: "Emotion Granularity Exercise",
        steps: [
          "When logging a mood, try to be specific about the exact emotion",
          "Use the emotion wheel to expand your emotional vocabulary",
          "Note the intensity of the emotion on a scale of 1-10",
          "Record any physical sensations that accompany the emotion"
        ],
        duration: "3-5 minutes"
      },
      {
        title: "End-of-Week Reflection",
        steps: [
          "Review your mood entries for the past week",
          "Note any patterns or triggers you observe",
          "Identify your emotional highs and lows",
          "Plan how to increase positive triggers in the coming week"
        ],
        duration: "15 minutes"
      }
    ]
  },
  "meditation-&-mindfulness": {
    introduction: "Meditation and mindfulness practices are ancient techniques with modern scientific backing, proven to reduce stress, improve focus, and enhance overall well-being. These practices involve training your attention to achieve mental clarity and emotional calm.",
    benefits: [
      "Reduced stress and anxiety",
      "Improved focus and concentration",
      "Enhanced emotional regulation",
      "Better sleep quality",
      "Increased self-awareness",
      "Lower blood pressure"
    ],
    howItWorks: "Our meditation resources include guided sessions, breathing exercises, body scans, and mindful movement practices. Beginners can start with short, structured sessions and gradually build their practice. We offer specialized meditations for specific concerns like anxiety, sleep, and focus.",
    resources: [
      {
        title: "5-Minute Morning Meditation",
        type: "audio",
        description: "Start your day with this brief centering practice to set a positive tone.",
        duration: "5 min"
      },
      {
        title: "Body Scan for Relaxation",
        type: "audio",
        description: "A guided meditation focusing on progressive relaxation through body awareness.",
        duration: "15 min"
      },
      {
        title: "Introduction to Mindfulness",
        type: "article",
        description: "A beginner's guide to mindfulness principles and practices.",
        author: "Dr. Jon Mitchell",
        duration: "12 min read"
      },
      {
        title: "Mindful Breathing Techniques",
        type: "video",
        description: "Learn multiple breathing practices for different situations and needs.",
        duration: "18 min"
      },
      {
        title: "Mindfulness for Anxiety Relief",
        type: "exercise",
        description: "Specialized mindfulness exercises specifically designed to reduce anxiety symptoms.",
        duration: "10-15 min"
      },
      {
        title: "7-Day Meditation Challenge",
        type: "guide",
        description: "A week-long guided program to establish a consistent meditation practice.",
        isPremium: true
      }
    ],
    faqs: [
      {
        question: "I can't stop thinking during meditation. Am I doing it wrong?",
        answer: "Not at all! Having thoughts arise during meditation is completely normal and expected. The practice isn't about stopping thoughts but noticing them without attachment and gently returning to your focus. This gets easier with practice."
      },
      {
        question: "How long should I meditate to see benefits?",
        answer: "Research shows even 5-10 minutes daily can produce noticeable benefits. Consistency matters more than duration. Many people find that starting with shorter sessions and gradually increasing the time works best."
      },
      {
        question: "Can I meditate lying down?",
        answer: "While it's possible to meditate in any position, lying down often leads to sleepiness. If you choose to lie down, try to stay alert and aware. Sitting with a straight but relaxed spine is generally recommended for maintaining alertness."
      }
    ],
    quotes: [
      {
        text: "Mindfulness practice has transformed how I respond to stress. I no longer feel hijacked by my emotions.",
        author: "Sophia, 42"
      },
      {
        text: "After just three weeks of daily meditation, my colleagues commented on how much calmer I seemed during meetings.",
        author: "James, 37"
      }
    ],
    exercises: [
      {
        title: "STOP Practice for Difficult Moments",
        steps: [
          "S - Stop what you're doing",
          "T - Take a breath",
          "O - Observe what's happening in your body, mind, and emotions",
          "P - Proceed with awareness and kindness"
        ],
        duration: "1-2 minutes"
      },
      {
        title: "Mindful Walking",
        steps: [
          "Walk at a slightly slower pace than normal",
          "Notice the sensations in your feet as they contact the ground",
          "Observe the movement of your body and your breathing",
          "When your mind wanders, gently bring attention back to walking"
        ],
        duration: "10-15 minutes"
      }
    ]
  },
  "cbt-techniques": {
    introduction: "Cognitive Behavioral Therapy (CBT) is one of the most evidence-based psychological treatments available. It helps identify and challenge negative thought patterns and behaviors, replacing them with more balanced, accurate perspectives.",
    benefits: [
      "Identify and change harmful thought patterns",
      "Develop healthier thinking habits",
      "Improve problem-solving skills",
      "Gain confidence in abilities",
      "Decrease symptoms of depression and anxiety",
      "Build resilience against future challenges"
    ],
    howItWorks: "CBT works by helping you recognize the connection between thoughts, feelings, and behaviors. Our tools guide you through identifying cognitive distortions (thinking errors), challenging negative thoughts, and developing more balanced perspectives that lead to improved emotional states and healthier behaviors.",
    resources: [
      {
        title: "Thought Record Journal",
        type: "worksheet",
        description: "Interactive worksheet to identify, challenge, and reframe negative thoughts.",
        url: "#"
      },
      {
        title: "Understanding Cognitive Distortions",
        type: "article",
        description: "Learn about the common thinking errors that can worsen anxiety and depression.",
        author: "Dr. Maya Cohen",
        duration: "20 min read"
      },
      {
        title: "Challenging Core Beliefs Workshop",
        type: "video",
        description: "A step-by-step guide to identifying and modifying deeply held beliefs.",
        duration: "35 min"
      },
      {
        title: "CBT for Insomnia",
        type: "guide",
        description: "Specialized CBT techniques to address sleep difficulties.",
        duration: "15 min read"
      },
      {
        title: "Behavioral Activation Plan",
        type: "exercise",
        description: "A structured approach to increase engagement in positive activities.",
        url: "#"
      },
      {
        title: "Cognitive Restructuring Practice Sessions",
        type: "exercise",
        description: "Guided practice in reframing negative thoughts with realistic alternatives.",
        isPremium: true
      }
    ],
    faqs: [
      {
        question: "How long does it take for CBT to work?",
        answer: "Many people begin experiencing benefits from CBT techniques within 3-4 weeks of consistent practice. More significant or long-standing issues may take longer to address, typically 8-12 weeks of regular application."
      },
      {
        question: "Can I practice CBT on my own, or do I need a therapist?",
        answer: "While many CBT techniques can be effectively self-administered using proper resources, working with a trained therapist can be beneficial, especially for complex or severe issues. Our tools support both self-guided work and work done alongside professional therapy."
      },
      {
        question: "Will CBT techniques work for severe depression?",
        answer: "CBT has been shown to be effective for various levels of depression, including severe cases. However, severe depression may require a combination of approaches, including therapy and possibly medication. Always consult with a healthcare provider for severe symptoms."
      }
    ],
    quotes: [
      {
        text: "Learning to challenge my automatic negative thoughts has been life-changing. I don't get stuck in the same mental loops anymore.",
        author: "Taylor, 31"
      },
      {
        text: "The thought records helped me realize how often I was catastrophizing small problems. Now I can catch myself doing it.",
        author: "Alex, 28"
      }
    ],
    exercises: [
      {
        title: "Triple Column Technique",
        steps: [
          "Column 1: Write down the automatic negative thought",
          "Column 2: Identify the cognitive distortion",
          "Column 3: Write a rational response to the thought",
          "Review how your feeling changes after the exercise"
        ],
        duration: "10 minutes per thought"
      },
      {
        title: "Behavioral Experiment",
        steps: [
          "Identify a negative prediction (e.g., 'If I speak up in the meeting, I'll be judged negatively')",
          "Design a simple experiment to test the prediction",
          "Execute the experiment and observe what actually happens",
          "Compare results with your prediction and adjust your beliefs accordingly"
        ],
        duration: "Varies based on experiment"
      }
    ]
  },
  "anxiety-management": {
    introduction: "Anxiety management tools provide practical strategies for reducing anxiety symptoms and regaining a sense of control. These evidence-based techniques help address both the physical and psychological aspects of anxiety.",
    benefits: [
      "Reduce physical symptoms of anxiety",
      "Prevent or manage panic attacks",
      "Develop healthier responses to anxiety triggers",
      "Improve ability to function during anxious periods",
      "Decrease avoidance behaviors",
      "Build long-term resilience to stress"
    ],
    howItWorks: "Our anxiety management resources include grounding techniques, exposure planning tools, worry management strategies, and panic response protocols. These tools target different aspects of anxiety—physical sensations, worried thoughts, and avoidance behaviors—to create a comprehensive approach to anxiety relief.",
    resources: [
      {
        title: "5-4-3-2-1 Grounding Technique",
        type: "exercise",
        description: "A sensory awareness exercise to quickly reduce anxiety in the moment.",
        duration: "3-5 min"
      },
      {
        title: "Panic Button: Emergency Response Guide",
        type: "guide",
        description: "Step-by-step instructions for managing panic attacks when they occur.",
        url: "#"
      },
      {
        title: "Understanding the Anxiety Cycle",
        type: "article",
        description: "Learn how anxiety perpetuates itself and how to break the cycle.",
        author: "Dr. Robert Chen",
        duration: "15 min read"
      },
      {
        title: "Progressive Muscle Relaxation",
        type: "audio",
        description: "Guided exercise to release physical tension associated with anxiety.",
        duration: "12 min"
      },
      {
        title: "Worry Time Scheduling Tool",
        type: "exercise",
        description: "A practical approach to containing and addressing worried thoughts.",
        url: "#"
      },
      {
        title: "Exposure Hierarchy Workshop",
        type: "video",
        description: "Guide to creating a personalized plan for gradually facing anxiety-inducing situations.",
        duration: "25 min",
        isPremium: true
      }
    ],
    faqs: [
      {
        question: "Can these techniques stop a panic attack?",
        answer: "Many of these techniques can help reduce the intensity and duration of panic attacks. With practice, some people can prevent panic attacks from fully developing by intervening at the first signs of anxiety escalation."
      },
      {
        question: "Will anxiety management techniques work immediately?",
        answer: "Some techniques, like grounding and breathing exercises, can provide immediate relief, though the effect may be partial. Other approaches build effectiveness with practice. Having multiple strategies to try is important, as different techniques work better for different people and situations."
      },
      {
        question: "Is it normal for anxiety to temporarily increase when first practicing these techniques?",
        answer: "Yes, this can happen, especially with exposure-based approaches. Initially paying more attention to anxiety symptoms can briefly increase awareness of them. This typically subsides with continued practice as you build confidence in your ability to manage symptoms."
      }
    ],
    quotes: [
      {
        text: "The breathing techniques helped me stop a panic attack for the first time in years. I finally feel like I have some control back.",
        author: "Jessica, 25"
      },
      {
        text: "Scheduling 'worry time' seemed strange at first, but it's dramatically reduced how much anxiety interrupts my day.",
        author: "Marcus, 41"
      }
    ],
    exercises: [
      {
        title: "Box Breathing",
        steps: [
          "Inhale slowly for a count of 4",
          "Hold your breath for a count of 4",
          "Exhale slowly for a count of 4",
          "Pause for a count of 4 before inhaling again",
          "Repeat for at least 5 cycles"
        ],
        duration: "2-3 minutes"
      },
      {
        title: "Worry Postponement",
        steps: [
          "When a worry arises, briefly note it down",
          "Remind yourself you'll address it during your scheduled worry time",
          "Refocus on the present moment or task",
          "During scheduled worry time, review and problem-solve your collected worries"
        ],
        duration: "15-20 minutes of scheduled worry time daily"
      }
    ]
  },
  "sleep-improvement": {
    introduction: "Sleep is foundational to mental and physical health. Our sleep improvement resources combine behavioral strategies, relaxation techniques, and environmental modifications to help you achieve better quality sleep naturally.",
    benefits: [
      "Fall asleep more quickly",
      "Reduce nighttime awakenings",
      "Improve sleep quality and depth",
      "Wake feeling more refreshed",
      "Enhance daytime energy and mood",
      "Reduce reliance on sleep medications"
    ],
    howItWorks: "Our sleep tools focus on Cognitive Behavioral Therapy for Insomnia (CBT-I), the gold-standard non-medication approach to sleep problems. We provide sleep tracking tools, bedtime routine builders, relaxation techniques, and guidance on creating an optimal sleep environment and schedule.",
    resources: [
      {
        title: "Sleep Hygiene Assessment",
        type: "assessment",
        description: "Evaluate your sleep habits and environment to identify improvement opportunities.",
        duration: "5-10 min"
      },
      {
        title: "Bedtime Relaxation Sequence",
        type: "audio",
        description: "Guided progressive relaxation specifically designed for bedtime.",
        duration: "18 min"
      },
      {
        title: "CBT-I: The Science of Better Sleep",
        type: "article",
        description: "Research-backed explanation of CBT for Insomnia techniques and effectiveness.",
        author: "Dr. Lisa Martinez",
        duration: "15 min read"
      },
      {
        title: "Sleep Restriction Therapy Guide",
        type: "guide",
        description: "Step-by-step instructions for this powerful but challenging CBT-I technique.",
        url: "#"
      },
      {
        title: "Worry-Free Wind Down Routine",
        type: "exercise",
        description: "Structured routine to calm an active mind before bedtime.",
        duration: "30 min"
      },
      {
        title: "Deep Sleep Sound Sessions",
        type: "audio",
        description: "Carefully engineered sound environments to promote deeper sleep cycles.",
        isPremium: true
      }
    ],
    faqs: [
      {
        question: "How long does it take to fix sleep problems with these methods?",
        answer: "Most people begin to see improvements within 1-2 weeks of consistently applying sleep hygiene principles. More significant or chronic sleep issues may take 4-8 weeks of dedicated practice with techniques like sleep restriction and stimulus control."
      },
      {
        question: "Should I stop taking my sleep medication to use these techniques?",
        answer: "Never discontinue prescribed medication without consulting your healthcare provider. Many people successfully use these techniques alongside medication initially, then work with their doctor on potentially reducing medication as sleep improves."
      },
      {
        question: "Why do you recommend getting out of bed when I can't sleep?",
        answer: "This technique, called stimulus control, helps strengthen the association between your bed and sleep. Staying in bed while awake can create an association between your bed and wakefulness, making future sleep more difficult."
      }
    ],
    quotes: [
      {
        text: "After following the sleep restriction protocol for three weeks, I'm falling asleep within 10 minutes instead of my usual two hours.",
        author: "Daniel, 47"
      },
      {
        text: "Creating a consistent bedtime routine has been a game-changer for my sleep quality. I no longer dread bedtime.",
        author: "Priya, 33"
      }
    ],
    exercises: [
      {
        title: "Bedtime Body Scan",
        steps: [
          "Lie comfortably in bed with eyes closed",
          "Bring attention to your toes and consciously relax them",
          "Slowly move attention up through each body part",
          "Release tension in each area before moving to the next",
          "If your mind wanders, gently return focus to the body scan"
        ],
        duration: "10-15 minutes"
      },
      {
        title: "Sleep Environment Optimization",
        steps: [
          "Assess your bedroom for light sources and eliminate or cover them",
          "Evaluate temperature and adjust to between 60-67°F (15-19°C)",
          "Remove electronic devices or set to do not disturb",
          "Consider adding white noise if environmental sounds are disruptive",
          "Ensure bedding is comfortable and supportive"
        ],
        duration: "30-60 minutes (one-time setup)"
      }
    ]
  },
};

// Default tool details for tools not yet fully implemented
const defaultToolDetail = {
  introduction: "This tool provides evidence-based resources to support your mental wellness journey.",
  benefits: [
    "Evidence-based strategies",
    "Self-paced learning and practice",
    "Professional guidance",
    "Track your progress",
    "Personalized approach"
  ],
  howItWorks: "Our resources combine the latest research with practical applications to help you develop skills and knowledge that support your mental health goals.",
  resources: [
    {
      title: "Getting Started Guide",
      type: "guide" as const,
      description: "An introduction to using this tool effectively.",
      duration: "10 min read"
    },
    {
      title: "Core Concepts",
      type: "article" as const,
      description: "Understanding the foundations of this practice.",
      duration: "15 min read"
    },
    {
      title: "Guided Practice",
      type: "audio" as const,
      description: "Step-by-step audio guidance for beginners.",
      duration: "12 min"
    }
  ],
  faqs: [
    {
      question: "How often should I use this tool?",
      answer: "For best results, try to engage with these resources regularly - aim for at least 2-3 times per week to build momentum and see consistent progress."
    },
    {
      question: "Can I use this alongside therapy?",
      answer: "Absolutely. These tools are designed to complement professional therapy and many therapists recommend them as between-session support."
    }
  ],
  quotes: [
    {
      text: "This approach has given me practical tools I can use every day to support my mental health.",
      author: "User testimonial"
    }
  ],
  exercises: [
    {
      title: "Starter Exercise",
      steps: [
        "Begin by finding a quiet, comfortable space",
        "Follow the guided instructions",
        "Practice regularly for best results",
        "Track your progress over time"
      ],
      duration: "10-15 minutes"
    }
  ]
};

// Map icons to their components
const iconMap: Record<string, any> = {
  "Mood Tracking": BarChart4,
  "Meditation & Mindfulness": Brain,
  "CBT Techniques": ScrollText,
  "Anxiety Management": HeartPulse,
  "Sleep Improvement": Moon,
  "Community Support": Users,
  "Self-Help Resources": BookOpen,
  "Therapist Connection": MessageCircle,
  "Journaling": Pencil,
  "Crisis Support": AlertTriangle,
  "Exercise & Fitness": Dumbbell,
  "Nutrition & Mental Health": LeafyGreen,
  "Goal Setting": ListChecks,
  "Stress Management": FlameKindling,
  "Relationship Support": HandHeart,
  "Grief & Loss Support": HeartHandshake,
  "Self-Compassion": Heart,
  "Coping Strategies": Flower,
  "Psychoeducation": Landmark
};

// Resource type to icon mapping
const resourceTypeIcons: Record<string, any> = {
  article: BookIcon,
  video: Play,
  audio: Play,
  exercise: Dumbbell,
  assessment: BarChart4,
  worksheet: Download,
  guide: BookOpen
};

const ToolDetail = () => {
  const { toolId } = useParams<{ toolId: string }>();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [toolInfo, setToolInfo] = useState<any>(null);

  useEffect(() => {
    // Simulate loading data
    setIsLoading(true);
    
    setTimeout(() => {
      // Convert toolId to title format for lookup
      const formattedToolId = toolId?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      const matchedTool = toolCategories.find(tool => 
        tool.title.toLowerCase() === formattedToolId?.toLowerCase()
      );
      
      if (matchedTool) {
        setToolInfo(matchedTool);
      }
      
      setIsLoading(false);
    }, 600);
  }, [toolId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B87333] mx-auto mb-4"></div>
          <p className="text-lg text-gray-700">Loading resources...</p>
        </div>
      </div>
    );
  }

  if (!toolInfo) {
    return (
      <div className="min-h-screen bg-white">
        <div className="bg-[#1a1a1f] text-white py-12">
          <div className="container px-4 max-w-6xl mx-auto">
            <Link to="/mental-wellness-tools" className="inline-flex items-center text-[#B87333] hover:text-[#B87333]/80 mb-6 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tools
            </Link>
            <h1 className="text-4xl md:text-5xl font-light mb-4">Tool Not Found</h1>
            <p className="text-xl text-gray-300">
              Sorry, we couldn't find the tool you're looking for.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Get tool details or use default
  const toolDetail = toolDetails[toolId as string] || defaultToolDetail;
  const IconComponent = iconMap[toolInfo.title] || Brain;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#1a1a1f] text-white py-12 relative overflow-hidden">
        <div className="floating-bg animate-pulse"></div>
        <div className="container px-4 max-w-6xl mx-auto relative z-10">
          <Link to="/mental-wellness-tools" className="inline-flex items-center text-[#B87333] hover:text-[#B87333]/80 mb-6 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tools
          </Link>
          <div className="flex items-center mb-4">
            <div className="rounded-full bg-[#B87333]/20 w-12 h-12 flex items-center justify-center mr-4">
              <IconComponent className="h-6 w-6 text-[#B87333]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-light gradient-heading">{toolInfo.title}</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl">
            {toolInfo.description}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container px-4 py-12 max-w-6xl mx-auto">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview" className="text-base">Overview</TabsTrigger>
            <TabsTrigger value="resources" className="text-base">Resources</TabsTrigger>
            <TabsTrigger value="exercises" className="text-base">Exercises</TabsTrigger>
            <TabsTrigger value="faqs" className="text-base">FAQs</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="animate-fade-up">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">About {toolInfo.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-lg max-w-none">
                    <p className="text-gray-700 mb-6">{toolDetail.introduction}</p>
                    
                    <h3 className="text-xl font-medium mb-4">How It Works</h3>
                    <p className="text-gray-700 mb-6">{toolDetail.howItWorks}</p>
                    
                    <h3 className="text-xl font-medium mb-4">Key Benefits</h3>
                    <ul className="space-y-2">
                      {toolDetail.benefits.map((benefit: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <BadgeCheck className="h-5 w-5 text-[#B87333] mr-2 mt-1 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                {/* Testimonials */}
                <div className="mt-8">
                  <h3 className="text-2xl font-medium mb-6">User Experiences</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {toolDetail.quotes.map((quote: any, index: number) => (
                      <Card key={index} className="bg-[#F9F7FF]">
                        <CardContent className="pt-6">
                          <p className="italic text-gray-700 mb-4">"{quote.text}"</p>
                          <p className="text-right font-medium text-[#B87333]">— {quote.author}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Sidebar */}
              <div>
                <Card className="bg-[#F1F0FB] border-[#B87333]/30">
                  <CardHeader>
                    <CardTitle>Get Started</CardTitle>
                    <CardDescription>
                      Begin your journey with {toolInfo.title}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button 
                      className="w-full bg-[#B87333] hover:bg-[#B87333]/90"
                      onClick={() => {
                        setActiveTab("resources");
                        toast({
                          title: "Resources Ready",
                          description: `Explore our ${toolInfo.title} materials`,
                        });
                      }}
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      Browse Resources
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setActiveTab("exercises");
                        toast({
                          title: "Exercises Ready",
                          description: `Try our guided ${toolInfo.title} exercises`,
                        });
                      }}
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Try an Exercise
                    </Button>
                  </CardContent>
                </Card>
                
                {/* Featured Resources */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Featured Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {toolDetail.resources.slice(0, 3).map((resource: Resource, index: number) => {
                        const ResourceIcon = resourceTypeIcons[resource.type] || BookIcon;
                        return (
                          <li key={index} className="flex items-start">
                            <div className="h-8 w-8 rounded-full bg-[#B87333]/10 flex items-center justify-center mr-3 flex-shrink-0">
                              <ResourceIcon className="h-4 w-4 text-[#B87333]" />
                            </div>
                            <div>
                              <p className="font-medium">{resource.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {resource.duration && (
                                  <span className="flex items-center text-xs text-gray-500 mt-1">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {resource.duration}
                                  </span>
                                )}
                              </p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                    <Button 
                      variant="link" 
                      className="mt-4 p-0 text-[#B87333]"
                      onClick={() => setActiveTab("resources")}
                    >
                      View all resources
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Resources Tab */}
          <TabsContent value="resources" className="animate-fade-up">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {toolDetail.resources.map((resource: Resource, index: number) => {
                const ResourceIcon = resourceTypeIcons[resource.type] || BookIcon;
                return (
                  <Card key={index} className={`overflow-hidden hover:shadow-md transition-all ${resource.isPremium ? 'border-[#B87333]/30 bg-[#FDF8F3]' : ''}`}>
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start">
                        <div className="rounded-full bg-[#B87333]/10 w-10 h-10 flex items-center justify-center">
                          <ResourceIcon className="h-5 w-5 text-[#B87333]" />
                        </div>
                        {resource.isPremium && (
                          <span className="bg-[#B87333]/10 text-[#B87333] text-xs font-medium px-2 py-1 rounded-full">
                            Premium
                          </span>
                        )}
                      </div>
                      <CardTitle className="text-xl mt-4">{resource.title}</CardTitle>
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="capitalize">{resource.type}</span>
                        {resource.duration && (
                          <span className="flex items-center ml-4">
                            <Clock className="h-3 w-3 mr-1" />
                            {resource.duration}
                          </span>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-6">{resource.description}</p>
                      <Button 
                        className={resource.isPremium ? "w-full bg-[#B87333] hover:bg-[#B87333]/90" : "w-full"}
                        onClick={() => {
                          toast({
                            title: "Resource Selected",
                            description: `Opening ${resource.title}`,
                          });
                        }}
                      >
                        {resource.type === "audio" || resource.type === "video" ? "Play Now" : "View Resource"}
                        {resource.url && <ExternalLink className="ml-2 h-4 w-4" />}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
          
          {/* Exercises Tab */}
          <TabsContent value="exercises" className="animate-fade-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {toolDetail.exercises?.map((exercise: any, index: number) => (
                <Card key={index} className="overflow-hidden hover:shadow-md transition-all">
                  <CardHeader>
                    <div className="rounded-full bg-[#B87333]/10 w-10 h-10 flex items-center justify-center mb-4">
                      <Dumbbell className="h-5 w-5 text-[#B87333]" />
                    </div>
                    <CardTitle className="text-xl">{exercise.title}</CardTitle>
                    <div className="flex items-center text-sm text-gray-500 mt-2">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{exercise.duration}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-2 mb-6 list-decimal pl-5">
                      {exercise.steps.map((step: string, stepIndex: number) => (
                        <li key={stepIndex} className="text-gray-700">{step}</li>
                      ))}
                    </ol>
                    <Button 
                      className="w-full bg-[#B87333] hover:bg-[#B87333]/90"
                      onClick={() => {
                        toast({
                          title: "Exercise Started",
                          description: `Beginning ${exercise.title}`,
                        });
                      }}
                    >
                      Start Exercise
                    </Button>
                  </CardContent>
                </Card>
              ))}
              
              {(!toolDetail.exercises || toolDetail.exercises.length === 0) && (
                <div className="col-span-2 text-center py-12">
                  <p className="text-lg text-gray-500">
                    We're currently developing exercises for this tool. Check back soon!
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* FAQs Tab */}
          <TabsContent value="faqs" className="animate-fade-up">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>
                  Common questions about {toolInfo.title}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {toolDetail.faqs.map((faq: FAQ, index: number) => (
                  <div key={index} className="border-b border-gray-200 pb-5 last:border-0">
                    <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ToolDetail;
