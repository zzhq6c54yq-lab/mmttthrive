
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import { useToast } from "@/hooks/use-toast";

export interface WorksheetContent {
  title: string;
  content: string[];
  exercises: {
    title: string;
    instructions: string;
    reflection?: string[];
  }[];
}

// Define worksheet content by workshop ID
const worksheetContentMap: Record<string, WorksheetContent> = {
  "mindful-communication": {
    title: "Mindful Communication Worksheet",
    content: [
      "This worksheet will help you practice mindful communication techniques in your daily interactions.",
      "Mindful communication involves being fully present, listening actively, and responding thoughtfully.",
    ],
    exercises: [
      {
        title: "Mindful Listening Exercise",
        instructions: "Next time you're in a conversation, focus entirely on what the other person is saying without planning your response. Notice how this changes your experience.",
        reflection: ["What did you notice about your listening?", "How did the other person respond?"]
      },
      {
        title: "Pause Before Speaking",
        instructions: "Practice taking a breath before responding in conversations today. Note how this small pause affects what you choose to say.",
        reflection: ["Did the quality of your responses change?", "How did it feel to pause?"]
      }
    ]
  },
  "stress-management": {
    title: "Stress Management Techniques Worksheet",
    content: [
      "This worksheet provides practical exercises to help manage stress in daily life.",
      "Regular practice of these techniques can help reduce overall stress levels and improve wellbeing.",
    ],
    exercises: [
      {
        title: "Body Scan Exercise",
        instructions: "Sit or lie down comfortably. Starting from your toes and moving up to your head, notice any tension in each part of your body. Breathe into that tension and allow it to release with each exhale.",
        reflection: ["Where did you notice the most tension?", "How did your body feel after the exercise?"]
      },
      {
        title: "Stress Triggers Inventory",
        instructions: "List your common stress triggers below. For each one, write one practical step you could take to either avoid or better manage that trigger.",
        reflection: ["What patterns do you notice in your stress triggers?", "Which management technique seems most effective?"]
      }
    ]
  },
  "self-compassion": {
    title: "Self-Compassion Practice Worksheet",
    content: [
      "This worksheet guides you through exercises to develop greater self-compassion.",
      "Self-compassion involves treating yourself with the same kindness you would offer a good friend.",
    ],
    exercises: [
      {
        title: "Compassionate Letter to Self",
        instructions: "Write a letter to yourself from the perspective of an unconditionally loving friend who accepts you completely. What would they say about your perceived flaws or struggles?",
        reflection: ["How did it feel to write this letter?", "What insights did you gain?"]
      },
      {
        title: "Self-Compassion Break",
        instructions: "Next time you experience difficulty, try these three steps: 1) Acknowledge suffering ('This is a moment of suffering'), 2) Recognize common humanity ('Suffering is part of life'), 3) Offer kindness to yourself (place your hand on your heart and say 'May I be kind to myself').",
        reflection: ["How did this practice affect your emotional state?", "Did you notice any resistance to self-compassion?"]
      }
    ]
  },
  "better-sleep": {
    title: "Better Sleep Habits Worksheet",
    content: [
      "This worksheet will help you develop healthier sleep habits and improve your sleep quality.",
      "Consistent sleep routines and environment optimization can significantly improve sleep quality.",
    ],
    exercises: [
      {
        title: "Sleep Environment Assessment",
        instructions: "Evaluate your bedroom for light, noise, temperature, and comfort. Rate each on a scale of 1-10 and note one improvement you could make for each factor.",
        reflection: ["Which environmental factor most affects your sleep?", "What simple change could you implement tonight?"]
      },
      {
        title: "Evening Wind-Down Routine",
        instructions: "Design a 30-minute pre-sleep routine that helps signal to your body it's time for sleep. Include activities like dimming lights, avoiding screens, light stretching, or reading.",
        reflection: ["Which activities help you feel most relaxed?", "What time will you begin your wind-down routine?"]
      }
    ]
  },
  "social-connection": {
    title: "Building Social Connections Worksheet",
    content: [
      "This worksheet provides exercises to strengthen your social connections and build meaningful relationships.",
      "Social connection is a fundamental human need and contributes significantly to mental wellbeing.",
    ],
    exercises: [
      {
        title: "Connection Inventory",
        instructions: "List your current social connections and categorize them (close friends, family, acquaintances, colleagues). Identify which areas feel fulfilling and which you might want to develop further.",
        reflection: ["Are there any gaps in your social network?", "Which relationships energize you the most?"]
      },
      {
        title: "Meaningful Interaction Practice",
        instructions: "Choose one person this week with whom to have a more meaningful conversation. Prepare 2-3 open-ended questions that go beyond small talk.",
        reflection: ["How did the conversation differ from your usual interactions?", "What did you learn about the other person or yourself?"]
      }
    ]
  },
  // Default worksheet for any other workshops
  "default": {
    title: "Workshop Reflection Worksheet",
    content: [
      "Use this worksheet to reflect on the key learnings from your workshop.",
      "Regular practice and reflection will help integrate these concepts into your daily life.",
    ],
    exercises: [
      {
        title: "Key Takeaways",
        instructions: "Write down 3-5 key insights or techniques you learned from this workshop that you want to remember.",
        reflection: ["Which idea resonated with you most?", "How might these insights change your approach?"]
      },
      {
        title: "Implementation Plan",
        instructions: "Choose one technique from the workshop to practice this week. Describe when, where, and how you will implement it.",
        reflection: ["What obstacles might arise?", "How will you remind yourself to practice?"]
      }
    ]
  }
};

// Function to generate PDF worksheet based on workshop ID
export const generateWorksheetPDF = (workshopId: string): void => {
  // Get appropriate content or use default
  const content = worksheetContentMap[workshopId] || worksheetContentMap.default;
  
  // Create PDF
  const doc = new jsPDF();
  let yPosition = 20;
  
  // Add title
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text(content.title, 20, yPosition);
  yPosition += 15;
  
  // Add introduction
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  content.content.forEach(paragraph => {
    doc.text(paragraph, 20, yPosition, { maxWidth: 170 });
    yPosition += 10;
  });
  
  yPosition += 10;
  
  // Add exercises
  content.exercises.forEach((exercise, index) => {
    doc.setFont('helvetica', 'bold');
    doc.text(`Exercise ${index + 1}: ${exercise.title}`, 20, yPosition);
    yPosition += 10;
    
    doc.setFont('helvetica', 'normal');
    const splitText = doc.splitTextToSize(exercise.instructions, 170);
    doc.text(splitText, 20, yPosition);
    yPosition += splitText.length * 7;
    
    // Add reflection questions if available
    if (exercise.reflection && exercise.reflection.length) {
      doc.text("Reflection Questions:", 20, yPosition);
      yPosition += 7;
      
      exercise.reflection.forEach(question => {
        doc.text(`• ${question}`, 25, yPosition);
        yPosition += 7;
      });
      
      // Add space for writing
      yPosition += 15;
      doc.setDrawColor(200);
      doc.line(20, yPosition, 190, yPosition);
      yPosition += 10;
      doc.line(20, yPosition, 190, yPosition);
      yPosition += 15;
    }
    
    // Add page if needed
    if (yPosition > 270 && index < content.exercises.length - 1) {
      doc.addPage();
      yPosition = 20;
    } else {
      yPosition += 10;
    }
  });
  
  // Save the PDF
  doc.save(`${content.title.replace(/\s+/g, '-').toLowerCase()}.pdf`);
};

// Function to handle worksheet download with toast notification
export const downloadWorksheet = (workshopId: string, toast?: ReturnType<typeof useToast>) => {
  try {
    generateWorksheetPDF(workshopId);
    
    if (toast) {
      toast({
        title: "Worksheet Downloaded",
        description: "Your worksheet is ready to use",
        duration: 2000,
      });
    }
    
    return true;
  } catch (error) {
    if (toast) {
      toast({
        title: "Download Failed",
        description: "There was an issue downloading your worksheet",
        variant: "destructive",
        duration: 2000,
      });
    }
    console.error("Worksheet download error:", error);
    return false;
  }
};
