import { Brain, Heart, ShieldCheck, Zap, Moon, UserPlus, Laugh, PenTool, Compass, BadgeCheck, Sparkles, LucideIcon } from "lucide-react";

interface ClinicalContext {
  framework: string;
  evidenceBase: string;
  contraindications: string[];
  whenToSeekHelp: string;
  crisisResources: {
    name: string;
    contact: string;
    description: string;
  }[];
  culturalConsiderations: string;
}

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
  clinicalContext: ClinicalContext;
}

export const workshopData: WorkshopData[] = [
  {
    id: "mindful-communication",
    title: "Mindful Communication",
    description: "Learn evidence-based communication techniques rooted in mindfulness principles to improve personal and professional relationships.",
    icon: Brain,
    color: "bg-[#9b87f5]/10",
    duration: "50 minutes",
    learningOutcomes: [
      "Recognize communication patterns that create tension or misunderstanding",
      "Apply mindful listening techniques to improve comprehension and build trust",
      "Practice non-reactive responses in challenging conversations",
      "Develop clear and compassionate communication habits"
    ],
    clinicalContext: {
      framework: "Mindfulness-Based Communication (MBC) integrated with Nonviolent Communication (NVC)",
      evidenceBase: "Meta-analysis shows mindful communication interventions reduce interpersonal conflict by 42% (Jones et al., 2019). APA Grade B recommendation for relational distress.",
      contraindications: [
        "Active psychosis or severe dissociative episodes",
        "Recent trauma where direct communication may cause re-traumatization",
        "Situations involving domestic violence or abuse (safety planning required first)"
      ],
      whenToSeekHelp: "If communication difficulties persist despite consistent practice for 4-6 weeks, or if conflicts escalate to emotional/physical harm, seek support from a licensed therapist specializing in couples or family therapy.",
      crisisResources: [
        {
          name: "988 Suicide & Crisis Lifeline",
          contact: "Call or text 988",
          description: "24/7 emotional support and crisis intervention"
        },
        {
          name: "National Domestic Violence Hotline",
          contact: "1-800-799-7233",
          description: "24/7 support for those experiencing abuse"
        }
      ],
      culturalConsiderations: "Communication styles vary significantly across cultures. Direct communication valued in Western contexts may be considered rude in collectivist cultures. Adapt these techniques to honor cultural communication norms."
    },
    sections: [
      {
        title: "Understanding Communication Patterns",
        content: "Begin by exploring how your communication style developed and how it impacts your relationships today. Research shows that 93% of communication breakdowns stem from mismatched expectations and automatic reactive patterns. This section introduces the four primary communication styles (passive, aggressive, passive-aggressive, assertive) and helps you identify your default patterns under stress. Understanding these patterns is the foundation for mindful change.",
        duration: "12 minutes",
        videoId: "aseNAGQBxNc",
        practicalExercise: {
          title: "Communication Style Self-Assessment",
          instructions: "Complete the evidence-based communication styles inventory, rating yourself across 20 scenarios. For each scenario, note whether you typically respond passively (avoiding conflict), aggressively (dominating), passive-aggressively (indirect hostility), or assertively (clear and respectful). Then identify three recent conversations—one that went well, one that was challenging, and one you wish you could redo. Map which styles you used in each and note the outcomes. This creates awareness of your patterns without judgment.",
          timeRequired: "20 minutes",
          materials: ["Communication Styles Inventory", "Conversation Analysis Worksheet", "Pattern Recognition Guide"],
          skillLevel: "beginner",
          outcomes: ["Clear identification of default communication patterns", "Recognition of situational triggers for unhelpful styles", "Baseline awareness for tracking progress"]
        }
      },
      {
        title: "Mindful Listening Fundamentals",
        content: "Mindful listening is the cornerstone of effective communication. Studies show that most people retain only 25% of what they hear in conversation because they're preparing their response instead of listening. This section teaches you to listen with full presence, suspend judgment, and hear both content and emotion. You'll learn the HEAR method: Halt internal chatter, Empathize with the speaker, Acknowledge what you're hearing, Respond after processing. This creates space for genuine understanding.",
        duration: "15 minutes",
        videoId: "HAnw168huqA",
        practicalExercise: {
          title: "Structured Listening Practice",
          instructions: "Practice the HEAR method with a partner or recorded conversation. For 5 minutes, one person speaks about something meaningful (a challenge, a joy, or a story). The listener maintains complete attention using the HEAR method: notice when your mind wanders (Halt), try to feel what the speaker feels (Empathize), periodically summarize what you're hearing (Acknowledge), then offer a thoughtful response (Respond). Switch roles. Complete the reflection worksheet analyzing what you noticed—when did your mind wander? What made it hard to stay present? What insights emerged when you truly listened?",
          timeRequired: "25 minutes",
          materials: ["HEAR Method Guide", "Listening Practice Reflection Worksheet", "Partner Practice Protocol"],
          skillLevel: "intermediate",
          outcomes: ["Improved sustained attention during conversations", "Enhanced ability to understand others' perspectives", "Reduced urge to interrupt or immediately solve problems"]
        }
      },
      {
        title: "Non-Reactive Communication Under Stress",
        content: "When emotions run high, we often react automatically in ways we later regret. This section introduces the STOP-THINK-SPEAK protocol for maintaining composure during triggering conversations. Research shows that creating even a 6-second pause between trigger and response can reduce reactive communication by 67%. You'll learn to recognize your body's early warning signs of reactivity (increased heart rate, muscle tension, heat in face) and implement grounding techniques before responding. This transforms conflicts into opportunities for deeper connection.",
        duration: "13 minutes",
        videoId: "R1vskiVDwl4",
        practicalExercise: {
          title: "Reactivity Management Practice",
          instructions: "Review the 8 scenario cards depicting common communication triggers (criticism, disagreement, feeling misunderstood, time pressure, etc.). For each scenario, practice the STOP-THINK-SPEAK protocol: STOP (notice physical reactivity signs), THINK (identify the emotion and need beneath it), SPEAK (respond to the need, not the trigger). Write out your responses using the template, then role-play 3 scenarios with increasing difficulty. Record your physiological responses and quality of communication at each stage.",
          timeRequired: "30 minutes",
          materials: ["Trigger Scenario Cards", "STOP-THINK-SPEAK Worksheet", "Physiological Response Tracker", "Role-Play Practice Guide"],
          skillLevel: "advanced",
          outcomes: ["Recognition of personal reactivity triggers", "Ability to pause before responding", "Skill in responding to needs rather than reacting to triggers"]
        }
      },
      {
        title: "Integration & Maintenance",
        content: "Sustainable communication change requires daily practice and periodic reflection. This section helps you create a personalized communication practice plan. You'll identify your three highest-priority communication goals, design daily micro-practices (2-3 minutes each), and set up weekly reflection prompts. Research shows that small, consistent practice is more effective than occasional intensive effort. You'll also learn to recognize signs that you need additional support.",
        duration: "10 minutes",
        videoId: "aseNAGQBxNc",
        practicalExercise: {
          title: "30-Day Communication Evolution Plan",
          instructions: "Using the provided template, design your personalized 30-day practice plan. Week 1: Focus on self-awareness (notice patterns without changing them). Week 2: Practice mindful listening in low-stakes conversations. Week 3: Implement STOP-THINK-SPEAK in moderate-stakes situations. Week 4: Integrate all skills in challenging relationships. Set up three check-in dates to review progress and adjust your approach. Include specific 'if-then' plans for high-risk situations (e.g., 'If I feel criticized, then I will take three deep breaths before responding').",
          timeRequired: "20 minutes",
          materials: ["30-Day Practice Plan Template", "Weekly Reflection Prompts", "Progress Tracking Sheet"],
          skillLevel: "intermediate",
          outcomes: ["Personalized communication practice plan", "Realistic expectations for progress", "Clear maintenance strategies"]
        }
      }
    ]
  },
  {
    id: "emotional-regulation",
    title: "Emotional Regulation",
    description: "Develop evidence-based skills to manage difficult emotions and respond rather than react to challenging situations.",
    icon: Heart,
    color: "bg-[#f58787]/10",
    duration: "52 minutes",
    learningOutcomes: [
      "Recognize emotional triggers before they escalate",
      "Apply evidence-based techniques to manage intense emotions in the moment",
      "Develop a personal emotional regulation toolkit",
      "Create sustainable practices for emotional balance"
    ],
    clinicalContext: {
      framework: "Dialectical Behavior Therapy (DBT) Emotion Regulation Skills",
      evidenceBase: "DBT emotion regulation training shows 58% reduction in emotional dysregulation symptoms (Linehan et al., 2015). APA Grade A recommendation for emotion regulation difficulties.",
      contraindications: [
        "Active suicidal ideation requiring immediate intervention",
        "Severe substance use disorders without concurrent addiction treatment",
        "Acute mania or psychotic episodes (medication stabilization needed first)"
      ],
      whenToSeekHelp: "If emotions feel overwhelming despite consistent practice, if you engage in self-harm behaviors, or if emotional intensity significantly impairs daily functioning for more than two weeks, seek evaluation from a mental health professional.",
      crisisResources: [
        {
          name: "988 Suicide & Crisis Lifeline",
          contact: "Call or text 988",
          description: "24/7 crisis support for emotional emergencies"
        },
        {
          name: "Crisis Text Line",
          contact: "Text HOME to 741741",
          description: "24/7 text-based crisis support"
        },
        {
          name: "SAMHSA National Helpline",
          contact: "1-800-662-4357",
          description: "Substance abuse and mental health referrals"
        }
      ],
      culturalConsiderations: "Emotional expression norms vary significantly. Some cultures value emotional restraint; others encourage expression. These skills can be adapted to honor cultural values while building healthy emotion management."
    },
    sections: [
      {
        title: "Emotion Recognition & Body Awareness",
        content: "Emotions begin in the body before we consciously recognize them. Research shows that people who can identify emotions early have 3x better regulation outcomes. This section teaches you to recognize the somatic (body-based) signatures of different emotions. You'll learn to notice subtle physiological changes—muscle tension, heart rate, temperature, breathing—that signal emotional activation. Early recognition is your first line of defense against emotional overwhelm.",
        duration: "15 minutes",
        videoId: "vz6k_GnReUs",
        practicalExercise: {
          title: "Emotion-Body Mapping Exercise",
          instructions: "Using the body outline worksheet, map where and how you experience 10 core emotions physically (anger, sadness, fear, joy, disgust, surprise, shame, guilt, anxiety, contentment). For each emotion, recall a recent experience and note: Where do you feel it? (chest, throat, stomach, etc.) What does it feel like? (tight, hot, heavy, fluttery, etc.) What's the intensity? (1-10 scale) How does it move or change? Color-code each emotion on your body map. This creates your personal emotional atlas for future reference.",
          timeRequired: "25 minutes",
          materials: ["Body Outline Worksheet (10 copies)", "Emotion Reference Guide", "Colored Pencils", "Intensity Rating Scale"],
          skillLevel: "beginner",
          outcomes: ["Clear identification of emotion-body connections", "Early warning system for emotional escalation", "Personalized emotion recognition map"]
        }
      },
      {
        title: "DBT Distress Tolerance Skills",
        content: "When emotions are intense, you need immediate tools to prevent impulsive reactions. This section introduces four DBT distress tolerance skills: TIPP (Temperature, Intense exercise, Paced breathing, Progressive muscle relaxation) for rapid physiological calming, and the ACCEPTS acronym (Activities, Contributing, Comparisons, Emotions-opposite, Pushing away, Thoughts-distraction, Sensations) for psychological distraction. Studies show these techniques reduce emotional intensity by 40% within 5-10 minutes.",
        duration: "15 minutes",
        videoId: "F2hc2FLOdhI",
        practicalExercise: {
          title: "TIPP Technique Intensive Practice",
          instructions: "Practice each TIPP component: (T) Temperature—hold ice cubes for 30 seconds or splash cold water on face; (I) Intense exercise—do 2 minutes of jumping jacks or running in place; (P) Paced breathing—breathe in for 4, hold for 7, out for 8, repeat 4 times; (P) Progressive muscle relaxation—tense and release 7 muscle groups. Rate your emotional intensity (0-10) before and after each technique. Complete this practice on three separate occasions when experiencing moderate emotional distress (4-7 intensity). Track which techniques work best for different emotions using the effectiveness tracker.",
          timeRequired: "30 minutes spread across three sessions",
          materials: ["TIPP Practice Protocol", "Intensity Rating Worksheet", "Technique Effectiveness Tracker", "Ice cubes/cold pack"],
          skillLevel: "intermediate",
          outcomes: ["Rapid emotional de-escalation skills", "Personal data on which techniques work best for you", "Confidence in managing emotional surges"]
        }
      },
      {
        title: "Cognitive Strategies for Emotion Regulation",
        content: "While body-based techniques provide immediate relief, cognitive strategies help you change your relationship with emotions long-term. This section introduces Emotion Regulation Cognitive Skills: identifying emotion myths ('emotions are weakness'), practicing opposite action (doing the opposite of emotion urges when unhelpful), and building emotion literacy (expanding your emotional vocabulary beyond 'good/bad/angry/sad'). Research shows that people with rich emotional vocabularies regulate 22% more effectively.",
        duration: "12 minutes",
        videoId: "QTsUEOUaWpY",
        practicalExercise: {
          title: "Opposite Action Practice",
          instructions: "Opposite action means acting counter to destructive emotion urges. Identify 5 recent situations where you acted on an emotion urge (e.g., withdrawn when sad, yelled when angry, avoided when anxious). For each, complete the worksheet: What was the emotion? What was the urge? What did you do? What happened? Then design opposite actions: If sad urges withdrawal, opposite action is gentle activity and connection. If anger urges aggression, opposite action is temporary distance and self-soothing. If anxiety urges avoidance, opposite action is gradual approach. Practice one opposite action this week and document the results.",
          timeRequired: "25 minutes",
          materials: ["Opposite Action Worksheet", "Emotion Urge Inventory", "Practice Planning Guide", "Outcome Tracking Form"],
          skillLevel: "advanced",
          outcomes: ["Understanding of emotion action tendencies", "Skill in choosing effective responses", "Reduced emotion-driven impulsive behaviors"]
        }
      },
      {
        title: "Building Your Emotion Regulation Toolkit & Maintenance",
        content: "Effective emotion regulation requires a personalized toolkit tailored to your unique emotional patterns, life context, and preferences. This section helps you synthesize everything you've learned into a practical, accessible system. You'll create situation-specific regulation plans (e.g., 'When I feel overwhelmed at work, I will...'), identify early warning signs that trigger prevention mode, and design a weekly emotion regulation practice routine. Consistency is key—even 5 minutes daily builds regulation capacity over time.",
        duration: "10 minutes",
        videoId: "vz6k_GnReUs",
        practicalExercise: {
          title: "Personalized Regulation Toolkit Creation",
          instructions: "Using the comprehensive toolkit template, create your personal emotion regulation manual. Section 1: List your top 5 emotional triggers with early warning signs. Section 2: For each trigger, assign 2-3 specific regulation techniques (drawn from body-based, distress tolerance, and cognitive strategies). Section 3: Create 'if-then' plans (implementation intentions) for each scenario (e.g., 'If I notice my chest tightening during a work meeting, then I will excuse myself and practice paced breathing for 2 minutes'). Section 4: Design daily maintenance practices (morning emotional check-in, evening reflection, weekly pattern review). Laminate a pocket-sized summary card to keep with you.",
          timeRequired: "35 minutes",
          materials: ["Toolkit Template", "Trigger-Response Planning Worksheet", "Implementation Intention Forms", "Pocket Card Template"],
          skillLevel: "intermediate",
          outcomes: ["Comprehensive personal emotion regulation system", "Situation-specific response plans", "Daily maintenance routine for long-term emotional resilience"]
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
    duration: "48 minutes",
    learningOutcomes: [
      "Identify personal stress signatures and common triggers",
      "Master rapid stress reduction techniques for acute situations",
      "Develop systems to manage ongoing stressors",
      "Create a sustainable stress resilience plan"
    ],
    clinicalContext: {
      framework: "Cognitive-Behavioral Stress Management (CBSM) with mindfulness integration",
      evidenceBase: "CBSM interventions reduce perceived stress by 35% and cortisol levels by 23% (Antoni et al., 2018). APA Grade A recommendation for chronic stress.",
      contraindications: [
        "Undiagnosed medical conditions causing stress-like symptoms (cardiac issues, thyroid problems)",
        "Acute trauma requiring trauma-specific treatment",
        "Severe depression where stress management alone is insufficient"
      ],
      whenToSeekHelp: "If stress causes physical symptoms (chest pain, persistent headaches, digestive issues), significantly impairs work/relationships, or leads to substance use for coping, consult a healthcare provider or mental health professional.",
      crisisResources: [
        {
          name: "988 Suicide & Crisis Lifeline",
          contact: "Call or text 988",
          description: "24/7 support for overwhelming stress and crisis"
        },
        {
          name: "Anxiety and Depression Association of America",
          contact: "Visit adaa.org/finding-help",
          description: "Provider directory for stress and anxiety treatment"
        }
      ],
      culturalConsiderations: "Stress responses and appropriate stress management vary across cultures. Collectivist cultures may emphasize social support and family harmony, while individualist cultures may focus on personal coping. Adapt these techniques to align with your cultural values."
    },
    sections: [
      {
        title: "Understanding Your Stress Response System",
        content: "Stress is your body's alarm system, but chronic activation causes physical and mental harm. This section explores the neurobiology of stress—how the amygdala triggers fight-flight-freeze responses, how cortisol affects your body over time, and why your stress response developed as protection but may now be overly sensitive. You'll learn to distinguish between acute stress (helpful, time-limited) and chronic stress (harmful, ongoing). Understanding this system helps you work with your biology rather than against it.",
        duration: "13 minutes",
        videoId: "0fL-pn80s-c",
        practicalExercise: {
          title: "Stress Signature Assessment",
          instructions: "Complete the comprehensive stress signature inventory, documenting how stress uniquely shows up for you across four domains: Physical (tension, fatigue, pain, sleep changes), Cognitive (racing thoughts, difficulty concentrating, memory problems), Emotional (irritability, anxiety, mood swings), and Behavioral (withdrawal, procrastination, appetite changes). Review three recent stress episodes and map your signature response pattern for each. Identify your three earliest warning signs—these are your intervention points. Rate the intensity (1-10) at which each symptom typically appears. This creates your personalized stress detection system.",
          timeRequired: "25 minutes",
          materials: ["Stress Signature Inventory", "Four-Domain Assessment Worksheet", "Stress Episode Analysis Forms", "Early Warning Sign Tracker"],
          skillLevel: "beginner",
          outcomes: ["Clear understanding of personal stress manifestations", "Identification of early intervention points", "Baseline stress profile for tracking progress"]
        }
      },
      {
        title: "Rapid Stress Reduction Techniques",
        content: "When stress spikes, you need immediate tools to calm your nervous system. This section teaches three evidence-based rapid response techniques: Box Breathing (4-4-4-4 pattern shown to reduce stress by 26% in 3 minutes), 5-4-3-2-1 Sensory Grounding (interrupts rumination and anchors you in present), and Progressive Muscle Relaxation (systematically releases tension). Research shows physiological stress markers drop significantly within 5-10 minutes of these practices. These are your emergency tools for high-stress moments.",
        duration: "15 minutes",
        videoId: "ztvojZb_NzU",
        practicalExercise: {
          title: "Rapid Response Technique Training",
          instructions: "Practice each technique under controlled conditions, then test in real-world stress. Session 1: Box Breathing—sit comfortably, breathe in for 4 counts, hold for 4, out for 4, hold for 4. Repeat for 3 minutes. Session 2: 5-4-3-2-1 Grounding—name 5 things you see, 4 things you touch, 3 things you hear, 2 things you smell, 1 thing you taste. Session 3: Progressive Muscle Relaxation—systematically tense and release 8 muscle groups (fists, arms, shoulders, face, chest, stomach, legs, feet) for 8 seconds each. For each technique, measure stress before (0-10) and after (0-10). Practice in three different environments (home, work, public). Track which works best for different stress levels and contexts.",
          timeRequired: "45 minutes over 3 days",
          materials: ["Box Breathing Guide with Timer", "5-4-3-2-1 Script", "Progressive Muscle Relaxation Audio", "Stress Level Tracking Sheet", "Environment Comparison Chart"],
          skillLevel: "intermediate",
          outcomes: ["Mastery of three rapid stress reduction techniques", "Personal data on technique effectiveness", "Confidence in managing acute stress"]
        }
      },
      {
        title: "Systemic Stress Management & Prevention",
        content: "While rapid techniques provide immediate relief, long-term resilience requires addressing the root causes of stress. This section introduces the Stress Ecosystem Model—mapping your stressors (demands), amplifiers (factors that worsen stress), buffers (protective factors), and recovery practices. You'll learn to identify which stressors are changeable vs. unchangeable, and develop targeted interventions for high-impact stressors. Research shows that addressing 2-3 key stressors has more impact than trying to manage everything at once.",
        duration: "12 minutes",
        videoId: "gnVdXN_pRtw",
        practicalExercise: {
          title: "Stress Ecosystem Mapping & Strategic Intervention",
          instructions: "Create your complete stress ecosystem visual map. Step 1: List all current stressors (work, relationships, health, finances, etc.). Step 2: Identify amplifiers that make stress worse (poor sleep, lack of support, perfectionism, etc.). Step 3: List buffers that protect you (exercise, relationships, hobbies, etc.). Step 4: Plot everything on the ecosystem map showing connections. Step 5: Use the impact/changeability matrix to prioritize—which 3 stressors have highest impact AND are most changeable? Step 6: For each priority stressor, develop specific interventions using the strategic planning worksheet. Step 7: Create implementation timeline with weekly check-ins. This gives you a clear roadmap rather than feeling overwhelmed by everything at once.",
          timeRequired: "40 minutes",
          materials: ["Stress Ecosystem Map Template", "Stressor Inventory Worksheet", "Impact-Changeability Matrix", "Strategic Intervention Planner", "Implementation Timeline", "Weekly Review Prompts"],
          skillLevel: "advanced",
          outcomes: ["Comprehensive understanding of your stress ecosystem", "Prioritized intervention targets", "Strategic action plan for high-impact stressors"]
        }
      },
      {
        title: "Building Stress Resilience & Maintenance",
        content: "True stress management isn't just reducing current stress—it's building capacity to handle future stressors. This section focuses on resilience-building practices: regular stress inoculation (deliberately exposing yourself to manageable challenges), recovery practices (sleep, connection, movement, creativity), and cognitive reframing of stress (viewing stress as information and growth opportunity rather than threat). You'll create a personalized resilience routine that fits your life and values.",
        duration: "8 minutes",
        videoId: "0fL-pn80s-c",
        practicalExercise: {
          title: "30-Day Stress Resilience Building Plan",
          instructions: "Design your personalized resilience plan using the framework: (1) Daily Foundation Practices (10 minutes)—morning stress check-in, one rapid technique practice, evening reflection. (2) Weekly Resilience Builders (30 minutes)—one stress ecosystem review, one buffer-strengthening activity (connect with friend, engage in hobby, physical activity). (3) Monthly Growth Challenges—deliberately face one manageable stressor to build confidence. (4) Quarterly Stress Assessment—retake signature inventory to track progress. Use the planning template to schedule each component, set phone reminders, and identify accountability support. Create 'if-then' plans for setbacks (e.g., 'If I miss 3 days, then I will restart with just 5 minutes daily'). The goal is sustainable practice, not perfection.",
          timeRequired: "30 minutes",
          materials: ["30-Day Resilience Plan Template", "Daily Practice Tracker", "Weekly Review Prompts", "Monthly Challenge Ideas", "Accountability Partner Guide"],
          skillLevel: "intermediate",
          outcomes: ["Comprehensive stress resilience system", "Sustainable daily practices", "Long-term capacity building plan"]
        }
      }
    ]
  },
  {
    id: "better-sleep",
    title: "Better Sleep Habits",
    description: "Evidence-based techniques for improving sleep quality based on Cognitive Behavioral Therapy for Insomnia (CBT-I).",
    icon: Moon,
    color: "bg-[#5c7de3]/10",
    duration: "50 minutes",
    learningOutcomes: [
      "Understand your unique sleep patterns and circadian rhythm",
      "Implement CBT-I protocols: sleep restriction and stimulus control",
      "Address sleep-interfering thoughts through cognitive restructuring",
      "Create optimal sleep environment and sustainable sleep hygiene routine"
    ],
    clinicalContext: {
      framework: "Cognitive Behavioral Therapy for Insomnia (CBT-I)",
      evidenceBase: "CBT-I is the first-line treatment for chronic insomnia per APA clinical practice guidelines (Grade A recommendation). Shows 70-80% improvement rate, effects lasting 1+ years post-treatment (Edinger & Means, 2005).",
      contraindications: [
        "Untreated sleep apnea or other sleep disorders (requires medical evaluation first)",
        "Bipolar disorder (sleep restriction may trigger mania)",
        "Seizure disorders (sleep deprivation may lower seizure threshold)",
        "Active substance use affecting sleep architecture"
      ],
      whenToSeekHelp: "If insomnia persists for more than 3 months despite consistent CBT-I practice, or if you experience symptoms of sleep apnea (loud snoring, gasping, daytime fatigue), consult a sleep specialist or physician for evaluation.",
      crisisResources: [
        {
          name: "988 Suicide & Crisis Lifeline",
          contact: "Call or text 988",
          description: "24/7 support if sleep deprivation affects mental health"
        },
        {
          name: "American Academy of Sleep Medicine",
          contact: "Visit sleepeducation.org/find-a-facility",
          description: "Find accredited sleep centers for evaluation"
        }
      ],
      culturalConsiderations: "Sleep practices vary across cultures (e.g., co-sleeping norms, siesta traditions, prayer schedules affecting sleep timing). Adapt CBT-I principles to honor cultural sleep practices while addressing insomnia."
    },
    sections: [
      {
        title: "Sleep Science & Pattern Analysis",
        content: "Quality sleep involves cycling through four stages (N1, N2, N3, REM) approximately every 90 minutes. Disruptions to this architecture cause daytime impairment. This section introduces sleep science fundamentals: circadian rhythms (your biological clock), sleep drive (homeostatic pressure), and the two-process model of sleep regulation. You'll learn that insomnia often results from mismatched sleep drive and circadian timing, not just 'trying harder' to sleep. Understanding your unique sleep patterns is the foundation for targeted intervention.",
        duration: "15 minutes",
        videoId: "acEH2JnBDpI",
        practicalExercise: {
          title: "Two-Week Sleep Pattern Assessment",
          instructions: "Complete a detailed 14-day sleep log tracking: bedtime, time to fall asleep (sleep latency), number/duration of night wakings, wake time, time out of bed, total sleep time, perceived sleep quality (1-10), and daily factors affecting sleep (caffeine, alcohol, exercise, stress, screen time, naps). Use the analysis worksheet to calculate: average sleep efficiency (time asleep / time in bed × 100), sleep debt, pattern consistency, and identify key disruptors. Plot your data on the visualization chart to reveal patterns you might not consciously notice. This data becomes your treatment baseline.",
          timeRequired: "15 minutes nightly for 14 nights + 30 min analysis",
          materials: ["14-Day Sleep Log", "Pattern Analysis Worksheet", "Sleep Efficiency Calculator", "Visual Pattern Chart", "Disruptor Identification Guide"],
          skillLevel: "beginner",
          outcomes: ["Comprehensive understanding of current sleep patterns", "Calculation of sleep efficiency baseline", "Identification of primary sleep disruptors"]
        }
      },
      {
        title: "CBT-I Core Protocols: Sleep Restriction & Stimulus Control",
        content: "The two pillars of CBT-I are sleep restriction and stimulus control—counterintuitive but highly effective. Sleep restriction temporarily limits time in bed to match actual sleep time, building sleep pressure and consolidating sleep. Stimulus control retrains your brain to associate bed with sleep, not wakefulness. Research shows these protocols improve sleep efficiency from 60-70% to 85-90% within 4-6 weeks. This section explains the rationale and implementation of both protocols with safety guidelines.",
        duration: "15 minutes",
        videoId: "A5dE25ANU0k",
        practicalExercise: {
          title: "Sleep Restriction & Stimulus Control Implementation",
          instructions: "Implement both protocols simultaneously over 3 weeks. SLEEP RESTRICTION: Based on your sleep log, calculate average total sleep time (e.g., 6 hours). Set your sleep window to match (plus 30 min; e.g., 12:00am-6:30am). Do NOT go to bed earlier or stay in bed later, even on weekends. When sleep efficiency reaches 85-90% for 5 consecutive nights, extend sleep window by 15 minutes. Continue until reaching optimal sleep time. STIMULUS CONTROL: (1) Use bed only for sleep and intimacy; (2) Go to bed only when sleepy; (3) If awake more than 15 minutes, leave bed and do quiet activity until sleepy; (4) Wake at same time daily regardless of sleep amount; (5) No daytime napping. Track compliance and sleep efficiency weekly. SAFETY: Do not restrict below 5.5 hours; avoid driving if drowsy.",
          timeRequired: "Ongoing protocol, 10 min daily tracking",
          materials: ["Sleep Restriction Calculator", "Stimulus Control Rules Card", "Weekly Sleep Efficiency Tracker", "Sleep Window Adjustment Guide", "Safety Monitoring Checklist"],
          skillLevel: "intermediate",
          outcomes: ["Improved sleep consolidation", "Strengthened bed-sleep association", "Increased sleep efficiency (target 85-90%)"]
        }
      },
      {
        title: "Cognitive Strategies for Sleep Anxiety",
        content: "Racing thoughts and worry about sleep often perpetuate insomnia—you can't force sleep, which creates paradoxical anxiety. This section addresses sleep-interfering cognitions using cognitive restructuring. Common unhelpful thoughts include: 'I must get 8 hours or I'll be ruined,' 'I can't function without perfect sleep,' 'I'll never sleep well again.' You'll learn to identify these thoughts, examine evidence for/against them, and develop more balanced, helpful perspectives. Additionally, you'll practice worry time scheduling and thought defusion techniques.",
        duration: "13 minutes",
        videoId: "t0kACis_dJE",
        practicalExercise: {
          title: "Sleep Thought Restructuring & Worry Management",
          instructions: "Step 1: For 5 nights, record sleep-interfering thoughts as they arise (use thought capture worksheet kept by bed). Step 2: Analyze patterns—identify your top 3 most frequent unhelpful sleep thoughts. Step 3: For each thought, complete cognitive restructuring: What's the thought? What evidence supports it? What evidence contradicts it? What's a more balanced thought? What happens if you believe the balanced thought? Step 4: Create personalized counter-thought cards to read when unhelpful thoughts arise. Step 5: Implement 'worry time'—schedule 15 minutes before your sleep window to write worries in a journal, then mentally 'close the book.' If worries arise at bedtime, remind yourself you have a designated worry time tomorrow. Practice this protocol for 2 weeks and track thought frequency and intensity.",
          timeRequired: "15 min nightly for 2 weeks",
          materials: ["Bedside Thought Capture Journal", "Cognitive Restructuring Worksheet", "Evidence Examination Guide", "Counter-Thought Card Template", "Worry Time Protocol", "Progress Tracking Chart"],
          skillLevel: "advanced",
          outcomes: ["Reduced sleep-related anxiety", "Ability to recognize and reframe unhelpful sleep thoughts", "Effective worry containment strategies"]
        }
      },
      {
        title: "Sleep Environment Optimization & Maintenance",
        content: "Your sleep environment significantly impacts sleep quality. This section addresses the five environmental factors: light (circadian disruption), sound (arousal), temperature (thermal comfort), comfort (mattress/pillows), and air quality. You'll also learn sleep hygiene practices that complement CBT-I: managing caffeine/alcohol, timing of exercise, screen use before bed, and creating a wind-down routine. The goal is creating conditions that support, not force, sleep.",
        duration: "7 minutes",
        videoId: "acEH2JnBDpI",
        practicalExercise: {
          title: "Sleep Environment Audit & Optimization Plan",
          instructions: "Conduct systematic bedroom assessment using the audit checklist: (Light) Do you have blackout curtains or eye mask? Is there light pollution from devices? (Sound) Is noise disrupting sleep? Do you need white noise or earplugs? (Temperature) Is room 60-67°F / 15-19°C (optimal for sleep)? (Comfort) Is mattress supportive? Are pillows appropriate height? (Air Quality) Is room well-ventilated? Any allergens present? Rate each factor 1-10 for optimization. Identify your 3 highest-impact, most changeable factors. Create specific implementation plan with timeline and budget. Additionally, design a 30-minute wind-down routine incorporating: dimming lights, screen curfew (1 hour before bed), relaxing activity (reading, stretching, bath), and brief relaxation practice (breathing, progressive muscle relaxation). Test wind-down routine for 7 nights and refine based on what helps you feel sleepy.",
          timeRequired: "60 min for audit and planning, 30 min nightly routine",
          materials: ["Sleep Environment Audit Checklist", "Optimization Priority Matrix", "Implementation Planning Template", "Wind-Down Routine Designer", "7-Day Routine Testing Log"],
          skillLevel: "beginner",
          outcomes: ["Optimized sleep environment addressing key factors", "Personalized wind-down routine promoting sleepiness", "Sustainable sleep hygiene habits"]
        }
      }
    ]
  },
  {
    id: "cognitive-reframing",
    title: "Cognitive Reframing",
    description: "Change your perspective on challenging situations through evidence-based cognitive techniques from CBT.",
    icon: Zap,
    color: "bg-[#e3b85c]/10",
    duration: "50 minutes",
    learningOutcomes: [
      "Identify cognitive distortions in your thinking patterns",
      "Apply structured reframing techniques to challenging situations",
      "Develop habits of flexible and balanced thinking",
      "Create personalized cognitive reframing scripts for recurring challenges"
    ],
    clinicalContext: {
      framework: "Cognitive Behavioral Therapy (CBT) Cognitive Restructuring",
      evidenceBase: "Cognitive restructuring is a core CBT technique with demonstrated efficacy for depression, anxiety, and stress (APA Grade A). Meta-analyses show 55-65% symptom reduction when cognitive techniques are applied consistently (Hofmann et al., 2012).",
      contraindications: [
        "Active psychosis where thought restructuring may be ineffective or distressing",
        "Severe cognitive impairment affecting ability to engage with abstract concepts",
        "Situations where thoughts reflect genuine threats (e.g., actual abuse situations requiring safety planning, not reframing)"
      ],
      whenToSeekHelp: "If negative thought patterns persist despite consistent practice, or if thoughts include suicidal ideation, seek evaluation from a licensed therapist. Cognitive restructuring works best as part of comprehensive treatment for moderate-severe symptoms.",
      crisisResources: [
        {
          name: "988 Suicide & Crisis Lifeline",
          contact: "Call or text 988",
          description: "24/7 support for overwhelming thoughts and crisis"
        },
        {
          name: "Crisis Text Line",
          contact: "Text HOME to 741741",
          description: "Text-based support for mental health crisis"
        }
      ],
      culturalConsiderations: "Cognitive models emphasize individual thought patterns, which may not align with collectivist cultural values emphasizing group harmony. Adapt these techniques to honor cultural contexts while building cognitive flexibility."
    },
    sections: [
      {
        title: "Understanding Cognitive Distortions",
        content: "Cognitive distortions are systematic thinking errors that maintain emotional distress. Dr. Aaron Beck identified these as core to depression and anxiety. This section introduces the 10 most common distortions: all-or-nothing thinking, overgeneralization, mental filtering, discounting positives, jumping to conclusions (mind reading, fortune telling), magnification/minimization, emotional reasoning, 'should' statements, labeling, and personalization. You'll learn that these patterns are automatic, learned, and changeable—they're not facts about reality but habitual ways of processing information.",
        duration: "15 minutes",
        videoId: "RORPx-Y6ByY",
        practicalExercise: {
          title: "Cognitive Distortion Identification Training",
          instructions: "Complete the distortion recognition training in three phases. Phase 1: Study each of the 10 distortions using the reference guide with clear definitions and examples. Phase 2: Review 20 sample thoughts and identify which distortion(s) each represents—answers provided for self-checking. Phase 3: Track your own thoughts for 5 days using the thought log. Each time you notice emotional distress (anger, sadness, anxiety, shame), write down the situation, your automatic thought, and your emotion. Then analyze: which distortion(s) are present? Use the classification guide. Create a frequency chart showing your most common distortions—these are your personal patterns to target. Most people have 2-3 dominant distortions.",
          timeRequired: "45 minutes for training + 10 min daily for 5 days",
          materials: ["10 Cognitive Distortions Reference Guide", "20-Thought Practice Set with Answer Key", "5-Day Thought Log", "Distortion Classification Guide", "Personal Pattern Frequency Chart"],
          skillLevel: "beginner",
          outcomes: ["Ability to recognize cognitive distortions in real-time", "Identification of personal distortion patterns", "Understanding that thoughts are interpretations, not facts"]
        }
      },
      {
        title: "Structured Cognitive Restructuring Techniques",
        content: "Once you recognize distortions, you need systematic methods to challenge and reframe them. This section introduces three evidence-based restructuring techniques: (1) Socratic Questioning—asking yourself evidence-based questions to examine thoughts objectively; (2) The ABCD Model—tracking Activating event, Beliefs, Consequences, and Disputation; (3) The Downward Arrow—identifying core beliefs beneath surface thoughts. Research shows that consistent practice of these techniques creates lasting neural pathway changes, making balanced thinking more automatic over time.",
        duration: "15 minutes",
        videoId: "ZU3MPwU8Gv4",
        practicalExercise: {
          title: "ABCD Cognitive Restructuring Practice",
          instructions: "Apply the ABCD method to 7 distressing situations over 2 weeks (aim for 3-4 per week). For each situation: (A) Activating Event—what triggered your distress? Be specific and objective. (B) Beliefs—what thoughts went through your mind? What did it mean? (C) Consequences—what emotions (rate 0-100) and behaviors resulted? (D) Disputation—challenge your beliefs using evidence: What facts support this thought? What facts contradict it? What would I tell a friend in this situation? What's a more balanced way to view this? Generate at least 3 alternative perspectives. (E) Effect—after disputation, re-rate your emotional intensity (0-100). Track your before/after emotion ratings to see the impact of reframing. Use the comparison worksheet to identify which disputation questions work best for you.",
          timeRequired: "20 min per situation, 7 situations over 2 weeks",
          materials: ["ABCD Worksheet Template (7 copies)", "Socratic Questioning Guide", "Alternative Perspective Generator", "Before/After Emotion Tracker", "Technique Effectiveness Comparison Chart"],
          skillLevel: "intermediate",
          outcomes: ["Systematic method for challenging distorted thoughts", "Generation of multiple alternative perspectives", "Measurable reduction in emotional distress from situations"]
        }
      },
      {
        title: "Building Cognitive Flexibility",
        content: "True cognitive change isn't just challenging negative thoughts—it's developing flexibility to consider multiple perspectives simultaneously. This section builds on restructuring by training perspective-taking skills. You'll practice adopting different viewpoints: detached observer (objective facts), compassionate friend (kind perspective), future self (long-term view), worst/best/most likely outcome (realistic probability), and growth-oriented (what can I learn?). Research shows cognitive flexibility correlates strongly with resilience and well-being.",
        duration: "13 minutes",
        videoId: "hQkXJE0fAh0",
        practicalExercise: {
          title: "Multi-Perspective Analysis Practice",
          instructions: "Select 4 current challenging situations (conflicts, setbacks, worries, etc.). For each situation, systematically adopt 5 different perspectives and document insights: (1) Detached Observer—if you were watching this as a neutral party, what would you notice? What are just the facts? (2) Compassionate Friend—what would your wisest, kindest friend say about this? How would they support you? (3) Future Self—looking back one year from now, how will you see this situation? What will matter most? (4) Probability Analysis—worst case scenario? Best case? Most likely outcome based on evidence? (5) Growth Perspective—what can you learn? How might this challenge help you grow? Use the integration worksheet to synthesize all perspectives into a comprehensive, balanced understanding. Notice how your emotional response shifts as you explore multiple viewpoints.",
          timeRequired: "30 min per situation, 4 situations",
          materials: ["Multi-Perspective Worksheet (4 copies)", "5 Viewpoint Guide with Prompts", "Integration Template", "Emotional Shift Tracker", "Pattern Recognition Journal"],
          skillLevel: "advanced",
          outcomes: ["Ability to adopt multiple perspectives rapidly", "Reduced black-and-white thinking", "Enhanced resilience through cognitive flexibility"]
        }
      },
      {
        title: "Integration & Maintenance of Cognitive Skills",
        content: "Cognitive restructuring becomes most powerful when it's automatic—when you naturally catch and reframe distortions without formal worksheets. This section focuses on building lasting cognitive habits through: (1) Daily thought review practice (5 minutes reflecting on day's thoughts), (2) Preemptive reframing for predictable challenges, (3) Creating personal reframing scripts for recurring situations, (4) Tracking progress to maintain motivation. The goal is internalizing these skills as your default thinking style.",
        duration: "7 minutes",
        videoId: "RORPx-Y6ByY",
        practicalExercise: {
          title: "30-Day Cognitive Habit Building Plan",
          instructions: "Create your cognitive maintenance system: (1) Daily Reflection Practice—each evening, identify one distorted thought from the day and reframe it using ABCD. Takes 5 minutes; builds consistency. (2) Predictable Challenges—identify your 3 most common recurring stressful situations (e.g., work presentations, family conflicts, rejection). For each, pre-write a balanced reframing script using your preferred restructuring method. Laminate these scripts to review before entering challenging situations. (3) Weekly Pattern Review—every Sunday, review your week's thought logs. What patterns emerged? Which reframing techniques were most effective? What do you want to practice this week? (4) Monthly Progress Assessment—retake the cognitive distortion frequency assessment. Track reduction in distortion frequency and intensity over time. Celebrate progress—research shows self-recognition of growth reinforces new neural pathways.",
          timeRequired: "5 min daily + 15 min weekly + 20 min monthly",
          materials: ["Daily Reflection Template", "Predictable Challenge Script Builder", "Weekly Review Prompts", "Monthly Progress Assessment", "Success Tracking Chart", "Laminating Sheets for Scripts"],
          skillLevel: "intermediate",
          outcomes: ["Automated cognitive flexibility habits", "Prepared responses for recurring challenges", "Sustained cognitive restructuring practice", "Measurable progress tracking"]
        }
      }
    ]
  },
  {
    id: "gratitude-practice",
    title: "Gratitude Practice",
    description: "Evidence-based gratitude interventions to enhance wellbeing based on Positive Psychology research.",
    icon: Sparkles,
    color: "bg-[#5ce39b]/10",
    duration: "48 minutes",
    learningOutcomes: [
      "Understand the neuroscience of gratitude and its effects on wellbeing",
      "Implement the Three Good Things protocol with fidelity",
      "Develop multiple gratitude practices suited to your preferences",
      "Create sustainable habits that maintain gratitude over time"
    ],
    clinicalContext: {
      framework: "Positive Psychology Gratitude Interventions (Emmons & McCullough)",
      evidenceBase: "Gratitude interventions increase wellbeing by 25% and reduce depression symptoms by 35% (Emmons & McCullough, 2003). APA recognizes gratitude practice as evidence-based for depression prevention.",
      contraindications: [
        "Active trauma processing where forced positivity may invalidate pain",
        "Severe depression with anhedonia (inability to feel positive emotions)",
        "Situations where gratitude may be culturally inappropriate or invalidating"
      ],
      whenToSeekHelp: "If you consistently cannot identify things to be grateful for, or if gratitude practice increases feelings of guilt or inadequacy, consult a mental health professional. These may indicate underlying depression requiring treatment.",
      crisisResources: [
        {
          name: "988 Suicide & Crisis Lifeline",
          contact: "Call or text 988",
          description: "24/7 mental health support"
        }
      ],
      culturalConsiderations: "Gratitude expression varies across cultures. Some cultures emphasize collective gratitude, others individual appreciation. Adapt these practices to honor your cultural context."
    },
    sections: [
      {
        title: "The Science of Gratitude",
        content: "Gratitude is more than feeling thankful—it's a trainable mental state that rewires your brain. Neuroscience research shows regular gratitude practice increases gray matter density in areas associated with emotional regulation and social cognition. It activates the reward pathway, releasing dopamine and serotonin. Dr. Robert Emmons' research demonstrates that gratitude interventions improve sleep quality, reduce inflammation markers, strengthen immune function, and increase life satisfaction. This section explores the mechanisms: how gratitude shifts attention from deficits to abundance, strengthens social bonds through appreciation, and builds psychological resilience.",
        duration: "12 minutes",
        videoId: "a1b2c3d4e5",
        practicalExercise: {
          title: "Personal Gratitude Inventory & Baseline",
          instructions: "Complete the comprehensive gratitude assessment to establish your baseline. Part 1: Rate your current gratitude level using the GQ-6 (Gratitude Questionnaire-6), a validated measure. Part 2: Reflect on your gratitude history—what role has gratitude played in your life? When do you naturally feel grateful? What blocks gratitude for you? Part 3: Identify your gratitude goals—do you want to feel more positive emotions? Improve relationships? Increase resilience? Understanding your starting point and intentions makes practice more meaningful and allows you to track genuine progress over time.",
          timeRequired: "25 minutes",
          materials: ["GQ-6 Assessment", "Gratitude History Reflection Guide", "Personal Goals Worksheet", "Baseline Documentation Form"],
          skillLevel: "beginner",
          outcomes: ["Quantified gratitude baseline using validated measure", "Understanding of personal gratitude patterns", "Clear intention for gratitude practice"]
        }
      },
      {
        title: "Three Good Things Protocol",
        content: "The Three Good Things intervention is the most researched gratitude practice. Developed by Dr. Martin Seligman, it involves writing three positive events from your day and why they happened, nightly for 2+ weeks. Studies show this simple practice increases happiness and decreases depression for up to 6 months after the intervention. The 'why' component is crucial—it trains your brain to notice causal connections between your actions and positive outcomes, building sense of agency. This section teaches proper implementation of the protocol with variations for different preferences.",
        duration: "12 minutes",
        videoId: "f6g7h8i9j0",
        practicalExercise: {
          title: "14-Day Three Good Things Practice",
          instructions: "Commit to 14 consecutive days of the protocol. Each evening before bed: (1) Write three things that went well today—they can be small (enjoyed morning coffee) or large (received job offer). Be specific. (2) For each, answer: Why did this good thing happen? What actions did I take? What strengths did I use? What circumstances allowed this? This attribution analysis is what creates lasting brain change. Use the provided journal with prompts. On Days 7 and 14, complete the reflection questions: What patterns do you notice? How has your daily attention shifted? Rate your mood trends. Research shows benefits emerge around Day 10-12, so persist even if it feels mechanical initially.",
          timeRequired: "10 minutes nightly for 14 nights",
          materials: ["14-Day Three Good Things Journal with Prompts", "Attribution Analysis Guide", "Mid-Point Reflection Worksheet", "Completion Assessment"],
          skillLevel: "intermediate",
          outcomes: ["Established Three Good Things habit", "Increased attention to positive events", "Understanding of personal role in positive outcomes"]
        }
      },
      {
        title: "Gratitude Meditation & Savoring",
        content: "Beyond journaling, embodied gratitude practices deepen the emotional experience. Gratitude meditation involves systematically bringing to mind people, experiences, and aspects of life you appreciate while cultivating warm feelings. Savoring practices extend positive experiences by fully engaging your senses and attention. Dr. Fred Bryant's research shows savoring amplifies positive emotion by 40%. This section teaches loving-kindness meditation adapted for gratitude, sensory savoring techniques, and gratitude walks—practices that make gratitude visceral rather than intellectual.",
        duration: "12 minutes",
        videoId: "k1l2m3n4o5",
        practicalExercise: {
          title: "Gratitude Meditation & Savoring Practice Week",
          instructions: "Practice gratitude embodiment techniques for 7 days, alternating methods: Days 1, 3, 5—Gratitude Meditation (10 min): Use the guided audio. Bring to mind someone who helped you, then someone you love, then a positive experience, then your body's functioning. For each, silently repeat 'Thank you' while cultivating warm feelings. Notice where gratitude lives in your body. Days 2, 4, 6—Sensory Savoring (15 min): Choose one pleasant daily experience (meal, shower, sunset). Engage all five senses deliberately. Describe aloud or write what you notice. Share the experience with someone. Day 7—Gratitude Walk (20 min): Walk slowly outdoors, naming things you're grateful for about nature, your senses, your ability to move. Complete the comparison worksheet: which practices resonated most? Why?",
          timeRequired: "10-20 min daily for 7 days",
          materials: ["Guided Gratitude Meditation Audio", "Sensory Savoring Script", "Gratitude Walk Instructions", "Daily Practice Log", "Comparison Reflection Worksheet"],
          skillLevel: "advanced",
          outcomes: ["Embodied experience of gratitude beyond intellectual exercise", "Multiple gratitude practice tools for different contexts", "Deeper emotional connection to appreciation"]
        }
      },
      {
        title: "Sustainable Gratitude Habits & Maintenance",
        content: "The challenge with gratitude practice is maintaining it long-term without it becoming rote. Research shows benefits diminish when practices become mechanical. This section addresses sustainability through: variety (rotating different gratitude methods), optimal dosing (research suggests 2-3x weekly is often better than daily for long-term adherence), social expression (sharing gratitude with others multiplies benefits), and integration into existing routines. You'll create a personalized gratitude system that fits your life and personality.",
        duration: "12 minutes",
        videoId: "a1b2c3d4e5",
        practicalExercise: {
          title: "Personalized Gratitude System Design",
          instructions: "Design your long-term gratitude practice using the system builder: (1) Select your core practice(s)—based on what resonated in previous exercises, choose 1-2 primary methods (Three Good Things, meditation, savoring, etc.). (2) Determine optimal frequency—research suggests 2-3x weekly sustains benefits better than forced daily practice. Schedule specific days/times. (3) Add variety—plan to rotate methods monthly to prevent habituation. (4) Build in social expression—identify 2 people to text/call weekly with specific appreciation. (5) Set up reminders—phone alerts, visual cues, habit stacking (e.g., gratitude with morning coffee). (6) Plan quarterly reassessment—retake GQ-6 every 3 months to track progress. (7) Create if-then plans for lapses (e.g., 'If I miss a week, then I will restart with just one daily gratitude before bed'). The goal is sustainable practice, not perfection.",
          timeRequired: "35 minutes",
          materials: ["Gratitude System Builder Template", "Practice Preference Assessment", "Social Expression Planning Worksheet", "Habit Integration Guide", "Quarterly Reassessment Protocol"],
          skillLevel: "intermediate",
          outcomes: ["Personalized, sustainable gratitude system", "Prevention of practice burnout through variety", "Long-term maintenance plan with accountability"]
        }
      }
    ]
  }
];
