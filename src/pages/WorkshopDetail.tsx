
import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Page from "@/components/Page";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  BookOpen,
  Video,
  FileText,
  Download,
  CheckCircle,
  Play,
  Pause,
  Volume,
  Volume2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const WorkshopDetail = () => {
  const { workshopId } = useParams<{ workshopId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [activeTab, setActiveTab] = useState(location?.state?.activeTab || "overview");
  const [progress, setProgress] = useState(0);
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  
  // Get workshop title from location state, or use the ID
  const workshopTitle = location.state?.workshopTitle || workshopId;
  
  // Mock data for workshop details - in a real app, this would come from an API
  const workshopDetails = {
    id: workshopId,
    title: workshopTitle || "Workshop Title",
    description: getWorkshopDescription(workshopId),
    instructor: getWorkshopInstructor(workshopId),
    date: "Tuesdays & Thursdays, 10:00 AM - 11:30 AM ET",
    category: getWorkshopCategory(workshopId),
    sections: getWorkshopSections(workshopId)
  };
  
  // Helper functions to get workshop data based on ID
  function getWorkshopDescription(id: string | undefined): string {
    switch(id) {
      case "mindful-communication":
        return "Learn effective communication techniques rooted in mindfulness principles to improve personal and professional relationships.";
      case "emotional-regulation":
        return "Develop skills to manage difficult emotions and respond rather than react to challenging situations.";
      case "stress-management":
        return "Evidence-based strategies to reduce stress and build resilience in high-pressure environments.";
      default:
        return "A comprehensive workshop to enhance your mental wellbeing and develop practical skills.";
    }
  }
  
  function getWorkshopInstructor(id: string | undefined): string {
    switch(id) {
      case "mindful-communication":
        return "Dr. Sarah Johnson";
      case "emotional-regulation":
        return "Dr. Michael Chen";
      case "stress-management":
        return "Dr. Robert Taylor";
      default:
        return "Dr. Emma Wilson";
    }
  }
  
  function getWorkshopCategory(id: string | undefined): string {
    switch(id) {
      case "mindful-communication":
        return "Communication";
      case "emotional-regulation":
        return "Emotional Intelligence";
      case "stress-management":
        return "Stress Management";
      default:
        return "Mental Wellness";
    }
  }
  
  function getWorkshopSections(id: string | undefined): any[] {
    switch(id) {
      case "mindful-communication":
        return [
          {
            id: "mc-1",
            title: "Foundations of Mindful Communication",
            description: "Understanding the principles of mindfulness in the context of communication.",
            content: "Mindful communication involves bringing full awareness to our interactions. This section explores the core principles of mindfulness—present moment awareness, non-judgment, and intentionality—as they apply to communication. We'll examine how mindless communication habits contribute to misunderstandings, conflict, and relationship strain, while mindful approaches create space for deeper connection and mutual understanding.",
            videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            exercise: "Present Moment Conversation",
            exerciseDescription: "Practice fully present listening and speaking with a partner."
          },
          {
            id: "mc-2",
            title: "Mindful Listening",
            description: "Developing deep listening skills to truly understand others.",
            content: "Most people listen to respond rather than to understand. This section focuses on developing the skill of mindful listening—being fully present with another person without planning your response, judging their words, or becoming distracted. We'll practice techniques for maintaining focus during conversations, noticing internal distractions, and creating the psychological safety that allows others to express themselves honestly.",
            videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            exercise: "Three-Minute Focused Listening",
            exerciseDescription: "Practice full attention listening without interruption or response preparation."
          },
          {
            id: "mc-3",
            title: "Mindful Speaking",
            description: "Communicating with clarity, intention, and compassion.",
            content: "Our words have tremendous power to connect or divide, heal or harm. This section addresses mindful speaking—choosing words intentionally, speaking from authenticity rather than reactivity, and considering the impact of our communication. We'll explore techniques for pausing before speaking, considering our intentions, using \"I\" statements, and expressing difficult truths with both honesty and compassion.",
            videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            exercise: "Intentional Communication Practice",
            exerciseDescription: "Apply mindful speaking principles to expressing a challenging message."
          },
          {
            id: "mc-4",
            title: "Navigating Difficult Conversations",
            description: "Using mindfulness to transform conflict into connection.",
            content: "Difficult conversations are inevitable in relationships, but mindfulness can transform how we approach them. This section provides a framework for mindful conflict navigation—staying present during emotional intensity, noticing physical sensations and emotions without being overwhelmed by them, and maintaining connection even during disagreement. We'll practice techniques specifically designed for high-stakes conversations and emotional triggers.",
            videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            exercise: "Difficult Conversation Simulation",
            exerciseDescription: "Practice mindful approaches to a challenging interaction scenario."
          }
        ];
      case "emotional-regulation":
        return [
          {
            id: "er-1",
            title: "Understanding Emotional Responses",
            description: "Recognizing emotion triggers and patterns in your life.",
            content: "Emotions serve as vital signals about our needs, values, and boundaries, but they can feel overwhelming when we don't understand them. This section explores the neuroscience of emotional responses, distinguishing between primary emotions and secondary reactions, and identifying personal patterns and triggers. You'll learn to recognize emotional activation in its early stages through body awareness, thought patterns, and behavioral cues.",
            videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            exercise: "Emotion Mapping",
            exerciseDescription: "Create a personalized map of your emotional triggers and patterns."
          },
          {
            id: "er-2",
            title: "Self-Regulation Techniques",
            description: "Practical skills for managing emotional intensity.",
            content: "When emotions intensify, effective self-regulation skills become essential. This section introduces evidence-based techniques for managing emotional activation, including grounding exercises, breathing patterns that regulate the nervous system, cognitive reframing approaches, and body-based interventions. The focus is on building a personalized toolkit of strategies that can be applied in different contexts and emotional states.",
            videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            exercise: "Regulation Toolkit Development",
            exerciseDescription: "Create a personalized set of techniques for different emotional intensities."
          },
          {
            id: "er-3",
            title: "Mindfulness and Emotion",
            description: "Using mindfulness to create space between trigger and response.",
            content: "Mindfulness offers a powerful approach to working with difficult emotions by creating space between stimulus and response. This section focuses on applying mindfulness specifically to emotional experiences—developing the capacity to observe emotions without identification, allowing feelings to be present without being overwhelmed by them, and using awareness to make conscious choices rather than reacting automatically.",
            videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            exercise: "Mindful Emotion Practice",
            exerciseDescription: "Learn to observe emotions with curiosity rather than reactivity."
          },
          {
            id: "er-4",
            title: "From Regulation to Resilience",
            description: "Building long-term emotional resilience and flexibility.",
            content: "Beyond immediate emotion regulation, the ultimate goal is developing emotional resilience—the ability to navigate life's ups and downs with flexibility and balance. This section addresses practices for building lasting emotional strength, including self-compassion routines, values clarification, meaning-making approaches, and the development of a growth mindset about emotional challenges.",
            videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            exercise: "Resilience Practice Plan",
            exerciseDescription: "Develop a structured plan for building emotional resilience over time."
          }
        ];
      case "stress-management":
        return [
          {
            id: "sm-1",
            title: "Understanding Your Stress Response",
            description: "The science of stress and how it affects your mind and body.",
            content: "Stress is a biological response designed to help us respond to threats, but chronic activation can be harmful. This section explores the physiology of the stress response, the difference between helpful and harmful forms of stress, and how to recognize your personal stress signals. We'll examine how stress manifests uniquely for each person through physical sensations, thought patterns, emotional experiences, and behavioral changes.",
            videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            exercise: "Personal Stress Inventory",
            exerciseDescription: "Identify your unique stress signals, triggers, and patterns."
          },
          {
            id: "sm-2",
            title: "Immediate Stress Relief Techniques",
            description: "Quick strategies to calm your nervous system in the moment.",
            content: "When stress levels are high, having immediate relief strategies is essential. This section provides evidence-based techniques for quickly reducing stress activation, including specific breathing patterns, physical interventions, cognitive approaches, and sensory grounding exercises. We'll practice methods that work in different contexts—from private moments to public meetings—and can be applied in just a few minutes.",
            videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            exercise: "Rapid Reset Practice",
            exerciseDescription: "Learn and practice quick techniques for immediate stress reduction."
          },
          {
            id: "sm-3",
            title: "Building Daily Resilience",
            description: "Lifestyle factors and daily practices that reduce overall stress.",
            content: "Effective stress management involves not just responding to stress but preventing unnecessary stress accumulation. This section focuses on lifestyle factors that build stress resistance—sleep hygiene, physical activity, nutrition, time in nature, and social connection. We'll develop personalized plans for incorporating these elements into daily life in sustainable ways rather than adding more pressure through unrealistic expectations.",
            videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            exercise: "Resilience Routine Development",
            exerciseDescription: "Create a personalized daily and weekly plan for stress resilience."
          },
          {
            id: "sm-4",
            title: "Mindset and Meaning",
            description: "Psychological approaches to transform your relationship with stress.",
            content: "Our perception of stress significantly impacts its effect on us. This section explores psychological approaches that transform our relationship with stress—including challenge vs. threat mindsets, benefit-finding, meaning-making, and value alignment. We'll examine how these perspectives can convert stressful experiences from purely negative to opportunities for growth, without minimizing genuine difficulties.",
            videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            exercise: "Stress Reappraisal Practice",
            exerciseDescription: "Apply cognitive techniques to shift your perspective on a current stressor."
          }
        ];
      default:
        return [
          {
            id: "default-1",
            title: "Workshop Introduction",
            description: "Overview of the workshop content and objectives.",
            content: "This workshop is designed to provide you with practical tools and knowledge to enhance your mental wellbeing. Throughout the sessions, you'll learn evidence-based techniques, engage in interactive exercises, and develop a personalized plan for ongoing practice.",
            videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            exercise: "Setting Personal Goals",
            exerciseDescription: "Define your specific goals and intentions for this workshop."
          },
          {
            id: "default-2",
            title: "Core Concepts",
            description: "Essential principles and foundational knowledge.",
            content: "This section introduces the fundamental concepts that underpin the workshop. You'll gain an understanding of the scientific background, theoretical framework, and evidence supporting the approaches we'll be exploring throughout the program.",
            videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            exercise: "Concept Application",
            exerciseDescription: "Explore how these core concepts relate to your personal experience."
          },
          {
            id: "default-3",
            title: "Practical Techniques",
            description: "Hands-on skills and methods you can apply immediately.",
            content: "In this section, we focus on practical techniques that you can begin using right away. These evidence-based approaches have been selected for their effectiveness and accessibility, allowing you to experience benefits even with minimal practice.",
            videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            exercise: "Technique Practice",
            exerciseDescription: "Guided practice of key techniques with feedback and refinement."
          },
          {
            id: "default-4",
            title: "Integration and Ongoing Practice",
            description: "Strategies for incorporating learning into daily life.",
            content: "The true value of any workshop comes from how well you integrate the learning into your everyday life. This section provides frameworks for ongoing practice, strategies for overcoming common obstacles, and approaches for maintaining motivation over time.",
            videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            exercise: "Personal Practice Plan",
            exerciseDescription: "Develop a structured plan for continuing practice after the workshop."
          }
        ];
    }
  }
  
  // Load progress from localStorage if available
  useEffect(() => {
    const savedProgress = localStorage.getItem(`workshop-${workshopId}`);
    if (savedProgress) {
      const data = JSON.parse(savedProgress);
      setProgress(data.progress);
      setCompletedSections(data.completedSections);
    }
  }, [workshopId]);
  
  // Handle marking a section as complete
  const handleSectionComplete = (sectionId: string) => {
    let newCompletedSections = [...completedSections];
    
    if (!completedSections.includes(sectionId)) {
      newCompletedSections.push(sectionId);
      setCompletedSections(newCompletedSections);
    }
    
    // Calculate new progress percentage
    const totalSections = workshopDetails.sections.length;
    const newProgress = Math.floor((newCompletedSections.length / totalSections) * 100);
    setProgress(newProgress);
    
    // Save progress to localStorage
    localStorage.setItem(
      `workshop-${workshopId}`,
      JSON.stringify({
        progress: newProgress,
        completedSections: newCompletedSections
      })
    );
    
    toast({
      title: "Section Completed",
      description: "Your progress has been saved.",
    });
  };
  
  // Handle downloading resources
  const handleDownload = (resourceName: string) => {
    toast({
      title: "Downloading Resource",
      description: `Your ${resourceName} is being downloaded.`,
      duration: 2000
    });
  };
  
  // Toggle video playback
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  // Toggle video sound
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  return (
    <Page 
      title={workshopDetails.title} 
      showBackButton={true}
      onBackClick={() => navigate("/workshops")}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-400">{workshopDetails.description}</p>
          </div>
          <div className="flex items-center">
            <Badge className="mr-2 bg-[#242432] text-[#E5C5A1] border border-[#B87333]/30">{workshopDetails.category}</Badge>
            <div className="flex flex-col items-end">
              <div className="flex items-center mb-1">
                <span className="text-sm text-gray-400 mr-2">{progress}% Complete</span>
                <Progress value={progress} className="w-24 h-2" />
              </div>
            </div>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="w-full justify-start bg-[#1a1a1f]/50 border border-white/10 overflow-x-auto">
            <TabsTrigger value="overview" className="text-base data-[state=active]:bg-[#B87333] data-[state=active]:text-white">Overview</TabsTrigger>
            <TabsTrigger value="content" className="text-base data-[state=active]:bg-[#B87333] data-[state=active]:text-white">Workshop Content</TabsTrigger>
            <TabsTrigger value="resources" className="text-base data-[state=active]:bg-[#B87333] data-[state=active]:text-white">Resources</TabsTrigger>
            <TabsTrigger value="exercises" className="text-base data-[state=active]:bg-[#B87333] data-[state=active]:text-white">Exercises</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">About This Workshop</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-300">
                      {workshopDetails.description} This workshop combines evidence-based techniques with practical applications, giving you tools you can immediately incorporate into your daily life. Through interactive exercises, discussion, and personalized planning, you'll develop skills that support long-term mental wellbeing.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="flex items-start">
                        <div className="h-8 w-8 rounded-full bg-[#B87333]/20 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                          <User className="h-4 w-4 text-[#E5C5A1]" />
                        </div>
                        <div>
                          <h3 className="font-medium text-white">Instructor</h3>
                          <p className="text-sm text-gray-300">{workshopDetails.instructor}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="h-8 w-8 rounded-full bg-[#B87333]/20 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                          <Calendar className="h-4 w-4 text-[#E5C5A1]" />
                        </div>
                        <div>
                          <h3 className="font-medium text-white">Schedule</h3>
                          <p className="text-sm text-gray-300">{workshopDetails.date}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="h-8 w-8 rounded-full bg-[#B87333]/20 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                          <Clock className="h-4 w-4 text-[#E5C5A1]" />
                        </div>
                        <div>
                          <h3 className="font-medium text-white">Duration</h3>
                          <p className="text-sm text-gray-300">4 Weeks, 90 Minutes/Session</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">What You'll Learn</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {workshopDetails.sections.map((section, index) => (
                        <div 
                          key={section.id} 
                          className={`p-4 rounded-lg ${
                            completedSections.includes(section.id) 
                              ? 'border border-[#E5C5A1]/30 bg-[#B87333]/10' 
                              : 'border border-white/10 bg-white/5'
                          }`}
                        >
                          <div className="flex items-center">
                            <div className="bg-[#B87333]/20 text-[#E5C5A1] h-8 w-8 rounded-full flex items-center justify-center mr-3">
                              {index + 1}
                            </div>
                            <h3 className="font-medium text-lg text-white">{section.title}</h3>
                            {completedSections.includes(section.id) && (
                              <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                            )}
                          </div>
                          <p className="text-gray-300 mt-2 ml-11">{section.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Workshop Materials</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 bg-white/5 rounded-lg flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-[#E5C5A1] mr-3" />
                        <div>
                          <div className="font-medium text-white">Workshop Handbook</div>
                          <div className="text-sm text-gray-400">PDF, 3.2MB</div>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-[#E5C5A1] border-[#B87333]/50 hover:bg-[#B87333]/20"
                        onClick={() => handleDownload("Workshop Handbook")}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                    
                    <div className="p-3 bg-white/5 rounded-lg flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-[#E5C5A1] mr-3" />
                        <div>
                          <div className="font-medium text-white">Practice Worksheets</div>
                          <div className="text-sm text-gray-400">PDF, 1.8MB</div>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-[#E5C5A1] border-[#B87333]/50 hover:bg-[#B87333]/20"
                        onClick={() => handleDownload("Practice Worksheets")}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">About Your Instructor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-full bg-[#B87333]/20 flex items-center justify-center text-[#E5C5A1] font-bold text-xl">
                        {workshopDetails.instructor.split(' ').map(name => name[0]).join('')}
                      </div>
                      <div>
                        <h3 className="font-bold text-white">{workshopDetails.instructor}</h3>
                        <p className="text-gray-300 text-sm mt-1">
                          {workshopDetails.instructor} is a certified mental health professional with over 15 years of experience in clinical and educational settings. They specialize in evidence-based approaches to mental wellness and have helped thousands of individuals develop practical skills for improved wellbeing.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Button
                  className="w-full bg-[#B87333] hover:bg-[#a66a2e] text-white"
                  onClick={() => setActiveTab("content")}
                >
                  Start Workshop
                </Button>
              </div>
            </div>
          </TabsContent>
          
          {/* Content Tab */}
          <TabsContent value="content" className="animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-6">
                  <video 
                    className="w-full h-full object-cover"
                    poster="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                    muted={isMuted}
                    autoPlay={isPlaying}
                    loop
                  >
                    <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white border-white/20"
                      onClick={togglePlayPause}
                    >
                      {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                      {isPlaying ? "Pause" : "Play"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white border-white/20"
                      onClick={toggleMute}
                    >
                      {isMuted ? <Volume className="h-4 w-4 mr-2" /> : <Volume2 className="h-4 w-4 mr-2" />}
                      {isMuted ? "Unmute" : "Mute"}
                    </Button>
                  </div>
                </div>
                
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Workshop Content</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {workshopDetails.sections.map((section) => (
                      <div key={section.id} className="space-y-4">
                        <h3 className="text-xl font-semibold text-[#E5C5A1]">{section.title}</h3>
                        <p className="text-gray-300">{section.content}</p>
                        
                        <div className="flex justify-end">
                          <Button
                            variant={completedSections.includes(section.id) ? "default" : "outline"}
                            size="sm"
                            className={completedSections.includes(section.id) 
                              ? "bg-green-600 hover:bg-green-700"
                              : "border-[#B87333]/50 text-[#E5C5A1] hover:bg-[#B87333]/20"
                            }
                            onClick={() => handleSectionComplete(section.id)}
                          >
                            {completedSections.includes(section.id) ? (
                              <>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Completed
                              </>
                            ) : (
                              "Mark as Complete"
                            )}
                          </Button>
                        </div>
                        
                        {section.id !== workshopDetails.sections[workshopDetails.sections.length - 1].id && (
                          <hr className="border-white/10 my-4" />
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Your Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300">{progress}% Complete</span>
                        <span className="text-sm text-gray-400">
                          {completedSections.length}/{workshopDetails.sections.length} sections
                        </span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      {workshopDetails.sections.map((section, index) => (
                        <div 
                          key={section.id} 
                          className={`p-2 rounded-lg flex items-center justify-between ${
                            completedSections.includes(section.id)
                              ? 'bg-[#B87333]/10' 
                              : 'bg-white/5'
                          }`}
                        >
                          <div className="flex items-center">
                            <div className={`h-6 w-6 rounded-full flex items-center justify-center mr-2 text-xs ${
                              completedSections.includes(section.id)
                                ? 'bg-green-500/20 text-green-500' 
                                : 'bg-white/10 text-gray-400'
                            }`}>
                              {index + 1}
                            </div>
                            <span className={`text-sm ${
                              completedSections.includes(section.id) 
                                ? 'text-white' 
                                : 'text-gray-400'
                            }`}>
                              {section.title}
                            </span>
                          </div>
                          {completedSections.includes(section.id) && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Resources</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-left border-white/10 text-gray-300 hover:bg-white/10"
                      onClick={() => setActiveTab("resources")}
                    >
                      <FileText className="h-4 w-4 mr-2 text-[#E5C5A1]" />
                      Workshop Handbook
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-left border-white/10 text-gray-300 hover:bg-white/10"
                      onClick={() => setActiveTab("resources")}
                    >
                      <FileText className="h-4 w-4 mr-2 text-[#E5C5A1]" />
                      Practice Worksheets
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-left border-white/10 text-gray-300 hover:bg-white/10"
                      onClick={() => setActiveTab("exercises")}
                    >
                      <BookOpen className="h-4 w-4 mr-2 text-[#E5C5A1]" />
                      Exercises & Activities
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Resources Tab */}
          <TabsContent value="resources" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Workshop Materials</CardTitle>
                  <CardDescription className="text-gray-400">
                    Download and access all materials needed for this workshop
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-white/5 rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-[#E5C5A1] mr-3" />
                      <div>
                        <div className="font-medium text-white">Workshop Handbook</div>
                        <div className="text-sm text-gray-400">PDF, 3.2MB</div>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-[#E5C5A1] border-[#B87333]/50 hover:bg-[#B87333]/20"
                      onClick={() => handleDownload("Workshop Handbook")}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                  
                  <div className="p-3 bg-white/5 rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-[#E5C5A1] mr-3" />
                      <div>
                        <div className="font-medium text-white">Practice Worksheets</div>
                        <div className="text-sm text-gray-400">PDF, 1.8MB</div>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-[#E5C5A1] border-[#B87333]/50 hover:bg-[#B87333]/20"
                      onClick={() => handleDownload("Practice Worksheets")}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                  
                  <div className="p-3 bg-white/5 rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-[#E5C5A1] mr-3" />
                      <div>
                        <div className="font-medium text-white">Recommended Reading List</div>
                        <div className="text-sm text-gray-400">PDF, 0.5MB</div>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-[#E5C5A1] border-[#B87333]/50 hover:bg-[#B87333]/20"
                      onClick={() => handleDownload("Recommended Reading List")}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Additional Resources</CardTitle>
                  <CardDescription className="text-gray-400">
                    Further reading and materials to supplement your learning
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-white/5 rounded-lg">
                      <h3 className="font-medium text-white mb-1">Books & Articles</h3>
                      <ul className="space-y-3 text-sm text-gray-300">
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-[#B87333]/20 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0 text-xs text-[#E5C5A1]">1</div>
                          <span>"The Science of Well-Being" by Dr. Laurie Santos (Yale University Press, 2023)</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-[#B87333]/20 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0 text-xs text-[#E5C5A1]">2</div>
                          <span>"Resilience: The Science of Mastering Life's Greatest Challenges" by Steven M. Southwick and Dennis S. Charney</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-[#B87333]/20 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0 text-xs text-[#E5C5A1]">3</div>
                          <span>"The Body Keeps the Score" by Bessel van der Kolk, M.D.</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="p-3 bg-white/5 rounded-lg">
                      <h3 className="font-medium text-white mb-1">Online Resources</h3>
                      <ul className="space-y-3 text-sm text-gray-300">
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-[#B87333]/20 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0 text-xs text-[#E5C5A1]">•</div>
                          <span>Greater Good Science Center (Berkeley) - Research-based practices for a meaningful life</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-[#B87333]/20 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0 text-xs text-[#E5C5A1]">•</div>
                          <span>Mental Health Foundation - Evidence-based mental health resources</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-[#B87333]/20 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0 text-xs text-[#E5C5A1]">•</div>
                          <span>Ten Percent Happier - Guided meditations and practical teachings</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Exercises Tab */}
          <TabsContent value="exercises" className="animate-fade-in">
            <div className="space-y-6">
              {workshopDetails.sections.map((section) => (
                <Card key={section.id} className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">{section.exercise}</CardTitle>
                    <CardDescription className="text-gray-400">
                      {section.exerciseDescription}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-white/5 p-4 rounded-lg">
                      <p className="text-gray-300 mb-6">
                        This exercise is designed to reinforce the concepts covered in the "{section.title}" section of this workshop. Take your time to complete it thoughtfully, and remember that practice is essential for developing these skills.
                      </p>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-[#E5C5A1] font-medium mb-2">Instructions</h4>
                          <p className="text-gray-300 text-sm">
                            1. Find a quiet space where you can focus without interruptions.<br />
                            2. Set aside 15-20 minutes to complete this exercise.<br />
                            3. Follow the steps outlined below, taking time to reflect on each part.<br />
                            4. When finished, take a few minutes to note what you learned.
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="text-[#E5C5A1] font-medium mb-2">Exercise Steps</h4>
                          <div className="bg-[#B87333]/10 p-4 rounded-lg border border-[#B87333]/20">
                            <p className="text-gray-300 text-sm">
                              The detailed steps for this exercise are included in your workshop handbook. Refer to pages 12-15 for complete instructions, worksheets, and reflection questions.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end border-t border-white/10 pt-4">
                    <Button 
                      className="bg-[#B87333] hover:bg-[#a66a2e] text-white"
                      onClick={() => handleSectionComplete(section.id)}
                    >
                      {completedSections.includes(section.id) ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Exercise Completed
                        </>
                      ) : (
                        "Mark Exercise as Complete"
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Page>
  );
};

export default WorkshopDetail;
