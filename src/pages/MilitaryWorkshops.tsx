import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Calendar, Clock, Filter, Search, User, ArrowLeft, 
  ChevronDown, Check, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import HomeButton from "@/components/HomeButton";
import { useToast } from "@/hooks/use-toast";

const workshopCategories = [
  "PTSD & Trauma",
  "Mindfulness",
  "Transition",
  "Family Support",
  "Substance Recovery",
  "Depression & Anxiety"
];

const workshops = [
  {
    id: 1,
    title: "Combat Stress Management",
    description: "Learn effective techniques to manage stress related to combat experiences and PTSD symptoms.",
    date: "June 15, 2023",
    time: "2:00 PM - 3:30 PM ET",
    instructor: "Col. James Wilson, Ret.",
    category: "PTSD & Trauma",
    featured: true
  },
  {
    id: 2,
    title: "Mindfulness for Veterans",
    description: "A guided introduction to mindfulness practices specifically adapted for veterans and military personnel.",
    date: "June 18, 2023",
    time: "1:00 PM - 2:00 PM ET",
    instructor: "Dr. Sarah Miller",
    category: "Mindfulness",
    featured: true
  },
  {
    id: 3,
    title: "Transitioning to Civilian Life",
    description: "Navigate the challenges of transitioning from military to civilian life with confidence and purpose.",
    date: "June 22, 2023",
    time: "3:00 PM - 4:30 PM ET",
    instructor: "Maj. Robert Johnson, Ret.",
    category: "Transition",
    featured: true
  },
  {
    id: 4,
    title: "Trauma-Informed Yoga",
    description: "A gentle yoga practice designed for individuals with trauma, focusing on grounding and self-regulation.",
    date: "June 25, 2023",
    time: "11:00 AM - 12:00 PM ET",
    instructor: "Capt. Lisa Thompson, Ret.",
    category: "PTSD & Trauma",
    featured: false
  },
  {
    id: 5,
    title: "Military Families: Communication Skills",
    description: "Strengthen communication within military families, addressing the unique challenges they face.",
    date: "June 28, 2023",
    time: "4:00 PM - 5:30 PM ET",
    instructor: "Dr. Michael Chen",
    category: "Family Support",
    featured: false
  },
  {
    id: 6,
    title: "Veterans Recovery Support Group",
    description: "A supportive environment for veterans dealing with substance use issues related to service.",
    date: "July 2, 2023",
    time: "6:00 PM - 7:30 PM ET",
    instructor: "Sgt. Thomas Brown, Ret.",
    category: "Substance Recovery",
    featured: false
  },
  {
    id: 7,
    title: "Managing Depression After Service",
    description: "Strategies and support for veterans experiencing depression following their military service.",
    date: "July 5, 2023",
    time: "1:00 PM - 2:30 PM ET",
    instructor: "Dr. Amanda Rodriguez",
    category: "Depression & Anxiety",
    featured: false
  },
  {
    id: 8,
    title: "Career Transition Workshop",
    description: "Practical guidance on translating military skills to civilian career opportunities.",
    date: "July 8, 2023",
    time: "10:00 AM - 12:00 PM ET",
    instructor: "Lt. Col. David Park, Ret.",
    category: "Transition",
    featured: false
  }
];

const MilitaryWorkshops = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const filteredWorkshops = workshops.filter(workshop => {
    const matchesSearch = workshop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workshop.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workshop.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategories.length === 0 || 
                           selectedCategories.includes(workshop.category);
    
    return matchesSearch && matchesCategory;
  });
  
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const handleRegisterWorkshop = (workshopId: number, workshopTitle: string) => {
    toast({
      title: "Registration Successful",
      description: `You've been registered for ${workshopTitle}. Check your email for details.`,
      duration: 3000
    });
  };

  const handleRequestWorkshop = () => {
    toast({
      title: "Workshop Request Submitted",
      description: "Thank you for your request. Our team will contact you within 48 hours.",
      duration: 3000
    });
  };

  return (
    <div className="min-h-screen bg-[#0A1929] text-white">
      <div className="bg-gradient-to-r from-[#0A1929] to-[#1A365D] py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <Link to="/military-support" className="inline-flex items-center text-[#B87333] hover:text-[#B87333]/80 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Military Support
            </Link>
            <HomeButton />
          </div>
          
          <h1 className="text-4xl font-bold mb-4">Mental Health Workshops</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Join our specialized workshops designed for military personnel, veterans, and their families. All workshops are led by qualified professionals with military experience.
          </p>
        </div>
      </div>
      
      <div className="bg-[#0F2942] border-y border-white/10 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                className="pl-10 bg-[#1c2e4a] border-white/10 text-white w-full md:w-80"
                placeholder="Search workshops..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-4 items-center w-full md:w-auto justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="bg-[#1c2e4a] border-white/10 text-white">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter by Category
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-[#1c2e4a] border-white/10 text-white">
                  <DropdownMenuLabel>Workshop Categories</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  {workshopCategories.map(category => (
                    <DropdownMenuCheckboxItem
                      key={category}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => toggleCategory(category)}
                    >
                      {category}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              {selectedCategories.length > 0 && (
                <Button 
                  variant="ghost" 
                  className="text-[#B87333] hover:text-[#B87333]/80 hover:bg-white/5"
                  onClick={() => setSelectedCategories([])}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-[#B87333] mb-6 flex items-center">
          <Star className="mr-2 h-5 w-5" />
          Featured Workshops
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredWorkshops.filter(w => w.featured).map(workshop => (
            <WorkshopCard 
              key={workshop.id}
              id={workshop.id}
              title={workshop.title}
              description={workshop.description}
              date={workshop.date}
              time={workshop.time}
              instructor={workshop.instructor}
              category={workshop.category}
              featured={workshop.featured}
              onRegister={() => handleRegisterWorkshop(workshop.id, workshop.title)}
            />
          ))}
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-6">All Upcoming Workshops</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkshops.length > 0 ? (
            filteredWorkshops.map(workshop => (
              <WorkshopCard 
                key={workshop.id}
                id={workshop.id}
                title={workshop.title}
                description={workshop.description}
                date={workshop.date}
                time={workshop.time}
                instructor={workshop.instructor}
                category={workshop.category}
                featured={workshop.featured}
                onRegister={() => handleRegisterWorkshop(workshop.id, workshop.title)}
              />
            ))
          ) : (
            <div className="col-span-3 text-center py-12 bg-[#1c2e4a]/50 rounded-lg border border-white/10">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No Workshops Found</h3>
              <p className="text-gray-400">
                Try adjusting your search or filters to find workshops.
              </p>
              <Button 
                variant="ghost" 
                className="mt-4 text-[#B87333]"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategories([]);
                }}
              >
                Reset All Filters
              </Button>
            </div>
          )}
        </div>
        
        <div className="mt-16 bg-gradient-to-r from-[#B87333]/20 to-transparent p-8 rounded-lg border border-[#B87333]/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Don't See What You Need?</h3>
              <p className="text-gray-300">
                Request a specific workshop topic or theme that would support your mental health journey.
              </p>
            </div>
            
            <Button 
              variant="gold" 
              size="lg"
              onClick={handleRequestWorkshop}
            >
              Request a Workshop
            </Button>
          </div>
        </div>
      </div>
      
      <footer className="bg-[#0F2942] border-t border-white/10 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 mb-4">
            All workshops are confidential and free for military personnel, veterans, and their families.
          </p>
          
          <div className="flex justify-center gap-4">
            <Link 
              to="/military-support" 
              className="text-[#B87333] hover:text-[#B87333]/80 transition-colors"
            >
              Military Support Home
            </Link>
            <Link 
              to="/contact" 
              className="text-[#B87333] hover:text-[#B87333]/80 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

interface WorkshopCardProps {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  instructor: string;
  category: string;
  featured: boolean;
  onRegister: () => void;
}

const WorkshopCard: React.FC<WorkshopCardProps> = ({ 
  id,
  title, 
  description,
  date, 
  time, 
  instructor, 
  category,
  featured,
  onRegister
}) => {
  return (
    <Card className={`
      bg-gradient-to-b from-[#1c2e4a] to-[#0A1929] 
      border ${featured ? 'border-[#B87333]/30' : 'border-white/10'} 
      text-white transition-all duration-300 
      hover:shadow-lg hover:translate-y-[-5px]
      ${featured ? 'shadow-[0_0_10px_rgba(184,115,51,0.2)]' : ''}
    `}>
      <CardHeader className="pb-2">
        <div className="bg-[#B87333]/10 text-[#B87333] text-xs font-medium py-1 px-2 rounded-full w-fit mb-2">
          {category}
        </div>
        <CardTitle className="text-white">{title}</CardTitle>
        <CardDescription className="text-gray-300 mt-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center text-gray-300 text-sm">
            <Calendar className="h-4 w-4 mr-2 text-[#B87333]" />
            <span>{date}</span>
          </div>
          <div className="flex items-center text-gray-300 text-sm">
            <Clock className="h-4 w-4 mr-2 text-[#B87333]" />
            <span>{time}</span>
          </div>
          <div className="flex items-center text-gray-300 text-sm">
            <User className="h-4 w-4 mr-2 text-[#B87333]" />
            <span>{instructor}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant={featured ? "gold" : "bronze"} 
          className="w-full"
          onClick={onRegister}
        >
          Register Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MilitaryWorkshops;
