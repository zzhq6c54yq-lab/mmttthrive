import { 
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
  Video
} from "lucide-react";

export interface ToolCategory {
  title: string;
  description: string;
  icon: any;
  features: string[];
  cta: string;
  keywords: string[];
}

export const toolCategories = [
  {
    title: "Mood Tracking",
    description: "Log and track your daily moods, emotions, and triggers to identify patterns.",
    icon: BarChart4,
    features: [
      "Daily mood check-ins",
      "Emotion pattern analysis",
      "Trigger identification",
      "Progress visualization",
      "Customizable mood scales"
    ],
    cta: "Start Tracking",
    keywords: ["emotional-regulation", "reducing-anxiety", "managing-stress", "mindful", "present", "balanced"]
  },
  {
    title: "Meditation & Mindfulness",
    description: "Guided sessions and exercises to help reduce stress and improve focus.",
    icon: Brain,
    features: [
      "Guided meditation sessions",
      "Breathing exercises",
      "Body scan practices",
      "Present-moment awareness",
      "Mindful movement guides"
    ],
    cta: "Begin Practice",
    keywords: ["peaceful", "managing-stress", "focused", "improving-sleep", "present", "mindful", "balanced"]
  },
  {
    title: "CBT Techniques",
    description: "Cognitive Behavioral Therapy tools to identify and reframe negative thoughts.",
    icon: ScrollText,
    features: [
      "Thought records",
      "Cognitive restructuring exercises",
      "Behavioral activation",
      "Core belief worksheets",
      "Cognitive distortion guides"
    ],
    cta: "Start Reframing",
    keywords: ["emotional-regulation", "reducing-anxiety", "building-confidence", "resilient"]
  },
  {
    title: "Anxiety Management",
    description: "Practical tools and techniques to manage anxiety symptoms.",
    icon: HeartPulse,
    features: [
      "Panic attack guides",
      "Grounding techniques",
      "Worry postponement",
      "Exposure planning",
      "Safety behaviors recognition"
    ],
    cta: "Manage Anxiety",
    keywords: ["reducing-anxiety", "managing-stress", "focused", "present", "balanced"]
  },
  {
    title: "Sleep Improvement",
    description: "Resources and routines to enhance sleep quality and overcome insomnia.",
    icon: Moon,
    features: [
      "Sleep hygiene assessment",
      "Bedtime routine builder",
      "Sleep stories and sounds",
      "Sleep restriction therapy",
      "Relaxation techniques"
    ],
    cta: "Better Sleep",
    keywords: ["improving-sleep", "balanced", "health-wellness", "peaceful"]
  },
  {
    title: "Community Support",
    description: "Forums and groups where you can share experiences and support others.",
    icon: Users,
    features: [
      "Moderated discussion forums",
      "Peer support groups",
      "Topic-based communities",
      "Live group sessions",
      "Success story sharing"
    ],
    cta: "Join Community",
    keywords: ["better-relationships", "grateful", "empathetic", "joyful", "resilient"]
  },
  {
    title: "Self-Help Resources",
    description: "Articles, videos, and tips on various mental health topics.",
    icon: BookOpen,
    features: [
      "Educational articles",
      "Video courses",
      "Recommended reading",
      "Mental health podcasts",
      "Self-assessment tools"
    ],
    cta: "Explore Resources",
    keywords: ["career-growth", "health-wellness", "setting-boundaries", "work-life-balance", "building-confidence"]
  },
  {
    title: "Therapist Connection",
    description: "Connect with licensed professionals for virtual sessions tailored to your needs.",
    icon: MessageCircle,
    features: [
      "Licensed therapist matching",
      "Secure video sessions",
      "Text therapy options",
      "Specialized treatment approaches",
      "Progress tracking with your therapist"
    ],
    cta: "Find a Therapist",
    keywords: ["overcoming-trauma", "emotional-regulation", "reducing-anxiety", "better-relationships"]
  },
  {
    title: "Journaling",
    description: "Space for personal reflections and emotional expression.",
    icon: Pencil,
    features: [
      "Guided journal prompts",
      "Mood-based journaling",
      "Gratitude practice",
      "Dream journaling",
      "Therapy preparation notes"
    ],
    cta: "Start Writing",
    keywords: ["emotional-regulation", "mindful", "creative", "balanced", "grateful"]
  },
  {
    title: "Crisis Support",
    description: "Immediate resources and hotlines for when you need help right away.",
    icon: AlertTriangle,
    features: [
      "24/7 crisis hotlines",
      "Emergency contact management",
      "Crisis text services",
      "Safety planning tools",
      "Local emergency resources"
    ],
    cta: "Access Support",
    keywords: ["reducing-anxiety", "emotional-regulation", "resilient", "empathetic"]
  },
  {
    title: "Exercise & Fitness",
    description: "Physical activity guides specially designed to support mental health.",
    icon: Dumbbell,
    features: [
      "Mood-boosting workouts",
      "Stress-reducing exercises",
      "Anxiety-relieving routines",
      "Mind-body connection activities",
      "Movement tracking"
    ],
    cta: "Get Moving",
    keywords: ["health-wellness", "managing-stress", "balanced", "energetic"]
  },
  {
    title: "Nutrition & Mental Health",
    description: "Guidance on how diet affects mood and mental well-being.",
    icon: LeafyGreen,
    features: [
      "Mood-food connections",
      "Brain-healthy recipes",
      "Nutritional guidance",
      "Meal planning tools",
      "Hydration tracking"
    ],
    cta: "Eat Well",
    keywords: ["health-wellness", "balanced", "energetic", "focused"]
  },
  {
    title: "Goal Setting",
    description: "Tools to set and track personal mental health and wellness goals.",
    icon: ListChecks,
    features: [
      "SMART goal templates",
      "Progress tracking",
      "Habit formation tools",
      "Accountability features",
      "Celebration prompts"
    ],
    cta: "Set Goals",
    keywords: ["career-growth", "building-confidence", "resilient", "focused"]
  },
  {
    title: "Stress Management",
    description: "Comprehensive techniques to deal with stress effectively.",
    icon: FlameKindling,
    features: [
      "Stress assessment",
      "Quick relief techniques",
      "Long-term stress reduction",
      "Burnout prevention",
      "Work-life balance strategies"
    ],
    cta: "Reduce Stress",
    keywords: ["managing-stress", "work-life-balance", "setting-boundaries", "peaceful"]
  },
  {
    title: "Relationship Support",
    description: "Advice and resources for improving personal and professional relationships.",
    icon: HandHeart,
    features: [
      "Communication exercises",
      "Boundary setting guides",
      "Conflict resolution tools",
      "Active listening practice",
      "Empathy building activities"
    ],
    cta: "Improve Connections",
    keywords: ["better-relationships", "setting-boundaries", "empathetic", "joyful"]
  },
  {
    title: "Grief & Loss Support",
    description: "Resources for coping with grief, loss, and bereavement.",
    icon: HeartHandshake,
    features: [
      "Grief education",
      "Coping strategies",
      "Memorial activities",
      "Support finding",
      "Healing rituals"
    ],
    cta: "Find Comfort",
    keywords: ["overcoming-trauma", "resilient", "empathetic", "emotional-regulation"]
  },
  {
    title: "Self-Compassion",
    description: "Practices to cultivate kindness and understanding toward yourself.",
    icon: Heart,
    features: [
      "Self-compassion meditations",
      "Inner critic work",
      "Self-forgiveness exercises",
      "Shame resilience",
      "Self-care planning"
    ],
    cta: "Be Kind to Yourself",
    keywords: ["building-confidence", "peaceful", "grateful", "balanced"]
  },
  {
    title: "Coping Strategies",
    description: "Practical techniques for managing daily challenges and difficulties.",
    icon: Flower,
    features: [
      "Distress tolerance skills",
      "Emotion regulation tools",
      "Problem-solving frameworks",
      "Resilience building",
      "Adaptive coping methods"
    ],
    cta: "Build Resilience",
    keywords: ["resilient", "managing-stress", "reducing-anxiety", "balanced"]
  },
  {
    title: "Psychoeducation",
    description: "Educational resources about mental health conditions and treatments.",
    icon: Landmark,
    features: [
      "Condition information",
      "Treatment explanations",
      "Medication guides",
      "Therapy approaches",
      "Recovery stories"
    ],
    cta: "Learn More",
    keywords: ["health-wellness", "finding-purpose", "resilient", "focused"]
  },
  {
    title: "Virtual Classes & Meetings",
    description: "Join live virtual sessions facilitated by H.E.N.R.Y. on various mental wellness topics.",
    icon: Video,
    features: [
      "Live guided meditation sessions",
      "Mental health workshops",
      "AA and NA recovery meetings",
      "Coping skills practice groups",
      "Reminder notifications"
    ],
    cta: "View Schedule",
    keywords: ["community", "learning", "support", "recovery", "skills", "real-time", "interactive"]
  }
];

export interface VirtualClass {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  duration: number; // in minutes
  facilitator: string;
  type: 'mental_health' | 'meditation' | 'aa_meeting' | 'na_meeting' | 'workshop';
  capacity: number;
  attendees: number;
}

// Function to generate today's schedule
export const generateTodayClasses = (): VirtualClass[] => {
  const now = new Date();
  const classes: VirtualClass[] = [];
  
  // Start at 9am
  const startHour = 9;
  const classTypes: Array<VirtualClass['type']> = [
    'mental_health', 'meditation', 'aa_meeting', 'mental_health', 
    'workshop', 'na_meeting', 'meditation', 'mental_health',
    'workshop', 'aa_meeting', 'mental_health', 'na_meeting'
  ];
  
  const titles = {
    mental_health: [
      "Stress Management Techniques", 
      "Understanding Anxiety", 
      "Healthy Boundaries Workshop", 
      "Managing Depression",
      "Emotional Regulation Skills"
    ],
    meditation: [
      "Mindfulness Meditation", 
      "Body Scan Relaxation", 
      "Breathing Techniques", 
      "Guided Visualization"
    ],
    aa_meeting: [
      "AA Daily Reflections", 
      "AA Step Study"
    ],
    na_meeting: [
      "NA Recovery Meeting", 
      "NA Step Working Guide"
    ],
    workshop: [
      "Building Resilience", 
      "Self-Compassion Practice", 
      "Effective Communication", 
      "Grief and Loss Support"
    ]
  };
  
  const descriptions = {
    mental_health: [
      "Learn practical techniques to manage stress in daily life.", 
      "Understand the physiological basis of anxiety and learn coping strategies.", 
      "Define healthy boundaries in relationships and practice setting them.", 
      "Explore evidence-based approaches to managing depression symptoms.",
      "Develop skills to regulate emotions effectively in challenging situations."
    ],
    meditation: [
      "A guided practice focusing on present-moment awareness.", 
      "Progressive relaxation to release tension throughout the body.", 
      "Learn breathing patterns that promote relaxation and focus.", 
      "Guided imagery practice for mental relaxation and stress reduction."
    ],
    aa_meeting: [
      "Daily reflection on recovery principles and sharing experiences in sobriety.", 
      "In-depth exploration of the 12 Steps of Alcoholics Anonymous."
    ],
    na_meeting: [
      "Open discussion meeting focusing on recovery from addiction.", 
      "Working through the NA steps with guidance and peer support."
    ],
    workshop: [
      "Building skills to bounce back from life's challenges.", 
      "Developing a kind and understanding relationship with yourself.", 
      "Enhancing communication skills for healthier relationships.", 
      "Finding support and coping strategies for dealing with loss."
    ]
  };
  
  // Generate classes every 45 minutes
  for (let i = 0; i < 12; i++) {
    const classHour = startHour + Math.floor((i * 45) / 60);
    const classMinute = (i * 45) % 60;
    
    const startTime = new Date(now);
    startTime.setHours(classHour, classMinute, 0);
    
    // If the time has passed today, set it for tomorrow
    if (startTime < now) {
      startTime.setDate(startTime.getDate() + 1);
    }
    
    const type = classTypes[i];
    const titleIndex = Math.floor(Math.random() * titles[type].length);
    
    classes.push({
      id: `class-${i}`,
      title: titles[type][titleIndex],
      description: descriptions[type][titleIndex],
      startTime,
      duration: 45,
      facilitator: "H.E.N.R.Y.",
      type,
      capacity: 20,
      attendees: Math.floor(Math.random() * 15) + 1
    });
  }
  
  return classes;
};
