import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Calendar, 
  Clock, 
  Users, 
  Bell, 
  ArrowLeft,
  Video,
  BellRing,
  Coffee,
  Bot
} from "lucide-react";
import { format, addDays } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { generateTodayClasses, VirtualClass } from "@/data/toolCategories";
import { useToast } from "@/hooks/use-toast";
import HomeButton from "@/components/HomeButton";

const VirtualClasses = () => {
  const [classes, setClasses] = useState<VirtualClass[]>([]);
  const [selectedDay, setSelectedDay] = useState("today");
  const [selectedClass, setSelectedClass] = useState<VirtualClass | null>(null);
  const [reminderDialogOpen, setReminderDialogOpen] = useState(false);
  const [reminderSet, setReminderSet] = useState<Set<string>>(new Set());
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Generate today's schedule
    const todayClasses = generateTodayClasses();
    setClasses(todayClasses);
  }, []);

  const navigateToMainMenu = () => {
    navigate("/", { state: { skipToMain: true } });
  };

  const getTypeColor = (type: VirtualClass['type']): string => {
    switch (type) {
      case 'mental_health':
        return "bg-blue-100 text-blue-800";
      case 'meditation':
        return "bg-purple-100 text-purple-800";
      case 'aa_meeting':
        return "bg-amber-100 text-amber-800";
      case 'na_meeting':
        return "bg-emerald-100 text-emerald-800";
      case 'workshop':
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeLabel = (type: VirtualClass['type']): string => {
    switch (type) {
      case 'mental_health':
        return "Mental Health";
      case 'meditation':
        return "Meditation";
      case 'aa_meeting':
        return "AA Meeting";
      case 'na_meeting':
        return "NA Meeting";
      case 'workshop':
        return "Workshop";
      default:
        return type;
    }
  };

  const openClassDetails = (classItem: VirtualClass) => {
    setSelectedClass(classItem);
  };

  const openReminderDialog = (classItem: VirtualClass, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedClass(classItem);
    setReminderDialogOpen(true);
  };

  const setReminder = (minutes: number) => {
    if (!selectedClass) return;
    
    const classTime = new Date(selectedClass.startTime);
    const reminderTime = new Date(classTime.getTime() - minutes * 60000);
    const now = new Date();
    
    // Check if reminder time has already passed
    if (reminderTime < now) {
      toast({
        title: "Cannot set reminder",
        description: "This time has already passed. Please select a future class.",
        variant: "destructive",
      });
      return;
    }
    
    // Use the browser's notification API
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          const timeDiff = reminderTime.getTime() - now.getTime();
          
          // Set timeout for the notification
          setTimeout(() => {
            new Notification(`Class Starting Soon: ${selectedClass.title}`, {
              body: `Your class begins in ${minutes} minutes. Get ready to join!`,
              icon: '/favicon.ico'
            });
          }, timeDiff);
          
          // Add to set of reminders
          setReminderSet(prev => new Set(prev).add(selectedClass.id));
          
          toast({
            title: "Reminder Set",
            description: `You'll be notified ${minutes} minutes before "${selectedClass.title}"`,
          });
        } else {
          toast({
            title: "Permission Denied",
            description: "Please enable notifications in your browser settings.",
            variant: "destructive",
          });
        }
      });
    } else {
      toast({
        title: "Notifications Not Supported",
        description: "Your browser doesn't support notifications.",
        variant: "destructive",
      });
    }
    
    setReminderDialogOpen(false);
  };

  const filteredClasses = classes.filter(classItem => {
    const classDate = new Date(classItem.startTime);
    const today = new Date();
    
    if (selectedDay === "today") {
      return classDate.getDate() === today.getDate() && 
             classDate.getMonth() === today.getMonth() && 
             classDate.getFullYear() === today.getFullYear();
    } else {
      const tomorrow = addDays(today, 1);
      return classDate.getDate() === tomorrow.getDate() && 
             classDate.getMonth() === tomorrow.getMonth() && 
             classDate.getFullYear() === tomorrow.getFullYear();
    }
  }).sort((a, b) => a.startTime.getTime() - b.startTime.getTime());

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-4 h-8 w-8 text-white"
            onClick={navigateToMainMenu}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold">
            <Video className="inline-block mr-2 h-8 w-8 text-[#B87333]" />
            Virtual Classes & Meetings
          </h1>
        </div>
        
        <p className="text-lg mb-8 max-w-3xl text-gray-300">
          Join live sessions facilitated by H.E.N.R.Y. on various mental wellness topics, including
          guided meditation, coping skills workshops, and AA/NA recovery meetings.
        </p>
        
        <div className="mb-6 bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <h2 className="text-xl font-semibold text-white mb-3 flex items-center">
            <Bot className="h-5 w-5 mr-2 text-[#B87333]" />
            Henry's Mental Health Wisdom
          </h2>
          <p className="text-gray-300 mb-3">
            "Attending group sessions can significantly enhance your mental wellness journey. 
            Connect with others who understand your experiences, share perspectives, and build a 
            community of support on your path to recovery."
          </p>
          <p className="text-sm text-gray-400 italic">
            Set reminders for classes you'd like to attend and join them directly from this page.
          </p>
        </div>

        <Tabs defaultValue="today" className="mb-8" onValueChange={setSelectedDay}>
          <TabsList className="bg-slate-800 border border-slate-700">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
          </TabsList>
          
          <TabsContent value="today" className="mt-6">
            <h2 className="text-xl font-medium mb-4 flex items-center">
              <Calendar className="inline-block mr-2 h-5 w-5 text-[#B87333]" />
              {format(new Date(), "EEEE, MMMM d")}
            </h2>
            
            {filteredClasses.length === 0 ? (
              <Card className="p-8 text-center bg-slate-800 border-slate-700">
                <Coffee className="mx-auto h-12 w-12 text-slate-500 mb-4" />
                <p className="text-slate-400">No more classes scheduled for today. Check tomorrow's schedule!</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredClasses.map((classItem) => (
                  <Card 
                    key={classItem.id} 
                    className="bg-slate-800 border-slate-700 overflow-hidden hover:border-[#B87333]/50 transition-colors cursor-pointer"
                    onClick={() => openClassDetails(classItem)}
                  >
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <Badge className={getTypeColor(classItem.type)}>
                          {getTypeLabel(classItem.type)}
                        </Badge>
                        {reminderSet.has(classItem.id) ? (
                          <BellRing className="h-5 w-5 text-[#B87333]" />
                        ) : (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-slate-400 hover:text-[#B87333]"
                            onClick={(e) => openReminderDialog(classItem, e)}
                          >
                            <Bell className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      
                      <h3 className="text-lg font-medium mb-1">{classItem.title}</h3>
                      
                      <div className="flex items-center text-sm text-slate-400 mb-2">
                        <Clock className="h-4 w-4 mr-1" />
                        {format(classItem.startTime, "h:mm a")} - {classItem.duration} mins
                      </div>
                      
                      <div className="flex items-center text-sm text-slate-400 mb-3">
                        <Users className="h-4 w-4 mr-1" />
                        {classItem.attendees}/{classItem.capacity} participants
                      </div>
                      
                      <div className="flex items-center mt-4">
                        <Avatar className="h-8 w-8 mr-2 ring-2 ring-[#B87333] bg-[#B87333]/20">
                          <AvatarFallback className="bg-[#B87333]/20 text-[#B87333]">H</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-slate-300">Facilitated by {classItem.facilitator}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="tomorrow" className="mt-6">
            <h2 className="text-xl font-medium mb-4 flex items-center">
              <Calendar className="inline-block mr-2 h-5 w-5 text-[#B87333]" />
              {format(addDays(new Date(), 1), "EEEE, MMMM d")}
            </h2>
            
            <Card className="p-8 text-center bg-slate-800 border-slate-700">
              <Coffee className="mx-auto h-12 w-12 text-slate-500 mb-4" />
              <p className="text-slate-400">Tomorrow's schedule will be available soon!</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Class details dialog */}
      <Dialog open={!!selectedClass && !reminderDialogOpen} onOpenChange={(open) => !open && setSelectedClass(null)}>
        {selectedClass && (
          <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md">
            <DialogTitle className="text-xl font-semibold">
              {selectedClass.title}
            </DialogTitle>
            
            <Badge className={`${getTypeColor(selectedClass.type)} mb-4`}>
              {getTypeLabel(selectedClass.type)}
            </Badge>
            
            <DialogDescription className="text-slate-300">
              {selectedClass.description}
            </DialogDescription>
            
            <div className="space-y-3 mt-4">
              <div className="flex items-center text-white">
                <Clock className="h-5 w-5 mr-2 text-[#B87333]" />
                <div>
                  <p className="font-medium">{format(selectedClass.startTime, "EEEE, MMMM d")}</p>
                  <p className="text-sm text-slate-300">
                    {format(selectedClass.startTime, "h:mm a")} - {format(new Date(selectedClass.startTime.getTime() + selectedClass.duration * 60000), "h:mm a")}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center text-white">
                <Users className="h-5 w-5 mr-2 text-[#B87333]" />
                <div>
                  <p className="font-medium">Participants</p>
                  <p className="text-sm text-slate-300">
                    {selectedClass.attendees} attending (max capacity: {selectedClass.capacity})
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <Button 
                className="flex-1" 
                variant={reminderSet.has(selectedClass.id) ? "outline_copper" : "copper"}
                onClick={() => {
                  if (!reminderSet.has(selectedClass.id)) {
                    setReminderDialogOpen(true);
                  } else {
                    toast({
                      title: "Reminder Already Set",
                      description: "You already have a reminder for this class."
                    });
                  }
                }}
              >
                {reminderSet.has(selectedClass.id) ? (
                  <>
                    <BellRing className="mr-2 h-4 w-4" />
                    Reminder Set
                  </>
                ) : (
                  <>
                    <Bell className="mr-2 h-4 w-4" />
                    Set Reminder
                  </>
                )}
              </Button>
              
              <DialogClose asChild>
                <Button variant="outline" className="flex-1">Close</Button>
              </DialogClose>
            </div>
          </DialogContent>
        )}
      </Dialog>
      
      {/* Reminder dialog */}
      <Dialog open={reminderDialogOpen} onOpenChange={setReminderDialogOpen}>
        {selectedClass && (
          <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-xs">
            <DialogTitle className="text-center">Set Reminder</DialogTitle>
            <DialogDescription className="text-center text-slate-300">
              When would you like to be reminded?
            </DialogDescription>
            
            <div className="flex flex-col gap-3 mt-4">
              <Button variant="outline_copper" onClick={() => setReminder(5)}>
                5 minutes before
              </Button>
              <Button variant="outline_copper" onClick={() => setReminder(15)}>
                15 minutes before
              </Button>
              <Button variant="outline_copper" onClick={() => setReminder(30)}>
                30 minutes before
              </Button>
              <Button variant="outline_copper" onClick={() => setReminder(60)}>
                1 hour before
              </Button>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default VirtualClasses;
