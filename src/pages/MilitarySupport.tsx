
import React from "react";
import { Link } from "react-router-dom";
import { 
  Shield, Award, Users, BookOpen, Heart, Phone, 
  Calendar, MessageSquare, Flag, Mail, Clock, User
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
import { useToast } from "@/hooks/use-toast";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";

const MilitarySupport = () => {
  const { toast } = useToast();
  
  const handleCrisisHotline = () => {
    toast({
      title: "Veterans Crisis Line",
      description: "Connecting to 988 (then press 1) or texting 838255",
    });
  };

  return (
    <div className="min-h-screen bg-[#0A1929] text-white">
      {/* Hero Section with Military Theme */}
      <div className="relative bg-gradient-to-r from-[#0A1929] to-[#1A365D] py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><rect width=%225%22 height=%225%22 fill=%22%23FFFFFF%22 fill-opacity=%220.03%22/></svg>')] opacity-10"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <Flag className="h-6 w-6 text-[#B87333]" />
                <div className="font-mono text-sm tracking-widest text-[#B87333]">THRIVE MT</div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight border-l-4 border-[#B87333] pl-4">
                Supporting Our Heroes: <span className="block text-[#B87333]">Your Mental Health Matters</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 font-light">
                Dedicated mental health resources for active military personnel, veterans, and their families. Your service matters, and so does your wellbeing.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  variant="gold" 
                  size="lg"
                  className="font-semibold"
                  onClick={handleCrisisHotline}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Veterans Crisis Line
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="text-white border-white/20 hover:bg-white/10"
                  asChild
                >
                  <Link to="/military-workshops">
                    <Calendar className="mr-2 h-4 w-4" />
                    View Workshops
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="bg-gradient-to-b from-[#1c2e4a] to-[#0A1929] p-1 rounded-lg shadow-xl border border-white/10 w-full max-w-sm">
              <Card className="bg-[#1c2e4a]/50 backdrop-blur-sm border-none text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-[#B87333]">
                    <Shield className="h-5 w-5" />
                    Quick Support Access
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Access key resources and support
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10" asChild>
                    <Link to="/military-resources">
                      <BookOpen className="mr-2 h-4 w-4 text-[#B87333]" />
                      Mental Health Resources
                    </Link>
                  </Button>
                  
                  <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10" asChild>
                    <Link to="/military-affirmations">
                      <Heart className="mr-2 h-4 w-4 text-[#B87333]" />
                      Daily Affirmations
                    </Link>
                  </Button>
                  
                  <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10" asChild>
                    <Link to="/military-blog">
                      <MessageSquare className="mr-2 h-4 w-4 text-[#B87333]" />
                      Inspirational Stories
                    </Link>
                  </Button>
                  
                  <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10" asChild>
                    <Link to="/community-support">
                      <Users className="mr-2 h-4 w-4 text-[#B87333]" />
                      Peer Support Community
                    </Link>
                  </Button>
                </CardContent>
                <CardFooter>
                  <Button variant="bronze" className="w-full" asChild>
                    <Link to="/contact">
                      Contact Support Team
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation Menu */}
      <div className="bg-[#0F2942] border-y border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <NavigationMenu className="mx-auto">
            <NavigationMenuList className="px-2">
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className="text-white/90 hover:text-white flex items-center px-4 py-2 text-sm font-medium"
                  asChild
                >
                  <Link to="/military-support">
                    <Shield className="mr-2 h-4 w-4" />
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className="text-white/90 hover:text-white flex items-center px-4 py-2 text-sm font-medium"
                  asChild
                >
                  <Link to="/military-workshops">
                    <Calendar className="mr-2 h-4 w-4" />
                    Workshops
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className="text-white/90 hover:text-white flex items-center px-4 py-2 text-sm font-medium"
                  asChild
                >
                  <Link to="/military-resources">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Resources
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className="text-white/90 hover:text-white flex items-center px-4 py-2 text-sm font-medium"
                  asChild
                >
                  <Link to="/military-affirmations">
                    <Heart className="mr-2 h-4 w-4" />
                    Affirmations
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className="text-white/90 hover:text-white flex items-center px-4 py-2 text-sm font-medium"
                  asChild
                >
                  <Link to="/military-blog">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Blog
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className="text-white/90 hover:text-white flex items-center px-4 py-2 text-sm font-medium"
                  asChild
                >
                  <Link to="/contact">
                    <Phone className="mr-2 h-4 w-4" />
                    Contact
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      
      {/* Main Content Sections */}
      <div className="container mx-auto px-4 py-16">
        {/* Featured Sections */}
        <h2 className="text-3xl font-bold text-[#B87333] mb-8 border-b border-[#B87333]/20 pb-2">
          Featured Support Programs
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="bg-gradient-to-b from-[#1c2e4a] to-[#0A1929] border border-white/10 text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(184,115,51,0.3)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#B87333]">
                <Award className="h-5 w-5" />
                PTSD Support Program
              </CardTitle>
              <CardDescription className="text-gray-300">
                Specialized support for trauma and PTSD
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <div className="bg-[#B87333]/10 p-1 rounded-full mt-0.5">
                    <div className="h-1.5 w-1.5 bg-[#B87333] rounded-full"></div>
                  </div>
                  <span>Customized therapy sessions with military-experienced counselors</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-[#B87333]/10 p-1 rounded-full mt-0.5">
                    <div className="h-1.5 w-1.5 bg-[#B87333] rounded-full"></div>
                  </div>
                  <span>Group therapy with fellow veterans who understand your experiences</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-[#B87333]/10 p-1 rounded-full mt-0.5">
                    <div className="h-1.5 w-1.5 bg-[#B87333] rounded-full"></div>
                  </div>
                  <span>Evidence-based treatments including CPT and EMDR</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="gold-outline" className="w-full">
                Learn More
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="bg-gradient-to-b from-[#1c2e4a] to-[#0A1929] border border-white/10 text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(184,115,51,0.3)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#B87333]">
                <Users className="h-5 w-5" />
                Transition Assistance
              </CardTitle>
              <CardDescription className="text-gray-300">
                Support for military to civilian transition
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <div className="bg-[#B87333]/10 p-1 rounded-full mt-0.5">
                    <div className="h-1.5 w-1.5 bg-[#B87333] rounded-full"></div>
                  </div>
                  <span>Career counseling and professional development resources</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-[#B87333]/10 p-1 rounded-full mt-0.5">
                    <div className="h-1.5 w-1.5 bg-[#B87333] rounded-full"></div>
                  </div>
                  <span>Identity and purpose workshops specifically for veterans</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-[#B87333]/10 p-1 rounded-full mt-0.5">
                    <div className="h-1.5 w-1.5 bg-[#B87333] rounded-full"></div>
                  </div>
                  <span>Financial planning and benefits navigation assistance</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="gold-outline" className="w-full">
                Learn More
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="bg-gradient-to-b from-[#1c2e4a] to-[#0A1929] border border-white/10 text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(184,115,51,0.3)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#B87333]">
                <Heart className="h-5 w-5" />
                Family Support Services
              </CardTitle>
              <CardDescription className="text-gray-300">
                Resources for military families
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <div className="bg-[#B87333]/10 p-1 rounded-full mt-0.5">
                    <div className="h-1.5 w-1.5 bg-[#B87333] rounded-full"></div>
                  </div>
                  <span>Support groups for spouses and children of service members</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-[#B87333]/10 p-1 rounded-full mt-0.5">
                    <div className="h-1.5 w-1.5 bg-[#B87333] rounded-full"></div>
                  </div>
                  <span>Counseling services for families dealing with deployment</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-[#B87333]/10 p-1 rounded-full mt-0.5">
                    <div className="h-1.5 w-1.5 bg-[#B87333] rounded-full"></div>
                  </div>
                  <span>Resources for strengthening relationships and communication</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="gold-outline" className="w-full">
                Learn More
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Upcoming Workshops */}
        <h2 className="text-3xl font-bold text-[#B87333] mb-8 border-b border-[#B87333]/20 pb-2">
          Upcoming Workshops
        </h2>
        
        <div className="mb-16">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="bg-[#1c2e4a] mb-8">
              <TabsTrigger value="all" className="text-white data-[state=active]:bg-[#B87333]">All Workshops</TabsTrigger>
              <TabsTrigger value="ptsd" className="text-white data-[state=active]:bg-[#B87333]">PTSD & Trauma</TabsTrigger>
              <TabsTrigger value="mindfulness" className="text-white data-[state=active]:bg-[#B87333]">Mindfulness</TabsTrigger>
              <TabsTrigger value="transition" className="text-white data-[state=active]:bg-[#B87333]">Transition</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Workshop Cards (3) */}
                <WorkshopCard 
                  title="Combat Stress Management"
                  date="June 15, 2023"
                  time="2:00 PM - 3:30 PM ET"
                  instructor="Col. James Wilson, Ret."
                  category="PTSD & Trauma"
                />
                
                <WorkshopCard 
                  title="Mindfulness for Veterans"
                  date="June 18, 2023"
                  time="1:00 PM - 2:00 PM ET"
                  instructor="Dr. Sarah Miller"
                  category="Mindfulness"
                />
                
                <WorkshopCard 
                  title="Transitioning to Civilian Life"
                  date="June 22, 2023"
                  time="3:00 PM - 4:30 PM ET"
                  instructor="Maj. Robert Johnson, Ret."
                  category="Transition"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="ptsd">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <WorkshopCard 
                  title="Combat Stress Management"
                  date="June 15, 2023"
                  time="2:00 PM - 3:30 PM ET"
                  instructor="Col. James Wilson, Ret."
                  category="PTSD & Trauma"
                />
                
                <WorkshopCard 
                  title="Trauma-Informed Yoga"
                  date="June 25, 2023"
                  time="11:00 AM - 12:00 PM ET"
                  instructor="Capt. Lisa Thompson, Ret."
                  category="PTSD & Trauma"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="mindfulness">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <WorkshopCard 
                  title="Mindfulness for Veterans"
                  date="June 18, 2023"
                  time="1:00 PM - 2:00 PM ET"
                  instructor="Dr. Sarah Miller"
                  category="Mindfulness"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="transition">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <WorkshopCard 
                  title="Transitioning to Civilian Life"
                  date="June 22, 2023"
                  time="3:00 PM - 4:30 PM ET"
                  instructor="Maj. Robert Johnson, Ret."
                  category="Transition"
                />
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="text-center mt-8">
            <Button variant="gold" asChild>
              <Link to="/military-workshops">
                View All Workshops
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Daily Affirmation */}
        <h2 className="text-3xl font-bold text-[#B87333] mb-8 border-b border-[#B87333]/20 pb-2">
          Today's Affirmation
        </h2>
        
        <div className="bg-gradient-to-r from-[#1c2e4a] to-[#0A1929] p-8 rounded-lg border border-white/10 text-center mb-16">
          <blockquote className="text-2xl italic font-light text-white mb-4">
            "My service has shaped me, but it does not define my entire future. I have the strength to create a meaningful civilian life."
          </blockquote>
          <footer className="text-[#B87333]">Daily Affirmation for Veterans</footer>
          
          <div className="mt-6">
            <Button variant="ghost" className="text-white hover:bg-white/10" asChild>
              <Link to="/military-affirmations">
                View More Affirmations
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="bg-gradient-to-r from-[#B87333]/20 to-transparent p-8 rounded-lg border border-[#B87333]/30 mb-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Join Our Community</h3>
              <p className="text-gray-300">
                Subscribe to our newsletter to receive updates on new resources, upcoming workshops, and inspiring stories.
              </p>
            </div>
            
            <div className="w-full md:w-auto">
              <Button variant="gold" size="lg" className="w-full md:w-auto">
                Subscribe Now
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-[#0F2942] border-t border-white/10 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-[#B87333] mb-4">Military Support</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link to="/military-support" className="hover:text-[#B87333]">Home</Link></li>
                <li><Link to="/military-workshops" className="hover:text-[#B87333]">Workshops</Link></li>
                <li><Link to="/military-resources" className="hover:text-[#B87333]">Resources</Link></li>
                <li><Link to="/military-affirmations" className="hover:text-[#B87333]">Affirmations</Link></li>
                <li><Link to="/military-blog" className="hover:text-[#B87333]">Blog</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[#B87333] mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-[#B87333]">Veterans Crisis Line</a></li>
                <li><a href="#" className="hover:text-[#B87333]">VA Mental Health</a></li>
                <li><a href="#" className="hover:text-[#B87333]">PTSD Resources</a></li>
                <li><a href="#" className="hover:text-[#B87333]">Benefits Information</a></li>
                <li><a href="#" className="hover:text-[#B87333]">Community Support</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[#B87333] mb-4">Contact Us</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[#B87333]" />
                  <span>24/7 Support: 988 (then press 1)</span>
                </li>
                <li className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-[#B87333]" />
                  <span>Text Support: 838255</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#B87333]" />
                  <span>Email: support@thrivemt.com</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[#B87333] mb-4">About Thrive MT</h3>
              <p className="text-sm text-gray-300 mb-4">
                Dedicated to supporting the mental health and wellbeing of military personnel, veterans, and their families.
              </p>
              <Link to="/" className="text-sm text-[#B87333] hover:underline">
                Return to Main Thrive MT
              </Link>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2023 Thrive MT Military Support. All rights reserved.</p>
            <p className="mt-1">
              <a href="#" className="hover:text-[#B87333]">Privacy Policy</a> | 
              <a href="#" className="hover:text-[#B87333] ml-2">Terms of Service</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Workshop Card Component
interface WorkshopCardProps {
  title: string;
  date: string;
  time: string;
  instructor: string;
  category: string;
}

const WorkshopCard: React.FC<WorkshopCardProps> = ({ 
  title, 
  date, 
  time, 
  instructor, 
  category 
}) => {
  return (
    <Card className="bg-gradient-to-b from-[#1c2e4a] to-[#0A1929] border border-white/10 text-white transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]">
      <CardHeader className="pb-2">
        <div className="bg-[#B87333]/10 text-[#B87333] text-xs font-medium py-1 px-2 rounded-full w-fit mb-2">
          {category}
        </div>
        <CardTitle className="text-white">{title}</CardTitle>
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
        <Button variant="bronze" className="w-full">
          Register Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MilitarySupport;
