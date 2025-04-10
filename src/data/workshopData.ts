import { Brain, Heart, ShieldCheck, Zap, Moon, UserPlus, Laugh, PenTool, Compass, BadgeCheck, Sparkles, LucideIcon } from "lucide-react";

interface WorkshopSection {
  title: string;
  content: string;
  duration: string;
  videoId: string;
  practicalExercise: {
    title: string;
    instructions: string;
    timeRequired: string;
    materials: string[];
    skillLevel: "beginner" | "intermediate" | "advanced";
    outcomes: string[];
  };
}

interface WorkshopData {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  duration: string;
  learningOutcomes: string[];
  sections: WorkshopSection[];
}

export const workshopData: WorkshopData[] = [
  {
    id: "mindful-communication",
    title: "Mindful Communication",
    description: "Learn effective communication techniques rooted in mindfulness principles to improve personal and professional relationships.",
    icon: Brain,
    color: "bg-[#9b87f5]/10",
    duration: "45 minutes",
    learningOutcomes: [
      "Recognize communication patterns that create tension or misunderstanding",
      "Apply mindful listening techniques to improve comprehension and build trust",
      "Practice non-reactive responses in challenging conversations",
      "Develop clear and compassionate communication habits"
    ],
    sections: [
      {
        title: "Communication Patterns Assessment",
        content: "Identify your default communication styles and understand how they affect your relationships. This section helps you recognize patterns that may be undermining your effectiveness.",
        duration: "10 minutes",
        videoId: "aseNAGQBxNc",
        practicalExercise: {
          title: "Communication Style Mapping",
          instructions: "Complete the detailed assessment worksheet to identify your primary and secondary communication styles. Then, reflect on two recent conversations—one that went well and one that was challenging. Map which styles you used in each scenario and note the outcomes.",
          timeRequired: "15 minutes",
          materials: ["Communication Styles Worksheet", "Recent Conversation Analysis Form", "Reflection Journal"],
          skillLevel: "beginner",
          outcomes: ["Identification of personal communication patterns", "Recognition of situational communication tendencies"]
        }
      },
      {
        title: "Mindful Listening Practice",
        content: "Learn the core principles of mindful listening, including how to maintain presence, suspend judgment, and listen for understanding rather than response preparation.",
        duration: "15 minutes",
        videoId: "HAnw168huqA",
        practicalExercise: {
          title: "Three-Minute Focused Listening Exercise",
          instructions: "With a partner (or recorded conversation), practice focused listening for exactly three minutes. The speaker discusses something meaningful to them while the listener maintains complete attention without planning responses. The listener then summarizes what they heard before switching roles. Complete the reflection worksheet analyzing what was challenging and what insights emerged.",
          timeRequired: "20 minutes",
          materials: ["Timer", "Listening Reflection Worksheet", "Partner or Recording Device"],
          skillLevel: "intermediate",
          outcomes: ["Improved ability to maintain attention during conversations", "Enhanced comprehension of spoken content", "Reduced tendency to interrupt or mentally prepare responses"]
        }
      },
      {
        title: "Non-Reactive Communication",
        content: "Develop techniques to maintain composure and respond thoughtfully rather than react impulsively during challenging conversations.",
        duration: "20 minutes",
        videoId: "R1vskiVDwl4",
        practicalExercise: {
          title: "Trigger Response Protocol",
          instructions: "Using the worksheet scenarios, practice identifying emotional triggers and applying the P.A.U.S.E. method (Pause, Acknowledge feeling, Understand impulse, Select intention, Engage mindfully). Complete written responses to each scenario following the protocol, then role-play responses with increasing difficulty levels.",
          timeRequired: "25 minutes",
          materials: ["Scenario Cards", "P.A.U.S.E. Method Worksheet", "Response Planning Template"],
          skillLevel: "advanced",
          outcomes: ["Reduced reactive communication patterns", "Development of a personal protocol for handling triggering situations"]
        }
      }
    ]
  },
  {
    id: "emotional-regulation",
    title: "Emotional Regulation",
    description: "Develop skills to manage difficult emotions and respond rather than react to challenging situations.",
    icon: Heart,
    color: "bg-[#f58787]/10",
    duration: "45 minutes",
    learningOutcomes: [
      "Recognize emotional triggers before they escalate",
      "Apply specific techniques to manage intense emotions in the moment",
      "Develop a personal emotional regulation toolkit",
      "Create sustainable practices for emotional balance"
    ],
    sections: [
      {
        title: "Emotion Recognition and Mapping",
        content: "Learn to identify emotions with precision and understand their physical manifestations in your body.",
        duration: "12 minutes",
        videoId: "vz6k_GnReUs",
        practicalExercise: {
          title: "Emotional Body Scan",
          instructions: "Using the body diagram worksheet, identify where and how you experience different emotions physically. Complete the exercise for 8 core emotions, noting sensations, intensity, and movement patterns. Then create your personalized emotion-body map for future reference.",
          timeRequired: "20 minutes",
          materials: ["Body Diagram Worksheet", "Emotion-Sensation Tracking Sheet", "Colored Pencils"],
          skillLevel: "beginner",
          outcomes: ["Improved emotional awareness", "Enhanced ability to identify emotions before they escalate"]
        }
      },
      {
        title: "Regulation Techniques",
        content: "Explore evidence-based strategies for managing intense emotions in real-time situations.",
        duration: "15 minutes",
        videoId: "F2hc2FLOdhI",
        practicalExercise: {
          title: "S.T.O.P. Practice Intensive",
          instructions: "Work through the four-step S.T.O.P. protocol (Stop, Take a breath, Observe, Proceed) using progressively challenging emotional scenarios. For each scenario, document your application of the technique, including physical sensations, thought patterns, and chosen responses. Complete at least 5 scenario practices with increasing difficulty.",
          timeRequired: "25 minutes",
          materials: ["S.T.O.P. Protocol Worksheet", "Scenario Cards", "Regulation Response Tracker"],
          skillLevel: "intermediate",
          outcomes: ["Mastery of the S.T.O.P. regulation technique", "Development of personalized regulation strategies"]
        }
      },
      {
        title: "Building Your Regulation Toolkit",
        content: "Create a personalized set of strategies that work specifically for your emotional patterns and life context.",
        duration: "18 minutes",
        videoId: "QTsUEOUaWpY",
        practicalExercise: {
          title: "Personalized Regulation Strategy Testing",
          instructions: "Test five different regulation strategies (cognitive reframing, physical grounding, breath work, sensory intervention, and social connection) and rate their effectiveness for different emotional states. Document results in the comparative analysis worksheet and develop your customized emotional regulation toolkit with specific implementation plans.",
          timeRequired: "30 minutes",
          materials: ["Strategy Testing Worksheet", "Effectiveness Rating Scale", "Personalized Toolkit Template"],
          skillLevel: "advanced",
          outcomes: ["Customized emotional regulation toolkit", "Situation-specific regulation strategies"]
        }
      }
    ]
  },
  {
    id: "stress-management",
    title: "Stress Management",
    description: "Evidence-based strategies to reduce stress and build resilience in high-pressure environments.",
    icon: ShieldCheck,
    color: "bg-[#87f5c8]/10",
    duration: "45 minutes",
    learningOutcomes: [
      "Identify personal stress signatures and common triggers",
      "Master rapid stress reduction techniques for acute situations",
      "Develop systems to manage ongoing stressors",
      "Create a sustainable stress resilience plan"
    ],
    sections: [
      {
        title: "Stress Signature Identification",
        content: "Learn to recognize your unique physical, emotional, and cognitive stress responses before they overwhelm you.",
        duration: "12 minutes",
        videoId: "0fL-pn80s-c",
        practicalExercise: {
          title: "Stress Response Mapping",
          instructions: "Complete the comprehensive stress signature worksheet, documenting your physical sensations, thought patterns, emotional responses, and behavioral tendencies under stress. Track these patterns across three recent stress episodes using the episode analysis form. Identify your three most consistent early warning signs of stress escalation.",
          timeRequired: "20 minutes",
          materials: ["Stress Signature Worksheet", "Episode Analysis Form", "Early Warning Signs Tracker"],
          skillLevel: "beginner",
          outcomes: ["Clear identification of personal stress patterns", "Recognition of early stress indicators"]
        }
      },
      {
        title: "Rapid Reset Techniques",
        content: "Master practical techniques to quickly reduce stress activation in high-pressure moments.",
        duration: "15 minutes",
        videoId: "ztvojZb_NzU",
        practicalExercise: {
          title: "5-4-3-2-1 Sensory Grounding Intensive",
          instructions: "Practice the 5-4-3-2-1 sensory grounding technique (identify 5 things you see, 4 things you feel, 3 things you hear, 2 things you smell, 1 thing you taste) in three different environments. Time yourself and document the effectiveness using the physiological response tracker. Complete the comparative analysis worksheet to determine optimal implementation.",
          timeRequired: "25 minutes",
          materials: ["Sensory Grounding Worksheet", "Stopwatch/Timer", "Physiological Response Tracker"],
          skillLevel: "intermediate",
          outcomes: ["Mastery of rapid grounding technique", "Environment-specific implementation strategies"]
        }
      },
      {
        title: "Systemic Stress Management",
        content: "Develop comprehensive approaches to manage ongoing stressors and build resilience over time.",
        duration: "18 minutes",
        videoId: "gnVdXN_pRtw",
        practicalExercise: {
          title: "Stress Ecosystem Analysis & Intervention",
          instructions: "Map your complete stress ecosystem using the provided framework, identifying primary stressors, compounding factors, and resilience resources. Develop specific interventions for your three highest-impact stress points using the strategic intervention planner. Create implementation timelines and accountability mechanisms for each intervention.",
          timeRequired: "30 minutes",
          materials: ["Stress Ecosystem Mapping Tool", "Strategic Intervention Planner", "Implementation Timeline Template"],
          skillLevel: "advanced",
          outcomes: ["Comprehensive stress management plan", "Targeted interventions for highest-impact stressors"]
        }
      }
    ]
  },
  {
    id: "better-sleep",
    title: "Better Sleep Habits",
    description: "Practical techniques for improving sleep quality and developing a healthy sleep routine.",
    icon: Moon,
    color: "bg-[#5c7de3]/10",
    duration: "45 minutes",
    learningOutcomes: [
      "Understand your unique sleep patterns and needs",
      "Identify and address common sleep disruptors",
      "Create an effective sleep environment and routine",
      "Implement cognitive techniques for addressing sleep anxiety"
    ],
    sections: [
      {
        title: "Sleep Pattern Assessment",
        content: "Analyze your current sleep patterns and identify factors affecting your sleep quality.",
        duration: "10 minutes",
        videoId: "acEH2JnBDpI",
        practicalExercise: {
          title: "Comprehensive Sleep Analysis",
          instructions: "Complete the 7-day sleep tracking log, documenting sleep times, wake times, perceived quality, and influencing factors. Analyze patterns using the assessment worksheet to identify key disruptors and facilitators. Generate your personalized sleep profile with specific improvement targets.",
          timeRequired: "45 minutes over one week",
          materials: ["7-Day Sleep Log", "Sleep Pattern Analysis Worksheet", "Sleep Profile Generator"],
          skillLevel: "beginner",
          outcomes: ["Clear understanding of personal sleep patterns", "Identification of primary sleep disruptors"]
        }
      },
      {
        title: "Sleep Environment Optimization",
        content: "Learn how to create the ideal physical environment for quality sleep.",
        duration: "12 minutes",
        videoId: "A5dE25ANU0k",
        practicalExercise: {
          title: "Sleep Environment Audit & Redesign",
          instructions: "Conduct a systematic audit of your sleep environment using the environment assessment tool. Rate each factor (light, sound, temperature, comfort, air quality) and develop specific optimization strategies. Create a sleep environment redesign plan with implementation steps and budget considerations.",
          timeRequired: "30 minutes",
          materials: ["Environment Assessment Tool", "Optimization Strategy Guide", "Room Redesign Template"],
          skillLevel: "intermediate",
          outcomes: ["Optimized physical sleep environment", "Practical implementation plan"]
        }
      },
      {
        title: "Cognitive Sleep Strategies",
        content: "Master mental techniques to address racing thoughts and sleep anxiety that can prevent quality rest.",
        duration: "15 minutes",
        videoId: "t0kACis_dJE",
        practicalExercise: {
          title: "Progressive Thought Settling Protocol",
          instructions: "Practice the three-stage thought settling protocol (thought capture, worry scheduling, and guided mental imagery) for five consecutive nights. Use the thought capture worksheet before bed, schedule worry time for the following day, and follow the guided imagery script. Document effectiveness and refinements in the progress tracker.",
          timeRequired: "15 minutes nightly for 5 nights",
          materials: ["Thought Capture Worksheet", "Worry Scheduling Tool", "Guided Imagery Scripts"],
          skillLevel: "advanced",
          outcomes: ["Reduced pre-sleep cognitive arousal", "Improved ability to quiet racing thoughts"]
        }
      }
    ]
  },
  {
    id: "cognitive-reframing",
    title: "Cognitive Reframing",
    description: "Change your perspective on challenging situations through evidence-based cognitive techniques.",
    icon: Zap,
    color: "bg-[#e3b85c]/10",
    duration: "45 minutes",
    learningOutcomes: [
      "Identify cognitive distortions in your thinking patterns",
      "Apply structured reframing techniques to challenging situations",
      "Develop habits of flexible and balanced thinking",
      "Create personalized cognitive reframing scripts for recurring challenges"
    ],
    sections: [
      {
        title: "Cognitive Distortion Identification",
        content: "Learn to recognize common thinking traps that contribute to stress and negative emotions.",
        duration: "15 minutes",
        videoId: "RORPx-Y6ByY",
        practicalExercise: {
          title: "Thought Pattern Analysis",
          instructions: "Record 10 stressful thoughts from the past week in the thought record worksheet. Analyze each thought to identify specific cognitive distortions using the classification guide. Create a frequency chart of your most common distortions and identify key triggers for each pattern.",
          timeRequired: "25 minutes",
          materials: ["Thought Record Worksheet", "Cognitive Distortion Classification Guide", "Pattern Frequency Chart"],
          skillLevel: "beginner",
          outcomes: ["Identification of personal cognitive distortion patterns", "Recognition of situational triggers"]
        }
      },
      {
        title: "Structured Reframing Techniques",
        content: "Master practical methods to challenge and transform unproductive thought patterns.",
        duration: "15 minutes",
        videoId: "ZU3MPwU8Gv4",
        practicalExercise: {
          title: "ABCD Reframing Practice",
          instructions: "Apply the ABCD method (Adversity, Beliefs, Consequences, Dispute) to 5 challenging situations. For each situation, complete the full worksheet process, generating multiple alternative perspectives and selecting the most balanced view. Test your reframed perspective by rating emotional impact before and after.",
          timeRequired: "30 minutes",
          materials: ["ABCD Reframing Worksheets", "Alternative Perspective Generator", "Emotional Impact Scale"],
          skillLevel: "intermediate",
          outcomes: ["Improved ability to generate alternative perspectives", "Practical experience with structured reframing"]
        }
      },
      {
        title: "Developing Cognitive Flexibility",
        content: "Build lasting habits of flexible thinking that promote resilience and emotional wellbeing.",
        duration: "15 minutes",
        videoId: "hQkXJE0fAh0",
        practicalExercise: {
          title: "Perspective Shifting Intensive",
          instructions: "Complete the perspective expansion exercises for three challenging scenarios. For each scenario, systematically adopt five different viewpoints (personal, detached observer, compassionate friend, future self, and devil's advocate). Document insights from each perspective and synthesize a comprehensive understanding using the integration worksheet.",
          timeRequired: "35 minutes",
          materials: ["Perspective Expansion Worksheets", "Viewpoint Adoption Guides", "Integration Template"],
          skillLevel: "advanced",
          outcomes: ["Enhanced cognitive flexibility", "Ability to hold multiple perspectives simultaneously"]
        }
      }
    ]
  },
  {
    id: "gratitude-practice",
    title: "Gratitude Practice",
    description: "Cultivate a gratitude practice to enhance wellbeing, reduce stress, and improve mood.",
    icon: Sparkles,
    color: "bg-[#5ce39b]/10",
    duration: "45 minutes",
    learningOutcomes: [
      "Understand the science behind gratitude's effects on wellbeing",
      "Develop multiple gratitude practices suited to your preferences",
      "Overcome common obstacles to consistent gratitude practice",
      "Create sustainable habits that maintain gratitude over time"
    ],
    sections: [
      {
        title: "Gratitude Practice Assessment",
        content: "Assess your current gratitude practices and identify areas for improvement.",
        duration: "10 minutes",
        videoId: "a1b2c3d4e5",
        practicalExercise: {
          title: "Gratitude Practice Inventory",
          instructions: "Complete the gratitude practice inventory worksheet, identifying your current practices, frequency, and effectiveness. Reflect on what you enjoy about your current practices and what you would like to add or change.",
          timeRequired: "15 minutes",
          materials: ["Gratitude Practice Inventory Worksheet"],
          skillLevel: "beginner",
          outcomes: ["Identification of current gratitude practices", "Reflection on current practice effectiveness"]
        }
      },
      {
        title: "Gratitude Journaling",
        content: "Develop a daily or weekly gratitude journal to cultivate a consistent practice.",
        duration: "12 minutes",
        videoId: "f6g7h8i9j0",
        practicalExercise: {
          title: "Daily Gratitude Journaling",
          instructions: "Start a daily gratitude journal, focusing on three things you are grateful for each day. Reflect on the impact of your gratitude practice and how it enhances your mood and wellbeing.",
          timeRequired: "15 minutes",
          materials: ["Daily Gratitude Journal"],
          skillLevel: "intermediate",
          outcomes: ["Consistent daily gratitude practice", "Increased emotional well-being"]
        }
      },
      {
        title: "Gratitude Meditation",
        content: "Practice mindfulness meditation to enhance gratitude and reduce stress.",
        duration: "15 minutes",
        videoId: "k1l2m3n4o5",
        practicalExercise: {
          title: "Gratitude Meditation",
          instructions: "Engage in a guided meditation focusing on gratitude, using the provided script. Reflect on the positive emotions and sensations that arise during the meditation.",
          timeRequired: "20 minutes",
          materials: ["Gratitude Meditation Script"],
          skillLevel: "advanced",
          outcomes: ["Enhanced gratitude and reduced stress", "Improved mental focus and relaxation"]
        }
      }
    ]
  },
  {
    id: "self-compassion",
    title: "Self-Compassion Skills",
    description: "Develop self-compassion skills to counteract self-criticism and enhance emotional wellbeing.",
    icon: Laugh,
    color: "bg-[#e35c9b]/10",
    duration: "45 minutes",
    learningOutcomes: [
      "Recognize patterns of self-criticism and their impact",
      "Apply self-compassion techniques in challenging situations",
      "Develop a personalized self-compassion practice",
      "Build resilience through self-directed kindness"
    ],
    sections: [
      {
        title: "Self-Criticism Assessment",
        content: "Assess your current self-criticism patterns and identify areas for improvement.",
        duration: "10 minutes",
        videoId: "p6q7r8s9t0",
        practicalExercise: {
          title: "Self-Criticism Inventory",
          instructions: "Complete the self-criticism inventory worksheet, identifying your current patterns, frequency, and impact. Reflect on what you enjoy about your current patterns and what you would like to change.",
          timeRequired: "15 minutes",
          materials: ["Self-Criticism Inventory Worksheet"],
          skillLevel: "beginner",
          outcomes: ["Identification of current self-criticism patterns", "Reflection on current pattern impact"]
        }
      },
      {
        title: "Self-Compassion Practice",
        content: "Develop a personalized self-compassion practice to counteract self-criticism.",
        duration: "12 minutes",
        videoId: "u1v2w3x4y5",
        practicalExercise: {
          title: "Self-Compassion Meditation",
          instructions: "Engage in a guided meditation focusing on self-compassion, using the provided script. Reflect on the positive emotions and sensations that arise during the meditation.",
          timeRequired: "20 minutes",
          materials: ["Self-Compassion Meditation Script"],
          skillLevel: "intermediate",
          outcomes: ["Improved self-compassion and reduced self-criticism", "Enhanced emotional well-being"]
        }
      },
      {
        title: "Self-Compassion Journaling",
        content: "Develop a daily or weekly self-compassion journal to cultivate a consistent practice.",
        duration: "15 minutes",
        videoId: "z1a2b3c4d5",
        practicalExercise: {
          title: "Daily Self-Compassion Journaling",
          instructions: "Start a daily self-compassion journal, focusing on your positive qualities and experiences. Reflect on the impact of your self-compassion practice and how it enhances your mood and wellbeing.",
          timeRequired: "15 minutes",
          materials: ["Daily Self-Compassion Journal"],
          skillLevel: "advanced",
          outcomes: ["Consistent daily self-compassion practice", "Increased emotional well-being"]
        }
      }
    ]
  },
  {
    id: "social-connection",
    title: "Building Social Connection",
    description: "Strategies for meaningful social connections that support mental health and resilience.",
    icon: UserPlus,
    color: "bg-[#e39b5c]/10",
    duration: "45 minutes",
    learningOutcomes: [
      "Understand the critical role of social connection in mental health",
      "Assess the quality and diversity of your current social connections",
      "Develop strategies for deepening existing relationships",
      "Build skills for forming new meaningful connections"
    ],
    sections: [
      {
        title: "Social Connection Assessment",
        content: "Assess your current social connections and identify areas for improvement.",
        duration: "10 minutes",
        videoId: "b1c2d3e4f5",
        practicalExercise: {
          title: "Social Connection Inventory",
          instructions: "Complete the social connection inventory worksheet, identifying your current relationships, frequency, and impact. Reflect on what you enjoy about your current relationships and what you would like to change.",
          timeRequired: "15 minutes",
          materials: ["Social Connection Inventory Worksheet"],
          skillLevel: "beginner",
          outcomes: ["Identification of current social connections", "Reflection on current relationship impact"]
        }
      },
      {
        title: "Social Connection Building",
        content: "Develop strategies for deepening existing relationships and building new meaningful connections.",
        duration: "12 minutes",
        videoId: "g1h2i3j4k5",
        practicalExercise: {
          title: "Social Connection Building Workshop",
          instructions: "Participate in a workshop or training session focused on building social connections. Learn techniques for active listening, empathy, and effective communication.",
          timeRequired: "20 minutes",
          materials: ["Social Connection Building Workshop"],
          skillLevel: "intermediate",
          outcomes: ["Improved social connection skills", "Enhanced ability to form meaningful relationships"]
        }
      },
      {
        title: "Social Connection Journaling",
        content: "Develop a daily or weekly social connection journal to cultivate a consistent practice.",
        duration: "15 minutes",
        videoId: "l1m2n3o4p5",
        practicalExercise: {
          title: "Daily Social Connection Journaling",
          instructions: "Start a daily social connection journal, focusing on your positive interactions and experiences. Reflect on the impact of your social connection practice and how it enhances your mood and wellbeing.",
          timeRequired: "15 minutes",
          materials: ["Daily Social Connection Journal"],
          skillLevel: "advanced",
          outcomes: ["Consistent daily social connection practice", "Increased emotional well-being"]
        }
      }
    ]
  },
  {
    id: "anxiety-management",
    title: "Anxiety Management Toolkit",
    description: "Practical tools and techniques for managing anxiety in everyday situations.",
    icon: BadgeCheck,
    color: "bg-[#5ce3e3]/10",
    duration: "45 minutes",
    learningOutcomes: [
      "Recognize anxiety symptoms before they escalate",
      "Apply immediate anxiety reduction techniques",
      "Develop a personalized anxiety management plan",
      "Build long-term anxiety resilience strategies"
    ],
    sections: [
      {
        title: "Anxiety Symptom Assessment",
        content: "Assess your current anxiety symptoms and identify areas for improvement.",
        duration: "10 minutes",
        videoId: "q1r2s3t4u5",
        practicalExercise: {
          title: "Anxiety Symptom Inventory",
          instructions: "Complete the anxiety symptom inventory worksheet, identifying your current symptoms, frequency, and impact. Reflect on what you enjoy about your current symptoms and what you would like to change.",
          timeRequired: "15 minutes",
          materials: ["Anxiety Symptom Inventory Worksheet"],
          skillLevel: "beginner",
          outcomes: ["Identification of current anxiety symptoms", "Reflection on current symptom impact"]
        }
      },
      {
        title: "Anxiety Reduction Techniques",
        content: "Develop a personalized anxiety reduction plan to manage anxiety symptoms.",
        duration: "12 minutes",
        videoId: "v1w2x3y4z5",
        practicalExercise: {
          title: "Anxiety Reduction Workshop",
          instructions: "Participate in a workshop or training session focused on anxiety reduction techniques. Learn techniques for deep breathing, progressive muscle relaxation, and mindfulness.",
          timeRequired: "20 minutes",
          materials: ["Anxiety Reduction Workshop"],
          skillLevel: "intermediate",
          outcomes: ["Improved anxiety management skills", "Enhanced ability to manage anxiety symptoms"]
        }
      },
      {
        title: "Anxiety Journaling",
        content: "Develop a daily or weekly anxiety journal to cultivate a consistent practice.",
        duration: "15 minutes",
        videoId: "y1z2a3b4c5",
        practicalExercise: {
          title: "Daily Anxiety Journaling",
          instructions: "Start a daily anxiety journal, focusing on your anxiety symptoms and coping strategies. Reflect on the impact of your anxiety journaling practice and how it enhances your mood and wellbeing.",
          timeRequired: "15 minutes",
          materials: ["Daily Anxiety Journal"],
          skillLevel: "advanced",
          outcomes: ["Consistent daily anxiety journaling practice", "Increased emotional well-being"]
        }
      }
    ]
  },
  {
    id: "boundary-setting",
    title: "Healthy Boundary Setting",
    description: "Learn to establish and maintain healthy boundaries in all areas of your life.",
    icon: Compass,
    color: "bg-[#c85ce3]/10",
    duration: "45 minutes",
    learningOutcomes: [
      "Identify boundary violations and their impact",
      "Develop clear and compassionate boundary language",
      "Implement strategies for maintaining boundaries under pressure",
      "Create a comprehensive boundary framework for different life domains"
    ],
    sections: [
      {
        title: "Boundary Violation Assessment",
        content: "Assess your current boundary violations and identify areas for improvement.",
        duration: "10 minutes",
        videoId: "w1x2y3z4a5",
        practicalExercise: {
          title: "Boundary Violation Inventory",
          instructions: "Complete the boundary violation inventory worksheet, identifying your current violations, frequency, and impact. Reflect on what you enjoy about your current violations and what you would like to change.",
          timeRequired: "15 minutes",
          materials: ["Boundary Violation Inventory Worksheet"],
          skillLevel: "beginner",
          outcomes: ["Identification of current boundary violations", "Reflection on current violation impact"]
        }
      },
      {
        title: "Boundary Language Development",
        content: "Develop clear and compassionate boundary language to communicate effectively.",
        duration: "12 minutes",
        videoId: "b1c2d3e4f5",
        practicalExercise: {
          title: "Boundary Language Workshop",
          instructions: "Participate in a workshop or training session focused on boundary language development. Learn techniques for effective communication and assertiveness.",
          timeRequired: "20 minutes",
          materials: ["Boundary Language Workshop"],
          skillLevel: "intermediate",
          outcomes: ["Improved boundary language skills", "Enhanced ability to communicate effectively"]
        }
      },
      {
        title: "Boundary Implementation",
        content: "Implement strategies for maintaining boundaries under pressure and create a comprehensive boundary framework.",
        duration: "15 minutes",
        videoId: "g1h2i3j4k5",
        practicalExercise: {
          title: "Boundary Implementation Workshop",
          instructions: "Participate in a workshop or training session focused on boundary implementation. Learn techniques for maintaining boundaries in different life domains, such as work, relationships, and personal space.",
          timeRequired: "20 minutes",
          materials: ["Boundary Implementation Workshop"],
          skillLevel: "advanced",
          outcomes: ["Comprehensive boundary framework", "Effective boundary implementation"]
        }
      }
    ]
  },
  {
    id: "values-alignment",
    title: "Living by Your Values",
    description: "Clarify your core values and align your actions and choices with what matters most to you.",
    icon: PenTool,
    color: "bg-[#e3c85c]/10",
    duration: "45 minutes",
    learningOutcomes: [
      "Identify your core personal and professional values",
      "Recognize misalignments between values and behaviors",
      "Develop strategies for values-based decision making",
      "Create a plan for greater values alignment in daily life"
    ],
    sections: [
      {
        title: "Value Clarification",
        content: "Clarify your core personal and professional values.",
        duration: "10 minutes",
        videoId: "d1e2f3g4h5",
        practicalExercise: {
          title: "Value Clarification Workshop",
          instructions: "Participate in a workshop or training session focused on value clarification. Learn techniques for identifying and clarifying your core values.",
          timeRequired: "20 minutes",
          materials: ["Value Clarification Workshop"],
          skillLevel: "beginner",
          outcomes: ["Identification of core personal and professional values", "Enhanced self-awareness"]
        }
      },
      {
        title: "Values Alignment",
        content: "Develop strategies for aligning your actions and choices with your core values.",
        duration: "12 minutes",
        videoId: "i1j2k3l4m5",
        practicalExercise: {
          title: "Values Alignment Workshop",
          instructions: "Participate in a workshop or training session focused on values alignment. Learn techniques for aligning your actions and choices with your core values.",
          timeRequired: "20 minutes",
          materials: ["Values Alignment Workshop"],
          skillLevel: "intermediate",
          outcomes: ["Improved values alignment", "Enhanced decision-making skills"]
        }
      },
      {
        title: "Values Journaling",
        content: "Develop a daily or weekly values journal to cultivate a consistent practice.",
        duration: "15 minutes",
        videoId: "n1o2p3q4r5",
        practicalExercise: {
          title: "Daily Values Journaling",
          instructions: "Start a daily values journal, focusing on your values and how they guide your actions and choices. Reflect on the impact of your values journaling practice and how it enhances your mood and wellbeing.",
          timeRequired: "15 minutes",
          materials: ["Daily Values Journal"],
          skillLevel: "advanced",
          outcomes: ["Consistent daily values journaling practice", "Increased emotional well-being"]
        }
      }
    ]
  },
  {
    id: "habit-formation",
    title: "Habit Formation Mastery",
    description: "Science-based approaches to building sustainable habits that support your mental wellness goals.",
    icon: Sparkles,
    color: "bg-[#5cc8e3]/10",
    duration: "45 minutes",
    learningOutcomes: [
      "Understand the neuroscience of habit formation",
      "Design effective habit implementation plans",
      "Overcome common obstacles to habit maintenance",
      "Build systems that support automatic positive behaviors"
    ],
    sections: [
      {
        title: "Habit Formation Assessment",
        content: "Assess your current habit formation skills and identify areas for improvement.",
        duration: "10 minutes",
        videoId: "m1n2o3p4q5",
        practicalExercise: {
          title: "Habit Formation Inventory",
          instructions: "Complete the habit formation inventory worksheet, identifying your current habits, frequency, and impact. Reflect on what you enjoy about your current habits and what you would like to change.",
          timeRequired: "15 minutes",
          materials: ["Habit Formation Inventory Worksheet"],
          skillLevel: "beginner",
          outcomes: ["Identification of current habits", "Reflection on current habit impact"]
        }
      },
      {
        title: "Habit Implementation",
        content: "Design effective habit implementation plans to build sustainable habits.",
        duration: "12 minutes",
        videoId: "s1t2u3v4w5",
        practicalExercise: {
          title: "Habit Implementation Workshop",
          instructions: "Participate in a workshop or training session focused on habit implementation. Learn techniques for designing effective habit implementation plans.",
          timeRequired: "20 minutes",
          materials: ["Habit Implementation Workshop"],
          skillLevel: "intermediate",
          outcomes: ["Improved habit implementation skills", "Enhanced ability to build sustainable habits"]
        }
      },
      {
        title: "Habit Maintenance",
        content: "Overcome common obstacles to habit maintenance and build systems that support automatic positive behaviors.",
        duration: "15 minutes",
        videoId: "y1z2a3b4c5",
        practicalExercise: {
          title: "Habit Maintenance Workshop",
          instructions: "Participate in a workshop or training session focused on habit maintenance. Learn techniques for overcoming common obstacles to habit maintenance and building systems that support automatic positive behaviors.",
          timeRequired: "20 minutes",
          materials: ["Habit Maintenance Workshop"],
          skillLevel: "advanced",
          outcomes: ["Effective habit maintenance strategies", "Increased emotional well-being"]
        }
      }
    ]
  }
];
